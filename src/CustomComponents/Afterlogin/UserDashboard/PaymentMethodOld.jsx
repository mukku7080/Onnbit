import React from 'react'
import {
    Box, Button, Card, Flex, Grid, GridItem, Heading, Image,
    useColorModeValue,
    Avatar,
    Link,
    Badge,
    ButtonGroup,
    IconButton,

} from '@chakra-ui/react'

import { IoCubeOutline } from "react-icons/io5";
import { AiOutlineSecurityScan } from "react-icons/ai";
import { CiCircleQuestion } from "react-icons/ci";
import { BsBank } from "react-icons/bs";
import { TbFlag3 } from "react-icons/tb";
import { FaEnvelope } from "react-icons/fa";
import { MdOutlineDeveloperMode, MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaTwitter, FaFacebook, FaRegUser, } from "react-icons/fa";
import { GoPlus } from "react-icons/go";



const PaymentMethodOld = () => {
    return (
        <>
            <Flex w={'container.xxl'} justifyContent={'center'} alignItems={'center'} my={10} h={'90vh'} >
                <Flex w={{ base: '95%', md: '90%', lg: '80%', xl: '70%' }} direction={'column'} gap={5}>


                    <Grid templateColumns={{ base: 'repeat(1,1fr)', sm: 'repeat(1,1fr)', md: 'repeat(1,1fr)', lg: 'repeat(1,1fr)', xl: 'repeat(4, 1fr)' }} rowGap={4} gap={{ xl: 5 }} w={'100%'} >
                        {/* Left Side nav column */}

                        <GridItem colSpan={1} bg={''}   >
                            <Flex width={'full'} gap={{ base: 5, xl: 5 }} direction={{ base: 'column', md: 'row', lg: 'row', xl: 'column' }}>


                                <Flex w={'full'} direction={'column'}>
                                    <Card boxShadow={'lg'} border={'1px solid rgba(128, 128, 128, 0.3)'} borderRadius={0} p={2}>

                                        {
                                            navOption.map((data, index) => (




                                                <Button as={Button}
                                                    // to={data.to}

                                                    borderRadius={'none'}
                                                    border={'0px'} bg={'transparent'}
                                                    key={index}



                                                    justifyContent="flex-start"
                                                    _hover={{
                                                        bg: 'linear-gradient(90deg, rgba(236,240,155,0.7875525210084033) 24%, rgba(247,241,175,0.9864320728291317) 78%)',
                                                        borderRight: '1px solid orange',
                                                        color: 'orange.500'
                                                    }}
                                                    onClick={() => {
                                                        setTag(data.btn_name);
                                                        navigate(`${data.to}`);

                                                    }}

                                                >
                                                    <Flex align="center" gap={2} p={2} fontWeight={300} fontSize={'15px'}>
                                                        {data.icon}
                                                        <Box as='span'>{data.btn_name}</Box>
                                                    </Flex>
                                                </Button>


                                            ))
                                        }
                                    </Card>

                                </Flex>
                            </Flex>

                        </GridItem>
                        {/* Left Side nav column end */}


                        {/* Rightside Section start */}

                        <GridItem colSpan={3} bg={''}>
                            <Flex w={'full'} direction={'column'} gap={5} >
                                <Card borderRadius={0} p={4} gap={5} border={'1px solid rgba(128, 128, 128, 0.3)'}  >
                                    <Heading size={'md'} fontWeight={500}>Bank Accounts</Heading>
                                    <Box as='p' fontSize={'14px'} color={'gray'}>Add your bank account details below. You can share these details with your trade partner via trade chat, for bank transfer trades.</Box>
                                    <ButtonGroup isAttached variant='ghost' colorScheme='orange'>
                                        <Button size={'sm'}>Add Account</Button>
                                        <IconButton size={'sm'} icon={<GoPlus />}></IconButton>
                                    </ButtonGroup>

                                    <Flex border={'1px solid orange'}>
                                        <Flex direction={'column'} gap={3} p={4} w={'full'}>
                                            <Box as='p' fontWeight={600} fontSize={'12px'} color={'gray'}>PERSONAL</Box>
                                            <Flex justifyContent={'space-between'} w={'full'} >
                                                <Flex gap={2} wrap={'wrap'} >

                                                    <Button size={'sm'} colorScheme='orange'>UCO Bank</Button>
                                                    <Flex gap={2} >

                                                        <Button size={'sm'} colorScheme='teal'>INR</Button>
                                                        <Box justifyContent={'center'} alignItems={'center'} display={'flex'} color={'gray'} fontSize={'14px'}>45215.00</Box>
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
                                <Card borderRadius={0} p={4} gap={5} border={'1px solid rgba(128, 128, 128, 0.3)'}>

                                    <Heading size={'md'} fontWeight={500}>Online Wallets</Heading>
                                    <Box as='p' fontSize={'14px'} color={'gray'}>Add your online wallets below.
                                    </Box>
                                    <ButtonGroup isAttached variant='ghost' colorScheme='orange'>
                                        <Button size={'sm'}>Add New</Button>
                                        <IconButton size={'sm'} icon={<GoPlus />}></IconButton>
                                    </ButtonGroup>

                                    <Flex justifyContent={'center'}
                                        alignItems={'center'} border={'1px solid orange'}>
                                        <Box
                                        >
                                            <Image p={5} src='imagelogo/cryptico.png' w={'200px'} h={'160px'} opacity={0.1}></Image>

                                        </Box>

                                    </Flex>
                                </Card>


                            </Flex>

                        </GridItem>
                        {/* Right side section end */}
                    </Grid>
                </Flex>
            </Flex>
        </>
    )
}




const socialIcons = [
    { name: "Twitter", icon: <FaTwitter color='white' />, link: "https://twitter.com", color: '#55acee' },
    { name: "Facebook", icon: <FaFacebook color='white' />, link: "https://facebook.com", color: '#3b5998' },
    { name: "Email", icon: <FaEnvelope color='white' />, link: "mailto:example@example.com", color: '#444444' }
];
const navOption = [
    {
        icon: <FaRegUser />,
        btn_name: "Profile",
        to: ''
    },
    {
        icon: <AiOutlineSecurityScan />,
        btn_name: "Security",
        to: ''

    },
    {
        icon: <BsBank />,
        btn_name: " Payment Method",
        to: ''

    },
    {
        icon: <MdOutlineDeveloperMode />,
        btn_name: "Developer",
        to: ''

    },
    {
        icon: <TbFlag3 />,
        btn_name: "Verification",
        to: ''

    },
    {
        icon: <IoCubeOutline />,
        btn_name: "Connected Apps & Websites",
        to: ''
    },
    {
        icon: <CiCircleQuestion />,
        btn_name: "Security Questions",
        to: ''

    },
]



export default PaymentMethodOld
