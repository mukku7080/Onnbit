import React, { useState } from 'react'
import {
    Box,
    Button,
    Flex,

    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    RadioGroup,
    Radio,
    HStack,
    Tag

} from '@chakra-ui/react'


import { FaBusinessTime, FaUserCircle } from "react-icons/fa";

import OfferLocation from '../Dropdown/OfferLocation';
import CurrencyDropdown from '../Dropdown/CurrencyDropdown';

const AccountModal = () => {
    const [visibility, setVisibility] = useState("personal");

    return (
        <>
            <Modal

                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Flex direction={'column'}>

                            <FormControl>
                                <FormLabel>Account Type</FormLabel>
                                <RadioGroup onChange={setVisibility} value={visibility} >
                                    <HStack display={'flex'}>

                                        <Flex alignItems={'center'} px={4} py={2} border={'1px solid #dcdcdc'} gap={3}>

                                            <Radio value='personal' >Personal &nbsp; </Radio>
                                            <FaUserCircle size={20} color='gray' />
                                        </Flex>
                                        <Flex alignItems={'center'} px={4} py={2} border={'1px solid #dcdcdc'} gap={3}>

                                            <Radio value='business'>Business</Radio>
                                            <FaBusinessTime size={20} color='gray' />
                                        </Flex>
                                    </HStack>
                                </RadioGroup>
                            </FormControl>


                            <FormControl mt={4}>
                                <FormLabel>Bank Account Country</FormLabel>
                                <OfferLocation />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Currency</FormLabel>
                                <CurrencyDropdown width='100%' />
                            </FormControl>
                            <Flex direction='column' gap={10} mt={5}>

                                <FormControl isRequired>
                                    <FormLabel>Bank Name</FormLabel>
                                    <Input placeholder="Enter bank name" />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Account Holder's Name</FormLabel>
                                    <Input placeholder="Enter account holder's name" />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Custom Bank Details <Tag colorScheme="blue">Optional</Tag></FormLabel>
                                    <Input placeholder="Add any other bank details if needed" />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>IFSC <Tag colorScheme="blue">Optional</Tag></FormLabel>
                                    <Input placeholder="Enter IFSC code" />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Account Number <Tag colorScheme="blue">Optional</Tag></FormLabel>
                                    <Input placeholder="Enter account number" />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>SWIFT / BIC Code <Tag colorScheme="blue">Optional</Tag></FormLabel>
                                    <Input placeholder="Enter SWIFT / BIC code" />
                                </FormControl>

                            </Flex>



                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AccountModal