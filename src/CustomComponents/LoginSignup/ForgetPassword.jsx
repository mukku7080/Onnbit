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
import { FaApple, FaTelegramPlane } from "react-icons/fa";
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';



const ForgetPasswrod = () => {

    const { handleSignupWithGoogle, error, handleForgotPassword } = useAuth();
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



    const bgcolor = useColorModeValue('gray.100', 'gray.700');



    const validationSchema = Yup.object({
        email: Yup.string().email("invalid email").required("*field is required"),

    });


    const { values, handleBlur, handleSubmit, errors, touched, handleChange } = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema,
        onSubmit: async (values, action) => {
            try {
                setIsLoading(true);
                const res = await handleForgotPassword(values.email);
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
                    navigate("/login");

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
            catch (error) {
                throw error;

            }
            finally {
                action.resetForm();
                setIsLoading(false);
            }





        }

    });

    const [isshow, setShow] = useState(false);
    return (
        <Flex minH={'100vh'} maxW={'container.xxl'} justifyContent={'center'} alignItems={'center'}>

            <Flex
                maxW={{ base: "95%", lg: '90%', xl: "70%" }}
                minW={{ base: "95%", sm: '90%', lg: '90%', xl: "70%" }}
                justifyContent={'center'} my={10} >
                <Card
                    w={'full'}
                    borderRadius={'none'} bg={'transparent'} >


                    <Flex
                        w={'full'}

                        direction={{ base: 'column', sm: 'column', md: 'row' }} >

                        <Flex w={'full'}
                            bgImage={'/imagelogo/security_new1.png'}
                            bgPosition={{ base: 'center', md: 'center', lg: 'center' }}
                            bgRepeat={'no-repeat'}
                            bgSize={'cover'}
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

                                    <Box borderRadius="md" w={{ base: '80%', md: '50%' }} ml={4}  >
                                        <Heading size={'lg'} fontWeight={'500'} textAlign={'start'}>Forget password</Heading>
                                        <Box as='p' color={'gray'} maxW={'400px'} my={3}  >password reset link will be sent to your email address</Box>



                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            handleSubmit();
                                        }} >



                                            {/* Email Field */}
                                            <FormControl isInvalid={errors.email && touched.email} mb={3}>
                                                <FormLabel color={'gray'}>Email</FormLabel>

                                                <Input

                                                    name="email"
                                                    type='text'
                                                    placeholder="Enter Email"
                                                    bg={bgcolor}
                                                    _focus={{ bgcolor }}
                                                    value={values.email}
                                                    onChange={(e) => {
                                                        handleChange(e);

                                                    }}
                                                    onFocus={() => setShow(true)}
                                                    onBlur={(e) => {

                                                        handleBlur(e);
                                                        setShow(false);
                                                    }}
                                                    borderRadius={5}

                                                />

                                                <FormErrorMessage>{errors.email}</FormErrorMessage>
                                            </FormControl>
                                            <Flex justifyContent={'center'} w={'full'} textAlign={'center'}>

                                                <Button isLoading={isLoading}
                                                    loadingText='Loading'
                                                    type="Submit"
                                                    bg={'orange'}
                                                    width="full"
                                                    mt={5}
                                                    _hover={{ bg: 'orange.500' }}
                                                    borderRadius={5}
                                                    w={{ base: '100%', sm: '100%', md: '100%', lg: '100%' }}
                                                >
                                                    Send Password Reset Link
                                                </Button>
                                            </Flex>

                                        </form>


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




export default ForgetPasswrod




