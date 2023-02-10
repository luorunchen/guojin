<template>
  <div class="info">
    <!-- --------------------- -->
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="市场监督管理注册信息" name="first">
        <el-form
          :inline="true"
          class="demo-form-inline"
          ref="ruleFormRef"
          :model="ruleForm"
          label-width="100px"
        >
          <el-form-item label="企业名称" prop="name">
            <el-input
              v-model="ruleForm.company"
              placeholder="企业名称"
              disabled
            >
            </el-input>
          </el-form-item>
          <el-form-item label="法定代表人">
            <el-input
              v-model="ruleForm.legal_person"
              placeholder="自动生成"
              disabled
            />
          </el-form-item>
          <el-form-item label="注册资本">
            <el-input
              v-model="ruleForm.register_capital"
              placeholder="自动生成"
              disabled
            >
              <template #append> 万元 </template>
            </el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input
              v-model="ruleForm.style"
              placeholder="自动生成"
              disabled
            />
          </el-form-item>
          <el-form-item label="成立日期">
            <el-input
              v-model="ruleForm.register_date"
              placeholder="自动生成"
              disabled
            />
          </el-form-item>
          <el-form-item label="营业期限">
            <el-input
              v-model="ruleForm.expire_date"
              placeholder="自动生成"
              disabled
            />
          </el-form-item>
          <el-form-item label="社会信用代码">
            <el-input v-model="ruleForm.code" placeholder="自动生成" disabled />
          </el-form-item>
          <el-form-item label="注册地址">
            <el-input
              v-model="ruleForm.address"
              placeholder="自动生成"
              disabled
            />
          </el-form-item>
          <el-form-item label="经营范围">
            <el-input
              v-model="ruleForm.scope"
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
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="其他信息" name="first">
        <el-form
          :inline="true"
          class="demo-form-inline"
          ref="ruleFormRef"
          :model="ruleForm"
          label-width="100px"
        >
          <el-form-item label="上年产值" prop="name">
            <el-input
              v-model="ruleForm.last_value"
              placeholder="上年产值"
              disabled
            >
              <template #append> 万元 </template>
            </el-input>
          </el-form-item>
          <el-form-item label="员工人数">
            <el-input v-model="ruleForm.number" placeholder="请输入" disabled>
              <template #append> 人 </template>
            </el-input>
          </el-form-item>

          <el-form-item label="占地面积">
            <el-input
              v-model="ruleForm.floor_space"
              placeholder="请输入"
              disabled
            >
              <template #append> 平方 </template>
            </el-input>
          </el-form-item>
          <el-form-item label="经营面积">
            <el-input
              v-model="ruleForm.operation_space"
              placeholder="请输入"
              disabled
            >
              <template #append> 平方 </template>
            </el-input>
          </el-form-item>
          <el-form-item label="所属行业" prop="industry">
            <!-- <el-cascader :props="props" v-model="ruleForm.industry" /> -->
            <el-input
              v-model="ruleForm.industry"
              placeholder="请输入"
              disabled
            />
          </el-form-item>
          <el-form-item label="安全投入">
            <el-input
              v-model="ruleForm.safe_input"
              placeholder="请输入"
              disabled
            >
              <template #append> 万元 </template>
            </el-input>
          </el-form-item>
          <el-form-item label="评定标准">
            <el-input
              v-model="ruleForm.evaluation_standard"
              placeholder="请输入"
              disabled
            />
          </el-form-item>
          <el-form-item label="企业规模">
            <el-input
              v-model="ruleForm.up_down"
              placeholder="请输入"
              disabled
            />
          </el-form-item>
          <el-form-item label="主要产品">
            <el-input
              v-model="ruleForm.products"
              placeholder="请输入"
              disabled
            />
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <!-- 相关人员联系方式 -->
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="相关人员联系方式" name="first">
        <el-form
          :inline="true"
          class="demo-form-inline"
          ref="ruleFormRef"
          :model="ruleForm"
          label-width="150px"
          label-position="left"
        >
          <el-form-item label="主要负责人" prop="name">
            <template v-for="(i, j) in ruleForm.people" :key="j">
              <el-input
                v-model="ruleForm.people[j]"
                placeholder="请输入"
                style="margin-bottom: 10px"
                disabled
              >
              </el-input>
            </template>
          </el-form-item>
          <el-form-item label="安全生产管理人员" prop="name">
            <template v-for="(i, j) in ruleForm.anquan" :key="j">
              <el-input
                v-model="ruleForm.anquan[j]"
                placeholder="请输入"
                style="margin-bottom: 10px"
                disabled
              >
              </el-input>
            </template>
          </el-form-item>
          <el-form-item label="消防生产管理人员" prop="name">
            <template v-for="(i, j) in ruleForm.xiaofang" :key="j">
              <el-input
                v-model="ruleForm.xiaofang[j]"
                placeholder="请输入"
                disabled
                style="margin-bottom: 10px"
              >
              </el-input>
            </template>
          </el-form-item>
          <el-form-item label="电工" prop="name">
            <template v-for="(i, j) in ruleForm.diangong" :key="j">
              <el-input
                v-model="ruleForm.diangong[j]"
                placeholder="请输入"
                disabled
                style="margin-bottom: 10px"
              >
              </el-input>
            </template>
          </el-form-item>
          <el-form-item label="设备管理人员" prop="name">
            <template v-for="(i, j) in ruleForm.shebei" :key="j">
              <el-input
                v-model="ruleForm.shebei[j]"
                placeholder="请输入"
                disabled
                style="margin-bottom: 10px"
              >
              </el-input>
            </template>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <!-- 本单位涉及的场所(可多选) -->
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="本单位涉及的场所" name="first">
        <el-form
          class="demo-form-inline"
          ref="ruleFormRef"
          :model="ruleForm"
          label-width="150px"
        >
          <el-form-item
            :label="item.name"
            prop="resource"
            v-for="(item, index) in treeList"
            :key="index"
          >
            <el-checkbox-group
              disabled
              v-model="ruleForm.resource"
              v-for="(item2, index2) in item.children"
              :key="index2"
            >
              <el-checkbox :label="item2.id">{{ item2.name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item
            label="自行建立专用设备设施"
            prop="resource"
            label-width="200px"
          >
            <el-input disabled></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <!-- --------------------- -->
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, defineProps, watch } from "vue";
import {
  formTree,
  getCompanyInfoByIds,
  governmentGetCompanyInfoById,
} from "@/api/index";
const activeName = ref("first");
const treeList = ref([]);
const ruleForm = reactive({
  legal_person: "",
  resource: [],
  people: [],
  anquan: [],
  xiaofang: [],
  diangong: [],
  shebei: [],
  company: "",
  register_capital: "",
  style: "",
  expire_date: "",
  register_date: "",
  code: "",
  address: "",
  scope: "",
  last_value: "",
  number: "",
  floor_space: "",
  operation_space: "",
  industry: "",
  evaluation_standard: "",
  up_down: "",
  products: "",
  safe_input: "",
});
onMounted(() => {
  props.status == "government"
    ? governmentGetCompanyInfoByIdFun()
    : getCompanyInfoByIdsFun();
  // getCompanyInfoByIdsFun();
  // console.log(props.seeRowId, "status");
});
watch(
  () => props.seeRowId,
  (val) => {
    // console.log(val);
    governmentGetCompanyInfoByIdFun();
  }
);
const props = defineProps({
  status: String,
  seeRowId: String,
});
const getCompanyInfoByIdsFun = () => {
  formTree().then((res) => {
    treeList.value = res.data.data[0].children;
  });

  getCompanyInfoByIds().then((res) => {
    for (let key in res.data.data.companyOther) {
      for (let label in ruleForm) {
        if (label == key) {
          ruleForm[label] = res.data.data.companyOther[key];
        }
      }
    }

    ruleForm.resource = res.data.data.treeList;

    ruleForm.people = [];
    ruleForm.anquan = [];
    ruleForm.xiaofang = [];
    ruleForm.diangong = [];
    ruleForm.shebei = [];
    res.data.data.personList.forEach((element) => {
      switch (element.type) {
        case 1:
          ruleForm.people.push(`${element.name},${element.phone}`);
          break;
        case 2:
          ruleForm.anquan.push(`${element.name},${element.phone}`);
          break;
        case 3:
          ruleForm.xiaofang.push(`${element.name},${element.phone}`);
          break;
        case 4:
          ruleForm.diangong.push(`${element.name},${element.phone}`);
          break;
        case 5:
          ruleForm.shebei.push(`${element.name},${element.phone}`);
          break;
      }
    });
  });
};
const governmentGetCompanyInfoByIdFun = () => {
  // formTree().then((res) => {
  //   treeList.value = res.data.data[0].children;
  // });

  governmentGetCompanyInfoById(props.seeRowId).then((res) => {
    for (let key in res.data.data.companyOther) {
      for (let label in ruleForm) {
        if (label == key) {
          ruleForm[label] = res.data.data.companyOther[key];
        }
      }
    }

    ruleForm.resource = res.data.data.treeList;

    ruleForm.people = [];
    ruleForm.anquan = [];
    ruleForm.xiaofang = [];
    ruleForm.diangong = [];
    ruleForm.shebei = [];
    res.data.data.personList.forEach((element) => {
      switch (element.type) {
        case 1:
          ruleForm.people.push(`${element.name},${element.phone}`);
          break;
        case 2:
          ruleForm.anquan.push(`${element.name},${element.phone}`);
          break;
        case 3:
          ruleForm.xiaofang.push(`${element.name},${element.phone}`);
          break;
        case 4:
          ruleForm.diangong.push(`${element.name},${element.phone}`);
          break;
        case 5:
          ruleForm.shebei.push(`${element.name},${element.phone}`);
          break;
      }
    });
  });
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