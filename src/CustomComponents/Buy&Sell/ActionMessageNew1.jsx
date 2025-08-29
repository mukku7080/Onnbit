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

import { useEffect, useState } from "react";
import { useUser } from '../../Context/userContext';
import useStore from '../Store/store';
import { useTradeProvider } from '../../Context/TradeContext';


export const ActionMessageNew1 = ({ tradeDetail, tradeType }) => {
    const { user, getUserById } = useUser();
    const { handleGetSupportTicketById, supportticketDetail } = useTradeProvider();

    const [showMessage, setShowMessage] = useState(false);
    const paid = useStore(state => state.paid);
    const cancel = useStore(state => state.cancel);
    const expire = useStore(state => state.expire);
    const dispute = useStore(state => state.dispute);
    const buyer = useStore(state => state.buyer);
    const seller = useStore(state => state.seller);
    const disputeMessage = useStore(state => state.disputeMessage);
    const setBuyer = useStore((state) => state.setBuyer);
    const setSeller = useStore((state) => state.setSeller);
    const setDisputeMessage = useStore((state) => state.setDisputeMessage);

    const parsedDate = new Date(tradeDetail?.status_changed_at?.replace(' ', 'T'));
    const paidDate = new Date(tradeDetail?.paid_at?.replace(' ', 'T'));
    const formattedDate = parsedDate?.toLocaleString('default', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const formattedDate1 = parsedDate?.toLocaleString('default', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',

        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const paidtimeString = new Date(tradeDetail?.paid_at?.replace(' ', 'T')).toLocaleString('default', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    useEffect(() => {
        if (!supportticketDetail) return;
        if (tradeDetail?.buyer_id === supportticketDetail?.user_id) {
            setBuyer(true);
        } else {
            setSeller(true);
        }
    }, [supportticketDetail]);

    useEffect(() => {
        const getTicketDetail = async () => {
            const res = await handleGetSupportTicketById(tradeDetail?.support_ticket_number);
            if (res.status) {
                setTimeout(() => {
                    setDisputeMessage(true);
                }, 1000);
            }
        };
        getTicketDetail();
    }, [buyer, seller, tradeDetail?.is_disputed]);

    useEffect(() => {
        let timer;
        if (tradeDetail?.is_disputed) {
            timer = setTimeout(() => {
                setShowMessage(true);
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [disputeMessage, seller, buyer]);

    const systemMessages = [];

    const addMessage = (id, time, content) => {
        systemMessages.push({ id, time, type: 'system', content });
    };

    const userName = user?.username || 'User';
    const partnerName = getUserById?.username || 'Trade partner';

    // Paid (Processing)
    if ((tradeDetail?.trade_status === 'processing' && tradeType === 'buy_trade') || (tradeType === 'buy_trade' && paid)) {
        addMessage('processing-buy', paidtimeString, (

            <>

                <Box p={4} borderRadius={5} bg={'green.300'} color={'gray.700'} alignSelf={'start'} fontSize={'14px'}> The Vendor is now verifying your payment once the vendor confirms payment tether will be send to you Onnbit wallet</Box>
                <Text fontSize={'10px'} alignSelf={'start'}>{tradeDetail?.status_changed_at}</Text>
            </>
        ));
    }

    if ((tradeDetail?.trade_status === 'processing' && tradeType === 'sell_trade') || (tradeType === 'sell_trade' && paid)) {
        addMessage('processing-sell', paidtimeString,
            (
                <>
                    <Box p={4} borderRadius={5} bg={'green.300'} color={'gray.700'} alignSelf={'start'} fontSize={'14px'}><b>{getUserById?.username}</b> {`has marked this trade paid.Check if you're received the payment and send the Tether.`}</Box>
                    <Text fontSize={'10px'} alignSelf={'start'}>{tradeDetail?.status_changed_at}</Text>

                </>
            ));
    }

    // Expired
    if ((tradeDetail?.trade_status === 'expired' && tradeType === 'buy_trade') || (tradeType === 'buy_trade' && expire)) {
        addMessage('expired-buy-1', formattedDate1, (
            <Flex direction={'column'} gap={3}>
                <Box borderRadius={5} p={4} bg={'teal.100'} fontSize={'14px'} color={'gray.700'} alignSelf={'start'}>{`The trade is about to expire, Please do not make any further payments related to this trade.`}</Box>
                <Text fontSize={'10px'} alignSelf={'start'}>{tradeDetail?.status_changed_at}</Text>

                <Box borderRadius={5} p={4} bg={'teal.100'} fontSize={'14px'} color={'gray.700'} alignSelf={'start'}>{`The trade has expired and the ${tradeDetail?.asset} is no longer reserved,To Continue,ask your trde partner to reopen this trade , so the ${tradeDetail?.asset} is reserved , before you make the payment `}</Box>
                <Text fontSize={'10px'} alignSelf={'start'}>{tradeDetail?.status_changed_at}</Text>

            </Flex>
        ));
        // addMessage('expired-buy-2', formattedDate1, (
        //     <Flex direction={'column'}>
        //         <Box p={4} borderRadius={5} bg={'teal.100'} color={'gray.700'} fontSize={'14px'}>
        //             The trade has expired and the {tradeDetail?.asset} is no longer reserved. Ask your trade partner to reopen the trade before making a payment.
        //         </Box>
        //         <Text fontSize={'10px'} alignSelf={'start'}>{tradeDetail?.status_changed_at}</Text>

        //     </Flex>
        // ));
    }

    if ((tradeDetail?.trade_status === 'expired' && tradeType === 'sell_trade') || (tradeType === 'sell_trade' && expire)) {
        addMessage('expired-sell-1', formattedDate1, (
            <Flex direction={'column'} gap={3}>

                <Box borderRadius={5} p={4} bg={'teal.100'} fontSize={'14px'} color={'gray.700'} alignSelf={'start'}>{`The trade is about to expire, Please do not make any further payments related to this trade.`}</Box>
                <Text fontSize={'10px'} alignSelf={'start'}>{tradeDetail?.status_changed_at}</Text>

                <Box borderRadius={5} p={4} bg={'teal.100'} fontSize={'14px'} color={'gray.700'} alignSelf={'start'}>{`The trade has expired and the ${tradeDetail?.asset} is no longer reserved,To Continue,reopen this trade , so the ${tradeDetail?.asset} is reserved for it, before you ask your trade partner to make the payment `}</Box>
                <Text fontSize={'10px'} alignSelf={'start'}>{tradeDetail?.status_changed_at}</Text>

            </Flex>
        ));
        // addMessage('expired-sell-2', formattedDate1, (
        //     <Flex direction={'column'}>
        //         <Box p={4} borderRadius={5} bg={'teal.100'} color={'gray.700'} fontSize={'14px'}>
        //             The trade has expired and the {tradeDetail?.asset} is no longer reserved. Reopen the trade before asking your trade partner to make the payment.
        //         </Box>
        //         <Text fontSize={'10px'} alignSelf={'start'}>{tradeDetail?.status_changed_at}</Text>

        //     </Flex>
        // ));
    }

    // Cancelled
    if ((tradeDetail?.trade_status === 'cancel' && tradeType === 'buy_trade') || (tradeType === 'buy_trade' && cancel)) {
        addMessage('cancel-buy', formattedDate1, (
            <>

                <Box borderRadius={5} p={4} bg={'red.100'} color={'gray.700'} alignSelf={'start'} fontSize={'14px'}>{`The trade was cancelled and the ${tradeDetail?.asset} is no longer reserved,To Continue,ask your trade partner to report this trade , and make sure ${tradeDetail?.asset} is reserved before you make the payment `}</Box>
                <Text fontSize={'10px'} alignSelf={'start'}>{tradeDetail?.status_changed_at}</Text>

            </>
        ));
    }

    if ((tradeDetail?.trade_status === 'cancel' && tradeType === 'sell_trade') || (tradeType === 'sell_trade' && cancel)) {
        addMessage('cancel-sell', formattedDate1, (
            <>

                <Box borderRadius={5} p={4} bg={'red.100'} color={'gray.700'} alignSelf={'start'} fontSize={'14px'}>{`The trade was cancelled and the ${tradeDetail?.asset} is back in your wallet,To Continue,reopen this trade , so the ${tradeDetail?.asset} is reserved for it, before you ask your trade partner to make the payment `}</Box>
                <Text fontSize={'10px'} alignSelf={'start'}>{tradeDetail?.status_changed_at}</Text>

            </>
        ));
    }

    // Dispute Start
    const disputeReason = `A dispute has been started by ${buyer || seller ? userName : partnerName}.
The reason is: Trade partner is not responding; after receiving payment, they asked for documents. Such behavior is against policy.

Disputes are handled by moderators who will join when available. Provide all proof to support your case.`;

    if ((tradeDetail?.is_disputed && tradeType === 'buy_trade') || (tradeType === 'buy_trade' && dispute)) {
        addMessage('dispute-start-buy', formattedDate1, (
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
        ));
    }

    if ((tradeDetail?.is_disputed && tradeType === 'sell_trade') || (tradeType === 'sell_trade' && dispute)) {
        addMessage('dispute-start-sell', formattedDate1, (
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
        ));
    }

    // Moderator Message
    if (disputeMessage) {
        addMessage('moderator-message', formattedDate1, (
            <Flex direction={'column'}>
                <Box p={4} borderRadius={5} bg={'teal.200'} color={'gray.700'} fontSize={'14px'}>
                    <b>@Seller and @Buyer</b><br /><br />
                    Hello, I am a moderator handling this dispute. Please upload:<br />
                    - A video of your online payment account showing transaction history, or a PDF statement for the last 10 days.<br />
                    - A recording or screenshot of a conversation with your payment provider confirming transaction status.<br /><br />
                    Upload files directly here or via public link (Google Drive, Dropbox, etc.). Ensure visibility of account name, number, date, and transaction status.<br /><br />
                    Dispute resolution may take up to 48 hours.
                </Box>
                <Text fontSize={'10px'} alignSelf={'start'}>{tradeDetail?.status_changed_at}</Text>

            </Flex>
        ));
    }
    return systemMessages;

    // return (
    //     <>
    //         {systemMessages.map(msg => (
    //             <Flex key={msg.id} direction="column" gap={2}>
    //                 {msg.content}
    //                 <Text fontSize="10px" alignSelf="start">{msg.time}</Text>
    //             </Flex>
    //         ))}
    //     </>
    // );
};
