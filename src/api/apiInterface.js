import axios from 'axios';
import config from "@/config";
const axiosInstance = axios.create({
    baseURL: config.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});
async function apiRequest(config) {
    try {
        return await axiosInstance.request(config);
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.message);
            throw error;
        }
        throw new Error('予期せぬエラー');
    }
}
const getBearerToken = () => {
    const token = localStorage.getItem('token') || '';
    if (!token) {
        //TODO エラー考える
        throw new Error('再度ログインしてください。');
    }
    return 'Bearer ' + token;
};
export async function getRequest(url) {
    const config = {
        url: url,
        method: 'get',
        headers: {
            'Authorization': getBearerToken()
        }
    };
    return apiRequest(config);
}
export async function postRequest(url, data) {
    const config = {
        url: url,
        method: 'post',
        data: data,
        headers: {
            'Authorization': getBearerToken()
        }
    };
    return apiRequest(config);
}
//# sourceMappingURL=apiInterface.js.map