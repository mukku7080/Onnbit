import { axiosInstance } from "./axiosInstance";


export const InititateTrade = async (data) => {
    try {
        const response = await axiosInstance.post("/trade/initiate-trade", data);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}
export const BuyerUpdate = async (trade_id) => {
    try {
        const data = {
            trade_id: trade_id
        };
        const response = await axiosInstance.post("/trade/buyer-update-trade", data);
        return response.data;
    }
    catch (error) {
        console.error("Error initiating trade:", error);
        throw error.response ? error.response.data : error;

    }
}
export const SellerUpdate = async (data) => {
    try {
        const response = await axiosInstance.post("/trade/seller-update-trade", data);
        return response.data;
    }
    catch (error) {
        console.error("Error initiating trade:", error);
        throw error;
    }
}
export const FinalUpdate = async (data) => {
    try {
        const response = await axiosInstance.post("/trade/final-update-buyer", data);
        return response.data;
    }
    catch (error) {
        console.error("Error initiating trade:", error);
        throw error;
    }
}
export const ExpireTrade = async (trade_id) => {
    const trade = {
        trade_id: trade_id
    };
    try {
        const response = await axiosInstance.post("/trade/update-trade-expired", trade);
        return response.data;
    }
    catch (error) {
        console.error("Error initiating trade:", error);
        throw error;
    }
}
export const getTradeHistory = async (data) => {
    try {
        const response = await axiosInstance.get(`/trade/get-trade-history?user_id=${data?.user_id || ''}&trade_id=${data?.trade_id || ''}&tradeType=${data?.tradeType || ''}&cryptocurrency=${data?.cryptocurrency || ''}&tradeStatus=${data?.tradeStatus || ''}&per_page=${data?.per_page || 10}`);
        return response?.data;
    }
    catch (error) {
        console.error("Error Fetching  trade:", error);
        throw error;
    }
}
export const getAuthenticatedTradeHistory = async (page) => {
    try {
        const response = await axiosInstance.get(`/trade/authenticated-user-trade-history?page=${page}`);
        return response?.data;
    }
    catch (error) {
        console.error("Error Fetching  trade:", error);
        throw error;
    }
}
export const cancelTrade = async (trade_Id) => {
    const tradeDto = {
        trade_id: trade_Id
    }
    try {
        const response = await axiosInstance.post("/trade/cancel-trade", tradeDto);
        return response.data;


    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}
export const supportTicket = async (request) => {

    try {
        const response = await axiosInstance.post("/support-tickets/store-ticket", request);
        return response.data;


    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}

export const getSupportTicketsById = async (id) => {

    try {
        const response = await axiosInstance.get(`/support-tickets/get-particular-ticket/${id}`);
        return response.data;


    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}
export const updateTradeDispute = async (request) => {

    try {
        const response = await axiosInstance.post("/trade/update-trade-dispute", request);
        return response.data;


    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}
export const createFeedback = async (request) => {

    try {
        const response = await axiosInstance.post("/trade/give-feedback", request);
        return response.data;


    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}
export const getFeedback = async (trade_id) => {

    try {
        const response = await axiosInstance.get(`/trade/get-trade-feedback?trade_id=${trade_id}`);
        return response.data;


    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}
export const addToFavorite = async (request) => {

    try {
        const response = await axiosInstance.post("/crypto-advertisement/toggle-favorite-cryptoOffer", request);
        console.log(response);
        return response.data;


    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}

