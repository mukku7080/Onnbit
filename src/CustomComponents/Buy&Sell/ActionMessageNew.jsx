import { useEffect, useState } from "react";
import { useUser } from '../../Context/userContext';
import useStore from '../Store/store';
import { useTradeProvider } from '../../Context/TradeContext';



export const ActionMessageNew = ({ tradeDetail, tradeType }) => {
    const { user, getUserById } = useUser();
    const { handleGetSupportTicketById, supportticketDetail } = useTradeProvider();
    const [showMessage, setShowMessage] = useState(false);

    const parsedDate = new Date(tradeDetail?.status_changed_at?.replace(' ', 'T'));
    const formattedDate = parsedDate.toLocaleString('en-GB', {
        day: '2-digit', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    const formattedDate1 = parsedDate.toLocaleString('en-GB', {
        hour: '2-digit',
        minute: '2-digit'
    });


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
    }, [buyer, seller, tradeDetail?.is_disputed]);

    const getTicketDetail = async () => {
        const res = await handleGetSupportTicketById(tradeDetail?.support_ticket_number);
        if (res.status) {
            setTimeout(() => {
                setDisputeMessage(true);
            }, 1000);
        }
    }

    useEffect(() => {
        if (!supportticketDetail) return;
        if (tradeDetail?.buyer_id == supportticketDetail?.user_id) {
            setBuyer(true);
        } else {
            setSeller(true);
        }
    }, [supportticketDetail]);

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

    // Processing - Buy
    if ((tradeDetail?.trade_status === 'processing' && tradeType === 'buy_trade') || (tradeType === 'buy_trade' && paid)) {
        systemMessages.push({
            id: 'processing-buy',
            type: 'system',
            time: formattedDate1,
            content: `The Vendor is now verifying your payment. Once confirmed, Tether will be sent to your Onnbit wallet.`
        });
    }

    // Processing - Sell
    if ((tradeDetail?.trade_status === 'processing' && tradeType === 'sell_trade') || (tradeType === 'sell_trade' && paid)) {
        systemMessages.push({
            id: 'processing-sell',
            type: 'system',
            time: formattedDate1,
            content: `${getUserById?.username} has marked this trade as paid. Check if you’ve received the payment and send the Tether.`
        });
    }

    // Expired
    if (tradeDetail?.trade_status === 'expired' || expire) {
        const isBuy = tradeType === 'buy_trade';
        systemMessages.push({
            id: `expired-${isBuy ? 'buy' : 'sell'}`,
            type: 'system',
            time: formattedDate1,
            content: `The trade is about to expire. Please do not make any further payments related to this trade.`
        });
        systemMessages.push({
            id: `expired-final-${isBuy ? 'buy' : 'sell'}`,
            type: 'system',
            time: formattedDate1,
            content: isBuy ?
                `The trade has expired and the ${tradeDetail?.asset} is no longer reserved. Ask your trade partner to reopen the trade before making payment.` :
                `The trade has expired and the ${tradeDetail?.asset} is no longer reserved. Reopen this trade before asking your trade partner to make the payment.`
        });
    }

    // Dispute
    if (tradeDetail?.is_disputed || dispute) {
        const isBuy = tradeType === 'buy_trade';
        const isInitiator = isBuy ? buyer : seller;
        systemMessages.push({
            id: `dispute-initiated-${isBuy ? 'buy' : 'sell'}`,
            type: 'system',
            time: formattedDate1,
            content: `A dispute has been started by ${isInitiator ? user?.username : getUserById?.username}.\n\nReason: Trade partner is not responding; trade partner after receiving the payment, is asking for documents. Before payment, do not ask for documents... trade partner is trying to scam me.\n\nDisputes are processed in live queue. A moderator will join when available.\n\nDecisions are based on offer terms, trading activity, proof of payment, and information requested during the dispute.`
        });

        if (disputeMessage) {
            systemMessages.push({
                id: `dispute-moderator-${isBuy ? 'buy' : 'sell'}`,
                type: 'system',
                time: formattedDate1,
                content: `@Seller and @Buyer\n\nHello, I am a moderator reviewing your dispute. I need evidence such as:\n\n- A video of your payment account showing transaction history\n- A PDF account statement for the last 10 days\n- A recording or chat with payment provider support confirming the transaction\n\nYou can upload files to Google Drive or Dropbox and share the link here. Ensure details like account name, number, date, amount, and transaction status are visible.\n\nPlease allow up to 48 hours for dispute resolution due to high volume.`
            });
        }
    }

    // Cancel
    if (tradeDetail?.trade_status === 'cancel' || cancel) {
        const isBuy = tradeType === 'buy_trade';
        systemMessages.push({
            id: `cancel-${isBuy ? 'buy' : 'sell'}`,
            type: 'system',
            time: formattedDate1,
            content: isBuy ?
                `The trade was cancelled and the ${tradeDetail?.asset} is no longer reserved. Ask your partner to reopen this trade and ensure funds are reserved before making payment.` :
                `The trade was cancelled and the ${tradeDetail?.asset} is back in your wallet. Reopen this trade before asking your partner to make payment.`
        });
    }
    return systemMessages;

    // return (
    //     <>
    //         {systemMessages.map(msg => (
    //             <Flex key={msg.id} direction={'column'} gap={1}>
    //                 <Box p={4} borderRadius={5} bg={'teal.100'} color={'gray.700'} fontSize={'14px'}>{msg.content}</Box>
    //                 <Text fontSize={'10px'}>{msg.time}</Text>
    //             </Flex>
    //         ))}
    //     </>
    // );
}
