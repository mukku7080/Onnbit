import axios from 'axios';
const api_url = 'https://api.onnbit.com/api';
export const axiosInstance = axios.create({

    baseURL: api_url,

});

let isLoggingOut = false;
axiosInstance.interceptors.request.use(
    (config) => {
        const sessionToken = sessionStorage.getItem("authToken");
        const token = sessionToken ? sessionToken : localStorage.getItem("authToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;

        try {
            const fullUrl = new URL(originalRequest.url, originalRequest.baseURL);
            const path = fullUrl.pathname;

            if (path.includes('/user-details') && error.response?.status === 401) {
                sessionStorage.removeItem("authToken");
                localStorage.removeItem("authToken");
                localStorage.removeItem("user");
                // window.location.href = '/login';
            }
        } catch (e) {
            // Fallback if parsing fails
        }

        return Promise.reject(error);
    }
);

