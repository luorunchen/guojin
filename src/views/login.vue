<template>
  <div id="login">
    <div class="wraper">
      <el-row>
        <el-col :span="12">
          <div class="rightBox">
            <h1>智慧安全管理平台</h1>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="leftBox">
            <el-tabs v-model="activeName" class="demo-tabs" stretch>
              <el-tab-pane label="企业登录" name="1"></el-tab-pane>
              <el-tab-pane label="机构登录" name="2"></el-tab-pane>
              <el-tab-pane label="政府登录" name="3"></el-tab-pane>
            </el-tabs>
            <el-form
              ref="formRef"
              :model="numberValidateForm"
              label-width="100px"
              class="demo-ruleForm"
              label-position="top"
            >
              <el-form-item
                prop="userName"
                :rules="[{ required: true, message: '请输入账号' }]"
              >
                <el-input
                  placeholder="请输入账号"
                  v-model="numberValidateForm.userName"
                  type="text"
                  autocomplete="off"
                  :prefix-icon="Avatar"
                />
              </el-form-item>
              <el-form-item
                prop="password"
                :rules="[{ required: true, message: '请输入密码' }]"
              >
                <el-input
                  placeholder="请输入密码"
                  v-model="numberValidateForm.password"
                  type="password"
                  autocomplete="off"
                  :prefix-icon="Lock"
                />
              </el-form-item>

              <el-checkbox-group v-model="numberValidateForm.type">
                <el-checkbox label="记住密码" name="type">
                  <el-link>记住密码</el-link>
                </el-checkbox>
              </el-checkbox-group>
              <el-form-item>
                <el-button
                  color="#0165D0"
                  type="primary"
                  @click="submitForm(formRef)"
                  >登陆</el-button
                >
              </el-form-item>
              <!-- <el-form-item prop="type" :rules="[
                {
                  type: 'array',
                  required: true,
                  message: '请阅读并勾选',
                  trigger: 'change',
                },
              ]">
                

              </el-form-item> -->
            </el-form>
            <el-row>
              <el-col :span="7" :offset="17">
                还没账号?

                <el-link type="primary" @click="goToRegister">去注册</el-link>
              </el-col>
            </el-row>
            <div class="tips">
              点击登录即同意
              <el-link type="primary" @click="dialogVisible = true"
                >《平台使用须知》</el-link
              >
            </div>
            <div class="chrome">
              推荐使用 <img src="../assets/chrome.png" alt="" /> 谷歌浏览器
              <el-link type="primary" @click="chromeDowload">点击下载</el-link>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog v-model="dialogVisible" title="平台协议" width="40%" center>
      <div class="agreement">
        <p>平台使用须知：</p>
        <p>1.用户通过法人手机号注册本平台后，均用该账号和密码登录、使用。</p>
        <p>
          2.严禁用户在本平台发布涉黄、涉赌、反共、游戏等内容，否则应承担违规使用
          的所有后果（含法律责任和经济赔偿责任）。
        </p>
        <p>
          3.平台提供的制度、职责、岗位操作规程、应急预案、风险告知牌等资料均为范
          本，用户应根据自身特点予以修改、增减、补充、完善，并建立符合相关要求的
          台账。
        </p>
        <p>
          4.用户法人及使用该平台的本单位其他人员误动作引起的资料消失、内容错误等，
          平台概不负责。
        </p>
      </div>
    </el-dialog>
  </div>
</template>


<script lang="ts" setup>
import { login } from "@/api/index";
import { reactive, ref, onMounted } from "vue";
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
import router from "@/router/index";
import jsCookie from "js-cookie";
import { Avatar, Lock } from "@element-plus/icons-vue";
const formRef = ref<FormInstance>();
const activeName = ref("1");
const remember = ref();
const dialogVisible = ref(false);
const numberValidateForm = reactive({
  userName: "",
  password: "",
  type: ["记住密码"],
});
onMounted(() => {
  // queryLocalForm();
  // console.log(window.document.cookie, "cookie");
  let arr = document.cookie.split("; ");
  // console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    // 再次切割，arr2[0]为key值，arr2[1]为对应的value
    let arr2 = arr[i].split("=");
    if (arr2[0] === "userName") {
      numberValidateForm.userName = arr2[1];
    } else if (arr2[0] === "password") {
      numberValidateForm.password = arr2[1];
    }
  }
});
// const queryLocalForm = () => {
//   const localForm = jsCookie.get(LOCAL_KEY);
//   console.log(localForm);

//   if (localForm) {
//     remember.value = true;
//     try {
//       // const { username, password } = JSON.parse(localForm);
//       // form.username = decode(username);
//       // form.password = decode(password);
//     } catch (error) {
//       console.error("本地数据解析失败~", error);
//     }
//   } else {
//     remember.value = false;
//   }
// };
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      // console.log(activeName.value);

      login(
        numberValidateForm.userName,
        numberValidateForm.password,
        activeName.value
      ).then((res) => {
        if (res.data.code == 200) {
          if (
            res.data.data.companyId != null &&
            res.data.data.companyId != ""
          ) {
            router.push("/");
            ElMessage({
              showClose: true,
              message: "登录成功",
              type: "success",
            });

            // if(numberValidateForm)
            console.log(numberValidateForm.type, "type");
            if (numberValidateForm.type.length > 0) {
              window.document.cookie =
                "userName" + "=" + numberValidateForm.userName;

              window.document.cookie =
                "password" + "=" + numberValidateForm.password;
            }
          } else {
            ElMessage({
              showClose: true,
              message: "请填写相应表格",
              type: "success",
            });
            if (activeName.value == "1") {
              router.push("/registerFormOne");
            } else if (activeName.value == "2") {
              router.push("/registerFormTwo");
            } else {
              router.push("/");
            }
          }

          sessionStorage.setItem("userName", numberValidateForm.userName);
          sessionStorage.setItem("userId", res.data.data.id);
          sessionStorage.setItem("loginType", activeName.value);
          sessionStorage.setItem(
            "evaluation",
            res.data.data.evaluation_standard
          );
          console.log(res.data.data.evaluation_standard);
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
const chromeDowload = () => {
  window.open("http://119.91.156.5/download/chrome/Chrome.exe");
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const goToRegister = () => {
  router.push("/register");
};
</script>

<style lang="less" scoped>
#login {
  width: 100%;
  height: calc(100vh);
  // background: #bfa;
  background-image: url("../assets/login.png");
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
    background-image: url("../assets/loginBox.png");
    background-size: 100% 100%;

    // box-sizing: border-box;

    // /deep/.el-form-item__label {
    //   color: #fff;
    // }
    .rightBox {
      width: 100%;
      height: 100%;
      color: #000;
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
      .chrome {
        text-align: center;
        font-size: 15px;
        margin-top: 20px;
        img {
          width: 20px;
          height: 20px;
        }
        /deep/.el-link {
          vertical-align: initial;
          font-size: 15px;
        }
      }
    }

    .el-button {
      width: 100%;
    }

    /deep/ .el-checkbox__label {
      color: #fff;
    }
  }

  .agreement {
    padding: 30px;
    font-size: 18px;

    p {
      margin-bottom: 10px;
      font-weight: 700;
      // color: #666E76;
      text-indent: 2em;

      &:nth-child(1) {
        text-indent: 0em;
      }
    }
  }
}
</style>

