<template>
  <div id="form">

    <div class="box">
      <h3>安全生产登记表</h3>
      <!-- 市场监督管理注册信息 -->
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="机构服务类型" name="first">
          <el-form :inline="true" class="demo-form-inline" ref="ruleFormRef" :model="ruleForm" :rules="rules"
            label-width="100px">

            <el-form-item label="请选择" prop="resource" v-for="item, index in getInsTypeList" :key="index">
              <el-checkbox-group v-model="ruleForm.resource" v-for="item2, index2 in item.children" :key="index2">

                <el-checkbox :label="item2.id">{{ item2.name }}</el-checkbox>

              </el-checkbox-group>
            </el-form-item>



          </el-form>

        </el-tab-pane>

      </el-tabs>
      <!-- 市场监督管理注册信息 -->
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="市场监督管理注册信息" name="first">
          <el-form :inline="true" class="demo-form-inline" ref="ruleFormRef" :model="ruleForm" :rules="rules"
            label-width="100px">
            <el-form-item label="企业名称" prop="name">
              <el-input v-model="ruleForm.name" placeholder="企业名称" />
            </el-form-item>
            <el-form-item label="法定代表人">
              <el-input v-model="ruleForm.name" placeholder="自动生成" disabled />
            </el-form-item>
            <el-form-item label="注册资本">
              <el-input v-model="ruleForm.name" placeholder="自动生成" disabled />
            </el-form-item>
            <el-form-item label="类型">
              <el-input v-model="ruleForm.name" placeholder="自动生成" disabled />
            </el-form-item>
            <el-form-item label="成立日期">
              <el-input v-model="ruleForm.name" placeholder="自动生成" disabled />
            </el-form-item>
            <el-form-item label="营业期限">
              <el-input v-model="ruleForm.name" placeholder="自动生成" disabled />
            </el-form-item>
            <el-form-item label="社会信用代码">
              <el-input v-model="ruleForm.name" placeholder="自动生成" disabled />
            </el-form-item>
            <el-form-item label="注册地址">
              <el-input v-model="ruleForm.name" placeholder="自动生成" disabled />
            </el-form-item>
            <el-form-item label="经营范围">
              <el-input v-model="ruleForm.name" placeholder="自动生成" disabled />
            </el-form-item>

          </el-form>

        </el-tab-pane>

      </el-tabs>
      <!-- 其他信息 -->
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="其他信息" name="first">
          <el-form :inline="true" class="demo-form-inline" ref="ruleFormRef" :model="ruleForm" :rules="rules"
            label-width="100px">
            <el-form-item label="资质证书名称" prop="name">
              <el-input v-model="ruleForm.name" placeholder="上年产值" />
            </el-form-item>
            <el-form-item label="证书有效期">
              <el-input v-model="ruleForm.name" placeholder="请输入" />
            </el-form-item>

            <el-form-item label="资质证书批准部门">
              <el-input v-model="ruleForm.name" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="服务区域">
              <el-input v-model="ruleForm.name" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="员工人数">
              <el-input v-model="ruleForm.name" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="上年营业额">
              <el-input v-model="ruleForm.name" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="企业规模" prop="resource">

              <el-radio-group v-model="ruleForm.resource">
                <el-radio label="规上企业" />
                <el-radio label="规下企业" />
              </el-radio-group>

            </el-form-item>
            <el-form-item label="固定资产总值">
              <el-input v-model="ruleForm.name" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="联系人">
              <el-input v-model="ruleForm.name" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="ruleForm.name" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="传真">
              <el-input v-model="ruleForm.name" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="经营面积">
              <el-input v-model="ruleForm.name" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="工作场所及档案室面积证明资料">
              <el-input v-model="ruleForm.name" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="内部管理制度清单">
              <el-input v-model="ruleForm.name" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="注册安全工程师">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-input v-model="ruleForm.name" placeholder="人数">
                    <template #prepend>高级</template>

                  </el-input>

                </el-col>
                <el-col :span="8">
                  <el-input v-model="ruleForm.name" placeholder="人数">
                    <template #prepend>中级</template>

                  </el-input>
                </el-col>
                <el-col :span="8">
                  <el-input v-model="ruleForm.name" placeholder="人数">
                    <template #prepend>初级</template>

                  </el-input>
                </el-col>
              </el-row>

            </el-form-item>
            <el-form-item label="注册安全工程师">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-input v-model="ruleForm.name" placeholder="人数">
                    <template #prepend>高级</template>

                  </el-input>

                </el-col>
                <el-col :span="8">
                  <el-input v-model="ruleForm.name" placeholder="人数">
                    <template #prepend>中级</template>

                  </el-input>
                </el-col>
                <el-col :span="8">
                  <el-input v-model="ruleForm.name" placeholder="人数">
                    <template #prepend>初级</template>

                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="注册消防工程师">
              <el-row :gutter="10">
                <el-col :span="24">
                  <el-input v-model="ruleForm.name" placeholder="人数">
                    <template #prepend>一级</template>

                  </el-input>

                </el-col>

              </el-row>
            </el-form-item>
            <el-form-item label="注册消防工程师">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-input v-model="ruleForm.name" placeholder="人数">
                    <template #prepend>高级</template>

                  </el-input>

                </el-col>
                <el-col :span="8">
                  <el-input v-model="ruleForm.name" placeholder="人数">
                    <template #prepend>中级</template>

                  </el-input>
                </el-col>
                <el-col :span="8">
                  <el-input v-model="ruleForm.name" placeholder="人数">
                    <template #prepend>初级</template>

                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>


          </el-form>
          <p>从业人员:</p>
          <div class="people"></div>
        </el-tab-pane>

      </el-tabs>
      <div class="tips">
        <p>特别提示:</p>
        <p>
          1.其他信息：请真实填写，不涉及项可不填。</p>


      </div>
      <el-button type="primary" @click="submitForm(ruleFormRef)">Create</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { getInsType } from "@/api/index"
import type { TabsPaneContext } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
const activeName = ref('first')
const getInsTypeList = ref([])

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
onMounted(() => {
  getInsType().then(res => {
    getInsTypeList.value = res.data.data[0].children
  })
})

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: 'Hello',
  resource: ""
})
const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
})
const onSubmit = () => {
  console.log('submit!')
}
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style lang="less" scoped>
#form {
  background-image: url('../../assets/login.png');
  // height: calc(100vh);
  background-size: 100% 100%;
  padding: 1px;

  .box {
    width: 70%;

    // height: 1520px;
    background: #FFFFFF;
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

      // .el-form-item__label {
      //   overflow: hidden;
      //   white-space: nowrap;
      //   text-overflow: ellipsis;
      //   width: 80px;
      // }

    }
  }

  .tips {
    // height: 153px;
    background: #F1F1F1;
    padding: 20px;
    text-indent: 2em;
    font-size: 14px;
    color: #666E76;
    margin-top: 20px;

    p {
      &:nth-child(1) {
        color: #3385F4;
        text-indent: 0em;
      }

    }
  }

  .people {
    height: 172px;
    background: #FFFFFF;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
  }
}
</style>

