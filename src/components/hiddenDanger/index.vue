<template>
  <Troubleshooting v-if="props.id == 125" />
  <RectifyAndReform v-else-if="props.id == 128" />
  <CheckUp v-else-if="props.id == 131" />
  <!-- {{ props.id }} -->
  <!-- 128,131 -->
</template>

<script setup lang="ts">
import Troubleshooting from "./Troubleshooting.vue"

import CheckUp from "./CheckUp.vue"
import RectifyAndReform from "./RectifyAndRefor.vue"
import { ref } from "vue"


const props = defineProps({
  id: Number
})

</script>

<style></style>