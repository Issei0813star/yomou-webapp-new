import axios from 'axios';

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

class UserService {
    private apiUrl: string;

    constructor() {
        this.apiUrl = 'http://localhost:9000';
    }

    async login(request: LoginRequest): Promise<LoginResponse> {
        const response = await axios.post<LoginResponse>(`${this.apiUrl}/user/login`, request);
        return response.data;
    }

    async create(request: UserCreateRequest): Promise<UserCreateResponse> {
        const response = await axios.post<UserCreateResponse>(`${this.apiUrl}/user`, request)
        return response.data
    }
}

export default new UserService();
