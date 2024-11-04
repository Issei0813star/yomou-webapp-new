<template>
  <div class="p-8 max-w-md w-full border">
    <div>
      <div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { defineProps } from 'vue';
import {Post} from "@/types"

const props = defineProps<{ post: Post }>();

</script>