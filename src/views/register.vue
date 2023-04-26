<template>
  <div id="register">
    <div class="box">
      <div class="login">
        已有账号?去 <el-link type="success" @click="goToLogin">登陆</el-link>
      </div>

      <h3>注册</h3>
      <el-steps :active="active" finish-status="success" simple style="margin-top: 20px; margin-bottom: 20px">
        <el-step title="提交资料" />
        <el-step title="缴费" />
        <el-step title="注册成功" />
      </el-steps>
      <div v-if="active == 1">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm" status-icon
          label-position="right">
          <el-form-item label="选择账号类型" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="1">我是企业用户</el-radio>
              <el-radio label="2">我是机构用户</el-radio>
              <el-radio label="3">我是政府用户</el-radio>
            </el-radio-group>
          </el-form-item>


          <el-form-item label="账号" prop="name">

            <el-input v-model="ruleForm.name" />
            <h6 style="color:#999;text-align:left">提示:账号通过本单位营业执照名称进行注册，涉及多个账户的应通过本单位营业执照名称+部门名称进行注册</h6>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password" show-password />
          </el-form-item>
          <el-form-item label="缴费方式" prop="count">
            <el-radio-group v-model="ruleForm.count">
              <!-- <el-radio label="2">微信</el-radio> -->
              <el-radio label="1">支付宝</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item label="获取发票" prop="count">
            <el-radio-group v-model="ruleForm.count">
              <el-radio label="增值税普通发票" />
              <el-radio label="增值专用发票" />
            </el-radio-group>
          </el-form-item> -->
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone" />
          </el-form-item>
          <el-form-item label="短信验证码" prop="code">
            <el-input v-model="ruleForm.code">
              <template #append>
                <el-button type="primary" @click="getCodeFun()" :disabled="disabled">
                  {{ text }}
                </el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="checked1">
            <div class="tips">

              <el-checkbox v-model="ruleForm.checked1" size="">
                <el-link type="primary" @click="dialogVisible = true">我已阅读并同意《企安互联管理系统使用须知》</el-link>

              </el-checkbox>

            </div>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">下一步</el-button>
            <!-- <el-button @click="resetForm(ruleFormRef)">Reset</el-button> -->
          </el-form-item>
        </el-form>
      </div>
      <div v-if="active == 2">
        <p class="openUser">开通账号:{{ ruleForm.name }}</p>
        <el-row :gutter="20">
          <el-col :span="7" v-for="(item, index) in payList" :key="index">
            <!-- {{ item }} -->
            <div :class="priceSelectionValue == item.id ? 'priceCheck' : 'price'" @click="priceSelection(item.id)">
              <p>{{ item.name }}</p>
              <p>
                ¥ <span>{{ item.price }}</span>
              </p>
            </div>
          </el-col>

          <!-- <el-col :span="7">
            <div
              :class="priceSelectionValue == 2 ? 'priceCheck' : 'price'"
              @click="priceSelection(2)"
            >
              <p>版本名称</p>
              <p>¥ <span>800</span> <span>/年</span></p>
            </div>
          </el-col> -->
        </el-row>

        <div class="payment">
          <p>待支付</p>

          <el-row>
            <el-col :span="24" v-if="ruleForm.count == '2'">
              <div class="paymentBox"></div>
              <p><img src="../assets/微信支付.png" alt="" /> 微信支付</p>
            </el-col>
            <el-col :span="24" v-else>
              <div id="qrcode" ref="qrcode" class="paymentBox2"></div>
              <!-- <div class="paymentBox2"></div> -->
              <p>
                <img src="../assets/支付宝.png" alt="" />
                支付宝支付
              </p>
            </el-col>
          </el-row>
        </div>
        <!-- <el-button type="primary" @click="seeOrder()">我已完成支付</el-button> -->
      </div>
      <div v-if="active == 3">
        <el-result icon="success" title="支付成功!" sub-title="注册成功!">
          <template #extra>
            <el-button type="primary" @click="goToLogin">去登陆</el-button>
          </template>
        </el-result>
      </div>
    </div>

    <el-dialog v-model="dialogVisible" title="企安互联管理系统使用须知" width="40%" center top="10px">
      <div class="agreement">
        <!-- <p>企安互联管理系统使用须知:</p> -->
        <p>1.单一账户的用户通过本单位营业执照名称进行注册，涉及多个账户的应通过本单位营业执照名称+部门名称进行注册，并设置密码（2个大写英文字母+6个阿拉伯数字）登录、使用。</p>
        <p>
          2. 系统提供的制度、职责、岗位操作规程、应急预案、风险告知牌等资料均为范本，用户应根据自身特点予以修改、增减、补充、完善，并建立符合相关要求的台账。
        </p>
        <p>
          3. 请根据用户自身实际情况，切实认真填写《安全生产基本信息》。如果选择与用户实际不一致，那将导致台账、隐患排查等电子信息档案错误。
        </p>
        <p>
          4. 用户法人及使用该系统的本单位其他人员误动作引起的资料消失、内容错误等，系统概不负责。
        </p>
        <p>
          5. 用户使用本系统期间，涉及到各类感知设备、处置设备等硬件设施的，应每年至少维护保养一次。确保硬件设施安装正确、有效使用。
        </p>
        <p>
          6. 非法人手机号或未经法人授权（授权方式：法人手机号+验证码+人脸识别）注册的账号在系统开展任何活动,系统一律概不负责 。
        </p>
        <p>
          7. 特别声明：系统非用户安全生产管理人员及安全生产管理机构，不承担用户有关安全生产管理的任何责任。
        </p>
        <p>
          8.
          为了增进用户体验、完善服务内容、提高系统质量，系统可能不断努力开发新的服务，并为您不时提供更新。系统有权不经向您特别通知而进行更新，或者对本系统的部分功能效果、服务内容进行改变。本系统新版本发布后，旧版本的软件可能无法使用。系统不保证旧版本继续可用，也不保证继续对旧版本提供相应的客服和维护服务，请您随时核对并下载最新版本。如遇系统升级，可能存在登录异常。
        </p>
        <p>
          9. 严禁用户在本系统发布涉黄、涉赌、反共、游戏及影响国家名誉、违反国家法律法规等内容，否则应承担违规使用的所有后果（含法律责任和经济赔偿责任）。
        </p>
        <p>
          以上内容，我已经认真阅读，接受企安互联管理系统使用须知约定。
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import router from "@/router";
import {
  getCode,
  recheck,
  getPayList,
  aliPay,
  aliPayStatus,
  register, checkSmsCode
} from "@/api/index";

import QRCode from "qrcodejs2";
const active = ref(1);
const text: any = ref("获取验证码");
const priceSelectionValue = ref(1);
const orderInfo = ref();

const disabled = ref(false);
const dialogVisible = ref(false);
const payList = ref([]);
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  name: "",
  password: "",
  count: "",
  phone: "",
  code: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
  checked1: []
});

const rules = reactive<FormRules>({
  name: [{ required: true, message: "请输入注册账号", trigger: "blur" }, {
    validator: function (rule, value, callback) {
      if (/[\u4e00-\u9fa5]/.test(value) == false) {
        callback(new Error("请输入正确的账号"));
      } else {
        callback();
      }
    }
  }
  ],
  phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }, {
    validator: function (rule, value, callback) {
      if (/^1[3-9]\d{9}$/.test(value) == false) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    }
  }],
  code: [{ required: true, message: "请输入短信验证码", trigger: "blur" },],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }, {
    validator: function (rule, value, callback) {
      if (/^(?=.*[A-Z].*[A-Z])(?=.*\d.*\d.*\d.*\d.*\d.*\d).{8}$/.test(value) == false) {
        callback(new Error("密码需设置2个大写英文字母+6个阿拉伯数字"));
      } else {
        callback();
      }
    }
  }],
  count: [
    {
      required: true,
      message: "请选择缴费方式",
      trigger: "change",
    },
  ],
  checked1: [
    {
      required: true,
      message: "请仔细阅读《企安互联管理系统使用须知》并勾选",
      trigger: "change",
      type: 'array'
    },
  ],

  resource: [
    {
      required: true,
      message: "请选择账号类型",
      trigger: "change",
    },
  ],
  desc: [
    { required: true, message: "Please input activity form", trigger: "blur" },
  ],
});
let interval: any = "";
let setInt: any = ''
watch(
  () => text.value,
  (old) => {
    console.log(old);
    if (old == 0) {
      text.value = "获取验证码";
      clearInterval(interval);
      disabled.value = false;
    }
  }
);
watch(() => active.value, (val) => {
  if (val == 2) {
    seeOrder()
  }
  if (val == 3) {
    clearInterval(setInt)
  }
})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (active.value == 1) {
        recheck(ruleForm.name).then((res) => {
          if (res.data.code == 200) {
            checkSmsCode(ruleForm.phone, ruleForm.code).then(res => {
              if (res.data.code == 200) {

                active.value++;
              }
            })
          }
        });

      } else {
        active.value++;
      }

      console.log("submit!", ruleForm);
    } else {
      console.log("error submit!", fields);
    }
  });
};

watch(
  () => active.value,
  (val) => {
    if (val == 2) {
      getPayList(1).then((res) => {
        // 1623590522520211456
        payList.value = res.data.data.data;
      });
    }
  }
);
const seeOrder = () => {
  setInt = setInterval(() => {
    aliPayStatus(orderInfo.value).then((res) => {
      if (res.data.code == 200 && res.data.data.trade_state == 'TRADE_SUCCESS') {
        console.log(ruleForm);
        // orderInfo.value
        register(
          ruleForm.name,
          ruleForm.password,
          ruleForm.resource,
          ruleForm.phone,
          ruleForm.code,
          orderInfo.value,
          ruleForm.count
        ).then((res) => {
          if (res.data.code == 200) {
            active.value++;
          }
        });
      }
    });
  }, 3000)

};
const priceSelection = (status: number) => {
  priceSelectionValue.value = status;
  aliPay(status, ruleForm.name).then((res) => {
    const el = document.getElementById("qrcode");
    el.innerHTML = "";
    orderInfo.value = res.data.data.out_trade_no;
    // console.log(el.clientWidth); // 可见区域宽
    // console.log(el.clientHeight); // 可见区域高
    let qrcode = new QRCode("qrcode", {
      width: el.clientWidth, // 设置宽度，单位像素
      height: el.clientHeight, // 设置高度，单位像素
      text: res.data.data.code_url, // 设置二维码内容或跳转地址
    });
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));
const getCodeFun = () => {
  // console.log(123);

  getCode(ruleForm.phone).then((res) => {
    if (res.data.code == 200) {
      text.value = 60;
      disabled.value = true;
      interval = setInterval(() => {
        text.value--;
      }, 1000);
    } else {
      ElMessage({
        type: "error",
        message: res.data.msg,
        showClose: true,
      });
    }
  });
};
const goToLogin = () => {
  router.push("/login");
};
</script>

<style lang="less" scoped>
#register {
  background-image: url("../assets/register.png");
  width: 100%;
  height: calc(100vh);
  background-size: 100% 100%;

  .agreement {
    padding: 0 30px;
    font-size: 18px;

    p {
      margin-bottom: 10px;
      font-weight: 700;
      // color: #666E76;
      text-indent: 2em;

      // &:nth-child(1) {
      //   text-indent: 0em;
      // }
    }
  }

  /deep/.el-dialog__title {
    font-weight: 900;
    font-size: 20px;
  }

  .box {
    width: 870px;
    // height: 730px;
    // background: #bfa;
    height: calc(75vh);
    padding-top: 80px;
    box-sizing: border-box;
    // background: #bfa;
    // padding:10px;
    overflow: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    // transform: translateY(25%);
    // margin-top: -50%;

    /deep/.el-link {
      vertical-align: initial;
    }

    .demo-ruleForm {
      // margin-top: 20px;

      /deep/.el-button--primary {
        background: #1f459c;
        border: #1f459c 1px solid;
        border-radius: 4px;
        color: #fff;
        // width: 100px;

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
      background: #ffffff;
      border: 1px solid #ef8202;
      box-shadow: 0px 0px 9px 0px #ef8202;
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
          color: #ef8202;

          &:nth-child(1) {
            font-size: 30px;
          }
        }
      }

      &::before {
        content: "";
        position: absolute;
        right: -1px;
        bottom: -1px;
        border: 16px solid #ef8202;
        border-top-color: transparent;
        border-left-color: transparent;
      }

      &::after {
        content: "";
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
      background: #ffffff;
      border: 1px solid #eaeaea;
      border-radius: 4px;

      p {
        margin-top: 10px;

        span {
          color: #ef8202;

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
      background: #ffffff;
      border: 1px solid #eaeaea;
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
        background: #ffffff;
        // border: 1px solid #4bb414;
        margin: 0 auto;
      }

      .paymentBox2 {
        width: 131px;
        height: 131px;
        background: #ffffff;
        // border: 1px solid #02aaef;
        margin: 0 auto;
      }
    }
  }
}
</style>

