import { createContext, useContext, useState } from "react";
import { AddressVerification, GetAddressVerificationDetail, GetIdVerificationDetail, idVerification } from "../api/VerificationService";

const VerificationContext = createContext();
const VerificationProvider = ({ children }) => {
    const [idVerificationdetail, setIdVerificationDetail] = useState(null);
    const [addressVerificationdetail, setAddressVerificationDetail] = useState(null);
    const handleIdVerification = async (data) => {
        const response = await idVerification(data);
        return response;

    }
    const handleAddressVerification = async (data) => {
        const response = await AddressVerification(data);
        return response;

    }
    const handleGetIdVerificationDetail = async () => {
        const response = await GetIdVerificationDetail();
        setIdVerificationDetail(response);
        return response;

    }
    const handleGetAddressVerificationDetail = async () => {
        const response = await GetAddressVerificationDetail();
        setAddressVerificationDetail(response);
        return response;

    }
    return (
        <VerificationContext.Provider value={{ handleIdVerification, handleAddressVerification, handleGetIdVerificationDetail, idVerificationdetail, handleGetAddressVerificationDetail, addressVerificationdetail }}>
            {children}
        </VerificationContext.Provider>
    )
}
export const useVerification = () => useContext(VerificationContext);
export default VerificationProvider;