<template>
  <div class="bg-blue-50 py-10">
    <TimelinesPost/>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import TimelinesPost from "@/components/TimelinesPost.vue";
export default defineComponent({
  components: {TimelinesPost}

})
</script>