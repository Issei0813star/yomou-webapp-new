<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900">
    <TimelinesPost/>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted} from "vue";
import TimelinesPost from "@/components/TimelinesPost.vue";
import {getTimelineResponse, getTimeline} from "@/services/PostService";
import { showError } from '@/utils/toastUtil';
export default defineComponent({
  components: {TimelinesPost},
  setup() {

    const pageNumber = ref<number>();
    const postCount = ref<number>();
    //TODO postクラス作る
    const posts = ref<object[]>();

    onMounted(async () => {
      try {
        const res: getTimelineResponse = await getTimeline();
        pageNumber.value = res.pageNumber;
        postCount.value = res.postCount;
        posts.value = res.posts;
      }
      catch (error) {
        showError('予期せぬエラーが発生。')
      }
    })
  }

})
</script>