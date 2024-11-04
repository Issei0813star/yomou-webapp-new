<template>
  <div class="flex items-center">
    <span v-for="star in 5" :key="star" class="text-yellow-500">
      <i v-if="star <= fullStars" class="fas fa-star"></i>
      <i v-else-if="star === fullStars + 1 && hasHalfStar" class="fas fa-star-half-alt"></i>
      <i v-else class="far fa-star"></i>
    </span>
    <p class="pl-3">{{ formattedReviewPoint }}</p>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';

const props = defineProps<{
  reviewPoint: number;
}>();

const fullStars = Math.floor(props.reviewPoint);
const hasHalfStar = props.reviewPoint % 1 !== 0;

const formattedReviewPoint = computed(() => {
  return props.reviewPoint.toFixed(1);
});
</script>

<style scoped>
</style>
