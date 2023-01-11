<template>
  <!-- <marquee behavior="scroll" direction="left" bgcolor="red">您可以继续使用本平台30天，到期后平台将自动关闭。请主动续费！</marquee> -->
  <div id="home">
    <div class="title">
      <el-row>
        <el-col :span="4">
          <h2>智慧安全管理平台</h2>
        </el-col>
        <el-col :span="18">
          <ul v-for="(item, index) in menu" :key="index">
            <li
              @click="titleChange(item)"
              :class="status == item.id ? 'clickTrue' : 's'"
            >
              {{ item.name }}
            </li>
          </ul>
        </el-col>
        <el-col :span="2">
          <!-- <el-link type="primary" :underline="true" @click="out">退出账号</el-link>
           -->
          <h3 @click="out">{{ loginState }}</h3>
        </el-col>
      </el-row>
    </div>

    <el-row>
      <el-col :span="4">
        <div class="menus">
          <!-- <el-button type="primary" color="#1f459c" @click="toggleList">
            安全生产管理列表
          </el-button> -->
          <img src="../assets/jin.png" alt="" />

          <el-menu
            text-color="#fff"
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
            unique-opened
          >
            <el-sub-menu
              :index="item.id"
              v-for="(item, index) in rightMenus"
              :key="index"
            >
              <template #title>
                <img src="../assets/tz.png" alt="" v-if="item.id == 2" />
                <img src="../assets/tz.png" alt="" v-if="item.id == 10089" />
                <img src="../assets/ss.png" alt="" v-if="item.id == 5" />
                <img src="../assets/zx.png" alt="" v-if="item.id == 8" />
                <img src="../assets/yh.png" alt="" v-if="item.id == 11" />
                <img src="../assets/fk.png" alt="" v-if="item.id == 14" />
                <img src="../assets/yj.png" alt="" v-if="item.id == 17" />
                <img src="../assets/pj.png" alt="" v-if="item.id == 20" />
                <img src="../assets/xs.png" alt="" v-if="item.id == 23" />
                <img src="../assets/xs.png" alt="" v-if="item.id == 29" />
                <img src="../assets/yj.png" alt="" v-if="item.id == 26" />
                <img src="../assets/zb.png" alt="" v-if="item.id == 32" />
                <img src="../assets/zxz.png" alt="" v-if="item.id == 35" />
                <img src="../assets/pj.png" alt="" v-if="item.id == 440" />
                <img
                  src="../assets/ss.png"
                  alt=""
                  v-if="item.id == 20000 || item.id == 20001"
                />
                <img
                  src="../assets/tz.png"
                  alt=""
                  v-if="
                    item.id == 20003 || item.id == 20002 || item.id == 20004
                  "
                />
                <img src="../assets/sj.png" alt="" v-if="item.id == 20005" />
                <img src="../assets/hd.png" alt="" v-if="item.id == 20007" />
                <img src="../assets/yj.png" alt="" v-if="item.id == 20006" />

                <!-- <span @click="jiance(item.id)" v-if="item.id != 26">{{
                  item.name
                }}</span> -->

                <span @click="nameChange(item.name, item)"
                  >{{ item.name }} <el-badge v-if="item.id == 26" :value="1"
                /></span>
              </template>

              <template v-for="(arr, index2) in item.children" :key="index2">
                <!-- <el-menu-item v-if="arr.is_parent == 0" :index="arr.id" @click="menuClick(arr.name, arr.id)"
                  :disabled="disabled">
                  <p class="font">{{ arr.name }}</p>
                </el-menu-item> -->
                <Menu :menus="arr" @sss="menuClick" />
              </template>
            </el-sub-menu>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="content" ref="content">
          <el-row :gutter="10">
            <el-col :span="5">
              <el-input v-model="input2" placeholder="关键词">
                <template #append>
                  <el-button type="primary">搜索</el-button>
                </template>
              </el-input>
            </el-col>
            <el-col :span="2" :offset="14">
              <el-button type="primary" @click="backstage">系统设置</el-button>
            </el-col>
            <el-col :span="2">
              <el-dropdown v-if="loginName == null">
                <el-button type="primary">
                  {{ select }}
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="commandChange('企业用户', '1')"
                      >企业用户</el-dropdown-item
                    >
                    <el-dropdown-item @click="commandChange('机构用户', '2')"
                      >机构用户</el-dropdown-item
                    >
                    <el-dropdown-item @click="commandChange('政府用户', '3')"
                      >政府用户</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <el-dropdown v-else>
                <el-button type="primary">
                  {{ loginName }}
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="itemID = 10087"
                      >备案信息</el-dropdown-item
                    >
                    <el-dropdown-item @click="itemID = 10087"
                      >设置</el-dropdown-item
                    >
                    <el-dropdown-item @click="itemID = 10087"
                      >我的缴费</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-col>
          </el-row>

          <el-tabs
            ref="tabBox"
            v-model="activeName"
            class="demo-tabs"
            v-if="titleChangeName == '首页' && itemID < 10086"
          >
            <el-tab-pane :label="itemName" name="first">
              <!-- {{ earlyWarning }}12 -->
              <!-- 企业部分 -->
              <template v-if="loginType == '1'">
                <!-- 预警检测 -->

                <EarlyWarning v-if="store.state.parentId == 26" />

                <!-- 预警检测 -->

                <ElectronicLicense v-else-if="earlyWarning == '电子证照'" />
                <VideoOnline v-else-if="earlyWarning == '在线巡视'" />
                <Online v-else-if="earlyWarning == '在线咨询'" />

                <!-- 台账部分 -->
                <Account :tid="itemID" :boxHeight="boxHeight" v-else />
              </template>
              <!-- 机构部分 -->
              <template v-if="loginType == '2'">
                <Mechanism :tid="itemID" :boxHeight="boxHeight" />
              </template>
            </el-tab-pane>
          </el-tabs>

          <el-tabs
            ref="tabBox"
            v-model="activeName"
            class="demo-tabs"
            v-else-if="titleChangeName != '首页' && itemID < 10086"
          >
            <el-tab-pane :label="itemName" name="first">
              <Law :tid="itemID" :boxHeight="boxHeight" />
            </el-tab-pane>
          </el-tabs>

          <!-- 安全生产管理体检 -->
          <Text v-if="itemID == 10089" @fiveNewChang="fiveNewChang" />
          <!-- 首页 -->
          <HomePage v-if="itemID == 10086" @fiveNewChang="fiveNewChang" />
          <!-- 用户信息 -->
          <UserInfo v-if="itemID == 10087" :boxHeight="boxHeight" />
          <!-- 五新商店 -->
          <FiveNew v-if="itemID == 10088" />
        </div>
      </el-col>
    </el-row>

    <div class="bottom">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-select v-model="formInline.region" placeholder="Activity zone">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.region" placeholder="Activity zone">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.region" placeholder="Activity zone">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.region" placeholder="Activity zone">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.region" placeholder="Activity zone">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>

      <el-row :gutter="10">
        <el-col :span="4">
          <div class="imgBox">
            <div><img src="../assets/6.png" alt="" /></div>

            <img src="../assets/7.png" alt="" />
          </div>
        </el-col>
        <el-col :span="6">
          <p>网站标识</p>
          <p>主办：浙江省应急管理厅</p>
          <p>网站标识码：3300000038</p>
          <p>备案：浙ICP备20002351号-1</p>
          <p>浙公网安备 33010602010709号</p>
        </el-col>
        <el-col :span="7">
          <p>联系我们</p>
          <p>邮箱：syjglt@zj.gov.cn</p>
          <p>(仅受理本网站相关事宜)</p>
          <p>地址：温州市体育场路47号</p>
          <p>中文域名：浙江省应急管理厅政务</p>
        </el-col>
        <el-col :span="5">
          <p>新媒体</p>
          <!-- <img src="../assets/6.png" alt="">
          <img src="../assets/6.png" alt=""> -->
          <!-- <img src="../assets/6.png" alt=""> -->
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getList, logout, getStandList } from "@/api/index.js";
import router from "@/router/index";
import Law from "../components/flieList/Law/index.vue";
import Account from "../components/flieList/Account/index.vue";
import FlieList from "../components/flieList/Law/index.vue";
import HomePage from "../components/content/homePage.vue";
import Text from "../components/content/text.vue";
import UserInfo from "../components/userInfo/index.vue";
import FiveNew from "../components/fiveNew/index.vue";
import Online from "../components/online/index.vue";
import Menu from "../components/menu/index.vue";
import Mechanism from "../components/mechanism/list.vue";
import EarlyWarning from "../components/earlyWarning/earlyWarning.vue";
import VideoOnline from "../components/videoOnline/index.vue";
import ElectronicLicense from "../components/electronicLicense/index.vue";
import {
  onMounted,
  ref,
  reactive,
  defineComponent,
  watch,
  nextTick,
} from "vue";

import { useStore } from "vuex";

import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  ArrowDown,
} from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
const select = ref("企业用户");
const menu: any = ref([]);
const status = ref(10086);
const earlyWarning = ref();
const loginState = ref("登录");
const activeIndex = ref();
const disabled = ref(false);

const itemID = ref(10086);
const activeName = ref("first");
const itemName = ref();
const boxHeight = ref();
const tabBox = ref(null);
const content = ref(null);
const loginName = sessionStorage.getItem("userName");
const rightMenus: any = ref([]);
const StandList: any = ref([]);
const loginType = ref();
const titleChangeName = ref("首页");
const store = useStore();
let tabIndex = 2;

const formInline = reactive({
  user: "",
  region: "",
});
onMounted(() => {
  loginType.value = sessionStorage.getItem("loginType");
  getListFun("1");
  if (sessionStorage.getItem("userName") != null) {
    loginState.value = "退出登录";
  }
});
watch(
  () => [store.state.menuID, store.state.menuName],
  (val) => {
    if (sessionStorage.getItem("userName") == null) {
      return ElMessage({
        showClose: true,
        message: "您未登录,请先登录",
        type: "warning",
      });
    }
    // console.log(val, "vuex");
    itemName.value = val[1];
    itemID.value = val[0];
    // status.value = val[0];
    sessionStorage.setItem("tid", val[0]);
  }
);
watch(
  () => itemID.value,
  (val) => {
    if (val != 10086) {
      nextTick(() => {
        let box2 = content.value.clientHeight;
        if (val < 10086) {
          let box3 = tabBox.value.$el;
          box3.style.height = box2 - 100 + "px";
        }

        boxHeight.value = box2 - 150;

        // console.log(box2, box3, "box");
      });
    }

    // console.log(val);
  }
);

const fiveNewChang = (value) => {
  itemID.value = 10088;
};
//标题的点击事件
const titleChange = (item: any) => {
  console.log("点击", item.name, "这里");
  // earlyWarning.value = "标题栏";

  titleChangeName.value = item.name;

  if (sessionStorage.getItem("userName") == null) {
    return ElMessage({
      showClose: true,
      message: "您未登录,请先登录",
      type: "warning",
    });
  }
  //标题栏高亮显示
  status.value = item.id;

  if (item.id == 10086) {
    itemID.value = item.id;

    store.commit("setmenuName", "首页");
    store.commit("setmenuID", item.id);
  }

  if (item.name == "首页") {
    getStandListFun();
  } else {
    rightMenus.value = [item];
  }

  activeIndex.value = item.id;
};

const nameChange = (name, item) => {
  // console.log(name, 888, item);

  earlyWarning.value = name;
};

//状态切换
const typeSwitch = (type) => {
  let arr;
  rightMenus.value = [];
  switch (type) {
    case "1":
      arr = [
        "安全生产管理台账",
        "专项台账",
        "隐患排查治理",
        "风控体系建设",
        "监测预警处理",
        "电子证照",
        "应急预案(备案)",
        "评价报告",
        "在线巡视",
        "网络直播",
        "在线咨询",
      ];
      break;
    case "2":
      arr = [
        "教育培训",
        "隐患排查治理",
        "风控体系建设",
        "应急预案(备案)",
        "评价报告",
        "在线咨询",
      ];
      break;
    case "3":
      arr = [
        "机构备案查询",
        "机构服务查询",
        "企业备案查询",
        "企业台账查询",
        "企业现场查询",
        "数据分析",
        "在线执法",
        "政府互动",
        "在线咨询",
      ];
      rightMenus.value = [
        {
          id: 20000,
          parent_id: 233,
          is_parent: 0,
          name: "机构备案查询",
          children: [
            {
              id: 20000,
              parent_id: 233,
              is_parent: 0,
              name: "机构备案查询",
              children: [],
            },
          ],
        },
        {
          id: 20001,
          parent_id: 233,
          is_parent: 0,
          name: "机构服务查询",
          children: [
            {
              id: 20001,
              parent_id: 233,
              is_parent: 0,
              name: "机构服务查询",
              children: [],
            },
          ],
        },
        {
          id: 20002,
          parent_id: 233,
          is_parent: 0,
          name: "企业备案查询",
          children: [
            {
              id: 20002,
              parent_id: 233,
              is_parent: 0,
              name: "企业备案查询",
              children: [],
            },
          ],
        },
        {
          id: 20003,
          parent_id: 233,
          is_parent: 0,
          name: "企业台账查询",
          children: [
            {
              id: 20003,
              parent_id: 233,
              is_parent: 0,
              name: "企业台账查询",
              children: [],
            },
          ],
        },
        {
          id: 20004,
          parent_id: 233,
          is_parent: 0,
          name: "企业现场查询",
          children: [
            {
              id: 20004,
              parent_id: 233,
              is_parent: 0,
              name: "企业现场查询",
              children: [],
            },
          ],
        },
        {
          id: 20005,
          parent_id: 233,
          is_parent: 0,
          name: "数据分析",
          children: [
            {
              id: 20005,
              parent_id: 233,
              is_parent: 0,
              name: "数据分析",
              children: [],
            },
          ],
        },
        {
          id: 20006,
          parent_id: 233,
          is_parent: 0,
          name: "在线执法",
          children: [
            {
              id: 20006,
              parent_id: 233,
              is_parent: 0,
              name: "在线执法",
              children: [],
            },
          ],
        },
        {
          id: 20007,
          parent_id: 233,
          is_parent: 0,
          name: "政府互动",
          children: [
            {
              id: 20007,
              parent_id: 233,
              is_parent: 0,
              name: "政府互动",
              children: [],
            },
          ],
        },
      ];
      break;
    default:
      arr = [
        "安全生产管理台账",
        "专项台账",
        "隐患排查治理",
        "风控体系建设",
        "监测预警处理",
        "电子证照",
        "应急预案(备案)",
        "评价报告",
        "在线巡视",
        "网络直播",
        "在线咨询",
      ];
      break;
  }

  StandList.value.forEach((element) => {
    arr.forEach((item) => {
      if (element.name == item) {
        rightMenus.value.push(element);
      }
    });
  });
  if (type == "1") {
    rightMenus.value.unshift({
      id: 10089,
      parent_id: 233,
      is_parent: 0,
      name: "安全生产管理体检",
      children: [
        {
          id: 10089,
          parent_id: 233,
          is_parent: 0,
          name: "安全生产管理体检",
          children: [],
        },
      ],
    });
  }
};
//切换用户
const commandChange = (e, data) => {
  typeSwitch(data);
  select.value = e;
};
const getListFun = (parent_id: string) => {
  getList(parent_id).then((res: any) => {
    menu.value = res.data.data[0].children;
    menu.value.unshift({
      id: 10086,
      parent_id: 233,
      is_parent: 1,
      name: "首页",
      children: [],
    });
    getStandListFun();
  });
};
const getStandListFun = () => {
  // if (sessionStorage.getItem('userName') == null) {
  //   return
  // }

  getStandList().then((res) => {
    StandList.value = res.data.data[0].children;
    console.log(sessionStorage.getItem("loginType"), 87);
    typeSwitch(
      sessionStorage.getItem("loginType") == null
        ? "1"
        : sessionStorage.getItem("loginType")
    );
  });
};

//左边栏的点击事件
const menuClick = (name: string, index: any) => {
  console.log("哪里");

  if (sessionStorage.getItem("userName") == null) {
    return ElMessage({
      showClose: true,
      message: "您未登录,请先登录",
      type: "warning",
    });
  }

  itemName.value = name;
  itemID.value = index;
};

const out = () => {
  router.push("/login");
  sessionStorage.clear();
  if (sessionStorage.getItem("userName") != null) logout();
};
const backstage = () => {
  let pathInfo = router.resolve({ path: "/backstage" });
  // sessionStorage.clear()
  window.open(pathInfo.href, "_blank");
};
defineComponent({
  name: "CustumVue",
  components: { Menu },
});
</script>

<style lang="less" scoped>
#home {
  width: calc(100vw);

  .title {
    width: 100%;
    height: 80px;
    // background: #0165D0;
    background-image: url("../assets/title.png");
    background-size: 100% 100%;
    line-height: 80px;
    color: #fff;
    text-align: center;
    font-size: 16px;

    // h2 {
    //   // background: rgba(21, 125, 230, 0.7);
    //   line-height: 99px;
    //   // cursor: pointer;
    // }

    ul {
      margin-top: 10px;

      li {
        float: left;
        list-style: none;
        margin-right: 15px;
        cursor: pointer;
        padding: 0 13px;
        font-weight: 700;

        font-size: 16px;
      }
    }

    h3 {
      background: rgba(21, 125, 230, 0.7);
      line-height: 80px;
      cursor: pointer;
    }

    .clickTrue {
      background: #f6f8f9;
      color: #157de6;
      // border-radius: 5px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
  }

  .menus {
    overflow-y: auto;
    height: calc(100vh - 280px);

    background-image: url("../assets/bg.png");
    background-size: 100% 100%;

    &::-webkit-scrollbar {
      display: none;
    }

    // padding-bottom: 100px;
    // box-sizing: border-box;

    img {
      width: 100%;
      height: 100px;
    }

    .el-menu {
      // height: calc(100vh - 260px);
      border-right: none; // padding: 10px;

      // background: transparent;
      .font {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      span {
        font-size: 15px;
        font-family: PingFang SC;
        font-weight: bold;
        // background: #bfa;
        color: #fff;
        height: 35px;
        line-height: 35px;
      }
      .otd {
        padding-left: 80px;
      }
      /deep/.el-badge__content--danger {
        vertical-align: top;
      }
      .el-sub-menu {
        //
        img {
          width: 14px;
          height: 14px;
          margin-right: 10px;
          // vertical-align: top;
          // margin-bottom: 5px;
        }
      }

      /deep/.el-sub-menu__title {
        font-size: 15px;
        font-family: PingFang SC;
        // font-weight: bold;
        background-color: #0165d0;
        height: 35px;

        span {
          width: 75%;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //用省略号显示
          white-space: nowrap; //不换行
        }
      }

      /deep/.el-sub-menu.is-active {
        span {
          // background: #bfa;
          color: #fff;
        }

        .el-menu-item.is-active {
          background: #319bff;
          color: #fff;
          height: 35px;
        }
      }

      /deep/.el-menu-item {
        font-size: 14px;
        font-family: PingFang SC;
        // font-weight: bold;
        color: #fff;
        height: 35px;
        // padding: 0;
        background: #0165d0; // background: #0165D0;
        span {
          width: 75%;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //用省略号显示
          white-space: nowrap; //不换行
        }

        // p {
        //   padding-left: 20px;
        // }
      }

      // /deep/.el-submenu__title {
      //   display: flex;
      //   align-items: center;
      // }
      // /deep/.el-submenu__title span {
      //   white-space: normal;
      //   word-break: break-all;
      //   line-height: 20px;
      //   flex: 1;
      //   padding-right: 20px;
      // }

      // /deep/.el-menu-item {
      //   display: flex;
      //   align-items: center;
      //   padding-right: 20px !important;
      // }
      // /deep/.el-menu-item span {
      //   white-space: normal;
      //   word-break: break-all;
      //   line-height: 20px;
      //   flex: 1;
      // }
    }
  }

  .content {
    background: #f6f8f9;
    height: calc(100vh - 280px);
    padding: 10px;
    // margin-left: 15px;
    // margin-right: 20px;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 10px 20px 10px 20px;
    font-weight: 500;
    color: #333333;
    overflow: auto;

    /deep/.el-button--primary {
      background: #1f459c;
      border: #1f459c 1px solid;
      border-radius: 4px;
      color: #fff;

      &:active {
        background: #02133a;
      }
    }

    // /deep/.el-button--success {
    //   background: #4ec76b;
    //   border: #4ec76b 1px solid;
    //   border-radius: 4px;
    //   // &:active {
    //   //   background: #02133a;
    //   // }
    // }
    /deep/.el-button--danger {
      background: #cd4646;
      border: #cd4646 1px solid;
      border-radius: 4px;

      &:active {
        background: #800707;
      }
    }
  }

  .demo-tabs {
    width: 98%;
    background: #ffffff;
    box-shadow: 0px 0px 13px 0px #ebebeb;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;
    margin-top: 10px;
    padding-top: 0;
    // height: calc(100vh - 180px);
  }

  /deep/.el-drawer {
    // background: #6aabc5;
    .el-drawer__header {
      margin-bottom: 0;
    }

    .el-drawer__title {
      font-size: 20px;
      font-weight: bold;
      color: #000;
    }
  }

  .bottom {
    height: 200px;
    background: #125589;
    color: #b1cde3;
    font-size: 14px;
    box-sizing: border-box;
    /deep/.el-form-item {
      width: 20%;
      margin-right: 0;
      margin-top: 10px;

      .el-select {
        .el-input__wrapper {
          background: #276596;
          box-shadow: none;

          .el-input__inner {
            color: #b1cde3;
          }
        }

        width: 98%;
      }
    }

    .el-row {
      // margin-top: 20px;

      .imgBox {
        text-align: center;

        img {
          width: 52px;
          // height: 63px;

          &:nth-child(2) {
            width: 113px;
            height: 57px;
          }
        }
      }

      p {
        margin-bottom: 5px;

        &:nth-child(1) {
          font-weight: bold;
        }
      }
    }
  }

  /deep/.el-table th {
    background: #dcefff;
    color: #000;
  }

  /deep/.el-table--striped
    .el-table__body
    tr.el-table__row--striped
    td.el-table__cell {
    background: #f3f9ff;
  }
}
</style>
