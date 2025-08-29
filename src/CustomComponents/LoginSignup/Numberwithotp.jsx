import { Card, CardBody, Divider, Flex, Heading, Icon, Image, Link, useColorModeValue } from '@chakra-ui/react'
import React, { useState } from 'react'
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
} from "@chakra-ui/react";

import OTPInput from './OtpInput';
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaTelegramPlane } from "react-icons/fa";


const Numberwithotp = () => {
    const [issignup, setSignup] = useState(false);
    const bgcolor = useColorModeValue('gray.100', 'gray.700');



    const validationSchema = Yup.object({

        mobile: Yup.string().min(10, "Minimum 10 characters").required("*Number is required"),

    });

    const { values, handleBlur, handleSubmit, errors, touched, handleChange } = useFormik({
        initialValues: {

            mobile: "",
        },
        validationSchema,
        onSubmit: (values, action) => {

            console.log(values);
            setSignup(true);
            action.resetForm();


        }

    });



    return (
        <Box minH={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>

            <Flex maxW={'container.xxl'} justifyContent={'center'} my={10} >
                <Card borderRadius={'none'} >


                    <Flex minW={{ base: 'container', sm: 'container.sm', md: 'container.md', lg: 'container.lg' }} direction={{ base: 'column', sm: 'column', md: 'row' }}  >


                        <Box flex={1}
                            display={'flex'}
                            justifyContent={'center'} alignItems={'center'}
                            bgImage={'https://bitrader-next.thetork.com/images/account/1.png'}
                            bgSize={'cover'} bgPosition={'center'}
                            bgRepeat={'no-repeat'}
                        >

                        </Box>


                        <Box flex={1} >

                            <Card borderRadius={'none'}>
                                <Flex justifyContent={'space-between'} px={3} alignItems={'center'} mt={5}>
                                    <Heading size={'lg'} fontWeight={'500'}>Register</Heading>
                                    <Button leftIcon={<CgArrowsExchange />} bg={'transparent'} color={'orange'}>Log in</Button>
                                </Flex>

                                <Box as='p' color={'gray'} maxW={'400px'} px={3} >Welcome aboard! Your gateway to peer-to-peer crypto trading starts here.</Box>
                                <Divider color={'gray'} opacity={0.5} />

                                <CardBody display={'flex'} justifyContent={'center'}>
                                    <Box maxW="md" borderRadius="md"  >
                                        {issignup ?
                                            <OTPInput verification={'Mobile'} />
                                            :

                                            <form onSubmit={(e) => {
                                                e.preventDefault();
                                                handleSubmit();
                                            }} >


                                                <FormControl isInvalid={errors.mobile && touched.mobile} mb={3}>
                                                    <FormLabel color={'gray'}  >Mobile</FormLabel>
                                                    <Input as={Input} name="mobile" placeholder="+91" bg={bgcolor}   // Light gray background
                                                        _focus={{ bgcolor }}
                                                        value={values.mobile}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur} />
                                                    <FormErrorMessage>{errors.mobile}</FormErrorMessage>
                                                </FormControl>





                                                {/* Submit Button */}
                                                <Button type="submit" bg={'orange'} width="full" mt={5}   >
                                                    Get otp
                                                </Button>
                                            </form>
                                        }
~
                                    </Box>

                                </CardBody>
                                <Flex>
                                    <Divider color={'orange'} ml={3} flex={1} opacity={0.9} />
                                    <Box fontSize={'14px'} textAlign={'center'} flex={1}>Or sign up with</Box>
                                    <Divider mr={3} flex={1} opacity={0.9} color={'orange'} />
                                </Flex>

                                <Flex my={5} justifyContent={'center'} gap={10}>
                                    <Button variant={'outline'} boxSize={10}>
                                        <Icon as={FcGoogle} boxSize={6}></Icon>
                                    </Button>
                                    <Button variant={'outline'} boxSize={10}>
                                        <Icon as={FaApple} boxSize={6}></Icon>
                                    </Button>
                                    <Button variant={'outline'} boxSize={10}>
                                        <Icon as={FaTelegramPlane} color={'skyblue'} boxSize={6}></Icon>
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

export default Numberwithotp




