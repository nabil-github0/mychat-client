import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { SmallAddIcon, Icon } from "@chakra-ui/icons";
import { FaUserAlt } from "react-icons/fa"
import {
  Circle,
  Divider,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { Tab, TabList } from "@chakra-ui/tabs";
import { useContext } from "react";
import AddFriendModal from "./AddFriendModal";
import { FriendContext } from "./Home";
import useWindowHeight from "../useWindowHeight";
import SideBarLoadingSkeleton from "./SideBarLoadingSkeleton";

const SideBar = () => {

  const { friendList, friendListLoading } = useContext(FriendContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const currentHeight = useWindowHeight();

  return (
    <VStack 
    py="1.4rem"
    maxH={currentHeight}
    minH={currentHeight}
    >
      <VStack justify="space-evenly" w="100%">
        <Heading size="md">Add Friend</Heading>
        <Button onClick={onOpen} >
          <Icon as={FaUserAlt}/>
          <SmallAddIcon />
        </Button>
      </VStack>
      <Divider />
      {friendListLoading ? ( 
        // <SideBarLoadingSkeleton />
        <Text>Loading..</Text>
      ) : (
        <VStack as={TabList} w="100%" overflowY="scroll" overflowX="hidden">
        {friendList.map((friend,index) => (
          <HStack 
          as={Tab} 
          key={`friend:${friend.userid}.${index}`}
          >
            <Circle
              bg={"" + friend.connected === "true" ? "green.500" : "red.500"}
              w="15px"
              h="15px"
            />
            <Text>{friend.username}</Text>
          </HStack>
        ))}
      </VStack>
      )
    }
    <AddFriendModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  )
};

export default SideBar;
