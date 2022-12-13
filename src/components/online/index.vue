<template>
  <div id="online">
    <p>在线咨询</p>
    <el-row>
      <el-col :span="15">
        <div class="top"></div>
        <div class="bottom">
          <el-input v-model="input" placeholder="Please input" :rows="6" type="textarea">
            <template #append>.com</template>
          </el-input>
          <div class="btn">
            <el-button type="primary">发送</el-button>
          </div>

        </div>
      </el-col>
      <el-col :span="9">
        <div class="left">
          <p>热门问题</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
#online {
  // position: fixed;
  // width: 500px;
  height: 650px;
  background: #fff;
  // z-index: 99;
  // font-size: 20px;
  // right: 30px;
  // bottom: 30px;
  // box-shadow: 0 6px 26px rgb(0 0 0 / 25%);
  border: 2px solid #e4e7ed;
  // border-radius: 10px;

  p {
    line-height: 50px;
    padding-left: 20px;
    // border-bottom: 1px solid #000;
    background: #0165D0;
    color: #fff;

    // border-radius: 10px;

  }

  .top {
    height: 450px;
    border-bottom: 2px solid #e4e7ed;
    border-right: 2px solid #e4e7ed;
    background: rgb(239, 237, 237);
  }

  .bottom {
    height: 200px;
    // border-bottom: 1px solid #000;
    border-right: 2px solid #e4e7ed;
    position: relative;

    .btn {
      position: absolute;
      bottom: 55px;
      z-index: 999;
      right: 2px;
    }
  }

  .left {
    height: 650px;


    p {
      background: #fff;
      color: #000;
      border-bottom: #e4e7ed 1px solid;
    }

    .el-textarea__inner {
      box-shadow: 0px;
      resize: none;
      border: none;

      &:focus {
        border: #000;
      }

    }


  }
}
</style>