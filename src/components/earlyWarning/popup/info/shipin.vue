<template>
  <div id="shipin">
    <el-dialog v-model="dialogVisible" :title="typeName" width="60%" destroy-on-close>
      <el-row :gutter="20">
        <el-col :span="20">
          <div id="ezuikitTalkData2"></div>
        </el-col>
        <el-col :span="4">
          <h4>云台控制切换其它方向时，请先按中间暂停键</h4>
          <el-row>
            <el-col :span="8">
              <el-button round :icon="TopLeft" @click="directionControl(4)"></el-button></el-col>
            <el-col :span="8"><el-button round :icon="Top" @click="directionControl(0)"></el-button></el-col>
            <el-col :span="8">
              <el-button round :icon="TopRight" @click="directionControl(6)"></el-button></el-col>
            <el-col :span="8"><el-button round :icon="Back" @click="directionControl(2)"></el-button></el-col>
            <el-col :span="8">
              <el-button round :icon="VideoPause" @click="stopTurn"></el-button></el-col>
            <el-col :span="8"><el-button round :icon="Right" @click="directionControl(3)"></el-button></el-col>
            <el-col :span="8">
              <el-button round :icon="BottomLeft" @click="directionControl(5)"></el-button></el-col>
            <el-col :span="8"><el-button round :icon="Bottom" @click="directionControl(1)"></el-button></el-col>
            <el-col :span="8">
              <el-button round :icon="BottomRight" @click="directionControl(7)"></el-button></el-col>
            <!-- <el-col span="8"></el-col> -->
          </el-row>

          <!-- <el-row v-if="videoItem.dSid == 49">
            <el-col :span="12" style="margin-top: 10px"><el-button type="primary"
                @click="vedio(videoItem, 1)">通道一</el-button></el-col>
            <el-col :span="12" style="margin-top: 10px"><el-button type="primary"
                @click="vedio(videoItem, 2)">通道二</el-button></el-col>
            <el-col :span="12" style="margin-top: 10px"><el-button type="primary"
                @click="vedio(videoItem, 3)">通道三</el-button></el-col>
            <el-col :span="12" style="margin-top: 10px"><el-button type="primary"
                @click="vedio(videoItem, 4)">通道四</el-button></el-col>
          </el-row>
          <div v-else-if="videoItem.dSid == 48" style="margin-top: 30px">
            <el-button type="primary" size="mini" @click="openFireExtinguisher(productNumber)">{{ openFireExtinguisherMsg
              ? "启动" : "关闭" }}灭火器</el-button>
          </div> -->
        </el-col>
      </el-row>
    </el-dialog>

  </div>
</template>

<script lang="ts" setup>
import EZUIKit from "ezuikit-js";
import {
  getVideoAppkey
} from "@/api/index";
import axios from "axios";
import { ref, defineExpose } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import {
  Top,
  Bottom,
  Back,
  Right,
  TopRight,
  TopLeft,
  BottomRight,
  BottomLeft,
  VideoPause,
  Delete,
} from "@element-plus/icons-vue";
const dialogVisible = ref(false);
const typeName = ref('');
const openFireExtinguisherMsg = ref(true);
const getNFCInspectionByDevIdList = ref();
const accessToken = ref();
const imei = ref();
const videoItem = ref();


const vedio = (item) => {
  console.log(item, "item");

  getVideoAppkey().then((res) => {
    var items = document.getElementById("ezuikitTalkData2");
    // // console.log(res.data.accessToken, "9jhhguj");
    accessToken.value = res.data.data;
    //动态删除多出的子元素;
    while (items.firstChild) {
      // console.log("执行");

      items.removeChild(items.firstChild);
    }
    const deviceSerial = item.productNumber.split("_")[0];
    imei.value = item.productNumber.split("_")[0];
    const deviceSerial2 = item.productNumber.split("_")[1];
    let nums = 1
    var ezuikitTalkData = {
      // 应用accessToken
      ezopen:
        "ezopen://" +
        deviceSerial2 +
        "@open.ys7.com/" +
        deviceSerial +
        "/" +
        nums +
        ".hd.live", // 包含设备信息的ezopen协议
      decoderPath: "./", // 当前页面与插件主文件ezuiit-talk相对路径
    };
    new EZUIKit.EZUIKitPlayer({
      autoplay: true,
      id: "ezuikitTalkData2",
      accessToken: res.data.data,
      // url: ezuikitTalkData.ezopen, // 这里的url可以是直播地址.live  ，也可以是回放地址.rec 或 .cloud.rec
      url: ezuikitTalkData.ezopen, // 这里的url可以是直播地址.live  ，也可以是回放地址.rec 或 .cloud.rec
      template: "simple", // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
      // 视频上方头部控件
      header: ["capturePicture", "save"], // 如果templete参数不为simple,该字段将被覆盖
      plugin: ["talk"], // 加载插件，talk-对讲
      // 视频下方底部控件
      footer: ["talk", "broadcast", "hd", "fullScreen"], // 如果template参数不为simple,该字段将被覆盖
      audio: 1, // 是否默认开启声音 0 - 关闭 1 - 开启
      openSoundCallBack: (data) => console.log("开启声音回调", data),
      closeSoundCallBack: (data) => console.log("关闭声音回调", data),
      startSaveCallBack: (data) => console.log("开始录像回调", data),
      stopSaveCallBack: (data) => console.log("录像回调", data),
      capturePictureCallBack: (data) => console.log("截图成功回调", data),
      fullScreenCallBack: (data) => console.log("全屏回调", data),
      getOSDTimeCallBack: (data) => console.log("获取OSDTime回调", data),
      // // width: 100, //如果指定了width、height则以这里为准
      height: 600, //如果没指定宽高，则以容器video-container为准
    });
  });
};
const directionControl = (num) => {
  axios({
    url: "https://open.ys7.com/api/lapp/device/ptz/start",
    method: "post",
    params: {
      accessToken: accessToken.value, //accesstoken码，一般一周过期
      speed: 2, //旋转速度
      direction: num, //方向，传入数字，对应数字在api文档有
      channelNo: 1, // 通道号
      deviceSerial: imei.value, //序列号
    },
    timeout: 2000,
  }).then((res) => {
    // console.log(res.data)
    // if (res.data.code == "60000") {
    // this.$message(res.data.msg);
    ElMessage({
      type: "success",
      message: res.data.msg,
      showClose: true,
    });
    // }
  });
};

const show = (item: any, type_name: String) => {
  dialogVisible.value = true;
  // videoItem.value = item;
  vedio(item);
  typeName.value = `${type_name}设备详情`
};

defineExpose({
  show,

});
</script>
<style scoped lang="less">
#shipin {
  /deep/.el-dialog {
    .el-dialog__header {
      margin-right: 0;
      background: #1071e2;

      .el-dialog__title {
        color: #fff;
      }
    }

    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }

    #ezuikitTalkData2 {
      width: 100%;
      // height: 500px;
    }
  }
}
</style>
