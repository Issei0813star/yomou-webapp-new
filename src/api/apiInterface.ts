import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import config from "@/config";

const axiosInstance = axios.create({
    baseURL: config.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});

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
