import { axiosInstance } from "./axiosInstance";

export const login = async ({ email, password }) => {
    try {
        const response = await axiosInstance.post("/auth/login", {
            username: email,
            password: password
        });
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;
    }

};

export const loginWithGoogle = async () => {
    try {
        window.location.href = 'https://api.onnbit.com/api/auth/redirect';
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;
    }

};

export const SignupWithGoogle = async () => {
    try {
        window.location.href = 'https://api.onnbit.com/api/auth/redirect';
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;
    }

};
export const signup = async ({ email, password }) => {

    try {
        const response = await axiosInstance.post("/auth/register", {
            email: email,
            password: password,
            referralCode: localStorage.getItem("referralCode") || ""
        });
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;

    }
};

export const emailOtp = async (operation) => {
    try {
        const response = await axiosInstance.post('/send-email-otp', { operation });

        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;

    }
};
export const verifyEmailOtp = async (verifyOtp) => {
    try {
        const response = await axiosInstance.post('/verify-email-otp', verifyOtp);
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error;

    }
};


export const logout = async () => {
    try {
        const response = await axiosInstance.delete("/auth/logout");
        localStorage.clear();
        // localStorage.removeItem("authToken");
        return response.data
    } catch (error) {
        console.error("Logout failed:", error);
    }
};
export const forgetPassword = async (email) => {
    try {
        const response = await axiosInstance.post("/auth/forgot-password", {
            email
        })
        return response.data

    }
    catch (error) {
        throw error.response ? error.response.data : error;



    }
}
export const resetPassword = async ({ email, resetToken, newPassword }) => {
    try {
        console.log(email);
        console.log(resetToken);
        console.log(newPassword);
        const response = await axiosInstance.post("auth/reset-password", {
            email: email,
            token: resetToken,
            password: newPassword


        })
        return response.data

    }
    catch (error) {
        throw error.response ? error.response.data : error;

    }
}
export const passwordMatch = async (password) => {
    try {
        const response = await axiosInstance.post("/auth/password-verification", {
            password: password
        })
        return response.data
    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }

}
export const enable2FA = async (checked) => {
    try {
        const response = await axiosInstance.post("/auth/update-2fa", { two_fa: checked });
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }
}
export const getUserDetail = async (userDetail) => {
    try {
        const response = await axiosInstance.get(`/web3-wallet/get-user-detail?username=${userDetail.username}&wallet_address=${userDetail.address}&network=${userDetail.network}&asset=${userDetail.asset}`)
        return response.data;
    }
    catch (error) {
        throw error.response ? error.response.data : error.message;
    }

}
