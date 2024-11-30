import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import config from "@/config";
import {showError} from "@/utils/toastUtil";
import router from "@/router"

const axiosInstance = axios.create({
    baseURL: config.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});

const axiosInstanceForGoogleBooks = axios.create({
    baseURL: config.API_GOOGLE_BOOKS_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

async function apiRequest<T>(
    config: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
    try {
        return await axiosInstance.request<T>(config);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.message);
            throw error;
        }
        throw new Error('予期せぬエラー');
    }
}

async function apiRequestForGoogleBooks<T>(
    config: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
    try {
        return await axiosInstanceForGoogleBooks.request<T>(config);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.message);
            throw error;
        }
        throw new Error('予期せぬエラー');
    }
}

const getBearerToken = (): string => {
    const token: string = localStorage.getItem('token') || '';
    if(!token) {
        //TODO エラー考える
        throw new Error('再度ログインしてください。')
    }
    return 'Bearer ' + token;
}


export async function getRequest<T>(url:string): Promise<AxiosResponse<T>> {
    const config: AxiosRequestConfig = {
        url: url,
        method: 'get',
        headers: {
            'Authorization': getBearerToken()
        }
    }
    return apiRequest(config);
}

export async function postRequest<T>(url: string, data: object): Promise<AxiosResponse<T>> {
    const config: AxiosRequestConfig = {
        url: url,
        method: 'post',
        data: data,
        headers: {
            'Authorization': getBearerToken()
        }
    }
    return apiRequest(config);
}

export async function getRequestForGoogleBooks<T>(bookTitle: string): Promise<AxiosResponse<T>> {
    const params: object = {
        q: bookTitle
    }
    const config: AxiosRequestConfig = {
        method: 'get',
        params: params
    }
    return apiRequestForGoogleBooks(config)
}

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if(error.response && error.response.status == 403) {
            showError('再度ログインして下さい。')
            router.push('/login')
        }
    }
)
