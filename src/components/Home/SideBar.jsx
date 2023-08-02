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

const SideBar = () => {
  const { friendList } = useContext(FriendContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack 
    py="1.4rem"
    maxH="100vh"
    minH="100vh"
    >
      <VStack justify="space-evenly" w="100%">
        <Heading size="md">Add Friend</Heading>
        <Button onClick={onOpen} >
          <Icon as={FaUserAlt}/>
          <SmallAddIcon />
        </Button>
      </VStack>
      <Divider />
      <VStack as={TabList} w="100%" overflowY="scroll" overflowX="hidden">
        {friendList.map(friend => (
          <HStack as={Tab} key={`friend:${friend}`}>
            <Circle
              bg={friend.connected === "true" ? "green.700" : "red.500"}
              w="15px"
              h="15px"
            />
            <Text>{friend.username}</Text>
          </HStack>
        ))}
      </VStack>
      <AddFriendModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};

export default SideBar;
