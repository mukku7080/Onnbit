import {
    Box, Icon, Button, Collapse, Flex, IconButton, Popover, PopoverContent, Stack, Text, useDisclosure, PopoverTrigger, useColorModeValue, Center, Image, useColorMode, Menu, MenuButton, MenuItem, MenuList,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaArrowTrendUp } from "react-icons/fa6";
import { BiChevronRight } from "react-icons/bi";
import { IoMenuOutline, IoCloseOutline, IoBagOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { HiMiniArrowPath } from "react-icons/hi2";
import { LiaHandPointRightSolid } from "react-icons/lia";
import { MdDarkMode, MdKeyboardArrowDown, MdOutlineFileDownload } from "react-icons/md";
import { BsLightningCharge, BsQrCode } from "react-icons/bs";
import { CiLight, CiWallet } from "react-icons/ci";
import { GrTransaction } from "react-icons/gr";
import { SiConvertio } from "react-icons/si";
import { PiChecks } from "react-icons/pi";


import UserAvatar from '../Afterlogin/UserAvatar';
import PaymentDropdown from '../Dropdown/PaymentDropdown';
import { useUser } from '../../Context/userContext';
import { gradientButtonStyle } from '../Wallet/CreateWallet';

const Navbarnew = () => {
    //  const { user } = useUser();
    const navigate = useNavigate();
    const navigateTo = () => { navigate("/") }
    const { isOpen, onToggle } = useDisclosure();
    const { toggleColorMode } = useColorMode();
    const bgColor = useColorModeValue("gray.100", "gray.900");
    const textColor = useColorModeValue("black", "white");
    const [isdark, setDark] = useState(false);
    const token = localStorage.getItem("authToken");
    


    return (
        <Flex as='nav' bg={'#000000'} maxW={'container.xxl'} justifyContent={'center'} alignItems={'center'} direction={'column'}  >
            <Flex
                maxW={{ base: "90%", lg: '90%', xl: "90%" }}
                minW={{ base: "90%", sm: '90%', lg: '90%', xl: "90%" }}
                bg={'black'}
                color={'white'}
                minH={'48px'}
                align={'center'}
                justifyContent={'space-between'}
                py={2} >




                {/* NavSection */}
                <Flex gap={2} >
                    {/* ToggleIcon */}
                    <Flex flex={{ base: 1, md: 'auto' }} alignItems={'center'} display={{ base: 'flex', md: 'flex', lg: 'none', xl: 'none' }} >

                        <MobileNav />

                    </Flex>
                    {/* ToggleIcon End */}
                    <Center mr={{ lg: '5', xl: '10' }} onClick={navigateTo} cursor={'pointer'}>
                        <Image src='/imagelogo/cryptico.png' w={'50px'} h={'40px'} mx={0}></Image>
                        <Text
                            fontSize={'xl'}
                            mb={1}
                            fontWeight={'600'}
                            sx={{
                                "@media screen and (max-width: 254px)": {
                                    display: 'none'

                                }
                            }}
                        >CRYPTICO</Text>
                    </Center>
                    <Center>
                        <Flex display={{ base: 'none', md: 'none', lg: 'flex', xl: 'flex' }} >
                            <DesktopNav />
                        </Flex>
                    </Center>
                </Flex>
                {/*Login & Logout ButtonSection */}
                <Stack justify={'flex-end'} direction={'row'} spacing={6} gap={{ lg: 2, xl: 5 }}>
                    {
                        (token === null || token == "undefined") ?
                            <>
                                <Flex display={{ base: 'none', md: 'none', lg: 'flex', xl: 'flex' }} justifyContent={'center'} alignItems={'center'} gap={{ lg: 2, xl: 5 }}>

                                    <Button as={Link} size={'sm'} to='/login' padding={'0px 32px'} borderColor={'#ffffff99'} variant={'outline'} color={'white'} _hover={{ border: 'none', transition: '0.5s', backgroundImage: 'linear-gradient(to right, #FF512F 0%, #F09819 51%, #FF512F 600%)' }}>
                                        Log In
                                    </Button>

                                    <Button as={Link} sx={gradientButtonStyle} size={'sm'} to='/signup' padding={'0px 32px'} bgColor={'#ffb11a'} _hover={{ bg: 'orange' }} >
                                        Sign Up
                                    </Button>
                                </Flex>
                            </>
                            :
                            <UserAvatar />

                    }
                    {
                        token ? '' : <Button
                            sx={{
                                backgroundImage: 'linear-gradient(to right, #FF512F 0%, #F09819 51%, #FF512F 100%)',
                                textAlign: 'center',
                                transition: '0.5s',
                                backgroundSize: '200% auto',
                                color: 'white',

                                _hover: {
                                    backgroundPosition: 'right center',
                                    color: 'white',
                                    textDecoration: 'none',
                                }
                            }
                            }
                            onClick={() => {
                                setDark(!isdark)
                                toggleColorMode();
                            }} boxSize={10}
                            bg={'orange'}
                            borderRadius={'full'}>
                            {
                                isdark ? <Icon as={CiLight} boxSize={6} ></Icon> :
                                    <Icon as={MdDarkMode} boxSize={6} ></Icon>
                            }
                        </Button>
                    }
                </Stack>
                {/*Login & Logout ButtonSection end */}
            </Flex>
            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Flex>
    )
}


const DesktopNav = () => {
    const bgColor = useColorModeValue("gray.100", "gray.900");
    const textColor = useColorModeValue("black", "white");
    const [isMenuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();


    return (

        <>
            <Stack direction={'row'} spacing={{ lg: '3', xl: '10' }} >
                {
                    NAV_ITEMS.map((navitem, index) => (
                        <Box key={index} display={'flex'} justifyContent={'center'} >
                            <Popover trigger='hover' placement='bottom-start'>
                                <PopoverTrigger>
                                    <Box
                                        onClick={() => navigate(navitem.locate)}
                                        as={'a'}
                                        href={navitem.href ?? '#'}
                                        fontSize={'sm'}
                                        fontWeight={'medium'}
                                        color={'white'}
                                        display={'flex'}
                                        alignItems={'center'}
                                        justifyContent={'center'}
                                    // textDecoration={'underline'}


                                    >
                                        {navitem.label}
                                        <Flex alignItems={'center'} justifyContent={'center'}>

                                            {/* <Icon mt={1} color={'orange'} w={5} h={5} as={MdKeyboardDoubleArrowDown} /> */}
                                        </Flex>
                                    </Box>


                                </PopoverTrigger>
                                {navitem.children && (

                                    <PopoverContent>
                                        <Stack gap={5} borderRadius={0}>


                                            {
                                                navitem.children.map((child) => (

                                                    <DesktopSubNav key={child.label} {...child} />

                                                ))
                                            }
                                        </Stack>

                                    </PopoverContent>

                                )}
                            </Popover>

                        </Box>

                    ))
                }

                <Button size={'sm'} bg={'transparent'} color={'white'} _hover={{ bgColor: 'transparent' }} onClick={() => navigate('/createOffers')}>Create an Offer</Button>
                {/* DashboardButton */}
                <Menu isOpen={isMenuOpen} >
                    <MenuButton as={Button} variant="ghost" borderRadius={'none'} p={0} color={'white'} _hover={{ bg: "transparent" }}
                        _focus={{ bg: "transparent", boxShadow: "none" }}
                        _active={{ bg: "transparent" }}
                        size={'sm'}
                        onMouseEnter={() => setMenuOpen(true)}
                        onMouseLeave={() => setMenuOpen(false)}
                        // textDecoration={'underline'}


                        onClick={() => navigate('/user-dashboard')}
                    >
                        Dashboard
                    </MenuButton>
                    <MenuList borderRadius={5}
                        onMouseEnter={() => setMenuOpen(true)}
                        onMouseLeave={() => setMenuOpen(false)}

                    >
                        {userOption.map((item, index) => (
                            <MenuItem
                                key={index}
                                icon={item.icon}
                                color={textColor}
                                onClick={() => {
                                    if (item.name == "Log Out") {
                                        Logout();
                                    }
                                    else {
                                        navigate(`${item.to}`);

                                    }
                                }}
                                _hover={{ borderRight: '1px solid orange', bg: 'linear-gradient(90deg, rgba(236,240,155,0.7875525210084033) 24%, rgba(247,241,175,0.9864320728291317) 78%)' }}>
                                {item.btn_name}
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>

            </Stack>
        </>
    )
}


const DesktopSubNav = ({ label, href, logo, subLabel, icon }) => {
    const bgColor = useColorModeValue("gray.100", "gray.900");
    const textColor = useColorModeValue("black", "white");
    return (
        <Box

            as="a"
            href={href}
            color={textColor}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: 'gray.200' }}>
            <Flex direction={'row'} align={'center'} gap={4} onClick={() => navigateTo(`${href}`)}>
                {logo &&

                    <Image boxSize={10} src={logo}></Image>
                }
                {icon &&
                    <Flex >{icon}</Flex>
                }

                <Box >
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'orange' }}
                        fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'orange'} w={5} h={5} as={BiChevronRight} />
                </Flex>
            </Flex>
        </Box>
    )
}



const MobileNav = () => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const bgColor = useColorModeValue("gray.100", "gray.900");
    const textColor = useColorModeValue("black", "white");
    const navigateTo = () => { navigate("/") }

    return (
        <>
            <Button onClick={onOpen} bg={'transparent'} color={'white'} _hover={{ bg: 'transparent' }} px={0} display={'flex'} alignItems={'center'} justifyContent={'start'} >
                <IoMenuOutline size={30} />
            </Button>
            {/* Drawer Component */}
            <Drawer isOpen={isOpen} placement="left" onClose={onClose} transition={'0.5 ease'}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">
                        <Flex mr={{ lg: '5', xl: '10' }} onClick={navigateTo} cursor={'pointer'} alignItems={'center'} gap={1}>
                            <Image src='/imagelogo/cryptico.png' w={'50px'} h={'40px'} mx={0}></Image>
                            <Text
                                fontSize={'xl'}
                                mb={1}
                                fontWeight={'600'}
                                sx={{
                                    "@media screen and (max-width: 254px)": {
                                        display: 'none'

                                    }
                                }}
                            >CRYPTICO</Text>
                        </Flex>
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing={4}>

                            {
                                offcanvaButton.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <Flex key={index} direction={'column'}>
                                            <Button rightIcon={<BiChevronRight />} display={'flex'} justifyContent={'space-between'} onClick={() => {

                                                navigate(item.href);
                                                onClose();
                                            }
                                            }
                                            >
                                                {item.label}
                                            </Button>
                                        </Flex>
                                    </React.Fragment>
                                ))
                            }

                            {/* Login and Signup Buttons */}
                            <Stack direction={"row"} spacing={4} mt={6} display={'flex'} justifyContent={'center'}>
                                <Button as={Link} to="/login" padding="0px 32px" bgColor="#ffb11a" onClick={() => setTimeout(onClose, 300)}>
                                    Log In
                                </Button>
                                <Button as={Link} to="/signup" padding="0px 32px" bgColor="#ffb11a" onClick={() => setTimeout(onClose, 300)}>
                                    Sign Up
                                </Button>
                            </Stack>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth="1px">
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure()

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Box
                py={2}
                as="a"
                href={href ?? '#'}
                justifyContent="space-between"
                alignItems="center"
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={BiChevronRight}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(90deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Box>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Box as="a" key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Box>
                        ))}
                </Stack>
            </Collapse>



        </Stack>
    )
}





const NAV_ITEMS = [
    {
        label: <Button variant={'outline'} borderRadius={5} color={'white'} size={'sm'} px={4} _hover={{ bg: 'transparent' }} rightIcon={<MdKeyboardArrowDown />}>Buy</Button>,
        locate: '/buy',
        children: [
            {
                label: 'Buy Bitcoin',
                logo: '/imagelogo/bitcoin-btc-logo.png',
                subLabel: 'Search for offer to buy Bitcoin',
                href: '/buy?index=0'
            },
            {
                label: 'Buy Ethereum',
                logo: '/imagelogo/ethereum-eth-logo.png',
                subLabel: 'Search for offer to buy Ethereum',
                href: '/buy?index=1'

            },
            {
                label: 'Buy BNB',
                logo: '/imagelogo/bnb-bnb-logo.png',
                subLabel: 'Search for offer to buy Binance',
                href: '/buy?index=2',
            }, {
                label: 'Buy Tether',
                logo: '/imagelogo/tether-usdt-logo.png',
                subLabel: 'Search for offer to buy Tether',
                href: '/buy?index=3',
            },
        ],
    },

    {
        label: <Button variant={'outline'} borderRadius={5} color={'white'} size={'sm'} px={4} _hover={{ bg: 'transparent' }} rightIcon={<MdKeyboardArrowDown />}>Sell</Button>,
        locate: '/sell',
        children: [
            {
                label: 'Sell Bitcoin',
                logo: '/imagelogo/bitcoin-btc-logo.png',
                subLabel: 'Search for offer to sell Bitcoin',
                href: '/sell?index=0',
            },
            {
                label: 'Sell Ethereum',
                logo: '/imagelogo/ethereum-eth-logo.png',
                subLabel: 'Search for offer to sell Ethereum',
                href: '/sell?index=1',
            },
            {
                label: 'Sell BNB',
                logo: '/imagelogo/bnb-bnb-logo.png',
                subLabel: 'Search for offer to sell Binance',
                href: '/sell?index=2',
            }, {
                label: 'Sell Tether',
                logo: '/imagelogo/tether-usdt-logo.png',
                subLabel: 'Search for offer to sell Tether',
                href: '/sell?index=3',
            },
        ],
    },

    {
        label: <Button bg={'transparent'} variant={'outline'} borderRadius={5} color={'white'} size={'sm'} _hover={{ bg: 'transparent' }} rightIcon={<MdKeyboardArrowDown />}>Wallet</Button>,
        locate: '/wallet',
        children: [
            {
                label: 'Balance',
                icon: <CiWallet size={20} />,
                subLabel: 'Check you Crypto balacnce in Cryptico',
                href: '/wallet/balance',
            },
            {
                label: 'Lightining',
                icon: <BsLightningCharge size={20} />,
                subLabel: 'send and revice BTC with lightining speed and low fee',
                href: '/wallet/lightining',
            },
            {
                label: 'Transaction',
                icon: <GrTransaction size={20} />,
                subLabel: 'check your account transaction history',
                href: '/wallet/transactions',
            }, {
                label: 'Address',
                icon: <BsQrCode size={20} />,
                subLabel: 'use you wallet address to recieve crypto',
                href: '/wallet/addresses',
            },
            {
                label: 'Convert',
                icon: <SiConvertio size={20} />,
                subLabel: 'convert fund from one to another cypto',
                href: '/wallet/convert',
            },
        ],
    },





];

const userOption = [
    {
        icon: <FaArrowTrendUp />,
        btn_name: "Trade History",
        to: '/user-dashboard/tradehistory'
    },
    {
        icon: <HiMiniArrowPath />,
        btn_name: "Recent Trade Partners",
        to: '/user-dashboard/recentTradePartners'

    },
    {
        icon: <IoBagOutline />,
        btn_name: " My Offers",
        to: '/user-dashboard/myOffers'

    },
    {
        icon: <LiaHandPointRightSolid />,
        btn_name: "Favorite Offers",
        to: '/user-dashboard/favoriteOffers'

    },
    {
        icon: <MdOutlineFileDownload />,
        btn_name: "Trade Statistics",
        to: '/user-dashboard/tradeStatistics'

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

const offcanvaButton = [
    { label: 'Wallet', href: '/wallet' },
    { label: 'Dashboard', href: '/user-dashboard' },
    { label: 'Create an Offer', href: '/createOffers' },
]
export default Navbarnew