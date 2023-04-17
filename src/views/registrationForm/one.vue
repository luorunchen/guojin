<template>
  <div id="form">
    <div class="box">
      <h3>安全生产信息登记表</h3>
      <!-- 市场监督管理注册信息 -->
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="市场监督管理注册信息" name="first">
          <el-form :inline="true" class="demo-form-inline" ref="ruleFormRef" :model="ruleForm" :rules="rules"
            label-width="120px">
            <el-form-item label="企业名称" prop="qiye">
              <el-input v-model="ruleForm.qiye" placeholder="企业名称">
                <template #append>
                  <el-button type="success" @click="selectFun">搜索</el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="法定代表人">
              <el-input v-model="ruleForm.daibiao" placeholder="自动生成" disabled />
            </el-form-item>
            <el-form-item label="注册资本">
              <el-input v-model="ruleForm.ziben" placeholder="自动生成" disabled>
                <template #append> 万元 </template>
              </el-input>
            </el-form-item>
            <el-form-item label="类型">
              <el-input v-model="ruleForm.type" placeholder="自动生成" disabled />
            </el-form-item>
            <el-form-item label="成立日期">
              <el-input v-model="ruleForm.time" placeholder="自动生成" disabled />
            </el-form-item>
            <el-form-item label="营业期限">
              <el-input v-model="ruleForm.qixian" placeholder="自动生成" disabled />
            </el-form-item>
            <el-form-item label="社会信用代码">
              <el-input v-model="ruleForm.daima" placeholder="自动生成" disabled />
            </el-form-item>
            <el-form-item label="注册地址">
              <el-input v-model="ruleForm.address" placeholder="自动生成" disabled>
                <template #append>
                  <el-button type="success" :icon="MapLocation" @click="position"></el-button>
                </template>
              </el-input>
              <!-- <el-link type="primary">地址不对?我要修改</el-link> -->
            </el-form-item>
            <el-form-item label="经营范围">
              <el-input v-model="ruleForm.fanwei" placeholder="自动生成" disabled type="textarea" autosize />
            </el-form-item>
            <el-form-item label="所在街道" prop="chanping">
              <el-select v-model="ruleForm.jiedao" class="m-2" placeholder="请选择">
                <el-option v-for="item, index in StreetList" :key="index" :label="item.ad_Region" :value="item.ad_Code" />
              </el-select>

            </el-form-item>

          </el-form>
        </el-tab-pane>
      </el-tabs>
      <!-- 其他信息 -->
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="其他信息" name="first">

          <el-form :inline="true" class="demo-form-inline" ref="ruleFormRef" :model="ruleForm" :rules="rules"
            label-width="100px">
            <el-form-item label="上年产值" prop="chanzhi">
              <el-input v-model="ruleForm.chanzhi" placeholder="上年产值">
                <template #append> 万元 </template>
              </el-input>
            </el-form-item>
            <el-form-item label="员工人数" prop="renshu">
              <el-input v-model="ruleForm.renshu" placeholder="请输入">
                <template #append> 人 </template>
              </el-input>
            </el-form-item>

            <el-form-item label="占地面积" prop="zdmianji">
              <el-input v-model="ruleForm.zdmianji" placeholder="请输入">
                <template #append> 平方 </template>
              </el-input>
            </el-form-item>
            <el-form-item label="经营面积" prop="jymianji">
              <el-input v-model="ruleForm.jymianji" placeholder="请输入"><template #append> 平方 </template></el-input>
            </el-form-item>
            <el-form-item label="行业类别" prop="industry">
              <el-cascader :props="{ value: 'id', label: 'name' }" :options="hyTreeList" v-model="ruleForm.industry"
                @change="industryChang" placeholder="请选择" @focus="indeustryFocus" />
            </el-form-item>
            <el-form-item label="安全投入">
              <el-input v-model="ruleForm.touru" placeholder="自动生成" disabled>
                <template #append> 万元 </template>
              </el-input>
            </el-form-item>
            <el-form-item label="评定标准">
              <el-input v-model="ruleForm.biaozhun" placeholder="自动生成" disabled />
            </el-form-item>
            <el-form-item label="行业">
              <el-input v-model="ruleForm.hangye" placeholder="自动生成" disabled />
            </el-form-item>
            <el-form-item label="企业规模" prop="guimo">
              <el-input v-model="ruleForm.guimo" placeholder="自动生成" disabled />
              <!-- <el-radio-group v-model="ruleForm.guimo">
                <el-radio label="规上企业" />
                <el-radio label="规下企业" />
              </el-radio-group> -->
            </el-form-item>
            <el-form-item label="主要产品" prop="chanping">
              <el-input v-model="ruleForm.chanping" placeholder="请输入" />
            </el-form-item>

          </el-form>
        </el-tab-pane>
      </el-tabs>
      <!-- 相关人员联系方式 -->
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="相关人员联系方式" name="first">
          <el-form :inline="true" class="demo-form-inline" :model="ruleForm" :rules="rules" label-width="160px"
            label-position="right">
            <el-form-item label="主要负责人" prop="people">
              <template v-for="(i, j) in ruleForm.people" :key="j">
                <el-input v-model="ruleForm.people[j].name" placeholder="请输入" @focus="inputFocus(1, j, i.id)"
                  style="margin-bottom: 10px">
                  <template #append>
                    <el-link type="primary" @click="add(ruleForm.people)">
                      新增
                    </el-link>
                    <span v-if="i.id != undefined || j >= 1"> /</span>
                    <el-link type="danger" v-if="i.id != undefined || i.id != undefined || j >= 1"
                      @click="delList(ruleForm.people, j, i.id)">
                      删除
                    </el-link>
                  </template>
                </el-input>
              </template>
            </el-form-item>
            <el-form-item label="安全生产管理人员" prop="name">
              <template v-for="(i, j) in ruleForm.anquan" :key="j">
                <el-input v-model="ruleForm.anquan[j].name" placeholder="请输入" @focus="inputFocus(2, j, i.id)"
                  style="margin-bottom: 10px">
                  <template #append>
                    <el-link type="primary" @click="add(ruleForm.anquan)">
                      新增
                    </el-link>
                    <span v-if="i.id != undefined || j >= 1"> /</span>
                    <el-link type="danger" v-if="i.id != undefined || j >= 1" @click="delList(ruleForm.anquan, j, i.id)">
                      删除
                    </el-link>
                  </template>
                </el-input>
              </template>
            </el-form-item>
            <el-form-item label="消防生产管理人员" prop="name">
              <template v-for="(i, j) in ruleForm.xiaofang" :key="j">
                <el-input v-model="ruleForm.xiaofang[j].name" placeholder="请输入" @focus="inputFocus(3, j, i.id)"
                  style="margin-bottom: 10px">
                  <template #append>
                    <el-link type="primary" @click="add(ruleForm.xiaofang)">
                      新增
                    </el-link>
                    <span v-if="i.id != undefined || j >= 1"> /</span>
                    <el-link type="danger" v-if="i.id != undefined || j >= 1"
                      @click="delList(ruleForm.xiaofang, j, i.id)">
                      删除
                    </el-link>
                  </template>
                </el-input>
              </template>
            </el-form-item>
            <el-form-item label="电工" prop="name">
              <template v-for="(i, j) in ruleForm.diangong" :key="j">
                <el-input v-model="ruleForm.diangong[j].name" placeholder="请输入" @focus="inputFocus(4, j, i.id)"
                  style="margin-bottom: 10px">
                  <template #append>
                    <el-link type="primary" @click="add(ruleForm.diangong)">
                      新增
                    </el-link>
                    <span v-if="i.id != undefined || j >= 1"> /</span>
                    <el-link type="danger" v-if="i.id != undefined || j >= 1"
                      @click="delList(ruleForm.diangong, j, i.id)">
                      删除
                    </el-link>
                  </template>
                </el-input>
              </template>
            </el-form-item>
            <el-form-item label="设备管理人员" prop="name">
              <template v-for="(i, j) in ruleForm.shebei" :key="j">
                <el-input v-model="ruleForm.shebei[j].name" placeholder="请输入" @focus="inputFocus(5, j, i.id)"
                  style="margin-bottom: 10px">
                  <template #append>
                    <el-link type="primary" @click="add(ruleForm.shebei)">
                      新增
                    </el-link>
                    <span v-if="i.id != undefined || j >= 1"> /</span>
                    <el-link type="danger" v-if="i.id != undefined || j >= 1" @click="delList(ruleForm.shebei, j, i.id)">
                      删除
                    </el-link>
                  </template>
                </el-input>
              </template>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <!-- 本单位涉及的场所(可多选) -->
      <el-tabs v-model="activeName" class="demo-tabs1" @tab-click="handleClick">
        <el-tab-pane label="本单位涉及的场所(可多选)" name="first">
          <el-form class="demo-form-inline" :model="ruleForm" :rules="rules" label-width="120px">
            <el-form-item :label="item.name" prop="resource" v-for="(item, index) in formTreeList" :key="index">
              <el-checkbox-group v-model="ruleForm.resource" v-for="(item2, index2) in item.children" :key="index2">
                <el-checkbox :label="item2.id">{{ item2.name }}</el-checkbox>
              </el-checkbox-group>

            </el-form-item>
            <el-form-item label="(自行建立专用设备设施)" label-width="170px">
              <template v-for="(i, j) in ruleForm.zijian" :key="j">
                <el-input v-model="ruleForm.zijian[j]" style="margin-bottom: 10px;width: 300px;">
                  <template #append>
                    <el-link type="primary" @click="add(ruleForm.zijian)">
                      新增
                    </el-link>
                    <span v-if="i.id != undefined || j >= 1"> /</span>
                    <el-link type="danger" v-if="i.id != undefined || j >= 1" @click="delList(ruleForm.zijian, j, i.id)">
                      删除
                    </el-link>
                  </template></el-input>
              </template>

            </el-form-item>

            <el-form-item label="通用设备" label-width="170px">
              <template v-for="(i, j) in ruleForm.tongyong" :key="j">
                <el-input v-model="ruleForm.tongyong[j]" style="margin-bottom: 10px;width: 300px;">
                  <template #append>
                    <el-link type="primary" @click="add(ruleForm.tongyong)">
                      新增
                    </el-link>
                    <span v-if="i.id != undefined || j >= 1"> /</span>
                    <el-link type="danger" v-if="i.id != undefined || j >= 1"
                      @click="delList(ruleForm.tongyong, j, i.id)">
                      删除
                    </el-link>
                  </template>
                </el-input>
              </template>

            </el-form-item>

          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div class="tips">
        <p>特别提示:</p>
        <p>
          1.主要负责人填写说明：生产经营单位主要负责人是指有限责任公司或者股份有限公司的董事长、总经理，
          其他生产经营单位的厂长、经理、（矿务局）局长、矿长（含实际控制人）等，请填写对本单位实际全面负责管理人员。
        </p>
        <p>
          2.请用户在本单位涉及以上“八大危险作业、其他危险作业、特种设备、
          电气设备、消设备设施、通用设备、自行建立专用设备设施、其他”的场所进行选择，
          以便于在建立安全生产管理台账、专项台账、隐患排查治理、风控体系建设等工作中相关联。
        </p>
      </div>
      <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
    </div>
    <el-dialog v-model="centerDialogVisible" title="添加人员" width="30%" center>
      <el-form ref="formRef" :model="numberValidateForm" label-width="100px" label-position="top" class="demo-ruleForm">
        <el-form-item label="姓名" prop="username" :rules="[{ required: true, message: '请输入姓名' }]">
          <el-input v-model.number="numberValidateForm.username" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone" :rules="[{ required: true, message: '请输入手机号' }]">
          <el-input v-model.number="numberValidateForm.phone" type="text" autocomplete="off" />
        </el-form-item>
        <el-button type="primary" @click="submitForm1(formRef)">
          添加
        </el-button>
      </el-form>
    </el-dialog>
    <el-dialog v-model="dialogVisible" title="提示" width="30%" center :close-on-click-modal="false"
      :close-on-press-escape="false" :show-close="false">
      <h3> <span style="color:red">{{ ruleForm.qiye }}</span> 填写过该表单,无需填写,是否下一步或重新填写</h3>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="again">重新填写</el-button>
          <el-button @click="next">
            下一步
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="mapDialogVisible" title="地图" width="60%" center>
      <div id="map"></div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {
  formTree,
  getCompanyInfo,
  hyTree,
  setCompHy,
  addFormContent,
  addPerson,
  getMapInfo,
  addFormTree,
  getEvaluation,
  getStreetList,
  login,
  setRegion,
  delPerson,
  setIsExit
} from "@/api/index";
import { ref, reactive, onMounted, watch, nextTick } from "vue";
import router from "@/router";
import { ElMessage, TabsPaneContext, ElMessageBox } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { MapLocation } from "@element-plus/icons-vue";
const activeName = ref("first");
const formTreeList = ref([]);
const hyTreeList = ref([]);
const StreetList = ref([]);
const inputType: any = ref();
const addressLatlng: any = ref();
const adcode: any = ref();
const addList = ref([""]);
const centerDialogVisible = ref(false);
const mapDialogVisible = ref(false);
const dialogVisible = ref(false);
let id = 0;
const ruleFormRef = ref<FormInstance>();
// const ruleFormRe1 = ref<FormInstance>()
const formRef = ref<FormInstance>();
const ruleForm: any = reactive({
  jiedao: "",
  qiye: "",
  daibiao: "",
  ziben: "",
  type: "",
  time: "",
  daima: "",
  address: "",
  hangye: "",
  resource: [],
  industry: "",
  fanwei: "",
  qixian: "",
  zijian: [""],
  chanzhi: "",
  renshu: "",
  zdmianji: "",
  jymianji: "",
  touru: "",
  biaozhun: "",
  guimo: "",
  chanping: "",
  qiyeId: "",
  people: [""],
  tongyong: [""],
  anquan: [""],
  xiaofang: [""],
  diangong: [""],
  shebei: [""],
});

const numberValidateForm = reactive({
  username: "",
  phone: "",
});
const rules = reactive<FormRules>({
  qiye: [{ required: true, message: "请输入完整的公司名称", trigger: "blur" }],
  chanzhi: [{ required: true, message: "请输入上年产值", trigger: "blur" }],
  renshu: [{ required: true, message: "请输入员工人数", trigger: "blur" }],
  zdmianji: [{ required: true, message: "请输入占地面积", trigger: "blur" }],
  jymianji: [{ required: true, message: "请输入经营面积", trigger: "blur" }],
  chanping: [{ required: true, message: "请输入主要产品", trigger: "blur" }],

  industry: [
    {
      required: true,
      message: "请选择所属行业",
      trigger: "change",
    },
  ],
});
onMounted(() => {
  formTree().then((res) => {
    console.log(res.data.data, 999);
    formTreeList.value = res.data.data[0].children;
  });

});
watch(
  () => ruleForm.chanzhi,
  (val) => {
    console.log(val);
    if (val * 1 >= 2000) {
      ruleForm.guimo = "规上企业";
    } else {
      ruleForm.guimo = "规下企业";
    }
  }
);
const add = (list) => {
  // console.log();
  list.push("");
};
const again = () => {
  ruleForm.qiye = "";
  ruleForm.qiyeId = ""
  ruleForm.daibiao = ""
  ruleForm.ziben = ""
  ruleForm.type = ""
  ruleForm.time = ""
  ruleForm.qixian = ""
  ruleForm.daima = ""
  ruleForm.address = ""
  ruleForm.fanwei = ""
  dialogVisible.value = false
}
const next = () => {

  let arr = document.cookie.split(";");
  let userName = ''
  let password = ''
  for (let i = 0; i < arr.length; i++) {
    // 再次切割，arr2[0]为key值，arr2[1]为对应的value
    let arr2 = arr[i].split("=");


    if (arr2[0].indexOf("userName") != -1) {
      userName = arr2[1];
      console.log('进来了');

    } else if (arr2[0].indexOf("password") != -1) {
      password = arr2[1];
    }
  }
  // console.log(arr2, userName, password);
  login(userName, password, sessionStorage.getItem('loginType')).then(res => {
    sessionStorage.setItem("companyId", res.data.data.companyId);

    sessionStorage.setItem(
      "evaluation",
      res.data.data.evaluation_standard
    );
  })
  setIsExit(ruleForm.qiyeId)
  router.push("/");

}
const delList = (list, index, id) => {
  // ruleForm.people[index] = ''
  // console.log(ruleForm.people);
  if (index != 0) {
    list.splice(index, 1);
    console.log(list, id, 'id');
  } else {
    list[index] = ''
  }

  if (id != undefined) {
    delPerson(id).then(res => {
      if (res.data.code == 200) {
        ElMessage({
          showClose: true,
          message: '删除成功',
          type: 'success'
        })
      }
    })
  }

};
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
const indeustryFocus = () => {
  if (ruleForm.chanzhi == '') {
    return ElMessage({
      showClose: this,
      message: '请先输入年产值',
      type: 'error'
    })
  } else {
    hyTree().then((res) => {
      hyTreeList.value = res.data.data[0].children;
    });
  }
}
const industryChang = (value) => {
  console.log(value);


  setCompHy(value[value.length - 1], ruleForm.qiyeId, ruleForm.chanzhi).then(
    (res) => {
      if (res.data.code == 200) {
        ElMessageBox.alert('行业已选定,如有疑问请拨打*******咨询专家', '提示', {
          // if you want to disable its autofocus
          // autofocus: false,
          confirmButtonText: '确定',
          // callback: (action: Action) => {
          //   ElMessage({
          //     type: 'info',
          //     message: `action: ${action}`,
          //   })
          // },
        })

        ruleForm.hangye = res.data.data.industry;
        ruleForm.biaozhun = res.data.data.evaluation_standard;
        ruleForm.touru = res.data.data.safe_input;
      }
    }
  );
};

const selectFun = () => {

  if (ruleForm.qiye == '') {
    return ElMessage({
      showClose: true,
      message: '请输入内容',
      type: 'error'
    })
  }
  getCompanyInfo(ruleForm.qiye).then((res) => {
    if (res.data.code == 200) {
      ruleForm.qiye = res.data.data.company;
      ruleForm.qiyeId = res.data.data.companyId;
      ruleForm.daibiao = res.data.data.legal_person;
      ruleForm.ziben = res.data.data.register_capital;
      ruleForm.type = res.data.data.style;
      ruleForm.time = res.data.data.register_date;
      ruleForm.qixian = res.data.data.expire_date;
      ruleForm.daima = res.data.data.code;
      ruleForm.address = res.data.data.address;
      ruleForm.fanwei = res.data.data.scope;

      if (res.data.data.isexit == 1) {
        dialogVisible.value = true
      }
      getMapInfo("df5da9b4841b8c8f490cae7dca35444a", ruleForm.address, 3).then(
        (res) => {
          console.log(res.data);
          adcode.value = res.data.geocodes[0].adcode
          addressLatlng.value = res.data.geocodes[0].location
          getStreetList(res.data.geocodes[0].adcode).then(result => {
            console.log(result, '33333');
            StreetList.value = result.data.data
          })
          // setRegion(ruleForm.qiyeId, ruleForm.jiedao, addressLatlng.value)
          // let marker = new AMap.Marker({
          //   // icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
          //   position: res.data.geocodes[0].location.split(","),

          //   // offset: new AMap.Pixel(-13, -30),
          // });
          // map.setCenter(res.data.geocodes[0].location.split(","));
          // marker.setMap(map);

          // var content =
          //   `<div class="info-title">${ruleForm.qiye}</div><div class="info-content">` +
          //   `地址:${ruleForm.address} </div>`;

          // var infowindow1 = new AMap.AdvancedInfoWindow({
          //   content: content,
          //   offset: new AMap.Pixel(0, -30),
          // });
          // infowindow1.open(map, res.data.geocodes[0].location.split(","));
        }
      );
    } else {
      ElMessage({
        message: "搜索失败",
        type: "error",
        showClose: true,
      });
    }
  });
};
const position = () => {
  mapFun();
};
const inputFocus = (type, index, id) => {
  centerDialogVisible.value = true;
  console.log(id, 'id');

  inputType.value = { type, index };

};
const submitForm1 = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      // console.log('submit!')


      addPerson(
        numberValidateForm.username,
        numberValidateForm.phone,
        inputType.value.type,
        10013
      ).then((res) => {
        if (res.data.code == 200) {
          centerDialogVisible.value = false;

          ElMessage({
            showClose: true,
            message: "添加成功",
            type: "success",
          });
          switch (inputType.value.type) {
            case 1:
              ruleForm.people[
                inputType.value.index
              ] = {
                name: `${numberValidateForm.username},${numberValidateForm.phone}`, id: res.data.data
              }
              console.log(ruleForm.people, 'pp');

              break;
            case 2:
              ruleForm.anquan[
                inputType.value.index
              ] = { name: `${numberValidateForm.username},${numberValidateForm.phone}`, id: res.data.data };
              break;
            case 3:
              ruleForm.xiaofang[
                inputType.value.index
              ] = { name: `${numberValidateForm.username},${numberValidateForm.phone}`, id: res.data.data };
              break;
            case 4:
              ruleForm.diangong[
                inputType.value.index
              ] = { name: `${numberValidateForm.username},${numberValidateForm.phone}`, id: res.data.data };
              break;
            case 5:
              ruleForm.shebei[
                inputType.value.index
              ] = { name: `${numberValidateForm.username},${numberValidateForm.phone}`, id: res.data.data };
              break;
          }
          numberValidateForm.username = "";
          numberValidateForm.phone = "";
        } else {
          ElMessage({
            showClose: true,
            message: res.data.msg,
            type: "error",
          });
        }
      });
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
const mapFun = () => {
  // console.log(navigator.getLocation());
  if (ruleForm.address == "") {
    return ElMessage({
      message: "请填写企业名称",
      type: "error",
      showClose: true,
    });
  }
  mapDialogVisible.value = true;
  nextTick(() => {
    let map = new AMap.Map("map", {
      center: [111.205467, 25.907761],
      resizeEnable: true,
      zoom: 20,
      mapStyle: "amap://styles/0acdc7a838973fbe4969d38644d9a726",
    });
    getMapInfo("df5da9b4841b8c8f490cae7dca35444a", ruleForm.address, 3).then(
      (res) => {
        console.log(res.data);

        let marker = new AMap.Marker({
          // icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
          position: res.data.geocodes[0].location.split(","),

          // offset: new AMap.Pixel(-13, -30),
        });
        map.setCenter(res.data.geocodes[0].location.split(","));
        marker.setMap(map);

        var content =
          `<div class="info-title">${ruleForm.qiye}</div><div class="info-content">` +
          `地址:${ruleForm.address} </div>`;

        var infowindow1 = new AMap.AdvancedInfoWindow({
          content: content,
          offset: new AMap.Pixel(0, -30),
        });
        infowindow1.open(map, res.data.geocodes[0].location.split(","));
      }
    );
  });
};
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {

      if (ruleForm.zijian.length >= 1 && ruleForm.zijian[0] != "") {
        ruleForm.zijian.forEach(element => {
          addFormTree(element, 257, 1).then((res) => { });
        });

      }
      if (ruleForm.tongyong.length >= 1 && ruleForm.tongyong[0] != "") {
        ruleForm.tongyong.forEach(element => {
          addFormTree(element, 17, 1).then((res) => { });
        });

      }
      setRegion(ruleForm.qiyeId, ruleForm.jiedao, addressLatlng.value).then(res => {

      })
      setIsExit(ruleForm.qiyeId)
      addFormContent(
        ruleForm.chanzhi,
        ruleForm.qiyeId,
        ruleForm.renshu,
        ruleForm.zdmianji,
        ruleForm.jymianji,
        ruleForm.chanping,
        ruleForm.guimo == "规上企业" ? 1 : 0,
        ruleForm.resource.toString()
      ).then((res) => {
        if (res.data.code == 200) {
          ElMessage({
            showClose: true,
            message: "表单提交成功",
            type: "success",
          });
          let arr = document.cookie.split(";");
          let userName = ''
          let password = ''
          for (let i = 0; i < arr.length; i++) {
            // 再次切割，arr2[0]为key值，arr2[1]为对应的value
            let arr2 = arr[i].split("=");


            if (arr2[0].indexOf("userName") != -1) {
              userName = arr2[1];
              console.log('进来了');

            } else if (arr2[0].indexOf("password") != -1) {
              password = arr2[1];
            }
          }
          // console.log(arr2, userName, password);
          login(userName, password, sessionStorage.getItem('loginType')).then(res => {
            sessionStorage.setItem("companyId", res.data.data.companyId);

            sessionStorage.setItem(
              "evaluation",
              res.data.data.evaluation_standard
            );
          })
          router.push("/");
        } else {
          ElMessage({
            showClose: true,
            message: "表单提交失败",
            type: "error",
          });
        }
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style lang="less" scoped>
#form {
  background-image: url("../../assets/login.png");
  // height: calc(100vh);
  background-size: 100% 100%;
  padding: 1px;

  .box {
    width: 60%;

    // height: 2066px;
    background: #ffffff;
    border-radius: 10px;
    margin: 50px auto;
    // margin: 20px 0;
    padding: 1px 30px 30px 30px;

    h3 {
      margin: 20px 0;
      text-align: center;
    }

    /deep/.el-form-item {
      width: 46%;

      .el-cascader {
        width: 100%;
      }
    }

    .demo-tabs1 {
      /deep/.el-form-item {
        width: 100%;
      }

      /deep/.el-checkbox {
        margin-right: 10px;
      }
    }
  }

  .el-checkbox-group {
    width: 400px;
  }

  /deep/.el-form-item__label {
    font-weight: bold;
  }

  /deep/.el-button--primary {
    border-radius: 22px;
    height: 50px;
    width: 100%;
    margin-top: 20px;
  }

  /deep/.el-button--success {
    background: #1f459c;
    border: #1f459c 1px solid;
    border-radius: 4px;
    color: #fff;

    &:active {
      background: #02133a;
    }
  }

  .tips {
    // height: 153px;
    background: #f1f1f1;
    padding: 20px;
    text-indent: 2em;
    font-size: 14px;
    color: #666e76;

    p {
      &:nth-child(1) {
        color: #3385f4;
        text-indent: 0em;
      }
    }
  }

  #map {
    width: 100%;
    height: 500px;
    background: #02133a;
  }

  .custom-input-card {
    width: 22rem;
  }

  .custom-input-card .btn {
    margin-right: 1rem;
  }

  .custom-input-card .btn:last-child {
    margin-right: 0;
  }

  /deep/.info-title {
    color: white;
    font-size: 14px;
    background-color: #25a5f7;
    line-height: 26px;
    padding: 0px 0 0 6px;
    font-weight: lighter;
    letter-spacing: 1px;
  }

  /deep/.info-content {
    font: 12px Helvetica, "Hiragino Sans GB", "Microsoft Yahei", "微软雅黑",
      Arial;
    padding: 4px;
    color: #666666;
    line-height: 23px;
  }

  /deep/.info-content img {
    float: left;
    margin: 3px;
  }

  /deep/.amap-info-combo .keyword-input {
    height: 25px;
    border-radius: 2px 0 0 2px;
  }

  /deep/.el-select {
    width: 100%;
  }
}
</style>

