import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Heading,
  Text,
  VStack,
  Box
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AccountContext } from "../AccountContext";
import TextField from "../TextField";
import Footer from "./Footer";
import useWindowHeight from "../useWindowHeight";
import ToggleColorMode from "../ToggleColor";

const SignUp = () => {
  const { setUser } = useContext(AccountContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const currentHeight = useWindowHeight()
  return (
    <>
    <Box 
    pos="absolute"
    top="0"
    right="0"
    m="1rem"
    >
      <ToggleColorMode />
    </Box>
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={ Yup.object({
        username:Yup.string()
        .required("Username required")
        .min(6,"Username too short!")
        .max(28,"Username too long!"),
        password: Yup.string()
        .required("Password required")
        .min(6,"Password too short!")
        .max(28,"Password too long!"),
       })}
        onSubmit={(values, actions) => {
        const vals = { ...values };
        actions.resetForm();
        fetch(`${import.meta.env.VITE_APP_SERVER_URL}/auth/register`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vals),
        })
          .catch(err => {
            return;
          })
          .then(res => {
            if (!res || !res.ok || res.status >= 400) {
              return;
            }
            return res.json();
          })
          .then(data => {
            if (!data) return;
            setUser({ ...data });
            if (data.status) {
              setError(data.status);
            } else if (data.loggedIn) {
              localStorage.setItem("token", data.token);
              navigate("/home");
            }
          });
      }}
    >
      <VStack
      w="100%"
      h={currentHeight}
      >
      <VStack
        as={Form}
        w={{ base: "90%", md: "500px" }}
        m="auto"
        justify="center"
        spacing="1rem"
      >
        <Heading>Sign Up</Heading>
        <Text as="p" color="red.500">
          {error}
        </Text>
        <TextField
          name="username"
          placeholder="Enter username"
          autoComplete="off"
          label="Username"
        />

        <TextField
          name="password"
          placeholder="Enter password"
          autoComplete="off"
          label="Password"
          type="password"
        />

        <ButtonGroup pt="1rem">
          <Button colorScheme="teal" type="submit">
            Create Account
          </Button>
          <Button onClick={() => navigate("/")} leftIcon={<ArrowBackIcon />}>
            Back
          </Button>
        </ButtonGroup>
      </VStack>
      <Footer />
      </VStack>
      </Formik>
      </>
  );
};

export default SignUp;