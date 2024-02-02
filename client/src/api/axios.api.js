import axios from 'axios';
import Cookies from 'js-cookie';
import {ACCESS_TOKEN, SERVER_URI} from "../constants";

const api = axios.create({
    baseURL: SERVER_URI,
    // Інші налаштування axios, які вам можуть знадобитися
});

const handleRequest = async ({ method, url, data = null, params = null, headers = {} }) => {
    try {
        const accessToken = Cookies.get(ACCESS_TOKEN);

        const response = await api.request({
            method,
            url,
            data,
            params,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                ...headers,
            },
        });

        return {
            data: response.data,
            status: response.status,
            headers: response.headers,
        };
    } catch (error) {
        handleError(error);
    }
};

const handleError = (error) => {
    if (error.response) {
        console.error('Server responded with an error:', error.response.data);
    } else if (error.request) {
        console.error('No response received from the server.');
    } else {
        console.error('Error setting up the request:', error.message);
    }
    throw error; // Передача помилки для подальшого оброблення
};

export const get = (url, params = null, headers = {}) => handleRequest({ method: 'get', url, params, headers });
export const post = (url, data = null, headers = {}) => handleRequest({ method: 'post', url, data, headers });
export const put = (url, data = null, headers = {}) => handleRequest({ method: 'put', url, data, headers });
export const del = (url, headers = {}) => handleRequest({ method: 'delete', url, headers });
