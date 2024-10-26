import axios from "axios";
import {list} from "postcss";
import {LoginResponse} from "@/services/UserService";

export interface getTimelineResponse {
    pageNumber: number,
    postCount: number,
    posts: object[]
}

class PostService {
    private apiUrl: string;

    constructor() {
        //TODO あとでプロファイルに突っ込む
        this.apiUrl = 'http://localhost:9000';
    }

    async getTimeline(): Promise<getTimelineResponse> {
        const token = localStorage.getItem('token')
        const response = await axios.post<getTimelineResponse>(`${this.apiUrl}/post/timeline`, {}, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    }
}

export default new PostService()