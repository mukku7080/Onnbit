import { Card, Link, CardBody, Divider, Flex, Heading, Icon, Image, InputGroup, InputRightElement, IconButton, useColorModeValue, Modal, useDisclosure, Switch, HStack, PinInput, PinInputField } from '@chakra-ui/react'
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Checkbox, useToast,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    ModalBody, ModalContent, ModalOverlay, ModalFooter, ModalHeader, ModalCloseButton
} from "@chakra-ui/react";
import { Form, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { FcGoogle } from "react-icons/fc";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { FaApple, FaTelegramPlane } from "react-icons/fa";
import ChangePassword from './ChangePassword';
import { MdCheck, MdKeyboardArrowRight, MdOutlineMail } from 'react-icons/md';
import { useOtherDetail } from '../../Context/otherContext';
import { SiFsecure } from 'react-icons/si';
import { FaCircleNodes } from 'react-icons/fa6';
import { gradientButtonStyle } from '../Wallet/CreateWallet';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../../Context/AuthContext';
import { useUser } from '../../Context/userContext';

const Security = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [token, setToken] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    // const bgcolor = useColorModeValue('gray.100', 'gray.700');
    const [issignup, setSignup] = useState(false);
    const validationSchema = Yup.object({
        currentPassword: Yup.string().min(8, "Minimum 8 characters").required("*Password is required"),
        password: Yup.string().min(8, "Minimum 8 characters").required("*Password is required"),
        cpass: Yup
            .string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("*Confirm Password is required"),
    });
    const { handleChange, handleBlur, handleSubmit, errors, touched, values } = useFormik({
        initialValues: {
            currentPassword: "",
            password: "",
            cpass: "",
        },
        validationSchema,

    });
    const [password, setPassword] = useState("");
    const [validations, setValidations] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false
    });

    const validatePassword = (value) => {
        setPassword(value.password);

        setValidations({
            length: value.length >= 8,
            lowercase: /[a-z]/.test(value),
            uppercase: /[A-Z]/.test(value),
            number: /[0-9]/.test(value),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        });
    };
    const allValid = Object.values(validations).every(Boolean);
    const [isshow, setShow] = useState(false);
    return (
        <>

            <Flex direction={'column'} gap={10} overflowX={'auto'}>
                <Enable2FA />
                <ChangePassword />
                <ActiveSession />
                <AccountActivity />
            </Flex>
        </>
    )
}


const ActiveSession = () => {
    const { loginhistory } = useOtherDetail();
    const tablestrip = useColorModeValue('white', 'gray.600');
    const tablestrip1 = useColorModeValue('orange.50', 'gray.700');


    const history = loginhistory || []

    return (

        <>
            <Flex direction={'column'} gap={10} p={4} border={'1px solid #dcdcdc'} borderRadius={5}>
                <Heading size={'lg'} px={4}>Active Session</Heading>

                <TableContainer>
                    <Table variant='simple'>
                        <TableCaption>Only latest 10 records available here </TableCaption>
                        <Thead>
                            <Tr>
                                <Th>SIGNED IN</Th>
                                <Th>BROWSER</Th>
                                <Th  >LOCATION</Th>
                                <Th isNumeric>IP ADDRESS</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                history.length > 0 ?
                                    (

                                        history.map((data, index) => (
                                            <>
                                                <Tr key={index} bg={index % 2 === 0 ? tablestrip : tablestrip1}>
                                                    <Td>{data.loginDuration}</Td>
                                                    <Td>{data.browser}</Td>
                                                    <Td
                                                        whiteSpace="normal"   // Allows text to wrap
                                                        wordBreak="break-word" // Ensures breaking long words
                                                        overflowWrap="break-word" // Alternative way to break long words
                                                        maxW="150px" // Limits the width to ensure wrapping


                                                    >{`${data.countryName},${data.countryCity}`}</Td>
                                                    <Td
                                                        isNumeric
                                                        whiteSpace="normal"   // Allows text to wrap
                                                        wordBreak="break-word" // Ensures breaking long words
                                                        overflowWrap="break-word" // Alternative way to break long words
                                                        maxW="150px" // Limits the width to ensure wrapping


                                                    >
                                                        {data.ipAddress}
                                                    </Td>
                                                </Tr>

                                            </>
                                        ))
                                    )

                                    :
                                    (
                                        <Tr>
                                            <Td colSpan="4" textAlign="center">No active sessions found</Td>
                                        </Tr>
                                    )

                            }

                        </Tbody>

                    </Table>
                </TableContainer>
            </Flex>


        </>
    )
}


const AccountActivity = () => {
    const { loginhistory } = useOtherDetail();
    const tablestrip = useColorModeValue('white', 'gray.600');
    const tablestrip1 = useColorModeValue('orange.50', 'gray.700');

    const history = loginhistory || []
    return (

        <>
            <Flex direction={'column'} gap={10} p={4} border={'1px solid #dcdcdc'} borderRadius={5}>
                <Heading size={'lg'} px={4}>Account Activity</Heading>

                <TableContainer>
                    <Table variant='simple'>
                        <TableCaption>Only latest 10 records available here</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>ACTION</Th>
                                <Th>SIGNED IN</Th>

                                <Th>BROWSER</Th>
                                <Th >IP ADDRESS</Th>
                                <Th isNumeric >LOCATION</Th>
                                {/* <Th  >SIGNED IN</Th> */}

                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                history.length > 0 ?
                                    (

                                        history.map((data, index) => (
                                            <>
                                                <Tr key={index} bg={index % 2 === 0 ? tablestrip : tablestrip1}>
                                                    <Td><Box> {data.loginStatus} </Box></Td>
                                                    <Td>{data.loginDuration}</Td>

                                                    <Td>{data.browser}</Td>
                                                    <Td

                                                        whiteSpace="normal"   // Allows text to wrap
                                                        wordBreak="break-word" // Ensures breaking long words
                                                        overflowWrap="break-word" // Alternative way to break long words
                                                        maxW="150px" // Limits the width to ensure wrapping


                                                    >
                                                        {data.ipAddress}
                                                    </Td>
                                                    <Td isNumeric
                                                        whiteSpace="normal"   // Allows text to wrap
                                                        wordBreak="break-word" // Ensures breaking long words
                                                        overflowWrap="break-word" // Alternative way to break long words
                                                        maxW="150px" // Limits the width to ensure wrapping
                                                    >{`${data.countryName},${data.countryCity}`}</Td>
                                                    {/* <Td>{data.timeAgo}</Td> */}


                                                </Tr>

                                            </>
                                        ))
                                    )
                                    :
                                    (
                                        <Tr>
                                            <Td colSpan="4" textAlign="center">No active sessions found</Td>
                                        </Tr>

                                    )
                            }

                        </Tbody>

                    </Table>
                </TableContainer>
            </Flex>


        </>
    )
}

const Enable2FA = () => {
    const navigate = useNavigate()
    const { user } = useUser();
    const [ischeckedA, setIsCheckedA] = useState(false);
    const [ischeckedB, setIsCheckedB] = useState(false);
    const [ischeckedC, setIsCheckedC] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure()
    const [isshow, setShow] = useState(false);
    const { handleEmailOtp, handleEnable2FA, handleVerifyEmailOtp, verifyOtpResponse } = useAuth();
    const [otp, setOtp] = useState(null);
    const [isShow2FA, setIShow2FA] = useState(false);
    const [isOtpvalid, setOtpvalid] = useState(false);
    const [otpVerificationMessage, setOtpVerificationMessage] = useState("");
    const bgColor = useColorModeValue('gray.100', 'gray.600');
    

    useEffect(() => {
        setIsCheckedA(user?.twoFactorAuth);

    }, [user])

    const handleSwitchChangeA = async (e) => {
        const checked = e.target.checked;
        if (!checked) {
            onOpen2();
            const operation = 'two_fa'
            const response = await handleEmailOtp(operation);
            if (response.status) {
            }

        }
        try {
            if (checked) {

                const response = await handleEnable2FA(checked);
                if (response.status) {
                    setIsCheckedA(checked);
                }
            }
        }
        catch (error) {
            console.log(error);
        }

    }
    const verifyOtp = async (value) => {
        const verifyOtp = {
            otp: value,
            operation: 'two_fa'
        }
        try {

            const response = await handleVerifyEmailOtp(verifyOtp);
            if (response.status) {
                const checked = false
                setOtpvalid(true);
                setOtpVerificationMessage(response?.message);
                const res = await handleEnable2FA(checked);
                if (res.status) {
                    setIsCheckedA(checked);
                }
                onClose2();
                setOtp(null);
            }
        }
        catch (error) {
            console.log(error);
            setOtpVerificationMessage(error?.message);
        }

    }
    return (
        <Flex direction={'column'} gap={5} p={4} border={'1px solid #dcdcdc'} borderRadius={5}>
            <Heading size={'lg'} px={4}>Two-factor authentication (2FA) settings</Heading>
            <Flex
                px={5}
                py={5}
                borderRadius={5}
                gap={5}
                bg={bgColor}
                direction={{ base: 'column', md: 'row' }}
                alignItems={{ base: 'start', md: 'center' }}
            >
                <Box color={'green.500'}>
                    <FaCircleNodes size={30} />
                </Box>
                <Box>
                    Set answers to your security questions before setting up 2FA.
                </Box>
                <Link color={'green.500'} alignSelf={{ base: 'end', md: 'center' }} onClick={() => navigate('/settings/securityQuestions')}>Setup now </Link>
            </Flex>

            <Box px={4} fontWeight={500} mt={4}>Set up your 2FA and make your account more secure.</Box>



            {/* Google Authy */}
            <Flex gap={2} bg={bgColor} p={4} borderRadius={5} alignItems={{ base: 'start', md: 'center' }} cursor={'pointer'} direction={{ base: 'column', md: 'row' }} >

                <Flex flex={0.8} gap={2} direction={{ base: 'column', md: 'row' }} onClick={onOpen}>

                    <Box flex={0.1} w={'80px'}>
                        <Image w={'80px'} src='/imagelogo/2fa.png'></Image>
                    </Box>

                    <Flex flex={0.9} gap={{ base: 2, md: 0 }} direction={'column'} justifyContent={'center'}>
                        <Flex gap={{ base: 1, md: 4 }} direction={{ base: 'column', md: 'row' }}>
                            <Box fontSize={'14px'} fontWeight={500}  >Google Authenticator or Authy</Box>
                            <Box borderRadius={5} bg={'green.100'} color={'gray'} fontSize={'12px'} p={1} w={'90px'}>Recommended</Box>
                        </Flex>
                        <Box >Random time-bound passcode generated by the app.</Box>
                    </Flex>
                </Flex>
                <Flex pr={{ base: 0, md: 10 }} flex={0.2} justifyContent={'end'} alignSelf={{ base: 'end', md: 'center' }} fontWeight={500} color={'green.500'} alignItems={'center'}>
                    <Button color={'green.500'} bg={'transparent'} _hover={{ bg: 'transparent' }} onClick={onOpen}>
                        Activate now
                    </Button>
                </Flex>

            </Flex>

            {/* Modal for sequrity questions */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color={'gray'} borderRadius={5} bg={'gray.50'} fontSize={'16px'}>Improve Security</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex direction={'column'} gap={5} my={5} onClick={() => { onClose(); navigate('/settings/securityQuestions') }}>

                            <Box fontWeight={500} fontSize={'16px'}>To set up 2FA for additional actions on your account, complete:</Box>
                            <Flex gap={2} border={'1px solid #dcdcdc'} p={4} borderRadius={5} alignItems={'center'} cursor={'pointer'} onClick={onOpen}>
                                <Flex flex={0.1}>
                                    <Image w={'80px'} src='/imagelogo/2fa.png'></Image>
                                </Flex>

                                <Flex flex={0.7} direction={'column'} justifyContent={'center'}>
                                    <Flex gap={4}>
                                        <Box fontSize={'14px'} fontWeight={500} >Sequrity Questions</Box>
                                    </Flex>
                                    <Box fontSize={'12px'}>Set them up in a few minutes</Box>
                                </Flex>
                                <Flex flex={0.2} justifyContent={'end'} fontWeight={500} alignItems={'center'}>
                                    <MdKeyboardArrowRight />

                                </Flex>

                            </Flex>
                        </Flex>


                    </ModalBody>
                    {/* <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter> */}
                </ModalContent>
            </Modal>

            {/* Modal form for 2FA via email Otp */}
            <Modal isOpen={isOpen2} onClose={onClose2}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color={'gray'} borderRadius={5} bg={'gray.50'} fontSize={'16px'}>Email OTP</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex direction={'column'} gap={5} my={5}>

                            <Box fontWeight={500} fontSize={'16px'} j color={'red.200'}>*If you disable 2FA, your account will become less secure.</Box>

                            <HStack>
                                <PinInput value={otp} onChange={(value) => setOtp(value)} onComplete={(value) => verifyOtp(value)}>
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                </PinInput>
                            </HStack>

                        </Flex>
                        <Box color={isOtpvalid ? 'green' : 'red'}>{otpVerificationMessage}</Box>


                    </ModalBody>
                    <ModalFooter>
                        <Box fontSize={'14px'} fontWeight={500}>OTP is valid for 5 minutes</Box>
                    </ModalFooter>

                </ModalContent>
            </Modal>

            {/*Enable 2FA via Email */}
            <Flex gap={5} bg={bgColor} p={4} borderRadius={5} alignItems={{ base: 'start', md: 'center' }} direction={{ base: 'column' }} >
                <Flex w={'full'} gap={2} direction={{ base: 'column', md: 'row' }} alignItems={{ base: 'start', md: 'center' }} cursor={'pointer'} onClick={() => setShow(!isshow)}>

                    <Flex flex={0.8} gap={2} direction={{ base: 'column', md: 'row' }}>

                        <Box flex={0.1} w={'80px'}>
                            <Image w={'80px'} src='/imagelogo/2fa.png'></Image>
                        </Box>

                        <Flex flex={0.9} gap={{ base: 2, md: 0 }} direction={'column'} justifyContent={'center'}>
                            <Flex gap={{ base: 1, md: 4 }} direction={{ base: 'column', md: 'row' }}>
                                <Box fontSize={'14px'} fontWeight={500}  >Email</Box>
                            </Flex>
                            <Box> unique time-bound code sent via email.</Box>
                        </Flex>
                    </Flex>
                    <Flex pr={{ base: 0, md: 10 }} flex={0.2} justifyContent={'end'} alignSelf={{ base: 'end', md: 'center' }} fontWeight={500} color={'green.500'} alignItems={'center'}>
                        <Button color={ischeckedA ? 'green' : 'green.500'} bg={'transparent'} _hover={{ bg: 'transparent' }} onClick={() => setShow(!isshow)}>
                            {
                                ischeckedA ? "Activated" : " Activate now"
                            }

                        </Button>
                    </Flex>
                </Flex>
                {
                    isshow &&
                    <AnimatePresence >

                        <motion.div

                            initial={{ opacity: 0, y: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            style={{ overflow: "hidden", position: "relative", marginBottom: "10px", width: '100%' }}
                            width={'full'}

                        >


                            <Flex bg={'#fff'} borderRadius={5} w={'full'} gap={4} direction={{ base: 'column' }} p={{ base: 2, sm: 4 }} alignItems={{ base: 'start' }} >
                                {
                                    !isShow2FA &&
                                    <Flex gap={2} w={'full'} direction={{ base: 'column' }} p={2} alignItems={{ base: 'start' }}>

                                        <Box fontWeight={500} fontSize={{ base: '14px', sm: '16px' }}>For better security, consider using Google Authenticator or Authy.</Box>
                                        <Button
                                            variant={'outline'}
                                            size={'sm'}
                                            sx={gradientButtonStyle}
                                            onClick={() => {
                                                setIShow2FA(true);
                                                // onOpen();


                                            }}
                                        >{ischeckedA ? 'Disable 2FA via Email' : 'Enable 2FA via Email'}</Button>
                                    </Flex>
                                }
                                {
                                    isShow2FA &&
                                    <Flex direction={'column'} gap={5} w={'full'}>
                                        <Box fontWeight={500} color={'gray'}>2FA event settings</Box>
                                        <Flex justifyContent={'space-between'} w={'full'} color={'gray'} fontSize={'12px'}>
                                            <Box>Event name</Box>
                                            <Box>Enable 2FA</Box>
                                        </Flex>
                                        <Flex justifyContent={'space-between'} >
                                            <Flex gap={5} alignItems={'center'}>
                                                <Box fontWeight={500} >Login</Box>
                                            </Flex>
                                            <Switch isChecked={ischeckedA} colorScheme='orange' onChange={handleSwitchChangeA} />

                                        </Flex>
                                        <Flex justifyContent={'space-between'} w={'full'} >
                                            <Box fontWeight={500} color={'gray.200'} >During BuyCrypto</Box>
                                            <Switch isDisabled isChecked={ischeckedB} colorScheme='orange' />

                                        </Flex>
                                        <Flex justifyContent={'space-between'} w={'full'}>
                                            <Box fontWeight={500} color={'gray.200'} >During SellCrypto</Box>
                                            <Switch isDisabled isChecked={ischeckedC} colorScheme='orange' />

                                        </Flex>
                                    </Flex>
                                }
                            </Flex>





                        </motion.div>

                    </AnimatePresence>

                }


            </Flex>


        </Flex>
    )
}





const loginRecords = Array(4).fill({
    timeAgo: "3 weeks ago",
    browser: "Chrome (Windows 10)",
    ipAddress: "2405:201:6022:f962:f408:879b:be8a:8269",
    location: "India, Lucknow"
});

export default Security