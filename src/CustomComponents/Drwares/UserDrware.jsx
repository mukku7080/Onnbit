import React from 'react'
import {
    Box, Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Stack,
    FormLabel,
    Input,
    useDisclosure,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    Select,
    Textarea
} from '@chakra-ui/react'
import { IoColorFilter } from "react-icons/io5";

const UserDrware = () => {


    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()
    return (
        <>
            <Button colorScheme='orange' onClick={onOpen}>
                <IoColorFilter />
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                initialFocusRef={firstField}
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>
                        Create a new account
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing='24px'>
                            <Box>
                                <FormLabel htmlFor='username'>Name</FormLabel>
                                <Input
                                    ref={firstField}
                                    id='username'
                                    placeholder='Please enter user name'
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor='url'>Url</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon>http://</InputLeftAddon>
                                    <Input
                                        type='url'
                                        id='url'
                                        placeholder='Please enter domain'
                                    />
                                    <InputRightAddon>.com</InputRightAddon>
                                </InputGroup>
                            </Box>

                            <Box>
                                <FormLabel htmlFor='owner'>Select Owner</FormLabel>
                                <Select id='owner' defaultValue='segun'>
                                    <option value='segun'>Segun Adebayo</option>
                                    <option value='kola'>Kola Tioluwani</option>
                                </Select>
                            </Box>

                            <Box>
                                <FormLabel htmlFor='desc'>Description</FormLabel>
                                <Textarea id='desc' />
                            </Box>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px'>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue'>Submit</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>

    )
}

export default UserDrware