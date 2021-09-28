import { dispatch } from "pages/_app";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import baseURLs from "utility/constants/domain";
import globalStorage from "lib/globalStorage";
import { showAlert } from "actions";

interface IResponse<TDataType = any> {
    errorId: number
    result: TDataType
    title: string
}

// seccess request interceptor
// function onRequest(config: AxiosRequestConfig): AxiosRequestConfig {
//     return {
//         ...config,
//         headers: { Token: globalStorage.getItem('USER_TOKEN'), ...config.headers }
//     }
// }

// request error interceptor
// function onRequestError(error: any) {
//     // error handling, we can use dispatch here
//     return Promise.reject(error);
// }

// seccess response interceptor
function onResponse(response: AxiosResponse<IResponse> ) {
    // error handling with success status, we can use dispatch here
    if(response.data.errorId !== 0) {
        dispatch(showAlert({
            message: response.data.title,
            severity: 'error'
        }))
        return Promise.reject(response.data);
    }
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
 * await APICall({ method: 'get', url: 'requestURL', ...options })
 */
const axiosInstance = axios.create({
    baseURL: baseURLs.API,
});

if( typeof window !== 'undefined' ) {
    // config interceptors for client-side call api
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    // axiosInstance.interceptors.request.use(onRequest, onRequestError);
}

const APICall = function<DataType = any> ( config: AxiosRequestConfig) {
    if (typeof window !== 'undefined') {
        config = {
            ...config,
            headers: { Token: globalStorage.getItem('USER_TOKEN'), ...config.headers }
        }
    }
    return new Promise<AxiosResponse<IResponse<DataType>>>((resolvation, rejection)=> {
        axiosInstance(config)
        .then( (res: AxiosResponse<IResponse> )=> resolvation(res))
        .catch( (err: AxiosError<IResponse>)=> { rejection(err) })
    })
}

export default APICall;