import {getRequest, postRequest} from "@/api/apiInterface";

export interface LoginRequest {
    userIdentifier: string;
    password: string;
}

export interface LoginResponse {
    userId: bigint;
    token: string;
}

export interface UserCreateRequest {
    userName: string,
    email: string,
    password: string
}

export interface UserCreateResponse {
    userId: bigint,
    userName: string,
    email: string
}

export async function userLogin(request: LoginRequest): Promise<LoginResponse> {
    const response = await postRequest<LoginResponse>('/user/login', request);
    return response.data;
}

export async function createUser(request: UserCreateRequest): Promise<UserCreateResponse> {
    const response = await postRequest<UserCreateResponse>('/user/create', request)
    return response.data
}
