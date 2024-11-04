import { postRequest } from "@/api/apiInterface";
export async function userLogin(request) {
    const response = await postRequest('/user/login', request);
    return response.data;
}
export async function createUser(request) {
    const response = await postRequest('/user/create', request);
    return response.data;
}
//# sourceMappingURL=UserService.js.map