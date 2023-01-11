<template>
  <div id="shipin">
    <el-dialog v-model="dialogVisible" title="设备详情" width="60%">
      <el-row :gutter="20">
        <el-col :span="20">
          <div id="ezuikitTalkData2"></div>
        </el-col>
        <el-col :span="4">
          <h4>云台控制切换其它方向时，请先按中间暂停键</h4>
          <el-row>
            <el-col :span="8">
              <el-button
                round
                :icon="TopLeft"
                @click="directionControl(4)"
              ></el-button
            ></el-col>
            <el-col :span="8"
              ><el-button
                round
                :icon="Top"
                @click="directionControl(0)"
              ></el-button
            ></el-col>
            <el-col :span="8">
              <el-button
                round
                :icon="TopRight"
                @click="directionControl(6)"
              ></el-button
            ></el-col>
            <el-col :span="8"
              ><el-button
                round
                :icon="Back"
                @click="directionControl(2)"
              ></el-button
            ></el-col>
            <el-col :span="8">
              <el-button round :icon="VideoPause" @click="stopTurn"></el-button
            ></el-col>
            <el-col :span="8"
              ><el-button
                round
                :icon="Right"
                @click="directionControl(3)"
              ></el-button
            ></el-col>
            <el-col :span="8">
              <el-button
                round
                :icon="BottomLeft"
                @click="directionControl(5)"
              ></el-button
            ></el-col>
            <el-col :span="8"
              ><el-button
                round
                :icon="Bottom"
                @click="directionControl(1)"
              ></el-button
            ></el-col>
            <el-col :span="8">
              <el-button
                round
                :icon="BottomRight"
                @click="directionControl(7)"
              ></el-button
            ></el-col>
            <!-- <el-col span="8"></el-col> -->
          </el-row>

          <el-row v-if="videoItem.dSid == 49">
            <el-col :span="12" style="margin-top: 10px"
              ><el-button type="primary" @click="vedio(videoItem, 1)"
                >通道一</el-button
              ></el-col
            >
            <el-col :span="12" style="margin-top: 10px"
              ><el-button type="primary" @click="vedio(videoItem, 2)"
                >通道二</el-button
              ></el-col
            >
            <el-col :span="12" style="margin-top: 10px"
              ><el-button type="primary" @click="vedio(videoItem, 3)"
                >通道三</el-button
              ></el-col
            >
            <el-col :span="12" style="margin-top: 10px"
              ><el-button type="primary" @click="vedio(videoItem, 4)"
                >通道四</el-button
              ></el-col
            >
          </el-row>
          <div v-else-if="videoItem.dSid == 48" style="margin-top: 30px">
            <el-button
              type="primary"
              size="mini"
              @click="openFireExtinguisher(productNumber)"
              >{{ openFireExtinguisherMsg ? "启动" : "关闭" }}灭火器</el-button
            >
          </div>
        </el-col>
      </el-row>
    </el-dialog>

    <el-dialog v-model="dataVisible" title="设备详情" width="60%">
      <el-table :data="getNFCInspectionByDevIdList">
        <el-table-column prop="typeName" label="报警类型"> </el-table-column>
        <el-table-column prop="alarmFaultDate" label="报警时间">
        </el-table-column>
        <el-table-column prop="date" label="报警图片">
          <template #default="scope">
            <el-image
              :src="`http://psy119.cn/ctx/devPic//${scope.row.image}.jpg`"
              alt=""
              style='width="300px"; height="300px"'
              :preview-src-list="scope.row.imagesArr"
            />
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作" width="350">
          <template #default="scope">
            <!-- <el-image
                :src="`https://psy119.cn/ctx/devPic//${scope.row.image}.jpg`"
                alt=""
                style='width="300px"; height="300px"'
                :preview-src-list="scope.row.imagesArr"
              /> -->
            <el-button
              type="primary"
              size="mini"
              @click="
                (dialogVisible = true), vedio(scope.row, scope.row.channle)
              "
              >查看摄像头</el-button
            >

            <el-button
              type="primary"
              size="mini"
              @click="FaultHandleClick(scope.row.aFid)"
              >解除报警</el-button
            >
          </template>
        </el-table-column>

        <!-- <el-table-column prop="isMess" label="设备状态"> </el-table-column> -->
      </el-table>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import EZUIKit from "ezuikit-js";
import {
  getvideo,
  getAlarmAndFault,
  WebeditFileimageServlet,
  setFireSwitch,
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
const dataVisible = ref(false);
const openFireExtinguisherMsg = ref(true);
const getNFCInspectionByDevIdList = ref();
const accessToken = ref();
const imei = ref();
const videoItem = ref();
const vedio = (item, num) => {
  console.log(item, num, "item");

  getvideo().then((res) => {
    var items = document.getElementById("ezuikitTalkData2");
    // console.log(res.data.accessToken, "9jhhguj");
    accessToken.value = res.data.accessToken;
    //动态删除多出的子元素;
    while (items.firstChild) {
      // console.log("执行");

      items.removeChild(items.firstChild);
    }
    const deviceSerial = item.productNumber.split("_")[0];
    imei.value = deviceSerial;
    const deviceSerial2 = item.productNumber.split("_")[1];
    let nums = num == undefined ? 1 : num;
    var ezuikitTalkData = {
      accessToken: global.accessToken, // 应用accessToken
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
      accessToken: res.data.accessToken,
      // url: ezuikitTalkData.ezopen, // 这里的url可以是直播地址.live  ，也可以是回放地址.rec 或 .cloud.rec
      url: ezuikitTalkData.ezopen, // 这里的url可以是直播地址.live  ，也可以是回放地址.rec 或 .cloud.rec
      template: "standard", // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
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
const getAlarmAndFaultFun = (item) => {
  getAlarmAndFault(item.productNumber).then((res) => {
    console.log(item, "4848484848");
    getNFCInspectionByDevIdList.value = res.data.data;
    getNFCInspectionByDevIdList.value.forEach((arr) => {
      item.imagesArr = [`http://psy119.cn/ctx/devPic//${arr.image}.jpg`];
      arr.productNumber = item.video;
      // arr.video = item.video;

      //99为自己赋值的视频id
      arr.dSid = 48;
      arr.channle = item.channle;
      // item.
    });
    console.log(getNFCInspectionByDevIdList.value);
  });
};
const FaultHandleClick = (aFid: string) => {
  ElMessageBox.prompt("请填写处置情况", "解除报警", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  }).then(({ value }) => {
    WebeditFileimageServlet(
      sessionStorage.getItem("userName") + "," + aFid,
      value
    ).then((res) => {
      // console.log(res.data);
      if (res.data == null || res.data == undefined || res.data == "") {
        return ElMessage({
          type: "error",
          message: "请稍后重试或联系管理员",
          showClose: true,
        });
      }
      if (res.data.list[0].status == true) {
        // this.innerVisible = false;
        // this.SmartIndependentSmokeDialog = false;
        getAlarmAndFaultFun(videoItem.value);
        return ElMessage({
          type: "success",
          message: "解除报警成功",
          showClose: true,
        });
      }
    });
  });
};
// 启动摄像头灭火器
const openFireExtinguisher = (productNumber) => {
  console.log(productNumber, "启动灭火器");

  setFireSwitch(
    videoItem.value.productNumber,
    openFireExtinguisherMsg ? 1 : 0
  ).then(
    (res) => {
      if (res.data.data == "ok") {
        ElMessage({
          showClose: true,
          type: "success",
          message: "请求成功",
        });
      } else {
        ElMessage({
          showClose: true,
          type: "error",
          message: "请稍后重试或联系管理员",
        });
      }
      openFireExtinguisherMsg.value = !openFireExtinguisherMsg.value;
    },
    (rej) => {
      ElMessage({
        showClose: true,
        type: "error",
        message: "请稍后重试或联系管理员",
      });
    }
  );
};
const show = (item: any) => {
  dialogVisible.value = true;
  videoItem.value = item;
  vedio(item, undefined);
};
const fireData = (item: any) => {
  dataVisible.value = true;
  videoItem.value = item;
  getAlarmAndFaultFun(item);
};
defineExpose({
  show,
  fireData,
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
