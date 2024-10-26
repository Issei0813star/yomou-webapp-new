import axios, {AxiosResponse} from "axios";
import {getRequest, postRequest} from "@/api/apiInterface";

export interface getTimelineResponse {
    pageNumber: number,
    postCount: number,
    posts: object[]
}

export async function getTimeline(): Promise<getTimelineResponse> {
    const response: AxiosResponse<getTimelineResponse> = await postRequest('post/timeline', {})
    return response.data;
}