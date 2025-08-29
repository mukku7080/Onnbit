import { axiosInstance } from "./axiosInstance"

export const idVerification = async (data) => {
    try {
        console.log(data);
        const response = await axiosInstance.post("/address/id-verification", data);
        return response?.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}
export const AddressVerification = async (data) => {
    try {
        console.log(data);
        const response = await axiosInstance.post("/address/address-verification", data);
        return response?.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}
export const GetIdVerificationDetail = async () => {
    try {
        const response = await axiosInstance.get("/address/get-id-verification-details");
        return response?.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}
export const GetAddressVerificationDetail = async () => {
    try {
        const response = await axiosInstance.get("/address/get-address-verification");
        return response?.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}