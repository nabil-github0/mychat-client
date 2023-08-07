import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Img,
  Text
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useContext } from 'react'
import { AccountContext } from '../AccountContext'
import { useNavigate } from 'react-router-dom'


const NavBar = () => {
  
  const navigate = useNavigate()

  const { colorMode, toggleColorMode } = useColorMode()

  const { user } = useContext(AccountContext);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
      <Box 
        w="100%" 
        bg={useColorModeValue('gray.200', 'gray.700')} 
        px={4}
      >
        <Flex h={14} alignItems={'center'} justifyContent={'space-between'}>
          <Box h={10} w={10}><Img src="message.png"/></Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon color="blue.700"/> : <SunIcon color="orange.500"/>}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  >
                  <Avatar
                    b="1px solid grey"
                    size={'sm'}
                    src={`https://api.dicebear.com/6.x/pixel-art/svg?seed=${user.username}`}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={`https://api.dicebear.com/6.x/pixel-art/svg?seed=${user.username}`}
                    />
                  </Center>
                  <br />
                  <Center>
                    <Text fontSize="2xl">{user.username}</Text>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem 
                  color="red" 
                  display="flex" 
                  justifyContent="center" 
                  alignItems="center"
                  onClick={handleLogOut}
                  >
                    Log Out
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
  )
}

export default NavBar;