<template>
  <div id="earlyWarning" ref="earlyWarning">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="设备号">
        <el-input v-model="formInline.user" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="设备类型">
        <el-select v-model="formInline.region" placeholder="请选择">
          <el-option
            v-for="(item, index) in typeList"
            :key="index"
            :label="item.type_name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择">
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="addDevicesFun">新增设备</el-button>
      </el-form-item>
    </el-form>
    <!-- <br /> -->
    <el-table :data="tableData" stripe height="90%">
      <el-table-column type="index" width="50" />
      <el-table-column prop="productNumber" label="设备号" />
      <el-table-column prop="type_name" label="设备类型" />
      <el-table-column prop="installLocation" label="设备地址" />
      <el-table-column prop="regdate" label="报警时间" />
      <!-- <el-table-column prop="alarm" label="报警原因" /> -->
      <!-- <el-table-column prop="status" label="状态" /> -->
      <el-table-column prop="status" label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" @click="see(scope.row)"
            >详情</el-button
          >
          <!-- <el-button size="small" type="danger" @click="delFileInfoFun(scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="centerDialogVisible" title="详情" width="70%" center>
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="设备详情" name="first">
          <h5>设备信息</h5>
          <el-row :gutter="10">
            <el-col :span="8">
              <p>IMEI:8888888888888</p>
              <p>安装位置:XXXXXXXXXXXXXXXXX</p>
            </el-col>
            <el-col :span="8">
              <p>设备类型:XXXX</p>
              <p>接警人员:XXXXXX</p>
            </el-col>
            <el-col :span="8">设备型号:xxxx</el-col>
          </el-row>
          <h5>报警信息</h5>
          <el-row :gutter="10">
            <el-col :span="8">
              <p>状态:未处理</p>
            </el-col>
            <el-col :span="8">
              <p>报警时间:XXXX</p>
            </el-col>
            <el-col :span="8">
              <p>报警原因:xxxx</p>
            </el-col>
          </el-row>
          <h5>处理信息</h5>
          <el-row :gutter="10">
            <el-col :span="8">
              <p>处理时间:-----</p>
            </el-col>
            <el-col :span="8">
              <p>处理人:-------</p>
            </el-col>
            <el-col :span="8">
              <p>报警确认类型:-------</p>
            </el-col>
          </el-row>

          <div class="alarm">
            <h5>报警处理(请填写后提交处理)</h5>
            <el-form
              ref="formRef"
              :model="numberValidateForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item
                label="备注"
                prop="age"
                :rules="[{ required: true, message: '请填写备注信息' }]"
              >
                <el-input
                  v-model.number="numberValidateForm.age"
                  autocomplete="off"
                  :autosize="{ minRows: 4, maxRows: 4 }"
                  type="textarea"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm(formRef)"
                  >Submit</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template> -->
    </el-dialog>
    <el-dialog
      v-model="addDevicesDialogVisible"
      title="新增设备"
      width="40%"
      center
    >
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form"
        label-width="70px"
      >
        <el-form-item label="设备编号">
          <el-input v-model="formInline.imei" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="设备类型">
          <el-select v-model="formInline.type" placeholder="请选择">
            <el-option
              v-for="(item, index) in typeList"
              :key="index"
              :label="item.type_name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="设备厂商">
          <el-input v-model="formInline.chang" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="formInline.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="设备地址">
          <el-input
            v-model="formInline.address"
            id="tipinput"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="经纬度">
          <el-input
            v-model="formInline.lanlat"
            placeholder="自动生成"
            disabled
          />
        </el-form-item>
      </el-form>
      <div id="map"></div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDevicesDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addDecivesFun"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    <Pagination :total="total" @changeList="changeList" />
    <Yangan ref="yangan" />
    <Dianli ref="dianli" />
    <Ranqi ref="ranqi" />
    <Shuiwei ref="shuiwei" />

    <Jiance ref="jiance" />
    <Jxs ref="jxs" />
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, TabsPaneContext } from "element-plus";
import Pagination from "../pagination/index.vue";
import { ref, reactive, onMounted, nextTick, watch } from "vue";
import { getCompDeviceList, getDeviceType, addDevice } from "@/api/index.js";
import { useStore } from "vuex";
import type { FormInstance } from "element-plus";
import Dianli from "./popup/info/dianli.vue";
import Yangan from "./popup/info/yangan.vue";
import Ranqi from "./popup/info/ranqi.vue";
import Shuiwei from "./popup/info/shuiwei.vue";
import Jiance from "./popup/info/jiance.vue";
import Jxs from "./popup/info/jxs.vue";
const formRef = ref<FormInstance>();

const numberValidateForm = reactive({
  age: "",
});
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
const tableData = ref([]);
const typeList = ref([]);
const yangan: any = ref(null);

const dianli: any = ref(null);
const jiance: any = ref(null);
const ranqi: any = ref(null);
const jxs: any = ref(null);
const shuiwei: any = ref(null);
const placeSearch = ref();
const total = ref(0);
const pageSize4 = ref(10);
const centerDialogVisible = ref(false);
const addDevicesDialogVisible = ref(false);
const currentPage4 = ref(1);
const store = useStore();
const formInline = reactive({
  user: "",
  region: "",
  address: "",
  imei: "",
  type: "",
  name: "",
  chang: "",
  lanlat: "",
});
const activeName = ref("first");
// const
onMounted(() => {
  getCompDeviceListFun();
});

watch(
  () => store.state.menuName,
  (val) => {
    console.log(val, "woshibaojVAL");

    switch (val) {
      case "火灾":
        tableData.value = [
          {
            devId: 2,
            device_name: "电气火灾",
            type: null,
            type_name: "电气火灾",
            supplier: null,
            supplier_name: "深圳万宏智联科技实业有限公司",
            productNumber: "0861967066418201",
            installLocation: "浙江温州",
            regdate: "2022-12-16 16:57:42",
            long_lat: null,
            alarmType: 0,
            state: 0,
            companyId: "10013",
            num: "2",
          },
        ];
        break;
      case "压力监测":
        tableData.value = [
          {
            devId: 2,
            device_name: "电气火灾",
            type: null,
            type_name: "水压",
            supplier: null,
            supplier_name: "深圳万宏智联科技实业有限公司",
            productNumber: "0861967066418201",
            installLocation: "浙江温州",
            regdate: "2022-12-16 16:57:42",
            long_lat: null,
            alarmType: 0,
            state: 0,
            companyId: "10013",
            num: "5",
          },
        ];
        break;
      case "浓度监测":
        tableData.value = [
          {
            devId: 2,
            device_name: "电气火灾",
            type: null,
            type_name: "燃气",
            supplier: null,
            supplier_name: "深圳万宏智联科技实业有限公司",
            productNumber: "0861967066418201",
            installLocation: "浙江温州",
            regdate: "2022-12-16 16:57:42",
            long_lat: null,
            alarmType: 0,
            state: 0,
            companyId: "10013",
            num: "3",
          },
        ];
        break;
      case "其他监测":
        tableData.value = [
          {
            devId: 2,
            device_name: "烟感1",
            type: null,
            type_name: "无线烟感",
            supplier: null,
            supplier_name: "深圳万宏智联科技实业有限公司",
            productNumber: "0861967066418201",
            installLocation: "浙江温州",
            regdate: "2022-12-16 16:57:42",
            long_lat: null,
            alarmType: 0,
            state: 0,
            companyId: "10013",
            num: "1",
          },
          {
            devId: 2,
            device_name: "电气火灾",
            type: null,
            type_name: "水位",
            supplier: null,
            supplier_name: "深圳万宏智联科技实业有限公司",
            productNumber: "0861967066418201",
            installLocation: "浙江温州",
            regdate: "2022-12-16 16:57:42",
            long_lat: null,
            alarmType: 0,
            state: 0,
            companyId: "10013",
            num: "4",
          },
        ];
        break;
    }
  }
);
const addDevicesFun = () => {
  addDevicesDialogVisible.value = true;
  nextTick(() => {
    let map = new AMap.Map("map", {
      center: [111.205467, 25.907761],
      resizeEnable: true,
      zoom: 4,
      mapStyle: "amap://styles/0acdc7a838973fbe4969d38644d9a726",
    });

    //输入提示
    var autoOptions = {
      input: "tipinput",
    };
    //输入提示
    var auto = new AMap.Autocomplete({
      input: "tipinput",
    });

    var auto = new AMap.Autocomplete(autoOptions);
    placeSearch.value = new AMap.PlaceSearch({
      map: map,
    }); //构造地点查询类

    // console.log(auto, "aptu");
    // auto.on("select", select);

    AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
    AMap.event.addListener(placeSearch.value, "markerClick", (e: any) => {
      // console.log(e.data.location.lng, e.data.location.lat); // 经纬度
      console.log(e.data.adcode, 654);
      formInline.lanlat = e.data.location.lng + "," + e.data.location.lat;
      formInline.lanlat = e.data.location.lng + "," + e.data.location.lat;
      formInline.address = `${e.data.cityname}${e.data.adname}${e.data.address}`;

      // regionListFun(e.data.adcode);
    });
  });
};
const select = (e: any) => {
  console.log(e);
  placeSearch.value.setCity(e.poi.adcode);
  // // console.log(placeSearch.value);

  placeSearch.value.search(e.poi.name); //关键字查询查询
  formInline.lanlat = e.poi.location.lng + "," + e.poi.location.lat;
  // addDevicesValidateForm.lanlat = e.poi.location.lng + "," + e.poi.location.lat;
  formInline.address = e.poi.district + "" + e.poi.address + "" + e.poi.name;

  // regionListFun(e.poi.adcode);
};
const addDecivesFun = () => {
  // addDevicesDialogVisible.value = true
  addDevice(
    formInline.name,
    formInline.type,
    formInline.chang,
    formInline.imei,
    formInline.address,
    formInline.lanlat
  ).then((res) => {
    if (res.data.code == 200) {
      ElMessage({
        showClose: true,
        message: "添加成功",
        type: "success",
      });
      addDevicesDialogVisible.value = false;
      getCompDeviceListFun();
    } else {
      ElMessage({
        showClose: true,
        message: res.data.msg,
        type: "error",
      });
    }
  });
};
const see = (row) => {
  // centerDialogVisible.value = true;

  switch (row.num) {
    case "1":
      yangan.value.show(40535, 99);
      break;
    case "2":
      dianli.value.show("323852", 2);
      break;
    case "3":
      ranqi.value.show("389024", 7);
      break;
    case "4":
      shuiwei.value.show("359834", 3, 8);
      break;
    case "5":
      shuiwei.value.show("361403", 3, 4);
      break;
  }
};
const getCompDeviceListFun = () => {
  getCompDeviceList("", "", currentPage4.value, pageSize4.value).then((res) => {
    // tableData.value = res.data.data;
    total.value = res.data.dataCount;
  });
  getDeviceType().then((res) => {
    typeList.value = res.data.data;
  });
};
//分页器组件传回来的数据
const changeList = (pageSize, currentPage, type) => {
  console.log(pageSize, currentPage, "收到啦分液器", type);

  pageSize4.value = pageSize;
  currentPage4.value = currentPage;
  // fileInfoFun();
  getCompDeviceListFun();
};
</script>
<style lang='less' scoped>
#earlyWarning {
  height: 55vh;
  .demo-tabs {
    background: #ffffff;
    box-shadow: 0px 0px 13px 0px #ebebeb;
    border-radius: 4px;
    padding: 10px;
    h5 {
      border-bottom: 1px solid #eff1f4;
      border-left: 4px solid #0165d0;
      padding-left: 20px;
    }
    .alarm {
      background: rgb(241, 248, 162);
      padding-right: 100px;
    }
    .el-row {
      text-align: center;
      margin-bottom: 10px;
      p {
        margin: 20px 0;
      }
    }
  }
  .demo-form {
    /deep/.el-form-item {
      width: 45%;
    }
  }
  #map {
    height: 400px;
    background: #bfa;
  }
}
</style>