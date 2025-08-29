import {
    Box, Button, Card, Collapse, Divider, Flex, Grid, GridItem, Heading, IconButton, useDisclosure,
    Image, Link, useColorModeValue
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { FaArrowTrendUp } from "react-icons/fa6";
import { HiMiniArrowPath } from "react-icons/hi2";
import { IoBagOutline } from "react-icons/io5";
import { LiaHandPointRightSolid } from "react-icons/lia";
import { MdOutlineFileDownload, MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { BsLightningCharge } from "react-icons/bs";
import { PiChecks } from "react-icons/pi";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../../Context/userContext';
import BuySellWithNotification from '../../Buy&Sell/BuySellWithNotification';
import { gradientButtonStyle } from '../../Wallet/CreateWallet';
import { useOtherDetail } from '../../../Context/otherContext';
import { useAccount } from '../../../Context/AccountContext';
import { useAuth } from '../../../Context/AuthContext';



const UserDashboardNew = () => {

    const bgcolor = useColorModeValue('gray.100', 'gray.700');
    const [tag, setTag] = useState("TradeHistory");
    const navigate = useNavigate();
    const [istoogle, setToogle] = useState(false);
    const { isOpen, onToggle } = useDisclosure();
    const { isOpen: isOpen1, onToggle: onToggle1 } = useDisclosure();
    const { user, error, handleUserDetail } = useUser();
    const { handleGetAllNotification } = useOtherDetail();
    const location = useLocation();
    useEffect(() => {
        const res = handleUserDetail();
    }, [])


    // useEffect(() => {
    //     const lastSegment = location.pathname.split("/").filter(Boolean).pop();
    //     setTag(lastSegment);
    // }, [location])
    useEffect(() => {
        handleGetAllNotification();
    }, [])
    return (
        <Flex maxW={'container.xxl'} bg={''} justifyContent={'center'} alignItems={'center'} direction={'column'} gap={10} my={10} marginTop={'54px'}>


            <Flex
                // minW={'80%'}
                maxW={{ base: "90%", lg: '90%', xl: "90%" }}
                minW={{ base: "90%", sm: '90%', lg: '90%', xl: "90%" }}
                bg={''}
                direction={'column'}
                gap={5}
                mx={5}
                mt={{ base: 20, lg: 10 }}
            >



                <Flex gap={5} direction={'column'}>
                    {/*content Heading and toggle layer */}
                    <Flex flex={1} direction={'column'} gap={5} display={{ base: 'flex', xl: 'none' }}>
                        <Card h={{ md: '50px', lg: '50px', xl: '120px' }} w={'full'} borderRadius={5} bg={'transparent'} boxShadow={'none'} direction={'row'} justifyContent={'start'} >
                            <Flex w={'full'} >

                                <Heading size={'lg'} display={'flex'} alignItems={{ base: 'start', sm: 'center' }} px={4} > {tag}</Heading>
                                <Flex justify={'flex-end'} alignItems={'center'} flexWrap={'wrap'} flex={{ base: 1, md: 'auto' }} display={{ base: 'flex', md: 'flex', lg: 'none', xl: 'none' }} pr={{ base: '20px', sm: '20px', md: '20px', lg: '0px' }} gap={{ base: 2, sm: 5 }} >

                                    <Button
                                        size={'sm'}
                                        rightIcon={istoogle ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
                                        onClick={() => {
                                            setToogle(!istoogle);
                                            onToggle();
                                        }}
                                        display={{ base: 'flex', sm: 'flex', md: 'flex', lg: 'none', xl: 'none' }}
                                        aria-label={'Toggle Action'}
                                        colorScheme='orange'

                                    >
                                        Action
                                    </Button>

                                    <IconButton

                                        onClick={onToggle1}
                                        color={'black'}
                                        fontFamily={'heading'}
                                        fontSize={'4xl'}
                                        icon={isOpen1 ? <IoCloseOutline /> : <IoMenuOutline />}
                                        variant={'ghost'}
                                        aria-label={'Toggle Navigation'}

                                    />

                                </Flex>
                            </Flex>

                        </Card>
                        <Collapse in={isOpen} animateOpacity transition={{ exit: { delay: 0 }, enter: { duration: 0.5 } }}>
                            <Mobilecollapse1 />
                        </Collapse>

                        <Collapse in={isOpen1} animateOpacity transition={{ exit: { delay: 0 }, enter: { duration: 0.5 } }}>
                            <Mobilecollapse2 onClose={onToggle1} tag={tag} setTag={setTag} />
                        </Collapse>
                    </Flex>
                    {/* content Heading and toggle layer */}
                    <Flex w={'full'} display={{ base: 'flex', lg: 'none' }}>

                        <Outlet />
                    </Flex>

                    <Flex gap={5}>

                        <Flex flex={.4} direction={'column'} gap={5} display={{ base: 'none', md: 'flex' }} >
                            <Card h={{ md: '50px', lg: '50px', xl: '120px' }} borderRadius={5} bg={'transparent'} boxShadow={'none'} direction={'row'} display={{ sm: 'none', xl: 'flex' }} justifyContent={'center'} >

                                <Heading size={'lg'} display={'flex'} alignItems={'center'}  > {tag}</Heading>

                            </Card>
                            <Card h={'120px'} borderRadius={5} display={{ base: 'none', lg: 'flex', xl: 'none' }} direction={'column'} justifyContent={'center'} alignItems={'center'} boxShadow={'lg'} w={'full'}>

                                <Box>
                                    Account Level : 1
                                </Box>
                                <Box>
                                    Account Limit: 87022.8
                                </Box>
                            </Card>

                            {/* Left nav Start Here */}
                            <Card borderRadius={5} display={{ base: 'none', sm: 'none', md: 'none', lg: 'flex' }} justifyContent={'center'} boxShadow={'lg'} >

                                <Flex justifyContent={'center'} alignItems={'center'} direction={'column'} mb={5} >
                                    <Flex justifyContent={'center'} alignItems={'center'} direction={'column'} minW={'100%'} maxH={'80%'}  >


                                        {
                                            userOption.map((data, index) => (


                                                <>

                                                    <Button as={Button}
                                                        width={'100%'}
                                                        bg={'transparent'}
                                                        // borderBottom={'1px solid #dcdcdc'}
                                                        borderRadius={'none'}
                                                        key={index} py={8}
                                                        isDisabled={data.to ? false : true}





                                                        justifyContent="flex-start"
                                                        _hover={{
                                                            bg: 'linear-gradient(90deg, rgba(236,240,155,0.7875525210084033) 24%, rgba(247,241,175,0.9864320728291317) 78%)',
                                                            // borderRight: '1px solid black'
                                                        }}
                                                        onClick={() => {
                                                            setTag(data.btn_name);
                                                            navigate(`${data.to}`);

                                                        }}

                                                    >
                                                        <Flex align="center" gap={2}>
                                                            {data.icon}
                                                            <span>{data.btn_name}</span>
                                                        </Flex>
                                                    </Button>
                                                    <Divider></Divider>
                                                </>



                                            ))
                                        }



                                    </Flex>


                                    <Flex direction={'column'} width={'100%'} justifyContent={'center'} alignItems={'center'}   >


                                        {
                                            userOption1.map((data, index) => (

                                                <>

                                                    <Button
                                                        borderRadius={'none'}
                                                        width={'100%'}
                                                        bg={'transparent'}
                                                        key={index} py={8}
                                                        isDisabled={data.to ? false : true}

                                                        justifyContent="flex-start"
                                                        _hover={{
                                                            bg: 'linear-gradient(90deg, rgba(236,240,155,0.7875525210084033) 24%, rgba(247,241,175,0.9864320728291317) 78%)',
                                                        }}
                                                        onClick={() => {

                                                            setTag(data.btn_name)
                                                            navigate(`${data.to}`);

                                                        }

                                                        }


                                                    >
                                                        <Flex align="center" gap={2}>
                                                            {data.icon}
                                                            <span>{data.btn_name}</span>
                                                        </Flex>
                                                    </Button>
                                                    <Divider></Divider>
                                                </>




                                            ))
                                        }
                                        <Button sx={gradientButtonStyle} mt={5} w={'80%'} >
                                            <Flex maxW={'80%'} justifyContent={'center'}>
                                                any suggestion for us?
                                            </Flex>
                                        </Button>




                                    </Flex>


                                </Flex>


                            </Card>
                        </Flex>

                        <Flex flex={1.6} gap={5} direction={'column'}  >
                            <Flex gap={5} >

                                <Flex flex={1} display={{ base: 'none', xl: 'flex' }} >

                                    <Card h={'120px'} borderRadius={5} direction={'column'} justifyContent={'center'} alignItems={'center'} boxShadow={'lg'} w={'full'}>

                                        <Box>
                                            Account Level : 1
                                        </Box>
                                        <Box>
                                            Account Limit: 87022.8
                                        </Box>
                                    </Card>
                                </Flex>
                                <Flex flex={1}>

                                    <Card h={'120px'} borderRadius={5} display={{ base: 'none', md: 'none', lg: 'flex' }} direction={'column'} justifyContent={'center'} alignItems={'center'} boxShadow={'lg'} w={'full'}>

                                        <Flex gap={5} mx={1} >
                                            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                                <Image src='/imagelogo/phoneverify.png' h={'50px'} w={'50px'} />
                                            </Box>
                                            <Flex direction={'column'}>
                                                <Box color={'red'}>

                                                    Phone Number Not Verified
                                                </Box>
                                                <Box maxW={{ md: '300px', xl: '200px' }}>
                                                    Take a minute to verify your number
                                                </Box>
                                                <Link color={'orange'}> plz verify</Link>
                                            </Flex>
                                        </Flex>
                                    </Card>
                                </Flex>
                                <Flex flex={1}>
                                    <Card h={'120px'} borderRadius={5} display={{ base: 'none', md: 'none', lg: 'flex' }} direction={'column'} justifyContent={'center'} alignItems={'center'} boxShadow={'lg'} w={'full'}>

                                        <Flex gap={5} mx={1}>
                                            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                                <Image src='/imagelogo/eaglesecure.png' h={'50px'} w={'50px'} />
                                            </Box>
                                            <Flex direction={'column'}>
                                                <Box color={user?.twoFactorAuth ? 'green' : 'red'} fontWeight={500}>
                                                    {
                                                        user?.twoFactorAuth ? '2FA Enabled' : '2FA Disabled'
                                                    }

                                                </Box>
                                                <Box maxW={'200px'}>
                                                    Enabling 2FA  is to enhance security.
                                                </Box>
                                                <Link color={'orange'} onClick={() => navigate('/settings/security')} >Setup 2FA Now</Link>
                                            </Flex>
                                        </Flex>
                                    </Card>

                                </Flex>
                            </Flex>
                            <Flex flex={1} display={{ base: 'none', lg: 'flex' }}>

                                <Outlet />
                            </Flex>


                        </Flex>
                    </Flex>
                </Flex>


            </Flex>


        </Flex>
    )
}


const Mobilecollapse1 = () => {

    return (

        <>
            <Grid templateColumns={{ base: "1fr", md: "1fr" }} gap={1} width={'full'} transition="all 0.5s ease-in-out"   >

                <GridItem>
                    <Card display={{ base: 'flex', sm: 'flex', md: 'flex', lg: 'none' }} h={'100px'} direction={'column'} justifyContent={'center'} alignItems={''} boxShadow={'lg'} borderRadius={0} >




                        <Flex gap={10} mx={5}>
                            <Box>
                                <Image src='/imagelogo/Master.png' h={'50px'} w={'50px'} />
                            </Box>
                            <Flex direction={'column'}>
                                <Box>

                                    Account Level : 1

                                </Box>
                                <Box>
                                    Account Limit: 87022.8

                                </Box>
                            </Flex>
                        </Flex>


                    </Card>
                </GridItem>
                <GridItem>
                    <Card display={{ base: 'flex', sm: 'flex', md: 'flex', lg: 'none' }} h={'100px'} borderRadius={0} direction={'column'} justifyContent={'center'} alignItems={''} boxShadow={'lg'}>

                        <Flex gap={10} mx={5}>
                            <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                <Image src='/imagelogo/phoneverify.png' h={'50px'} w={'50px'} />
                            </Box>
                            <Flex direction={'column'}>
                                <Box color={'red'} sx={{
                                    "@media screen and (max-width: 420px)": {
                                        fontSize: '12px'
                                    }
                                }}>

                                    Phone Number Not Verified
                                </Box>
                                <Box sx={{
                                    "@media screen and (max-width: 420px)": {
                                        fontSize: '12px'
                                    }
                                }}>
                                    Take a minute to verify your number
                                </Box>
                                <Link color={'orange'} sx={{
                                    "@media screen and (max-width: 420px)": {
                                        fontSize: '12px'
                                    }
                                }}>verify</Link>
                            </Flex>
                        </Flex>
                    </Card>
                </GridItem>
                <GridItem>
                    <Card display={{ base: 'flex', sm: 'flex', md: 'flex', lg: 'none' }} h={'100px'} borderRadius={0} direction={'column'} justifyContent={'center'} alignItems={''} boxShadow={'lg'}>

                        <Flex gap={10} mx={5}>
                            <Box display={'flex'} alignItems={'center'}>
                                <Image src='/imagelogo/eaglesecure.png' h={'50px'} w={'50px'} />
                            </Box>
                            <Flex direction={'column'}>
                                <Box color={'red'} sx={{
                                    "@media screen and (max-width: 420px)": {
                                        fontSize: '12px'
                                    }
                                }}>

                                    2FA Not Enabled
                                </Box>
                                <Box maxW={'300px'} sx={{
                                    "@media screen and (max-width: 420px)": {
                                        fontSize: '12px'
                                    }
                                }}>
                                    Enabling two-factor authentication is great way to secure your account.
                                </Box>
                                <Link color={'orange'} sx={{
                                    "@media screen and (max-width: 420px)": {
                                        fontSize: '12px'
                                    }
                                }}>Setup 2FA Now</Link>
                            </Flex>
                        </Flex>
                    </Card>
                </GridItem>
            </Grid>
        </>
    )



}
const Mobilecollapse2 = ({ onClose, tag, setTag }) => {
    const navigate = useNavigate();

    return (

        <>

            <Card borderRadius={0} display={{ base: 'flex', sm: 'flex', md: 'flex', lg: 'none' }} justifyContent={'center'} width={'full'} >

                <Flex justifyContent={'start'} alignItems={'center'}  >
                    <Flex direction={'column'} width={'100%'} >


                        {
                            userOption.map((data, index) => (



                                <>

                                    <Button
                                        sx={gradientButtonStyle}
                                        width={'100%'}
                                        borderRadius={5}
                                        border={'0px'} bg={'transparent'}
                                        py={8}
                                        key={index}
                                        justifyContent="flex-start"
                                        // _hover={{
                                        //     bg: 'linear-gradient(90deg, rgba(236,240,155,0.7875525210084033) 24%, rgba(247,241,175,0.9864320728291317) 78%)',
                                        // }}
                                        onClick={() => {

                                            setTag(data.btn_name);
                                            navigate(`${data.to}`);
                                            onClose();
                                        }

                                        }


                                    >
                                        <Flex align="center" gap={2}>
                                            {data.icon}
                                            <span>{data.btn_name}</span>
                                        </Flex>
                                    </Button>
                                    <Divider />
                                </>



                            ))
                        }


                    </Flex>


                </Flex>


            </Card>
        </>
    )



}






const userOption = [
    {
        icon: <FaArrowTrendUp />,
        btn_name: "Trade History",
        to: 'tradehistory'
    },
    {
        icon: <HiMiniArrowPath />,
        btn_name: "Recent Trade Partners",
        to: 'recentTradePartners'

    },
    {
        icon: <IoBagOutline />,
        btn_name: " My Offers",
        to: 'myOffers'

    },
    {
        icon: <LiaHandPointRightSolid />,
        btn_name: "Favorite Offers",

    },
    {
        icon: <MdOutlineFileDownload />,
        btn_name: "Trade Statistics",

    },
    {
        icon: <BsLightningCharge />,
        btn_name: "Trader Program Badges",
    },
    {
        icon: <PiChecks />,
        btn_name: "Invite a Friend",
        to: 'inviteFriends'

    },
]

const userOption1 = [
    {
        icon: <FaArrowTrendUp />,
        btn_name: "Account Setting",
        to: '/settings'

    },
    {
        icon: <HiMiniArrowPath />,
        btn_name: "Criptico Community "
    },
    {
        icon: <IoBagOutline />,
        btn_name: " Developer"
    }


]

export default UserDashboardNew