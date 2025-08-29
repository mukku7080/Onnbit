import React from 'react';
import { useParams } from 'react-router-dom';
import SellTradeStart from './SellTradeStart';
import TradeStart from './TradeStart';


const TradeStartWrapper = () => {
    const { tradeType } = useParams();

    if (tradeType === 'sell_trade') {
        return <SellTradeStart />;
    } else if (tradeType === 'buy_trade') {
        return <TradeStart />;
    } else {
        return <div>Invalid trade type</div>;
    }
};

export default TradeStartWrapper;
