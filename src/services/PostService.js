import { postRequest } from "@/api/apiInterface";
export async function getTimeline() {
    const response = await postRequest('post/timeline', {});
    return response.data;
}
//# sourceMappingURL=PostService.js.map