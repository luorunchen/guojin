<template>
  <div>
    <div class="box">
      <el-row class="row">
        <el-col :span="4">
          <p>{{ infoData.userCount }}</p>
          <p>缴费用户</p>
        </el-col>
        <el-divider direction="vertical" />
        <el-col :span="4">
          <p>{{ infoData.expireCount }}</p>
          <p>欠费用户</p>
        </el-col>
        <el-divider direction="vertical" />
        <el-col :span="4">
          <p>{{ infoData.online }}</p>
          <p>在线用户</p>
        </el-col>
        <el-divider direction="vertical" />
        <el-col :span="4">
          <p>{{ infoData.addCount }}</p>
          <p>每天新增人数</p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getOnlineCount } from '@/api/index.js'
import { onMounted, ref } from 'vue'
const infoData = ref({})
onMounted(() => {

  let ws = new WebSocket("ws://117.78.22.160:3001");
  let that = this
  ws.onopen = function (result) {

    console.log("客户端连接成功", result);

    // resole()
  }
  ws.onmessage = function (result) {
    console.log("从服务端接受到的消息--->", result.data);
    let message = JSON.parse(result.data)
    let type = message.type;
    let data = message.data
    let callBackId = message.callBackId

  }
  ws.onerror = function (result) {
    console.log("on error", result);
    // reject()
  }
  ws.onclose = function (result) {
    console.log("on close", result);
  }
  getOnlineCount().then(res => {
    infoData.value = res.data.data
  })
})
</script>
<style lang='less' scoped>
.box {
  width: 100%;
  height: 100px;
  box-shadow: 0px 0px 13px 0px #ebebeb;
  border-radius: 4px;
  margin-top: 10px;

  .row {
    text-align: center;

    // line-height: 100px;
    p {
      margin-top: 20px;
      font-size: 20px;

      &:nth-child(2) {
        color: #999;
        font-size: 15px;
      }
    }

    .el-divider--vertical {
      height: 100px;
    }
  }
}
</style>