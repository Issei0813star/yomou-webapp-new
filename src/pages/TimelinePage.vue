<template>
  <div v-for="(post, index) in posts" :key="index" class="flex flex-col items-center justify-center min-h-screen bg-gray-900">
    <TimelinesPost :post="post" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import TimelinesPost from "@/components/TimelinesPost.vue";
import { getTimelineResponse, getTimeline } from "@/services/PostService";
import { showError } from '@/utils/toastUtil';
import { Post } from '@/types'

const pageNumber = ref<number>(0);
const postCount = ref<number>(0);
const posts = ref<Post[]>([]);

onMounted(async () => {
  try {
    const res: getTimelineResponse = await getTimeline();
    pageNumber.value = res.pageNumber;
    postCount.value = res.postCount;
    posts.value = res.posts;
  } catch (error) {
    showError((error as Error).message);
    console.error(error);
  }
});
</script>
