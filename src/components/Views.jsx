import { Box, Spinner } from "@chakra-ui/react";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AccountContext } from "./AccountContext";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Signup from "./Login/Signup";
import PrivateRoutes from "./PrivateRoutes";
import useWindowHeight from "./useWindowHeight";

const Views = () => {
  const { user } = useContext(AccountContext);
  const currentHeight = useWindowHeight()
  return user.loggedIn === null ? (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    h="100dvh"
    >
    <Spinner size='xl' thickness='5px' color="#38B2AC" />
    </Box>
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default Views;
