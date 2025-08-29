import { Box, Button, Card, Divider, Flex, Heading, Icon, Image, Menu, MenuButton, MenuList, MenuItem, Circle } from '@chakra-ui/react'
import React from 'react'
import { LuEqualApproximately } from "react-icons/lu";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { TbSend } from "react-icons/tb";

import { SiConvertio } from "react-icons/si";
import { BsArrowBarDown, BsThreeDots } from "react-icons/bs";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { PiDotsThreeCircleVerticalThin } from "react-icons/pi";
import { RiArrowRightDownLine } from "react-icons/ri";
import { BsBoxArrowInUpRight, BsBoxArrowInDownRight } from "react-icons/bs";
import Balance from './Balance';
import { Outlet, useNavigate } from 'react-router-dom';
import BuySellWithNotification from '../Buy&Sell/BuySellWithNotification';

const Wallet = () => {
    const navigate = useNavigate('/');


    return (
        <Flex w={'container.xxl'} gap={10} direction={'column'} alignItems={'center'} justifyContent={'center'} my={20} marginTop={'50px'} minH={'86vh'}>
            <Flex
                maxW={{ base: "90%", lg: '90%', xl: "90%" }}
                minW={{ base: "90%", sm: '90%', lg: '90%', xl: "90%" }}
                direction={'column'}
                gap={8}
                mt={{ base: 20, lg: 10 }}

            >

                {/* Buttton Group section */}
                <Flex direction={'column'} >

                    <Flex gap={10} overflowX={'auto'} w={'100%'} whiteSpace="nowrap" maxW={'100vw'}   >
                        {
                            walletButtons.map((item, index) => (
                                <Button minW={'100px'} key={index} bg={'transparent'} borderRadius={0} _hover={{ bg: 'transparent', borderBottom: '2px solid black' }} onClick={() => navigate(item.to)} >
                                    {item.lable}
                                </Button>
                            ))
                        }

                    </Flex>
                    <Divider w={'full'} />
                </Flex>
                {/* Buttton Group section end */}


                <Outlet />

            </Flex>

        </Flex>
    )
}





const walletButtons = [
    { lable: 'Balance', to: 'balance' },
    { lable: 'Lightining', to: '' },
    { lable: 'Transactions', to: 'transactions' },
    { lable: 'Addresses', to: 'addresses' },
    { lable: 'Convert', to: 'convert' },
]






export default Wallet