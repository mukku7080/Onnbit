import axios from "axios";
import { axiosInstance } from "./axiosInstance";





export const getOtherService = async () => {
    try {
        const response = await axiosInstance.get("/countries/currency");
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;
    }

}
export const getCountrycode = async () => {
    try {
        const response = await axiosInstance.get("/countries/dialing-code");
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;
    }

}
export const AddSecurityQuestions = async (values) => {
    const { answer0, answer1, answer2, question0, question1, question2 } = values;

    try {

        const response = await axiosInstance.post("/security-questions",
            {
                questions: [
                    {
                        question_order: 1,
                        question: question0,
                        answer: answer0,
                    },
                    {
                        question_order: 2,
                        question: question1,
                        answer: answer1,
                    },
                    {
                        question_order: 3,
                        question: question2,
                        answer: answer2,
                    }
                ]
            }
        )
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export const getLoginHistory = async () => {
    try {
        const response = await axiosInstance.get("/login-history");
        return response.data;

    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}
export const getReferalLink = async () => {
    try {
        const response = await axiosInstance.get("/get-referral-link");
        return response.data;


    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}
export const getAllNotification = async (request) => {
    try {
        const response = await axiosInstance.get(`/notifications?${request?.toQueryString()}`);
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}
export const markAsRead = async () => {
    try {
        const response = await axiosInstance.patch("/mark-as-read");
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }

}
export const markAsReadById = async (id) => {
    try {
        const response = await axiosInstance.get(`/notification/${id}`);
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}
export const realTimePrice = async () => {
    try {
        const response = await axios('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,binancecoin&vs_currencies=inr');
        return response.data;


    }
    catch (error) {
        console.log(error);
    }
}
export const reportBehaviour = async (data) => {
    try {
        const response = await axiosInstance.post("/report/store-report", data);
        return response.data;


    }
    catch (error) {
        return error.response ? error.response.data : error.message;
    }
}
