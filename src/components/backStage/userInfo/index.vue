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
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getOnlineCount } from '@/api/index.js'
import { onMounted, ref } from 'vue'
const infoData = ref({})
onMounted(() => {
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