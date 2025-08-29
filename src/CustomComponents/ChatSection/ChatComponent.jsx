import React, { useRef, useState } from 'react';
import {
    Box,
    Flex,
    Input,
    Button,
    IconButton,
    Text,
    VStack,
    HStack,
    useToast,
    Image,
    Avatar,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalFooter,
    useDisclosure,
    ModalHeader,
    ModalCloseButton,
    Link,
    Heading,
} from '@chakra-ui/react';

import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
    doc,
    updateDoc,
    setDoc

} from "firebase/firestore";
import { db } from '../Firebase';
import { useEffect } from "react";
import { AttachmentIcon } from '@chakra-ui/icons';
import { FaCamera, FaExclamationCircle } from 'react-icons/fa';
import Webcam from 'react-webcam';
import { useUser } from '../../Context/userContext';
import { AiFillExclamationCircle } from 'react-icons/ai';
import useStore from '../Store/store';
import { useTradeProvider } from '../../Context/TradeContext';
import { ActionMessageNew } from '../Buy&Sell/ActionMessageNew';
import { ActionMessageNew1 } from '../Buy&Sell/ActionMessageNew1';


const ChatComponent = ({ currentUserId, otherUserId, otherUserName, tradeDetail, advertisementDetail, tradeType }) => {
    const { user, getUserById } = useUser();
    const [messages, setMessages] = useState([]);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null); // preview image if file is image
    const [chatLog, setChatLog] = useState([]);
    const [capturedImage, setCapturedImage] = useState(null);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [seenBy, setSeenBy] = useState({});
    const scrollRef = useRef();
    const senderId = `${currentUserId || ""}${tradeDetail?.trade_id || ""}`;
    const receiverId = `${otherUserId}${tradeDetail?.trade_id || ""}`;
    const chatId = getChatId(senderId, receiverId);
    const messagesRef = collection(db, "chats", chatId, "messages");
    const webcamRef = useRef();
    const [previewImage, setPreviewImage] = useState(null);

    const systemMessages = ActionMessageNew({ tradeDetail, tradeType });
    const addMesage = ActionMessageNew1({ tradeDetail, tradeType });
    console.log(addMesage);
    // console.log(systemMessages);




    // const now = new Date();

    // useEffect(() => {
    //     const createInitialChatDoc = async () => {
    //         if (!chatId) return;

    //         const chatDocRef = doc(db, "chats", chatId);
    //         await setDoc(chatDocRef, {
    //             createdAt: serverTimestamp(),
    //             participants: [currentUserId, otherUserId],
    //         }, { merge: true });
    //     };

    //     createInitialChatDoc();
    // }, [chatId]);



    useEffect(() => {
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth',
        });
    }, [messages]);

    useEffect(() => {
        const q = query(messagesRef, orderBy("createdAt"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
        return unsubscribe;
    }, [chatId]);
    //Here is Typing.... update
    useEffect(() => {
        if (!chatId || !otherUserId) return;

        const otherTypingRef = doc(db, "chats", chatId, "typingStatus", String(otherUserId));
        const unsubscribe = onSnapshot(otherTypingRef, (docSnap) => {
            const data = docSnap.data();
            setIsTyping(data?.isTyping || false);
        });

        return unsubscribe;
    }, [chatId, otherUserId]);

    useEffect(() => {
        if (messages.length === 0) return;

        const lastMsg = messages[messages.length - 1];
        const seenRef = doc(db, "chats", chatId, "metadata", "seenStatus");

        setDoc(seenRef, {
            seenBy: {
                [currentUserId]: {
                    messageId: lastMsg.id,
                    seenAt: serverTimestamp(),
                }
            }
        }, { merge: true });
    }, [messages]);
    // console.log(messages);

    //this is for listner
    useEffect(() => {
        const seenRef = doc(db, "chats", chatId, "metadata", "seenStatus");

        const unsubscribe = onSnapshot(seenRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data().seenBy;
                setSeenBy(data || {});
            }
        });

        return unsubscribe;
    }, [chatId]);
    const handleInputChange = (e) => {
        setInput(e.target.value);

        const typingStatusRef = doc(db, "chats", chatId, "typingStatus", String(currentUserId));
        setDoc(typingStatusRef, { isTyping: true });

        clearTimeout(window.typingTimeout);
        window.typingTimeout = setTimeout(() => {
            setDoc(typingStatusRef, { isTyping: false });
        }, 1500);
    };

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            setFile(selected);
            if (selected.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => setPreview(reader.result);
                reader.readAsDataURL(selected);
            } else {
                setPreview(null);
            }
            setCapturedImage(null); // Clear camera image
        }
    };

    const handleCapture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
        setFile(null);
        setPreview(imageSrc);
        onClose();
    };



    const mergedMessages = [
        ...messages,
        ...addMesage.map((msg) => ({
            ...msg,

        })),
    ].
        sort((a, b) => {
            const dateA = new Date(a.time.replace(' at ', ', '));
            const dateB = new Date(b.time.replace(' at ', ', '));
            return dateA - dateB;
        });
    // sort((a, b) => {
    //     const parseTime = (t) => new Date(`2000/01/01 ${t || '00:00:00 AM'}`);

    //     const timeA = parseTime(a.time);
    //     const timeB = parseTime(b.time);

    //     return timeA - timeB;
    // });
    // .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    console.log(mergedMessages);


    const handleSend = async () => {
        if (!input && !file && !capturedImage) {
            toast({
                title: 'Nothing to send.',
                status: 'warning',
                duration: 2000,
                isClosable: true,
                position: 'top-right'
            });
            return;
        }

        const timestamp = new Date().toLocaleString('default', {
            day: '2-digit',
            month: 'long', // e.g., July
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false, // Optional: for AM/PM format
        });
        console.log(timestamp);


        const newMessage = {
            id: Date.now(),
            text: input,
            file: file ? { name: file.name, type: file.type } : null,
            image: capturedImage || (preview && file?.type.startsWith('image/') ? preview : null),
            sender: currentUserId,
            time: timestamp,
            createdAt: serverTimestamp(),
        };
        await addDoc(messagesRef, newMessage);

        setInput("");
        setChatLog((prev) => [...prev, newMessage]);
        setFile(null);
        setCapturedImage(null);
        setPreview(null);
    };
    const CommonTerm = [
        { id: 1, term: "Your trade partner will share their name and ID." },
        { id: 2, term: `Make your payment of ${Number(tradeDetail?.amount).toFixed(2)} INR.` },
        { id: 3, term: `Send the receipt confirmation number to your trade partner and mark the trade as "Paid".` },
        { id: 4, term: "Wait for your trade partner to confirm your payment." },
        { id: 5, term: `Your trade partner will release the "${CoinSymbolMap[(tradeDetail?.asset)]}" to you.` }
    ];

    return (
        <Box
            w="100%"
            mx="auto"
            // p={4}

            // borderRadius="lg"
            borderBottomRadius={'lg'}
            border={'1px solid #dcdcdc'}
        // borderBottom={'none'}
        >
            <VStack
                ref={scrollRef}
                spacing={3}
                h="400px"
                bg={'gray.50'}
                overflowY="auto"
                mb={1}
                p={4}
                height={{ base: '45vh', sm: '48vh', lg: '65.5vh' }}

            >
                <Flex p={4} bg={'orange.100'} direction={'column'} borderRadius={5} w={'100%'} gap={2}>
                    <Box fontWeight={500} fontSize={'16px'}  >
                        {

                            `You're buying "${Number(tradeDetail?.buy_value).toFixed(4)} ${CoinSymbolMap[(tradeDetail?.asset)]}" via "${tradeDetail?.payment.payment_method?.payment_method}". is now in escrow and it's safe to make your payment.`
                        }


                    </Box>
                    {
                        CommonTerm.map((item, index) => (
                            <Box key={index} fontFamily={'revert-layer'} fontWeight={600} fontSize={'14px'}>
                                {
                                    `${item?.id}.
                               ${item?.term}
                                `
                                }
                            </Box>
                        ))
                    }
                </Flex>
                <Flex p={4} bg={'green.100'} direction={'column'} borderRadius={5} w={'100%'} gap={2}>
                    <Flex fontWeight={500} fontSize={'16px'} gap={1} alignItems={'center'} >

                        <FaExclamationCircle /> Follow these instruction from your trade partner:


                    </Flex>
                    {
                        CommonTerm.map((item, index) => (
                            <Box key={index} fontFamily={'revert-layer'} fontWeight={600} fontSize={'14px'}>
                                {
                                    `${item?.id}.
                               ${item?.term}
                                `
                                }
                            </Box>
                        ))
                    }
                </Flex>

                {/* {addMesage[1]?.content}
                <ActionMessage tradeDetail={tradeDetail} tradeType={tradeType} /> */}


                {mergedMessages.map((item, index) => {

                    const isCurrentUser = item.sender === currentUserId;
                    // The receiver's last seen message ID
                    const receiverSeenMsgId = seenBy?.[otherUserId]?.messageId;
                    // Find index of receiver's last seen message
                    const lastSeenIndex = messages.findIndex((m) => m.id === receiverSeenMsgId);
                    // Find index of current message
                    const msgIndex = messages.findIndex((m) => m.id === item.id);
                    // Check if this message was sent by me and is seen by the other user
                    const isSeen = isCurrentUser && msgIndex <= lastSeenIndex;
                    return (
                        <>
                            {
                                item?.type === 'system' ?
                                    <>

                                        {item?.content}
                                    </>
                                    :
                                    <Flex alignSelf={isCurrentUser ? 'end' : 'start'} key={item.id}  >
                                        <Box display={'flex'} gap={1} flexDirection={'column'} alignItems={'start'} bg={isCurrentUser ? 'green.50' : 'blue.50'} py={1} px={2} borderRadius="md" boxShadow="sm" minW={'100px '} maxW={'400px'} w="100%">
                                            {item.image && (
                                                <>
                                                    <Image
                                                        src={item.image}
                                                        alt="Attachment"
                                                        boxSize="150px"
                                                        borderRadius="md"
                                                        cursor="pointer"
                                                        onClick={() => {
                                                            setPreviewImage(item.image);
                                                            onOpen1();
                                                        }}
                                                    />
                                                </>
                                            )}
                                            <Text >{item.text}</Text>
                                            {item.file && !item.image && (
                                                <Link
                                                    href={item.file.url}
                                                    download={item.file.name}
                                                    isExternal
                                                    color="blue.500"
                                                    fontSize="sm"
                                                >
                                                    📎 {item.file.name} (Download)
                                                </Link>
                                            )}

                                            <Flex alignSelf={'end'} textAlign={'end'} gap={3}>
                                                <Box textAlign={'end'} fontSize={'10px'} color="gray">{item.time}</Box>
                                                {isSeen && (
                                                    <Flex alignSelf={'end'} fontSize={'8px'} fontWeight={600} color={'blue.500'}>✓✓</Flex>
                                                )}
                                            </Flex>
                                        </Box>

                                    </Flex>
                            }
                        </>
                    )
                })}

            </VStack>
            {isTyping && <Flex px={4} fontSize={'14px'} color={'green'} alignSelf={'self-start'}><em>{otherUserName} is typing...</em></Flex>}

            {/* Show preview if file/image selected */}
            {
                (file || capturedImage) && (
                    <Box mt={3}>
                        {preview && (
                            <Image src={preview} alt="Preview" boxSize="120px" borderRadius="md" />
                        )}
                        {file && (
                            <Text fontSize="sm" mt={1} maxW={'400px'} bg={'gray.100'} p={4} borderRadius={5} mb={1}>
                                📎 {file.name}
                            </Text>
                        )}
                    </Box>
                )
            }

            <Flex gap={2} align="center" direction={{ base: 'column', sm: 'row' }} flexWrap="wrap" mb={2} p={4}>
                <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={handleInputChange}
                    flex={{ base: 'none', sm: 1 }}
                    pr={2}

                />

                <Flex gap={2} align="center">
                    <Input
                        type="file"
                        display="none"
                        id="chat-file"
                        onChange={handleFileChange}

                    />

                    <label htmlFor="chat-file">
                        <IconButton as="span" icon={<AttachmentIcon />} aria-label="Attach file" />
                    </label>

                    <IconButton icon={<FaCamera />} aria-label="Open camera" onClick={onOpen} />

                    <Button colorScheme="blue" onClick={handleSend}>
                        Send
                    </Button>
                </Flex>
            </Flex>



            {/* Camera Modal */}
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            style={{ width: '100%' }}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green" mr={3} onClick={handleCapture}>
                            Capture
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {/* preview of Image */}
            <Modal isOpen={isOpen1} onClose={onClose1} isCentered size="xl" >
                <ModalOverlay />
                <ModalContent bg={'transparent'}>
                    <ModalHeader borderTopRadius={5} bg={'gray.50'} >Image Preview</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody m={0} p={0} >
                        <Image src={previewImage} alt="Preview" width="100%" borderRadius="md" />
                    </ModalBody>
                </ModalContent>
            </Modal>
            {/* preview of Image */}
        </Box>
    );
};
// 🔁 Helper to generate consistent chatId
function getChatId(userA, userB) {
    return [userA, userB].sort().join("_");
}

export const CoinSymbolMap = {
    bitcoin: 'BTC',
    ethereum: 'ETH',
    binance: 'BNB',
    tether: 'USDT'
}


const ActionMessage = ({ tradeDetail, tradeType }) => {


    const { user, getUserById } = useUser();
    const { handleGetSupportTicketById, supportticketDetail } = useTradeProvider();

    const [showMessage, setShowMessage] = useState(false);
    const parsedDate = new Date(tradeDetail?.status_changed_at?.replace(' ', 'T'));
    // Format parts
    const day = parsedDate.getDate().toString().padStart(2, '0');
    const month = parsedDate.toLocaleString('default', { month: 'long' });
    const year = parsedDate.getFullYear();
    const hours = parsedDate.getHours().toString().padStart(2, '0');
    const minutes = parsedDate.getMinutes().toString().padStart(2, '0');
    const seconds = parsedDate.getSeconds().toString().padStart(2, '0');
    // Final formatted string
    const formattedDate = `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
    const paid = useStore(state => state.paid);
    const cancel = useStore(state => state.cancel);
    const expire = useStore(state => state.expire);
    const dispute = useStore(state => state.dispute);
    const buyer = useStore(state => state.buyer);
    const seller = useStore(state => state.seller);
    const setBuyer = useStore((state) => state.setBuyer);
    const setSeller = useStore((state) => state.setSeller);
    const disputeMessage = useStore(state => state.disputeMessage);
    const setDisputeMessage = useStore((state) => state.setDisputeMessage);


    useEffect(() => {
        getTicketDetail();

    }, [buyer, seller, tradeDetail?.is_disputed])
    const getTicketDetail = async () => {
        const res = await handleGetSupportTicketById(tradeDetail?.support_ticket_number);
        if (res.status) {
            setTimeout(() => {
                setDisputeMessage(true);
            }, 1000);
        }
    }
    useEffect(() => {
        if (!supportticketDetail) {
            return;
        }
        if (tradeDetail?.buyer_id == supportticketDetail?.user_id) {
            setBuyer(true);
        } else {
            setSeller(true);
        }
    }, [supportticketDetail]);


    useEffect(() => {
        let timer;

        if (tradeDetail?.is_disputed) {
            // Start 30 second timer only when dispute is true
            timer = setTimeout(() => {
                setShowMessage(true);
            }, 5000);
        }
        return () => clearTimeout(timer); // Clean up on unmount or dispute change
    }, [disputeMessage, seller, buyer]);
    return (
        <>
            {
                ((tradeDetail?.trade_status === 'processing' && tradeType == 'buy_trade') || (tradeType == 'buy_trade' && paid)) &&
                <>

                    <Box p={4} borderRadius={5} bg={'green.300'} color={'gray.700'} alignSelf={'start'} fontSize={'14px'}> The Vendor is now verifying your payment once the vendor confirms payment tether will be send to you Onnbit wallet</Box>
                    <Text fontSize={'10px'} alignSelf={'start'}>{tradeDetail?.status_changed_at}</Text>
                </>
            }
            {
                ((tradeDetail?.trade_status === 'processing' && tradeType == 'sell_trade') || (tradeType == 'sell_trade' && paid)) &&
                <>
                    <Box p={4} borderRadius={5} bg={'green.300'} color={'gray.700'} alignSelf={'start'} fontSize={'14px'}><b>{getUserById?.username}</b> {`has marked this trade paid.Check if you're received the payment and send the Tether.`}</Box>
                    <Text fontSize={'10px'} alignSelf={'start'}>{tradeDetail?.status_changed_at}</Text>

                </>
            }

            {
                ((tradeDetail?.trade_status === 'expired' && tradeType == 'buy_trade') || (tradeType == 'buy_trade' && expire)) &&
                <Flex direction={'column'} gap={3}>
                    <Box borderRadius={5} p={4} bg={'teal.100'} fontSize={'14px'} color={'gray.700'} alignSelf={'start'}>{`The trade is about to expire, Please do not make any further payments related to this trade.`}</Box>
                    <Text fontSize={'10px'} alignSelf={'start'}>{tradeDetail?.status_changed_at}</Text>

                    <Box borderRadius={5} p={4} bg={'teal.100'} fontSize={'14px'} color={'gray.700'} alignSelf={'start'}>{`The trade has expired and the ${tradeDetail?.asset} is no longer reserved,To Continue,ask your trde partner to reopen this trade , so the ${tradeDetail?.asset} is reserved , before you make the payment `}</Box>
                    <Text fontSize={'10px'} alignSelf={'start'}>{tradeDetail?.status_changed_at}</Text>

                </Flex>
            }
            {
                ((tradeDetail?.trade_status === 'expired' && tradeType == 'sell_trade') || (tradeType == 'sell_trade' && expire)) &&
                <Flex direction={'column'} gap={3}>

                    <Box borderRadius={5} p={4} bg={'teal.100'} fontSize={'14px'} color={'gray.700'} alignSelf={'start'}>{`The trade is about to expire, Please do not make any further payments related to this trade.`}</Box>
                    <Text fontSize={'10px'} alignSelf={'start'}>{tradeDetail?.status_changed_at}</Text>

                    <Box borderRadius={5} p={4} bg={'teal.100'} fontSize={'14px'} color={'gray.700'} alignSelf={'start'}>{`The trade has expired and the ${tradeDetail?.asset} is no longer reserved,To Continue,reopen this trade , so the ${tradeDetail?.asset} is reserved for it, before you ask your trade partner to make the payment `}</Box>
                    <Text fontSize={'10px'} alignSelf={'start'}>{tradeDetail?.status_changed_at}</Text>

                </Flex>
            }
            {
                (tradeDetail?.is_disputed && tradeType == 'buy_trade' || (tradeType == 'buy_trade' && dispute)) &&

                <>
                    {
                        buyer ?
                            <Flex direction={'column'} gap={2}>

                                <Box borderRadius={5} p={4} bg={'teal.200'} color={'gray.700'} alignSelf={'start'} fontSize={'14px'}>{`A dispute has been started by `}<b>{user?.username}.</b><br />
                                    {` The reason is: Trade partner is not responding; trade partner after receive the payment, asking document. before payment do not ask document... trade partner trying to scamming me..`}<br />

                                    {`Disputes are processed in live queue and a moderator will join the trade chat when available.`}<br />
                                    {` Decision for the award of escrowed cryptocurrency is based on following of offer terms, trading activity, provided proof of payment and the information request by a moderator during the trade.

                        While waiting for a moderator to join you can summarize what happened and present all possible proof to support your claim. `}</Box>
                                <Text fontSize={'10px'} alignSelf={'start'}>{tradeDetail?.status_changed_at}</Text>

                            </Flex>
                            :
                            <Flex direction={'column'}>

                                <Box borderRadius={5} p={4} bg={'teal.200'} color={'gray.700'} alignSelf={'start'} fontSize={'14px'}>{`A dispute has been started by `}<b>{getUserById?.username}.</b><br />
                                    {` The reason is: Trade partner is not responding; trade partner after receive the payment, asking document. before payment do not ask document... trade partner trying to scamming me..`}<br />

                                    {`Disputes are processed in live queue and a moderator will join the trade chat when available.`}<br />
                                    {` Decision for the award of escrowed cryptocurrency is based on following of offer terms, trading activity, provided proof of payment and the information request by a moderator during the trade.

                        While waiting for a moderator to join you can summarize what happened and present all possible proof to support your claim. `}</Box>
                                <Text fontSize={'10px'} alignSelf={'start'}>{tradeDetail?.status_changed_at}</Text>

                            </Flex>

                    }

                    {
                        disputeMessage ?
                            <Flex direction={'column'} gap={2}>

                                <Box borderRadius={5} p={4} bg={'teal.200'} color={'gray.700'} alignSelf={'start'} fontSize={'14px'}>
                                    <b>
                                        {`@Seller and @Buyer`}</b>


                                    <br />




                                    Hello, I am a moderator dealing with disputes on the platform. I have started to review your dispute and will try to resolve it quickly. At this point I need the evidence that you have, for example, such as:<br />

                                    - Upload a video recording of your online payment account where you navigate to your profile page and then show the transaction history or upload a PDF copy of your online account statement for the last 10 days including the trade date.<br />

                                    - Upload an audio recording of the conversation between you and your online payment provider's support or a video recording of your chat with live support confirming the status of the payment.<br />

                                    If you encounter any difficulties uploading the requested proof here in the trade chat, kindly upload it to a file-sharing platform such as Google Drive or Dropbox. Please ensure that the file can be publicly accessed and then share the link here. Thank you both for your cooperation and patience.<br />

                                    Please note: we must hear/see details such as account name, account no., date of transfer, amount, and status of transaction in the recording.<br />

                                    Once I have received the evidence you have available to me, I will try to resolve the dispute and issue a verdict. Thank you for your time and effort. Please note that due to the high volume of transactions, there may be a waiting period of up to 48 hours for the resolution of a dispute.<br />
                                </Box>
                                <Text fontSize={'10px'} alignSelf={'start'}>{tradeDetail?.status_changed_at}</Text>

                            </Flex>
                            :
                            null
                    }



                </>
            }

            {
                (tradeDetail?.is_disputed && tradeType == 'sell_trade' || (tradeType == 'sell_trade' && dispute)) &&
                <>

                    {
                        seller ?
                            <Flex direction={'column'} gap={2}>

                                <Box borderRadius={5} p={4} bg={'teal.200'} color={'gray.700'} alignSelf={'start'} fontSize={'14px'}>{`A dispute has been started by `}<b>{user?.username}.</b><br />
                                    {` The reason is: Trade partner is not responding; trade partner after receive the payment, asking document. before payment do not ask document... trade partner trying to scamming me..`}<br />

                                    {`Disputes are processed in live queue and a moderator will join the trade chat when available.`}<br />
                                    {` Decision for the award of escrowed cryptocurrency is based on following of offer terms, trading activity, provided proof of payment and the information request by a moderator during the trade.

                                     While waiting for a moderator to join you can summarize what happened and present all possible proof to support your claim. `}</Box>
                                <Text fontSize={'10px'} alignSelf={'start'}>{tradeDetail?.status_changed_at}</Text>

                            </Flex>
                            :
                            <Flex direction={'column'} gap={2}>

                                <Box borderRadius={5} p={4} bg={'teal.200'} color={'gray.700'} alignSelf={'start'} fontSize={'14px'}>{`A dispute has been started by `}<b>{getUserById?.username}.</b><br />
                                    {` The reason is: Trade partner is not responding; trade partner after receive the payment, asking document. before payment do not ask document... trade partner trying to scamming me..`}<br />

                                    {`Disputes are processed in live queue and a moderator will join the trade chat when available.`}<br />
                                    {` Decision for the award of escrowed cryptocurrency is based on following of offer terms, trading activity, provided proof of payment and the information request by a moderator during the trade.

                        While waiting for a moderator to join you can summarize what happened and present all possible proof to support your claim. `}</Box>
                                <Text fontSize={'10px'} alignSelf={'start'}>{tradeDetail?.status_changed_at}</Text>

                            </Flex>

                    }

                    {
                        disputeMessage &&
                        <Flex direction={'column'} gap={2}>

                            <Box borderRadius={5} p={4} bg={'teal.200'} color={'gray.700'} alignSelf={'start'} fontSize={'14px'}>
                                <b>
                                    {`@Seller and @Buyer`}</b>


                                <br />




                                Hello, I am a moderator dealing with disputes on the platform. I have started to review your dispute and will try to resolve it quickly. At this point I need the evidence that you have, for example, such as:<br />

                                - Upload a video recording of your online payment account where you navigate to your profile page and then show the transaction history or upload a PDF copy of your online account statement for the last 10 days including the trade date.<br />

                                - Upload an audio recording of the conversation between you and your online payment provider's support or a video recording of your chat with live support confirming the status of the payment.<br />

                                If you encounter any difficulties uploading the requested proof here in the trade chat, kindly upload it to a file-sharing platform such as Google Drive or Dropbox. Please ensure that the file can be publicly accessed and then share the link here. Thank you both for your cooperation and patience.<br />

                                Please note: we must hear/see details such as account name, account no., date of transfer, amount, and status of transaction in the recording.<br />

                                Once I have received the evidence you have available to me, I will try to resolve the dispute and issue a verdict. Thank you for your time and effort. Please note that due to the high volume of transactions, there may be a waiting period of up to 48 hours for the resolution of a dispute.<br />
                            </Box>
                            <Text fontSize={'10px'} alignSelf={'start'}>{tradeDetail?.status_changed_at}</Text>

                        </Flex>
                    }



                </>
            }
            {
                (tradeDetail?.trade_status === 'cancel' && tradeType == 'buy_trade' || (tradeType == 'buy_trade' && cancel)) &&
                <>

                    <Box borderRadius={5} p={4} bg={'red.100'} color={'gray.700'} alignSelf={'start'} fontSize={'14px'}>{`The trade was cancelled and the ${tradeDetail?.asset} is no longer reserved,To Continue,ask your trade partner to report this trade , and make sure ${tradeDetail?.asset} is reserved before you make the payment `}</Box>
                    <Text fontSize={'10px'} alignSelf={'start'}>{tradeDetail?.status_changed_at}</Text>

                </>
            }
            {
                ((tradeDetail?.trade_status === 'cancel' && tradeType == 'sell_trade') || (tradeType == 'sell_trade' && cancel)) &&
                <>

                    <Box borderRadius={5} p={4} bg={'red.100'} color={'gray.700'} alignSelf={'start'} fontSize={'14px'}>{`The trade was cancelled and the ${tradeDetail?.asset} is back in your wallet,To Continue,reopen this trade , so the ${tradeDetail?.asset} is reserved for it, before you ask your trade partner to make the payment `}</Box>
                    <Text fontSize={'10px'} alignSelf={'start'}>{tradeDetail?.status_changed_at}</Text>

                </>
            }
        </>

    )

}

export default ChatComponent;
