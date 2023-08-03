import { Button, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from "@chakra-ui/react"
import TextField from "../TextField"
import { Formik,Form } from "formik"
import * as Yup from "yup";
import { useCallback, useContext, useState } from "react"
import { FriendContext, SocketContext } from "./Home"

const AddFriendModal = ({isOpen,onClose}) => {
    const [error,setError] = useState("");

    const closeModal = useCallback(() => {
        setError("")
        onClose()
    },[onClose])

    const {setFriendList} = useContext(FriendContext);

    const {socket} = useContext(SocketContext)
    
  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
        <ModalContent>
            <ModalHeader>Add a friend</ModalHeader>
            <ModalCloseButton />
            <Formik 
            initialValues={{friendname:""}}
            onSubmit={(values,actions) => {
                socket.emit("add_friend",values.friendname, ({errorMsg,done, newFriend}) => {
                    if(done) {
                        setFriendList(prevFrnds => [newFriend, ...prevFrnds])
                        closeModal();
                        return;
                    }
                    setError(errorMsg)
                })
                actions.resetForm()
            }}
            validationSchema={ Yup.object({
                friendname:Yup.string()
                .required("Username required")
                .min(6,"Invalid username")
                .max(28,"Invalid username"),
            })}
            >
                <Form>
            <ModalBody>
                <Heading as="p" color="red.500" textAlign="center" mb="1rem" fontSize="1.2rem">{error}</Heading>
                <TextField 
                label = "Friend's name"
                placeholder="Enter friend's name"
                autoComplete="off"
                name="friendname"
                />
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="blue" type="submit">
                    Add
                </Button>
            </ModalFooter>
            </Form>
            </Formik>
        </ModalContent>
    </Modal>
  )
}

export default AddFriendModal
