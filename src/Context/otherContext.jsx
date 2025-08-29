import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { AddSecurityQuestions, getAllNotification, getCountrycode, getLoginHistory, getOtherService, getReferalLink, markAsRead, markAsReadById, realTimePrice, reportBehaviour } from '../api/otherService';
import NotificationRequest from '../Modals/NotificationRequest';



export const OtherContext = createContext();

const OtherDetailProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [countryCode, setCountryCode] = useState(null);
    const [loginhistory, setLoginHistory] = useState(null);
    const [referalLink, setReferalLink] = useState(null);
    const [notifications, setNotification] = useState(null);
    const [notificationCount, setNotificationCount] = useState(0);
    const [readNotification, setReadNotification] = useState(null);
    const [unreadNotification, setUnreadNotification] = useState([]);
    const [price, setPrice] = useState(null);
    const priceRef = useRef(null);

    useEffect(() => {
        handleCountryCode();
        handleOtherDetail();
        handleLoginHistory();
        handleReferralLink();
        handleRealTimePrice();
        // handleGetAllNotification();
    }, [])
    useEffect(() => {
        const req = new NotificationRequest();
        handleGetAllNotification(req);
    }, [notificationCount])

    const handleOtherDetail = async () => {
        try {

            const response = await getOtherService();
            setData(response.data);
            return response;

        }
        catch (error) {

            console.error("otp error:", error);
            setError(error);
        }
    }

    const handleCountryCode = async () => {
        try {

            const response = await getCountrycode();
            setCountryCode(response.data);
            return response;

        }
        catch (error) {

            console.error("otp error:", error);
            setError(error);
        }
    }
    const handleSecurityQuestions = async (values) => {
        try {
            const response = await AddSecurityQuestions(values);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    const handleLoginHistory = async () => {
        try {
            const response = await getLoginHistory();
            setLoginHistory(response.data);
        }
        catch (error) {
            throw error?.response ? error?.response?.data : error?.message;
        }
    }
    const handleReferralLink = async () => {
        try {

            const res = await getReferalLink();

            setReferalLink(res.referralLink);
            return res;
        }
        catch (error) {
            throw error;
        }
    }
    const handleGetAllNotification = async (request) => {
        try {
            const response = await getAllNotification(request);
            setUnreadNotification(response?.data?.filter(data => data.is_read === false) || []);
            setReadNotification(response?.data?.filter(data => data.is_read === true) || []);
            setNotificationCount(response?.analytics?.totalUnreadNotification);
            setNotification(response);


        }
        catch (error) {
            throw error;
        }
    }
    const handleMarkAsRead = async () => {
        try {
            const response = await markAsRead();
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    const handleMarkAsReadById = async (id) => {
        try {
            const response = await markAsReadById(id);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    const handleRealTimePrice = async () => {
        const response = await realTimePrice();
        priceRef.current = response;
        setPrice(response);
    }
    const handleReportBehaviour = async (data) => {
        const response = await reportBehaviour(data);
        console.log('Report Response:', response);
        return response;
    }


    return (
        <OtherContext.Provider value={{
            data,
            error,
            countryCode,
            handleSecurityQuestions,
            loginhistory,
            handleReferralLink,
            handleGetAllNotification,
            referalLink,
            notifications,
            handleMarkAsRead,
            unreadNotification,
            handleMarkAsReadById,
            notificationCount,
            readNotification,
            setNotificationCount,
            price,
            priceRef,
            handleReportBehaviour
        }}>
            {children}
        </OtherContext.Provider>
    )
}
export const useOtherDetail = () => {
    return useContext(OtherContext)
}



export default OtherDetailProvider