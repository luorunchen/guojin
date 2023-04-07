<template>
  <div id="form">
    <div class="box">
      <h3>安全生产登记表</h3>
      <!-- 市场监督管理注册信息 -->
      <el-tabs v-model="activeName" class="demo-radio">
        <el-tab-pane label="机构服务类型" name="first">
          <el-form :inline="true" class="demo-form-inline" ref="ruleFormRef1" :model="ruleForm" :rules="rules"
            label-width="100px">
            <el-form-item label="请选择" prop="resource">
              <el-radio-group v-model="ruleForm.resource" v-for="(item, index) in getInsTypeList" :key="index">
                <el-radio :label="item.id">{{ item.name }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <!-- 市场监督管理注册信息 -->
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="市场监督管理注册信息" name="first">
          <el-form :inline="true" class="demo-form-inline" ref="ruleFormRef2" :model="ruleForm" :rules="rules"
            label-width="120px">
            <el-form-item label="机构名称" prop="qiye">
              <el-input v-model="ruleForm.qiye" placeholder="请输入">
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
            </el-form-item>
            <el-form-item label="经营范围">
              <el-input v-model="ruleForm.fanwei" placeholder="自动生成" disabled type="textarea" autosize />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <!-- 其他信息 -->
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="其他信息" name="first">
          <el-form :inline="true" class="demo-form-inline" ref="ruleFormRef3" :model="ruleForm" :rules="rules"
            label-width="150px">
            <el-form-item label="资质证书名称" prop="zs_name">
              <el-input v-model="ruleForm.zs_name" placeholder="上年营业额" />
            </el-form-item>
            <el-form-item label="证书有效期" prop="zs_date">
              <el-date-picker v-model="ruleForm.zs_date" type="datetime" placeholder="Select date and time"
                value-format="YYYY/MM/DD HH:mm:ss" />
            </el-form-item>

            <el-form-item label="资质证书批准部门" prop="zs_pz">
              <el-input v-model="ruleForm.zs_pz" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="服务区域" prop="service_region">
              <el-input v-model="ruleForm.service_region" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="员工人数" prop="number">
              <el-input v-model="ruleForm.number" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="上年产值" prop="last_value">
              <el-input v-model="ruleForm.last_value" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="机构规模" prop="up_down">
              <el-radio-group v-model="ruleForm.up_down">
                <el-radio label="1">规上企业</el-radio>
                <el-radio label="0">规下企业</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="固定资产总值" prop="fixed_value">
              <el-input v-model="ruleForm.fixed_value" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="联系人" prop="lx_name">
              <el-input v-model="ruleForm.lx_name" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="联系电话" prop="lx_phone">
              <el-input v-model="ruleForm.lx_phone" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="传真">
              <el-input v-model="ruleForm.fax" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="经营面积" prop="operation_space">
              <el-input v-model="ruleForm.operation_space" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="工作场所及档案室面积证明资料" label-width="230px" prop="file1">
              <el-upload ref="uploadRef" class="upload-demo" :auto-upload="false" name="file1" :on-change="handleChange"
                :on-remove="handleChange" :http-request="handleHttpRequest">
                <el-button type="primary">文件上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="内部管理制度清单" prop="file2">
              <el-upload ref="uploadRef" class="upload-demo" :auto-upload="false" :data="{ companyId: ruleForm.qiyeId }"
                name="file2" :on-change="fileChange" :on-remove="fileChange" :http-request="handleHttpRequest">
                <el-button type="primary">文件上传</el-button>
              </el-upload>
            </el-form-item>

            <el-form-item label="注册安全工程师" prop="safe_height">
              <el-form-item prop="safe_height" style="width: 100%;margin-bottom: 20px;">
                <el-input v-model="ruleForm.safe_height">
                  <template #prepend>高级</template>
                  <template #append>人</template>
                </el-input>
              </el-form-item>
              <el-form-item prop="safe_middle" style="width: 100%;margin-bottom: 20px;">
                <el-input v-model="ruleForm.safe_middle">
                  <template #prepend>中级</template>
                  <template #append>人</template>
                </el-input>
              </el-form-item>
              <el-form-item prop="safe_low" style="width: 100%">
                <el-input v-model="ruleForm.safe_low">
                  <template #prepend>初级</template>
                  <template #append>人</template>
                </el-input>
              </el-form-item>
              <!-- <el-row :gutter="10">
                <el-col :span="8">

                </el-col>
                <el-col :span="8">
                 
                </el-col>
                <el-col :span="8">
                
                </el-col>
              </el-row> -->
            </el-form-item>
            <el-form-item label="安全评价师" prop="safe_one">

              <el-form-item prop="safe_one" style="width: 100%;margin-bottom: 20px;">
                <el-input v-model="ruleForm.safe_one">
                  <template #prepend>一级</template>
                  <template #append>人</template>
                </el-input>
              </el-form-item>


              <el-form-item prop="safe_two" style="width: 100%;margin-bottom: 20px;">
                <el-input v-model="ruleForm.safe_two">
                  <template #prepend>二级</template>
                  <template #append>人</template>
                </el-input>
              </el-form-item>

              <el-form-item prop="safe_three" style="width: 100%">
                <el-input v-model="ruleForm.safe_three">
                  <template #prepend>三级</template>
                  <template #append>人</template>
                </el-input>
              </el-form-item>

            </el-form-item>

            <el-form-item label="工程师" prop="engineer_height">

              <el-form-item prop="engineer_height" style="width: 100%;margin-bottom: 20px;">
                <el-input v-model="ruleForm.engineer_height">
                  <template #prepend>高级</template>
                  <template #append>人</template>
                </el-input>
              </el-form-item>

              <el-form-item prop="engineer_middle" style="width: 100%;margin-bottom: 20px;">
                <el-input v-model="ruleForm.engineer_middle">
                  <template #prepend>中级</template>
                  <template #append>人</template>
                </el-input>
              </el-form-item>

              <el-form-item prop="engineer_low" style="width: 100%">
                <el-input v-model="ruleForm.engineer_low">
                  <template #prepend>初级</template>
                  <template #append>人</template>
                </el-input>
              </el-form-item>

            </el-form-item>
            <el-form-item label="注册消防工程师" prop="fire_one">

              <el-input v-model="ruleForm.fire_one">
                <template #prepend>一级</template>
                <template #append>人</template>
              </el-input>

            </el-form-item>
          </el-form>
          <p>
            从业人员:
            <el-link type="primary" @click="addPeople('add')">新增</el-link>
          </p>
          <template v-for="(item, index) in ruleForm.people" :key="index">
            <el-link type="danger" @click="addPeople('del')">删除</el-link>

            <div class="people">
              <el-form :inline="true" class="demo-form-inline" label-width="100px">
                <el-form-item label="姓名">
                  <el-input v-model="item.peopleName" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="身份证号码">
                  <el-input v-model="item.peopleNumber" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="证书复印件">
                  <el-upload ref="uploadRef" class="upload-demo"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :auto-upload="false"
                    :http-request="peopleHttpRequest" :on-change="
                      (file, fileList) =>
                        peopleChange(file, fileList, index, 'file4')
                    " :on-remove="
  (file, fileList) =>
    peopleChange(file, fileList, index, 'file4')
">
                    <el-button type="primary">文件上传</el-button>
                  </el-upload>
                </el-form-item>
                <el-form-item label="劳动合同">
                  <el-upload ref="uploadRef" class="upload-demo"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :auto-upload="false"
                    :http-request="peopleHttpRequest" :on-change="
                      (file, fileList) =>
                        peopleChange(file, fileList, index, 'file3')
                    " :on-remove="
  (file, fileList) =>
    peopleChange(file, fileList, index, 'file3')
">
                    <el-button type="primary">文件上传</el-button>
                  </el-upload>
                </el-form-item>
                <el-form-item label="社保证明">
                  <el-upload ref="uploadRef" class="upload-demo"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :auto-upload="false" :on-change="
                      (file, fileList) =>
                        peopleChange(file, fileList, index, 'file5')
                    " :on-remove="
  (file, fileList) =>
    peopleChange(file, fileList, index, 'file5')
" :http-request="peopleHttpRequest">
                    <el-button type="primary">文件上传</el-button>
                  </el-upload>
                </el-form-item>
              </el-form>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
      <div class="tips">
        <p>特别提示:</p>
        <p>1.其他信息：请真实填写，不涉及项可不填。</p>
      </div>
      <el-button type="primary" @click="submitForm(ruleFormRef1, ruleFormRef2, ruleFormRef3)"
        class="submit">提交</el-button>
    </div>

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
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch, nextTick } from "vue";
import {
  getInsType,
  getCompanyInfo,
  addInstFormInfo,
  login,
  fileInfo,
  setIsExit
} from "@/api/index";
import router from "@/router";
import {
  FormInstance,
  FormRules,
  UploadUserFile,
  TabsPaneContext,
  UploadProps,
  UploadInstance,
  ElMessage,
} from "element-plus";
import { MapLocation } from "@element-plus/icons-vue";
const activeName = ref("first");
const getInsTypeList = ref([]);

const curFileList = ref<UploadUserFile[]>([]);
let fd = [];
const people = ref([]);
const dialogVisible = ref(false);

const uploadRef = ref<UploadInstance>();
const ruleFormRef1 = ref<FormInstance>();
const ruleFormRef2 = ref<FormInstance>();
const ruleFormRef3 = ref<FormInstance>();
const ruleForm = reactive({
  qiye: "",
  qiyeId: "",
  daibiao: "",
  resource: "",
  ziben: "",
  type: "",
  time: "",
  qixian: "",
  daima: "",
  address: "",
  fanwei: "",
  zs_name: "",
  zs_date: "",
  zs_pz: "",
  service_region: "",
  number: "",
  last_value: "",
  up_down: "",
  fixed_value: "",
  lx_name: "",
  lx_phone: "",
  fax: "",
  operation_space: "",
  safe_height: "",
  safe_middle: "",
  safe_low: "",
  safe_one: "",
  safe_two: "",
  safe_three: "",
  fire_one: "",
  engineer_height: "",
  engineer_middle: "",
  engineer_low: "",
  file1: [],
  file2: [],
  people: [],
});
const rules = reactive<FormRules>({
  qiye: [{ required: true, message: "请填写机构名称", trigger: "blur" }],

  number: [{ required: true, message: "请填写员工人数", trigger: "blur" }],
  // last_value: [{ required: true, message: "请填写上年产值", trigger: "blur" }],
  lx_name: [{ required: true, message: "请填写联系人", trigger: "blur" }],
  lx_phone: [{ required: true, message: "请填写联系人电话", trigger: "blur" }],
  operation_space: [
    { required: true, message: "请填写经营面积", trigger: "blur" },
  ],
  safe_height: [{ required: true, message: "请填写", trigger: "blur" }],
  safe_middle: [{ required: true, message: "请填写", trigger: "blur" }],
  safe_low: [{ required: true, message: "请填写", trigger: "blur" }],
  safe_one: [{ required: true, message: "请填写", trigger: "blur" }],
  safe_two: [{ required: true, message: "请填写", trigger: "blur" }],
  safe_three: [{ required: true, message: "请填写", trigger: "blur" }],
  fire_one: [{ required: true, message: "请填写", trigger: "blur" }],
  engineer_height: [{ required: true, message: "请填写", trigger: "blur" }],
  engineer_middle: [{ required: true, message: "请填写", trigger: "blur" }],
  engineer_low: [{ required: true, message: "请填写", trigger: "blur" }],

  service_region: [
    { required: true, message: "请填写服务区域", trigger: "blur" },
  ],
  file1: [
    {
      required: true,
      message: "请上传文件",
      trigger: "change",
      // validator: fileMustUpload,
    },
  ],
  file2: [
    {
      required: true,
      message: "请上传文件",
      trigger: "change",
      // validator: fileMustUpload,
    },
  ],
  resource: [
    {
      required: true,
      message: "请选择机构服务类型",
      trigger: "change",
    },
  ],
  up_down: [
    {
      required: true,
      message: "请选择企业规模",
      trigger: "change",
    },
  ],
});
const addPeople = (data) => {
  console.log(123);
  if (data == "add") {
    ruleForm.people.push({ peopleName: "", peopleNumber: "" });
  } else {
    ruleForm.people.pop();
  }
};

onMounted(() => {
  getInsType().then((res) => {
    getInsTypeList.value = res.data.data;
  });
});
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
  router.push("/");

}
const peopleHttpRequest = () => { };
const handleHttpRequest = () => {
  var formData = new FormData();
  formData.append("file1", fd["file1"]);
  formData.append("file2", fd["file2"]);

  formData.append("companyId", ruleForm.qiyeId);
  formData.append("zs_name", ruleForm.zs_name);
  if (ruleForm.zs_date != "") {
    formData.append("zs_date", ruleForm.zs_date);
  }

  formData.append("zs_pz", ruleForm.zs_pz);
  formData.append("service_region", ruleForm.service_region);
  formData.append("number", ruleForm.number);
  formData.append("last_value", ruleForm.last_value);
  formData.append("up_down", ruleForm.up_down);
  formData.append("fixed_value", ruleForm.fixed_value);
  formData.append("lx_name", ruleForm.lx_name);
  formData.append("lx_phone", ruleForm.lx_phone);
  formData.append("fax", ruleForm.fax);
  formData.append("operation_space", ruleForm.operation_space);
  formData.append("safe_height", ruleForm.safe_height);
  formData.append("safe_middle", ruleForm.safe_middle);
  formData.append("safe_low", ruleForm.safe_low);
  formData.append("safe_two", ruleForm.safe_two);
  formData.append("safe_three", ruleForm.safe_three);
  formData.append("fire_one", ruleForm.fire_one);
  formData.append("engineer_height", ruleForm.engineer_height);
  formData.append("engineer_middle", ruleForm.engineer_middle);
  formData.append("engineer_low", ruleForm.engineer_low);
  formData.append("type", ruleForm.resource);
  formData.append("style", "0");
  ruleForm.people.forEach((item) => {
    console.log(item);
    var formData2 = new FormData();
    formData2.append("file3", item.file3);
    formData2.append("file4", item.file4);
    formData2.append("file5", item.file5);
    formData2.append("name", item.peopleName);
    formData2.append("id_card", item.peopleNumber);
    formData2.append("style", "1");
    addInstFormInfo(formData2).then((res) => { });
  });
  addInstFormInfo(formData).then((res) => {
    if (res.data.code == 200) {
      ElMessage({
        message: "上传成功",
        showClose: true,
        type: "success",
      });
      router.push("/");
    }
  });
  setIsExit(ruleForm.qiyeId)
};

const handleChange: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
  ruleForm.file1 = uploadFiles;
  ruleFormRef3.value.validateField("file1");

  fd["file1"] = uploadFile.raw;
};
const fileChange: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
  ruleForm.file2 = uploadFiles;
  ruleFormRef3.value.validateField("file2");
  fd["file2"] = uploadFile.raw;
  // fd["flie2"] = uploadFiles[0].raw;
};
const peopleChange: any = (uploadFile, uploadFiles, index, state) => {
  // let name = state
  ruleForm.people[index][state] = uploadFile.raw;

  console.log(ruleForm.people);

  // ruleForm.file2 = uploadFiles;
  // ruleFormRef3.value.validateField("file2");
  // fd["file2"] = uploadFile.raw;
  // fd["flie2"] = uploadFiles[0].raw;
};

const selectFun = () => {
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
    } else {
      ElMessage({
        message: "搜索失败",
        type: "error",
        showClose: true,
      });
    }
  });
};
const onSubmit = () => {
  console.log("submit!");
};
const submitForm = async (
  formEl1: FormInstance | undefined,
  formEl2: FormInstance | undefined,
  formEl3: FormInstance | undefined
) => {
  // if (!formEl1) return;
  try {
    await Promise.all([
      formEl1.validate(),
      formEl2.validate(),
      formEl3.validate(),
    ]);
    // handleHttpRequest();
    // console.log("cs");

    // console.log(formData);
    // console.log(formData.get("file"));
    // let a = [];
    // for (var p of formData) {
    //   console.log(p);
    //   a = p[1];
    // }
    // console.log(a);
    // addInstFormInfo(fd);
    uploadRef.value!.submit();
    // addInstFormInfo(
    //   ruleForm.qiyeId,
    //   ruleForm.zs_name,
    //   ruleForm.zs_date,
    //   ruleForm.zs_pz,
    //   ruleForm.service_region,
    //   ruleForm.number,
    //   ruleForm.last_value,
    //   ruleForm.up_down,
    //   ruleForm.fixed_value,
    //   ruleForm.lx_name,
    //   ruleForm.lx_phone,
    //   ruleForm.fax,
    //   ruleForm.operation_space,
    //   ruleForm.safe_height,
    //   ruleForm.safe_middle,
    //   ruleForm.safe_low,
    //   ruleForm.safe_one,
    //   ruleForm.safe_two,
    //   ruleForm.safe_three,
    //   ruleForm.fire_one,
    //   ruleForm.engineer_height,
    //   ruleForm.engineer_middle,
    //   ruleForm.engineer_low,
    //   ruleForm.resource,
    //   0,

    // ).then((result) => {});
  } catch { }
};
</script>

<style lang="less" scoped>
#form {
  background-image: url("../../assets/login.png");
  // height: calc(100vh);
  background-size: 100% 100%;
  padding: 1px;

  .box {
    width: 70%;

    // height: 1520px;
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

    .submit {
      border-radius: 22px;
      height: 50px;
      width: 100%;
      margin-top: 20px;
    }
  }

  .demo-radio {
    /deep/.el-form-item {
      width: 100%;
    }

    /deep/.el-radio__label {
      // margin-right: 10px;
      width: 200px;
    }
  }

  .tips {
    // height: 153px;
    background: #f1f1f1;
    padding: 20px;
    text-indent: 2em;
    font-size: 14px;
    color: #666e76;
    margin-top: 20px;

    p {
      &:nth-child(1) {
        color: #3385f4;
        text-indent: 0em;
      }
    }
  }

  .el-link {
    vertical-align: revert;
  }

  .people {
    // height: 172px;

    background: #ffffff;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    padding: 10px 30px;
  }
}
</style>

