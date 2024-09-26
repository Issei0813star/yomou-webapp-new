import axios from 'axios';

export interface LoginRequest {
    userIdentifier: string;
    password: string;
}

export interface LoginResponse {
    userId: bigint;
    token: string;
}

class LoginService {
    private apiUrl: string;

    constructor() {
        this.apiUrl = 'http://localhost:9000';
    }

    async login(request: LoginRequest): Promise<LoginResponse> {
        try {
            const response = await axios.post<LoginResponse>(`${this.apiUrl}/user/login`, request);
            return response.data;
        } catch (error) {
            // エラーハンドリング
            console.error('Login error:', error);
            throw error;
        }
    }
}

export default new LoginService();
