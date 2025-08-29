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
import { FcGoogle } from "react-icons/fc";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { FaApple, FaTelegramPlane } from "react-icons/fa";
import OTPInput from './OtpInput';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';



const PasswordReset = () => {

    const { handleSignupWithGoogle, error, handleResetPassword } = useAuth();
    const toast = useToast();

    const { token } = useParams();
    const [searchParams] = useSearchParams();


    const [email, setEmail] = useState("");
    const [resetToken, setResetToken] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    useEffect(() => {
        setResetToken(token);
        setEmail(searchParams.get("email"));


    }, [token, searchParams])





    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();



    const [issignup, setSignup] = useState(false);
    const bgcolor = useColorModeValue('gray.100', 'gray.700');



    const validationSchema = Yup.object({
        email: Yup.string().email("invalid email").required("*email is required"),
        password: Yup.string().min(6, "Minimum 8 characters").required("*Password is required"),
        cpass: Yup
            .string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("*Confirm Password is required"),
    });

    const { values, handleBlur, handleSubmit, errors, touched, handleChange } = useFormik({
        initialValues: {
            email: searchParams.get("email") || "",
            password: "",
            cpass: "",
            ts: false
        },
        validationSchema,
        onSubmit: async (values, action) => {
            try {
                console.log(email);
                console.log(resetToken);
                setIsLoading(true);
                const res = await handleResetPassword({ email, resetToken, newPassword: values.password });


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
        <Flex minH={'100vh'} maxW={'container.xxl'}   justifyContent={'center'} alignItems={'center'}>

            <Flex
             maxW={{ base: "90%", lg: '90%', xl: "70%" }}
             minW={{ base: "90%", sm: '90%', lg: '90%', xl: "70%" }}
              justifyContent={'center'} my={10} >
                <Card
                w={'full'}
                 borderRadius={'none'} bg={'transparent'} >


                    <Flex
                    w={'full'}
                      
                      direction={{ base: 'column', sm: 'column', md: 'row' }} >

                        <Flex w={'full'}
                            bgImage={'/imagelogo/forget.png'}
                            bgPosition={{base:'center',md:'right',lg:'right'}}
                            bgRepeat={'no-repeat'}
                            bgSize=""
                            position="relative"
                            _before={{
                                content: '""',
                                position: "absolute",
                                inset: 0,
                                backdropFilter: "blur(10px)", // Adjust blur strength
                                zIndex: -1,
                            }}
                        >

                            <Flex direction={'column'} borderRadius={'none'} w={'full'} bg="rgba(255, 255, 255, 0.2)" backdropFilter={{ base: "blur(10px)", md: 'none' }}>
                                <Flex justifyContent={'space-between'} px={3} alignItems={'center'} mt={5}>
                                    <Button leftIcon={<CgArrowsExchange />} bg={'transparent'} color={'orange'} onClick={() => navigate('/login')}>Log in</Button>
                                </Flex>

                                <Divider color={'gray'} opacity={0.5} />

                                <Flex display={'flex'}
                                    justifyContent={'space-between'}
                                    w={'full'}
                                    my={10}
                                    p={4}

                                >

                                    <Box borderRadius="md" w={{base:'80%',md:'50%'}} ml={4}  >
                                        <Heading size={'lg'} fontWeight={'500'} > Reset account password</Heading>

                                        <Flex as='p' color={'gray'}  w={'50%'}  my={3}   >Enter a new password for {email} </Flex>

                                        {issignup ?
                                            <OTPInput verification={"Email"} email={values.email} />
                                            :

                                            <form onSubmit={(e) => {
                                                e.preventDefault();
                                                handleSubmit();
                                            }} >



                                                {/* password Field */}
                                                <FormControl isInvalid={errors.password && touched.password} mb={3}>
                                                    <FormLabel color={'gray'}>New password</FormLabel>
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
                                                            borderRadius={0}

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
                                                    <FormLabel color={'gray'}>Re-enter password</FormLabel>
                                                    <Input as={Input} name="cpass" type="password" placeholder="" bg={bgcolor}  // Light gray background
                                                        _focus={{ bgcolor: 'none' }}
                                                        value={values.cpass}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} borderRadius={0} />

                                                    <FormErrorMessage>{errors.cpass}</FormErrorMessage>

                                                </FormControl>
                                                <Flex justifyContent={'center'} w={'full'} textAlign={'center'}>

                                                    <Button isLoading={isLoading}
                                                        loadingText='Loading'
                                                        type="Submit"
                                                        bg={'orange'}
                                                        width="full"
                                                        mt={5}
                                                        _hover={{ bg: 'orange.500' }}
                                                        borderRadius={0}
                                                        w={{ base:'50%',sm:'50%',md:'40%',lg:'30%'}}
                                                    >
                                                        Reset password
                                                    </Button>
                                                </Flex>

                                            </form>
                                        }

                                    </Box>

                                </Flex>

                                <Flex>
                                    <Divider color={'orange'} ml={3} flex={1} opacity={0.9} />
                                    <Box fontSize={'14px'} textAlign={'center'} flex={1}>Or sign up with</Box>
                                    <Divider mr={3} flex={1} opacity={0.9} color={'orange'} />
                                </Flex>

                                <Flex my={5} justifyContent={'center'} gap={10}>
                                    <Button variant={'outline'} boxSize={10}>
                                        <Icon as={FcGoogle} onClick={async () => await handleSignupWithGoogle()} boxSize={6}></Icon>
                                    </Button>
                                    <Button variant={'outline'} boxSize={10}>
                                        <Icon as={FaApple} boxSize={6}></Icon>
                                    </Button>
                                    <Button variant={'outline'} boxSize={10}>
                                        <Icon as={FaTelegramPlane} color={'skyblue'} boxSize={6}></Icon>
                                    </Button>
                                </Flex>

                            </Flex>
                        </Flex>
                    </Flex>

                </Card>
            </Flex>
        </Flex>


    )
}




export default PasswordReset




