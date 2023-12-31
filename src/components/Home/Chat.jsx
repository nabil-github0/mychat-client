import { Text, VStack, Box } from "@chakra-ui/layout";
import { TabPanel, TabPanels } from "@chakra-ui/tabs";
import { useContext, useEffect, useRef } from "react";
import ChatBox from "./ChatBox";
import { FriendContext, MessagesContext } from "./Home";
import Linkify from "linkify-react";
import useWindowHeight from "../useWindowHeight";
import ChatLoadingSkeleton from "../Skeletons/ChatLoadingSkeleton";
import NavBar from "./NavBar";

const Chat = ({ userid }) => {

  const { friendList } = useContext(FriendContext);

  const { messages, messagesLoading } = useContext(MessagesContext);
  
  const bottomDiv = useRef(null);

  const currentHeight = useWindowHeight()

  useEffect(() => {
    bottomDiv.current?.scrollIntoView();
  }, [messages, userid]);

  return messagesLoading ? (
      <ChatLoadingSkeleton />
  ) : (friendList.length > 0 ? (
    <VStack 
      h="100%"
      >
      <Box w="100%">
        <NavBar />
      </Box>
      <TabPanels
        flex="1" 
        overflowY="scroll"
        css={{
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#e4e4e4',
            borderRadius: "100px"
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: "100px",
            background: "#38B2AC",
          },
        }}
        >
        {friendList.map((friend, index) => (
          <VStack
            flexDir="column-reverse"
            as={TabPanel}
            key={`chat:${friend.username}.${index}`}
            w="100%"
          >
            {userid === friend.userid && <div ref={bottomDiv} />}
            {messages
              .filter(
                msg => msg.to === friend.userid || msg.from === friend.userid
              )
              .map((message, index) => (
                <Text
                  m={
                    message.to === friend.userid
                      ? "1rem 0 0 auto !important"
                      : "1rem auto 0 0 !important"
                  }
                  maxW={{ base: "90%", lg: "50%" }}
                  key={`msg:${message.time}.${index}`}
                  fontSize="lg"
                  bg={message.to === friend.userid ? "blue.100" : "gray.100"}
                  color="gray.800"
                  borderRadius="10px"
                  p="0.4rem 0.8rem"
                >
                  <Linkify>{message.content}</Linkify>
                  <Text
                    p="0.1rem 0.3rem"
                    borderRadius="5px"
                    textAlign="center"
                    fontSize="0.68rem"
                    color={message.to === friend.userid ? "blue.100" : "gray.100"}
                    bg="black"
                  >
                    {message.to === friend.userid ? "You: " : `${friend.username.split(" ")[0]}: `}
                    {message.time}
                  </Text>
                </Text>
              ))}
          </VStack>
        ))}
      </TabPanels>
      <ChatBox userid={userid} />
    </VStack>
  ) : (
    <VStack
      h={currentHeight}
    >
      <Box w="100%">
        <NavBar />
      </Box>
      <Box
      h="100%"
      w="100%"
      display="flex"
      textAlign="center"
      alignItems="center"
      >
          <Text fontSize="lg" >No friend :( Click add friend to start chatting</Text>
      </Box>
    </VStack>
    )
  )
};

export default Chat;
