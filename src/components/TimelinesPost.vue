<template>
  <div class="p-8 max-w-md w-full border border-gray-700 bg-gray-800 text-white">
    <h1 class="text-left text-3xl font-extrabold pb-3">
      {{ props.post.bookTitle }}
    </h1>
    <ReviewPoint :review-point="props.post.reviewPoint" />
    <h2 class="text-left text-xl font-bold pb-2 pt-4">
      {{ props.post.header }}
    </h2>
    <p class="text-left">{{ props.post.content }}</p>
    <p class="text-right">{{ props.post.author.userName }}</p>
  </div>
</template>



<script setup lang="ts">

import { defineProps } from 'vue';
import {Post} from "@/types"
import ReviewPoint from "@/components/ReviewPoint.vue";

const props = defineProps<{ post: Post }>();

</script>