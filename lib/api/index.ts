import { dispatch } from "pages/_app";
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookie, { getCookie } from 'lib/functions/cookie';
import cookiesList from 'lib/constants/cookiesList';
import baseURLs from "lib/constants/domain";

// seccess request interceptor
function onRequest(config: AxiosRequestConfig): AxiosRequestConfig {
    return {
        ...config,
        headers: { ...config.headers, Token: getCookie(cookiesList.User)?.Token }
    }
}

// request error interceptor
function onRequestError(error: any) {
    // error handling, we can use dispatch here
    return Promise.reject(error);
}

// seccess response interceptor
function onResponse(response: AxiosResponse ) {
    // error handling with success status, we can use dispatch here
    return response;
}

// error response interceptor
function onResponseError(error: any) {
    // error handling, we can use dispatch here
    return Promise.reject(error);
}

/**
 * @example
 * 
 * import APICall from 'lib/api';
 * 
 * await APICall.get<data Type>('requestURL', { ...options }) 
 * // or
 * await APICall({ method: 'get', url: 'requestURL', ...options })
 */
const APICall = axios.create({
    baseURL: baseURLs.API,
});

if( typeof window !== undefined ) {
    // config interceptors for client-side call api
    APICall.interceptors.response.use(onResponse, onResponseError);
    APICall.interceptors.request.use(onRequest, onRequestError);
}


export default APICall;