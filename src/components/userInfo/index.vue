<template>
  <div id="userInfo" ref="userInfo">
    <div class="box">我的身份: <span>企业VIP</span> (到期时间:2025-05-05)</div>

    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="备案信息" name="first">
        <FilingInformationOne v-if="loginType == '1'" />
        <FilingInformationTwo v-if="loginType == '2'" :status="'reception'" />
      </el-tab-pane>
      <el-tab-pane label="我的缴费" name="second">
        <el-table
          :data="getPayHistorysList"
          stripe
          style="width: 100%"
          height="300px"
        >
          <el-table-column type="index" width="50" />
          <el-table-column prop="orderId" label="订单编号" />
          <el-table-column prop="pay_date" label="起始时间" />
          <el-table-column prop="expire_date" label="结束时间" />
          <el-table-column prop="price" label="金额" />
          <el-table-column prop="name" label="会员类型">
            <template #default="scope">
              {{ scope.row.type == 1 ? "平台会员" : "五新商店会员" }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="状态">
            <template #default="scope">
              {{
                scope.row.invoice == 0
                  ? "开票中"
                  : scope.row.invoice == 1
                  ? "已开票"
                  : "未开票"
              }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="操作">
            <template #default="scope">
              <el-button
                :disabled="scope.row.invoice == 2 ? false : true"
                type="success"
                @click="openInvoice(scope.row)"
                >开发票</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="我的开票信息" name="third">
        <el-button
          type="primary"
          style="margin-bottom: 10px"
          @click="(dialogVisible = true), (newData = true)"
          v-if="getInVoiceInfoLists.length < 0"
          >新增</el-button
        >
        <el-table
          :data="getInVoiceInfoLists"
          stripe
          style="width: 100%"
          height="300px"
        >
          <el-table-column type="index" width="50" />
          <el-table-column prop="company" label="公司名称" />
          <el-table-column prop="code" label="社会信用统一代码" />
          <el-table-column prop="bank" label="银行" />
          <el-table-column prop="cardId" label="银行卡号" />
          <el-table-column prop="place" label="地址" />
          <el-table-column prop="name" label="开票抬头">
            <template #default="scope">
              {{
                scope.row.type == 1
                  ? "个人"
                  : scope.row.type == 2
                  ? "企业"
                  : "事业单位"
              }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="发票类型">
            <template #default="scope">
              {{ scope.row.style == 1 ? "普票" : "专票" }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="操作">
            <template #default="scope">
              <el-button type="primary" @click="inVoiceEdit(scope.row)"
                >编辑</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="我的地址信息" name="four">
        <el-button
          type="primary"
          style="margin-bottom: 10px"
          @click="addFun('address')"
          >新增</el-button
        >
        <el-table
          :data="getMailAddressLists"
          stripe
          style="width: 100%"
          height="300px"
        >
          <el-table-column type="index" width="50" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="phone" label="电话" />
          <el-table-column prop="province" label="省份" />
          <el-table-column prop="city" label="市" />
          <el-table-column prop="area" label="区" />
          <el-table-column prop="address" label="详细地址" />
          <el-table-column prop="code" label="邮政编码" />
          <!-- 
          <el-table-column prop="name" label="是否默认地址">
            <template #default="scope">
              {{ scope.row.defaults == "1" ? "是" : "否" }}
            </template>
          </el-table-column> -->
          <el-table-column prop="name" label="操作">
            <template #default="scope">
              <el-button type="primary" @click="addressEdite(scope.row)"
                >编辑</el-button
              >
              <el-button type="danger" @click="deleteAddress(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table></el-tab-pane
      >
      <el-tab-pane label="我的邮箱信息" name="five">
        <el-button
          type="primary"
          style="margin-bottom: 10px"
          @click="addFun('email')"
          >新增</el-button
        >
        <el-table
          :data="getMailLists"
          stripe
          style="width: 100%"
          height="300px"
        >
          <el-table-column type="index" width="50" />
          <el-table-column prop="mail" label="邮箱" />
          <!-- <el-table-column prop="expire_date" label="结束时间" />
          <el-table-column prop="price" label="金额" /> -->

          <el-table-column prop="name" label="操作">
            <template #default="scope">
              <el-button type="primary" @click="emailEdit(scope.row)"
                >编辑</el-button
              >
              <el-button type="danger" @click="deleteEmail(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table></el-tab-pane
      >
    </el-tabs>

    <el-dialog v-model="dialogVisible" title="我的发票" width="30%" center>
      <el-form ref="formRef" :model="numberValidateForm" class="demo-ruleForm">
        <el-form-item
          label="抬头类型:"
          prop="resource"
          :rules="[{ required: true, message: '请选择抬头类型' }]"
        >
          <el-radio-group
            v-model="numberValidateForm.resource"
            @click="resetForm(formRef)"
          >
            <el-radio label="1">个人</el-radio>
            <el-radio label="2">企业</el-radio>
            <el-radio label="3">事业单位</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="发票抬头:"
          prop="age"
          :rules="[{ required: true, message: '请输入发票抬头' }]"
        >
          <el-input
            v-model="numberValidateForm.age"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="发票类型:"
          prop="invoice"
          :rules="[{ required: true, message: '请选择发票类型' }]"
        >
          <el-radio-group v-model="numberValidateForm.invoice">
            <el-radio label="1">增值税普通发票</el-radio>
            <el-radio label="2">增值税专用发票</el-radio>
          </el-radio-group>
        </el-form-item>

        <template v-if="numberValidateForm.resource != '1'">
          <el-form-item
            label="统一社会信用代码:"
            prop="creditCode"
            :rules="
              numberValidateForm.resource == '2'
                ? [{ required: true, message: '请输入统一社会信用代码' }]
                : []
            "
          >
            <el-input
              v-model="numberValidateForm.creditCode"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="开户银行名称:" prop="bankName">
            <el-input
              v-model="numberValidateForm.bankName"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="基本开户账号:" prop="accountNo">
            <el-input
              v-model="numberValidateForm.accountNo"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="注册场所地址:" prop="addresss">
            <el-input
              v-model="numberValidateForm.addresss"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="注册固定电话:" prop="phone">
            <el-input
              v-model="numberValidateForm.phone"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
        </template>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm(formRef, 'fapiao')"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- <Pagination :total="total" @changeList="changeList" /> -->

    <el-dialog v-model="addVisible" title="新增" width="30%" center>
      <el-form
        ref="formRef"
        :model="numberValidateForm"
        class="demo-ruleForm"
        label-width="100px"
      >
        <el-form-item
          label="姓名:"
          prop="userName"
          :rules="[{ required: true, message: '请输入姓名' }]"
        >
          <el-input
            v-model="numberValidateForm.userName"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="省份:"
          prop="province"
          :rules="[{ required: true, message: '请输入省份' }]"
        >
          <el-input
            v-model="numberValidateForm.province"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="市:"
          prop="city"
          :rules="[{ required: true, message: '请输入市' }]"
        >
          <el-input
            v-model="numberValidateForm.city"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="区:"
          prop="area"
          :rules="[{ required: true, message: '请输入区' }]"
        >
          <el-input
            v-model="numberValidateForm.area"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="详细地址:"
          prop="dizhi"
          :rules="[{ required: true, message: '请输入详细地址' }]"
        >
          <el-input
            v-model="numberValidateForm.dizhi"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="手机号码:"
          prop="iphone"
          :rules="[{ required: true, message: '请输入手机号码' }]"
        >
          <el-input
            v-model="numberValidateForm.iphone"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="邮政编码:"
          prop="code"
          :rules="[{ required: true, message: '请输入邮政编码' }]"
        >
          <el-input
            v-model="numberValidateForm.code"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <!-- <el-form-item label="设置:" prop="defaults">
          <el-checkbox-group v-model="numberValidateForm.defaults">
            <el-checkbox label="默认地址" name="type" />
          </el-checkbox-group>
        </el-form-item> -->
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm(formRef, 'address')">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="emailVisible" title="新增" width="30%" center>
      <el-form
        ref="formRef"
        :model="numberValidateForm"
        class="demo-ruleForm"
        label-width="100px"
      >
        <el-form-item
          label="邮箱:"
          prop="email"
          :rules="[{ required: true, message: '请输入邮箱' }]"
        >
          <el-input
            v-model="numberValidateForm.email"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="emailVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm(formRef, 'email')">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="invoiceVisible" title="开票" width="30%" center>
      <el-form
        ref="formRef"
        :model="numberValidateForm"
        class="demo-ruleForm"
        label-width="100px"
      >
        <el-form-item
          label="订单编号:"
          prop="orderId"
          :rules="[{ required: true, message: '请输入订单编号' }]"
        >
          <el-input
            v-model="numberValidateForm.orderId"
            type="text"
            disabled
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="金额:"
          prop="price"
          :rules="[{ required: true, message: '请输入订单金额' }]"
        >
          <el-input
            v-model="numberValidateForm.price"
            type="text"
            disabled
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="开票信息:" prop="invoiceId">
          <el-select
            v-model="numberValidateForm.invoiceId"
            placeholder="请选择"
          >
            <el-option
              :label="item.company"
              :value="item.id"
              v-for="(item, index) in getInVoiceInfoLists"
              :key="index"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="邮寄地址:" prop="addressId">
          <el-select
            v-model="numberValidateForm.addressId"
            placeholder="请选择"
          >
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="(item, index) in getMailAddressLists"
              :key="index"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱:" prop="mailId">
          <el-select v-model="numberValidateForm.mailId" placeholder="请选择">
            <el-option
              :label="item.mail"
              :value="item.id"
              v-for="(item, index) in getMailLists"
              :key="index"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="invoiceVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm(formRef, 'open')">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import FilingInformationOne from "@/components/filingInformation/one.vue";
import FilingInformationTwo from "@/components/filingInformation/two.vue";
import {
  getCompanyInfoByIds,
  getPayHistorys,
  formTree,
  getInVoiceInfo,
  getMailAddress,
  getMail,
  setMailAddress,
  setMail,
  editMail,
  editMailAddress,
  delMailAddress,
  delMail,
  setInvoiceInfo,
  editInvoiceInfo,
  sendInVoiceInfo,
} from "@/api/index.js";
import { ref, defineProps, onMounted, reactive, watch } from "vue";
import {
  TabsPaneContext,
  FormInstance,
  ElMessage,
  ElMessageBox,
} from "element-plus";

const props = defineProps({
  boxHeight: Number,
});
const activeName = ref("first");
const elStepsStatus = ref("1");
const total = ref(0);
const editMailID = ref(0);
const userInfo = ref(null);

const loginType = ref(sessionStorage.getItem("loginType"));
const getInVoiceInfoLists = ref([]);
const getMailAddressLists = ref([]);
const getMailLists = ref([]);
const dialogVisible = ref(false);
const addVisible = ref(false);
const invoiceVisible = ref(false);
const newData = ref(false);
const emailVisible = ref(false);
const getPayHistorysList = ref([]);
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
const formRef = ref<FormInstance>();

const numberValidateForm = reactive({
  age: "",
  resource: "1",
  invoice: "",
  creditCode: "",
  bankName: "",
  accountNo: "",
  phone: "",
  addresss: "",
  userName: "",
  province: "",
  city: "",
  area: "",
  dizhi: "",
  iphone: "",
  code: "",
  defaults: [],
  email: "",
  orderId: "",
  price: "",
  invoiceId: "",
  addressId: "",
  mailId: "",
});

onMounted(() => {
  userInfo.value.style.height = props.boxHeight + "px";
  // getCompanyInfoByIdsFun();
});

const deleteAddress = (row) => {
  ElMessageBox.confirm(
    `确定删除<span style='color:red'>${row.name}</span>地址嘛?`,
    "删除",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      dangerouslyUseHTMLString: true,
    }
  ).then(() => {
    delMailAddress(row.id).then((res) => {
      if (res.data.code == 200) {
        ElMessage({
          showClose: true,
          message: "删除成功",
          type: "success",
        });
        getMailAddressFun();
      } else {
        ElMessage({
          showClose: true,
          message: "删除失败",
          type: "error",
        });
      }
    });
  });
};
const deleteEmail = (row) => {
  ElMessageBox.confirm(
    `确定删除<span style='color:red'>${row.mail}</span>邮箱嘛?`,
    "删除",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      dangerouslyUseHTMLString: true,
    }
  ).then(() => {
    delMail(row.id).then((res) => {
      if (res.data.code == 200) {
        ElMessage({
          showClose: true,
          message: "删除成功",
          type: "success",
        });
        getMailFun();
      } else {
        ElMessage({
          showClose: true,
          message: "删除失败",
          type: "error",
        });
      }
    });
  });
};
const addressEdite = (row) => {
  console.log(row, "row");

  newData.value = false;
  editMailID.value = row.id;
  numberValidateForm.userName = row.name;
  numberValidateForm.province = row.province;
  numberValidateForm.city = row.city;
  numberValidateForm.area = row.area;
  numberValidateForm.dizhi = row.address;
  numberValidateForm.iphone = row.phone;
  numberValidateForm.code = row.code;
  addVisible.value = true;
};
const inVoiceEdit = (row) => {
  dialogVisible.value = true;
  newData.value = false;
  editMailID.value = row.id;
  // numberValidateForm.resource = String(row.type);
  // numberValidateForm.age = row.company;
  // numberValidateForm.invoice = String(row.style);
  // numberValidateForm.creditCode = row.code;
  // numberValidateForm.bankName = row.bank;
  // numberValidateForm.accountNo = row.cardId;
  // numberValidateForm.addresss = row.place;
  // numberValidateForm.phone = row.phone;
};
const emailEdit = (row) => {
  emailVisible.value = true;
  newData.value = false;
  editMailID.value = row.id;
  numberValidateForm.email = row.mail;
};
const openInvoice = (row) => {
  console.log("开票信息", row);

  invoiceVisible.value = true;
  numberValidateForm.orderId = row.orderId;
  numberValidateForm.price = row.price;
  getInVoiceInfoFun();
  getMailAddressFun();
  getMailFun();
};
const changeList = () => {};
const handleClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab.props.label, 1);
  if (tab.props.label == "我的缴费") {
    getPayHistorys(1, 1000).then((res) => {
      getPayHistorysList.value = res.data.data;
    });
  }
  if (tab.props.label == "我的开票信息") {
    getInVoiceInfoFun();
  }
  if (tab.props.label == "我的地址信息") {
    getMailAddressFun();
  }
  if (tab.props.label == "我的邮箱信息") {
    getMailFun();
  }
};

const getInVoiceInfoFun = () => {
  getInVoiceInfo(sessionStorage.getItem("userId")).then((res) => {
    getInVoiceInfoLists.value = [res.data.data];
  });
};
const getMailAddressFun = () => {
  getMailAddress(sessionStorage.getItem("userId"), 0, 1000).then((res) => {
    getMailAddressLists.value = res.data.data;
  });
};
const getMailFun = () => {
  getMail(sessionStorage.getItem("userId"), 0, 1000).then((res) => {
    getMailLists.value = res.data.data;
  });
};
const submitForm = (formEl: FormInstance | undefined, data) => {
  console.log(data, 99);

  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (data == "address") {
        if (newData.value) {
          setMailAddress(
            sessionStorage.getItem("userId"),
            numberValidateForm.userName,
            numberValidateForm.province,
            numberValidateForm.city,
            numberValidateForm.area,
            numberValidateForm.dizhi,
            numberValidateForm.iphone,
            numberValidateForm.code,
            0
          ).then((result) => {
            if (result.data.code == 200) {
              ElMessage({
                showClose: true,
                message: "添加成功",
                type: "success",
              });
              getMailAddressFun();
              addVisible.value = false;
            } else {
              ElMessage({
                showClose: true,
                message: "添加失败",
                type: "error",
              });
            }
          });
        } else {
          editMailAddress(
            sessionStorage.getItem("userId"),
            numberValidateForm.userName,
            numberValidateForm.province,
            numberValidateForm.city,
            numberValidateForm.area,
            numberValidateForm.dizhi,
            numberValidateForm.iphone,
            numberValidateForm.code,
            0,
            editMailID.value
          ).then((result) => {
            if (result.data.code == 200) {
              ElMessage({
                showClose: true,
                message: "编辑成功",
                type: "success",
              });
              getMailAddressFun();
              addVisible.value = false;
            } else {
              ElMessage({
                showClose: true,
                message: "编辑失败",
                type: "error",
              });
            }
          });
        }
      }
      if (data == "email") {
        if (newData.value) {
          setMail(
            sessionStorage.getItem("userId"),
            numberValidateForm.email,
            0
          ).then((result) => {
            if (result.data.code == 200) {
              ElMessage({
                showClose: true,
                message: "添加成功",
                type: "success",
              });
              emailVisible.value = false;
              getMailFun();
            }
          });
        } else {
          editMail(editMailID.value, numberValidateForm.email).then(
            (result) => {
              if (result.data.code == 200) {
                ElMessage({
                  showClose: true,
                  message: "修改成功",
                  type: "success",
                });
                emailVisible.value = false;
                getMailFun();
              }
            }
          );
        }
      }
      if (data == "fapiao") {
        if (newData.value) {
          setInvoiceInfo(
            sessionStorage.getItem("userId"),
            numberValidateForm.age,
            numberValidateForm.bankName,
            numberValidateForm.accountNo,
            numberValidateForm.creditCode,
            numberValidateForm.resource,
            numberValidateForm.addresss,
            numberValidateForm.phone,
            numberValidateForm.invoice
          ).then((res) => {
            if (res.data.code == 200) {
              ElMessage({
                showClose: true,
                message: "新增成功",
                type: "success",
              });
              getInVoiceInfoFun();
              dialogVisible.value = false;
            } else {
              ElMessage({
                showClose: true,
                message: "新增失败",
                type: "error",
              });
            }
          });
        } else {
          editInvoiceInfo(
            editMailID.value,
            sessionStorage.getItem("userId"),
            numberValidateForm.age,
            numberValidateForm.bankName,
            numberValidateForm.accountNo,
            numberValidateForm.creditCode,
            numberValidateForm.resource,
            numberValidateForm.addresss,
            numberValidateForm.phone,
            numberValidateForm.invoice
          ).then((res) => {
            if (res.data.code == 200) {
              ElMessage({
                showClose: true,
                message: "编辑成功",
                type: "success",
              });
              getInVoiceInfoFun();
              dialogVisible.value = false;
            } else {
              ElMessage({
                showClose: true,
                message: "编辑失败",
                type: "error",
              });
            }
          });
        }
      }
      if (data == "open") {
        console.log("进来");

        sendInVoiceInfo(
          numberValidateForm.orderId,
          numberValidateForm.price,
          numberValidateForm.invoiceId,
          numberValidateForm.addressId,
          numberValidateForm.mailId,
          0
          // numberValidateForm.status
        ).then((res) => {
          if (res.data.code == 200 && res.data.data != null) {
            ElMessage({
              showClose: true,
              message: "开票成功",
              type: "success",
            });
            // getInVoiceInfoFun();
            // dialogVisible.value = false;
          } else {
            ElMessage({
              showClose: true,
              message: res.data.msg,
              type: "error",
            });
          }
        });
      }
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
const addFun = (status) => {
  newData.value = true;
  status == "address" ? (addVisible.value = true) : (emailVisible.value = true);
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>


<style lang="less" scoped>
#userInfo {
  // width: 1460px;
  // height: 720px;
  position: relative;
  .demo-tabs {
    margin-top: 10px;

    padding: 10px;
    box-sizing: border-box;
    // height: 500px;
    background: #ffffff;
    box-shadow: 0px 0px 13px 0px #ebebeb;
    border-radius: 4px;
    // .el-form-item {
    //   width: 46%;
    // }
  }
  .box {
    margin-top: 10px;
    height: 69px;
    background: #ffffff;
    box-shadow: 0px 0px 13px 0px #ebebeb;
    border-radius: 4px;
    line-height: 69px;
    font-size: 20px;
    padding-left: 20px;
    color: #666e76ff;

    span {
      color: #058ffeff;
    }
  }
  .info {
    padding: 30px;
  }
}
</style>