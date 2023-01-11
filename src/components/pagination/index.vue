<template>
  <div class="demo-pagination-block">
    <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[10, 30, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="props.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from "vue";
const total = ref(0);
const currentPage4 = ref(1);
const pageSize4 = ref(10);
const emits = defineEmits(["changeList"]);
const props = defineProps({
  total: Number,
});
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
  pageSize4.value = val; //条数
  emits("changeList", pageSize4.value, currentPage4.value);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
  currentPage4.value = val; //页数
  emits("changeList", pageSize4.value, currentPage4.value);
};
</script>

<style scoped>
.demo-pagination-block {
  position: absolute;
  bottom: 5px;
  right: 50px;
  /* z-index: 99999; */
}
</style>