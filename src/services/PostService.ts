import axios, {AxiosResponse} from "axios";
import {getRequest, postRequest} from "@/api/apiInterface";
import { Post } from "@/types";

export interface getTimelineResponse {
    pageNumber: number,
    postCount: number,
    posts: Post[]
}

export async function getTimeline(): Promise<getTimelineResponse> {
    const response: AxiosResponse<getTimelineResponse> = await postRequest('post/timeline', {})
    return response.data;
}