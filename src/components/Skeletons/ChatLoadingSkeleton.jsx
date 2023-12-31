import { Text, TabPanels, VStack, Stack, HStack, Icon, TabPanel, Input, Box } from '@chakra-ui/react'
import { IoSend } from "react-icons/io5";
import "./LoadingSkeleton.css"
import NavBar from '../Home/NavBar';

const ChatLoadingSkeleton = () => {

  const skeletonData = [
    { height: "38px", w: { base: "82%", lg: "30%" }, m: "1rem auto 0 0 !important"},
    { height: "35px", w: { base: "86%", lg: "25%" }, m: "1rem auto 0 0 !important"},
    { height: "40px", w: { base: "89%", lg: "45%" }, m: "1rem 0 0 auto !important"},
    { height: "55px", w: { base: "84%", lg: "50%" }, m: "1rem auto 0 0 !important"},
    { height: "35px", w: { base: "83%", lg: "40%" }, m: "1rem 0 0 auto !important"},
    { height: "50px", w: { base: "88%", lg: "35%" }, m: "1rem auto 0 0 !important"},
    { height: "65px", w: { base: "81%", lg: "30%" }, m: "1rem auto 0 0 !important"},
    { height: "52px", w: { base: "85%", lg: "44%" }, m: "1rem auto 0 0 !important"},
    { height: "42px", w: { base: "87%", lg: "49%" }, m: "1rem 0 0 auto!important"},
    { height: "23px", w: { base: "90%", lg: "33%" }, m: "1rem 0 0 auto!important"},
    { height: "52px", w: { base: "80%", lg: "24%" }, m: "1rem auto 0 0 !important"},
    { height: "32px", w: { base: "88%", lg: "39%" }, m: "1rem auto 0 0 !important"},
  ];



  const ChatBoxWhenLoding = () => {
    return (
        <Stack w="100%">
      <HStack pb="1.4rem" px="1.4rem">
        <Input
          placeholder="Type message here..."
          size={{ base: "md", lg: "lg" }}
          autoComplete="off"
        />
        <Icon
          as={IoSend}
          boxSize={{ base: 10, lg: 12 }}
          color="teal.400"
          cursor="pointer" 
        />
      </HStack>
    </Stack>
    )
  }

  const ChatSkeletonItems = Array.from({ length: 15 }, (_, i) => (
    <VStack 
          flexDir="column-reverse"
          w="100%"
          as={TabPanel}
          key={i}
          >
          { skeletonData.map((data, i) => (
          <Text
            key={`${data.w}.${i}`}
            borderRadius="5px"
            h={data.height}
            w={data.w}
            className="loading-animation"
            m={data.m}
          />
          ))
        }
        </VStack>
  ));

  return (
    <VStack h="100%" justify="end" >
      <Box flex="1" w="100%">
      <NavBar />
      </Box>
        <TabPanels 
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
          {ChatSkeletonItems}
        </TabPanels>
        <ChatBoxWhenLoding />
    </VStack>
  );
}

export default ChatLoadingSkeleton;
