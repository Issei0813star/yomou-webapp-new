import axios from "axios";
import {list} from "postcss";
import {LoginResponse} from "@/services/UserService";

export interface getTimelineResponse {
    pageNumber: number,
    postCount: number,
    posts: object[]
}

class TimelineService {
    private apiUrl: string;

    constructor() {
        //TODO あとでプロファイルに突っ込む
        this.apiUrl = 'http://localhost:9000';
    }

    async getTimeline(): Promise<getTimelineResponse> {
        const response = await axios.post<getTimelineResponse>(`${this.apiUrl}/post/posts`, );
        return response.data;
    }
}

export default new TimelineService()