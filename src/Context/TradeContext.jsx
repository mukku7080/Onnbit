import React, { Children, useContext, useState } from 'react'
import { addToFavorite, BuyerUpdate, cancelTrade, createFeedback, ExpireTrade, FinalUpdate, getAuthenticatedTradeHistory, getFeedback, getSupportTicketsById, getTradeHistory, InititateTrade, SellerUpdate, supportTicket, updateTradeDispute } from '../api/tradeService'

const TradeContext = React.createContext()
const TradeProvider = ({ children }) => {

    const [getTradeDto, SetTradeDto] = React.useState({
        user_id: '',
        trade_id: '',
        tradeType: '',
        cryptocurrency: '',
        tradeStatus: '',
        per_page: ''
    });
    const [runningOffers, setRunningOffers] = useState();
    const [tradeId, setTradeId] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [feedbackdetail, setFeedbackDetail] = useState([]);
    const [supportticketDetail, setSupportTicketDetail] = useState();
    const handleTradeInitiate = async (data) => {
        try {

            const response = await InititateTrade(data);
            setTradeId(response.data);
            return response;
        }
        catch (error) {
            setError(error.response ? error.response.data : error);
        }
    }
    const handleBuyerUpdate = async (trade_id) => {
        const response = await BuyerUpdate(trade_id);
        return response;
    }
    const handleSellerUpdate = async (data) => {
        const response = await SellerUpdate(data);
        return response;
    }
    const handleFinalBuyerUpdate = async (data) => {
        const response = await FinalUpdate(data);
        return response;
    }
    const handleTradeHistory = async (getTradeDto) => {
        const response = await getTradeHistory(getTradeDto);
        return response;
    }
    const handleAuthenticatedTradeHistory = async (page) => {
        const response = await getAuthenticatedTradeHistory(page);
        setRunningOffers(response);
        return response;
    }
    const handleTradeExpire = async (trade_id) => {
        try {
            const response = await ExpireTrade(trade_id);
            return response;
        }
        catch (error) {
            setError(error.response ? error.response.data : error);
        }
    }
    const handleCancelTrade = async (trade_id) => {
        try {
            const response = await cancelTrade(trade_id);
            return response;
        }
        catch (error) {
            setError(error.response ? error.response.data : error);
        }
    }

    const handleSupportTicket = async (request) => {
        try {
            const response = await supportTicket(request);
            return response;
        }
        catch (error) {
            setError(error.response ? error.response.data : error);
        }
    }
    const handleUpdateTradeDispute = async (request) => {
        try {
            const response = await updateTradeDispute(request);
            return response;
        }
        catch (error) {
            setError(error.response ? error.response.data : error);
        }
    }
    const handleCreateFeedback = async (request) => {
        try {
            const response = await createFeedback(request);
            return response;
        }
        catch (error) {
            setError(error.response ? error.response.data : error);
            return error;
        }
    }
    const handleGetFeedback = async (request) => {
        try {
            const response = await getFeedback(request);
            setFeedbackDetail(response?.data);
            return response;
        }
        catch (error) {
            setError(error.response ? error.response.data : error);
            return error;
        }
    }
    const handleAddToFavorite = async (request) => {
        try {
            const response = await addToFavorite(request);
            return response;
        }
        catch (error) {
            setError(error.response ? error.response.data : error);
            return error;
        }
    }
    const handleGetSupportTicketById = async (id) => {
        try {
            const response = await getSupportTicketsById(id);
            setSupportTicketDetail(response?.data);
            return response;
        }
        catch (error) {
            setError(error.response ? error.response.data : error);
            return error;
        }
    }
    return (
        <TradeContext.Provider value={{
            handleTradeInitiate,
            tradeId,
            handleBuyerUpdate,
            runningOffers,
            getTradeDto,
            feedbackdetail,
            SetTradeDto,
            handleTradeHistory,
            handleSellerUpdate,
            handleFinalBuyerUpdate,
            error,
            handleTradeExpire,
            handleAuthenticatedTradeHistory,
            handleCancelTrade,
            handleSupportTicket,
            handleUpdateTradeDispute,
            handleCreateFeedback,
            handleAddToFavorite,
            handleGetFeedback, handleGetSupportTicketById,
            supportticketDetail

        }}>
            {children}
        </TradeContext.Provider>
    )
}
export const useTradeProvider = () => useContext(TradeContext);

export default TradeProvider