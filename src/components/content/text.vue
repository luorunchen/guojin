<template>
  <div class="text">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="安全生产管理体检" name="first">
        <div class="textBox">
          <el-row>
            <el-col :span="14">
              <div class="box">
                <h1>智慧安全，全方位守护</h1>
                <el-button type="success" color="#058FFE" @click="(visible = true), medicalFun()">全面体检</el-button>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="imgBox">
                <img src="../../assets/text.png" alt="" />
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- <div class="conter">
          <p>目标职责</p>
          <p>制度化管理</p>
          <p>教育培训</p>
          <p>隐患排查治理</p>
          <p>应急管理</p>
          <p>事故管理</p>
          <p>持续改进</p>
        </div> -->
      </el-tab-pane>
    </el-tabs>
  </div>

  <el-tabs v-model="activeName2" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="五新商店" name="fiveNew">
      <div class="fiveNew" @click="fiveNew">
        <div class="container">
          <img src="../../assets/3.png" alt="" />
          新设备
        </div>
        <div class="container">
          <img src="../../assets/2.png" alt="" />
          新工艺
        </div>

        <div class="container">
          <img src="../../assets/1.png" alt="" />
          新技术
        </div>
        <div class="container">
          <img src="../../assets/4.png" alt="" />
          新材料
        </div>
        <div class="container">
          <img src="../../assets/5.png" alt="" />
          新产品
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>

  <el-dialog v-model="visible" :show-close="false" :before-close="handleClose">
    <template #header="{ close, titleId, titleClass }">
      <el-row class="my-header">
        <el-col :span="3">
          <div class="imgbox">{{ sum }}</div>
          <!-- <img src="../../assets/安全.png" alt="" /> -->
        </el-col>
        <el-col :span="10">
          <h1 :id="titleId">
            {{ percentage == 100 ? "全面体检完成" : "正在全面体检..." }}
          </h1>
          <h4>{{ percentage == 100 ? `本次得分${sum}分` : "" }}</h4>
        </el-col>
        <el-col :span="2" :offset="9">
          <el-button type="danger" @click="close">
            <el-icon class="el-icon--left">
              <CircleCloseFilled />
            </el-icon>
            取消
          </el-button></el-col>
      </el-row>
      <!-- <div >
        <div>
         
         
        </div>

       
      </div> -->
    </template>
    <el-progress :percentage="percentage" :indeterminate="indeterminate" />
    <!-- <div
      v-for="(item, index) in arrList"
      :key="index"
      class="boxs"
      v-show="percentage == 100"
    >
      <el-row>
        <el-col :span="6">
          <h4>{{ item.name }}</h4></el-col
        >
        <el-col :span="4">
          <span>共{{ item.num }}项未完成</span></el-col
        >
      </el-row>
      
    </div> -->
    <el-collapse accordion v-for="(item, index) in arrList" :key="index" v-show="percentage == 100">
      <el-collapse-item name="1">
        <template #title>
          <h4>{{ item.name }}</h4>
          <span style="color: red"> (共{{ item.children.length + item.children2.length }}项,{{ item.num }}项未完成)</span>
        </template>

        <el-table :data="item.children" stripe style="width: 100%">
          <el-table-column type="index" width="50" />
          <el-table-column prop="title" label="标题" />

          <el-table-column prop="address" label="操作">
            <template #default="scope">
              <el-button size="small" type="primary" @click="see(scope.row)">查看</el-button>
              <el-button size="small" type="primary" @click="downloadFileFun(scope.row.url)">下载模板
              </el-button>
              <el-button size="small" type="success" @click="onlineEditing(scope.row)">在线编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <ul v-for="(item2, index2) in item.children" :key="index2">
          <li>{{ item2.title }}</li>
        </ul> -->
      </el-collapse-item>
    </el-collapse>
  </el-dialog>
  <SeeFlie ref="seeFile" />
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { medical } from "@/api/index.js";
import type { TabsPaneContext, ElButton, ElDialog } from "element-plus";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import SeeFlie from "../seeFlie/index.vue";
import { useStore } from "vuex";
const emit = defineEmits(["fiveNewChang"]);
const activeName = ref("first");
const visible = ref(false);
const indeterminate = ref(true);
const activeName2 = ref("fiveNew");
const arrList = ref([]);
const percentage = ref(0);
const sum = ref(100);
const score = ref(100);
const sI: any = ref();
const sumSI: any = ref();
const store = useStore();
const seeFile: any = ref();
onMounted(() => {
  // medicalFun();
});
watch(
  () => percentage.value,
  (val) => {
    // console.log(val, 999);

    if (val >= 100) {
      // console.log("jinlaile");
      // console.log(sI.value);
      indeterminate.value = false;

      window.clearInterval(sI.value);
      // percentage.value = 0;
    }
  }
);
watch(
  () => sum.value,
  (val) => {
    // console.log(val, 999, score.value);

    if (val <= score.value) {
      window.clearInterval(sumSI.value);
      // percentage.value = 0;
      sum.value = score.value
    }
  }
);
const handleClose = (done: () => void) => {
  done();

  window.clearInterval(sI.value);
  window.clearInterval(sumSI.value);
  percentage.value = 0;
  sum.value = 100;
};
const see = (row: any) => {
  seeFile.value.show(row, "law");
};
//下载模板
const downloadFileFun = (url: string) => {
  window.open(url);
};
//在线编辑
const onlineEditing = (row: any) => {
  console.log(row);
  seeFile.value.show(row, "account");
  // getViewUrlDbPath("e" + row.id, sessionStorage.getItem("userId")).then(
  //   (res) => {
  //     window.open(res.data.data.wpsUrl);
  //   }
  // );
};
const fiveNew = () => {
  if (sessionStorage.getItem("userName") == null) {
    // return ElMessage({
    //   showClose: true,
    //   message: "您未登录,请先登录",
    //   type: "warning",
    // });
  }
  emit("fiveNewChang", true);
  let arr = {
    title: '五新商店',
    status: '五新商店',
    id: 10088
    // content: '<EarlyWarning/>'
  }
  store.commit("setMenus", arr);
};
const medicalFun = () => {
  medical(sessionStorage.getItem("evaluation")).then((res) => {
    // console.log(res, 999);
    sI.value = setInterval(() => {
      percentage.value += 5;

      // console.log("结束了吗");
    }, 1000);
    sumSI.value = setInterval(() => {
      sum.value -= 5;
      // console.log("结束了吗");
    }, 1000);
    score.value = res.data.data.score;
    // clearInterval(sI.value);
    let arr = res.data.data.mbInfo;
    let arr2 = res.data.data.tzInfo;
    var newArr = [...new Set(arr.map((i) => i.name))]; // 去重的时候需要注意和普通数组不同
    // 去重的时候需要注意和普通数组不同
    // console.log(newArr, "newarr");
    // console.log(newArr2, "newarr");

    var list = [];

    newArr.forEach((i) => {
      list.push(arr.filter((t) => t.name === i));
    });


    var mlist = [];
    list.forEach((i, index) => {
      mlist.push({
        name: newArr[index],
        num: i.length,
        children: i,
      });
    });
    mlist.forEach(item => {
      item.children2 = []
      // console.log(item.name, 'item');
      arr2.forEach(arr => {
        if (item.name == arr.name) {
          item.children2.push(arr)
        }
        // console.log(arr.name, 'arr');

      })
    })

    arrList.value = mlist;
    console.log(mlist);
  });
};
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>

<style lang="less" scoped>
.textBox {
  // width: 1442px;
  height: 395px;
  background: #d8f1fd;

  .box {
    text-align: center;
    margin-top: 150px;

    h1 {
      margin-bottom: 20px;
      font-size: 52px;
    }

    /deep/.el-button--success {
      width: 211px;
      height: 57px;
      font-size: 20px;
      border-radius: 29px;
    }
  }

  .imgBox {
    img {
      width: 387px;
      height: 386px;
    }
  }

  // line-height: 330px;
}

.my-header {

  // display: flex;
  // flex-direction: row;
  // justify-content: space-between;
  .imgbox {
    text-align: center;
    line-height: 100px;
    font-size: 50px;
    color: #2c7aff;
    width: 100px;
    height: 100px;
    background-image: url("../../assets/安全.png");
    background-size: 100% 100%;
  }

  h1 {
    line-height: 100px;
  }
}

.boxs {
  margin-bottom: 20px;

  img {
    width: 100px;
    height: 100px;
  }

  h4 {
    margin-left: 20px;
  }

  span {
    color: rgb(127, 200, 245);
  }

  p {
    background: #f7f7f7;
    padding: 5px;
  }
}

.conter {
  // height: 80px;
  // background: #bfa;

  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  p {
    font-weight: 600;
    color: #43454d;
    text-align: center;
    line-height: 76px;
    width: 164px;
    height: 76px;
    font-size: 19px;
    background: #d8effd;
    border-radius: 10px;
  }
}

.fiveNew {
  // background: rgb(10, 213, 196);
  display: flex;
  justify-content: space-between;
  line-height: 100px;

  .container {
    width: 280px;
    height: 110px;
    background: #eef1fb;
    text-align: center;
    line-height: 110px;
    border-radius: 10px;
    font-size: 22px;

    img {
      width: 50px;
      height: 50px;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
}

.demo-tabs {
  // width: 98%;
  background: #ffffff;
  box-shadow: 0px 0px 13px 0px #ebebeb;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
  padding-top: 0;

  /deep/.el-tabs__item.is-active {
    font-weight: bold;
    color: #2c7aff;
  }

  ul {
    margin-left: 20px;

    li {
      // margin-top: 20px;

      list-style-type: square;
      margin-bottom: 10px;

      &::marker {
        color: #2c7aff;
      }
    }
  }

  // padding: 32px;
  // color: #6b778c;
  // font-size: 32px;
  // font-weight: 600;
}
</style>