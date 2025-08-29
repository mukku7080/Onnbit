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



const SellTradeStart = () => {
    const navigate = useNavigate();
    const { handleTradeHistory, getTradeDto } = useTradeProvider();
    const [ispaid, setIsPaid] = useState(false);
    const [isReceived, setIsReceived] = useState(false);
    const { tradeId, tradeType } = useParams();
    const [cryptoAdId, setCryptoAdId] = useState();
    const { queryParams, handleGetOffer } = useOffer()
    const [tradeDetail, setTradeDetail] = useState(null);
    const [advertisementDetail, setAdevertisementDetail] = useState(null);
    const { priceRef } = useOtherDetail();
    const [assetValue, setAssetValue] = useState();
    const [remainingTime, setRemainingTime] = useState("");
    useEffect(() => {
        getTradeDto.trade_id = tradeId;
        getTradeDetail();
    }, [])
    const getTradeDetail = async () => {
        const response = await handleTradeHistory(getTradeDto);
        if (response?.status === true) {
            setCryptoAdId(response?.datas?.[0].crypto_ad_id);
            setTradeDetail(response?.datas?.[0]);
        }
    }
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
            const endTime = new Date(tradeDetail?.time_limit);
            const diff = endTime - now;

            if (diff <= 0) {
                setRemainingTime("Expired");
                clearInterval(interval);
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
    return (
        <>
            {(advertisementDetail && tradeDetail) &&
                <Flex maxW={'container.xxl'} justifyContent={'start'} alignItems={'center'} paddingTop={{ base: 0, lg: 20 }} minH={'90vh'} direction={'column'} >
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
                            <Card borderRadius={5} gap={5} p={2} >
                                <Flex direction={'column'} py={5} px={2} gap={5}>
                                    <Heading size={'lg'}> Sell Trade Started</Heading>
                                    <Flex gap={3}>
                                        <ImStopwatch size={40} />
                                        {
                                            tradeType === 'sell_trade' ?

                                                <Flex direction={'column'}>
                                                    <Box as='p' fontWeight={500} color={'gray'} fontSize={'18px'}>You will receive a paymennt of {Number(tradeDetail?.amount).toFixed(2)} INR through PhonePe</Box>
                                                    <Box>
                                                        <b>

                                                            {Number(assetValue).toFixed(4)}&nbsp;
                                                        </b>
                                                        will be Debited from your {tradeDetail?.asset} wallet</Box>
                                                </Flex>
                                                :
                                                <Flex direction={'column'}>
                                                    <Box as='p' fontWeight={500} color={'gray'} fontSize={'18px'}>Please make a paymennt of {Number(tradeDetail?.amount).toFixed(2)} INR using PhonePe</Box>
                                                    <Box>
                                                        <b>

                                                            {Number(assetValue).toFixed(4)}&nbsp;
                                                        </b>
                                                        will be added to you {tradeDetail?.asset} wallet</Box>

                                                </Flex>
                                        }

                                    </Flex>
                                    <Divider />

                                    {
                                        !ispaid ?
                                            <>
                                                <Flex>
                                                    {
                                                        tradeType === 'sell_trade' ?
                                                            <Flex direction={'column'} borderBottomRadius={5} fontWeight={500} gap={5} >

                                                                <Box>
                                                                    <b>

                                                                        "Once the buyer marks the payment as completed,&nbsp;
                                                                    </b>
                                                                    please verify the payment promptly. If you do not confirm within the given time limit, the trade may be completed automatically and the Bitcoin released to the buyer."
                                                                </Box>
                                                                <ReceivedModalSell setIsReceived={setIsReceived} remainingTime={remainingTime} tradeDetail={tradeDetail} />

                                                            </Flex>
                                                            :

                                                            <Flex direction={'column'} borderBottomRadius={5} fontWeight={500} gap={5} >

                                                                <Box>
                                                                    <b>

                                                                        Once you've made the payemnet,&nbsp;
                                                                    </b>
                                                                    be sure to click paid within the given time limit. Otherwise the trade will be automatically canceled and the Bitcoin will be returned to the seller'se wallet.
                                                                </Box>
                                                                <PaidModalSell setIsPaid={setIsPaid} remainingTime={remainingTime} />

                                                            </Flex>


                                                    }
                                                </Flex>
                                            </>
                                            :
                                            <Flex gap={5}>
                                                <Image boxSize={50} src='/imagelogo/argue.png'></Image>
                                                <Flex direction={'column'} gap={4}>
                                                    <Box>
                                                        Click <b>Dispute</b> to report an unresponseive trade partener or any other issue you may have.
                                                    </Box>
                                                    <Button disabled>Start a Dispute</Button>
                                                </Flex>

                                            </Flex>
                                    }
                                    <Divider />

                                    {
                                        ispaid &&
                                        <>
                                            <ReportBehaviour />
                                            <Divider />
                                        </>
                                    }


                                    <CompExampleSell />
                                    <Divider />
                                    <Flex justifyContent={'space-between'} gap={{ base: 4, sm: 0 }} direction={{ base: 'column-reverse', sm: 'row' }} color={'gray.300'}>

                                        <Button boxShadow={'md'} variant={'outline'}>Cancel Trade</Button>
                                        <Flex gap={2}>
                                            <Box mt={1}>

                                                <BsExclamationCircle />
                                            </Box>
                                            <Box fontWeight={500}>  {ispaid ? 'You have paid already' : `You have't paid yet!`}</Box>
                                        </Flex>
                                    </Flex>
                                </Flex>

                            </Card>
                            <OfferTerms />

                            <Heading size={'md'}>Trade Information</Heading>
                            <Flex gap={10} mb={5} direction={{ base: 'column', sm: 'row' }} borderTop={'1px solid #dcdcdc'} justifyContent={'space-between'} p={4}>
                                <Flex className='flex1' direction={{ base: 'row', sm: 'column' }} justifyContent={'space-between'}>
                                    <Heading size={'sm'} color={'#fe532e'}>Rate</Heading>
                                    <Box>455888 inr</Box>

                                </Flex>
                                <Flex className='flex2' justifyContent={'space-between'} direction={{ base: 'row', sm: 'column' }}>
                                    <Heading size={'sm'} color={'#fe532e'}>TRADE ID</Heading>
                                    <Box>455888 inr</Box>



                                </Flex>
                                <Flex className='flex3' justifyContent={'space-between'} direction={{ base: 'row', sm: 'column' }}>
                                    <Heading size={'sm'} color={'#fe532e'}>STARTED</Heading>
                                    <Box>455888 inr</Box>



                                </Flex>
                            </Flex>
                            <Flex justifyContent={'space-between'} >
                                <Button variant={'outline'} onClick={() => navigate('/chat')}>View Offer</Button>
                                <Button variant={'outline'}>Take a Tour</Button>
                            </Flex>

                        </Flex>


                        {/* Left Side end */}
                        {/* Right Side nav column */}
                        <RightSideContentSell advertisementDetail={advertisementDetail} tradeDetail={tradeDetail} tradeType={tradeType} />
                        {/* Right Side nav column end */}


                    </Flex>
                </Flex>
            }
        </>

    )
}


export const RightSideContentSell = ({ advertisementDetail, tradeDetail, tradeType }) => {
    const [index, setIndex] = useState(0);
    const location = useLocation();
    const { user } = useUser();
    const [isOnline, setIsOnline] = useState(false);
    const db = getDatabase();
    const firestore = getFirestore();
    const userStatusDatabaseRef = ref(db, `/status/${user?.user_id}`);
    const userStatusFirestoreRef = doc(firestore, `users/${user?.user_id}`);
    useEffect(() => {
        const userRef = doc(firestore, 'users', String(tradeType === 'sell_trade' ? advertisementDetail?.user?.user_id : tradeDetail?.user_id));
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

                                    {tradeType === 'sell_trade' ?
                                        advertisementDetail?.user ?
                                            <Avatar border={'1px solid #dcdcdc'} name={advertisementDetail?.user?.name ? advertisementDetail?.user?.name : advertisementDetail?.user?.email} src={advertisementDetail?.user.profile_image} size={'md'}>
                                                <AvatarBadge boxSize='1em' bg={isOnline ? 'green.200' : 'orange.200'} ></AvatarBadge>
                                            </Avatar>
                                            :
                                            <Spinner size={'xl'} />
                                        :
                                        tradeDetail?.user_details ?
                                            <Avatar border={'1px solid #dcdcdc'} name={tradeDetail?.user_details?.name ? tradeDetail?.user_details?.name : tradeDetail?.user_details?.email} src={tradeDetail?.user_details?.profile_image_url} size={'md'}>
                                                <AvatarBadge boxSize='1em' bg={isOnline ? 'green.200' : 'orange.200'} ></AvatarBadge>
                                            </Avatar>
                                            :
                                            <Spinner size={'xl'} />
                                    }
                                </Flex>
                                <Flex direction={'column'}>

                                    <Flex as={Link} href='/profile' alignItems={'center'} gap={2}>{tradeType === 'sell_trade' ? advertisementDetail?.user?.name : tradeDetail?.user_details?.name} <LuSquareArrowOutUpRight /></Flex>
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
                        <ChatComponent currentUserId={user?.user_id} otherUserId={advertisementDetail?.user.user_id} otherUserName={advertisementDetail?.user?.username} />
                    {/* {tradeType === 'sell_trade' ?

                        :
                        <ChatComponent currentUserId={user?.user_id} otherUserId={tradeDetail?.seller_id} otherUserName={advertisementDetail?.user?.username} />
                    } */}
                </Card>
            </Flex>
        </Flex>
    )
}

function CompExampleSell() {
    const {
        isOpen: isVisible,
        onClose,
        onOpen,
    } = useDisclosure({ defaultIsOpen: true })

    return isVisible ? (
        <Alert status='warning'>
            <Flex >
                <AlertIcon />
                <Flex direction={'column'}>

                    <AlertTitle>Please Read it !</AlertTitle>
                    <AlertDescription>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Iure beatae aliquid sequi fugiat quis modi mollitia non illum eos earum! Obcaecati quia porro earum nulla deleniti,
                        necessitatibus aliquam ut consequuntur!
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

const PaidModalSell = ({ setIsPaid, remainingTime }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
    const inputFileRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const { handleBuyerUpdate } = useTradeProvider();
    const [id, setId] = useState();


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file || null);
    };

    const handleAttachmentClick = () => {
        inputFileRef.current?.click();
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer); // Cleanup on unmount
    }, []);


    // const formatTime = (seconds) => {
    //     const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    //     const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    //     const secs = String(seconds % 60).padStart(2, '0');
    //     return `${hrs}:${mins}:${secs}`;
    // };

    const handlePaid = () => {
        setIsPaid(true);
        handleBuyerUpdate(selectedFile);
        onClose();
    };
    return (
        <>
            <Button textAlign={'start'} color={'white'} w={'150px'} bg={'green.400'} p={8} onClick={onOpen}>
                <Flex direction={'column'} alignItems={'center'}>
                    <Box>Paid</Box>
                    <Box>{remainingTime}</Box>
                </Flex>

            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader borderTopRadius={5} bg={'gray.100'}>Self Confirmation
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <Box mb={5} fontWeight={500}>
                            Please read the seller's instructions below,
                            if you have followed them all and paid, click "Paid".
                            If you have missed a step or haven't paid click Back to Chat to the seller.
                        </Box>
                        <Flex p={4} bg={'red.50'} gap={3} mb={5}>
                            <Box color={'red.500'} mt={1}><BsExclamationCircle /></Box>
                            <Box fontWeight={500} color={'red.500'}>
                                Clicking Paid without paying the vendor will damage your reputation on the plateform and get you blocked.
                            </Box>
                        </Flex>
                        <Box mb={2} fontWeight={500} color={'red.500'}>**Before procced Attach your Payment Screenshot**</Box>


                        <Flex align="center" gap={2}>
                            <Input
                                placeholder="No file chosen"
                                value={selectedFile ? selectedFile.name : ""}
                                isReadOnly
                                cursor="pointer"
                                onClick={handleAttachmentClick}
                            />
                            <IconButton
                                icon={<AttachmentIcon />}
                                bg={'gray.100'}
                                aria-label="Attach file"
                                onClick={handleAttachmentClick}
                                variant="outline"
                            />
                        </Flex>

                        <Input
                            type="file"
                            display="none"
                            ref={inputFileRef}
                            onChange={handleFileChange}
                        />
                    </ModalBody>
                    <ModalFooter justifyContent={'space-between'}>
                        <Button variant={'outline'} onClick={onClose}>Close</Button>
                        <Button isDisabled={!selectedFile} variant={'outline'} color={'white'} bg={'green.400'} onClick={handlePaid}>Paid</Button>

                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    )
}
const ReceivedModalSell = ({ setIsReceived, remainingTime, tradeDetail }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
    const inputFileRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const { handleSellerUpdate } = useTradeProvider();
    const [id, setId] = useState();


    const handleReceived = () => {
        const sellerUpdateDto = {
            trade_id: tradeDetail?.trade_id,
            response: "success",
        }
        setIsReceived(true);
        handleSellerUpdate(sellerUpdateDto);
        onClose();
    };
    return (
        <>
            <Button textAlign={'start'} color={'white'} w={'150px'} bg={'green.400'} p={8} onClick={onOpen}>
                <Flex direction={'column'} >
                    <Box>Received</Box>
                    <Box>{remainingTime}</Box>
                </Flex>

            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader borderTopRadius={5} bg={'gray.100'}>Deep Confirmation
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <Box mb={5} fontWeight={500} p={4} color={'blue.400'} textDecoration={'uppercase'} fontSize={'16px'}>
                            PLEASE VERIFY PAYMENT DETAIL CAREFULLY, TO PROTECT YOURSELF FROM FRAUD. IF YOU HAVE RECEIVED THE PAYMENT, CLICK "RECEIVED".

                        </Box>
                        <Flex p={4} bg={'red.50'} gap={1} mb={5} borderRadius={5}>
                            <Box color={'red.500'} fontWeight={500}>*</Box>
                            <Box fontWeight={500} color={'red.500'} >
                                Clicking received without verifying the payment properly can make in irreversible loss of your funds.
                            </Box>
                        </Flex>
                    </ModalBody>
                    <ModalFooter justifyContent={'space-between'}>
                        <Button variant={'outline'} onClick={onClose}>Close</Button>
                        <Button variant={'outline'} color={'white'} bg={'green.400'} onClick={handleReceived}>received</Button>

                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    )
}

const cryptoOption = [
    { name: 'Bitcoin', logo: 'https://cryptologos.cc/logos/thumbs/bitcoin.png?v=040' },
    { name: 'Ethereum', logo: 'https://cryptologos.cc/logos/thumbs/ethereum.png?v=040' },
    { name: 'USDC', logo: 'https://cryptologos.cc/logos/thumbs/usd-coin.png?v=040' },
    { name: 'Tether', logo: 'https://cryptologos.cc/logos/thumbs/tether.png?v=040' },
]



export default SellTradeStart