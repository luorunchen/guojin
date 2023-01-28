<template>
  <div id="login">
    <div class="wraper">
      <el-row>
        <el-col :span="12">
          <div class="rightBox">
            <h1>Welcome!</h1>
            <h1>智慧安全管理后台</h1>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="leftBox">
            <h1>欢迎登陆</h1>
            <el-form ref="formRef" :model="numberValidateForm" label-width="100px" class="demo-ruleForm"
              label-position="top">
              <el-form-item prop="userName" :rules="[{ required: true, message: '请输入账号' }]">
                <el-input placeholder="请输入账号" v-model="numberValidateForm.userName" type="text" autocomplete="off"
                  :prefix-icon="Avatar" />
              </el-form-item>
              <el-form-item prop="password" :rules="[{ required: true, message: '请输入密码' }]">
                <el-input placeholder="请输入密码" v-model="numberValidateForm.password" type="password" autocomplete="off"
                  :prefix-icon="Lock" />

              </el-form-item>
              <el-form-item>
                <el-button color="#0165D0" type="primary" @click="submitForm(formRef)">登陆</el-button>
              </el-form-item>
              <el-form-item prop="type" :rules="[
                {
                  type: 'array',
                  required: true,
                  message: '请阅读并勾选',
                  trigger: 'change',
                },
              ]">
                <!-- <el-checkbox-group v-model="numberValidateForm.type">
                  <el-checkbox label="使用协议" name="type">
                    <el-link>记住密码</el-link>
                  </el-checkbox>
                </el-checkbox-group> -->
                <el-checkbox-group v-model="numberValidateForm.type">
                  <el-checkbox label="使用协议" name="type">
                    <el-link type="primary">《使用协议》</el-link>
                  </el-checkbox>
                  <el-checkbox label="使用协议" name="type">
                    <el-link>记住密码</el-link>
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>



    </div>
  </div>
</template>


<script lang="ts" setup>
import { login } from '@/api/index'
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import router from '@/router/index'
import { Avatar, Lock } from '@element-plus/icons-vue'
const formRef = ref<FormInstance>()

const numberValidateForm = reactive({
  userName: '',
  password: '',
  type: [],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      login(numberValidateForm.userName, numberValidateForm.password, 4).then(
        (res) => {
          if (res.data.code == 200) {
            ElMessage({
              showClose: true,
              message: '登陆成功',
              type: 'success',
            })
            router.push('/backHome')
            sessionStorage.setItem('userName', numberValidateForm.userName)
            sessionStorage.setItem('userId', res.data.data.id)


          } else {
            ElMessage({
              showClose: true,
              message: res.data.msg,
              type: 'error',
            })
          }
        }
      )
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="less" scoped>
#login {
  width: 100%;
  height: calc(100vh);
  // background: #bfa;
  background-image: url("../../../assets/login.png");
  background-size: 100% 100%;

  .wraper {
    position: absolute;
    width: 65%;
    height: 700px;
    // background: rgb(80, 19, 212);
    margin: auto;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    // margin-left: -500px;
    padding: 100px;
    color: #000;
    background-image: url("../../../assets/backstage.png");
    background-size: 100% 100%;
    // box-sizing: border-box;

    // /deep/.el-form-item__label {
    //   color: #fff;
    // }
    .rightBox {
      margin-top: 200px;
      margin-left: 20px;
      width: 100%;
      height: 100%;
      color: #fff;
      font-size: 25px;
      // background: #bfa;
    }

    .leftBox {
      // text-align: center;
      padding: 50px;
      margin-top: 70px;
      font-size: 18px;
      box-sizing: border-box;

      h1 {
        margin-bottom: 50px;
      }

      /deep/.el-input__wrapper {
        height: 70px;
        border-radius: 37px;
        font-size: 18px;
      }

      /deep/.el-button--primary {
        border-radius: 37px;
        height: 70px;
        font-size: 18px;
      }

      /deep/.el-tabs {
        margin-bottom: 30px;

        .el-tabs__item {
          font-weight: bold;
          font-size: 22px;
        }
      }

      /deep/.el-link {
        vertical-align: initial;
        font-size: 18px;
      }

      .tips {
        text-align: center;
        // margin: 0 auto;
        width: 100%;
        padding-top: 100px;
        // margin-top: 100px;
        // position: relative;
        // bottom: 20px;
        // left: 50%;
      }
    }

    .el-button {
      width: 100%;
    }

    /deep/ .el-checkbox__label {
      color: #fff;
    }
  }
}
</style>

