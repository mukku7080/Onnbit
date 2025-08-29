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
import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../../../Context/userContext';
import BuySellWithNotification from '../../Buy&Sell/BuySellWithNotification';



const UserDashboard = () => {

    const bgcolor = useColorModeValue('gray.100', 'gray.700');
    const [tag, setTag] = useState("Trade History");
    const navigate = useNavigate();
    const [istoogle, setToogle] = useState(false);
    const { isOpen, onToggle } = useDisclosure();
    const { isOpen: isOpen1, onToggle: onToggle1 } = useDisclosure();
    const { user, error } = useUser();
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




                {/* First Grid Row---------------------------------------------------------------------- */}
                <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }} gap={5} width={'full'} transition="all 0.5s ease-in-out" >
                    <GridItem bg={'wite'} colSpan={{ base: 3, md: 3, lg: 3, xl: 1 }}  >
                        <Card h={{ md: '50px', lg: '50px', xl: '120px' }} borderRadius={5} bg={'transparent'} boxShadow={'none'} border={'1px solid rgba(128, 128, 128)'} direction={'row'} display={'flex'} justifyContent={'start'} >

                            <Heading size={'lg'} display={'flex'} alignItems={'center'} > {tag}</Heading>
                            <Flex justify={'flex-end'} flex={{ base: 1, md: 'auto' }} display={{ base: 'flex', md: 'flex', lg: 'none', xl: 'none' }} pr={{ base: '20px', sm: '20px', md: '20px', lg: '0px' }} gap={5} >

                                <Button
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
                        </Card>
                    </GridItem>


                    <GridItem display={{ base: 'none', md: 'none', lg: 'block' }} colSpan={3}>
                        <Flex w={'full'} gap={5}>

                            <Flex flex={1}>

                                <Card h={'120px'} borderRadius={5} display={{ base: 'none', md: 'none', lg: 'flex' }} direction={'column'} justifyContent={'center'} alignItems={'center'} boxShadow={'lg'} w={'full'}>

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
                                            <Link color={'orange'}>verify</Link>
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
                                            <Box color={'red'}>

                                                2FA Not Enabled
                                            </Box>
                                            <Box maxW={'200px'}>
                                                Enabling 2FA  is great way to secure your account.
                                            </Box>
                                            <Link color={'orange'}>Setup 2FA Now</Link>
                                        </Flex>
                                    </Flex>
                                </Card>

                            </Flex>
                        </Flex>
                    </GridItem>
                    {/* <GridItem display={{ base: 'none', md: 'none', lg: 'block' }}>
                    </GridItem> */}
                    <GridItem display={{ base: 'none', md: 'none', lg: 'block' }}>

                    </GridItem>

                </Grid>
                <Collapse in={isOpen} animateOpacity>
                    <Mobilecollapse1 />
                </Collapse>

                <Collapse in={isOpen1} animateOpacity>
                    <Mobilecollapse2 />
                </Collapse>
                {/* First Grid Row  End---------------------------------------------------------------------- */}



                {/* Second Grid Row---------------------------------------------------------------------- */}

                <Grid templateColumns={'repeat(4,1fr)'} width={'full'} gap={5}>

                    {/* Left Side Nav ------------------------------------------------------------------------- */}
                    <GridItem >
                        <Card borderRadius={5} display={{ base: 'none', sm: 'none', md: 'none', lg: 'flex' }} justifyContent={'center'} boxShadow={'lg'} >

                            <Flex justifyContent={'center'} alignItems={'center'} direction={'column'} my={5} >
                                <Flex justifyContent={'center'} alignItems={'center'} direction={'column'} gap={5} minW={'100%'} maxH={'80%'}  >


                                    {
                                        userOption.map((data, index) => (




                                            <Button as={Button}
                                                // to={data.to}
                                                width={'90%'}
                                                borderRadius={'none'}
                                                border={'1px solid #dcdcdc'} bg={'transparent'}
                                                key={index} p={7}




                                                justifyContent="flex-start"
                                                _hover={{
                                                    bg: 'linear-gradient(90deg, rgba(236,240,155,0.7875525210084033) 24%, rgba(247,241,175,0.9864320728291317) 78%)',
                                                    borderRight: '1px solid black'
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


                                        ))
                                    }



                                </Flex>
                                <Divider width={'90%'} my={3} />


                                <Flex direction={'column'} gap={5} width={'100%'} justifyContent={'center'} alignItems={'center'}   >


                                    {
                                        userOption1.map((data, index) => (



                                            <Button
                                                borderRadius={'none'}
                                                width={'90%'}
                                                border={'1px solid #dcdcdc'} bg={'transparent'}
                                                key={index} p={7}
                                                px={20}
                                                justifyContent="flex-start"
                                                _hover={{
                                                    bg: 'linear-gradient(90deg, rgba(236,240,155,0.7875525210084033) 24%, rgba(247,241,175,0.9864320728291317) 78%)',
                                                    borderRight: '1px solid black'
                                                }}
                                                onClick={() => setTag(data.btn_name)}


                                            >
                                                <Flex align="center" gap={2}>
                                                    {data.icon}
                                                    <span>{data.btn_name}</span>
                                                </Flex>
                                            </Button>


                                        ))
                                    }
                                    <Button mt={3} colorScheme='orange'>Do You have any idea for us?</Button>




                                </Flex>


                            </Flex>


                        </Card>
                    </GridItem>
                    {/* Left Side Nav End ------------------------------------------------------------------------- */}




                    {/* Right Side Content ------------------------------------------------------------------------- */}
                    <GridItem colSpan={{ base: 4, sm: 4, md: 4, lg: 3 }}>
                        <Outlet />


                        {/* <RecentTradeHistory /> */}

                        {/* <TradeHistory /> */}
                        {/* <RecentTradePartnerAccordian /> */}

                    </GridItem>

                    {/* Right Side Content End------------------------------------------------------------------------- */}

                </Grid>
            </Flex>

            {/* <Flex minW={'70%'}>

            </Flex> */}
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
                                <Box color={'red'}>

                                    Phone Number Not Verified
                                </Box>
                                <Box sx={{
                                    "@media screen and (max-width: 420px)": {
                                        fontSize: '12px'
                                    }
                                }}>
                                    Take a minute to verify your number
                                </Box>
                                <Link color={'orange'}>verify</Link>
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
                                <Box color={'red'}>

                                    2FA Not Enabled
                                </Box>
                                <Box maxW={'300px'} sx={{
                                    "@media screen and (max-width: 420px)": {
                                        fontSize: '12px'
                                    }
                                }}>
                                    Enabling two-factor authentication is great way to secure your account.
                                </Box>
                                <Link color={'orange'}>Setup 2FA Now</Link>
                            </Flex>
                        </Flex>
                    </Card>
                </GridItem>
            </Grid>
        </>
    )



}
const Mobilecollapse2 = () => {

    return (

        <>

            <Card borderRadius={0} display={{ base: 'flex', sm: 'flex', md: 'flex', lg: 'none' }} justifyContent={'center'} width={'full'}>

                <Flex justifyContent={'start'} alignItems={'center'} >
                    <Flex direction={'column'} gap={5} m={4} width={'100%'} >


                        {
                            userOption.map((data, index) => (





                                <Button
                                    width={'100%'}
                                    borderRadius={'none'}
                                    border={'0px'} bg={'transparent'}
                                    key={index}
                                    justifyContent="flex-start"
                                    _hover={{
                                        bg: 'linear-gradient(90deg, rgba(236,240,155,0.7875525210084033) 24%, rgba(247,241,175,0.9864320728291317) 78%)',
                                        borderRight: '1px solid black'
                                    }}
                                    onClick={() => setTag(data.btn_name)}

                                >
                                    <Flex align="center" gap={2}>
                                        {data.icon}
                                        <span>{data.btn_name}</span>
                                    </Flex>
                                </Button>


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
        to: 'favoriteOffers'

    },
    {
        icon: <MdOutlineFileDownload />,
        btn_name: "Trade Statistics",
        to: 'tradeStatistics'

    },
    {
        icon: <BsLightningCharge />,
        btn_name: "Trader Program Badges",
        to: 'tpBadges'
    },
    {
        icon: <PiChecks />,
        btn_name: "Invite a Friend",
        to: 'iFriend'

    },
]

const userOption1 = [
    {
        icon: <FaArrowTrendUp />,
        btn_name: "Account Setting"
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

export default UserDashboard