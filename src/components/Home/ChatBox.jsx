import { Icon, HStack, Input, Stack } from "@chakra-ui/react";
import { Form, Formik, Field } from "formik";
import { useContext, useRef } from "react";
import * as Yup from "yup";
import { MessagesContext, SocketContext } from "./Home";
import { MessageDate } from "./MessageDate";
import { IoSend } from "react-icons/io5";

const ChatBox = ({ userid }) => {

  const { setMessages } = useContext(MessagesContext);

  const { socket } = useContext(SocketContext);

  const inputRef = useRef(null);

  const handleSubmit = (values, actions) => {
    const message = {
      to: userid,
      from: null,
      content: values.message,
      time: MessageDate,
    };
    socket.emit("dm", message);
    setMessages((prevMsgs) => [message, ...prevMsgs]);
    actions.resetForm();
    inputRef.current.focus()
  };

  return (
    <Formik
      initialValues={{ message: "" }}
      validationSchema={Yup.object({
        message: Yup.string().required().min(1).max(255),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <Stack w="100%" >
        <Form onSubmit={handleSubmit}>
          <HStack pb="1.4rem" px="1.4rem">
            <Input
              as={Field}
              ref={inputRef}
              name="message"
              placeholder="Type message here..."
              size={{base:"md",lg:"lg"}}
              autoComplete="off"
            />
            <Icon
              as={IoSend}
              boxSize={{base:10,lg:12}}
              color="teal.400"
              style={{ cursor: "pointer" }}
              onClick={handleSubmit}
            />
          </HStack>
        </Form>
        </Stack>
      )}
    </Formik>
  );
};

export default ChatBox;
