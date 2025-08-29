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
import { Link, useNavigate } from 'react-router-dom';
import TokenDropdown from '../Dropdown/TokenDropdown';
import BuySellWithNotification from './BuySellWithNotification';
import { motion } from 'framer-motion';
const MotionFlex = motion(Flex);

const Sell = () => {


    return (
        <>
            <Flex maxW={'container.xxl'} justifyContent={'center'} alignItems={'center'} paddingTop={20} minH={'90vh'} direction={'column'} >
                <Flex
                    maxW={{ base: "100%", lg: '90%', xl: "90%" }}
                    minW={{ base: "100%", sm: '90%', lg: '90%', xl: "none" }}
                    w={'100%'}
                    gap={5}
                    mt={{ base: 5, lg: 0 }}
                    direction={{ base: 'column', lg: 'row' }}

                >
                    {/* Left Side nav column */}

                    <LeftSideContent />

                    {/* Left Side nav column end */}


                    {/* RightSide start */}
                    {/* <Flex w={'full'} justifyContent={'center'} alignItems={'center'} direction={'column'} > */}

                    <Flex alignSelf={'center'} flex={{ lg: 1.4, xl: 1.6 }} direction={'column'} gap={5} overflowY={'auto'} w={{ base: '95%', lg: 'full' }} >
                        <Card borderRadius={5} gap={5} p={2} >
                            <Flex direction={'column'} py={5} px={2} gap={5} >

                                <Heading size={'lg'}>Sell Bitcoin (BTC).</Heading>
                                <Box as='p' fontWeight={500} color={'gray'} fontSize={'18px'}>Sell your Bitcoin and get paid via over 500 payment methods, including bank transfers, online wallets, and gift cards.</Box>
                                <Flex direction={'column'}>

                                    <Box bg={'orange.500'} fontWeight={500} borderTopRadius={'4px'} p={2}>Promoted Offers</Box>
                                    <Button display={'flex'} width={'120px'} variant={'outline'} alignSelf={'end'} colorScheme='orange' size={'sm'} borderRadius={'none'} leftIcon={<AiOutlineExclamationCircle />}>Take Tour</Button>
                                </Flex>

                                <Flex>
                                    <Flex direction={'column'} w={'full'} borderLeft={'1px solid #dcdcdc'} borderRight={'1px solid #dcdcdc'} borderTop={'none'} borderBottomRadius={5} >

                                        {/* Table Heading */}

                                        <Flex w={'full'} bg={'gray.200'} p={4} fontWeight={500} gap={10}>

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




                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />
                                        <OfferList />


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


const LeftSideContent = () => {

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
                    h={{ md: 'full', xl: 'auto' }}
                    p={{ base: 4, sm: 4, md: 6, xl: 4 }}
                    gap={5}>

                    <Flex display={{ base: 'none', lg: 'flex' }} direction={'column'} gap={5}>

                        <TokenDropdown />
                        <Flex gap={4} color={'gray'}>
                            <Box>1 BTC = 458254.23 INR</Box>
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
                    </Flex>

                    <Box display={{ base: 'block', lg: 'none' }}>

                        <LeftContentmobileView />
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

                        <Button borderRadius={5} variant={'solid'} justifyContent={'space-between'} colorScheme={'orange'} rightIcon={<MdDoubleArrow />}>Find Offers</Button>


                    </Flex>



                </Card>
            </Flex>


        </Flex>
    )
}

const LeftContentmobileView = () => {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const accordionRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (accordionRef.current && !accordionRef.current.contains(event.target)) {
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
                            <MoreFilter />
                        </Flex>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    )

}

const MoreFilter = () => {
    const [show, setShow] = useState(false);

    return (
        <>
            <Flex direction={'column'} gap={5}>
                <Divider />


                <Flex alignItems={'center'} gap={5} display={{ base: 'flex', lg: 'none' }}>
                    <Switch colorScheme='orange' onChange={() => setShow((prev) => !prev)} />
                    <Heading size={'sm'} color={'gray'}>{show ? "Hide filters" : 'Show more filters'}</Heading>

                </Flex>
                {/* <MotionFlex
        initial={{ opacity: 0, maxHeight: 0, overflow: "hidden" }}
        animate={{ opacity: show ? 1 : 0, maxHeight: show ? "600px" : "0px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        direction={'column'}
        display={{ base: 'flex', lg: 'none' }}

    > */}
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

                        <Button borderRadius={5} variant={'solid'} justifyContent={'space-between'} colorScheme={'orange'} rightIcon={<MdDoubleArrow />}>Find Offers</Button>


                    </Flex>
                }
            </Flex>
        </>
    )
}


const OfferList = () => {
    const navigate = useNavigate();

    return (
        <Flex w={'full'} p={4} borderBottom={'1px solid #dcdcdc'} borderBottomRadius={5} direction={'column'} gap={5} >
            {/* Row1 */}
            <Flex w={'full'} gap={{ base: 2, sm: 10 }}>

                {/* Buy from */}
                <Flex direction={'column'} flex={1}  >
                    <Flex gap={2} justifyContent={'start'} alignItems={{ base: 'start', sm: 'center' }} direction={{ base: 'column', sm: 'row' }}>
                        <Avatar border={'1px solid white'} name='M' size="sm" src='' />
                        <Box>

                            <Heading fontWeight={500} size={'sm'}>Bit_Traders</Heading>
                            <Heading fontWeight={500} size={'xs'}>Trades 804</Heading>
                        </Box>

                    </Flex>

                    <Flex gap={2} p={2}>
                        <Flex gap={2} wrap={'wrap'}>

                            <Box color={'green'} display={'flex'} alignItems={'center'} gap={2}>

                                <FaRegThumbsUp />
                                <Box> 5421</Box>

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
                    <Flex fontWeight={600} gap={2}>
                        <Box>
                            Bhim
                        </Box>
                        <Flex border={'1px solid green'} color={'green'} px={2} fontSize={'10px'} fontWeight={'bold'} gap={2} justifyContent={'center'} alignItems={'center'} borderRadius={5}>
                            <FaCheck />
                            <Box as='span'>

                                VERIFIED
                            </Box>
                        </Flex>
                    </Flex>
                    <Flex color={'gray'}> Only For Indian Traders</Flex>
                    <Flex gap={2} flexWrap={'wrap'} >
                        <Box p={1} fontSize={'14px'} bg={'gray.200'} borderRadius={5}>receipt req. </Box>
                        <Box p={1} fontSize={'14px'} bg={'gray.200'} borderRadius={5}>photo id req. </Box>
                        <Box p={1} fontSize={'14px'} bg={'gray.200'} borderRadius={5}>no third parties </Box>
                    </Flex>
                </Flex>
                {/* Trade speed */}
                <Flex flex={1} display={{ base: 'none', md: 'flex' }} justifyContent={'end'}>
                    <Flex gap={2} color={'gray'} justifyContent={'end'}>
                        <Box display={'flex'} mt={1} alignItems={'start'} justifyContent={'center'} gap={2}>
                            2 min
                            <Box mt={1}>

                                <MdOutlineWatchLater />
                            </Box>

                        </Box>
                    </Flex>
                </Flex>

                {/* pricePerBitcoin */}
                <Flex flex={2} justifyContent={'end'} alignItems={'start'}>
                    <Flex direction={'column'} justifyContent={'end'} alignContent={'flex-end'} alignItems={'end'} gap={2}>

                        <Heading size={'md'} textAlign={'end'}>9,199,002.07 INR</Heading>
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
            <Flex w={'full'} gap={{ base: 2, sm: 10 }} bg={'orange.50'} py={2}  >

                {/* Buy from */}
                <Flex direction={'column'} flex={1}  >

                    <Flex fontSize={'14px'} gap={1} justifyContent={'start'} alignItems={'start'} color={'gray'} px={2}>
                        <Box w={'20px'} h={'20px'}>

                            <Flex boxSize={3} mt={1} bg={'orange.400'} borderRadius={'50%'}></Flex>
                        </Box>
                        Seen 1 minute ago
                    </Flex>


                </Flex>

                {/* Pay With */}


                <Flex direction={'row'} flex={2} display={{ base: 'none', md: 'flex' }} gap={3} fontSize={'14px'} color={'gray'} bg={'red.100'} p={1} borderRadius={5}>

                    <Box as='span'  >
                        <Flex gap={2} justifyContent={'start'} alignItems={'start'} >
                            <Flex mt={1} >

                                <AiOutlineExclamationCircle color='orange' />
                            </Flex>

                            <Box as='span' >
                                <Link >
                                    <Box as='span' textDecoration={'underline'} color={'black'}>
                                        Show your full name
                                    </Box>
                                </Link>

                                <Box as='span' textDecoration={'none'}>

                                    &nbsp; to buy cryptocurrency from devuhari
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

                                    Min purchase: 4,000 INR
                                </Box>
                                <Box textAlign={'end'}>

                                    Max purchase: 33,297 INR
                                </Box>
                            </Flex>
                            <Flex alignItems={'center'} gap={2} >
                                <Button size={'sm'} variant='outline' bg={'transparent'}><CiStar /></Button>
                                <Button size={'sm'} bg={'orange'} onClick={() => navigate('/sellOffer')}>Sell</Button>
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
export default Sell