// // TradeDataContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const TradeDataContext = createContext();

export const TradeDataProvider = ({ children }) => {
    const [tradeData, setTradeData] = useState(null);
    useEffect(() => {
    }, [tradeData])
    return (
        <TradeDataContext.Provider value={{ tradeData, setTradeData }}>
            {children}
        </TradeDataContext.Provider>
    );
};

export const useTradeData = () => useContext(TradeDataContext);
