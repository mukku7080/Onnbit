import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Button,
    Badge,
    Flex,
    Image,
    Menu,
    MenuList,
    MenuButton,
    MenuItem,
    Heading
} from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { useOffer } from '../../Context/OfferContext';
import { DarkOrangeGradiant, grayGradient } from '../../Styles/Gradient';
import ActiveOfferListComponent from '../Afterlogin/UserDashboard/ActiveOfferListComponent';
import { gradientButtonStyle } from '../Wallet/CreateWallet';
import { useLocation } from 'react-router-dom';

function CryptoAccordianOthers({ title, btn1, btn2, isOptionButton, other_user_id }) {
    const { handleGetOffer, analytics, offers, setOffers, setAnalytics } = useOffer();
    const [isoffers, setIsOffer] = useState(true);
    const [option, setOption] = useState(cryptoOption[0].name);
    const [sellCount, setSellCount] = useState(0);
    const [buyCount, setBuyCount] = useState(0);
    const [sellOffer, setSellOffer] = useState([]);
    const [buyOffer, setBuyOffer] = useState([]);

    const OfferFilter = {
        user_id: other_user_id || '',
        txn_type: '',
        cryptocurrency: option === 'All CryptoCurrencies' ? '' : option,
        paymentMethod: '',
        maxAmount: '',
        offerLocation: '',
        traderLocation: '',
        activeTrader: false,
        per_page: 10,
    }

    const fetchData = async () => {
        if (!OfferFilter.user_id) return;
        const res = await handleGetOffer(OfferFilter);

        if (OfferFilter.cryptocurrency !== '' || null) {
            // console.log(res?.data?.offer, 'offerData');
            setSellCount(res?.data?.offer?.filter((item) => item.transaction_type === 'sell').length);
            setBuyCount(res?.data?.offer?.filter((item) => item.transaction_type === 'buy').length);

        };
        setBuyOffer(res?.data?.offer?.filter((item) => item.transaction_type === 'buy'));
        setSellOffer(res?.data?.offer?.filter((item) => item.transaction_type === 'sell'));
        setOffers(res?.data?.offer);
        setAnalytics(res?.analytics);
    };




    // useEffect(() => {
    //     if (!other_user_id) return;

    //     setQueryParams((prev) => ({
    //         user_id: other_user_id || '',
    //         txn_type: '',
    //         cryptocurrency: option === 'All CryptoCurrencies' ? '' : option,
    //         paymentMethod: '',
    //         maxAmount: '',
    //         offerLocation: '',
    //         traderLocation: '',
    //         activeTrader: false,
    //         per_page: 10,
    //     }));
    // }, [other_user_id, option]);
    // console.log(analytics);

    useEffect(() => {
        if (option === 'All CryptoCurrencies') {
            setOption(cryptoOption[0].name);
            OfferFilter.cryptocurrency = null;
            OfferFilter.txn_type = '';
            fetchData();
        }
        else {
            OfferFilter.cryptocurrency = option;
            OfferFilter.txn_type = '';
            fetchData();
        }
    }, [option]);

    useEffect(() => {
        fetchData();
    }, [OfferFilter.user_id, setAnalytics, setBuyOffer]);

    const handleBuySellOfferShow = async (offerType) => {

        if (offerType === 'buy') {
            setIsOffer(true);
            OfferFilter.txn_type = 'buy';
            fetchData();
        }
        else {
            setIsOffer(false);
            OfferFilter.txn_type = 'sell';
            fetchData();
        }

    }


    return (
        <Accordion allowMultiple gap={10} width={'100%'}>
            <AccordionItem  >
                <h2>
                    <AccordionButton borderBottom={'1px solid #dcdcdc'} >
                        <Box as='span' flex='1' fontSize={'lg'} fontWeight={600} textAlign='left' p={5} >
                            {title}
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>

                </h2>
                <AccordionPanel mt={5}>
                    <Box width={'full'} borderBottom={'1px solid #dcdcdc'} display={'flex'} flexWrap={'wrap'} justifyContent={'space-between'} >
                        <Flex wrap={'wrap'} gap={3} mb={6}>
                            <Button
                                bg={'transparent'}
                                variant={'outline'}
                                borderTopRadius={5}
                                borderBottomRadius={0}
                                rightIcon={<Mybadge bgcolor={'orange'} count={OfferFilter.cryptocurrency === '' ? analytics?.totalBuyAds : buyCount} />}
                                _hover={{ bg: 'transparent', borderBottom: '1px solid gray' }}
                                onClick={() => handleBuySellOfferShow('buy')}
                                _active={{ borderBottom: '1px solid black' }}
                                isActive={isoffers}
                            >
                                {btn1}
                            </Button>
                            <Button
                                variant={'outline'}
                                bg={'transparent'}
                                borderTopRadius={5}
                                borderBottomRadius={0}
                                rightIcon={<Mybadge bgcolor={'orange'} count={OfferFilter.cryptocurrency === '' ? analytics?.totalSellAds : sellCount} />}
                                _hover={{ bg: 'transparent', borderBottom: '1px solid gray' }}
                                onClick={() => handleBuySellOfferShow('sell')}
                                _active={{ borderBottom: '1px solid black' }}
                                isActive={!isoffers}
                            >
                                {btn2}
                            </Button>
                        </Flex>
                        {
                            isOptionButton &&
                            <Menu>

                                <MenuButton as={Button} variant={'outline'} display={{ base: 'none', md: 'flex' }} borderRadius={5} border={'1px solid #dcdcdc'} rightIcon={<MdKeyboardArrowDown />}  >
                                    {option}

                                </MenuButton>
                                <MenuList borderRadius={0}>
                                    {cryptoOption.map((data, index) => (
                                        <>
                                            <MenuItem
                                                key={index}
                                                onClick={() => {
                                                    setOption(data.name)
                                                    if (data.name === 'All CryptoCurrencies') {
                                                        OfferFilter.cryptocurrency = null;
                                                    }
                                                    else {
                                                        OfferFilter.cryptocurrency = data.name;
                                                    }
                                                }}
                                                color={'gray'}
                                            >
                                                {data.name}
                                            </MenuItem>
                                        </>
                                    ))}

                                </MenuList>
                            </Menu>
                        }

                    </Box>

                    {/* for small screen dorpdow button */}

                    <Box width={'full'} borderBottom={'1px solid #dcdcdc'} display={{ base: 'flex', md: 'none' }} flexWrap={'wrap'} justifyContent={'space-between'} py={2} >

                        {
                            isOptionButton &&
                            <Menu>

                                <MenuButton as={Button} variant={'outline'} display={{ base: 'flex', md: 'none' }} borderRadius={0} border={'1px solid #dcdcdc'} rightIcon={<MdKeyboardArrowDown />} width={'100%'}  >
                                    {option}

                                </MenuButton>
                                <MenuList borderRadius={0} >
                                    {cryptoOption.map((data, index) => (
                                        <>
                                            <MenuItem key={index} onClick={() => setOption(data.name)} color={'gray'} width={'full'}>{data.name}</MenuItem>
                                        </>
                                    ))}

                                </MenuList>
                            </Menu>
                        }

                    </Box>
                    {/* Table Heading start --------------------------------------------- */}
                    <Flex direction={'column'} w={'full'} borderTop={'none'} borderBottomRadius={5} >
                        <Flex sx={grayGradient} w={'full'} bg={'gray.200'} p={4} fontWeight={500} gap={10}>

                            <Flex flex={2} >
                                <Box >Pay With</Box>
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
                    </Flex>
                    {/* Table Heading End --------------------------------------------- */}

                    {
                        isoffers ?
                            buyOffer?.length > 0 ?
                                buyOffer?.map((data, index) => (

                                    <ActiveOfferListComponent key={index} data={data} />
                                ))
                                :
                                <Heading fontSize={'lg'} textAlign={'center'} p={5} color={'gray.500'}>No Active Buy Offers</Heading>
                            :
                            sellOffer?.length > 0 ?
                                sellOffer?.map((data, index) => (

                                    <ActiveOfferListComponent key={index} data={data} />
                                ))
                                :
                                <Heading fontSize={'lg'} textAlign={'center'} p={5} color={'gray.500'}>No Active Sell Offers</Heading>
                    }

                    {/* <Box display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Image p={5} src='imagelogo/cryptico.png' w={'200px'} h={'160px'} opacity={0.1}></Image>
  
  
            </Box> */}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}

export const Mybadge = ({ bgcolor, count }) => {
    return (

        <Badge

            borderRadius={5}
            bg={'gray.200'}
            p={2}
            px={3}
        >
            {count}
        </Badge>
    )
}

const cryptoOption = [
    { name: 'All CryptoCurrencies' },
    { name: 'bitcoin' },
    { name: 'ethereum' },
    { name: 'binance' },
    { name: 'tether' },
]
const sortby = [
    { lable: 'Price:Lowest to Highest' },
    { lable: 'Price:Highest to Lowest' },
    { lable: 'Avg. Trade Speed: Fastest to Slowest' },
    { lable: 'Avg. Trade Speed: Fastest to Slowest' },
]
export default CryptoAccordianOthers;