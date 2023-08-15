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

  const [friendListLoading, setFriendListLoading ] = useState(true);

  const [messages, setMessages] = useState([]);

  const [messagesLoading, setMessagesLoading ] = useState(true);

  const [friendIndex, setFriendIndex] = useState(0);

  const currentHeight = useWindowHeight();

  const { user } = useContext(AccountContext);

  const [socket, setSocket] = useState(() => socketConn(user));
  useEffect(() => {
    setSocket(() => socketConn(user));
  }, [user]);

  useSocketSetup(setFriendList, setMessages, setFriendListLoading, setMessagesLoading, socket);
  
  return (
    <FriendContext.Provider value={{ friendList, setFriendList, friendListLoading }}>
      <SocketContext.Provider value={{ socket }}>
        <Tabs
          isLazy
          onChange={index => setFriendIndex(index)}
          overflowY="hidden"
          h={currentHeight}
        >
          <Grid 
            templateColumns="repeat(10, 1fr)"
            overflowY="hidden"
            h={currentHeight}
            >
            <GridItem colSpan="3" borderRight="1px solid gray">
              <SideBar />
            </GridItem>
            <GridItem colSpan="7" maxH={currentHeight}>
              <MessagesContext.Provider
                value={{ messages, setMessages, messagesLoading }}
              >
                <Chat userid={friendList[friendIndex]?.userid} />
              </MessagesContext.Provider>
            </GridItem>
          </Grid>
        </Tabs>
      </SocketContext.Provider>
    </FriendContext.Provider>
  );
};

export default Home;
