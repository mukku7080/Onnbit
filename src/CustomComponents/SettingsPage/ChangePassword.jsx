import { Card, Link, CardBody, Divider, Flex, Heading, Icon, Image, InputGroup, InputRightElement, IconButton, useColorModeValue } from '@chakra-ui/react'
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Checkbox, useToast
} from "@chakra-ui/react";
import { Form, Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { FcGoogle } from "react-icons/fc";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { FaApple, FaTelegramPlane } from "react-icons/fa";
import { useUser } from '../../Context/userContext';

const ChangePassword = () => {
    const { handleChangePassword } = useUser()

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [token, setToken] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();
    const bgcolor = useColorModeValue('gray.100', 'gray.700');



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
        onSubmit: async (values, actions) => {
            setIsLoading(true);
            try {

                const res = await handleChangePassword(values);
                if (res.status === true) {
                    toast(
                        {
                            title: "Password Changed Successfully",
                            status: "success",
                            duration: 2000,
                            isClosable: true,
                            position: 'top-right'

                        }

                    )

                }
            }
            catch (error) {

                if (error.errors) {
                    Object.keys(error.errors).forEach((key) => {
                        error.errors[key].forEach((message, index) => {
                            toast({
                                title: `Error in ${key}]`, // Dynamic key and index
                                description: message, // Error message
                                status: "error",
                                duration: 5000,
                                isClosable: true,
                                position: "top-right",
                            });
                        });
                    });
                }
            }
            finally {
                setIsLoading(false);
                actions.resetForm();


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
        <>
            <Flex direction={'column'}
                borderRadius={5}
                gap={5}
                p={5}
                w={'full'}
                bgImage={'/imagelogo/security_new1.png'}
                bgPosition={{ base: 'center', sm: 'right', md: 'right', lg: 'left', xl: 'right' }}
                bgRepeat={'no-repeat'}
                bgSize="cover"

                position="relative"
                _before={{

                    content: '""',
                    position: "absolute",
                    inset: 0,
                    backdropFilter: "blur(0px)", // Adjust blur strength
                    zIndex: -1,
                }}

            >
                <Flex direction={'column'} gap={5}
                    p={5}
                    w={'full'}
                    bg="rgba(255, 255, 255, 0.2)" backdropFilter={{ base: "blur(10px)", md: 'none' }}
                >

                    <Heading size={'lg'}>Change Password</Heading>
                    <Flex>
                        <Box></Box>
                        <Box> If you forgot your current password, logout, go to the Login screen and click <Link color={'blue.500'}>Forgot password.</Link></Box>
                    </Flex>
                    <Flex w={{ base: '100%', md: '70%', lg: '50%' }}


                    >
                        <form style={{ width: '100%' }} onSubmit={handleSubmit} >

                            <FormControl isInvalid={errors.currentPassword && touched.currentPassword} mb={3}>
                                <FormLabel color={'gray'}>Current Password</FormLabel>
                                <InputGroup>

                                    <Input
                                        name="currentPassword"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Passwrod"
                                        bg={bgcolor}
                                        _focus={{ bgcolor }}
                                        value={values.currentPassword}
                                        onChange={(e) => {
                                            handleChange(e);
                                            // validatePassword(e.target.value);

                                        }}
                                        // onFocus={() => setShow(true)}
                                        onBlur={(e) => {

                                            handleBlur(e);
                                            // setShow(false);
                                        }}
                                        w={'full'}

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
                            <FormControl isInvalid={errors.password && touched.password} mb={3}>
                                <FormLabel color={'gray'}>Password</FormLabel>
                                <InputGroup>

                                    <Input
                                        name="password"
                                        type={showPassword1 ? "text" : "password"}
                                        placeholder="Passwrod"
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
                                            onClick={() => setShowPassword1((prev) => !prev)}
                                            icon={showPassword1 ? <IoMdEye /> : <IoMdEyeOff />}
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
                            <Button isLoading={isLoading} loadingText="loading..." w={{ base: '175px', sm: '150px' }} variant={'outline'} colorScheme='pink' type='submit'>Change Password</Button>

                        </form>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}
export default ChangePassword;