import React, { useEffect, useRef } from 'react'

import {
    Box, Button, Card, Flex, Grid, GridItem, Heading,
    Tooltip, Menu, MenuButton, MenuItem, MenuList,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Divider,
    Switch,
    flexbox,
    Avatar,
    calc,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    useDisclosure,
    AvatarBadge,
    Spinner,
    useColorModeValue,

} from '@chakra-ui/react';
import { FaArrowTrendUp, FaRegThumbsDown } from "react-icons/fa6";

import { FaCheck } from "react-icons/fa6";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaRegThumbsUp } from "react-icons/fa";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { useState } from 'react';
import PaymentDropdown from '../Dropdown/PaymentDropdown';
import CurrencyDropdown from '../Dropdown/CurrencyDropdown';
import { MdDoubleArrow } from "react-icons/md";
import OfferLocation from '../Dropdown/OfferLocation';
import TraderLocation from '../Dropdown/TraderLocation';
import { MyPaymentModal } from '../Dropdown/PaymentModal/MyPaymentModal';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import TokenDropdown from '../Dropdown/TokenDropdown';
import BuySellWithNotification from './BuySellWithNotification';
import { motion } from 'framer-motion';
import { gradientButtonStyle } from '../Wallet/CreateWallet';
import { useOffer } from '../../Context/OfferContext';
import { grayGradient } from '../../Styles/Gradient';
import { CryptoEnumMap, LeftSideContent, OfferList } from './BuyNew';
const MotionFlex = motion(Flex);

const SellNew = () => {
    const { handleGetOffer, offers, queryParams, setQueryParams } = useOffer();
    const [isloading, setIsLoading] = useState(true);
    const [isFindOfferLoading, setFindOfferLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const bgColor = useColorModeValue('gray.200', 'gray.700');



    const OfferFilter = {
        user_id: '',
        txn_type: 'buy',
        cryptocurrency: queryParams.cryptocurrency,
        paymentMethod: '',
        maxAmount: '',
        offerLocation: '',
        traderLocation: '',
        activeTrader: false,
        per_page: 10,
    }
    useEffect(() => {
        setQueryParams(() => ({
            user_id: null,
            txn_type: 'buy',
            cryptocurrency: queryParams.cryptocurrency,
            paymentMethod: null,
            maxAmount: null,
            offerLocation: null,
            traderLocation: null,
            activeTrader: false,
            per_page: 10
        }));
        handleGetOffer(OfferFilter);
    }, []);
    useEffect(() => {
        const queryValue = searchParams.get('index');
        // Check if the value is not null and is a valid number
        if (queryValue !== null) {
            OfferFilter.cryptocurrency = CryptoEnumMap[queryValue];
            handleFindOffer();
        } else {
            handleGetOffer(OfferFilter);
        }
    }, []);

    useEffect(() => {
        if (!queryParams.txn_type) return;
        OfferFilter.cryptocurrency = queryParams.cryptocurrency;
        OfferFilter.paymentMethod = queryParams.paymentMethod;
        OfferFilter.maxAmount = queryParams.maxAmount;
        OfferFilter.offerLocation = queryParams.offerLocation;
        OfferFilter.traderLocation = queryParams.traderLocation;
        OfferFilter.activeTrader = queryParams.activeTrader;
        OfferFilter.per_page = queryParams.per_page;

    }, [
        queryParams.cryptocurrency,
        queryParams.paymentMethod,
        queryParams.maxAmount,
        queryParams.offerLocation,
        queryParams.traderLocation,
        queryParams.activeTrader,
        queryParams.per_page,
        queryParams.txn_type,
    ]);

    const handleFindOffer = async () => {
        setFindOfferLoading(true);
        const resp = await handleGetOffer(OfferFilter);
        if (resp) {
            setSelectedCrypto(OfferFilter.cryptocurrency);
            setFindOfferLoading(false);
        }
    }
    setTimeout(() => {
        setIsLoading(false);
    }, 3000);
    const [selectedCrypto, setSelectedCrypto] = useState(OfferFilter.cryptocurrency);
    return (
        <>
            <Flex maxW={'container.xxl'} justifyContent={'center'} alignItems={'center'} paddingTop={{ base: 0, lg: 20 }} minH={'90vh'} direction={'column'} >
                <Flex
                    maxW={{ base: "100%", lg: '90%', xl: "90%" }}
                    minW={{ base: "100%", sm: '90%', lg: '90%', xl: "none" }}
                    w={'100%'}
                    gap={5}
                    // mt={{ base: 5, lg: 0 }}
                    direction={{ base: 'column', lg: 'row' }}

                >
                    {/* Left Side nav column */}

                    <LeftSideContent handleFindOffer={handleFindOffer} isFindOfferLoading={isFindOfferLoading} OfferFilter={OfferFilter} />

                    {/* Left Side nav column end */}

                    {/* RightSide start */}
                    {/* <Flex w={'full'} justifyContent={'center'} alignItems={'center'} direction={'column'} > */}

                    <Flex alignSelf={{ base: 'center', lg: 'start' }} mt={{ base: 24, lg: 0 }} flex={{ lg: 1.4, xl: 1.6 }} direction={'column'} gap={5} overflowY={'auto'} w={{ base: '95%', lg: 'full' }} >
                        <Card borderRadius={5} gap={5} p={2} >
                            <Flex direction={'column'} py={5} px={2} gap={5} >

                                <Heading size={'lg'}>{`Sell ${CoinNameMap[(selectedCrypto)]} (${CoinSymbolMap[selectedCrypto]})`}.</Heading>

                                <Box as='p' fontWeight={500} color={'gray'} fontSize={'18px'}>Sell your Bitcoin and get paid via over 500 payment methods, including bank transfers, online wallets, and gift cards.</Box>
                                <Flex direction={'column'}>

                                    <Box bg={'orange.500'} sx={{
                                        backgroundImage: 'linear-gradient(to right, #FF512F 0%, #F09819 51%, #FF512F 100%)',
                                        transition: '0.5s',
                                        backgroundSize: '200% auto',
                                        color: 'white',
                                        _hover: {
                                            backgroundPosition: 'right center',
                                            color: 'white',
                                            textDecoration: 'none',
                                        }
                                    }} fontWeight={500} borderTopRadius={'4px'} p={2}>Promoted Offers</Box>
                                    <Button display={'flex'} width={'120px'} variant={'outline'} alignSelf={'end'} border={'1px solid #f18f1b'} _hover={{ bg: 'transparent' }} size={'sm'} borderRadius={'none'} leftIcon={<AiOutlineExclamationCircle />}>Take Tour</Button>

                                </Flex>

                                <Flex>
                                    <Flex direction={'column'} w={'full'} borderBottom={'1px solid #dcdcdc'} borderLeft={'1px solid #dcdcdc'} borderRight={'1px solid #dcdcdc'} borderTop={'none'} borderBottomRadius={5} >

                                        {/* Table Heading */}

                                        <Flex w={'full'} bg={bgColor} p={4} fontWeight={500} gap={10} borderTop={'1px solid #dcdcdc'} borderBottom={'1px solid #dcdcdc'}>

                                            <Flex flex={1} >
                                                <Box>Sell to</Box>
                                            </Flex>
                                            <Flex flex={2} >
                                                <Box display={{ base: 'none', md: 'flex' }}>get paid with</Box>
                                            </Flex>
                                            <Flex flex={1} display={{ base: 'none', md: 'flex' }} justifyContent={'end'} >
                                                <Box display={{ base: 'none', md: 'flex' }} textAlign={'end'}>Avg. trade speed</Box>
                                            </Flex>
                                            <Flex flex={2} gap={4}>

                                                <Flex flex={1} justifyContent={'end'} gap={3} wrap={{ base: 'wrap', xl: 'nowrap' }}>
                                                    <Box textAlign={'end'}>Price per Bitcoin</Box>


                                                    <Menu >
                                                        <MenuButton
                                                            as={Button}
                                                            size='sm'
                                                            display={'flex'}
                                                            justifyContent={'space-between'}
                                                            rightIcon={<MdKeyboardArrowDown />}
                                                        >
                                                            Sort by
                                                        </MenuButton>
                                                        <MenuList borderRadius={0}>
                                                            {
                                                                sortby.map((data, index) => (

                                                                    <MenuItem key={index} _hover={{ bg: 'blue.100' }}>{data.lable}</MenuItem>
                                                                ))
                                                            }
                                                        </MenuList>
                                                    </Menu>


                                                </Flex>
                                            </Flex>
                                        </Flex>
                                        {/* Table Heading End */}
                                        {/* Offer Details */}
                                        {
                                            isloading ?
                                                <Flex w={'full'} justifyContent={'center'} alignItems={'center'} gap={5} p={10}>
                                                    <Heading size={'md'} color={'gray.400'}>Loading...</Heading>
                                                </Flex>
                                                :

                                                offers?.length > 0 ?
                                                    offers?.map((data, index) => (

                                                        <OfferList key={index} data={data} type={'sell'} />
                                                    ))
                                                    :
                                                    <Flex w={'full'} justifyContent={'center'} alignItems={'center'} gap={5} p={10}>
                                                        <Heading size={'md'} color={'gray.400'}>No offers found</Heading>
                                                    </Flex>

                                        }





                                    </Flex>
                                </Flex>
                            </Flex>

                        </Card>
                        <Card borderRadius={0}>

                        </Card>


                        {/* </Flex> */}
                    </Flex>


                    {/* RightSide end */}


                </Flex>
            </Flex>
        </>

    )
}




const cryptoOption = [
    { name: 'Bitcoin', logo: 'https://cryptologos.cc/logos/thumbs/bitcoin.png?v=040' },
    { name: 'Ethereum', logo: 'https://cryptologos.cc/logos/thumbs/ethereum.png?v=040' },
    { name: 'USDC', logo: 'https://cryptologos.cc/logos/thumbs/usd-coin.png?v=040' },
    { name: 'Tether', logo: 'https://cryptologos.cc/logos/thumbs/tether.png?v=040' },
]


const sortby = [
    { lable: 'Price:Lowest to Highest' },
    { lable: 'Price:Highest to Lowest' },
    { lable: 'Avg. Trade Speed: Fastest to Slowest' },
    { lable: 'Avg. Trade Speed: Fastest to Slowest' },
]
export const CoinSymbolMap = {
    bitcoin: 'BTC',
    ethereum: 'ETH',
    binance: 'BNB',
    tether: 'USDT'
}
export const CoinNameMap = {
    bitcoin: 'Bitcoin',
    ethereum: 'Ethereum',
    binance: 'Binance',
    tether: 'Tether'
}
export default SellNew