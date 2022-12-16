<template>
  <div id="form">
    <div class="box">
      <h3>安全生产登记表</h3>
      <!-- 市场监督管理注册信息 -->
      <el-tabs v-model="activeName" class="demo-radio" @tab-click="handleClick">
        <el-tab-pane label="机构服务类型" name="first">
          <el-form
            :inline="true"
            class="demo-form-inline"
            ref="ruleFormRef1"
            :model="ruleForm"
            :rules="rules"
            label-width="100px"
          >
            <el-form-item label="请选择" prop="resource">
              <el-radio-group
                v-model="ruleForm.resource"
                v-for="(item, index) in getInsTypeList"
                :key="index"
              >
                <el-radio :label="item.id">{{ item.name }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <!-- 市场监督管理注册信息 -->
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="市场监督管理注册信息" name="first">
          <el-form
            :inline="true"
            class="demo-form-inline"
            ref="ruleFormRef2"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
          >
            <el-form-item label="机构名称" prop="qiye">
              <el-input v-model="ruleForm.qiye" placeholder="请输入">
                <template #append>
                  <el-button type="success" @click="selectFun">搜索</el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="法定代表人">
              <el-input
                v-model="ruleForm.daibiao"
                placeholder="自动生成"
                disabled
              />
            </el-form-item>
            <el-form-item label="注册资本">
              <el-input
                v-model="ruleForm.ziben"
                placeholder="自动生成"
                disabled
              >
                <template #append> 万元 </template>
              </el-input>
            </el-form-item>
            <el-form-item label="类型">
              <el-input
                v-model="ruleForm.type"
                placeholder="自动生成"
                disabled
              />
            </el-form-item>
            <el-form-item label="成立日期">
              <el-input
                v-model="ruleForm.time"
                placeholder="自动生成"
                disabled
              />
            </el-form-item>
            <el-form-item label="营业期限">
              <el-input
                v-model="ruleForm.qixian"
                placeholder="自动生成"
                disabled
              />
            </el-form-item>
            <el-form-item label="社会信用代码">
              <el-input
                v-model="ruleForm.daima"
                placeholder="自动生成"
                disabled
              />
            </el-form-item>
            <el-form-item label="注册地址">
              <el-input
                v-model="ruleForm.address"
                placeholder="自动生成"
                disabled
              >
                <template #append>
                  <el-button
                    type="success"
                    :icon="MapLocation"
                    @click="position"
                  ></el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="经营范围">
              <el-input
                v-model="ruleForm.fanwei"
                placeholder="自动生成"
                disabled
                type="textarea"
                autosize
              />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <!-- 其他信息 -->
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="其他信息" name="first">
          <el-form
            :inline="true"
            class="demo-form-inline"
            ref="ruleFormRef3"
            :model="ruleForm"
            :rules="rules"
            label-width="150px"
          >
            <el-form-item label="资质证书名称" prop="zs_name">
              <el-input v-model="ruleForm.zs_name" placeholder="上年产值" />
            </el-form-item>
            <el-form-item label="证书有效期" prop="zs_date">
              <el-date-picker
                v-model="ruleForm.zs_date"
                type="datetime"
                placeholder="Select date and time"
                value-format="YYYY/MM/DD HH:mm:ss"
              />
            </el-form-item>

            <el-form-item label="资质证书批准部门" prop="zs_pz">
              <el-input v-model="ruleForm.zs_pz" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="服务区域" prop="service_region">
              <el-input
                v-model="ruleForm.service_region"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item label="员工人数" prop="number">
              <el-input v-model="ruleForm.number" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="上年产值" prop="last_value">
              <el-input v-model="ruleForm.last_value" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="机构规模">
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
              <el-input
                v-model="ruleForm.operation_space"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item
              label="工作场所及档案室面积证明资料"
              label-width="230px"
            >
              <el-upload
                ref="uploadRef"
                class="upload-demo"
                action="/api/form/addInstFormInfo"
                :auto-upload="false"
                :data="{ companyId: ruleForm.qiyeId }"
                name="file1"
              >
                <el-button type="primary">文件上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="内部管理制度清单">
              <el-upload
                ref="uploadRef"
                class="upload-demo"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :auto-upload="false"
                :data="{ companyId: ruleForm.qiyeId }"
                name="file2"
              >
                <el-button type="primary">文件上传</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="注册安全工程师">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-input v-model="ruleForm.safe_height" placeholder="人数">
                    <template #prepend>高级</template>
                  </el-input>
                </el-col>
                <el-col :span="8">
                  <el-input v-model="ruleForm.safe_middle" placeholder="人数">
                    <template #prepend>中级</template>
                  </el-input>
                </el-col>
                <el-col :span="8">
                  <el-input v-model="ruleForm.safe_low" placeholder="人数">
                    <template #prepend>初级</template>
                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="注册安全工程师">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-input v-model="ruleForm.safe_one" placeholder="人数">
                    <template #prepend>一级</template>
                  </el-input>
                </el-col>
                <el-col :span="8">
                  <el-input v-model="ruleForm.safe_two" placeholder="人数">
                    <template #prepend>二级</template>
                  </el-input>
                </el-col>
                <el-col :span="8">
                  <el-input v-model="ruleForm.safe_three" placeholder="人数">
                    <template #prepend>三级</template>
                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="注册消防工程师">
              <el-row :gutter="10">
                <el-col :span="24">
                  <el-input v-model="ruleForm.fire_one" placeholder="人数">
                    <template #prepend>一级</template>
                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="工程师">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-input
                    v-model="ruleForm.engineer_height"
                    placeholder="人数"
                  >
                    <template #prepend>高级</template>
                  </el-input>
                </el-col>
                <el-col :span="8">
                  <el-input
                    v-model="ruleForm.engineer_middle"
                    placeholder="人数"
                  >
                    <template #prepend>中级</template>
                  </el-input>
                </el-col>
                <el-col :span="8">
                  <el-input v-model="ruleForm.engineer_low" placeholder="人数">
                    <template #prepend>初级</template>
                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
          <p>
            从业人员:
            <el-link type="primary" @click="addPeople('add')">新增</el-link>
          </p>
          <template v-for="(item, index) in ruleForm.people" :key="index">
            <el-link type="danger" @click="addPeople('del')">删除</el-link>

            <div class="people">
              <el-form
                :inline="true"
                class="demo-form-inline"
                label-width="100px"
              >
                <el-form-item label="姓名">
                  <el-input v-model="item.peopleName" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="身份证号码">
                  <el-input v-model="item.peopleNumber" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="证书复印件">
                  <el-upload
                    ref="uploadRef"
                    class="upload-demo"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :auto-upload="false"
                    name="file4"
                    :data="{ companyId: ruleForm.qiyeId }"
                  >
                    <el-button type="primary">文件上传</el-button>
                  </el-upload>
                </el-form-item>
                <el-form-item label="劳动合同">
                  <el-upload
                    ref="uploadRef"
                    class="upload-demo"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :auto-upload="false"
                    name="file3"
                    :data="{ companyId: ruleForm.qiyeId }"
                  >
                    <el-button type="primary">文件上传</el-button>
                  </el-upload>
                </el-form-item>
                <el-form-item label="社保证明">
                  <el-upload
                    ref="uploadRef"
                    class="upload-demo"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :auto-upload="false"
                    name="file5"
                    :data="{ companyId: ruleForm.qiyeId }"
                  >
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
      <el-button
        type="primary"
        @click="submitForm(ruleFormRef1, ruleFormRef2, ruleFormRef3)"
        class="submit"
        >提交</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import {
  getInsType,
  getCompanyInfo,
  addInstFormInfo,
  login,
} from "@/api/index";
import type { TabsPaneContext } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { MapLocation } from "@element-plus/icons-vue";
const activeName = ref("first");
const getInsTypeList = ref([]);

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
onMounted(() => {
  getInsType().then((res) => {
    getInsTypeList.value = res.data.data;
  });
});
const people = ref([]);

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

  people: [],
});
const rules = reactive<FormRules>({
  qiye: [{ required: true, message: "请填写机构名称", trigger: "blur" }],
  // zs_name: [{ required: true, message: "请填写资质证书名称", trigger: "blur" }],
  // zs_date: [{ required: true, message: "请填写证书有效期", trigger: "blur" }],
  // number: [{ required: true, message: "请填写员工人数", trigger: "blur" }],
  // last_value: [{ required: true, message: "请填写上年产值", trigger: "blur" }],
  // lx_name: [{ required: true, message: "请填写联系人", trigger: "blur" }],
  // lx_phone: [{ required: true, message: "请填写联系人电话", trigger: "blur" }],
  // operation_space: [
  //   { required: true, message: "请填写经营面积", trigger: "blur" },
  // ],
  // fixed_value: [
  //   { required: true, message: "请填写固定资产总值", trigger: "blur" },
  // ],
  // zs_pz: [
  //   { required: true, message: "请填写资质证书批准部门", trigger: "blur" },
  // ],
  // service_region: [
  //   { required: true, message: "请填写服务区域", trigger: "blur" },
  // ],
  resource: [
    {
      required: true,
      message: "请选择机构服务类型",
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

    console.log("cs");

    addInstFormInfo(
      ruleForm.qiyeId,
      ruleForm.zs_name,
      ruleForm.zs_date,
      ruleForm.zs_pz,
      ruleForm.service_region,
      ruleForm.number,
      ruleForm.last_value,
      ruleForm.up_down,
      ruleForm.fixed_value,
      ruleForm.lx_name,
      ruleForm.lx_phone,
      ruleForm.fax,
      ruleForm.operation_space,
      ruleForm.safe_height,
      ruleForm.safe_middle,
      ruleForm.safe_low,
      ruleForm.safe_one,
      ruleForm.safe_two,
      ruleForm.safe_three,
      ruleForm.fire_one,
      ruleForm.engineer_height,
      ruleForm.engineer_middle,
      ruleForm.engineer_low,
      ruleForm.resource,
      0
    ).then((result) => {});
  } catch {}
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
    height: 172px;
    background: #ffffff;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    padding: 10px 30px;
  }
}
</style>

