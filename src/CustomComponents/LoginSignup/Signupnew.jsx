import { Card, CardBody, Divider, Flex, Heading, Icon, Image, InputGroup, InputRightElement, IconButton, useColorModeValue } from '@chakra-ui/react'
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
    Checkbox, useToast
} from "@chakra-ui/react";
import axios from 'axios'
import { FcGoogle } from "react-icons/fc";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { FaApple, FaTelegramPlane } from "react-icons/fa";
import OTPInput from './OtpInput';
// import { useAuth } from '../AuthContext/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { gradientButtonStyle } from '../Wallet/CreateWallet';



const Signupnew = () => {

    const { handleSignup, handleEmailOtp, handleSignupWithGoogle, error } = useAuth();
    const toast = useToast();
    const bgcolor = useColorModeValue('gray.100', 'gray.700');
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [token, setToken] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [issignup, setSignup] = useState(false);
    const location = useLocation();


    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const referralCode = searchParams.get("refer");
        if (referralCode) {
            localStorage.setItem("referralCode", referralCode);
            searchParams.delete("refer");
            navigate({ pathname: location.pathname, search: searchParams.toString() }, { replace: true });

        }

    }, [location.search, navigate]);
    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            navigate("/user-dashboard"); // Redirect logged-in users
        }
    }, []);





    const validationSchema = Yup.object({
        email: Yup.string().email("invalid email").required("*email is required"),
        password: Yup.string().min(6, "Minimum 6 characters").required("*Password is required"),
        // mobile: Yup.string().min(10, "Minimum 10 characters").required("*Number is required"),
        cpass: Yup
            .string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("*Confirm Password is required"),
        ts: Yup.boolean().oneOf([true], "*You must accept the Terms of Service"),
    });

    const { values, handleBlur, handleSubmit, errors, touched, handleChange } = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            mobile: "",
            cpass: "",
            referralCode: localStorage.getItem("referralCode") || "",
            ts: false
        },
        validationSchema,
        onSubmit: async (values, action) => {
            try {
                setIsLoading(true);
                const res = await handleSignup(values);
                if (res.status === true) {
                    try {
                        sessionStorage.setItem('authToken', res.token);
                        setToken(res.token);
                        setSignup(true);
                        setTimeout(() => {
                            toast({
                                title: "Registered Successfully",
                                status: "success",
                                duration: 3000,
                                isClosable: true,
                                position: "top-right",
                            });

                        }, 1000)
                        setTimeout(() => {
                            toast({
                                title: "Email OTP Sent",
                                description: "OTP has been sent on your email..",
                                status: "info",
                                duration: 5000,
                                isClosable: true,
                                position: "top-right",
                            });
                        }, 3000);


                        const operation = 'email_verification'
                        const otpResposne = await handleEmailOtp(operation);
                    }
                    catch (err) {
                        console.log("error:", err.otpResposne ? err.otpResposne.data : err.message);
                    }
                }


                action.resetForm();
            }
            catch (err) {
                toast({
                    title: "Signup Failed",
                    description: error.message || "An error occurred during signup.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
                console.log("error:", err.res ? err.res.data : err.message);
            }
            finally {
                setIsLoading(false);
            }




        }

    });
    const [ismobile, setMobile] = useState(false);
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
        <Box minH={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>

            <Flex maxW={'container.xxl'} justifyContent={'center'} my={10} >
                <Card borderRadius={'none'} >


                    <Flex minW={{ base: 'container', sm: '500px', md: 'container.md', lg: 'container.lg' }} direction={{ base: 'column', sm: 'column', md: 'row' }}  >


                        <Box flex={1}
                            display={'flex'}
                            justifyContent={'center'} alignItems={'center'}
                            bgImage={'https://images.pexels.com/photos/6765372/pexels-photo-6765372.jpeg?auto=compress&cs=tinysrgb&w=600'}
                            bgSize={'cover'} bgPosition={'center'}
                            bgRepeat={'no-repeat'}
                        >

                        </Box>


                        <Box flex={1} >

                            <Card borderRadius={'none'}>
                                <Flex justifyContent={'space-between'} px={3} alignItems={'center'} mt={5}>
                                    <Heading size={'lg'} fontWeight={'500'}>Register</Heading>
                                    <Button leftIcon={<CgArrowsExchange />} bg={'transparent'} color={'orange'} onClick={() => navigate('/login')}>Log in</Button>
                                </Flex>

                                <Box as='p' color={'gray'} maxW={'400px'} px={3} my={3} >Welcome aboard! Your gateway to peer-to-peer crypto trading starts here.</Box>
                                <Divider color={'gray'} opacity={0.5} />
                                {/* <Flex pr={3} justifyContent={'center'}>
                                    <Button color={'gray'} bg={'transparent'} _hover={{ borderBottom: '1px solid orange', textDecoration: 'none' }} as={Link} onClick={() => setMobile(false)}>Email</Button>
                                    <Button color={'gray'} bg={'transparent'} _hover={{ borderBottom: '1px solid orange', textDecoration: 'none' }} as={Link} onClick={() => setMobile(true)}>Mobile Number</Button>
                                </Flex> */}
                                <CardBody display={'flex'} justifyContent={'center'}>
                                    <Box maxW="md" borderRadius="md"  >
                                        {issignup ?
                                            <OTPInput
                                                verification={"Email"}
                                                email={values.email}
                                                onEvent={'email_verification'}
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
                                                {
                                                    ismobile ?

                                                        <FormControl isInvalid={errors.mobile && touched.mobile} mb={3}>
                                                            <FormLabel color={'gray'}  >Mobile</FormLabel>
                                                            <Input as={Input} name="mobile" placeholder="+91" bg={bgcolor}   // Light gray background
                                                                _focus={{ bgcolor }}
                                                                value={values.mobile}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur} />
                                                            <FormErrorMessage>{errors.mobile}</FormErrorMessage>
                                                        </FormControl>
                                                        :

                                                        <FormControl isInvalid={errors.email && touched.email} mb={3}>
                                                            <FormLabel color={'gray'}  >Email</FormLabel>
                                                            <Input name="email" placeholder="Email" bg={bgcolor}  // Light gray background
                                                                _focus={{ bgcolor }}
                                                                value={values.email}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur} />
                                                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                                                            {error &&
                                                                <>
                                                                    <Box m={3} as='p' color={'red'}>{error?.errors?.email[0]}</Box>
                                                                </>}
                                                        </FormControl>


                                                }

                                                {/* password Field */}
                                                <FormControl isInvalid={errors.password && touched.password} mb={3}>
                                                    <FormLabel color={'gray'}>Password</FormLabel>
                                                    <InputGroup>

                                                        <Input
                                                            name="password"
                                                            type={showPassword ? "text" : "password"}
                                                            placeholder="Password"
                                                            bg={bgcolor}
                                                            _focus={{ bgcolor }}
                                                            value={values.password}
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                                validatePassword(e.target.value);

                                                            }}
                                                            onFocus={() => setShow(true)}
                                                            onBlur={(e) => {

                                                                handleBlur(e);
                                                                setShow(false);
                                                            }}

                                                        />
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



                                                {/* Chekboxsection--------------------------------------------------------------------------- */}


                                                {

                                                    isshow &&
                                                    <Flex color={'gray'} mb={3} >
                                                        <Flex flex={1} direction={'column'}>

                                                            <Checkbox fontSize={'10px'} isChecked={validations.length} colorScheme="green">


                                                                <Box fontSize={'12px'}>

                                                                    Above eight characters
                                                                </Box>
                                                            </Checkbox>
                                                            <Checkbox fontSize={'10px'} isChecked={validations.lowercase} colorScheme="green">
                                                                <Box fontSize={'12px'}>

                                                                    Includes one lowercase letter
                                                                </Box>
                                                            </Checkbox>
                                                            <Checkbox isChecked={validations.uppercase} colorScheme="green">
                                                                <Box fontSize={'12px'}>

                                                                    Includes one uppercase letter
                                                                </Box>
                                                            </Checkbox>
                                                        </Flex>

                                                        <Flex flex={1} direction={'column'}>


                                                            <Checkbox isChecked={validations.number} colorScheme="green" >
                                                                <Box fontSize={'12px'}>

                                                                    Includes one number
                                                                </Box>
                                                            </Checkbox>
                                                            <Checkbox isChecked={validations.specialChar} colorScheme="green">
                                                                <Box fontSize={'12px'}>

                                                                    Includes one special character
                                                                </Box>
                                                            </Checkbox>
                                                        </Flex>


                                                    </Flex>
                                                }

                                                {/* Confirmpassword */}


                                                <FormControl isInvalid={errors.cpass && touched.cpass} mb={3}>
                                                    <FormLabel color={'gray'}>Conform password</FormLabel>
                                                    <Input as={Input} name="cpass" type="password" placeholder="" bg={bgcolor}  // Light gray background
                                                        _focus={{ bgcolor }}
                                                        value={values.cpass}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} />

                                                    <FormErrorMessage>{errors.cpass}</FormErrorMessage>

                                                </FormControl>




                                                <FormControl isInvalid={errors.ts && touched.ts}>

                                                    <Checkbox mt={5} name='ts' isChecked={values.ts} onChange={handleChange} onBlur={handleBlur} ><Box fontSize={'10px'} color={'gray'}  >
                                                        By clicking “Create Account”, you agree to  <Box as='span' fontSize={'12px'} color={'orange'}>Terms of Service</Box>  and <Box as='span' fontSize={'12px'} color={'orange'}>Privacy Policy</Box>
                                                    </Box>
                                                    </Checkbox>
                                                    <FormErrorMessage>{errors.ts}</FormErrorMessage>

                                                </FormControl>
                                                {/* Submit Button */}
                                                <Button isLoading={isLoading}
                                                    sx={gradientButtonStyle}
                                                    loadingText='Loading'
                                                    type="submit" bg={'orange'}
                                                    width="full"
                                                    mt={5}
                                                    _hover={{ bg: 'orange.500' }}

                                                >
                                                    Sign up
                                                </Button>

                                            </form>
                                        }

                                    </Box>

                                </CardBody>

                                <Flex>
                                    <Divider color={'orange'} ml={3} flex={1} opacity={0.9} />
                                    <Box fontSize={'14px'} textAlign={'center'} flex={1}>Or sign up with</Box>
                                    <Divider mr={3} flex={1} opacity={0.9} color={'orange'} />
                                </Flex>

                                <Flex my={5} justifyContent={'center'} gap={10}>
                                    <Button variant={'outline'} boxSize={10}>
                                        <Icon as={FcGoogle} onClick={async () => await handleSignupWithGoogle()} boxSize={6}></Icon>
                                    </Button>

                                </Flex>

                            </Card>
                        </Box>





                    </Flex>

                </Card>
            </Flex>
        </Box>


    )
}




export default Signupnew




