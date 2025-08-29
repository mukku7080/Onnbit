import { Card, CardBody, Divider, Flex, Heading, Icon, Image, InputGroup, IconButton, Link, useColorModeValue, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { CgArrowsExchange } from "react-icons/cg";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Checkbox, Toast,
    InputRightElement

} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { IoMdEyeOff, IoMdEye } from "react-icons/io";

import { FcGoogle } from "react-icons/fc";
import { FaApple, FaTelegramPlane } from "react-icons/fa";
// import { useAuth } from '../AuthContext/AuthProvider';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';
import { gradientButtonStyle } from '../Wallet/CreateWallet';
import { useUser } from '../../Context/userContext';
import OTPInput from './OtpInput';


const Loginnew = () => {

    const { handleLogin, handleLoginWithGoogle, handleForgotPassword, handleEmailOtp } = useAuth();
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const txtcolor = useColorModeValue('black', 'white');
    const bgcolor = useColorModeValue('gray.100', 'gray.700');
    const [isVisited, setIsVisited] = useState(false);
    const [is2FA_Enable, set2FA_Enable] = useState(false);
    const [is2FAshow, set2FAshow] = useState(false);
    const [otpVerificationStatus, setOtpVerificationStauts] = useState(false);

    const navigate = useNavigate();

    const forget = async () => {
        const res = await handleForgotPassword(email);
        const { status, message } = res;


        if (status === true) {
            toast({
                title: "Reset-password",
                description: "password reset-link has been sent on your email..",
                status: "info",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });

        }
        else {

            toast({
                title: "error",
                description: message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
        }


    }

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            navigate("/user-dashboard"); // Redirect logged-in users
        }
    }, []);

    useEffect(() => {

        if (isVisited) {
            const timer = setTimeout(() => {
                setIsVisited(false);
            }, 12000)
            return () => clearTimeout(timer)
        }
    }, [isVisited])

    const validationSchema = Yup.object({
        email: Yup.string().email("invalid email").required("*field is required"),
        password: Yup.string().min(6, "Minimum 8 characters").required("*Password is required"),

    });
    const { values, handleBlur, handleSubmit, errors, touched, handleChange } = useFormik({
        initialValues: {
            email: "",
            password: "",

        },
        validationSchema,

        onSubmit: async (values, action) => {

            try {
                setIsLoading(true);


                const res = await handleLogin(values);
                if (res.status === true) {
                    if (!res.emailVerified) {
                        sessionStorage.setItem('emailVerified', res.emailVerified);
                        sessionStorage.setItem("authToken", res.token);
                        await handleEmailOtp("email_verification");
                    }
                    else if (res.twoFactorAuth) {
                        set2FAshow(true);
                        sessionStorage.setItem("authToken", res.token);
                        return;
                    }

                    else {
                        localStorage.setItem("authToken", res.token);
                    }
                    setTimeout(() => {
                        toast({
                            title: "Login Successfuly",
                            description: "Enjoy our Service",
                            status: "success",
                            duration: 1000,
                            isClosable: true,
                            position: "top-right",
                        });
                    }, 1000);


                    navigate("/user-dashboard");
                }
            }
            catch (err) {
                toast({
                    title: "Something Went Wrong",
                    description: "plz check you credential",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
                console.log("Login Failded:", err);
            }
            finally {
                setIsLoading(false);
            }
            action.resetForm();


        }

    });




    return (
        <Box minH={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>

            <Flex

                maxW={'container.xxl'}
                justifyContent={'center'}  >
                <Card borderRadius={'none'}


                >

                    <Flex minW={{ base: 'container', sm: '500px', md: 'container.md', lg: 'container.lg' }} direction={{ base: 'column', sm: 'column', md: 'row' }}  >


                        <Box flex={1}
                            display={'flex'}
                            justifyContent={'center'} alignItems={'center'}
                            bgImage={'https://images.pexels.com/photos/6765368/pexels-photo-6765368.jpeg?auto=compress&cs=tinysrgb&w=600'}
                            bgSize={'cover'} bgPosition={'center'}
                            bgRepeat={'no-repeat'}
                        >

                        </Box>


                        <Box flex={1}
                        >

                            <Card borderRadius={'none'} >
                                <Flex justifyContent={'space-between'} px={3} alignItems={'center'} mt={5}>
                                    <Heading size={'lg'} fontWeight={'500'}>Login</Heading>
                                    <Button leftIcon={<CgArrowsExchange />} bg={'transparent'} color={'orange'} onClick={() => navigate('/signup')}>Sign up</Button>
                                </Flex>

                                <Box as='p' color={'gray'} maxW={'400px'} px={3} mt={5} my={3}  >Ready to Make Waves in Crypto? Let’s revolutionize your trading journey.</Box>
                                <Divider color={'gray'} opacity={0.5} />

                                <CardBody display={'flex'} justifyContent={'center'}>
                                    <Box maxW="md" borderRadius="md" w={'90%'}  >
                                        {
                                            is2FAshow ?
                                                <OTPInput
                                                    verification={"Email"}
                                                    email={values.email}
                                                    onEvent={'login'}
                                                    onSuccess={() => {
                                                        navigate('/user-dashboard');
                                                    }}

                                                />
                                                :
                                                <form onSubmit={(e) => {
                                                    e.preventDefault();
                                                    handleSubmit();
                                                }} >
                                                    {/* user Field */}

                                                    <FormControl isInvalid={errors.email && touched.email} mb={3}>
                                                        <FormLabel color={'gray'}  >Email</FormLabel>
                                                        <Input name="email" placeholder="Email" bg={bgcolor}  // Light gray background
                                                            _focus={{ bgcolor }}
                                                            value={values.email}
                                                            onChange={(e) => {
                                                                setEmail(e.target.value);
                                                                handleChange(e);
                                                            }}
                                                            onBlur={handleBlur} />
                                                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                                                    </FormControl>



                                                    {/* password Field */}
                                                    <FormControl isInvalid={errors.password && touched.password} mb={3}>
                                                        <FormLabel color={'gray'}>Password</FormLabel>
                                                        <InputGroup>

                                                            <Input name="password" type={showPassword ? "text" : "password"}
                                                                placeholder="Passwrod" bg={bgcolor}  // Light gray background
                                                                _focus={{ bgcolor }}
                                                                value={values.password}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur} />

                                                            <InputRightElement>
                                                                <IconButton
                                                                    bg={'transparent'}
                                                                    h="1.75rem"
                                                                    size=""
                                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                                    icon={showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                                                                    aria-label="Toggle Password Visibility"
                                                                    _hover={{ bg: 'transparent' }}
                                                                />
                                                            </InputRightElement>
                                                        </InputGroup>
                                                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                                                    </FormControl>







                                                    {/* CheckBox */}
                                                    <Flex justifyContent={'space-between'}>

                                                        <Checkbox mt={3}>
                                                            <Box color={'gray'} display={'flex'} justifyContent={'space-between'}  >
                                                                <Box>

                                                                    Remember me
                                                                </Box>
                                                            </Box>
                                                        </Checkbox>
                                                        <Link mt={3} color={isVisited ? 'gray' : 'green'} display={'flex'} justifyContent={'flex-end'} onClick={() => {
                                                            setIsVisited(true);
                                                            navigate('/forgetPassword')
                                                        }
                                                        }
                                                            isLoading
                                                            colorScheme='blue'
                                                        > Forgot Password ?</Link>
                                                    </Flex>
                                                    {/* Submit Button */}
                                                    <Button
                                                        sx={gradientButtonStyle}
                                                        isLoading={isLoading}
                                                        loadingText='Loading'
                                                        type="submit" bg={'orange'}
                                                        width="full"
                                                        mt={5}
                                                        _hover={{ bg: 'orange.500' }}>

                                                        Login

                                                    </Button>
                                                </form>
                                        }


                                    </Box>

                                </CardBody>

                                <Flex>
                                    <Divider color={'orange'} ml={3} flex={1} opacity={0.9} />
                                    <Box fontSize={'14px'} textAlign={'center'} flex={1}>Or login with</Box>
                                    <Divider mr={3} flex={1} opacity={0.9} color={'orange'} />
                                </Flex>

                                <Flex my={5} justifyContent={'center'} gap={10}>
                                    <Button variant={'outline'} boxSize={10} onClick={async () => await handleLoginWithGoogle()}>
                                        <Icon as={FcGoogle} boxSize={6}></Icon>
                                    </Button>
                                    {/* <Button variant={'outline'} boxSize={10}>
                                        <Icon as={FaApple} boxSize={6}></Icon>
                                    </Button>
                                    <Button variant={'outline'} boxSize={10}>
                                        <Icon as={FaTelegramPlane} color={'skyblue'} boxSize={6}></Icon>
                                    </Button> */}
                                </Flex>

                            </Card>
                        </Box>
                    </Flex>
                </Card>
            </Flex>
        </Box>


    )
}

export default Loginnew




