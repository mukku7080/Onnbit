import React, { useEffect, useState } from 'react'
import {
    Box, Button, Card, Flex, Grid, GridItem, Heading,
    useColorModeValue,
    Avatar,
    Link,
    Badge,
    Spinner,
    Image,
    Divider

} from '@chakra-ui/react'

import { FaPhoneAlt, FaEnvelope, FaUserCircle, FaMapMarkerAlt } from "react-icons/fa";
import CryptoAccordion, { Mybadge } from '../Accordian/CryptoAccordion';
import { IoEyeOutline } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { FaTwitter, FaFacebook } from "react-icons/fa";
import { useUser } from '../../Context/userContext';
import { MdOutlineThumbUp, MdOutlineThumbDownAlt } from "react-icons/md";
import { PiUserCircleThin } from "react-icons/pi";
import BuySellWithNotification from '../Buy&Sell/BuySellWithNotification';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaIdCard } from 'react-icons/fa6';
import { grayGradient } from '../../Styles/Gradient';
import { gradientButtonStyle } from '../Wallet/CreateWallet';
import CryptoAccordianOthers from '../Accordian/CrtypAccordianOthers';
const Profile = () => {
    const location = useLocation();
    const { user } = useUser();
    const navigate = useNavigate();
    const bgColor = useColorModeValue('#f7f7f7', 'gray.500');
    const bgColor_tags = useColorModeValue('gray.200', 'gray.600');





    return (
        <>
            <Flex w={'container.xxl'} justifyContent={'center'} alignItems={'center'} my={10} marginTop={'54px'} direction={'column'} >
                <Flex
                    maxW={{ base: "95%", sm: '90%', lg: '95%', xl: "90%" }}
                    minW={{ base: "90%", sm: '90%', lg: '90%', xl: "90%" }}
                    w={'full'}
                    direction={'column'}
                    gap={5}
                    mt={{ base: 20, lg: 10 }}

                >
                    <Grid templateColumns={{ base: 'repeat(1,1fr)', sm: 'repeat(1,1fr)', md: 'repeat(1,1fr)', lg: 'repeat(1,1fr)', xl: 'repeat(4, 1fr)' }} rowGap={4} gap={{ xl: 5 }} w={'100%'}>


                        <GridItem colSpan={1} >
                            <Card borderRadius={5} py={4}>
                                <Flex alignItems={'center'} gap={2} pl={5} mb={5}>
                                    <Box boxSize={3} bg={'green.400'} borderRadius={'50%'}></Box> Active now
                                </Flex>
                                <Flex alignItems={'center'} justifyContent={'center'} direction={'column'} gap={2}>
                                    {
                                        user ? (<Avatar name={user?.username ? user.username : user.email} src={user.profile_image_url} size={'xl'} />) : (<Spinner size={'xl'} />)
                                    }
                                    <Heading size={'lg'}> {user?.username}</Heading>
                                    <Flex gap={3} alignItems={'center'} textTransform={'uppercase'}>
                                        {user?.country}
                                        <Image boxSize={5} src={user?.country_flag_url}></Image>
                                    </Flex>
                                    {/* <Button bg={'transparent'} _hover={{ bg: 'transparent' }} fontWeight={500} rightIcon={<MdModeEdit />}> Edit Profile</Button> */}
                                </Flex>
                            </Card>
                        </GridItem>
                        <GridItem colSpan={3}  >
                            <Card width={'full'} h={'full'} p={1} borderRadius={5}>
                                {/* <Flex justifyContent={'space-between'} alignItems={'center'} mx={2} direction={{ base: 'column', sm: 'row', md: 'row' }} gap={5}>

                                    <Flex direction={'column'} gap={4} color={'gray'} alignItems={{ base: 'center', sm: 'start' }} >
                                        <Box>Trust:Block</Box>
                                        <Flex gap={3}>
                                            <Box display={'flex'} alignItems={'center'}>

                                                <IoEyeOutline />
                                            </Box>
                                            <Box as='p'>

                                                Seen 21 our ago
                                            </Box>
                                        </Flex>
                                        <Flex gap={5}  >
                                            <Box border={'1px solid #228B22'} py={2} px={5} position={'relative'} color={'#228B22'}>  Feedback
                                                <Box as='span' position={'absolute'} top={-3} right={-3} >

                                                    <Mybadge bgcolor={'#228B22'} />
                                                </Box>

                                            </Box>
                                            <Box border={'1px solid #B22222'} py={2} px={5} position={'relative'} color={'#B22222'}>

                                                Feedback
                                                <Box as='span' position={'absolute'} top={-3} right={-3} >

                                                    <Mybadge bgcolor={'#B22222'} />
                                                </Box>

                                            </Box>
                                        </Flex>

                                    </Flex>
                                    <Flex gap={5} direction={{ base: 'row', sm: 'column', lg: 'row' }}>
                                        {
                                            socialIcons.map((data, index) => (

                                                <Button key={index} as={Link} href={data.link} borderRadius={0} bg={data.color} >{data.icon}</Button>
                                            ))
                                        }

                                    </Flex>
                                </Flex> */}
                                <UserDetails />
                            </Card>

                        </GridItem>
                    </Grid>
                    <Grid templateColumns={{ base: 'repeat(1,1fr)', sm: 'repeat(1,1fr)', md: 'repeat(1,1fr)', lg: 'repeat(1,1fr)', xl: 'repeat(4, 1fr)' }} rowGap={4} gap={{ xl: 5 }} w={'100%'} >
                        {/* Left Side nav column */}
                        <GridItem colSpan={1} bg={''}  >
                            <Flex width={'full'} gap={{ base: 5, xl: 5 }} direction={{ base: 'column', md: 'row', lg: 'row', xl: 'column' }}>
                                <Flex w={'full'} direction={'column'}>
                                    <Card boxShadow={'lg'} borderRadius={5} border={'1px solid #dcdcdc'} h={{ md: 'full', xl: 'auto' }}>
                                        <Box py={2} px={3} borderBottom={'1px solid #dcdcdc'} fontWeight={600} bg={bgColor} w={'full'}>Verification</Box>
                                        {/* {verificationStatus.map((data, index) => ( */}
                                        <>
                                            <Box py={1} px={3} >
                                                <Flex gap={5} fontWeight={500} color={user?.phone_verified ? 'green.500' : 'red.500'}>
                                                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>

                                                        <FaPhoneAlt />
                                                    </Box>
                                                    <Box color={user?.phone_verified ? 'green.500' : 'red.500'} _hover={{ bg: 'transparent' }} bg={'transparent'} p={0} fontSize={'16px'} as={Button} onClick={() => navigate('/settings/verification')} isDisabled={user?.phone_verified}  >Phone Verified</Box>
                                                </Flex>
                                            </Box>
                                            <Box py={1} px={3} >
                                                <Flex gap={5} fontWeight={500} color={user?.email_verified ? 'green.500' : 'red.500'}>
                                                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>

                                                        <FaEnvelope />
                                                    </Box>
                                                    <Box color={user?.email_verified ? 'green.500' : 'red.500'} _hover={{ bg: 'transparent' }} bg={'transparent'} p={0} fontSize={'16px'} as={Button} onClick={() => navigate('/settings/verification')} isDisabled={user?.email_verified} >Email Verified</Box>
                                                </Flex>
                                            </Box>
                                            <Box py={1} px={3} >
                                                <Flex gap={5} fontWeight={500} color={user?.id_verified ? 'green.500' : 'red.500'}>
                                                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>

                                                        <FaIdCard />
                                                    </Box>
                                                    <Box color={user?.id_verified ? 'green.500' : 'red.500'} _hover={{ bg: 'transparent' }} bg={'transparent'} p={0} fontSize={'16px'} as={Button} onClick={() => navigate('/settings/verification')} isDisabled={user?.id_verified}  >id Verified</Box>
                                                </Flex>
                                            </Box>
                                            <Box py={1} px={3}>
                                                <Flex gap={5} fontWeight={500} color={user?.address_verified ? 'green.500' : 'red.500'}>
                                                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                                        <FaMapMarkerAlt />
                                                    </Box>
                                                    <Box color={user?.address_verified ? 'green.500' : 'red.500'} _hover={{ bg: 'transparent' }} bg={'transparent'} p={0} fontSize={'16px'} as={Button} onClick={() => navigate('/settings/verification')} isDisabled={user?.address_verified}  >Address Verified</Box>
                                                </Flex>
                                            </Box>
                                        </>
                                        {/* ))} */}
                                    </Card>
                                </Flex>
                                <Flex w={'full'} direction={'column'}>
                                    <Card boxShadow={'lg'} border={'1px solid #dcdcdc'} borderRadius={5}>

                                        <Box py={2} px={3} borderBottom={'1px solid #dcdcdc'} fontWeight={600} bg={bgColor} w={'full'}>Info</Box>
                                        {users.map((data, index) => (
                                            <>
                                                <Box key={index} py={2} px={3}>
                                                    <Flex gap={5} justifyContent={'space-between'}>
                                                        <Box display={'flex'} fontWeight={550} justifyContent={'center'} alignItems={'center'}>

                                                            {data.label}
                                                        </Box>
                                                        <Box fontSize={'16px'}>{data.value}</Box>
                                                    </Flex>
                                                </Box>
                                            </>
                                        ))}
                                    </Card>

                                </Flex>
                            </Flex>
                        </GridItem>
                        {/* Left Side nav column end */}
                        <GridItem colSpan={3} bg={''}>
                            <Flex w={'full'} direction={'column'} gap={5}>
                                <Card borderRadius={5} gap={5}>

                                    <CryptoAccordion title={'Active Offers'} btn1={'Buy Crypto'} btn2={'Sell Crypto'} isOptionButton={true} />

                                </Card>
                                {/* <Card borderRadius={5}>

                                    <CryptoAccordion title={'Feedback'} btn1={'From Crypto Buyers'} btn2={'From Crypto Sellers'} />
                                </Card> */}


                            </Flex>

                        </GridItem>
                    </Grid>
                </Flex>
            </Flex>
        </>
    )
}

const UserDetails = () => {
    return (
        <Flex direction={'column'} gap={5}>
            <Flex justifyContent={'end'} >

                <Box fontSize={'12px'} bg={'orange.200'} px={2} borderTopRightRadius={5}>For 30 days range</Box>
            </Flex>
            <Flex justifyContent={'space-between'} gap={5} direction={{ base: 'column', md: 'row' }} >

                <Flex gap={{ base: 5, sm: 10, lg: 20 }} w={'full'} flex={1} justifyContent={'space-around'} >

                    <Flex direction={'column'} gap={5} >
                        {/*positive Feedback */}
                        <Flex bg={'green.100'} borderRadius={5} direction={'column'} gap={2} py={2}>
                            <Flex alignItems={'center'} justifyContent={'space-between'} gap={5} px={3} w={'200px'} color={'green.600'} >
                                <Box as='p' fontWeight={700} >+18</Box>
                                <MdOutlineThumbUp />

                            </Flex>
                            <Box px={3} fontSize={'12px'} color={'green.600'} fontWeight={500}>Positive Feedback</Box>

                        </Flex>
                        {/*Negative Feedback */}

                        <Flex bg={'red.100'} borderRadius={5} direction={'column'} gap={2} py={2}>
                            <Flex alignItems={'center'} justifyContent={'space-between'} gap={5} px={3} w={'200px'} color={'red.600'} >
                                <Box as='p' fontWeight={700} >-8</Box>
                                <MdOutlineThumbDownAlt />

                            </Flex>
                            <Box px={3} fontSize={'12px'} color={'red.600'} fontWeight={500}>Negative Feedback</Box>

                        </Flex>

                    </Flex>
                    <Flex direction={'column'} gap={10}>
                        <Flex direction={'column'}  ><Box color={'gray.500'} fontSize={'14px'} textAlign={{ base: 'end', md: 'start' }}>Trades Released</Box><Box textAlign={{ base: 'end', md: 'start' }}>1256</Box></Flex>
                        <Flex direction={'column'}  ><Box color={'gray.500'} fontSize={'14px'} textAlign={{ base: 'end', md: 'start' }}>Trades Partners</Box><Box textAlign={{ base: 'end', md: 'start' }}>1256</Box></Flex>

                    </Flex>
                </Flex>
                <Divider border={'1px solid #dcdcdc'} display={{ base: 'block', md: 'none' }} />
                <Flex gap={{ base: 5, sm: 10, lg: 20 }} w={'full'} flex={1} justifyContent={'space-around'}>
                    {/* user1 */}
                    <Flex direction={'column'} gap={4}  >

                        {
                            userValueDetail1.map((data, index) => (

                                <Flex key={index} direction={'column'}>
                                    <Box fontSize={'12px'} color={'gray.500'}>{data.label}</Box>
                                    <Flex alignItems={'center'} >
                                        <Box>

                                            <PiUserCircleThin size={'30px'} />
                                        </Box>

                                        <Box >{data.value}</Box>
                                    </Flex>
                                </Flex>
                            ))
                        }
                    </Flex>

                    {/* UserDetail2 */}
                    <Flex direction={'column'} gap={4} >

                        {
                            userValueDetail2.map((data, index) => (

                                <Flex key={index} direction={'column'} >
                                    <Box fontSize={'12px'} color={'gray.500'} textAlign={{ base: 'end', md: 'start' }} >{data.label}</Box>
                                    <Flex justifyContent={{ base: 'end', md: 'start' }} alignItems={'center'} >
                                        <Box>{data.value}</Box>
                                    </Flex>
                                </Flex>
                            ))
                        }
                    </Flex>



                </Flex>
            </Flex>
        </Flex>
    )
}

const userValueDetail1 = [
    { label: "Trusted By", value: "17 USERS" },
    { label: "Blocked By", value: "0 USERS" },
    { label: "Has Blocked", value: "5 USERS" },
]
const userValueDetail2 = [
    { label: "Trade Success", value: "99.3%" },
    { label: "AVG. TIME TO PAYMENT", value: "6m 20s" },
    { label: "AVG. TIME TO RELEASE", value: "3m 51s" },
    { label: "TRADE VOLUME", value: "150000-5000000 USD" },
]


const users = [
    { label: "Location:", value: "India" },
    { label: "Languages:", value: "English (English)" },
    { label: "Trade Partners:", value: 20 },
    { label: "Trades:", value: 26 },
    { label: "Trade Volume (BTC):", value: "less than 10 BTC" },
    { label: "Trade Volume (ETH):", value: "0 ETH" },
    { label: "Trade Volume (USDT):", value: "0 USDT" },
    { label: "Trade Volume (USDC):", value: "0 USDC" },
    { label: "Trusted By:", value: 1 },
    { label: "Blocked By:", value: 0 },
    { label: "Has Blocked:", value: 0 },
    { label: "Joined:", value: "1 year ago" },
];

const socialIcons = [
    { name: "Twitter", icon: <FaTwitter color='white' />, link: "https://twitter.com", color: '#55acee' },
    { name: "Facebook", icon: <FaFacebook color='white' />, link: "https://facebook.com", color: '#3b5998' },
    { name: "Email", icon: <FaEnvelope color='white' />, link: "mailto:example@example.com", color: '#444444' }
];



export default Profile
