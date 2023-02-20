<template>
  <div id="overlay">
    <!-- <el-button @click="dialogVisible = true">查看文件</el-button> -->
    <!-- src="http://192.168.30.119:8080/download/3.pdf#toolbar=0" -->

    <el-drawer
      v-model="dialogVisible"
      direction="rtl"
      :title="info.title"
      size="100%"
      :append-to-body="true"
      :show-close="false"
    >
      <template #header="{ close, titleId, titleClass }">
        <h4 :id="titleId" :class="titleClass">{{ info.title }}</h4>
        <el-button type="primary" @click="preservation" v-if="states != 'law'">
          <el-icon class="el-icon--left"><Select /></el-icon>
          保存
        </el-button>
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
          退出
        </el-button>
      </template>
      <!-- <p>上传人员:{{ info.perpeo }}</p>
      <p>上传时间:{{ info.time }}</p> -->
      <!-- <el-divider /> -->
      <iframe
        v-if="states == 'law'"
        :src="pSrc"
        frameborder="0"
        class="pdf"
        style="width: 100%"
      />
      <div class="customMount" v-else></div>
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
import { getViewUrlDbPath } from "@/api/index.js";
import { ref, onMounted, nextTick, defineExpose, reactive } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { useBase64 } from "@vueuse/core";
import { CircleCloseFilled, Select } from "@element-plus/icons-vue";
const dialogVisible = ref(false);
const info = reactive({
  title: "",
  perpeo: "",
  time: "",
});
const states = ref();
const jssdk = ref();
const pSrc: any = ref();
onMounted(() => {
  // loadPDF()
});
const preservation = async () => {
  const result = await jssdk.value.save();
  console.log(result, "result");

  let text = "";

  switch (result.result) {
    case "nochange":
      text = "文档无更新，无需保存";
      break;
    case "SavedEmptyFile":
      text = "暂不支持保存空文件 触发场景：内核保存完后文件为空";
      break;
    case "SpaceFull":
      text = "空间已满";
      break;
    case "QueneFull":
      text = "保存中请勿频繁操作 触发场景：服务端处理保存队列已满，正在排队";
      break;
    case "fail":
      text = "保存失败";
      break;
    case "ok":
      text = "保存成功";
      break;
  }

  ElMessage({
    showClose: true,
    type: "warning",
    message: text,
  });
};
const show = (row: any, state) => {
  // let u = url.split('156.5')

  // console.log(row)
  info.title = row.title;
  info.perpeo = row.create_name;
  info.time = row.create_date;
  states.value = state;
  // pSrc.value = `../../pdf/web/viewer.html?file=/api/${u[1]}`
  // pSrc.value = `https://view.xdocin.com/view?src=${row.url}&copyable=false&printable=false&saveable=false`
  // pSrc.value = `http://vw.usdoc.cn/?m=5&src=${row.url}`;
  // pSrc.value = row.url
  // office web查看器
  // var encodedData = window.btoa();

  dialogVisible.value = true;
  console.log(state, "state");

  if (state == "law" || state == undefined) {
    let a = encodeURIComponent(row.url);
    let i = window.btoa(a);
    // pSrc.value = "http://119.91.156.5:8012/onlinePreview?url=" + i;
    // pSrc.value = "https://view.xdocin.com/view?src=" + row.url;
    pSrc.value = `https://view.xdocin.com/view?src=${a}&copyable=false&printable=false&saveable=false`;
    console.log(pSrc.value, "11");
  } else {
    console.log(state, "state");

    getViewUrlDbPath(
      state == "law"
        ? "d" + row.id
        : state == "account"
        ? "e" + row.id
        : row.id,
      sessionStorage.getItem("userId")
    ).then((res) => {
      if (res.data.data.wpsUrl == undefined || res.data.data.wpsUrl == null) {
        return show(row, "see");
      }
      nextTick(() => {
        jssdk.value = WebOfficeSDK.config({
          url: res.data.data.wpsUrl, // 该地址需要对接方服务端提供，形如 https://wwo.wps.cn/office/p/xxx
          mount: document.querySelector(".customMount"),
          mode: state != "law" ? "nomal" : "simple",
          // 更多配置参数...
        });
        // wpsUrl.value = res.data.data.wpsUrl;

        // console.log(jssdk.iframem, "2");
        jssdk.value.setToken({
          token: "",
        });
      });
    });
  }

  // console.log(i);

  // // let docUrl = 'https://view.xdocin.com/demo/view.docx'
  // // let url = encodeURIComponent('http://119.91.156.5/download/b390071e-f679-4e00-a8a1-75ade57e79fe生产安全事故应急条例.docx')
  // // pSrc.value = 'http://view.officeapps.live.com/op/view.aspx?src=' + url

  // console.log(url, 99);

  // office web查看器
  // console.log("引入后可以开始使用 JSSDK 了~");
  // console.log(WebOfficeSDK);
};
defineExpose({
  show,
});
</script>

<style lang="less" scoped>
#overlay {
}
.customMount {
  width: 100%;
  // height: 800px;
  height: calc(86vh);
  // background: #bfa;
}
</style>