import { Icon, HStack, Input, Stack } from "@chakra-ui/react";
import { Form, Formik, Field } from "formik";
import { useContext } from "react";
import * as Yup from "yup";
import { MessagesContext, SocketContext } from "./Home";
import { MessageDate } from "./MessageDate";
import { IoSend } from "react-icons/io5";

const ChatBox = ({ userid }) => {
  const { setMessages } = useContext(MessagesContext);
  const { socket } = useContext(SocketContext);

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
              name="message"
              placeholder="Type message here..."
              size="lg"
              autoComplete="off"
            />
            <Icon
              as={IoSend}
              boxSize={12}
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
