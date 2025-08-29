import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Card, Flex, Heading, ButtonGroup, IconButton, Image, Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, useDisclosure, ModalBody, FormControl, FormLabel, Input, ModalFooter, Select, Checkbox, useToast, useColorModeValue } from '@chakra-ui/react'
import { GoPlus } from "react-icons/go"
import { gradientButtonStyle } from '../Wallet/CreateWallet';
import { Form, Formik, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { useAccount } from '../../Context/AccountContext';
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdModeEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';


import { errors } from 'ethers';


const AddOnlineWallet = () => {
    const bgColor = useColorModeValue('gray.50', 'gray.600');

    const toast = useToast();
    const { updateIsPrimary, handleGetAccountDetail, upidetails } = useAccount();
    const validationSchema = Yup.object({
        upi_name: Yup.string().required("mendatory"),
        // wallet_type: Yup.string().required("mendatory"),
        upi_id: Yup.string().required("upi_id is required"),
        caption: Yup.string().optional(),
        is_primary: Yup.boolean().optional(),
        qr_code: Yup.mixed().nullable()
    })
    const initialValues = {
        upi_name: '',
        // wallet_type: '',
        upi_id: '',
        caption: '',
        is_primary: false,
        qr_code: null

    }
    const { isOpen, onClose, onOpen } = useDisclosure();
    const inputRef = useRef(null);
    const [image, setImage] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [loadingId, setLoadingId] = useState(null);



    const handleChek = async (data) => {
        setLoadingId(data);
        const value = {
            method: 'upi',
            id: data
        }
        const res = await updateIsPrimary(value);
        if (res) {
            await handleGetAccountDetail();
            setLoadingId(null);
        }


    }

    const handleImageChange = (e, setFieldValue) => {
        const file = e.target.files[0];
        setFieldValue("qr_code", file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }

    };

    const triggerFileSelect = () => {
        inputRef.current.click();
    };
    return (
        <Card borderRadius={0} p={4} gap={5} border={'1px solid rgba(128, 128, 128, 0.3)'}>

            <Heading size={'md'} fontWeight={500}>Online Wallets</Heading>
            <Box as='p' fontSize={'14px'} color={'gray'}>Add your online wallets below.
            </Box>
            <ButtonGroup isAttached variant='ghost' colorScheme='orange' onClick={onOpen}>
                <Button sx={gradientButtonStyle} size={'sm'}>Add New</Button>
                <IconButton sx={gradientButtonStyle} size={'sm'} icon={<GoPlus />}></IconButton>
            </ButtonGroup>


            {/* Modal area */}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {
                    try {
                        setIsLoading(true);
                        const formData = new FormData();
                        formData.append('upi_name', values.upi_name);
                        formData.append('upi_id', values.upi_id);
                        formData.append('caption', values.caption || '');
                        formData.append('is_primary', values.is_primary ? '1' : '0');
                        if (values.qr_code instanceof File) {
                            formData.append('qr_code', values.qr_code);
                        }
                        const response = await handleAddUpiDetails(formData);
                        if (response?.status === true) {
                            setIsLoading(false);
                            toast({
                                title: 'Success',
                                description: response?.message,
                                status: 'success',
                                position: 'top-right',
                                duration: 3000,
                                isClosable: true,
                            });
                            setImage(null);
                            if (inputRef.current) inputRef.current.value = "";

                            onClose();
                        }
                    } catch (error) {
                        toast({
                            title: 'Error',
                            description: error?.message,
                            status: 'error',
                            position: 'top-right',
                            duration: 3000,
                            isClosable: true,
                        });
                    }
                    finally {
                        setIsLoading(false);
                        actions.resetForm();
                    }
                }}
            >
                {({ values, handleChange, handleBlur, handleSubmit, setFieldValue, touched, errors }) => (
                    <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'xs', md: 'md', lg: 'lg' }}>
                        <ModalOverlay />
                        <ModalContent as="form" onSubmit={handleSubmit}>
                            <ModalHeader bg={bgColor} fontSize="14px" borderTopRadius={5}>
                                Add Online Wallet
                                <ModalCloseButton />
                            </ModalHeader>

                            <ModalBody>
                                <FormControl mb={5} isRequired>
                                    <FormLabel>Wallet Type</FormLabel>
                                    <Select
                                        isDisabled
                                        name="wallet_type"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.wallet_type}
                                    >
                                        <option defaultValue={'upi'} value="bank">UPI</option>
                                        <option value="credit">Credit Card</option>
                                        <option value="debit">Debit Card</option>
                                    </Select>
                                </FormControl>

                                <FormControl isRequired mb={5}>
                                    <FormLabel>Wallet Name</FormLabel>
                                    <Select
                                        name="upi_name"
                                        placeholder="Select wallet name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.upi_name}
                                    >
                                        <option value="phonepe">phonepe</option>
                                        <option value="gpay">gpay</option>
                                        <option value="paytm">paytm</option>
                                        <option value="amazon_pay">amazon_pay</option>
                                    </Select>
                                </FormControl>

                                <FormControl isRequired mb={5}>
                                    <FormLabel>UPI ID</FormLabel>
                                    <Input
                                        name="upi_id"
                                        placeholder="Type or paste your UPI ID"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.upi_id}
                                    />
                                </FormControl>

                                <FormControl my={5}>
                                    <FormLabel>Caption</FormLabel>
                                    <Input
                                        name="caption"
                                        placeholder="Give it a name for your reference"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.caption}
                                    />
                                </FormControl>

                                <FormControl my={5}>
                                    <Checkbox
                                        name="is_primary"
                                        isChecked={values.is_primary}
                                        onChange={handleChange}
                                        colorScheme="orange"
                                    >
                                        is_Primary
                                    </Checkbox>
                                </FormControl>

                                {/* QR Upload */}
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        ref={inputRef}
                                        name='qr_code'
                                        onChange={(e) => handleImageChange(e, setFieldValue)}
                                        display="none"
                                    />
                                    <Button
                                        sx={gradientButtonStyle}
                                        size="sm"
                                        w={'full'}
                                        onClick={triggerFileSelect}
                                    >
                                        Upload QR
                                    </Button>
                                    {image && (
                                        <Box mt={4}>
                                            <Image
                                                src={image}
                                                alt="Preview"
                                                maxW="200px"
                                                borderRadius="md"
                                                boxShadow="md"
                                                mx="auto"
                                            />
                                        </Box>
                                    )}
                                </FormControl>
                            </ModalBody>

                            <ModalFooter bg={bgColor} justifyContent="space-between" borderBottomRadius={5}>
                                <Button onClick={onClose}>Cancel</Button>
                                <Button isLoading={isLoading} sx={gradientButtonStyle} type="submit">
                                    Add
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                )}
            </Formik>

            {/* Modal area */}


            <Flex justifyContent={'center'}
                alignItems={'center'} border={'1px solid #dcdcdc'}>
                <Box
                    w={'full'}
                >
                    {
                        upidetails?.length > 0 ?
                            upidetails.map((data, index) => (

                                <Card borderRadius={0} key={index} p={4} gap={5} w={'full'}>
                                    <Flex border={'1px solid orange'} w={'full'} >
                                        <Flex direction={'column'} gap={5} p={4} w={'full'}>
                                            <Flex justifyContent={'space-between'}>

                                                <Box as='p' fontWeight={600} fontSize={'12px'} color={'gray'}>{(data?.upi_name)}</Box>
                                                {
                                                    loadingId === data?.id ? <Heading size={'sm'} color={'gray.300'} fontWeight={500}>updating...</Heading> :
                                                        <Checkbox size={'sm'} fontWeight={500} colorScheme='orange' isChecked={data?.is_primary} onChange={() => handleChek(data?.id)}><Box color={'gray'} fontSize={'12px'}>primary</Box></Checkbox>
                                                }

                                            </Flex>
                                            <Flex justifyContent={'space-between'} w={'full'} direction={{ base: 'column', sm: 'row' }} gap={5} >
                                                <Flex gap={2} wrap={'wrap'} >

                                                    <Button as={Box} size={'sm'} colorScheme='orange'>{data?.upi_id}</Button>
                                                    <Flex gap={2} >

                                                        <Button as={Box} size={'sm'} colorScheme='teal'>{data?.currency}</Button>
                                                        <Box justifyContent={'center'} alignItems={'center'} display={'flex'} color={'gray'} fontSize={'14px'}>{data?.account_number}</Box>
                                                    </Flex>
                                                </Flex>
                                                <Flex>
                                                    <Button size={'sm'} bgColor={'transparent'} borderRadius={0} color={'red'} display={{ base: 'flex', sm: 'none' }}><RiDeleteBin6Line /></Button>
                                                    <Button size={'sm'} bgColor={'transparent'} borderRadius={0} color={'green.300'} display={{ base: 'flex', sm: 'none' }}><MdModeEdit /></Button>
                                                    <Button size={'sm'} bgColor={'transparent'} borderRadius={0} color={'red'} leftIcon={<RiDeleteBin6Line />} display={{ base: 'none', sm: 'flex' }}>Delete</Button>
                                                    <Button size={'sm'} bgColor={'transparent'} borderRadius={0} color={'green.300'} leftIcon={<MdModeEdit />} display={{ base: 'none', sm: 'flex' }}>Edit</Button>
                                                </Flex>
                                            </Flex>

                                        </Flex>
                                    </Flex>


                                </Card>
                            ))
                            :
                            <Flex justifyContent={'center'}>
                                <Image alignSelf={'center'} p={5} src='/imagelogo/cryptico.png' w={'200px'} h={'160px'} opacity={0.1}></Image>
                            </Flex>

                    }

                </Box>

            </Flex>
        </Card>
    )
}

export default AddOnlineWallet







