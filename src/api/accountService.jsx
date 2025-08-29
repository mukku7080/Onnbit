import { axiosInstance } from "./axiosInstance"

export const addAccount = async (values) => {
    try {

        const response = await axiosInstance.post('/payment-details/add-payment-details',
            {
                account_type: values.accountType,
                bank_account_country: values.bankCountry,
                currency: values.currency,
                bank_name: values.bankName,
                account_holder_name: values.accountHolder,
                custom_bank_details: values.customBankDetails,
                ifsc_code: values.ifsc,
                account_number: values.accountNumber,
                is_primary: values.isPrimary,
                swift_bic_code: values.swiftCode,
                residence_country: values.country,
                state_region: values.state,
                city: values.city,
                zip_code: values.zipCode,
                address: values.address

            }


        )

        return response.data;

    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}
export const AddUpiDetails = async (values) => {
    try {
        const response = await axiosInstance.post('/payment-details/add-upi-details', values);
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}
export const getPaymentDetails = async (paymentType) => {
    try {
        const response = await axiosInstance.get(`/payment-details/get-payment-details?payment_type=${paymentType}`);
        return response.data;

    }
    catch (error) {
        throw error.response ? error.response.data : error.message;

    }
}
export const updateIsPrimaryAccount = async (value) => {
    try {
        const response = await axiosInstance.post('/payment-details/update-is-primary', value);
        return response.data;

    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}
export const getWalletKeyPhrase = async () => {
    try {
        const response = await axiosInstance.get("/web3-wallet/get-walletKeyPhrase")
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}
export const createWebWallet = async (blockChainType) => {
    try {
        const response = await axiosInstance.post('/web3-wallet/create-web3-wallet', {
            blockchain: blockChainType.blockchain,
            network: blockChainType.network,
            asset: blockChainType.asset
        })
        return response.data;

    }
    catch (error) {
        // throw error.response ? error.response.data : error.message;
        return error.response?.data;

    }
}

export const updateWeb3WalletAddress = async (values) => {
    try {
        const response = await axiosInstance.post('/web3-wallet/update-web3-wallet',

            values
        )
        return response.data;

    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}
export const getWeb3Wallet = async () => {
    try {
        const response = await axiosInstance.get('/web3-wallet/get-web3-wallet')
        return response.data
    }
    catch (error) {
        throw error.response ? error.response.data : error.message;


    }
}
export const getTransactionDetail = async (request) => {
    try {

        const response = await axiosInstance.get(`/transaction/get-transaction?${request?.toQueryString()}`)
        return response.data
    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }

}
export const getPerPageTransactionDetail = async (Page) => {
    try {

        const response = await axiosInstance.get(`/transaction/get-transaction?page=${Page}`)
        return response.data
    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }

}
export const sendInternalTransfer = async (userDetail) => {
    try {
        const response = await axiosInstance.post('/transaction/send-asset', userDetail)
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error.message;

    }

}
export const WalletAddressTransaction = async (userDetail) => {
    try {
        const response = await axiosInstance.post('/transaction/transaction-using-address', userDetail)
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error.message;

    }

}
export const UpdateWalletAddressTransaction = async (userDetail) => {
    try {
        const response = await axiosInstance.post('/transaction/update-transaction', userDetail)
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error.message;

    }

}
export const FeeCalculation = async (feeDetail) => {
    try {
        const response = await axiosInstance.post('/transaction/fee-calculation', feeDetail)
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error.message;

    }

}
export const InternalAssetConversion = async (data) => {
    try {
        const response = await axiosInstance.post('/transaction/convert-asset', data)
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error.message;

    }

}




