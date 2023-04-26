<template>
  <div id="video">
    <el-row :gutter="20">
      <el-col :span="4" v-for="item, index in tableData" :key="index">
        <div class="box">
          <img
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.quanjing.com%2Fff%2Fat%2FQJ6977980548.jpg%40%21350h&refer=http%3A%2F%2Fpic.quanjing.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1675409934&t=a6ff22d5c9ea888e5554f34cc4dbbff7"
            alt="" />
        </div>
        <div class="text">
          <el-link type="primary" @click="details"> 详情 </el-link>
          <el-link type="primary" @click="see(item)"> 查看 </el-link>
        </div>
      </el-col>

    </el-row>

    <el-dialog v-model="dialogVisible" title="详情" width="40%">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="设备名称">
          <el-input v-model="formInline.user" disabled />
        </el-form-item>
        <el-form-item label="设备编号">
          <el-input v-model="formInline.user" disabled />
        </el-form-item>
        <el-form-item label="设备地址">
          <el-input v-model="formInline.user" disabled />
        </el-form-item>
      </el-form>
      <div id="map"></div>
    </el-dialog>
    <el-dialog v-model="videoVisible" title="视频" width="40%">
      <video src="http://119.91.156.5:8080/download/mp3/74c024752138a6f7a1ef978dac75916a.mp4" ref="imgages"
        class="videoBox" controls></video>
    </el-dialog>
    <Shipin ref="shipin" />
  </div>
</template>

<script lang="ts" setup>
import { getCompDeviceList, getVideosById } from '@/api/index.js'
import { ref, reactive, onMounted } from "vue";
import Shipin from "../earlyWarning/popup/info/shipin.vue"
const formInline = reactive({
  user: "XXXX",
  region: "",
});

const tableData = ref([])
const currentPage4 = ref(1)
const pageSize4 = ref(10)

const shipin: any = ref(null);
const dialogVisible = ref(false);
const videoVisible = ref(false);
const props = defineProps({
  status: String,
  companyId: String,
})

onMounted(() => {
  getCompDeviceListFun()
})
const getCompDeviceListFun = () => {
  if (props.status == 'government') {
    getVideosById(props.companyId, 1, 100).then(res => {
      tableData.value = res.data.data;
    })

  } else {
    getCompDeviceList(44, "", currentPage4.value, pageSize4.value).then((res) => {
      tableData.value = res.data.data;
      // total.value = res.data.dataCount;
    });
  }
}

const details = () => {
  dialogVisible.value = true;
};
const see = (item) => {
  shipin.value.show(item, item.type_name);
  // videoVisible.value = true;
};
</script>
<style lang='less' scoped>
#video {
  height: 500px;

  .box {
    // width: 200px;
    height: 200px;
    background: #bfa;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .text {
    display: flex;
    justify-content: space-between;
  }

  .videoBox {
    width: 100%;
  }
}
</style>