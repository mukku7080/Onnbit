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
import { useOffer } from '../../Context/OfferContext';
import { gradientButtonStyle } from '../Wallet/CreateWallet';
import { grayGradient } from '../../Styles/Gradient';
import { useOtherDetail } from '../../Context/otherContext';
import { useTradeProvider } from '../../Context/TradeContext';


const BuyNew = () => {


    const { handleGetOffer, offers, queryParams, setQueryParams } = useOffer();
    const [isloading, setIsLoading] = useState(true);
    const [isFindOfferLoading, setFindOfferLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const bgColor = useColorModeValue('gray.200', 'gray.700');
    const bgColor_tags = useColorModeValue('gray.200', 'gray.600');



    const OfferFilter = {
        ad_id: '',
        user_id: '',
        txn_type: 'sell',
        cryptocurrency: queryParams.cryptocurrency,
        paymentMethod: '',
        maxAmount: '',
        offerLocation: '',
        traderLocation: '',
        activeTrader: false,
        per_page: 10,
    }
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
        OfferFilter.ad_id = queryParams.ad_id;
        OfferFilter.cryptocurrency = queryParams.cryptocurrency;
        OfferFilter.paymentMethod = queryParams.paymentMethod;
        OfferFilter.maxAmount = queryParams.maxAmount;
        OfferFilter.offerLocation = queryParams.offerLocation;
        OfferFilter.traderLocation = queryParams.traderLocation;
        OfferFilter.activeTrader = queryParams.activeTrader;
        OfferFilter.per_page = queryParams.per_page;

    }, [
        queryParams.ad_id,
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
            <Flex maxW={'container.xxl'} justifyContent={'start'} alignItems={'center'} paddingTop={{ base: 0, lg: 20 }} minH={'90vh'} direction={'column'} >
                <Flex
                    maxW={{ base: "100%", lg: '90%', xl: "90%" }}
                    minW={{ base: "100%", sm: '90%', lg: '90%', xl: "none" }}
                    w={'100%'}
                    gap={5}
                    mt={{ base: 0, lg: 0 }}
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

                                <Heading size={'lg'}>{`Buy ${CoinNameMap[(selectedCrypto)]} (${CoinSymbolMap[selectedCrypto]})`}.</Heading>
                                <Box as='p' fontWeight={500} color={'gray'} fontSize={'18px'}>Buy {CoinNameMap[(selectedCrypto)]} with over 500 payment methods to choose from, including bank transfers, online wallets, and gift cards.</Box>
                                <Flex direction={'column'}>

                                    <Box
                                        bg={'orange.500'}
                                        sx={{
                                            backgroundImage: 'linear-gradient(to right, #FF512F 0%, #F09819 51%, #FF512F 100%)',
                                            transition: '0.5s',
                                            backgroundSize: '200% auto',
                                            color: 'white',
                                            _hover: {
                                                backgroundPosition: 'right center',
                                                color: 'white',
                                                textDecoration: 'none',
                                            },
                                        }}
                                        fontWeight={500}
                                        borderTopRadius={'4px'}
                                        p={2}
                                    >
                                        Promoted Offers
                                    </Box>
                                    <Button display={'flex'} width={'120px'} variant={'outline'} alignSelf={'end'} border={'1px solid #f18f1b'} _hover={{ bg: 'transparent' }} size={'sm'} borderRadius={'none'} leftIcon={<AiOutlineExclamationCircle />}>Take Tour</Button>
                                </Flex>
                                <Flex>
                                    <Flex direction={'column'} w={'full'} borderBottom={'1px solid #dcdcdc'} borderLeft={'1px solid #dcdcdc'} borderRight={'1px solid #dcdcdc'} borderTop={'none'} borderBottomRadius={5} >
                                        {/* Table Heading */}
                                        <Flex w={'full'} bg={bgColor} p={4} fontWeight={500} gap={10} borderTop={'1px solid #dcdcdc'} borderBottom={'1px solid #dcdcdc'}>
                                            <Flex flex={1} >
                                                <Box>Buy From</Box>
                                            </Flex>
                                            <Flex flex={2} >
                                                <Box display={{ base: 'none', md: 'flex' }}>Pay With</Box>
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

                                                            <OfferList key={index} data={data} />

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


export const LeftSideContent = ({ handleFindOffer, isFindOfferLoading, OfferFilter }) => {
    const { setQueryParams } = useOffer();
    const [searchParams] = useSearchParams();
    const [index, setIndex] = useState(0);
    const { priceRef } = useOtherDetail();
    useEffect(() => {
        const queryValue = searchParams.get('index');
        // Check if the value is not null and is a valid number
        if (queryValue !== null) {
            setIndex(queryValue);
            setQueryParams((prev) => ({ ...prev, cryptocurrency: cryptoOption[queryValue].name.toLocaleLowerCase() }))

            // handleFindOffer();
        } else {
            setIndex(0);
            OfferFilter.cryptocurrency = cryptoOption[0].name.toLocaleLowerCase();
            setQueryParams((prev) => ({ ...prev, cryptocurrency: cryptoOption[0].name.toLocaleLowerCase() }))

        }
    }, []);

    return (
        <Flex flex={{ lg: .6, xl: .4 }}

            width={'full'}
            gap={{ base: 5, xl: 5 }}
            direction={{ base: 'column', md: 'row', lg: 'row', xl: 'column' }}
            position={'sticky'}
            top={{ base: '102px', lg: '58px' }}  // Adjust based on navbar height if any
            height={{ base: 'auto', lg: "calc(100vh - 60px)" }}
            zIndex={1}
            overflowY={'auto'}
            overflowX={'hidden'}
        >
            <Flex w={'full'} direction={'column'} >
                <Card boxShadow={'lg'}
                    borderRadius={{ md: 0, lg: 5 }}
                    border={'1px solid #dcdcdc'}
                    h='auto'
                    p={{ base: 4, sm: 4, md: 6, xl: 4 }}
                    gap={5}>

                    <Flex display={{ base: 'none', lg: 'flex' }} direction={'column'} gap={5}>
                        <TokenDropdown index={index} setIndex={setIndex} />
                        <Flex gap={4} color={'gray'}>
                            <Box>1 {`${IndexSymbolMap[index]} = ${Number(priceRef?.current?.[PriceMap[index] === 3 ? 'binancecoin' : PriceMap[index]]?.inr).toFixed(2)} INR`}</Box>
                            <Box display={'flex'} alignItems={'center'}>
                                <FaArrowTrendUp />
                            </Box>
                        </Flex>
                        {/* <PaymentDropdown /> */}
                        <MyPaymentModal />

                        {/* currency type input */}
                        {/* <CurrencyDropdown /> */}
                        <Flex justifyContent={'space-between'} border={'1px solid #dcdcdc'} borderRadius={5} display={'flex'} alignItems={'center'} >
                            <InputGroup>

                                <Input placeholder='Enter Amount'
                                    border={'none'}
                                    _hover={{ border: "none" }}
                                    _focus={{ boxShadow: "none", border: "none" }}
                                    onChange={(e) => setQueryParams((prev) => ({ ...prev, maxAmount: e.target.value }))}

                                ></Input>
                                {
                                    false &&
                                    <InputRightElement>
                                        <Button><MdKeyboardArrowDown /></Button>
                                    </InputRightElement>
                                }
                            </InputGroup>
                            <CurrencyDropdown width='20%' />
                        </Flex>
                    </Flex>
                    <Box display={{ base: 'block', lg: 'none' }}>
                        <LeftContentmobileView handleFindOffer={handleFindOffer} isFindOfferLoading={isFindOfferLoading} />
                    </Box>






                    {/* </MotionFlex> */}
                    <Flex direction={'column'} gap={5} w={'full'} display={{ base: 'none', lg: 'flex' }}>
                        <Flex gap={2}>
                            <Box>Offer Location</Box>
                            <Box display={'flex'} alignItems={'center'}><AiOutlineExclamationCircle /></Box>
                        </Flex>
                        <OfferLocation />


                        <Flex gap={2} justifyContent={'space-between'}>
                            <Flex gap={2}>
                                <Box>Trader Location</Box>
                                <Box display={'flex'} alignItems={'center'}><AiOutlineExclamationCircle /></Box>
                            </Flex>
                            {/* <Flex alignItems={'center'}>
                                    <Switch colorScheme='orange' onChange={() => setIsDisabled((prev) => !prev)} />

                                </Flex> */}
                        </Flex>
                        <TraderLocation />

                        <Flex gap={2} justifyContent={'space-between'}>
                            <Flex gap={2}>
                                <Box>Recently active traders</Box>
                                <Box display={'flex'} alignItems={'center'}><AiOutlineExclamationCircle /></Box>
                            </Flex>
                            <Flex alignItems={'center'}>
                                <Switch colorScheme='orange' onChange={(e) => setQueryParams((prev) => ({
                                    ...prev,
                                    activeTrader: e.target.checked
                                }))} />

                            </Flex>
                        </Flex>
                        <Flex gap={2} justifyContent={'space-between'}>
                            <Flex gap={2}>
                                <Box>Verified offers</Box>
                                <Box display={'flex'} alignItems={'center'}><AiOutlineExclamationCircle /></Box>
                            </Flex>
                            <Flex alignItems={'center'}>
                                <Switch colorScheme='orange' />

                            </Flex>
                        </Flex>

                        <Button spinnerPlacement='end' isLoading={isFindOfferLoading} loadingText='Filtering...' borderRadius={5} sx={gradientButtonStyle} justifyContent={'space-between'} onClick={handleFindOffer} colorScheme={'orange'} rightIcon={<MdDoubleArrow />}>Find Offers</Button>

                    </Flex>



                </Card>
            </Flex>


        </Flex>
    )
}

export const LeftContentmobileView = ({ handleFindOffer, isFindOfferLoading }) => {
    const [searchParams] = useSearchParams();
    const [index, setIndex] = useState(0);
    const { setQueryParams, queryParams } = useOffer();
    useEffect(() => {
        const queryValue = searchParams.get('index');
        // Check if the value is not null and is a valid number
        if (queryValue !== null) {
            setIndex(queryValue);
        } else {
            setIndex(0);
        }
    }, [searchParams]);
    const { isOpen, onToggle, onClose } = useDisclosure();
    const accordionRef = useRef(null);
    const modalRef = useRef(null);
    // useEffect(() => {
    //     console.log(queryParams);
    // }, [queryParams])

    useEffect(() => {
        function handleClickOutside(event) {
            const clickedOutsideAccordion = accordionRef.current && !accordionRef.current.contains(event.target);
            // const clickedOutsideModal = modalRef.current && !modalRef.current.contains(event.target);
            // console.log(clickedOutsideAccordion);
            // console.log(clickedOutsideModal);
            if (clickedOutsideAccordion) {
                onClose();
            }


        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <Box ref={accordionRef}>
            <Accordion allowToggle index={isOpen ? [0] : []} >
                <AccordionItem border={'none'} >
                    <h2>
                        <AccordionButton border={'1px solid #dcdcdc'} p={4} onClick={onToggle}>
                            <Box as='span' flex='1' textAlign='left'>
                                Filters
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel p={0} maxH="500px"  // Set max height for scrolling
                        overflowY="auto" >
                        <Flex direction={'column'} py={{ base: 4, sm: 4, md: 6, xl: 4 }}
                            m={0}
                            gap={5}>

                            <TokenDropdown />
                            <Flex gap={4} color={'gray'}>
                                <Box>1 BTC = 458254.23 INR</Box>
                                <Box display={'flex'} alignItems={'center'}>

                                    <FaArrowTrendUp />
                                </Box>
                            </Flex>
                            <MyPaymentModal />
                            <Flex justifyContent={'space-between'} border={'1px solid #dcdcdc'} borderRadius={5} display={'flex'} alignItems={'center'} >
                                <InputGroup>

                                    <Input placeholder='Enter Amount'
                                        border={'none'}
                                        _hover={{ border: "none" }}
                                        _focus={{ boxShadow: "none", border: "none" }}
                                        onChange={(e) => setQueryParams((prev) => ({ ...prev, maxAmount: e.target.value }))}
                                    ></Input>
                                    {
                                        false &&
                                        <InputRightElement>
                                            <Button><MdKeyboardArrowDown /></Button>
                                        </InputRightElement>
                                    }
                                </InputGroup>
                                <CurrencyDropdown />
                            </Flex>
                            <MoreFilter handleFindOffer={handleFindOffer} isFindOfferLoading={isFindOfferLoading} />
                        </Flex>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    )

}

export const MoreFilter = ({ handleFindOffer, isFindOfferLoading }) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <Flex direction={'column'} gap={5}>
                {
                    !show &&
                    <Button spinnerPlacement='end' isLoading={isFindOfferLoading} loadingText='Filtering...' borderRadius={5} sx={gradientButtonStyle} justifyContent={'space-between'} onClick={handleFindOffer} colorScheme={'orange'} rightIcon={<MdDoubleArrow />}>Find Offers</Button>

                }

                <Divider />


                <Flex alignItems={'center'} gap={5} display={{ base: 'flex', lg: 'none' }}>
                    <Switch colorScheme='orange' onChange={() => setShow((prev) => !prev)} />
                    <Heading size={'sm'} color={'gray'}>{show ? "Hide filters" : 'Show more filters'}</Heading>

                </Flex>
                {/* LocationFilter */}
                {show &&

                    <Flex direction={'column'} gap={5} w={'full'} transition={{ duration: 0.4, ease: 'ease' }}>
                        <Flex gap={2}>
                            <Box>Offer Location</Box>
                            <Box display={'flex'} alignItems={'center'}><AiOutlineExclamationCircle /></Box>
                        </Flex>
                        <OfferLocation />


                        <Flex gap={2} justifyContent={'space-between'}>
                            <Flex gap={2}>
                                <Box>Trader Location</Box>
                                <Box display={'flex'} alignItems={'center'}><AiOutlineExclamationCircle /></Box>
                            </Flex>
                            {/* <Flex alignItems={'center'}>
                <Switch colorScheme='orange' onChange={() => setIsDisabled((prev) => !prev)} />

            </Flex> */}
                        </Flex>
                        <TraderLocation />

                        <Flex gap={2} justifyContent={'space-between'}>
                            <Flex gap={2}>
                                <Box>Recently active traders</Box>
                                <Box display={'flex'} alignItems={'center'}><AiOutlineExclamationCircle /></Box>
                            </Flex>
                            <Flex alignItems={'center'}>
                                <Switch colorScheme='orange' />
                            </Flex>
                        </Flex>
                        <Flex gap={2} justifyContent={'space-between'}>
                            <Flex gap={2}>
                                <Box>Verified offers</Box>
                                <Box display={'flex'} alignItems={'center'}><AiOutlineExclamationCircle /></Box>
                            </Flex>
                            <Flex alignItems={'center'}>
                                <Switch colorScheme='orange' />
                            </Flex>
                        </Flex>

                        <Button spinnerPlacement='end' isLoading={isFindOfferLoading} loadingText='Filtering...' borderRadius={5} sx={gradientButtonStyle} justifyContent={'space-between'} onClick={handleFindOffer} colorScheme={'orange'} rightIcon={<MdDoubleArrow />}>Find Offers</Button>
                    </Flex>
                }
            </Flex>
        </>
    )
}


export const OfferList = ({ index, data, type }) => {
    const bgColor_tags = useColorModeValue('gray.200', 'gray.600');
    const bgColorrow1 = useColorModeValue('gray.50', 'gray.700');
    const bgColorrow2 = useColorModeValue('orange.50', 'gray.600');

    const navigate = useNavigate();
    const parsedData = JSON.parse(data?.payment_method);
    const { priceRef } = useOtherDetail();
    const { handleAddToFavorite } = useTradeProvider();

    return (
        <Flex w={'full'} borderBottom={'1px solid #dcdcdc'} borderBottomRadius={0} direction={'column'} gap={5} >
            {/* Row1 */}
            <Flex w={'full'} gap={{ base: 2, sm: 10 }} p={4}>

                {/* Buy from */}
                <Flex direction={'column'} flex={1}  >
                    <Flex gap={2} justifyContent={'start'} alignItems={{ base: 'start', sm: 'center' }} direction={{ base: 'column', sm: 'row' }}>
                        {/* <Avatar border={'1px solid white'} name='M' size="sm" src='' />
                        <Box>

                        </Box> */}
                        {
                            data?.user ?
                                <Avatar border={'1px solid #dcdcdc'} name={data?.user?.username ? data?.user?.username : data?.user?.email} src={data?.user?.profile_image} size={'sm'}>
                                    <AvatarBadge boxSize='1em' bg={data?.user?.login_status === 'login' ? 'green.200' : 'orange.200'} ></AvatarBadge>
                                </Avatar>
                                :
                                <Spinner size={'xl'} />
                        }
                        <Button p={0} bg={'transparent'} _hover={{ textDecoration: 'underline' }} fontWeight={500} size={'sm'} onClick={() => navigate('/trade-partner-profile', { state: { data: data } })}>{data?.user?.username}</Button>


                    </Flex>

                    <Flex gap={2} p={2} >
                        <Flex gap={2} wrap={'wrap'} fontSize={{ base: '14px', md: '16px' }}>

                            <Box color={'green'} display={'flex'} alignItems={'center'} gap={2}>

                                <FaRegThumbsUp />
                                <Box > 51</Box>

                            </Box>
                            <Box color={'red.500'} display={'flex'} alignItems={'center'} gap={2}>

                                <FaRegThumbsDown />
                                <Box> 54</Box>

                            </Box>
                        </Flex>
                    </Flex>




                </Flex>

                {/* Pay With */}
                <Flex direction={'column'} flex={2} display={{ base: 'none', md: 'flex' }} gap={3}>
                    <Flex fontWeight={600} gap={2} direction={'column'}>
                        <Flex wrap={'wrap'} >
                            {parsedData?.payment_method}
                        </Flex>
                        <Flex maxW={'80px'} border={'1px solid green'} color={'green'} px={2} fontSize={'10px'} fontWeight={'bold'} gap={2} justifyContent={'center'} borderRadius={3} alignItems={'center'}>
                            <FaCheck />
                            <Box as='span'>

                                VERIFIED
                            </Box>
                        </Flex>
                    </Flex>
                    <Flex wrap={'wrap'} color={'gray'}> {data?.offer_label}</Flex>
                    <Flex gap={2} flexWrap={'wrap'} >
                        {
                            data?.offer_tags.length > 0 && data?.offer_tags.map((tag, index) => (

                                <Box
                                    p={1}
                                    key={index}
                                    fontSize={'12px'}
                                    borderRadius={3}
                                    bg={bgColor_tags}
                                >{tag}</Box>
                            ))
                        }

                    </Flex>
                </Flex>
                {/* Trade speed */}
                <Flex flex={1} display={{ base: 'none', md: 'flex' }} justifyContent={'end'}>
                    <Flex gap={2} color={'gray'} justifyContent={'end'}>
                        <Flex wrap={'nowrap'} mt={1} alignItems={'start'} justifyContent={'center'} gap={2}>
                            2&nbsp;min
                            <MdOutlineWatchLater size={20} />
                        </Flex>
                    </Flex>
                </Flex>

                {/* pricePerBitcoin */}
                <Flex flex={2} justifyContent={'end'} alignItems={'start'}>
                    <Flex direction={'column'} justifyContent={'end'} alignContent={'flex-end'} alignItems={'end'} gap={2}>

                        <Heading size={'md'} textAlign={'end'}>{`${Number(priceRef?.current?.[data?.cryptocurrency === 'binance' ? 'binancecoin' : data?.cryptocurrency]?.inr).toFixed(2)} INR`}</Heading>
                        <Flex gap={3} fontSize={'14px'} textAlign={'end'}>
                            <Flex display={'flex'} alignItems={'center'} gap={1}>
                                <Flex gap={2} alignItems={'center'}>
                                    <Box as='span'>

                                        1 USD=0.93 USD of BTC

                                        <Flex gap={2} alignItems={'center'} color={'green'} justifyContent={'end'} textAlign={'end'}>

                                            <FaArrowTrendUp />
                                            <Box>8%</Box>
                                            <Box>
                                                <Tooltip label='Current Market Price Indicator' fontSize='md' color={'gray'} placement={'bottom'} bg={'white'} p={4}>
                                                    <Box as='span'>

                                                        <AiOutlineExclamationCircle />
                                                    </Box>
                                                </Tooltip>
                                            </Box>
                                        </Flex>
                                    </Box>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>



            {/* Row2 */}
            <Flex w={'full'} direction={'column'} gap={1}>
                {/* Pay With Mobile view row */}
                <Flex mt={5} flex={2} p={4} bg={bgColorrow1} justifyContent={'space-between'} display={{ base: 'flex', md: 'none' }} gap={3}>
                    <Flex fontWeight={600} gap={2} >
                        <Flex wrap={'wrap'} mt={2} >
                            {parsedData?.payment_method.toUpperCase()}
                        </Flex>
                        <Flex maxW={'70px'} border={'1px solid #f0fff4'} boxShadow={'lg'} color={'green'} px={1} fontSize={'10px'} fontWeight={'bold'} justifyContent={'center'} borderRadius={5} alignItems={'center'}>


                            VERIFIED
                        </Flex>
                    </Flex>
                    <Flex gap={2} flexWrap={'wrap'} direction={'column'}   >
                        <Flex wrap={'wrap'} color={'gray'} fontSize={'12px'}> {data?.offer_terms}</Flex>
                        {
                            data?.offer_tags.length > 0 && data?.offer_tags.map((tag, index) => (

                                <Box
                                    p={1}
                                    key={index}
                                    fontSize={'12px'}
                                    borderRadius={5}
                                    bg={bgColor_tags}
                                >{tag}</Box>
                            ))
                        }

                    </Flex>
                </Flex>
                {/* Pay With Mobile view row end*/}

                <Flex w={'full'} gap={{ base: 2, sm: 10 }} bg={bgColorrow2} py={2}  >

                    {/* Buy from */}
                    <Flex direction={'column'} flex={1}  >

                        <Flex fontSize={'14px'} gap={1} justifyContent={'start'} alignItems={'start'} color={'gray'} px={2}>
                            <Box w={'20px'} h={'20px'}>

                                <Flex boxSize={3} mt={1} bg={'orange.400'} borderRadius={'50%'}></Flex>
                            </Box>
                            {data?.user?.last_seen_at}
                        </Flex>


                    </Flex>

                    {/* Pay With */}


                    <Flex direction={'row'} flex={2} display={{ base: 'none', md: 'flex' }} gap={3} fontSize={'14px'} color={'gray'} bg={'red.100'} p={1} borderRadius={5}>

                        <Box as='span'  >
                            <Flex gap={2} justifyContent={'start'} alignItems={'start'}  >
                                <Flex mt={1} >

                                    <AiOutlineExclamationCircle color='orange' />
                                </Flex>

                                <Box as='span'  >
                                    <Link >
                                        <Box as='span' textDecoration={'underline'} color={'black'}>

                                            Show your full name
                                        </Box>
                                    </Link>

                                    <Box as='span' textDecoration={'none'}>

                                        &nbsp; to buy cryptocurrency from {data?.user?.username}


                                    </Box>
                                </Box>
                            </Flex>
                        </Box>

                    </Flex>
                    {/* Trade speed */}
                    <Flex flex={1}>

                    </Flex>


                    {/* pricePerBitcoin */}
                    <Flex flex={2} justifyContent={'end'} alignItems={'center'}>
                        <Flex direction={'column'} justifyContent={'end'} alignContent={'flex-end'} alignItems={'end'} gap={2} pr={2}>


                            <Flex gap={4} flexWrap={'wrap'} justifyContent={'end'} alignItems={'center'}>
                                <Flex direction={'column'} fontSize={'13px'}>

                                    <Box textAlign={'end'}>

                                        {`Min purchase: ${data?.min_trade_limit} INR`}
                                    </Box>
                                    <Box textAlign={'end'}>

                                        {`Max purchase: ${Number(data?.remaining_trade_limit).toFixed(2)} INR`}
                                    </Box>
                                </Flex>
                                <Flex alignItems={'center'} gap={2} >
                                    <Button size={'sm'} variant='outline' bg={'transparent'} onClick={() => handleAddToFavorite({ ad_id: data?.crypto_ad_id })}><CiStar /></Button>
                                    {
                                        type === 'sell' ?
                                            <Button sx={gradientButtonStyle} size={'sm'} onClick={() => navigate('/sellOffer', { state: { data: data } })}>Sell</Button>
                                            :
                                            <Button sx={gradientButtonStyle} size={'sm'} onClick={() => navigate('/buyOffer', { state: { data: data } })}>Buy</Button>
                                    }
                                </Flex>

                            </Flex>
                        </Flex>


                    </Flex>
                </Flex>
            </Flex>



        </Flex>
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
export const IndexSymbolMap = {
    0: 'BTC',
    1: 'ETH',
    2: 'BNB',
    3: 'USDT'
}
export const PriceMap = {
    0: 'bitcoin',
    1: 'ethereum',
    2: 'binancecoin',
    3: 'tether'
}
export const CryptoEnumMap = {
    0: 'bitcoin',
    1: 'ethereum',
    2: 'binance',
    3: 'tether'
}
export default BuyNew