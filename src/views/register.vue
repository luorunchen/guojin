<template>
  <div id="register">

    <div class="box">
      <div class="login"> 已有账号?去 <el-link type="success" @click="goToLogin">登陆</el-link>
      </div>

      <h3>注册</h3>
      <el-steps :active="active" finish-status="success" simple style="margin-top: 20px;margin-bottom:20px">
        <el-step title="提交资料" />
        <el-step title="缴费" />
        <el-step title="注册成功" />
      </el-steps>
      <div v-if="active == 1">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
          status-icon label-position="right">
          <el-form-item label="选择账号类型" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="我是企业用户" />
              <el-radio label="我是机构用户" />
              <el-radio label="我是政府用户" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="账号" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type='password' />
          </el-form-item>
          <el-form-item label="缴费方式" prop="count">
            <el-radio-group v-model="ruleForm.count">
              <el-radio label="微信" />
              <el-radio label="支付宝" />

            </el-radio-group>
          </el-form-item>
          <el-form-item label="获取发票" prop="count">
            <el-radio-group v-model="ruleForm.count">
              <el-radio label="增值税普通发票" />
              <el-radio label="增值专用发票" />

            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone" />
          </el-form-item>
          <el-form-item label="短信验证码" prop="code">

            <el-input v-model="ruleForm.code">
              <template #append>

                <el-button type="primary" @click="getCodeFun()" :disabled='disabled'> {{ text }}
                </el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="营业执照" prop="name">
            <el-upload v-model:file-list="fileList" class="upload-demo"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple :on-preview="handlePreview"
              :on-remove="handleRemove" :before-remove="beforeRemove" :limit="3" :on-exceed="handleExceed">
              <el-button type="primary">文件上传</el-button>
              <!-- <template #tip>
                <div class="el-upload__tip">
                  jpg/png files with a size less than 500KB.
                </div>
              </template> -->
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">下一步</el-button>
            <!-- <el-button @click="resetForm(ruleFormRef)">Reset</el-button> -->
          </el-form-item>
        </el-form>
      </div>
      <div v-if="active == 2">
        <p class="openUser">开通账号:XXXXXXXXX</p>
        <el-row :gutter="20">
          <el-col :span="7">
            <div :class="priceSelectionValue == 1 ? 'priceCheck' : 'price'" @click="priceSelection(1)">
              <p>版本名称</p>
              <p>¥ <span>300</span> <span>/年</span> </p>
            </div>
          </el-col>

          <el-col :span="7">
            <div :class="priceSelectionValue == 2 ? 'priceCheck' : 'price'" @click="priceSelection(2)">
              <p>版本名称</p>
              <p>¥ <span>800</span> <span>/年</span> </p>
            </div>
          </el-col>
        </el-row>

        <div class="payment">
          <p> 待支付金额:800元</p>

          <el-row>
            <el-col :span="12">
              <div class="paymentBox">

              </div>
              <p> <img src="../assets/微信支付.png" alt=""> 微信支付</p>
            </el-col>
            <el-col :span="12">
              <div class="paymentBox2">

              </div>
              <p>
                <img src="../assets/支付宝.png" alt="">
                支付宝支付
              </p>
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-if="active == 3">
        <el-result icon="success" title="支付成功!" sub-title="开通账号:XXXXXX">
          <template #extra>
            <el-button type="primary" @click="goToLogin">去登陆</el-button>
          </template>
        </el-result>
      </div>
    </div>
  </div>




</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import router from '@/router';
import { getCode } from "@/api/index"
const active = ref(1)
const text: any = ref('获取验证码')
const priceSelectionValue = ref(1)
const disabled = ref(false)
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: '',
  password: '',
  count: '',
  phone: '',
  code: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入注册账号', trigger: 'blur' },

  ],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },

  ],
  code: [
    { required: true, message: '请输入短信验证码', trigger: 'blur' },

  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  count: [
    {
      required: true,
      message: '请选择缴费方式',
      trigger: 'change',
    },
  ],


  resource: [
    {
      required: true,
      message: '请选择账号类型',
      trigger: 'change',
    },
  ],
  desc: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
})
let interval: any = ''

watch(() => text.value, (old) => {
  console.log(old);
  if (old == 0) {
    text.value = '获取验证码'
    clearInterval(interval)
    disabled.value = false
  }
})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      active.value++
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
const priceSelection = (status: number) => {
  priceSelectionValue.value = status
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))
const getCodeFun = () => {
  // console.log(123);

  getCode(ruleForm.phone).then(res => {
    if (res.data.code == 200) {
      text.value = 60
      disabled.value = true
      interval = setInterval(() => {
        text.value--
      }, 1000)
    } else {
      ElMessage({
        type: 'error',
        message: res.data.msg,
        showClose: true
      })
    }

  }).catch(err => {
    ElMessage({
      type: 'error',
      message: "请稍后重试或联系管理员",
      showClose: true
    })
  })
}
const goToLogin = () => {
  router.push("/login")
}
</script>

<style lang="less" scoped>
#register {
  background-image: url("../assets/register.png");
  width: 100%;
  height: calc(100vh);
  background-size: 100% 100%;

  .box {
    width: 40%;
    height: 500px;
    // background: #bfa;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    text-align: center;

    /deep/.el-link {
      vertical-align: initial;
    }

    .demo-ruleForm {
      // margin-top: 20px;

      /deep/.el-button--primary {
        background: #1F459C;
        border: #1F459C 1px solid;
        border-radius: 4px;
        color: #fff;
        width: 100px;

        &:active {
          background: #02133a;
        }


      }

      /deep/.el-button--primary.is-disabled {
        background: transparent;
        color: #000;
        border: none;
      }
    }

    .login {
      position: absolute;
      top: -60px;
      left: -60px;
      color: #000;
    }

    .priceCheck {
      // width: 191px;
      height: 100px;
      background: #FFFFFF;
      border: 1px solid #EF8202;
      box-shadow: 0px 0px 9px 0px #EF8202;
      border-radius: 4px;
      position: relative;

      // text-align: center;
      // line-height: 100px;
      // margin-top: 20px;
      // padding: 10px 0px;
      // vertical-align: middle;
      p {
        margin-top: 10px;
        // color: #666E76;

        span {
          color: #EF8202;

          &:nth-child(1) {
            font-size: 30px;
          }
        }
      }

      &::before {
        content: '';
        position: absolute;
        right: -1px;
        bottom: -1px;
        border: 16px solid #EF8202;
        border-top-color: transparent;
        border-left-color: transparent;
      }

      &::after {
        content: '';
        width: 5px;
        height: 10px;
        position: absolute;
        right: 6px;
        bottom: 7px;
        border: 1px solid #fff;
        border-top-color: transparent;
        border-left-color: transparent;
        transform: rotate(45deg);
      }
    }

    .price {
      // width: 191px;
      height: 100px;
      background: #FFFFFF;
      border: 1px solid #EAEAEA;
      border-radius: 4px;

      p {
        margin-top: 10px;

        span {
          color: #EF8202;

          &:nth-child(1) {
            font-size: 30px;
          }
        }
      }
    }

    .openUser {
      margin-bottom: 10px;
    }

    .payment {
      // width: 723px;
      margin-top: 30px;
      height: 220px;
      background: #FFFFFF;
      border: 1px solid #EAEAEA;
      border-radius: 4px;

      p {
        margin: 10px 0;
      }

      img {
        width: 20px;
        height: 20px;
        vertical-align: bottom;
      }

      .paymentBox {
        width: 131px;
        height: 131px;
        background: #FFFFFF;
        border: 1px solid #4BB414;
        margin: 0 auto;


      }

      .paymentBox2 {
        width: 131px;
        height: 131px;
        background: #FFFFFF;
        border: 1px solid #02AAEF;
        margin: 0 auto;



      }
    }
  }
}
</style>

