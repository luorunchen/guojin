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

                  <el-button type="success" :icon="Position" @click="position"></el-button>
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
                @change="industryChang" placeholder="请先输入上年产值" />
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
                <el-input v-model="ruleForm.people[j]" placeholder="请输入" @focus="inputFocus(1, j)"
                  style="margin-bottom: 10px">
                  <template #append>
                    <el-link type="primary" @click="add(ruleForm.people)">
                      新增
                    </el-link>
                    <span v-if="j >= 1"> /</span>
                    <el-link type="danger" v-if="j >= 1" @click="delList(ruleForm.people, j)">
                      删除
                    </el-link>
                  </template>
                </el-input>
              </template>
            </el-form-item>
            <el-form-item label="安全生产管理人员" prop="name">
              <template v-for="(i, j) in ruleForm.anquan" :key="j">
                <el-input v-model="ruleForm.anquan[j]" placeholder="请输入" @focus="inputFocus(2, j)"
                  style="margin-bottom: 10px">
                  <template #append>
                    <el-link type="primary" @click="add(ruleForm.anquan)">
                      新增
                    </el-link>
                    <span v-if="j >= 1"> /</span>
                    <el-link type="danger" v-if="j >= 1" @click="delList(ruleForm.anquan, j)">
                      删除
                    </el-link>
                  </template>
                </el-input>
              </template>
            </el-form-item>
            <el-form-item label="消防生产管理人员" prop="name">
              <template v-for="(i, j) in ruleForm.xiaofang" :key="j">
                <el-input v-model="ruleForm.xiaofang[j]" placeholder="请输入" @focus="inputFocus(3, j)"
                  style="margin-bottom: 10px">
                  <template #append>
                    <el-link type="primary" @click="add(ruleForm.xiaofang)">
                      新增
                    </el-link>
                    <span v-if="j >= 1"> /</span>
                    <el-link type="danger" v-if="j >= 1" @click="delList(ruleForm.xiaofang, j)">
                      删除
                    </el-link>
                  </template>
                </el-input>
              </template>
            </el-form-item>
            <el-form-item label="电工" prop="name">
              <template v-for="(i, j) in ruleForm.diangong" :key="j">
                <el-input v-model="ruleForm.diangong[j]" placeholder="请输入" @focus="inputFocus(4, j)"
                  style="margin-bottom: 10px">
                  <template #append>
                    <el-link type="primary" @click="add(ruleForm.diangong)">
                      新增
                    </el-link>
                    <span v-if="j >= 1"> /</span>
                    <el-link type="danger" v-if="j >= 1" @click="delList(ruleForm.diangong, j)">
                      删除
                    </el-link>
                  </template>
                </el-input>
              </template>
            </el-form-item>
            <el-form-item label="设备管理人员" prop="name">
              <template v-for="(i, j) in ruleForm.shebei" :key="j">
                <el-input v-model="ruleForm.shebei[j]" placeholder="请输入" @focus="inputFocus(5, j)"
                  style="margin-bottom: 10px">
                  <template #append>
                    <el-link type="primary" @click="add(ruleForm.shebei)">
                      新增
                    </el-link>
                    <span v-if="j >= 1"> /</span>
                    <el-link type="danger" v-if="j >= 1" @click="delList(ruleForm.shebei, j)">
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
            <el-form-item label="自行建立专用设备设施" prop="resource" label-width="170px">
              <el-input></el-input>
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
        <el-form-item label="姓名" prop="username" :rules="[
          { required: true, message: 'age is required' },
        
        ]">
          <el-input v-model.number="numberValidateForm.username" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone" :rules="[
          { required: true, message: 'age is required' },
        
        ]">
          <el-input v-model.number="numberValidateForm.phone" type="text" autocomplete="off" />
        </el-form-item>
        <el-button type="primary" @click="submitForm1(formRef)">
          添加
        </el-button>
      </el-form>

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
  addPerson
} from '@/api/index'
import { ref, reactive, onMounted, watch, nextTick } from 'vue'
import router from '@/router'
import { ElMessage, TabsPaneContext } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import {
  Position
} from '@element-plus/icons-vue'
const activeName = ref('first')
const formTreeList = ref([])
const hyTreeList = ref([])
const inputType: any = ref()
const addList = ref([''])
const centerDialogVisible = ref(false)
const mapDialogVisible = ref(false)
let id = 0
const ruleFormRef = ref<FormInstance>()
// const ruleFormRe1 = ref<FormInstance>()
const formRef = ref<FormInstance>()
const ruleForm = reactive({
  qiye: '',
  daibiao: '',
  ziben: '',
  type: '',
  time: '',
  daima: '',
  address: '',
  hangye: '',
  resource: [],
  industry: '',
  fanwei: '',
  qixian: '',
  chanzhi: '',
  renshu: '',
  zdmianji: '',
  jymianji: '',
  touru: '',
  biaozhun: '',
  guimo: '',
  chanping: '',
  qiyeId: '10013',
  people: [''],
  anquan: [''],
  xiaofang: [''],
  diangong: [''],
  shebei: [''],
})


const numberValidateForm = reactive({
  username: '',
  phone: ''
})
const rules = reactive<FormRules>({
  qiye: [{ required: true, message: '请输入完整的公司名称', trigger: 'blur' }],
  chanzhi: [{ required: true, message: '请输入上年产值', trigger: 'blur' }],
  renshu: [{ required: true, message: '请输入员工人数', trigger: 'blur' }],
  zdmianji: [{ required: true, message: '请输入占地面积', trigger: 'blur' }],
  jymianji: [{ required: true, message: '请输入经营面积', trigger: 'blur' }],
  chanping: [{ required: true, message: '请输入主要产品', trigger: 'blur' }],
  // guimo: [
  //   {
  //     required: true,
  //     message: '请选择企业规模',
  //     trigger: 'change',
  //   },
  // ],
  industry: [
    {
      required: true,
      message: '请选择所属行业',
      trigger: 'change',
    },
  ],
})
onMounted(() => {
  formTree().then((res) => {
    console.log(res.data.data, 999)
    formTreeList.value = res.data.data[0].children
  })
  hyTree().then((res) => {
    hyTreeList.value = res.data.data[0].children
  })
})
watch(
  () => ruleForm.chanzhi,
  (val) => {
    console.log(val)
    if (val * 1 >= 2000) {
      ruleForm.guimo = '规上企业'
    } else {
      ruleForm.guimo = '规下企业'
    }
  }
)
const add = (list) => {
  // console.log();
  list.push('')
}
const delList = (list, index) => {
  // ruleForm.people[index] = ''
  console.log(ruleForm.people)

  list.splice(index, 1)
  console.log(list)
}
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const industryChang = (value) => {
  console.log(value)
  setCompHy(value[value.length - 1], ruleForm.qiyeId, ruleForm.chanzhi).then(
    (res) => {
      if (res.data.code == 200) {
        ruleForm.hangye = res.data.data.industry
        ruleForm.biaozhun = res.data.data.evaluation_standard
        ruleForm.touru = res.data.data.safe_input
      }
    }
  )
}
const selectFun = () => {
  getCompanyInfo(ruleForm.qiye).then((res) => {
    if (res.data.code == 200) {
      ruleForm.qiye = res.data.data.company
      ruleForm.qiyeId = res.data.data.companyId
      ruleForm.daibiao = res.data.data.legal_person
      ruleForm.ziben = res.data.data.register_capital
      ruleForm.type = res.data.data.style
      ruleForm.time = res.data.data.register_date
      ruleForm.qixian = res.data.data.expire_date
      ruleForm.daima = res.data.data.code
      ruleForm.address = res.data.data.address
      ruleForm.fanwei = res.data.data.scope
    } else {
      ElMessage({
        message: '搜索失败',
        type: 'error',
        showClose: true,
      })
    }
  })
}
const position = () => {
  mapDialogVisible.value = true
  mapFun()
}
const inputFocus = (type, index) => {
  centerDialogVisible.value = true
  inputType.value = { type, index }
}
const submitForm1 = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      // console.log('submit!')
      addPerson(
        numberValidateForm.username,
        numberValidateForm.phone,
        inputType.value.type,
        ruleForm.qiyeId
      ).then(res => {
        if (res.data.code == 200) {
          centerDialogVisible.value = false

          ElMessage({
            showClose: true,
            message: '添加成功',
            type: 'success'
          })
          switch (inputType.value.type) {
            case 1:
              ruleForm.people[inputType.value.index] = `${numberValidateForm.username},${numberValidateForm.phone}`
              break;
            case 2:
              ruleForm.anquan[inputType.value.index] = `${numberValidateForm.username},${numberValidateForm.phone}`
              break;
            case 3:
              ruleForm.xiaofang[inputType.value.index] = `${numberValidateForm.username},${numberValidateForm.phone}`
              break;
            case 4:
              ruleForm.diangong[inputType.value.index] = `${numberValidateForm.username},${numberValidateForm.phone}`
              break;
            case 5:
              ruleForm.shebei[inputType.value.index] = `${numberValidateForm.username},${numberValidateForm.phone}`
              break;
          }
          numberValidateForm.username = ""
          numberValidateForm.phone = ""
        } else {
          ElMessage({
            showClose: true,
            message: res.data.msg,
            type: 'error'
          })
        }

      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}
const mapFun = () => {
  console.log(navigator.getLocation());

  nextTick(() => {
    let map = new AMap.Map("map", {
      center: [111.205467, 25.907761],
      resizeEnable: true,
      zoom: 4,
      mapStyle: "amap://styles/0acdc7a838973fbe4969d38644d9a726",
    });
  })

}
const submitForm = async (formEl: FormInstance | undefined) => {


  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      addFormContent(
        ruleForm.chanzhi, ruleForm.qiyeId, ruleForm.renshu,
        ruleForm.zdmianji, ruleForm.jymianji, ruleForm.chanping, ruleForm.guimo == '规上企业' ? 1 : 0,
        ruleForm.resource.toString()
      ).then(res => {
        if (res.data.code == 200) {
          ElMessage({
            showClose: true,
            message: '表单提交成功',
            type: 'success'
          })
          router.push("/")
        } else {
          ElMessage({
            showClose: true,
            message: '表单提交失败',
            type: 'error'
          })
        }
      })

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
}
</style>

