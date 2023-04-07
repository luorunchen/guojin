<template>
  <div id="baoj">
    <el-dialog v-model="alarmVisible" title="报警详情" width="25%">
      <audio controls ref="audio" id="audio" v-show="false" loop>
        <source src="./assets/6709.mp3" />
      </audio>
      <p>设备编号:{{ content.productNumber }}</p>
      <p>设备类型:{{ content.typeName }}</p>
      <p>报警名称:{{ content.alarmName }}</p>
      <p>安装位置:{{ content.installLocation }}</p>
      <el-button type="danger" @click="seeInfo">查看设备详情</el-button>
    </el-dialog>
  </div>
  <IntegratedMachine ref="integratedMachine" />
  <router-view />
</template>
<script setup lang="ts">

import { onMounted, ref, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import IntegratedMachine from './components/earlyWarning/popup/IntegratedMachine.vue'
const alarmVisible = ref(false)
const content: any = ref({})
const audo: any = ref({})
const userID: any = ref(sessionStorage.getItem("userId"))
const store = useStore();
const integratedMachine: any = ref()
const router = useRouter();
const goEasy = ref()
watch(() => sessionStorage.getItem('companyId'), (val) => {
  console.log(val, 'appdeval');

})
watch(
  () => alarmVisible.value,
  (value, old) => {
    nextTick(() => {
      // countDown.value = 30;
      audo.value = document.getElementById("audio");
      console.log(value);

      if (value == true) {
        console.log('进来了');

        // this.$nextTick(() => {
        // setTimeout(() => {

        audo.value.play();
        // serInt.value = setInterval(() => {
        //   countDown.value--;
        //   // console.log("执行");
        // }, 1000);
      } else {
        audo.value.pause();
        // clearInterval(serInt.value);
      }
    });
    // console.log(value, old, "sNum改变了");
  }
);

watch(
  () => router.currentRoute.value.path,
  (toPath) => {
    //要执行的方法
    console.log(toPath, "toPath");
    if (toPath !== "/login") {
      // getLatestTrendst();
      // goEasyFun();
      userID.value = sessionStorage.getItem("userId");
      console.log(userID.value, 'sssss');

    } else {
      userID.value = '1'
    }
  }
  // { immediate: true, deep: true }
);

watch(() => userID.value, (val) => {
  // console.log(val, 'valsss');
  if (val != '1') connect()


})
onMounted(() => {
  goEasyFun()
  connect()
})


const seeInfo = () => {
  integratedMachine.value.show(content.value.devId)
}

// })

const connect = () => {

  console.log(userID.value, 'sss123123s');
  if (userID.value == null) return
  goEasy.value.connect({
    id: userID.value,
    data: { "type": "front", "nickname": sessionStorage.getItem('userName') },
    onSuccess: function () {
      //连接成功
      console.log("GoEasy connect successfully."); //连接成功
    },
    onFailed: function (error) {
      //连接失败
      console.log(
        "Failed to connect GoEasy, code:" +
        error.code +
        ",error:" +
        error.content
      );
    },
    onProgress: function (attempts) {
      //连接或自动重连中
      console.log("GoEasy is connecting", attempts);
    },
  });



  goEasy.value.pubsub.subscribe({

    channel: userID.value, //替换为您自己的channel

    onMessage: function (message) {

      if (message.content == 'flush') {
        return
      }
      alarmVisible.value = true
      // const res = message.content;
      // const arr = res.split(",");
      console.log(message);
      content.value = JSON.parse(message.content)
      console.log(JSON.parse(message.content));

    },
    onSuccess: function (message) {
      console.log("Channel订阅成功。");
      // this.dialogVisible = true;
    },
    onFailed: function (error) {
      console.log(
        "Channel订阅失败, 错误编码：" +
        error.code +
        " 错误信息：" +
        error.content
      );
    },
  });
}
const goEasyFun = () => {

  goEasy.value = GoEasy.getInstance({
    host: 'hangzhou.goeasy.io', //应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
    // appkey: 'BC-aa1e988f1d754c658b3910afdba54284', //替换为您的应用appkey
    appkey: 'BC-073ef4a8a5b044cfaa3999150662c094', //替换为您的应用appkey
    modules: ['pubsub', 'im']
  })
  store.commit("setgoEasy", goEasy.value);



};
</script>

<style lang="less" >
#baoj {
  .el-dialog__header {
    padding: 0;
    background: #4c0e25;
    border: #b81c7f 1px solid;
    border-bottom: none;
    margin-right: 0;
  }

  .el-dialog__body {
    background: #4c0e25;
    color: #fff;
    padding: 10px 20px;
    border: #b81c7f 1px solid;
    border-top: none;

    p {
      margin-bottom: 10px;
    }
  }

  .el-dialog__title {
    width: 255px;
    height: 30px;
    background: linear-gradient(90deg, #812145, #4c0e25);
    color: #fff;
    margin: 15px 0 0 15px;
    display: inline-block;
    padding-left: 10px;
    line-height: 30px;
  }



  .el-dialog__footer {
    padding: 0;
  }

  .el-button {
    width: 100%;
  }

  .el-button--primary {
    background: #1f459c;
    border: #1f459c 1px solid;
    border-radius: 4px;
    color: #fff;

    &:active {
      background: #02133a;
    }
  }
}


* {
  padding: 0;
  margin: 0;
  // font-size: 18px;
}

ul {
  list-style: none;
}

body::-webkit-scrollbar {
  display: none;
}

.amap-sug-result {
  // position: absolute;
  z-index: 10000 !important // .auto-item {
  // background: #1f459c;
  // }
}

.el-descriptions__label {
  white-space: nowrap
}

.el-form-item__label {
  white-space: nowrap
}



.el-drawer.rtl {
  //
  // .infoBox{

  // }
  .el-drawer__title {
    font-size: 25px;
    color: #000;
    text-align: center;
  }

  .el-drawer__header {
    // background: #bfa;
    margin-bottom: 10px;
  }


  .el-drawer__body {
    padding: 0px;
  }

  .pdf {
    height: calc(90vh);
  }
}
</style>
