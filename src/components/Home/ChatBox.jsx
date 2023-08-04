import { Icon, HStack, Input, Stack } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useContext, useRef, useState } from "react";
import * as Yup from "yup";
import { MessagesContext, SocketContext } from "./Home";
import { MessageDate } from "./MessageDate";
import { IoSend } from "react-icons/io5";

const ChatBox = ({ userid }) => {
  const { setMessages } = useContext(MessagesContext);
  const { socket } = useContext(SocketContext);

  const [inputValue, setInputValue] = useState(""); 
  const inputRef = useRef(null);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const message = {
      to: userid,
      from: null,
      content: inputValue,
      time: MessageDate,
    };
    socket.emit("dm", message);
    setMessages((prevMsgs) => [message, ...prevMsgs]);
    setInputValue(""); 
    inputRef.current.focus(); 
  };

  return (
    <Stack w="100%">
      <HStack pb="1.4rem" px="1.4rem">
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type message here..."
          size={{ base: "md", lg: "lg" }}
          autoComplete="off"
        />
        <Icon
          as={IoSend}
          boxSize={{ base: 10, lg: 12 }}
          color="teal.400"
          cursor="pointer" 
          onClick={handleSendMessage}
        />
      </HStack>
    </Stack>
  );
};

export default ChatBox;
