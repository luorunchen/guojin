<template>
  <div id="earlyWarning" ref="earlyWarning">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="设备号">
        <el-input v-model="formInline.user" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="设备类型">
        <el-select v-model="formInline.region" placeholder="请选择">
          <el-option v-for="(item, index) in typeList" :key="index" :label="item.type_name" :value="item.id" />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="时间选择">
        <el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始时间"
          end-placeholder="结束时间" />
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="getCompDeviceListFun">查询</el-button>
        <el-button type="primary" @click="addDevicesFun">新增设备</el-button>
      </el-form-item>
    </el-form>
    <!-- <br /> -->
    <el-table :data="tableData" stripe height="45vh" style="width: 100%;margin-bottom: 50px;">
      <el-table-column type="index" width="50" />
      <el-table-column prop="productNumber" label="设备号" />
      <el-table-column prop="type_name" label="设备类型" />
      <el-table-column prop="installLocation" label="设备地址" />
      <el-table-column prop="regdate" label="注册时间" />
      <!-- <el-table-column prop="alarm" label="报警原因" /> -->
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag class="ml-2" :type="scope.row.online == 0 ? 'info' : 'success'">{{ scope.row.online == 0 ? '离线' : '在线'
          }}</el-tag>
        </template>

      </el-table-column>
      <el-table-column prop="status" label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" @click="see(scope.row)">详情</el-button>
          <el-button size="small" type="danger" @click="delDevicesFun(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog v-model="addDevicesDialogVisible" title="新增设备" width="40%" center>
      <!-- <el-form ref="formRef" :model="numberValidateForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="age" prop="age" :rules="[
          { required: true, message: 'age is required' },
          { type: 'number', message: 'age must be a number' },
        ]">
          <el-input v-model.number="numberValidateForm.age" type="text" autocomplete="off" />
        </el-form-item>
      
      </el-form> -->
      <el-form ref="formRef" :inline="true" :model="formInline" class="demo-form" require-asterisk-position="right">

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="设备编号" prop="imei" :rules="[
              { required: true, message: '请输入设备编号' },
            ]">
              <el-input v-model="formInline.imei" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备类型" prop="type" :rules="[
              { required: true, trigger: 'change', message: '请选择设备类型' },
            ]">
              <el-select v-model="formInline.type" placeholder="请选择">
                <el-option v-for="(item, index) in typeList" :key="index" :label="item.type_name" :value="item.id" />
              </el-select>
            </el-form-item></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <!-- <el-form-item label="设备厂商">
              <el-input v-model="formInline.chang" placeholder="请输入" />
            </el-form-item> -->
            <el-form-item label="经纬度 &#12288;&nbsp; ">
              <el-input v-model="formInline.lanlat" placeholder="自动生成" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="安装位置" prop="name" :rules="[
              { required: true, message: '请输入安装位置' },
            ]">
              <el-input v-model="formInline.name" placeholder="请输入" />
            </el-form-item></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="应用场所" prop="changsuo" :rules="[
              { required: true, trigger: 'change', message: '请选择应用场所' },
            ]">
              <el-select v-model="formInline.changsuo" placeholder="请选择">
                <el-option v-for="(item, index) in placeList" :key="index" :label="item.place" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">

            <el-form-item label="维护时间&#12288;">
              <el-date-picker v-model="formInline.maintainTime" type="datetime" label="设备下次维护时间" placeholder="设备下次维护时间"
                style="width: 100%" value-format="YYYY/MM/DD HH:mm:ss" />

            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="设备地址" prop="address" :rules="[
              { required: true, message: '请输入设备地址' },
            ]">
              <el-input v-model="formInline.address" id="tipinput" placeholder="请输入" />
            </el-form-item></el-col>

          <el-col :span="12">
            <el-form-item label="维护周期(天)">
              <el-input-number v-model="formInline.cycle" :precision="0" :min="10" :max="1000" />
            </el-form-item></el-col>
        </el-row>






      </el-form>
      <div id="map"></div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDevicesDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm(formRef)"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    <Pagination :total="total" @changeList="changeList" />
    <!-- 
   
    
    <Shuiwei ref="shuiwei" /> -->
    <Ranqi ref="ranqi" />
    <Shipin ref="shipin" />
    <Dianli ref="dianli" />
    <Yangan ref="yangan" />
    <!-- <Jiance ref="jiance" />
    <Jxs ref="jxs" /> -->
    <IntegratedMachine ref="integratedMachine" />
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";
import Pagination from "../pagination/index.vue";
import { ref, reactive, onMounted, nextTick, watch } from "vue";
import { getCompDeviceList, getDeviceType, addDevice, getDevInfoByDevId, delDevice, getPlace } from "@/api/index.js";
import { useStore } from "vuex";
import type { FormInstance } from "element-plus";
import Dianli from "./popup/info/dianli.vue";
import Yangan from "./popup/info/yangan.vue";
import Ranqi from "./popup/info/ranqi.vue";
// import Shuiwei from "./popup/info/shuiwei.vue";
// import Jiance from "./popup/info/jiance.vue";
// import Jxs from "./popup/info/jxs.vue";
import Shipin from "./popup/info/shipin.vue";
import IntegratedMachine from "./popup/IntegratedMachine.vue";
import { getPlacementList } from "@floating-ui/core/src/middleware/autoPlacement";
const formRef = ref<FormInstance>();

const numberValidateForm = reactive({
  age: "",
});

const tableData = ref([]);
const typeList = ref([]);
const placeList = ref([]);
const yangan: any = ref(null);

const dianli: any = ref(null);

const shipin: any = ref(null);
const ranqi: any = ref(null);
const jiance: any = ref(null);
const jxs: any = ref(null);
const shuiwei: any = ref(null);
const integratedMachine: any = ref(null);
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
  chang: "2",
  lanlat: "",
  maintainTime: "",
  cycle: "10",
  changsuo: ''
});
const activeName = ref("first");
const props = defineProps({
  pid: Number
})
onMounted(() => {
  getCompDeviceListFun();
  getDeviceType().then((res) => {
    typeList.value = res.data.data;
  });
  getPlace().then(res => {
    placeList.value = res.data.data
  })
});
const delDevicesFun = (row) => {
  ElMessageBox.confirm(
    `确定要删除 <span style='color:red'>${row.productNumber}</span> 该设备嘛?`,
    '删除设备',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      dangerouslyUseHTMLString: true
    }
  )
    .then(() => {
      delDevice(row.devId).then(res => {
        if (res.data.code == 200) {
          ElMessage({
            type: 'success',
            message: '删除成功',
            showClose: true
          })
          getCompDeviceListFun();
        }
      })

    })

}

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

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    console.log(valid, 'valid');

    if (valid) {
      addDevice(
        formInline.name,
        formInline.type,
        '2',
        formInline.imei,
        formInline.address,
        formInline.lanlat,
        formInline.maintainTime != '' ? formInline.maintainTime : '2029/01/01 00:00:00',
        formInline.cycle,
        formInline.changsuo
      ).then((res) => {
        if (res.data.code == 200) {
          ElMessage({
            showClose: true,
            message: "添加成功",
            type: "success",
          });
          addDevicesDialogVisible.value = false;
          for (let key in formInline) {
            formInline[key] = ''
          }
          getCompDeviceListFun();
        } else {
          ElMessage({
            showClose: true,
            message: res.data.msg,
            type: "error",
          });
        }
      });
    } else {
      console.log('error submit!')
      return false
    }
  })
}
// const addDecivesFun = () => {
//   console.log(formInline.maintainTime, 'formInline.maintainTime');

//   // addDevicesDialogVisible.value = true

// };
const see = (row) => {

  // centerDialogVisible.value = true;
  console.log(row.type_name);

  switch (row.type) {
    case 38:
      integratedMachine.value.show(row.devId, row.type_name);
      break;
    case 44:
      shipin.value.show(row, row.type_name);
      break;
    case 50:
      dianli.value.show(row.devId, row.productNumber, row.type_name);
      break;
    case 51:
      dianli.value.show(row.devId, row.productNumber, row.type_name);
      break;
    case 2:
      yangan.value.show(row.devId, row.productNumber, row.type_name);
      break;
    // case 26:
    //   yangan.value.show(row.devId, row.productNumber, row.type_name);
    //   break;
    // case 47:
    //   ranqi.value.show(row.devId, row.productNumber, row.type_name);
    //   break;
    default:
      ranqi.value.show(row.devId, row.productNumber, row.type_name);
      break;
    // case "5":
    //   shuiwei.value.show("361403", 3, 4);
    //   break;
  }
};
const getCompDeviceListFun = () => {
  getCompDeviceList(formInline.region, formInline.user, currentPage4.value, pageSize4.value, props.pid).then((res) => {
    tableData.value = res.data.data;
    total.value = res.data.dataCount;
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
  // height: 55vh;



  .demo-form {
    /deep/.el-form-item {
      width: 100%;
    }
  }

  /deep/.el-select {
    width: 100%;
  }

  #map {
    height: 400px;
    background: #bfa;
  }
}
</style>