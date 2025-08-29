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
import { MdModeEdit } from "react-icons/md";
import { FaTwitter, FaFacebook } from "react-icons/fa";
import { MdOutlineThumbUp, MdOutlineThumbDownAlt } from "react-icons/md";
import { PiUserCircleThin } from "react-icons/pi";
import { useLocation } from 'react-router-dom';
import { FaIdCard } from 'react-icons/fa6';
import CryptoAccordianOthers from '../Accordian/CrtypAccordianOthers';
import { useOffer } from '../../Context/OfferContext';
const TradePartnerProfile = () => {
    const [data, setData] = useState();
    const [details, setDetails] = useState();
    const OfferFilter = {
        ad_id: '',
        user_id: data?.user_id ? data?.user_id : '',
        txn_type: '',
        cryptocurrency: '',
        paymentMethod: '',
        maxAmount: '',
        offerLocation: '',
        traderLocation: '',
        activeTrader: false,
        per_page: 10,
    }
    const { handleGetOffer } = useOffer();
    const location = useLocation();
    useEffect(() => {
        setData(location.state?.data);
    }, [location.state?.data])
    useEffect(() => {
        if (data) {
            getUserDetail();
        }
    }, [data])
    const getUserDetail = async () => {
        const res = await handleGetOffer(OfferFilter);
        setDetails(res?.data?.user);

    }
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
                                    <Box boxSize={3} bg={'green.400'} borderRadius={'50%'}></Box> {details?.last_seen_at}
                                </Flex>
                                <Flex alignItems={'center'} justifyContent={'center'} direction={'column'} gap={2}>
                                    {data?.user ? (<Avatar name={details?.username ? details?.username : details?.email} src={details?.profile_image_url} size={'xl'} />) : (<Spinner size={'xl'} />)
                                    }
                                    <Heading size={'lg'}> {details?.username}</Heading>
                                    <Flex gap={3} alignItems={'center'}>
                                        {
                                            details?.country}
                                        <Image boxSize={8} src={details?.country_flag_url}></Image>
                                    </Flex>
                                    <Button bg={'transparent'} _hover={{ bg: 'transparent' }} fontWeight={500} rightIcon={<MdModeEdit />}> Edit Profile</Button>
                                </Flex>
                            </Card>
                        </GridItem>
                        <GridItem colSpan={3}  >
                            <Card width={'full'} h={'full'} p={1} borderRadius={5}>
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
                                        <Box py={2} px={3} borderBottom={'1px solid #dcdcdc'} fontWeight={600} bg={'#f7f7f7'} w={'full'}>Verification</Box>
                                        {/* {verificationStatus.map((data, index) => ( */}
                                        <>
                                            <Box py={2} px={3} >
                                                <Flex gap={5} color={details?.phone_verified ? 'green.500' : 'red.500'}>
                                                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>

                                                        <FaPhoneAlt />
                                                    </Box>
                                                    <Box fontSize={'16px'} fontWeight={500}>Phone Verified</Box>
                                                </Flex>
                                            </Box>
                                            <Box py={2} px={3} >
                                                <Flex gap={5} color={details?.email_verified ? 'green.500' : 'red.500'}>
                                                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>

                                                        <FaEnvelope />
                                                    </Box>
                                                    <Box fontSize={'16px'} fontWeight={500}>Email Verified</Box>
                                                </Flex>
                                            </Box>
                                            <Box py={2} px={3} >
                                                <Flex gap={5} color={details?.id_verified ? 'green.500' : 'red.500'}>
                                                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>

                                                        <FaIdCard />
                                                    </Box>
                                                    <Box fontSize={'16px'} fontWeight={500}>id Verified</Box>
                                                </Flex>
                                            </Box>
                                            <Box py={2} px={3} >
                                                <Flex gap={5} color={details?.address_verified ? 'green.500' : 'red.500'}>
                                                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                                        <FaMapMarkerAlt />
                                                    </Box>
                                                    <Box fontSize={'16px'} fontWeight={500}>Address Verified</Box>
                                                </Flex>
                                            </Box>
                                        </>
                                        {/* ))} */}
                                    </Card>
                                </Flex>
                                <Flex w={'full'} direction={'column'}>
                                    <Card boxShadow={'lg'} border={'1px solid #dcdcdc'} borderRadius={5}>

                                        <Box py={2} px={3} borderBottom={'1px solid #dcdcdc'} fontWeight={600} bg={'#f7f7f7'} w={'full'}>Info</Box>
                                        {datas.map((data, index) => (
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
                                    <CryptoAccordianOthers title={'Active Offers'} btn1={'Buy Crypto'} btn2={'Sell Crypto'} isOptionButton={true} other_user_id={details?.user_id} />
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
                    {/* data1 */}
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


const datas = [
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



export default TradePartnerProfile
