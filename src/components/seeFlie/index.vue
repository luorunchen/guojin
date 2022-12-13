<template>
  <div id="overlay">
    <!-- <el-button @click="dialogVisible = true">查看文件</el-button> -->
    <!-- src="http://192.168.30.119:8080/download/3.pdf#toolbar=0" -->

    <el-drawer v-model="dialogVisible" direction="rtl" :title="info.title" size="100%" :append-to-body="true">
      <!-- <p>上传人员:{{ info.perpeo }}</p>
      <p>上传时间:{{ info.time }}</p> -->
      <!-- <el-divider /> -->
      <iframe :src="pSrc" frameborder="0" class="pdf" style="width: 100%"></iframe>
    </el-drawer>



    <!-- <el-dialog v-model="dialogVisible" title="Tips" width="80%" top="10px">
      <iframe
        :src="pSrc"
        frameborder="0"
        class="pdf"
        style="width: 100%"
      ></iframe>
    </el-dialog> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, defineExpose, reactive } from 'vue'
import { ElMessageBox } from 'element-plus'
import { useBase64 } from '@vueuse/core';

const dialogVisible = ref(false)
const info = reactive({
  title: '',
  perpeo: '',
  time: '',
})
const pSrc: any = ref()
onMounted(() => {
  // loadPDF()

})

const show = (row: any) => {
  // let u = url.split('156.5')

  // console.log(row)
  info.title = row.title
  info.perpeo = row.create_name
  info.time = row.create_date

  // pSrc.value = `../../pdf/web/viewer.html?file=/api/${u[1]}`
  // pSrc.value = `https://view.xdocin.com/view?src=${row.url}&copyable=false&printable=false&saveable=false`
  pSrc.value = `http://vw.usdoc.cn/?m=5&src=${row.url}`
  // pSrc.value = row.url
  // office web查看器 
  // var encodedData = window.btoa();

  let a = encodeURIComponent(row.url)
  let i = window.btoa(a)
  console.log(i);

  // let docUrl = 'https://view.xdocin.com/demo/view.docx'
  // let url = encodeURIComponent('http://119.91.156.5/download/b390071e-f679-4e00-a8a1-75ade57e79fe生产安全事故应急条例.docx')
  // pSrc.value = 'http://view.officeapps.live.com/op/view.aspx?src=' + url
  pSrc.value = 'http://119.91.156.5:8012/onlinePreview?url=' + i
  // console.log(url, 99);

  // office web查看器



  dialogVisible.value = true
}
defineExpose({
  show,
})
</script>

<style lang="less" scoped>
#overlay {
  .pdf {
    height: calc(86vh);
  }



}
</style>