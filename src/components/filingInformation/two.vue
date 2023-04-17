<template>
  <div>
    <!-- 市场监督管理注册信息 -->
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="机构服务类型" name="first">
        <el-form :inline="true" class="demo-form-inline" ref="ruleFormRef1" label-width="100px">
          <el-form-item label="类型" prop="resource">
            <el-input v-model="ruleForm.resource" disabled> </el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <!-- 市场监督管理注册信息 -->
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="市场监督管理注册信息" name="first">
        <el-form :inline="true" class="demo-form-inline" ref="ruleFormRef2" label-width="120px">
          <el-form-item label="机构名称" prop="qiye">
            <el-input v-model="ruleForm.company" placeholder="请输入" disabled>
            </el-input>
          </el-form-item>
          <el-form-item label="法定代表人">
            <el-input v-model="ruleForm.legal_person" placeholder="自动生成" disabled />
          </el-form-item>
          <el-form-item label="注册资本">
            <el-input v-model="ruleForm.register_capital" placeholder="自动生成" disabled>
              <template #append> 万元 </template>
            </el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="ruleForm.style" placeholder="自动生成" disabled />
          </el-form-item>
          <el-form-item label="成立日期">
            <el-input v-model="ruleForm.register_date" placeholder="自动生成" disabled />
          </el-form-item>
          <el-form-item label="营业期限">
            <el-input v-model="ruleForm.expire_date" placeholder="自动生成" disabled />
          </el-form-item>
          <el-form-item label="社会信用代码">
            <el-input v-model="ruleForm.code" placeholder="自动生成" disabled />
          </el-form-item>
          <el-form-item label="注册地址">
            <el-input v-model="ruleForm.address" placeholder="自动生成" disabled>
              <template #append>
                <el-button type="success" :icon="MapLocation" @click="position"></el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="经营范围">
            <el-input v-model="ruleForm.scope" placeholder="自动生成" disabled type="textarea" autosize />
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <!-- 其他信息 -->
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="其他信息" name="first">
        <el-form :inline="true" class="demo-form-inline" ref="ruleFormRef3" :model="ruleForm" label-width="150px">
          <el-form-item label="资质证书名称" prop="zs_name">
            <el-input v-model="ruleForm.zs_name" disabled />
          </el-form-item>
          <el-form-item label="证书有效期" prop="zs_date">
            <el-date-picker disabled v-model="ruleForm.zs_date" type="datetime" placeholder="Select date and time"
              value-format="YYYY/MM/DD HH:mm:ss" />
          </el-form-item>

          <el-form-item label="资质证书批准部门" prop="zs_pz">
            <el-input disabled v-model="ruleForm.zs_pz" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="服务区域" prop="service_region">
            <el-input disabled v-model="ruleForm.service_region" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="员工人数" prop="number">
            <el-input disabled v-model="ruleForm.number" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="上年产值" prop="last_value">
            <el-input disabled v-model="ruleForm.last_value" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="机构规模" prop="up_down">
            <!-- <el-radio-group v-model="ruleForm.up_down">
              <el-radio label="1">规上企业</el-radio>
              <el-radio label="0">规下企业</el-radio>
            </el-radio-group> -->
            <el-input disabled v-model="ruleForm.up_down" />
          </el-form-item>
          <el-form-item label="固定资产总值" prop="fixed_value">
            <el-input disabled v-model="ruleForm.fixed_value" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="联系人" prop="lx_name">
            <el-input disabled v-model="ruleForm.lx_name" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="联系电话" prop="lx_phone">
            <el-input disabled v-model="ruleForm.lx_phone" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="传真">
            <el-input disabled v-model="ruleForm.fax" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="经营面积" prop="operation_space">
            <el-input disabled v-model="ruleForm.operation_space" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="工作场所及档案室面积证明资料" label-width="230px" prop="file1">
            <!-- <el-upload
              ref="uploadRef"
              class="upload-demo"
              :auto-upload="false"
              name="file1"
              :on-change="handleChange"
              :on-remove="handleChange"
              :http-request="handleHttpRequest"
            >
              <el-button type="primary">文件上传</el-button>
            </el-upload> -->
          </el-form-item>
          <el-form-item label="内部管理制度清单" prop="file2">
            <!-- <el-upload
              ref="uploadRef"
              class="upload-demo"
              :auto-upload="false"
              :data="{ companyId: ruleForm.qiyeId }"
              name="file2"
              :on-change="fileChange"
              :on-remove="fileChange"
              :http-request="handleHttpRequest"
            >
              <el-button type="primary">文件上传</el-button>
            </el-upload> -->
          </el-form-item>
          <el-form-item label="注册安全工程师" prop="safe_height">
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item prop="safe_height" style="width: 100%">
                  <el-input disabled v-model="ruleForm.safe_height" placeholder="人数">
                    <template #prepend>高级</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="safe_middle" style="width: 100%">
                  <el-input disabled v-model="ruleForm.safe_middle" placeholder="人数">
                    <template #prepend>中级</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="safe_low" style="width: 100%">
                  <el-input disabled v-model="ruleForm.safe_low" placeholder="人数">
                    <template #prepend>初级</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="注册安全工程师" prop="safe_one">
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item prop="safe_one" style="width: 100%">
                  <el-input disabled v-model="ruleForm.safe_one" placeholder="人数">
                    <template #prepend>一级</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="safe_two" style="width: 100%">
                  <el-input disabled v-model="ruleForm.safe_two" placeholder="人数">
                    <template #prepend>二级</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="safe_three" style="width: 100%">
                  <el-input disabled v-model="ruleForm.safe_three" placeholder="人数">
                    <template #prepend>三级</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="注册消防工程师" prop="fire_one">
            <el-row :gutter="10">
              <el-col :span="24">
                <el-input disabled v-model="ruleForm.fire_one" placeholder="人数">
                  <template #prepend>一级</template>
                </el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="工程师" prop="engineer_height">
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item prop="engineer_height" style="width: 100%">
                  <el-input v-model="ruleForm.engineer_height" placeholder="人数" disabled>
                    <template #prepend>高级</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="engineer_middle" style="width: 100%">
                  <el-input v-model="ruleForm.engineer_middle" placeholder="人数" disabled>
                    <template #prepend>中级</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="engineer_low" style="width: 100%">
                  <el-input v-model="ruleForm.engineer_low" placeholder="人数" disabled>
                    <template #prepend>初级</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <!-- <p>
          从业人员:
          <el-link type="primary" @click="addPeople('add')">新增</el-link>
        </p> -->
        <!-- <template v-for="(item, index) in ruleForm.people" :key="index">
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
                  :http-request="peopleHttpRequest"
                  :on-change="
                    (file, fileList) =>
                      peopleChange(file, fileList, index, 'file4')
                  "
                  :on-remove="
                    (file, fileList) =>
                      peopleChange(file, fileList, index, 'file4')
                  "
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
                  :http-request="peopleHttpRequest"
                  :on-change="
                    (file, fileList) =>
                      peopleChange(file, fileList, index, 'file3')
                  "
                  :on-remove="
                    (file, fileList) =>
                      peopleChange(file, fileList, index, 'file3')
                  "
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
                  :on-change="
                    (file, fileList) =>
                      peopleChange(file, fileList, index, 'file5')
                  "
                  :on-remove="
                    (file, fileList) =>
                      peopleChange(file, fileList, index, 'file5')
                  "
                  :http-request="peopleHttpRequest"
                >
                  <el-button type="primary">文件上传</el-button>
                </el-upload>
              </el-form-item>
            </el-form>
          </div>
        </template> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import {
  getInstitutionsInfoById,
  manageGetInstitutionsInfoById,
  governmentGetInstitutionsInfoById,
  getInstType
} from "@/api/index";
import { ref, onMounted, reactive } from "vue";

const activeName = ref("first");
const props = defineProps({
  status: String,
  seeRowId: String,
});
const ruleForm = reactive({
  company: "",
  qiyeId: "",
  legal_person: "",
  resource: "",
  register_capital: "",
  style: "",
  register_date: "",
  expire_date: "",
  code: "",
  address: "",
  scope: "",
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
onMounted(() => {
  onMountedFun();
  console.log('dadadadas', props.seeRowId)
});
const onMountedFun = () => {
  getInstType(props.seeRowId).then(res => {
    // console.log();
    ruleForm.resource = res.data.data
  })
  if (props.status == "reception") {
    getInstitutionsInfoById().then((res) => {
      for (let key in res.data.data.institutions_other) {
        for (let label in ruleForm) {
          if (label == key) {
            ruleForm[label] = res.data.data.institutions_other[key];

          }
        }

      }
      ruleForm.up_down == '1' ? (ruleForm.up_down = '规上企业') : (ruleForm.up_down = '规下企业')
    });
  } else if (props.status == "government") {
    governmentGetInstitutionsInfoById(props.seeRowId).then((res) => {
      for (let key in res.data.data.institutions_other) {
        for (let label in ruleForm) {
          if (label == key) {
            ruleForm[label] = res.data.data.institutions_other[key];
          }
        }
      }
      ruleForm.up_down == '1' ? (ruleForm.up_down = '规上企业') : (ruleForm.up_down = '规下企业')
    });
  } else {
    manageGetInstitutionsInfoById(props.status).then((res) => {
      for (let key in res.data.data.institutions_other) {
        for (let label in ruleForm) {
          if (label == key) {
            ruleForm[label] = res.data.data.institutions_other[key];
          }
        }
      }
      ruleForm.up_down == '1' ? (ruleForm.up_down = '规上企业') : (ruleForm.up_down = '规下企业')
    });
  }
};
</script>
<style lang='less' scoped>
.demo-tabs {
  margin-top: 10px;

  padding: 10px;
  box-sizing: border-box;
  // height: 500px;
  background: #ffffff;
  box-shadow: 0px 0px 13px 0px #ebebeb;
  border-radius: 4px;

  .el-form-item {
    width: 46%;
  }
}

/deep/.el-checkbox-group {
  width: 300px;
}
</style>