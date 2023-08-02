import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import { FaGithub, FaDiscord  } from 'react-icons/fa'

const SocialButton = ({children,label,href}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

const Footer = () => {
  return (
    <Box
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container
        as={Stack}
        maxW={'6xl'}
        pb="1rem"
        direction={{ base: 'column', md: 'row' }}
        spacing={2}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
        >
        <Text fontSize="md" fontWeight="semibold">© {new Date().getFullYear()} Developed By Nabil Ahmed</Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'Github'} href={'https://github.com/nabil-github0'}>
            <FaGithub />
          </SocialButton>
          <SocialButton label={'Discord'} href={'https://discordapp.com/users/Ahmed#2516'}>
            <FaDiscord />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer;