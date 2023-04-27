<template>
  <!-- <marquee behavior="scroll" direction="left" bgcolor="red">您可以继续使用本平台30天，到期后平台将自动关闭。请主动续费！</marquee> -->
  <div id="home">


    <el-row>
      <el-col :span="4">
        <img src="../assets/jin.png" alt="" class="imgBox" />
        <div class="menus">
          <!-- <el-button type="primary" color="#1f459c" @click="toggleList">
            安全生产管理列表
          </el-button> -->
          <div class="name">
            <h4> {{ loginName }}</h4>
            <h2>
              安全生产管理系统
            </h2>
          </div>

          <el-menu text-color="#fff" :default-active="activeIndex" class="el-menu-vertical-demo"
            :default-openeds="openeds" :key="key" background-color="transparent">
            <el-sub-menu :index="item.id" v-for="(item, index) in rightMenus" :key="index">
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
                <img src="../assets/ss.png" alt="" v-if="item.id == 20000 || item.id == 20001" />
                <img src="../assets/tz.png" alt="" v-if="item.id == 20003 || item.id == 20002 || item.id == 20004
                  " />
                <img src="../assets/sj.png" alt="" v-if="item.id == 20005" />
                <img src="../assets/hd.png" alt="" v-if="item.id == 20007" />
                <img src="../assets/yj.png" alt="" v-if="item.id == 20006" />
                <img src="../assets/yj.png" alt="" v-if="item.id == 11000" />

                <!-- <span @click="jiance(item.id)" v-if="item.id != 26">{{
                  item.name
                }}</span> -->

                <span @click="nameChange(item.name, item)">{{ item.name }} </span>
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
        <!-- <div>在线人数:1</div> -->
      </el-col>
      <el-col :span="20">
        <div class="title">
          <el-row>







            <el-col :span="20">

              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="transparent"
                text-color="#fff">
                <el-menu-item :class="status == item.id ? 'clickTrue' : 's'" :index="item.id" @click="titleChange(item)"
                  v-for="(item, index) in menu" :key="index"> {{ item.name }}</el-menu-item>

              </el-menu>

              <!-- <ul v-for="(item, index) in menu" :key="index">
                <li @click="titleChange(item)" :class="status == item.id ? 'clickTrue' : 's'">
                  {{ item.name }}
                </li>
              </ul> -->
            </el-col>
            <el-col :span="2" :offset="2">
              <!-- <el-link type="primary" :underline="true" @click="out">退出账号</el-link>
           -->
              <h3 @click="out">{{ loginState }}</h3>
            </el-col>
          </el-row>
        </div>

        <div class="content" ref="content">


          <el-row :gutter="10" class="info">
            <el-col :span="5">
              <el-input v-model="whole" placeholder="关键词">
                <template #append>
                  <el-button type="primary" @click="wholeFun">搜索</el-button>
                </template>
              </el-input>
            </el-col>
            <el-col :span="12">
              <marquee direction="left" onmouseover=this.stop() onmouseout=this.start() height="100%" bgcolor="#f5f5f5"
                scrollamount="4">
                <span class="fontSpan">需要专家组现场隐患排查、安全评价、安全设计、标准化体系咨询、风控体系建设、应急预案编制等服务，请拨打****</span>
              </marquee>
            </el-col>
            <el-col :span="2">
              <el-button text style="font-size:16px;color:#000"> 在线人数:{{ peopleNumber }}</el-button>

            </el-col>
            <el-col :span="2">
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
                    <el-dropdown-item @click="commandChange('企业用户', '1')">企业用户</el-dropdown-item>
                    <el-dropdown-item @click="commandChange('机构用户', '2')">机构用户</el-dropdown-item>
                    <el-dropdown-item @click="commandChange('政府用户', '3')">政府用户</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <el-dropdown v-else>
                <el-button type="primary">
                  <p class="loginName"> {{ loginName }}</p>

                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="information">我的备案信息</el-dropdown-item>

                    <!-- <el-dropdown-item @click="itemID = 10087">我的缴费</el-dropdown-item>
                    <el-dropdown-item @click="itemID = 10087">我的开票信息</el-dropdown-item>
                    <el-dropdown-item @click="itemID = 10087">我的地址信息</el-dropdown-item>
                    <el-dropdown-item @click="itemID = 10087">我的邮箱信息</el-dropdown-item> -->
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-col>
            <!-- <el-col :span="2">
              在线人数:1
            </el-col> -->
          </el-row>

          <div class="tips" v-if="expireDate <= 30">{{ expireDateText }}</div>
          <el-tabs ref="tabBox" class="demo-tabs" v-model="editableTabsValue" type="border-card" closable
            @edit="handleTabsEdit">
            <el-tab-pane v-for="item in editableTabs" :key="item.id" :label="item.title" :name="item.id">

              <template v-if="loginType == '1'">
                <Account :tid="item.id" :status="item.status" :title="item.title"
                  v-if="item.status == '安全生产管理台账' || item.status == '专项台账' || item.status == '风控体系建设' || item.status == '应急预案(备案)'" />
                <!-- 预警检测 -->
                <EarlyWarning v-if="item.status == '监测预警处理'" :pid="item.id" />
                <VideoOnline v-else-if="item.status == '在线巡视'" />
                <!-- 安全生产管理体检 -->
                <Text v-if="item.id == 10089" @fiveNewChang="fiveNewChang" />
              </template>
              <template v-if="loginType == '2'">
                <!-- 机构部分 -->
                <Mechanism :tid="item.id" :boxHeight="boxHeight"
                  v-if="item.status == '风控体系建设' || item.status == '应急预案(备案)' || item.status == '教育培训'" />
                <ServiceArchives v-if="item.status == '机构服务档案'" />
              </template>
              <template v-if="loginType == '3'">
                <!-- 政府部分 -->
                <GovernmentQuery :tid="item.id" :boxHeight="boxHeight"
                  v-if="item.status == '机构备案查询' || item.status == '企业备案查询' || item.status == '企业台账查询' || item.status == '企业现场查询'" />
                <!-- 政府数据分析 -->
                <DataAnalysis :tid="item.id" :boxHeight="boxHeight" v-if="item.id == 20001" />
                <!-- <Yizhangtu :tid="item.id" :boxHeight="boxHeight" v-if="item.id == 20002" /> -->
              </template>
              <!-- 首页 -->
              <HomePage v-if="item.id == 10086" @fiveNewChang="fiveNewChang" />

              <DirectSeeding v-if="item.status == '网络直播'" />
              <Vedio v-if="item.status == '直播间'" :message="item.id" />

              <!--用户信息 -->
              <UserInfo v-if="item.id == 10087" :boxHeight="boxHeight" />

              <!-- 五新商店 -->
              <FiveNew v-if="item.id == 10088" />
              <Whole v-if="item.status == '全局搜索'" :tid="item.id" />
              <ElectronicLicense v-else-if="item.status == '电子证照'" :tid="item.id" />

              <Online v-else-if="item.status == '在线咨询'" />
              <HiddenDanger v-else-if="item.status == '隐患排查治理'" :id="item.id" />




              <Law :tid="item.id" :boxHeight="boxHeight" v-if="item.status.split('-')[0] == '资料库'"
                :titleChangeName="item.status.split('-')[1]" />
            </el-tab-pane>
          </el-tabs>
          <!-- <el-tabs ref="tabBox" v-model="activeName" class="demo-tabs"> -->
          <!-- <el-tab-pane :label="itemName" name="first"> -->

          <!-- 企业部分 -->
          <!-- <template v-if="loginType == '1'"> -->

          <!-- 预警检测 -->




          <!-- </template> -->


          <!-- </el-tab-pane> -->
          <!-- </el-tabs> -->

          <!-- 法律法规显示部分 -->
          <!-- <el-tabs ref="tabBox" v-model="activeName" class="demo-tabs"
            v-else-if="titleChangeName != '首页' && itemID < 10086">
            <el-tab-pane :label="itemName" name="first">

            </el-tab-pane>
          </el-tabs> -->






        </div>
      </el-col>
    </el-row>

    <div class="bottom">
      <div class="inputBox">
        <!-- <el-select v-model="value" class="m-2" placeholder="Select" size="large">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select> -->
        <el-select placeholder="全国应急管理系统" @change="skipFun" teleported="false" placement="top">
          <el-option :label="item.name" :value="item.value" v-for="item, index in bottom.one" :key="index"
            teleported="false" placement="top" />
        </el-select>
        <el-select placeholder="应急管理厅直属单位" @change="skipFun">
          <el-option :label="item.name" :value="item.value" v-for="item, index in bottom.two" :key="index">
          </el-option>
        </el-select>
        <el-select placeholder="市级应急管理部门" @change="skipFun">
          <el-option :label="item.name" :value="item.value" v-for="item, index in bottom.three" :key="index" />
        </el-select>
        <el-select placeholder="其他链接" @change="skipFun">
          <el-option :label="item.name" :value="item.value" v-for="item, index in bottom.four" :key="index" />
        </el-select>
        <el-select placeholder="相关系统" @change="skipFun" placement="top">
          <el-option :label="item.name" :value="item.value" v-for="item, index in bottom.five" :key="index" />
        </el-select>
      </div>
      <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          
        </el-form-item>
        <el-form-item>
         
        </el-form-item>
        <el-form-item>
         
        </el-form-item>
        <el-form-item>
          
        </el-form-item>
        <el-form-item>
         
        </el-form-item>
      </el-form> -->

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
          <p>备案：浙ICP备2023004010号</p>

        </el-col>
        <el-col :span="7">
          <p>联系我们</p>
          <p>邮箱：syjglt@zj.gov.cn</p>
          <p>(仅受理本网站相关事宜)</p>
          <p>地址：温州市体育场路47号</p>
        </el-col>
        <el-col :span="5">

          <div class="info">
            <div style="margin-right: 10px;">
              <p>安卓客户端</p>

              <el-image style="width: 100px; height: 100px" :src="require('../assets/app.png')" :zoom-rate="1.2"
                :initial-index="4" fit="cover"
                :preview-src-list="[require('../assets/app.png'), require('../assets/weiixn.jpg')]" />
            </div>
            <div>
              <p>微信小程序端</p>
              <el-image style="width: 100px; height: 100px" :src="require('../assets/weiixn.jpg')"
                :preview-src-list="[require('../assets/weiixn.jpg'), require('../assets/app.png')]" :zoom-rate="1.2"
                :initial-index="4" fit="cover" />
            </div>



          </div>
          <!-- <div class="imgBox">
            <p>移动端</p>
            <img src="../assets/app.png" alt="">

          </div> -->

        </el-col>
      </el-row>
    </div>
    <el-badge :value="unreadTotal" class="cs" @click="zixun">
      <!-- <div> -->

      <span>在线咨询</span>

      <!-- <p>有消息</p> -->
      <!-- </div> -->

    </el-badge>

    <el-dialog v-model="visible" :show-close="false" width="75%">
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

<script setup lang="ts">
import { getList, logout, getStandList, delLive } from "@/api/index.js";
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
import ServiceArchives from "../components/mechanism/serviceArchives.vue";
import EarlyWarning from "../components/earlyWarning/earlyWarning.vue";
import VideoOnline from "../components/videoOnline/index.vue";
import ElectronicLicense from "../components/electronicLicense/index.vue";
import GovernmentQuery from "../components/government/query/query.vue";
import DataAnalysis from "../components/government/dataAnalysis/index.vue";
import Yizhangtu from "../components/government/dataAnalysis/yizhangtu.vue";
import HiddenDanger from "../components/hiddenDanger/index.vue";
import DirectSeeding from "../components/directSeeding/index.vue";
import Vedio from "../components/directSeeding/list.vue";
import Whole from "../components/whole/index.vue";
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
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";

// const Law = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '../components/flieList/Law/index.vue')
const select = ref("企业用户");
const menu: any = ref([]);
const status = ref(10086);
const earlyWarning = ref();
const loginState = ref("登录");
const activeIndex = ref();
const disabled = ref(false);
const visible = ref(false);
const openeds = ref([]);
const itemID = ref(10086);
const activeName = ref("first");
const itemName = ref();
// const vedioId = ref();
const boxHeight = ref();
const expireDateText = ref();
const tabBox = ref(null);
const content = ref(null);
const loginName = sessionStorage.getItem("userName");
const rightMenus: any = ref([]);
const StandList: any = ref([]);
const loginType = ref();
const whole = ref();
const titleChangeName = ref("首页");
const key = ref(1);
const store = useStore();
// const store = useStore();
const peopleNumber = ref()
const elementName = ref()
const expireDate = ref(Number(sessionStorage.getItem('Arrears')))
const unreadTotal = ref()
const evaluationValue = ref()
let tabIndex = 2
const editableTabsValue = ref(10086)
const editableTabs = ref([
  {
    title: '首页',
    id: 10086,
    status: '首页',
  },

])


const bottom = ref({
  one: [
    { name: '天津市应急管理局', value: 'http://yjgl.tj.gov.cn/' },
    { name: '上海市应急管理局', value: 'http://yjglj.sh.gov.cn/' },
    { name: '重庆市应急管理局', value: 'http://yjj.cq.gov.cn/' },
    { name: '河北省应急管理厅', value: 'http://yjgl.hebei.gov.cn/' },
    { name: '河南省应急管理厅', value: 'http://yjglt.henan.gov.cn/' },
    { name: '云南省应急管理厅', value: 'http://yjglt.yn.gov.cn/' },
    { name: '辽宁省应急管理厅', value: 'http://yjgl.ln.gov.cn/' },
    { name: '黑龙江省应急管理厅', value: 'http://yjgl.hlj.gov.cn/' },
    { name: '湖南省应急管理厅', value: 'http://yjt.hunan.gov.cn/' },
    { name: '安徽省应急管理厅', value: 'http://yjt.ah.gov.cn/' },
    { name: '山东省应急管理厅', value: 'http://yjt.shandong.gov.cn/' },
    { name: '新疆维吾尔自治区应急管理厅', value: 'http://yjgl.xinjiang.gov.cn/' },
    { name: '江苏省应急管理厅', value: 'http://ajj.jiangsu.gov.cn/' },
    { name: '江西省应急管理厅', value: 'http://yjglt.jiangxi.gov.cn/' },
    { name: '湖北省应急管理厅', value: 'http://yjt.hubei.gov.cn/' },
    { name: '广西壮族自治区应急管理厅', value: 'http://yjglt.gxzf.gov.cn/' },
    { name: '甘肃省应急管理厅', value: 'http://yjgl.gansu.gov.cn/' },
    { name: '山西省应急管理厅', value: 'http://yjt.shanxi.gov.cn/' },
    { name: '内蒙古自治区应急管理厅', value: 'http://yjglt.nmg.gov.cn/' },
    { name: '陕西省应急管理厅', value: 'http://yjt.shaanxi.gov.cn/' },
    { name: '吉林省应急管理厅', value: 'http://yjt.jl.gov.cn/' },
    { name: '福建省应急管理厅', value: 'https://yjt.fujian.gov.cn/' },
    { name: '贵州省应急管理厅', value: 'http://yjgl.guizhou.gov.cn/' },
    { name: '广东省应急管理厅', value: 'http://yjgl.gd.gov.cn/' },
    { name: '青海省应急管理厅', value: 'http://yjt.qinghai.gov.cn/' },
    { name: '西藏自治区应急管理厅', value: 'http://yjt.xizang.gov.cn/' },
    { name: '四川省应急管理厅', value: 'https://yjt.sc.gov.cn/' },
    { name: '宁夏回族自治区应急管理厅', value: 'http://nxyjglt.nx.gov.cn/' },
    { name: '海南省应急管理厅', value: 'http://yjglt.hainan.gov.cn/' }
  ],
  two: [
    {
      name: '浙江省应急管理科学研究院', value: 'https://yjt.zj.gov.cn/art/2021/11/9/art_1229226095_40352.html'
    },
    {
      name: '浙江省应急管理宣传教育中心 ', value: 'https://yjt.zj.gov.cn/art/2021/11/9/art_1229226095_40325.html'
    },
    {
      name: '浙江省航空护林管理站 ', value: 'https://yjt.zj.gov.cn/art/2021/11/9/art_1229226095_40320.html'
    },

    {
      name: '浙江省工业企业安全在线', value: 'https://gkaqsc.yjt.zj.gov.cn/dist/#/login'
    },
    {
      name: '消防管理系统云平台', value: 'http://fire.tpson.com.cn/login'
    },
  ],
  three: [
    {
      name: '杭州市应急管理局',
      value: 'http://safety.hangzhou.gov.cn/'
    },
    {
      name: '宁波市应急管理局',
      value: 'http://yjglj.ningbo.gov.cn/'
    },
    {
      name: '温州市应急管理局',
      value: 'http://yjglj.wenzhou.gov.cn/'
    },
    {
      name: '湖州市应急管理局',
      value: 'http://yjglj.huzhou.gov.cn/'
    },
    {
      name: '嘉兴市应急管理局',
      value: 'http://yjglj.jiaxing.gov.cn/'
    },
    {
      name: '绍兴市应急管理局',
      value: 'http://ajj.sx.gov.cn/'
    },
    {
      name: '金华市应急管理局',
      value: 'http://yjglj.jinhua.gov.cn/'
    },
    {
      name: '衢州市应急管理局',
      value: 'http://yjj.qz.gov.cn/'
    },
    {
      name: '舟山市应急管理局',
      value: 'http://zsyj.zhoushan.gov.cn/'
    },
    {
      name: '台州市应急管理局',
      value: 'http://yjglj.zjtz.gov.cn/'
    },
    {
      name: '丽水市应急管理局',
      value: 'http://yjj.lishui.gov.cn/'
    },
  ],
  four: [
    { name: "省发改委", value: "http://fzggw.zj.gov.cn/" },
    { name: "省经信厅", value: "http://jxt.zj.gov.cn/" },
    { name: "省教育厅", value: "http://jyt.zj.gov.cn/" },
    { name: "省科技厅", value: "https://kjt.zj.gov.cn/" },
    { name: "省公安厅", value: "http://gat.zj.gov.cn/" },
    { name: "省监察厅", value: "http://www.zjsjw.gov.cn/" },
    { name: "省民政厅", value: "http://mzt.zj.gov.cn/" },
    { name: "省司法厅", value: "http://sft.zj.gov.cn/" },
    { name: "省财政厅", value: "http://czt.zj.gov.cn/" },
    { name: "省人力社保厅", value: "http://rlsbt.zj.gov.cn/" },
    { name: "省自然资源厅", value: "http://zrzyt.zj.gov.cn/" },
    { name: "省生态环境厅", value: "http://sthjt.zj.gov.cn/" },
    { name: "省建设厅", value: "http://jst.zj.gov.cn/" },
    { name: "省交通运输厅", value: "http://jtyst.zj.gov.cn/" },
    { name: "省水利厅", value: "http://slt.zj.gov.cn/" },
    { name: "省农业农村厅", value: "http://nynct.zj.gov.cn/" },
    { name: "省商务厅", value: "http://www.zcom.gov.cn/" },
    { name: "省文化和旅游厅", value: "http://ct.zj.gov.cn/" },
    { name: "省审计厅", value: "http://sjt.zj.gov.cn/" },
    { name: "省国资委", value: "http://gzw.zj.gov.cn/" },
    { name: "省市场监管局", value: "http://zjamr.zj.gov.cn/" },
    { name: "省统计局", value: "http://tjj.zj.gov.cn/" }
  ],
  five: [
    {
      name: '洪水预警', value: 'https://www.zj.gov.cn/zjyhzx/member/login/gotoother.do?code=zjrmzfmh&amp;src=http://slt.zj.gov.cn/col/col1675635/index.html'
    },
    {
      name: '气象网站', value: 'https://www.zj.gov.cn/zjyhzx/member/login/gotoother.do?code=zjrmzfmh&src=http://zj.weather.com.cn/'
    },
    {
      name: '潮汐预报', value: 'https://www.zj.gov.cn/zjyhzx/member/login/gotoother.do?code=zjrmzfmh&src=http://www.zj.msa.gov.cn/ZJ/ggfw/sjfw/hssk/chaoxi/?tdsourcetag=s_pctim_aiomsg'
    },
  ]
})
const formInline = reactive({
  user: "",
  region: "",
});
onMounted(() => {
  loginType.value = sessionStorage.getItem("loginType");
  getListFun("1");
  getStandListFun();
  if (sessionStorage.getItem("userName") != null) {
    loginState.value = "退出登录";
  }

  // let expireDate = 
  // console.log(expireDate, 'expireDate');

  // expireDate.value = moment(sessionStorage.getItem('expireDate')).diff(moment(), 'day')
  // sessionStorage.setItem('Arrears', expireDate.value)

  // // console.log(expireDate.value);
  if (expireDate.value <= 30 && expireDate.value > 0) {

    expireDateText.value = `您可以继续使用本平台${expireDate.value}天，到期后平台将自动关闭。请主动续费！`
  } else if (expireDate.value == 0) {
    expireDateText.value = `您还未登录，请登录后使用本平台！`
  } else {
    expireDateText.value = `您已欠费${expireDate.value * -1}天，请缴费后使用本平台！`
  }
  const webSocket = new WebSocket('ws://119.91.156.5:8080/gjsafe/ws/server');

  webSocket.onopen = function () {
    console.log('WebSocket open');
    webSocket.send('Hello, WebSocket!');
  };

  webSocket.onmessage = function (event) {
    console.log(`接收人数`, event.data.substr(event.data.indexOf(':') + 1));
    peopleNumber.value = event.data.substr(event.data.indexOf(':') + 1)
  };

  webSocket.onclose = function (event) {
    console.log(`WebSocket close: ${event.code} ${event.reason}`);
  };

  webSocket.onerror = function (event) {
    console.error('WebSocket error', event);
  };
  store.state.goEasy.im.on(GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, onConversationsUpdated);
});
watch(
  () => [store.state.menuID, store.state.menuName],
  (val) => {
    // if (sessionStorage.getItem("userName") == null) {
    //   return ElMessage({
    //     showClose: true,
    //     message: "您未登录,请先登录",
    //     type: "warning",
    //   });
    // }
    // if (Number(sessionStorage.getItem("Arrears")) < 0) {
    //   return ElMessage({
    //     showClose: true,
    //     message: "您已欠费,请续费后继续使用本平台",
    //     type: "warning",
    //   });
    // }
    // console.log(val, "vuex");
    itemName.value = val[1];
    itemID.value = val[0];
    // status.value = val[0];
    sessionStorage.setItem("tid", val[0]);
  }
);

watch(
  () => store.state.menus,
  (val) => {
    // console.log(val, 'menus');
    // console.log(val, '我是val');
    if (sessionStorage.getItem("userName") == null) {
      return ElMessage({
        showClose: true,
        message: "您未登录,请先登录",
        type: "warning",
      });
    }
    if (Number(sessionStorage.getItem("Arrears")) < 0) {
      return ElMessage({
        showClose: true,
        message: "您已欠费,请续费后继续使用本平台",
        type: "warning",
      });
    }
    if (val.id === 20002) {
      let pathInfo = router.resolve({ path: "/statistics" });
      // sessionStorage.clear()
      window.open(pathInfo.href, "_blank");
      return
    }
    editableTabs.value.push(val)
    console.log(val, 'vlaue');

    const map = new Map();
    editableTabs.value = editableTabs.value.filter(v => !map.has(v.id) && map.set(v.id, 1));
    editableTabsValue.value = val.id
  }
);

const skipFun = (e) => {
  // console.log(e);
  window.open(e, "_blank");
}
const onConversationsUpdated = (conversations) => {
  console.log(conversations, '首页列表监听');


  let arr = conversations.conversations.filter(item => {
    return item.type == 'cs'
  })
  let num = 0
  arr.forEach(element => {
    num += element.unread
  });
  unreadTotal.value = num == 0 ? '' : num
  if (num > 0
  ) {

    ElNotification({
      title: 'Success',
      message: '您有新的咨询消息',
      type: 'success',
      // position: 'bottom-right',
    })
  }

}
const digui = (arr) => {
  // console.log(arr, 'arr');
  if (arr.children.length > 0) {
    arr.children.forEach(element => {
      // console.log(element, '987');
      element.status = elementName.value
      digui(element)
    });
  }
  if (elementName.value == '安全生产管理台账') {
    arr.children.forEach(element => {

      if (sessionStorage.getItem('evaluation') == element.id) {
        console.log(element, '987');

        evaluationValue.value = element
        // console.log(StandList.value[0].children, 'value');

        // StandList.value[0].children = element
      }
      // element.status = elementName.value
      // digui(element)
    });

  }

}

const wholeFun = () => {
  if (whole.value == '') return
  let arr = {
    title: '全局搜索',
    status: '全局搜索',
    id: whole.value,
  }
  store.commit("setMenus", arr);
}
const information = () => {


  let arr = {
    title: '我的备案信息',
    id: 10087,
    status: '我的备案信息',

  }
  store.commit("setMenus", arr);
  // editableTabsValue.value = 10087
}
const fiveNewChang = (value) => {
  itemID.value = 10088;
};
//头部标题的点击事件
const titleChange = (item: any) => {
  // console.log("点击", item.name, "这里");
  // earlyWarning.value = "标题栏";

  //刷新左侧展示状态
  key.value++;
  titleChangeName.value = item.name;
  console.log(titleChangeName.value, 'titleChangeName.value');

  if (sessionStorage.getItem("userName") == null) {
    return ElMessage({
      showClose: true,
      message: "您未登录,请先登录",
      type: "warning",
    });
  }
  if (Number(sessionStorage.getItem("Arrears")) < 0) {
    return ElMessage({
      showClose: true,
      message: "您已欠费,请续费后继续使用本平台",
      type: "warning",
    });
  }
  //标题栏高亮显示
  status.value = item.id;

  if (item.id == 10086) {
    itemID.value = item.id;
    getStandListFun();
    store.commit("setmenuName", "首页");
    store.commit("setmenuID", item.id);
    let arr = {
      title: '首页',
      id: 10086,
      status: '首页',

    }
    store.commit("setMenus", arr);
    openeds.value = [];
  } else {
    rightMenus.value = [item];
    openeds.value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 56, 59];
  }

};

//第一层标题点击事件
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
        // "机构服务查询",
        "企业备案查询",
        "企业台账查询",
        "企业现场查询",
        "数据分析",
        "在线执法",
        "政府互动",
        "安全管理一张图"
        // "在线咨询",
      ];
      rightMenus.value = [
        {
          id: 801,
          parent_id: 233,
          is_parent: 0,
          name: "机构备案查询",
          status: "机构备案查询",
          children: [
            {
              id: 901,
              parent_id: 233,
              is_parent: 0,
              name: "机构备案查询",
              status: "机构备案查询",
              children: [],
            },
          ],
        },
        // {
        //   id: 802,
        //   parent_id: 233,
        //   is_parent: 0,
        //   name: "机构服务查询",
        //   children: [
        //     {
        //       id: 902,
        //       parent_id: 233,
        //       is_parent: 0,
        //       name: "机构服务查询",
        //       children: [],
        //     },
        //   ],
        // },
        {
          id: 803,
          parent_id: 233,
          is_parent: 0,
          name: "企业备案查询",
          status: "企业备案查询",
          children: [
            {
              id: 903,
              parent_id: 233,
              is_parent: 0,
              name: "企业备案查询",
              status: "企业备案查询",
              children: [],
            },
          ],
        },
        {
          id: 804,
          parent_id: 233,
          is_parent: 0,
          name: "企业台账查询",
          status: "企业台账查询",
          children: [
            {
              id: 904,
              parent_id: 233,
              is_parent: 0,
              name: "企业台账查询",
              status: "企业台账查询",
              children: [],
            },
          ],
        },
        {
          id: 805,
          parent_id: 233,
          is_parent: 0,
          name: "企业现场查询",
          status: "企业现场查询",
          children: [
            {
              id: 905,
              parent_id: 233,
              is_parent: 0,
              name: "企业现场查询",
              status: "企业现场查询",
              children: [],
            },
          ],
        },
        {
          id: 806,
          parent_id: 233,
          is_parent: 0,
          name: "数据分析",
          status: "数据分析",
          children: [
            {
              id: 20001,
              parent_id: 233,
              is_parent: 0,
              name: "数据分析",
              status: "数据分析",
              children: [],
            },

          ],
        },
        {
          id: 807,
          parent_id: 233,
          is_parent: 0,
          name: "在线执法",
          status: "在线执法",
          children: [
            {
              id: 907,
              parent_id: 233,
              is_parent: 0,
              name: "在线执法",
              status: "在线执法",
              children: [],
            },
          ],
        },

        {
          id: 808,
          parent_id: 233,
          is_parent: 0,
          name: "政府互动",
          status: "政府互动",
          children: [
            {
              id: 908,
              parent_id: 233,
              is_parent: 0,
              name: "政府互动",
              status: "政府互动",
              children: [],
            },
          ],
        },
        {
          id: 809,
          parent_id: 233,
          is_parent: 0,
          name: "安全管理一张图",
          status: "安全管理一张图",
          children: [
            {
              id: 20002,
              parent_id: 233,
              is_parent: 0,
              name: "安全管理一张图",
              status: "安全管理一张图",
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
      status: '安全生产管理体检',
      children: [
        {
          id: 10089,
          parent_id: 233,
          is_parent: 0,
          name: "安全生产管理体检",
          status: '安全生产管理体检',
          children: [],
        },
      ],
    });
  }
  if (type == "2") {
    rightMenus.value.unshift({
      id: 11000,
      parent_id: 233,
      is_parent: 0,
      name: "机构服务档案",
      status: '机构服务档案',
      children: [
        {
          id: 11001,
          parent_id: 233,
          is_parent: 0,
          name: "机构服务档案",
          status: '机构服务档案',
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

    menu.value.splice(2, 0, menu.value[9], menu.value[10])
    // menu.value.splice(4, 0, menu.value[11])
    console.log(menu.value, 'sss');
    menu.value.pop()
    menu.value.pop()
    menu.value.unshift({
      id: 10086,
      parent_id: 233,
      is_parent: 1,
      name: "首页",
      children: [],
    });
    // if (sessionStorage.getItem('loginType') == '1') {
    res.data.data[0].children.forEach(element => {
      // console.log(element, 'element');
      elementName.value = `资料库-${element.name}`
      digui(element)
    });
    // }

  });
};
const getStandListFun = () => {
  // if (sessionStorage.getItem('userName') == null) {
  //   return
  // }
  // let arr = []
  getStandList().then((res) => {

    // console.log(sessionStorage.getItem("loginType"), 87);
    res.data.data[0].children.forEach(element => {
      // console.log(element, 'element');
      elementName.value = element.name
      digui(element)


    });
    // console.log(res.data.data[0].children, 'res');
    StandList.value = res.data.data[0].children;

    // if(loginType.value != '3')

    if (sessionStorage.getItem("userName") != null && loginType.value == '1') {
      delete StandList.value[0].children

      StandList.value[0].children = evaluationValue.value.children
    }


    // console.log(evaluationValue.value.children, 'sss');

    // StandList.value[0].children = evaluationValue.value
    // console.log(StandList.value[0], 'value');
    // key.value++

    typeSwitch(
      sessionStorage.getItem("loginType") == null
        ? "1"
        : sessionStorage.getItem("loginType")
    );
  });

};
const handleTabsEdit = (targetName: any, action: 'remove' | 'add') => {
  // console.log(targetName, 'targetName')
  if (action === 'remove') {
    const tabs = editableTabs.value
    let activeName = editableTabsValue.value

    // console.log(editableTabsValue.value, '987');

    // console.log(tabs.length, 'tabs');

    if (targetName === 10086) {
      return ElMessage({
        showClose: true,
        message: '首页不支持关闭',
        type: 'warning'
      })
    }


    // console.log(typeof (targetName), 'typeof (targetName)');
    // console.log(typeof (JSON.parse('sss')), 'typeof (targetName)');

    if (typeof (targetName) === 'string') {
      // let message = JSON.parse(targetName)

      try {
        var message = JSON.parse(targetName);
        if (typeof message == 'object' && message) {
          if (message.userId == sessionStorage.getItem('userId')) {
            // ElMessageBox
            ElMessageBox.confirm(
              '是否确定关闭直播',
              '关闭直播',
              {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
              }
            )
              .then(() => {

                delLive(message.roomId).then(res => {
                  if (res.data.code == 200) {

                    // console.log(activeName, targetName, 'sdsadsada');
                    store.state.goEasy.pubsub.publish({
                      channel: message.roomId,//替换为您自己的channel
                      message: JSON.stringify({ type: 'off', "nickname": sessionStorage.getItem('userName'), message: '主播已关闭直播' }),//替换为您想要发送的消息内容
                      onSuccess: function () {
                        console.log("消息发布成功。");
                      },
                      onFailed: function (error) {
                        console.log("消息发送失败，错误编码：" + error.code + " 错误信息：" + error.content);
                      }
                    });
                    // vedioId.value = message.roomId
                    store.commit('setVedio', message.roomId)
                    if (activeName === targetName) {
                      tabs.forEach((tab, index) => {
                        console.log(tab, 'tab');

                        if (tab.id === targetName) {
                          const nextTab = tabs[index + 1] || tabs[index - 1]
                          if (nextTab) {
                            activeName = nextTab.id
                          }
                        }
                      })
                    }

                    editableTabsValue.value = activeName
                    editableTabs.value = tabs.filter((tab) => tab.id !== targetName)
                    ElMessage({
                      type: 'success',
                      message: '关闭成功',
                    })
                  }
                })


                // console.log(targetName, 'targetName直播间');




              })

            return
            // console.log('执行你');


          }
          return true;
        }

      } catch (e) {


      }



    }
    // console.log(typeof (targetName), 'typeof (targetName)');


    // return

    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        console.log(tab, 'tab');

        if (tab.id === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.id
          }
        }
      })
    }
    // console.log(targetName, 'targetName直播间');


    editableTabsValue.value = activeName
    editableTabs.value = tabs.filter((tab) => tab.id !== targetName)
  }
}
//左边栏的点击事件
const menuClick = (name: string, index: any) => {


  if (sessionStorage.getItem("userName") == null) {
    return ElMessage({
      showClose: true,
      message: "您未登录,请先登录",
      type: "warning",
    });
  }
  if (Number(sessionStorage.getItem("Arrears")) < 0) {
    return ElMessage({
      showClose: true,
      message: "您已欠费,请续费后继续使用本平台",
      type: "warning",
    });
  }
  itemName.value = name;
  itemID.value = index;
};
const zixun = () => {
  if (sessionStorage.getItem("userName") == null) {
    return ElMessage({
      showClose: true,
      message: "您未登录,请先登录",
      type: "warning",
    });
  }
  if (Number(sessionStorage.getItem("Arrears")) < 0) {
    return ElMessage({
      showClose: true,
      message: "您已欠费,请续费后继续使用本平台",
      type: "warning",
    });
  }
  visible.value = true
}
const out = () => {

  if (sessionStorage.getItem("userName") != null) {
    logout();
    store.state.goEasy.disconnect({
      onSuccess: function () {
        console.log("GoEasy disconnect successfully.")
      },
      onFailed: function (error) {
        console.log("Failed to disconnect GoEasy, code:" + error.code + ",error:" + error.content);
      }
    })
  }
  router.push("/login");
  sessionStorage.clear();
};
const backstage = () => {
  let pathInfo = router.resolve({ path: "/backstage" });
  sessionStorage.clear()

  window.open(pathInfo.href, "_blank");
};
defineComponent({
  name: "CustumVue",
  components: { Menu, Law },
});
</script>

<style lang="less" scoped>
.el-menu--horizontal .el-menu .el-menu-item,
.el-menu--horizontal .el-menu .el-sub-menu__title {
  background-color: #0165d0;
}

#home {
  width: calc(100vw);
  height: calc(100vh);
  // box-sizing: border-box;
  overflow: hidden;

  .imgBox {
    width: 100%;
    height: 100px;
  }

  .my-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

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
    background: url('../assets/iz.png') no-repeat center center #3d96eeb3;
    background-size: 80% 80%;

    span {
      margin-top: 84px;
      font-weight: normal;
      font-size: 15px;
      line-height: 22px;
      text-align: center;
      color: #fff;
    }
  }


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

    // ul {
    //   // margin-top: 10px;

    //   li {
    //     float: left;
    //     list-style: none;
    //     margin-right: 15px;
    //     cursor: pointer;
    //     padding: 0 13px;
    //     font-weight: 700;

    //     font-size: 16px;
    //   }
    // }

    h3 {
      background: rgba(21, 125, 230, 0.7);
      line-height: 80px;
      cursor: pointer;
    }

    h4 {
      // line-height: 0;
      // margin-top: 30px;
      line-height: 80px;
    }

    .clickTrue {
      background: #f6f8f9;
      color: #157de6;
      // border-radius: 5px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }



    /deep/.el-menu-demo {
      border-bottom: none;
      margin-top: 10px;





      .el-menu-item {
        border-bottom: none;
        margin-right: 15px;
        cursor: pointer;
        padding: 0 13px;
        font-weight: 700;
        line-height: 80px;
        font-size: 16px;
        min-width: 60px;

        &:hover {
          background: none;
        }





      }
    }


  }

  .menus {
    overflow-y: auto;
    height: calc(100vh - 274px);
    // height: 640px;
    margin-top: -5px;
    background-image: url("../assets/bg.png");
    background-size: 100% 100%;
    // background-color: #DAE3F3;

    &::-webkit-scrollbar {
      display: none;
    }

    .name {
      padding: 10px 0;
      background: #b7cbee;
      // color: #000;
      text-align: center;
      color: #000;
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
        font-size: 16px;
        // font-family: PingFang SC;
        font-weight: 900;
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
        font-size: 16px;
        font-family: PingFang SC;
        // font-weight: bold;
        background-color: #409eff;
        height: 35px;
        color: fff;

        span {
          width: 75%;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //用省略号显示
          white-space: nowrap; //不换行
        }
      }

      /deep/.el-sub-menu.is-active {
        // span {
        //   // background: #bfa;
        //   color: #000;
        // }

        .el-menu-item.is-active {
          background: #fff;
          color: #409eff;
          height: 35px;
        }
      }

      /deep/.el-menu-item {
        font-size: 16px;
        font-family: PingFang SC;
        // font-weight: bold;
        color: #fff;
        height: 35px;
        // padding: 0;
        // background: #319bff; // background: #0165D0;

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

    }
  }

  .loginName {
    width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis
  }

  .content {
    background: #f6f8f9;
    height: calc(100vh - 260px);
    overflow-x: hidden; // padding: 10px;
    // margin-left: 15px;
    // margin-right: 20px;
    // box-sizing: border-box;
    border-radius: 5px;
    // padding: 10px 20px 10px 20px;
    font-weight: 500;
    color: #333333;

    // overflow: auto;
    // /deep/.el-tabs__nav-wrap {
    //   background: #dcefff;
    // }

    .fontSpan {
      vertical-align: sub;
      font-weight: 900;
      font-size: 20px;
    }

    .info {
      padding: 10px 20px 0px 20px;
      margin-bottom: 5px;
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

  .tips {
    background: #FFDEDE;
    color: #FE3838FF;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 900;
    text-indent: 2em;

    padding: 5px 0;
  }

  .demo-tabs {
    // width: 98%;
    background: #ffffff;
    box-shadow: 0px 0px 13px 0px #ebebeb;
    border-radius: 4px;
    // padding: 10px;
    margin-bottom: 10px;
    // margin-top: 10px;
    padding-top: 0;
    // padding-bottom: 20px;
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

  /deep/.el-tabs--border-card>.el-tabs__content {
    padding-bottom: 10px;
  }

  .bottom {
    // height: 180px;
    background: #125589;
    color: #b1cde3;
    font-size: 14px;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    width: 100%;

    // padding-top: 20px;
    .inputBox {
      display: flex;
      justify-content: space-around;
      margin: 10px 0;

      /deep/.el-select {
        .el-input__wrapper {
          background: #276596;
          box-shadow: none;

          .el-input__inner {
            color: #b1cde3;
          }
        }

        width:19.4%;
      }
    }

    /deep/.el-form-item {
      width: 20%;
      margin-right: 0;
      margin-top: 10px;
      margin-bottom: 5px;


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

      .info {
        display: flex;

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

  /deep/.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
    background: #f3f9ff;
  }
}
</style>
