import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import socketConn from "../../socket";
import { AccountContext } from "../AccountContext";
import Chat from "./Chat";
import SideBar from "./SideBar";
import useSocketSetup from "./useSocketSetup";
import useWindowHeight from "../useWindowHeight";

export const FriendContext = createContext();
export const MessagesContext = createContext();
export const SocketContext = createContext();

const Home = () => {
  const [friendList, setFriendList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [friendIndex, setFriendIndex] = useState(0);
  const currentHeight = useWindowHeight()

  const { user } = useContext(AccountContext);
  const [socket, setSocket] = useState(() => socketConn(user));
  useEffect(() => {
    setSocket(() => socketConn(user));
  }, [user]);
  useSocketSetup(setFriendList, setMessages, socket);
  return (
    <FriendContext.Provider value={{ friendList, setFriendList }}>
      <SocketContext.Provider value={{ socket }}>
        <Grid
          templateColumns="repeat(10, 1fr)"
          h={currentHeight}
          as={Tabs}
          onChange={index => setFriendIndex(index)}
        >
          <GridItem colSpan="3" borderRight="1px solid gray">
            <SideBar />
          </GridItem>
          <GridItem 
          colSpan="7"
          maxH={currentHeight}
          >
            <MessagesContext.Provider value={{ messages, setMessages }}>
              <Chat userid={friendList[friendIndex]?.userid} />
            </MessagesContext.Provider>
          </GridItem>
        </Grid>
      </SocketContext.Provider>
    </FriendContext.Provider>
  );
};

export default Home;
