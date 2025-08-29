import { Avatar, AvatarBadge, Badge, Menu, MenuButton, useColorModeValue, useColorMode, Icon, MenuList, MenuItem, Button, Flex, Box, IconButton, Spinner, Divider } from "@chakra-ui/react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { useState, useEffect } from "react";
import { FaUser, FaCreditCard, FaCog, FaHistory, FaUsers, FaGift, FaExchangeAlt, FaComments, FaSignOutAlt } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdDarkMode, MdOutlineFileDownload } from "react-icons/md";

import { CiLight, CiWallet } from "react-icons/ci";

import NotificationBell from "./Notificationbell";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import { useUser } from "../../Context/userContext";
import { gradientButtonStyle } from "../Wallet/CreateWallet";


const UserAvatar = () => {
    const navigate = useNavigate();
    const { handleLogout } = useAuth();
    const { user } = useUser();
    const { toggleColorMode } = useColorMode();
    const bgColor = useColorModeValue("gray.100", "gray.900");
    const textColor = useColorModeValue("black", "white");
    const [isdark, setDark] = useState(false);


    const Logout = async () => {
        try {

            const res = await handleLogout();
            if (res.status === true) {
                navigate('/');
                window.location.reload();
            }

        }
        catch (err) {
            console.log("Error:", err.res ? err.res.data : err.message);
        }


    }
    return (
        <Flex justifyContent={'center'} alignItems={'center'} gap={5}>
            <Flex gap={2} alignItems={'center'}>
                <Box display={{ base: 'none', sm: 'flex' }} as="span" fontSize={'10px'} textAlign={'end'}> {user == null ? "loading...." : user.email} <br />5000.00 INR</Box>

                <Menu  >
                    <MenuButton as={Button} variant="ghost" borderRadius={'none'} p={0} rightIcon={<MdKeyboardArrowDown color="white" />} _hover={{ bg: "transparent" }}
                        _focus={{ bg: "transparent", boxShadow: "none" }}
                        _active={{ bg: "transparent" }}
                    >
                        {user ? (
                            <Avatar border={'1px solid white'} name={user.name ? user.name : user.email} size="sm" src={user && user.profile_image_url} />
                        ) : (
                            <Spinner size="xs" color="white" />
                        )}

                    </MenuButton>
                    <MenuList borderRadius={5} w={'300px'}>
                        <MenuItem bg={'none'} display={'flex'} justifyContent={'end'}>
                            <Flex justifyContent={'space-between'} alignItems={'center'} w={'100%'} py={1} >

                                <Box  display={'flex'} sx={gradientButtonStyle} justifyContent={'center'} alignItems={'center'} textAlign={'center'} onClick={() => {
                                    setDark(!isdark)
                                    toggleColorMode();
                                }} boxSize={8}
                                    bg={bgColor}
                                    borderRadius={'full'}
                                >

                                    {
                                        isdark ? <Icon as={CiLight} boxSize={4} ></Icon> :
                                            <Icon as={MdDarkMode} boxSize={4} ></Icon>
                                    }
                                </Box>
                                <Box as="p" color={'gray'}>Switch Mode</Box>

                            </Flex>

                        </MenuItem>
                        <Divider />
                        {menuItems.map((item, index) => (
                            <MenuItem
                                key={index}
                                icon={item.icon}
                                color={'gray.500'}
                                onClick={() => {
                                    if (item.name == "Log Out") {
                                        Logout();
                                    }
                                    else {
                                        navigate(`${item.to}`);

                                    }
                                }}
                                _hover={{ borderRight: '1px solid orange', bg: 'linear-gradient(90deg, rgba(236,240,155,0.7875525210084033) 24%, rgba(247,241,175,0.9864320728291317) 78%)' }}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>
            </Flex>


            <Flex display={{ base: 'none', lg: 'flex' }} >

                <NotificationBell />
            </Flex>


        </Flex>
    );
};


const menuItems = [
    { name: "My Profile", icon: <FaUser />, to: 'profile' },
    { name: "Payment Methods", icon: <FaCreditCard />, to: 'settings/paymentMethod' },
    { name: "Settings", icon: <FaCog />, to: 'settings' },
    { name: "Trade History", icon: <FaHistory />, to: '/user-dashboard/tradehistory' },
    { name: "Trade Partners", icon: <FaUsers />, to: 'tradeParters' },
    { name: "Invite a Friend", icon: <FaGift />, to: '/user-dashboard/inviteFriends' },
    { name: "My Transactions", icon: <FaExchangeAlt />, to: 'myTransactions' },
    { name: "Join Cryptico Community", icon: <FaComments />, to: 'cryptoComunity' },
    { name: "Log Out", icon: <FaSignOutAlt />, to: '/' },
];

export default UserAvatar;
