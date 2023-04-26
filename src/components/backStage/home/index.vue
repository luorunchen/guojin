<template>
  <div id="home">
    <div class="title">
      <el-row>
        <el-col :span="5">
          <h2>智慧安全管理后台</h2>
        </el-col>

        <el-col :span="2" :offset="17">
          <!-- <el-link type="primary" :underline="true" @click="out">退出账号</el-link>
                 -->
          <h3>
            <el-dropdown>
              <span class="el-dropdown-link">
                {{ userName }}
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <p class="donw" @click="out">退出</p>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </h3>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span="4">
        <el-menu default-active="2" class="el-menu-vertical-demo" background-color="transparent">
          <el-sub-menu :index="item.id" v-for="(item, index) in rightMenus" :key="index">
            <template #title>
              <template v-if="item.id == '1'">
                <img src="../../../assets/企业@2x.png" />
              </template>
              <template v-if="item.id == '2'">
                <img src="../../../assets/组织机构@2x.png" />
              </template>
              <template v-if="item.id == '3'">
                <img src="../../../assets/tz.png" />
              </template>
              <template v-if="item.id == '4'">
                <img src="../../../assets/ss.png" />
              </template>
              <template v-if="item.id == '5'">
                <img src="../../../assets/sd.png" />
              </template>
              <template v-if="item.id == '6'">
                <img src="../../../assets/sd.png" />
              </template>
              <template v-if="item.id == '7'">
                <img src="../../../assets/gg.png" />
              </template>
              <template v-if="item.id == '8'">
                <img src="../../../assets/set.png" />
              </template>
              <template v-if="item.id == '9'">
                <img src="../../../assets/ss.png" />
              </template>
              <template v-if="item.id == '10'">
                <img src="../../../assets/ss.png" />
              </template>
              <template v-if="item.id == '11'">
                <img src="../../../assets/zxz.png" />
              </template>
              <!-- <template v-if="item.id == '11'">
                <img src="../../../assets/tz.png" />
              </template> -->

              <span>{{ item.name }}</span>
            </template>
            <el-menu-item :index="item2.id" v-for="(item2, index2) in item.children" :key="index2"
              @click="menuItem(item2.name, item2.id)">
              {{ item2.name }}
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <div class="box">
          <h3>
            {{ itemName }}
          </h3>
          <!-- 企业列表 -->
          <EnterpriseList v-if="itemID == '1-1'" />
          <!-- 待审核文件 -->
          <!-- <AuditList v-if="itemID == '9-1'" /> -->
          <!-- 平台资料库 -->
          <Databases v-if="itemID == '3-1'" />
          <!-- 台账列表 -->
          <AccountList v-if="itemID == '4-1'" />
          <!-- 机构列表 -->
          <Mechanism v-if="itemID == '2-1'" />

          <!-- 账号管理 -->
          <UserMange v-if="itemID == '8-1'" :type="1" />
          <UserMange v-if="itemID == '8-2'" :type="2" />
          <UserMange v-if="itemID == '8-3'" :type="3" />
          <UserMange v-if="itemID == '8-4'" :type="4" />
          <!-- 资料库分类管理 -->
          <Classification v-if="itemID == '3-2'" />
          <!-- 台账分类管理 -->
          <AccountClassification v-if="itemID == '4-2'" />
          <!--五新商店待审核 -->
          <Shopdai v-if="itemID == '5-1'" :status="false" />
          <Shopdai v-if="itemID == '5-2'" :status="true" />
          <Guanggao v-if="itemID == '7-1'" />
          <NianfeiSet v-if="itemID == '6-1'" />
          <Weidaoqi v-if="itemID == '6-3'" />
          <Yidaoqi v-if="itemID == '6-2'" />
          <UserInfo v-if="itemID == '9-1'" />
          <TreeForm v-if="itemID == '10-1'" />
          <TakeNotes v-if="itemID == '11-1'" />
        </div>
      </el-col>
    </el-row>


    <div class="cs" @click="visible = true">
      <span>在线咨询</span>
    </div>
    <el-dialog v-model="visible" :show-close="false" width="80%">
      <template #header="{ close, titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">在线咨询</h4>
          <el-button type="danger" @click="close">
            <!-- <el-icon class="el-icon--left">
              <CircleCloseFilled />
            </el-icon> -->
            关闭
          </el-button>
        </div>
      </template>
      <Online />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { getAuditFiles } from "@/api/index";
import { onMounted, ref } from "vue";
import EnterpriseList from "../enterprise/list.vue";
import Mechanism from "../mechanism/list.vue";
import AuditList from "../audit/list.vue";
import Databases from "../databases/index.vue";
import AccountList from "../accountList/index.vue";
import Online from "../online/index.vue";
import TakeNotes from "../online/takeNotes.vue";
import UserMange from "../userMange/index.vue";
import Classification from "../databases/classification.vue";
import AccountClassification from "../accountList/classification.vue";
import Shopdai from "../shop/dai.vue";
import Guanggao from "../guanggao/index.vue";
import NianfeiSet from "../nianfei/set.vue";
import Weidaoqi from "../nianfei/weidaoqi.vue";
import Yidaoqi from "../nianfei/yidaoqi.vue";
import UserInfo from "../userInfo/index.vue";
import TreeForm from "../treeFrom/treeFrom.vue";
import { ArrowDown } from "@element-plus/icons-vue";
import router from "@/router";
import { useStore } from "vuex";
import { ElMessage, ElNotification } from "element-plus";
const store = useStore();
const itemName = ref("企业列表");
const itemID = ref("1-1");
const visible = ref(false);
const userName = sessionStorage.getItem("userName");
const rightMenus = ref([
  {
    id: "1",
    name: "企业列表",
    children: [{ id: "1-1", name: "企业列表", children: [] }],
  },
  // {
  //   id: "9",
  //   name: "待审核文件",
  //   children: [
  //     { id: "9-1", name: "待审核文件", children: [] },
  //     // { id: '9-1', name: "待审核文件", children: [] },
  //   ],
  // },
  {
    id: "2",
    name: "机构列表",
    children: [{ id: "2-1", name: "机构列表", children: [] }],
  },
  {
    id: "3",
    name: "平台资料库",
    children: [
      { id: "3-1", name: "资料列表", children: [] },
      // { id: '3-2', name: "分类管理", children: [] },
    ],
  },
  {
    id: "4",
    name: "台账模板",
    children: [
      { id: "4-1", name: "台账模板列表", children: [] },
      // { id: '4-2', name: "台账分类", children: [] },
    ],
  },
  {
    id: "5",
    name: "五新商店",
    children: [
      { id: "5-1", name: "待审核列表", children: [] },
      { id: "5-2", name: "已审核列表", children: [] },
      // { id: '5-3', name: '分类管理', children: [] },
    ],
  },
  {
    id: "6",
    name: "年费管理",
    children: [
      { id: "6-1", name: "年费设置", children: [] },
      { id: "6-2", name: "已到期用户", children: [] },
      { id: "6-3", name: "未到期用户", children: [] },
    ],
  },
  {
    id: "7",
    name: "广告",
    children: [
      { id: "7-1", name: "广告图", children: [] },
      { id: "7-2", name: "广告视频", children: [] },
      { id: "7-3", name: "滚动条", children: [] },
    ],
  },

  {
    id: "8",
    name: "账号管理",
    children: [
      {
        id: "8-1",
        name: "企业管理",
        children: [],
      },
      {
        id: "8-2",
        name: "机构管理",
        children: [],
      },
      {
        id: "8-3",
        name: "政府管理",
        children: [],
      },
      {
        id: "8-4",
        name: "后台管理",
        children: [],
      },
      // {
      //   id: '8-5', name: "角色权限", children: []
      // },
    ],
  },
  {
    id: "9",
    name: "用户统计",
    children: [{ id: "9-1", name: "用户统计", children: [] }],
  },
  {
    id: "10",
    name: "单位涉及场所",
    children: [{ id: "10-1", name: "单位涉及场所", children: [] }],
  },
  {
    id: "11",
    name: "在线咨询记录",
    children: [{ id: "11-1", name: "在线咨询记录", children: [] }],
  },
  // {
  //   id: "12",
  //   name: "发票管理",
  //   children: [{ id: "12-1", name: "发票开具记录", children: [] }],
  // },
]);

onMounted(() => {
  store.state.goEasy.im.on(GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, onConversationsUpdated);
})
const onConversationsUpdated = (conversations) => {
  console.log(conversations, '首页列表监听');
  if (conversations.unreadTotal > 0
  ) {
    ElNotification({
      title: 'Success',
      message: '您有新的咨询消息',
      type: 'success',
      // position: 'bottom-right',
    })
  }

}
const menuItem = (name: string, id: string) => {
  itemName.value = name;
  itemID.value = id;
};
const out = () => {
  router.push("/backstage");
  sessionStorage.clear();
};
</script>

<style lang="less" scoped>
#home {
  width: calc(100vw);
  height: 99px;
  background: #0165d0;

  .cs {
    width: 80px;
    height: 80px;
    position: fixed;
    bottom: 50px;
    right: 51px;
    z-index: 100;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 100%;
    transition: all 0.2s;
    background: url('../../../assets/iz.png') no-repeat center center #3d96eeb3;
    background-size: 80% 80%;

    span {
      margin-top: 84px;
      font-weight: normal;
      font-size: 15px;
      line-height: 22px;
      text-align: center;
      color: #000;
    }
  }

  .my-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .title {
    width: 100%;
    height: 99px;
    // background: #0165D0;
    background-image: url("../../../assets/title.png");
    background-size: 100% 100%;
    line-height: 99px;
    color: #fff;
    text-align: center;
    font-size: 18px;

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
        margin-right: 20px;
        cursor: pointer;
        padding: 0 8px;
        font-weight: 700;
        font-style: 18px;
        font-size: 20px;
      }
    }

    h3 {
      background: rgba(21, 125, 230, 0.7);
      line-height: 99px;
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

  .el-menu-vertical-demo {
    height: calc(100vh - 99px);
    overflow-y: auto;

    background-image: url("../../../assets/bg.png");
    background-size: 100% 100%;

    &::-webkit-scrollbar {
      display: none;
    }

    // padding-bottom: 100px;
    // box-sizing: border-box;

    // height: calc(100vh - 260px);
    border-right: none; // padding: 10px;

    // background: transparent;
    .font {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    span {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: bold;
      // background: #bfa;
      color: #fff;
    }

    .el-sub-menu {
      /deep/.el-icon {
        color: #fff;
      }

      img {
        width: 20px;
        height: 21px;
        margin-right: 10px;
        // vertical-align: top;
        margin-bottom: 5px;
      }
    }

    .el-menu-item {
      color: #fff;
      // padding-left: 20px;
      padding-left: 60px;
    }

    /deep/.el-sub-menu__title {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: bold;
      background-color: #0165d0;
    }

    /deep/.el-sub-menu.is-active {
      span {
        // background: #bfa;
        color: #fff;
      }

      .el-menu-item.is-active {
        background: #319bff;
        color: #fff;
      }

      /deep/.el-menu-item {
        font-size: 16px;
        font-family: PingFang SC;
        // font-weight: bold;
        color: #fff;
        background: #0165d0; // background: #0165D0;


      }
    }
  }

  .box {
    height: calc(100vh - 99px);
    padding: 20px;
    box-sizing: border-box;
    background: #f6f8f9;
  }

  /deep/.el-table th {
    background: #dcefff;
    color: #000;
  }

  /deep/.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
    background: #f3f9ff;
  }

  /deep/.el-button--primary {
    background: #1f459c;
    border: #1f459c 1px solid;
    border-radius: 4px;
    color: #fff;

    &:active {
      background: #02133a;
    }
  }

  .el-dropdown {
    color: #fff;
    line-height: 99px;
    font-size: 18px;
  }
}

.donw {
  width: 100px;
  text-align: center;
}
</style>

