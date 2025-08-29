import React, { useEffect, useRef } from 'react'

import {
    Box,
    Button,
    Card,
    Flex,
    Heading,
    Divider,
    Avatar,
    useDisclosure,
    AvatarBadge,
    Spinner,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
    Modal,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Image,
    Input,
    IconButton,
    FormControl,
    FormLabel,
    Select,
    Textarea,
    Checkbox,
    useToast,
    Text,
    useBreakpointValue,
    CircularProgress,

} from '@chakra-ui/react';

import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ImStopwatch } from "react-icons/im";
import { BsExclamationCircle } from 'react-icons/bs';
import { OfferTerms, timeAgo } from './BuyOffer';
import { LuSquareArrowOutUpRight } from 'react-icons/lu';
import { BiDislike, BiLike } from 'react-icons/bi';
import ChatComponent from '../ChatSection/ChatComponent';
import { useUser } from '../../Context/userContext';
import ReportBehaviour from '../ChatSection/ReportBehaviour';
import { getDatabase, ref, onDisconnect, set, onValue } from 'firebase/database';
import { getFirestore, doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { AttachmentIcon } from '@chakra-ui/icons';
import { useTradeProvider } from '../../Context/TradeContext';
import { useOffer } from '../../Context/OfferContext';
import { useOtherDetail } from '../../Context/otherContext';
import TradeExpiredModal from './TradeExpireModal';
import FullPageLoader from '../NotFound/FullPageLoader';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import DisputeModal from './DisputeModal';
import Feedback from './Feedback';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { TbWheel } from "react-icons/tb";
import { IoMdCloseCircleOutline } from "react-icons/io";
import useStore from '../Store/store';

// import Feedback from './Feedback';

dayjs.extend(relativeTime);




const TradeStart = () => {
    const navigate = useNavigate();
    const { handleTradeHistory, getTradeDto, handleTradeExpire, handleGetFeedback } = useTradeProvider();
    const { tradeId, tradeType } = useParams();
    const [cryptoAdId, setCryptoAdId] = useState();
    const { queryParams, handleGetOffer } = useOffer()
    const [tradeDetail, setTradeDetail] = useState(null);
    const [advertisementDetail, setAdevertisementDetail] = useState(null);
    const { priceRef } = useOtherDetail();
    const [assetValue, setAssetValue] = useState();
    const [remainingTime, setRemainingTime] = useState("");
    const { getUserById, handleUserDetailByUserId } = useUser();
    const [sellerDetail, setSellerDetail] = useState(null);
    const [buyerDetail, setBuyerDetail] = useState(null);
    const [isTradeExpired, setIsTradeExpired] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60 * 60);
    const [disputeremainingTime, setDisputeRemainingTime] = useState("");
    const [sellerdisputeremainingTime, setSellerDisputeRemainingTime] = useState("");
    const [isDisputeShow, setDisputeShow] = useState(true);
    const [isSellerDisputeShow, setSellerDisputeShow] = useState(true);
    const [isloading, setIsLoading] = useState(false)

    // const paid = useStore(state => state.paid);
    // const cancel = useStore(state => state.cancel);
    // const expire = useStore(state => state.expire);
    // const dispute = useStore(state => state.dispute);
    // const buyer = useStore(state => state.buyer);
    // const seller = useStore(state => state.seller);


    const isMobile = useBreakpointValue({ base: true, lg: false }); // true if screen < 768px
    const [view, setView] = useState('action');



    // useEffect(() => {

    // }, [(Object.values(tradeDetail?.review).length)])

    useEffect(() => {
        getTradeDto.trade_id = tradeId;
        getTradeDetail();
        handleGetFeedback(tradeId);



        const interval = setInterval(getTradeDetail, 10000);
        return () => clearInterval(interval);
        // return () => { };
    }, [])
    const getTradeDetail = async () => {
        const response = await handleTradeHistory(getTradeDto);
        if (response?.status === true) {
            setCryptoAdId(response?.datas?.[0].crypto_ad_id);
            setTradeDetail(response?.datas?.[0]);
        }
    }
    useEffect(() => {
        if (tradeDetail !== null) {

            if (tradeType === 'buy_trade') {
                handleUserDetailByUserId(tradeDetail?.seller_id);
                setSellerDetail(getUserById);
            }
            if (tradeType === 'sell_trade') {
                handleUserDetailByUserId(tradeDetail?.buyer_id);
                setBuyerDetail(getUserById);

            }
        }
    }, [tradeDetail])
    useEffect(() => {
        const tradeDto = {
            ad_id: cryptoAdId || '',
            user_id: '',
            txn_type: '',
            cryptocurrency: '',
            paymentMethod: '',
            maxAmount: '',
            offerLocation: '',
            traderLocation: '',
            activeTrader: false,
            per_page: 10,
        }

        getOfferDetail(tradeDto);

    }, [cryptoAdId])

    const getOfferDetail = async (tradeDto) => {
        const response = await handleGetOffer(tradeDto);
        if (response?.status === true) {
            setAdevertisementDetail(response?.data?.[0]);
        }
    }
    // Convertion of Asset to INR-----------------------------------------
    const assetPriceInINR = priceRef.current?.[tradeDetail?.asset === 'binance' ? 'binancecoin' : tradeDetail?.asset]?.inr;
    useEffect(() => {
        convertINRToAsset(tradeDetail?.amount, assetPriceInINR);
    }, [advertisementDetail]);
    function convertINRToAsset(amount, assetPriceInINR) {
        if (!amount || !assetPriceInINR || assetPriceInINR === 0) {
            setAssetValue(0);
            return;
        }
        const assetAmount = amount / assetPriceInINR;
        setAssetValue(parseFloat(assetAmount.toFixed(8)));
    }



    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const endTime = new Date(tradeDetail?.buyer_dispute_time); // Assuming time_limit is 60 minutes from now
            const diff = endTime - now;

            if (diff <= 0) {
                setDisputeRemainingTime("00:00:00");
                setDisputeShow(true);
                clearInterval(interval);
            } else {
                const totalSeconds = Math.floor(diff / 1000);
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;
                setDisputeShow(false);
                setDisputeRemainingTime(
                    `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
                );
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [tradeDetail?.buyer_dispute_time]);
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const endTime = new Date(tradeDetail?.seller_dispute_time); // Assuming time_limit is 60 minutes from now
            const diff = endTime - now;

            if (diff <= 0) {
                setSellerDisputeRemainingTime("00:00:00");
                setSellerDisputeShow(true);
                clearInterval(interval);
            } else {
                const totalSeconds = Math.floor(diff / 1000);
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;
                setSellerDisputeShow(false);
                setSellerDisputeRemainingTime(
                    `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
                );
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [tradeDetail?.seller_dispute_time]);


    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const endTime = new Date(tradeDetail?.time_limit);
            if (isNaN(endTime.getTime())) {
                clearInterval(interval);
                return;
            }
            const diff = endTime - now;

            if (diff <= 0) {
                if (tradeDetail?.trade_status === 'pending') {
                    handleTradeExpire(tradeDetail?.trade_id);
                    setIsTradeExpired(true);
                    setRemainingTime("Expired");
                    clearInterval(interval);
                    return;
                }
            } else {
                const totalSeconds = Math.floor(diff / 1000);
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;

                setRemainingTime(
                    `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
                );
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [tradeDetail?.time_limit]);
    useEffect(() => {
        const step = tradeDetail?.trade_step;

        if (step === 2 || step === 3 || step === 4) {
            window.location.reload();
        }
    }, [tradeDetail]);



    // useEffect(() => {
    //     setIsLoading(true)
    //     let timer;


    //     timer = setTimeout(() => {
    //         setIsLoading(false);
    //     }, 20000);


    //     return () => clearTimeout(timer);
    // }, [dispute, cancel, paid]);

    return (
        <>
            <TradeExpiredModal isTradeExpired={isTradeExpired} />
            {(advertisementDetail && tradeDetail) ?
                <Flex maxW={'container.xxl'} justifyContent={'start'} alignItems={'center'} paddingTop={{ base: 0, lg: 20 }} minH={'90vh'} direction={'column'} >

                    {
                        isMobile ?
                            <>
                                {
                                    view === 'action' ?

                                        <Flex
                                            maxW={{ base: "100%", lg: '90%', xl: "90%" }}
                                            minW={{ base: "100%", sm: '90%', lg: '90%', xl: "none" }}
                                            w={'100%'}
                                            gap={5}
                                            mt={{ base: 0, lg: 0 }}
                                            direction={{ base: 'column', lg: 'row' }}

                                        >

                                            {/* left Side start */}
                                            <Flex alignSelf={{ base: 'center', lg: 'start' }} mt={{ base: 24, lg: 0 }} flex={{ lg: .8, xl: .8 }} direction={'column'} gap={5} overflowY={'auto'} w={{ base: '95%', lg: '90%' }} >
                                                {

                                                    tradeType === 'buy_trade' ?
                                                        <Buyer tradeDetail={tradeDetail} assetValue={assetValue} getTradeDetail={getTradeDetail} remainingTime={remainingTime} disputeremainingTime={disputeremainingTime} isDisputeShow={isDisputeShow} tradeType={tradeType} />
                                                        :
                                                        <Seller tradeDetail={tradeDetail} assetValue={assetValue} getTradeDetail={getTradeDetail} remainingTime={remainingTime} sellerdisputeremainingTime={sellerdisputeremainingTime} isSellerDisputeShow={isSellerDisputeShow} tradeType={tradeType} />

                                                }
                                                <OfferTerms data={advertisementDetail} />
                                                <Heading size={'md'}>Trade Information</Heading>
                                                <Flex gap={10} mb={5} direction={{ base: 'column', sm: 'row' }} borderTop={'1px solid #dcdcdc'} justifyContent={'space-between'} p={4}>
                                                    <Flex className='flex1' direction={{ base: 'row', sm: 'column' }} justifyContent={'space-between'}>
                                                        <Heading size={'sm'} color={'#fe532e'}>Rate</Heading>
                                                        <Box>455888 inr</Box>

                                                    </Flex>
                                                    <Flex className='flex2' justifyContent={'space-between'} direction={{ base: 'row', sm: 'column' }}>
                                                        <Heading size={'sm'} color={'#fe532e'}>TRADE ID</Heading>
                                                        <Box fontWeight={500}>{tradeDetail?.trade_id}</Box>



                                                    </Flex>
                                                    <Flex className='flex3' justifyContent={'space-between'} direction={{ base: 'row', sm: 'column' }}>
                                                        <Heading size={'sm'} color={'#fe532e'}>STARTED</Heading>
                                                        <Box>{dayjs(tradeDetail?.created_at).fromNow()}</Box>



                                                    </Flex>
                                                </Flex>
                                                <Flex justifyContent={'space-between'} >
                                                    <Button variant={'outline'} onClick={() => navigate('/chat')}>View Offer</Button>
                                                    <Button variant={'outline'}>Take a Tour</Button>
                                                </Flex>

                                            </Flex>
                                            {/* Left Side end */}
                                        </Flex>
                                        :
                                        <Flex
                                            maxW={{ base: "100%", lg: '90%', xl: "90%" }}
                                            minW={{ base: "100%", sm: '90%', lg: '90%', xl: "none" }}
                                            w={'100%'}
                                            gap={5}
                                            mt={{ base: 32, lg: 0 }}
                                            direction={{ base: 'column', lg: 'row' }}
                                        >
                                            <RightSideContent tradeDetail={tradeDetail} advertisementDetail={advertisementDetail} tradeType={tradeType} />

                                        </Flex>
                                }


                                {/* <Flex justifyContent="center" gap={4} my={4}>
                                    <Button onClick={() => setView('action')} colorScheme={view === 'action' ? 'orange' : 'gray'}>
                                        Action
                                    </Button>
                                    <Button onClick={() => setView('chat')} colorScheme={view === 'chat' ? 'orange' : 'gray'}>
                                        Chat
                                    </Button>
                                </Flex> */}
                                <Flex
                                    position="fixed"
                                    bottom="0"
                                    left="0"
                                    right="0"
                                    bg="white"
                                    borderTop="1px solid #ccc"
                                    zIndex="999"
                                    justifyContent="space-between"
                                    p={2}
                                    boxShadow="0 -2px 5px rgba(0,0,0,0.1)"
                                    mx={2}
                                    my={1}
                                >
                                    <Button
                                        flex="1"
                                        mx={1}
                                        onClick={() => setView('action')}
                                        colorScheme={view === 'action' ? 'orange' : 'gray'}
                                        variant={view === 'action' ? 'solid' : 'outline'}
                                    >
                                        Actions
                                    </Button>
                                    <Button
                                        flex="1"
                                        mx={1}
                                        onClick={() => setView('chat')}
                                        colorScheme={view === 'chat' ? 'orange' : 'gray'}
                                        variant={view === 'chat' ? 'solid' : 'outline'}
                                    >
                                        Chat
                                    </Button>
                                </Flex>

                            </>
                            :
                            <Flex
                                maxW={{ base: "100%", lg: '90%', xl: "90%" }}
                                minW={{ base: "100%", sm: '90%', lg: '90%', xl: "none" }}
                                w={'100%'}
                                gap={5}
                                mt={{ base: 0, lg: 0 }}
                                direction={{ base: 'column', lg: 'row' }}
                            >

                                {/* left Side start */}


                                <Flex alignSelf={{ base: 'center', lg: 'start' }} mt={{ base: 24, lg: 0 }} flex={{ lg: .8, xl: .8 }} direction={'column'} gap={5} overflowY={'auto'} w={{ base: '95%', lg: '90%' }} >
                                    {

                                        tradeType === 'buy_trade' ?

                                            <Buyer tradeDetail={tradeDetail} assetValue={assetValue} getTradeDetail={getTradeDetail} remainingTime={remainingTime} disputeremainingTime={disputeremainingTime} isDisputeShow={isDisputeShow} tradeType={tradeType} />
                                            :
                                            <Seller tradeDetail={tradeDetail} assetValue={assetValue} getTradeDetail={getTradeDetail} remainingTime={remainingTime} sellerdisputeremainingTime={sellerdisputeremainingTime} isSellerDisputeShow={isSellerDisputeShow} tradeType={tradeType} />



                                    }



                                    <OfferTerms data={advertisementDetail} />

                                    <Heading size={'md'}>Trade Information</Heading>
                                    <Flex gap={10} mb={5} direction={{ base: 'column', sm: 'row' }} borderTop={'1px solid #dcdcdc'} justifyContent={'space-between'} p={4}>
                                        <Flex className='flex1' direction={{ base: 'row', sm: 'column' }} justifyContent={'space-between'}>
                                            <Heading size={'sm'} color={'#fe532e'}>Rate</Heading>
                                            <Box>455888 inr</Box>

                                        </Flex>
                                        <Flex className='flex2' justifyContent={'space-between'} direction={{ base: 'row', sm: 'column' }}>
                                            <Heading size={'sm'} color={'#fe532e'}>TRADE ID</Heading>
                                            <Box fontWeight={500}>{tradeDetail?.trade_id}</Box>



                                        </Flex>
                                        <Flex className='flex3' justifyContent={'space-between'} direction={{ base: 'row', sm: 'column' }}>
                                            <Heading size={'sm'} color={'#fe532e'}>STARTED</Heading>
                                            <Box>{dayjs(tradeDetail?.created_at).fromNow()}</Box>



                                        </Flex>
                                    </Flex>
                                    <Flex justifyContent={'space-between'} >
                                        <Button variant={'outline'} onClick={() => navigate('/chat')}>View Offer</Button>
                                        <Button variant={'outline'}>Take a Tour</Button>
                                    </Flex>

                                </Flex>

                                {/* Left Side end */}


                                {/* Right Side nav column */}
                                <RightSideContent tradeDetail={tradeDetail} advertisementDetail={advertisementDetail} tradeType={tradeType} />
                                {/* Right Side nav column end */}


                            </Flex>

                    }


                </Flex>
                :
                <FullPageLoader />
            }
        </>

    )



}
export const Seller = ({ tradeDetail, getTradeDetail, assetValue, remainingTime, sellerdisputeremainingTime, isSellerDisputeShow }) => {
    const [isReceived, setIsReceived] = useState(false);
    const { handleBuyerUpdate, handleFinalBuyerUpdate, handleUpdateTradeDispute } = useTradeProvider();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { getUserById } = useUser();
    const dispute = useStore(state => state.dispute);
    return (
        <>
            {
                (tradeDetail.trade_step == 3 && tradeDetail?.trade_status !== 'cancel') &&

                <Feedback tradeDetail={tradeDetail} user_id={tradeDetail?.seller_id} partnerDetail={getUserById} />
            }

            {
                ((tradeDetail?.is_disputed && tradeDetail.trade_step >= 2 || dispute) && tradeDetail.trade_status !== 'cancel') ?
                    <Flex mt={5} direction={'column'} gap={5}>
                        <Flex as={Heading} color={'red.600'} gap={2} alignItems={'center'}>
                            <Image src='/imagelogo/tracker_blinker.gif' boxSize={6} />
                            <Heading size={'lg'}> Trade Dispute Open</Heading>
                        </Flex>
                        <Alert status='error' borderRadius={5}>
                            <Flex gap={5} >
                                <Image src='/imagelogo/policemen.png' alt='alert icon' boxSize={10} />

                                <Flex direction={'column'}>

                                    <AlertTitle color={'red.500'}>Dispute is Open</AlertTitle>
                                    <AlertDescription>
                                        <Box fontWeight={500} color={'gray.600'} fontSize={'13px'}>
                                            A moderrator will join the trade chat once they're available.
                                        </Box>
                                    </AlertDescription>
                                </Flex>

                            </Flex>

                        </Alert>
                        <Flex fontWeight={500} fontSize={'15px'} p={4} bg={'red.100'} borderRadius={5} color={'gray.600'} direction={'column'}>
                            <Flex>
                                <Box>
                                    ●&nbsp;
                                </Box>
                                Dispute are processed in live queue a moderator will join the trade chat when available. <br />
                            </Flex>
                            <Flex>
                                <Box>
                                    ●&nbsp;
                                </Box>

                                Decision for the award of escrowed cryptocurrency is based on following of offer terms, trading activity, provided proof of payment and the information request by a moderator during the trade.
                            </Flex>
                            <br />
                            While waiting for a moderator to join you can summarize what happend and present all prossible proof to support claim.

                        </Flex>

                    </Flex>
                    :
                    null
            }
            {
                (tradeDetail.trade_step <= 3 && (tradeDetail?.trade_status === 'processing' || tradeDetail?.trade_status === 'cancel' || tradeDetail?.trade_status === 'pending' || tradeDetail?.trade_status === 'expired')) &&
                <>
                    <Flex mt={{ base: 10, md: 10, lg: 0, xl: 0 }} alignItems={'center'} gap={2}>
                        {
                            (tradeDetail.trade_status === 'cancel' && tradeDetail?.is_disputed === false) &&

                            <Image src='/imagelogo/tracker_blinker.gif' boxSize={6} />
                        }
                        {
                            tradeDetail.trade_status === 'pending' &&
                            <Image src='/imagelogo/GrayBlinker.gif' boxSize={6} />
                        }

                        {
                            ((tradeDetail?.is_disputed === false && !dispute) || (tradeDetail?.trade_status === 'cancel')) &&

                            <Heading Heading color={statusColorMap[tradeDetail?.trade_status]} size={'lg'}>{`Trade ${statusMatch[tradeDetail?.trade_status]}`}</Heading>
                        }
                    </Flex>
                    {
                        (tradeDetail.trade_status === 'cancel' || tradeDetail.trade_status === 'expired') ?
                            <>

                                <Card p={4}>
                                    {
                                        <Flex gap={2}>
                                            <Box color={'red.500'}>

                                                <IoMdCloseCircleOutline size={26} />
                                            </Box>
                                            <Box fontWeight={500} fontSize={'16px'}> {`Have you reveived the payment? If so, please reopen the trade and release the ${tradeDetail?.asset}  into the buyer's wallet.`} </Box>
                                        </Flex>

                                    }


                                </Card>

                                <Card p={4}>
                                    <Flex gap={5} justifyContent={'space-between'} direction={{ base: 'column-reverse', md: 'row' }} >
                                        {
                                            tradeDetail?.trade_status === 'expired' &&
                                            <Button colorScheme='green' >Reopen Trade</Button>
                                        }

                                        <ReportBehaviour tradeDetail={tradeDetail} />
                                    </Flex>


                                </Card>
                            </>
                            :

                            <Card borderRadius={5} gap={5} p={2} >
                                <Flex direction={'column'} py={5} px={2} gap={5}>

                                    <Flex gap={3}>
                                        {/* <ImStopwatch size={40} /> */}
                                        {/* <Image boxSize={20} src='/imagelogo/clock.gif' alt='stopwatch' /> */}
                                        <Image boxSize={16} src={ClockTag[tradeDetail?.asset]} alt='stopwatch' />


                                        <Flex direction={'column'}>
                                            <Box as='p' fontWeight={500} color={'gray'} fontSize={'18px'}>You will receive a paymennt of {Number(tradeDetail?.amount).toFixed(2)} INR through PhonePe</Box>
                                            <Box>
                                                <b>

                                                    {Number(assetValue).toFixed(4)}&nbsp;
                                                </b>
                                                will be Debited from your {tradeDetail?.asset} wallet</Box>
                                        </Flex>


                                    </Flex>

                                    <Flex>
                                        {
                                            tradeDetail?.trade_step < 3 &&


                                            <Flex direction={'column'} borderBottomRadius={5} fontWeight={500} gap={5} >

                                                <Box color={'#111827'}>
                                                    <b>

                                                        "Once the buyer marks the payment as completed,&nbsp;
                                                    </b>
                                                    <Box as='span' color='#f59e0b'>

                                                        please verify the payment promptly. If you do not confirm within the given time limit, the trade may be completed automatically and the Bitcoin released to the buyer."
                                                    </Box>
                                                </Box>
                                                {
                                                    tradeDetail?.trade_step < 2 ?
                                                        <Heading size={'xs'} color={'red.500'}>Buyer Not Paid Yet!</Heading>
                                                        :
                                                        <Heading size={'xs'} color={'green.500'}>Buyer Marked Paid</Heading>

                                                }


                                                <ReceivedModal setIsReceived={setIsReceived} remainingTime={remainingTime} tradeDetail={tradeDetail} getTradeDetail={getTradeDetail} />
                                            </Flex>
                                        }

                                    </Flex>

                                    {
                                        (tradeDetail.trade_step == 2 && tradeDetail?.is_disputed === false) &&
                                        <Divider />
                                    }
                                    <Flex>
                                        {

                                            (isReceived || tradeDetail.trade_step >= 2) &&
                                            <>
                                                {

                                                    (tradeDetail.is_disputed === false && !dispute) &&

                                                    <Flex gap={5}>

                                                        {/* <Image boxSize={50} src='/imagelogo/argue.png'></Image> */}
                                                        <TbWheel size={50} color='#66758b' />

                                                        <Flex direction={'column'} gap={4}>
                                                            <Box>
                                                                Click <b>Dispute</b> to report an unresponseive trade partener or any other issue you may have.
                                                            </Box>
                                                            {/* <Button boxShadow={'md'} isDisabled={!isDisputeShow}>Start a Dispute 📢</Button> */}
                                                            <Button boxShadow={'md'} onClick={onOpen} isDisabled={!isSellerDisputeShow} bg={'gray.100'} w={200} height={70}>

                                                                <Flex direction={'column'} m={10} gap={2}>
                                                                    <Box fontWeight={700}>Start a Dispute</Box>
                                                                    {

                                                                        tradeDetail.seller_dispute_time !== null &&
                                                                        <Flex fontWeight={600} borderRadius={5} alignSelf={'center'}  >
                                                                            <Box fontSize={'13px'} color={'gray.700'}>Available in {`${sellerdisputeremainingTime}`} min.</Box>

                                                                        </Flex>
                                                                    }
                                                                </Flex>

                                                            </Button>


                                                        </Flex>

                                                    </Flex>
                                                }

                                            </>

                                        }
                                    </Flex>
                                    <Divider />




                                    {
                                        (isReceived || tradeDetail.trade_step >= 3) &&
                                        <>
                                            <ReportBehaviour tradeDetail={tradeDetail} />
                                        </>
                                    }



                                    {
                                        tradeDetail?.trade_step < 4 &&
                                        <>
                                            <CompExample />

                                        </>
                                    }

                                </Flex>
                                <DisputeModal isOpen={isOpen} onClose={onClose} id={tradeDetail?.trade_id} tradeDetail={tradeDetail} />


                            </Card>
                    }

                </>
            }
        </>

    )
}
export const Buyer = ({ tradeDetail, getTradeDetail, assetValue, remainingTime, disputeremainingTime, isDisputeShow, tradeType }) => {
    const [ispaid, setIsPaid] = useState(false);
    const { handleCancelTrade } = useTradeProvider();
    const { handleBuyerUpdate, handleFinalBuyerUpdate, handleUpdateTradeDispute } = useTradeProvider();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { getUserById, user } = useUser();
    const dispute = useStore(state => state.dispute);
    const cancel = useStore(state => state.cancel);



    return (
        <>
            {
                (tradeDetail.trade_step == 3 && tradeDetail?.trade_status !== 'cancel') &&

                <Feedback tradeDetail={tradeDetail} user_id={tradeDetail?.buyer_id} partnerDetail={getUserById} />
            }

            {
                ((tradeDetail?.is_disputed && tradeDetail.trade_step >= 2 || dispute) && tradeDetail.trade_status !== 'cancel') ?
                    <Flex mt={5} direction={'column'} gap={5}>
                        <Flex as={Heading} color={'red.600'} gap={2} alignItems={'center'}>
                            <Image src='/imagelogo/tracker_blinker.gif' boxSize={6} />


                            <Heading size={'lg'}> Trade Dispute Open</Heading>
                        </Flex>
                        <Alert status='error' borderRadius={5}>
                            <Flex gap={5} >
                                <Image src='/imagelogo/policemen.png' alt='alert icon' boxSize={10} />

                                <Flex direction={'column'}>

                                    <AlertTitle color={'red.500'}>Dispute is Open</AlertTitle>
                                    <AlertDescription>
                                        <Box fontWeight={500} color={'gray.600'} fontSize={'13px'}>
                                            A moderrator will join the trade chat once they're available.
                                        </Box>
                                    </AlertDescription>
                                </Flex>

                            </Flex>

                        </Alert>
                        <Flex fontWeight={500} fontSize={'15px'} p={4} bg={'red.100'} borderRadius={5} color={'gray.600'} direction={'column'}>
                            <Flex>
                                <Box>
                                    ●&nbsp;
                                </Box>
                                Dispute are processed in live queue a moderator will join the trade chat when available. <br />
                            </Flex>
                            <Flex>
                                <Box>
                                    ●&nbsp;
                                </Box>

                                Decision for the award of escrowed cryptocurrency is based on following of offer terms, trading activity, provided proof of payment and the information request by a moderator during the trade.
                            </Flex>
                            <br />
                            While waiting for a moderator to join you can summarize what happend and present all prossible proof to support claim.

                        </Flex>

                    </Flex>
                    :
                    null
            }
            {
                (tradeDetail.trade_step <= 3 && (tradeDetail?.trade_status === 'processing' || tradeDetail?.trade_status === 'cancel' || tradeDetail?.trade_status === 'pending' || tradeDetail?.trade_status === 'expired')) &&
                <>
                    <Flex mt={{ base: 10, md: 10, lg: 0, xl: 0 }} gap={2} alignItems={'center'}>
                        {
                            (tradeDetail.trade_status === 'cancel' && tradeDetail?.is_disputed === false) &&
                            <Image src='/imagelogo/tracker_blinker.gif' boxSize={6} />
                        }
                        {
                            tradeDetail.trade_status === 'pending' &&
                            <Image src='/imagelogo/GrayBlinker.gif' boxSize={6} />
                        }

                        {
                            ((tradeDetail?.is_disputed === false && !dispute) || (tradeDetail?.trade_status === 'cancel')) &&

                            <Heading Heading color={statusColorMap[tradeDetail?.trade_status]} size={'lg'}>{`Trade ${statusMatch[tradeDetail?.trade_status]}`}</Heading>
                        }
                    </Flex>
                    {
                        (tradeDetail.trade_status === 'cancel' || tradeDetail?.trade_status === 'expired' || cancel) ?
                            <>

                                <Card p={4}>
                                    {
                                        <Flex gap={2}>
                                            <Box color={'red.500'}>

                                                <IoMdCloseCircleOutline size={26} />
                                            </Box>
                                            <Box fontWeight={500} fontSize={'16px'}> {`Want to start another trade? You can always start a new trade with "${user?.username}" or simply find a new one from our list of "${tradeDetail?.payment?.payment_method?.payment_method}" offers.`} </Box>
                                        </Flex>

                                    }


                                </Card>

                                <Card p={4}>
                                    <Flex direction={'column'} gap={5}>

                                        <ReportBehaviour tradeDetail={tradeDetail} />
                                        <CompExample />
                                    </Flex>


                                </Card>
                            </>
                            :
                            <Card borderRadius={5} gap={5} p={2} >
                                <Flex direction={'column'} py={5} px={2} gap={5}>

                                    <Flex gap={3}>
                                        {/* <ImStopwatch size={40} /> */}
                                        <Image boxSize={16} src={ClockTag[tradeDetail?.asset]} alt='stopwatch' />

                                        <Flex direction={'column'} mt={{ base: 0, xl: 3 }}>
                                            <Box as='p' fontWeight={500} color={'gray'} fontSize={'18px'}>Please make a paymennt of {Number(tradeDetail?.amount).toFixed(2)} INR using PhonePe</Box>
                                            <Box>
                                                <b>

                                                    {Number(assetValue).toFixed(4)}&nbsp;
                                                </b>
                                                will be added to you {tradeDetail?.asset} wallet</Box>

                                        </Flex>
                                    </Flex>
                                    <Divider />
                                    <Flex>
                                        {

                                            <Flex direction={'column'} borderBottomRadius={5} fontWeight={500} gap={5} >

                                                {
                                                    tradeDetail?.trade_step < 2 &&


                                                    (
                                                        !ispaid &&
                                                        <Box color={'#111827'}>
                                                            <b>

                                                                Once you've made the payemnet,&nbsp;
                                                            </b>
                                                            <Box as='span' color='#f59e0b'>

                                                                be sure to click paid within the given time limit. Otherwise the trade will be automatically canceled and the Bitcoin will be returned to the seller'se wallet.
                                                            </Box>
                                                        </Box>
                                                    )

                                                }


                                                {
                                                    tradeDetail?.trade_step > 3 &&
                                                    <Box color={'#111827'}>
                                                        🎉 Trade Completed!
                                                        Thank you for completing your trade of ${tradeDetail?.amount} ${tradeDetail?.asset}. We appreciate your trust in our platform.

                                                    </Box>
                                                }

                                                {
                                                    !ispaid &&
                                                    (
                                                        tradeDetail?.trade_step < 2 &&
                                                        <Flex justifyContent={'space-between'} flexWrap={'wrap'} direction={{ base: 'column', md: 'row', lg: 'column', xl: 'row' }} gap={10} mt={8}>

                                                            <Flex flex={1}>

                                                                <PaidModal setIsPaid={setIsPaid} remainingTime={remainingTime} tradeDetail={tradeDetail} getTradeDetail={getTradeDetail} ispaid={ispaid} />

                                                            </Flex>


                                                        </Flex>
                                                    )
                                                }


                                            </Flex>

                                        }
                                    </Flex>

                                    {
                                        (tradeDetail?.trade_step >= 2 || ispaid) &&
                                        <Flex flex={1} justifyContent={'end'} >
                                            {
                                                (tradeDetail?.trade_step >= 2 || ispaid) &&
                                                <>
                                                    <ReportBehaviour tradeDetail={tradeDetail} />
                                                </>
                                            }
                                        </Flex>
                                    }
                                    {/* Dispute section */}

                                    {
                                        (tradeDetail?.trade_step >= 2 || ispaid) &&
                                        <>
                                            {
                                                (tradeDetail.is_disputed === false && !dispute) &&
                                                <>

                                                    <Divider />
                                                    <Flex gap={3}>
                                                        {/* <Image boxSize={50} src='/imagelogo/argue.png'></Image> */}

                                                        <TbWheel size={50} color='#66758b' />
                                                        <Flex direction={'column'} gap={4}>
                                                            <Box>
                                                                Click <b>Dispute</b> to report an unresponseive trade partener or any other issue you may have.
                                                            </Box>
                                                            <Button isLoading={tradeDetail?.trade_step == 1} loadingText={'Waiting...'} onClick={onOpen} boxShadow={'md'} isDisabled={!isDisputeShow} bg={'gray.100'} w={200} height={70}>

                                                                <Flex direction={'column'} m={10} gap={2}>
                                                                    <Box fontWeight={700}>Start a Dispute</Box>
                                                                    {

                                                                        tradeDetail.buyer_dispute_time !== null &&
                                                                        <Flex fontWeight={600} borderRadius={5} alignSelf={'center'}  >
                                                                            <Box fontSize={'13px'} color={'gray.700'}>Available in {`${disputeremainingTime}`} min.</Box>

                                                                        </Flex>
                                                                    }
                                                                </Flex>

                                                            </Button>
                                                        </Flex>

                                                    </Flex>

                                                </>

                                            }
                                        </>

                                    }
                                    <Divider />


                                    {
                                        tradeDetail?.trade_step < 4 &&
                                        <>

                                            <CompExample />


                                            <Divider />

                                            <Flex justifyContent={'space-between'} gap={{ base: 4, sm: 0 }} direction={{ base: 'column-reverse', sm: 'row' }} >

                                                <CancelTrade tradeDetail={tradeDetail} />



                                                <Flex gap={2} color={'gray.500'}>
                                                    <Box mt={1}>

                                                        <BsExclamationCircle />
                                                    </Box>
                                                    <Box fontWeight={500}>  {ispaid ? 'You have paid already' : `You have't paid yet!`}</Box>
                                                </Flex>
                                            </Flex>
                                        </>

                                    }

                                </Flex>
                                <DisputeModal isOpen={isOpen} onClose={onClose} id={tradeDetail?.trade_id} tradeDetail={tradeDetail} />


                            </Card>
                    }
                </>
            }

        </>


    )
}

export const RightSideContent = ({ tradeDetail, advertisementDetail, tradeType }) => {
    const [index, setIndex] = useState(0);
    const location = useLocation();
    const { user, getUserById } = useUser();

    const [isOnline, setIsOnline] = useState(false);
    const db = getDatabase();
    const firestore = getFirestore();
    const userStatusDatabaseRef = ref(db, `/status/${user?.user_id}`);
    const userStatusFirestoreRef = doc(firestore, `users/${user?.user_id}`);
    useEffect(() => {
        const userRef = doc(firestore, 'users', String(getUserById?.user_id));
        const unsubscribe = onSnapshot(userRef, (docSnap) => {
            const data = docSnap.data();
            setIsOnline(data?.online || false);
        });
        return () => unsubscribe;
    }, [user?.user_id]);

    useEffect(() => {
        if (!user?.user_id) return;
        const isOfflineForDatabase = {
            state: 'offline',
            last_changed: serverTimestamp(),
        };
        const isOnlineForDatabase = {
            state: 'online',
            last_changed: serverTimestamp(),
        };
        const isOfflineForFirestore = {
            online: false,
            lastSeen: serverTimestamp(),
        };
        const isOnlineForFirestore = {
            online: true,
            lastSeen: serverTimestamp(),
        };
        const connectedRef = ref(db, '.info/connected');
        const unsubscribe = onValue(connectedRef, (snapshot) => {
            if (snapshot.val() === false) return;

            onDisconnect(userStatusDatabaseRef)
                .set(isOfflineForDatabase)
                .then(() => {
                    set(userStatusDatabaseRef, isOnlineForDatabase);
                    setDoc(userStatusFirestoreRef, isOnlineForFirestore, { merge: true });
                });
        });

        // Clean up (optional, not required for onDisconnect, but good habit)
        return () => {
            set(userStatusDatabaseRef, isOfflineForDatabase);
            setDoc(userStatusFirestoreRef, isOfflineForFirestore, { merge: true });
        };
    }, [user?.user_id]);

    return (
        <Flex flex={{ lg: 1.2, xl: 1.2 }}

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
                    borderRadius={{ base: 5, lg: 5 }}
                    border={'1px solid #dcdcdc'}
                    h='auto'
                    p={{ base: 4, sm: 4, md: 6, xl: 4 }}
                    gap={5}
                    m={{ base: 2, md: 0 }}
                >

                    <Flex justifyContent={'space-between'}>

                        <Flex direction={'column'} gap={5}>
                            <Flex w={'full'} p={4} gap={4} >
                                <Flex alignItems={'center'} gap={2}>


                                    <Avatar border={'1px solid #dcdcdc'} name={getUserById?.name ? getUserById?.name : getUserById?.email} src={getUserById?.profile_image_url} size={'md'}>
                                        <AvatarBadge boxSize='1em' bg={isOnline ? 'green.200' : 'orange.200'} ></AvatarBadge>
                                    </Avatar>
                                    {/* :
                                    <Spinner size={'xl'} /> */}


                                </Flex>
                                <Flex direction={'column'}>

                                    <Flex textDecoration={'underline'} as={Link} href='/profile' alignItems={'center'} gap={2}>{getUserById?.name ? getUserById?.name : getUserById?.email} <LuSquareArrowOutUpRight /></Flex>
                                    <Flex gap={2} flexWrap={'wrap'} justifyContent={'space-between'}>
                                        {
                                            isOnline ?
                                                <Box fontWeight={500} fontSize={'16px'} color={'green'}>online</Box>
                                                :
                                                <Box color={'gray'}>offline</Box>
                                        }
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex gap={5}>
                            <Flex gap={2}>
                                <Box mt={1}>
                                    <BiDislike color='red' />
                                </Box>
                                45
                            </Flex>
                            <Flex gap={2}>
                                <Box mt={1}>
                                    <BiLike color='green' />
                                </Box>
                                45
                            </Flex>
                        </Flex>
                    </Flex>
                    <ChatComponent currentUserId={user?.user_id} otherUserId={getUserById?.user_id} otherUserName={getUserById?.username} tradeDetail={tradeDetail} advertisementDetail={advertisementDetail} tradeType={tradeType} />
                </Card>
            </Flex>
        </Flex>
    )
}

function CompExample() {
    const {
        isOpen: isVisible,
        onClose,
        onOpen,
    } = useDisclosure({ defaultIsOpen: true })

    return isVisible ? (
        <Alert status='warning' borderRadius={5}>
            <Flex >
                <AlertIcon />
                <Flex direction={'column'}>

                    <AlertTitle>Please Read it !</AlertTitle>
                    <AlertDescription fontSize={'14px'} fontWeight={600}>
                        Keep Trades within Onnbit. Some users may ask you to trade outside the Onnbit platform. This is against our Terms of Service and likely a scam attempt.
                        You must insist on keeping all trade conversations within Onnbit. If you choose to proceed outside Onnbit, note that we cannnot help or support you if you are scammed during such trades.

                    </AlertDescription>
                </Flex>

            </Flex>
            <CloseButton
                alignSelf='flex-start'
                position='relative'
                right={-1}
                top={-1}
                onClick={onClose}
            />
        </Alert>
    ) : null
}

const PaidModal = ({ setIsPaid, remainingTime, tradeDetail, getTradeDetail, ispaid }) => {
    const { handleBuyerUpdate } = useTradeProvider();
    const setPaid = useStore((state) => state.setPaid);


    const { isOpen, onOpen, onClose } = useDisclosure()

    const handlePaid = () => {
        setIsPaid(true);
        setPaid(true);
        handleBuyerUpdate(tradeDetail?.trade_id);
        getTradeDetail();

        onClose();
    };

    return (
        <>
            {

                !ispaid &&
                (tradeDetail?.trade_step < 2 &&
                    <Button isDisabled={tradeDetail?.trade_status === 'expired' || tradeDetail?.trade_status === 'cancel' || ispaid} textAlign={'start'} boxShadow={'lg'} color={(tradeDetail?.trade_step >= 2 || ispaid) ? 'black' : 'white'} w={'150px'} bg={(tradeDetail?.trade_step >= 2 || ispaid) ? 'gray.100' : 'green.400'} p={8} onClick={onOpen}>
                        <Flex direction={'column'} alignItems={'center'}>
                            <Box>Paid</Box>
                            <Box>{remainingTime}</Box>
                        </Flex>

                    </Button>)
            }
            <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered motionPreset="slideInBottom">
                <ModalOverlay />
                <ModalContent borderRadius="xl" boxShadow="2xl">
                    <ModalHeader bg="gray.100" color="gray.800" borderTopRadius="xl" fontWeight="bold">
                        <Flex align="center" gap={2}>
                            Self Confirmation
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody py={4} px={5}>
                        <Alert status="info" mb={4} borderRadius="md" fontSize="sm" alignItems={'start'}>
                            <AlertIcon />
                            <Box>

                                Please read the seller's instructions carefully. Only click <b>"Paid"</b> if you have followed all steps and sent the funds.
                            </Box>
                        </Alert>

                        <Alert status="error" mb={5} variant="left-accent" borderRadius="md" fontSize="sm" alignItems={'start'}>
                            <AlertIcon />
                            Clicking Paid without actually making the payment can harm your reputation and may lead to a ban.
                        </Alert>
                    </ModalBody>

                    <Divider />

                    <ModalFooter justifyContent="space-between" px={5} py={4}>
                        <Button
                            onClick={onClose}
                            variant="outline"
                            borderColor="gray.300"
                            _hover={{ bg: 'gray.100' }}
                        >
                            Back to Chat
                        </Button>
                        <Button
                            onClick={handlePaid}
                            bg="green.400"
                            color="white"
                            _hover={{ bg: 'green.500' }}
                        >
                            Paid
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader borderTopRadius={5} bg={'gray.100'}>Self Confirmation
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <Box mb={1} p={2} borderRadius={5} bg={'blue.100'} color={'blue.500'} fontWeight={500} fontSize={'14px'}>
                            Please read the seller's instructions below,
                            if you have followed them all and paid, click "Paid".
                            If you have missed a step or haven't paid click Back to Chat to the seller.
                        </Box>
                        <Flex p={2} bg={'red.100'} gap={3} fontSize={'14px'} mb={5} borderRadius={5}>
                            <Box fontWeight={500} color={'red.500'}>
                                Clicking Paid without paying the vendor will damage your reputation on the plateform and get you blocked.
                            </Box>
                        </Flex>
                    </ModalBody>
                    <ModalFooter justifyContent={'space-between'}>
                        <Button variant={'outline'} onClick={onClose}>Close</Button>
                        <Button variant={'outline'} color={'white'} bg={'green.400'} onClick={handlePaid}>Paid</Button>

                    </ModalFooter>

                </ModalContent>
            </Modal> */}
        </>
    )
}
const ReceivedModal = ({ setIsReceived, remainingTime, tradeDetail, getTradeDetail }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { handleSellerUpdate } = useTradeProvider();
    const [isChecked, setIsChecked] = useState(false);


    const handleReceived = async () => {
        const sellerUpdateDto = {
            trade_id: tradeDetail?.trade_id,
            response: "success",
            review: "slow trader",
            likeDislike: "like",
        }
        setIsReceived(true);
        await handleSellerUpdate(sellerUpdateDto);
        getTradeDetail();
        onClose();
    };
    const handleReject = () => {
        const sellerUpdateDto = {
            trade_id: tradeDetail?.trade_id,
            response: "reject",
            review: "slow trader",
            remark: "I have not received the payment yet.",
            likeDislike: "dislike",
        }
        setIsReceived(false);
        handleSellerUpdate(sellerUpdateDto);
        onClose();
    };
    return (
        <>
            <Button isDisabled={tradeDetail?.trade_status === 'expired' || tradeDetail?.trade_status === 'cancel'} textAlign={'start'} bg={tradeDetail?.trade_step < 2 ? 'gray.50' : 'green.500'} color={tradeDetail?.trade_step < 2 ? 'black' : 'white'} w={'150px'} boxShadow={'lg'} p={8} onClick={onOpen}>
                <Flex direction={'column'} >
                    <Box textTransform={'capitalize'}>{`Send ${tradeDetail?.asset}`}</Box>
                    {
                        tradeDetail?.time_limit !== null &&
                        <Box> {remainingTime}</Box>
                    }
                </Flex>

            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered motionPreset="slideInBottom">
                <ModalOverlay />
                <ModalContent borderRadius="xl" boxShadow="2xl">
                    <ModalHeader bg="gray.100" color="gray.800" borderTopRadius="xl" fontWeight="bold">
                        <Flex align="center" gap={2}>
                            Deep Confirmation
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody py={4} px={5}>
                        <Alert status="info" mb={4} borderRadius="md" fontSize="sm" alignItems={'start'}>
                            <AlertIcon />
                            <Box>
                                Please verify payment details carefully to protect yourself from fraud. If you've received the payment, click <b>"Release"</b>.
                            </Box>
                        </Alert>

                        <Alert status="error" mb={5} variant="left-accent" borderRadius="md" fontSize="sm" alignItems={'start'}>
                            <AlertIcon />
                            <Box>
                                Releasing funds without confirming payment may result <b>"irreversible loss"</b>. Ensure you double-check.
                            </Box>
                        </Alert>

                        <Checkbox
                            colorScheme="green"
                            isChecked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                            size="lg"
                        >
                            <Flex gap={3} alignItems="center">
                                I have verified the payment from the buyer.
                                {isChecked && <Image src="/imagelogo/verification.gif" boxSize={6} />}
                            </Flex>
                        </Checkbox>
                    </ModalBody>

                    <Divider />

                    <ModalFooter justifyContent="space-between" px={5} py={4}>
                        <Button
                            onClick={onClose}
                            variant="outline"
                            borderColor="gray.300"
                            _hover={{ bg: 'gray.100' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleReceived}
                            bg="green.400"
                            color="white"
                            _hover={{ bg: 'green.500' }}
                            isDisabled={!isChecked}
                        >
                            Release
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>


            {/* <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader borderTopRadius={5} bg={'gray.100'}>Deep Confirmation
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <Box mb={1} fontWeight={500} p={2} color={'blue.400'} bg={'blue.100'} fontSize={'14px'} borderRadius={5}>
                            Please verify payment detail carefully, to protect yourself from fraud. if you have received the payment, click "Release".

                        </Box>
                        <Flex p={2} bg={'red.100'} gap={1} mb={5} borderRadius={5}>
                            <Box fontWeight={500} color={'red.500'} fontSize={'14px'} >
                                Clicking received without verifying the payment properly can make in irreversible loss of your funds.
                            </Box>
                        </Flex>
                        <Checkbox
                            isChecked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                        >
                            <Flex gap={2} alignItems={'center'}>

                                Did you verify payment from buyer?
                                {
                                    isChecked &&
                                    <Image src='/imagelogo/verification.gif' boxSize={8}></Image>
                                }

                            </Flex>
                        </Checkbox>
                    </ModalBody>
                    <ModalFooter justifyContent={'space-between'}>
                        <Button variant={'outline'} color={'white'} bg={'green.400'} onClick={handleReceived} isDisabled={!isChecked}>Release</Button>
                    </ModalFooter>

                </ModalContent>
            </Modal> */}
        </>
    )
}


export const CancelTrade = ({ tradeDetail }) => {
    const [isloading, setIsLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const { handleCancelTrade } = useTradeProvider();

    const [confirmed, setConfirmed] = useState(false);

    const setCancel = useStore((state) => state.setCancel);
    const cancelTrade = async () => {
        setIsLoading(true);
        try {
            const response = await handleCancelTrade(tradeDetail?.trade_id);
            setCancel(true);
            if (response?.status === true) {
                setTimeout(() => {
                    onClose();
                    setConfirmed(false); // reset checkbox
                    toast({
                        title: 'Trade Cancelled',
                        description: 'The trade was cancelled successfully.',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
                }, 1000);
            }
        } catch (error) {
            toast({
                title: 'Cancellation Failed',
                description: 'Something went wrong. Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
        finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Button onClick={onOpen} boxShadow="md" variant="outline">
                🚫 Cancel Trade
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg="red.50" borderTopRadius="md">
                        Cancel Trade
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        {
                            tradeDetail?.trade_status === 'cancel' ?
                                <Box p={4} bg="yellow.100" color="yellow.800" borderRadius="md" m={4}>
                                    This trade has already been cancelled.
                                    <br />
                                    If you need further assistance, please contact support.
                                </Box>

                                :

                                <Flex direction="column" gap={4}>
                                    <Checkbox
                                        colorScheme="red"
                                        isChecked={confirmed}
                                        onChange={(e) => setConfirmed(e.target.checked)}
                                        fontWeight={'600'}
                                        mt={2}
                                    >
                                        I understand and want to cancel this trade.
                                    </Checkbox>
                                    <Box fontSize="sm" color="gray.600">
                                        Cancelling a trade is final. If you're facing any issues, we recommend raising a dispute or contacting support before proceeding.
                                    </Box>
                                </Flex>
                        }
                    </ModalBody>
                    <ModalFooter
                        bg="red.50"
                        borderBottomRadius="md"
                        justifyContent="space-between"
                    >
                        <Button variant="outline" onClick={() => {
                            onClose();
                            setConfirmed(false); // Reset checkbox when closing
                        }}>
                            Back
                        </Button>
                        <Button
                            isLoading={isloading}
                            loadingText="Cancelling..."
                            colorScheme="red"
                            onClick={cancelTrade}
                            isDisabled={!confirmed}
                        >
                            Yes, Cancel Trade
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};


const statusMatch = {
    'pending': 'Started',
    'processing': 'In Progress...',
    'cancel': 'Cancelled by Buyer',
    'expired': 'Cancelled by System',
    'success': 'Completed',
    'reject': 'Rejected',
}
const statusColorMap = {
    pending: 'gray.500',      // Started
    processing: 'blue.500',   // In Progress
    cancel: 'red.500',        // Cancelled
    expired: 'orange.400',    // Expired
    success: 'green.500',     // Completed
    reject: 'red.600',        // Rejected
};
const ClockTag = {
    'bitcoin': '/imagelogo/Btcspinning.gif',
    'ethereum': '/imagelogo/Espinning.gif',
    'binance': '/imagelogo/Bspinning.gif',
    'tether': '/imagelogo/Tspinning.gif',
}
export default TradeStart