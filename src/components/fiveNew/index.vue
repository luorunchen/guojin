<template>
  <div id="userInfo">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="标题">
            <el-input v-model="formInline.user" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="所属分类">
            <el-select
              v-model="formInline.region"
              clearable
              placeholder="请选择"
            >
              <el-option label="新技术" value="1" />
              <el-option label="新工艺" value="2" />
              <el-option label="新设备" value="3" />
              <el-option label="新材料" value="4" />
              <el-option label="新产品" value="5" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="uploadFun">我要上传</el-button>
          </el-form-item>
        </el-form>
        <el-row :gutter="20">
          <el-col
            :span="4"
            v-for="(item, index) in getWxStoreListArray"
            :key="index"
            style="margin-top: 10px"
          >
            <img :src="item.content.cover" alt="" />
            <p>{{ item.content.title }}</p>
            <el-tag
              effect="dark"
              :type="
                item.content.type == 1
                  ? ''
                  : item.content.type == 2
                  ? 'success'
                  : item.content.type == 3
                  ? 'info'
                  : item.content.type == 4
                  ? 'danger'
                  : 'warning'
              "
              >{{
                item.content.type == 1
                  ? "新技术"
                  : item.content.type == 2
                  ? "新工艺"
                  : item.content.type == 3
                  ? "新设备"
                  : item.content.type == 4
                  ? "新材料"
                  : "新产品"
              }}</el-tag
            >
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="新技术" name="second"> </el-tab-pane>
      <el-tab-pane label="新工艺" name="third">我的发票</el-tab-pane>
      <el-tab-pane label="新设备" name="1">我的发票</el-tab-pane>
      <el-tab-pane label="新材料" name="2">我的发票</el-tab-pane>
      <el-tab-pane label="新产品" name="3">我的发票</el-tab-pane>
      <el-tab-pane label="我的上传" name="4">我的发票</el-tab-pane>

      <!-- <el-tab-pane label="Task" name="fourth">Task</el-tab-pane> -->
    </el-tabs>
    <Pagination :total="total" @changeList="changeList" />
    <el-dialog v-model="dialogVisible" title="我要上传" width="40%" center>
      <el-form
        label-width="100px"
        ref="formRef"
        :model="numberValidateForm"
        class="demo-ruleForm"
      >
        <el-form-item
          label="标题"
          prop="title"
          :rules="[{ required: true, message: '请输入标题' }]"
        >
          <el-input
            v-model="numberValidateForm.title"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="所属分类"
          prop="type"
          :rules="[{ required: true, message: '请选择分类' }]"
        >
          <el-select
            v-model="numberValidateForm.type"
            class="m-2"
            placeholder="Select"
          >
            <el-option label="新技术" value="1" />
            <el-option label="新工艺" value="2" />
            <el-option label="新设备" value="3" />
            <el-option label="新材料" value="4" />
            <el-option label="新产品" value="5" />
          </el-select>
        </el-form-item>
        <el-form-item
          label="产品封面图"
          prop="file1"
          :rules="[{ required: true, message: '请上传产品封面图' }]"
        >
          <el-upload
            ref="uploadRef"
            class="upload-demo"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :auto-upload="false"
            list-type="picture"
            :on-change="handleChange"
            :on-remove="handleChange"
            :http-request="handleHttpRequest"
          >
            <template #trigger>
              <el-button type="primary">我要上传</el-button>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item
          label="产品详情图"
          prop="file2"
          :rules="[{ required: true, message: '请上传产品详情图' }]"
        >
          <el-upload
            ref="uploadRef1"
            class="upload-demo"
            action="#"
            :auto-upload="false"
            list-type="picture"
            :on-change="handleChange2"
            :on-remove="handleChange2"
          >
            <template #trigger>
              <el-button type="primary">我要上传</el-button>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item
          label="产品介绍"
          prop="product_introduce"
          :rules="[{ required: true, message: '请输入产品介绍' }]"
        >
          <el-input
            v-model="numberValidateForm.product_introduce"
            autosize
            type="textarea"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="产品优势"
          prop="product_super"
          :rules="[{ required: true, message: '请输入产品优势' }]"
        >
          <el-input
            v-model="numberValidateForm.product_super"
            autosize
            type="textarea"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm(formRef)">
            上传
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { upWxProduct, getWxStoreList } from "@/api/index.js";
import Pagination from "../pagination/index.vue";
import { ref, reactive, onMounted } from "vue";
import { Plus } from "@element-plus/icons-vue";
import {
  TabsPaneContext,
  FormInstance,
  UploadInstance,
  UploadProps,
  ElMessage,
} from "element-plus";
const dialogVisible = ref(false);
const activeName = ref("first");
const total = ref(0);
const getWxStoreListArray = ref([]);
let fd = [];
const formInline = reactive({
  user: "",
  region: "",
});

const formRef = ref<FormInstance>();

const numberValidateForm: any = reactive({
  title: "",
  type: "",
  file1: "",
  file2: "",
  product_super: "",
  product_introduce: "",
});
const uploadRef = ref<UploadInstance>();

onMounted(() => {
  getWxStoreListFun();
});

const handleChange: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
  numberValidateForm["file1"] = uploadFiles;
  formRef.value.validateField("file1");

  fd["file1"] = uploadFile.raw;
};
const getWxStoreListFun = () => {
  getWxStoreList(formInline.region, formInline.user, 1, 10).then((result) => {
    getWxStoreListArray.value = result.data.data;
  });
};
const handleHttpRequest = () => {
  console.log(321);
  var formData = new FormData();
  formData.append("file1", fd["file1"]);
  formData.append("file2", fd["file2"]);
  formData.append("title", numberValidateForm.title);
  formData.append("type", numberValidateForm.type);
  formData.append("product_super", numberValidateForm.product_super);
  formData.append("product_introduce", numberValidateForm.product_introduce);
  upWxProduct(formData).then((res) => {
    if (res.data.code == 200) {
      ElMessage({
        showClose: true,
        message: "上次成功,请等待审核",
        type: "success",
      });
      dialogVisible.value = false;
    } else {
      ElMessage({
        showClose: true,
        message: res.data.msg,
        type: "error",
      });
    }
  });
};
const handleChange2: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
  numberValidateForm["file2"] = uploadFiles;

  console.log(uploadFile, "lsed", uploadFiles);

  formRef.value.validateField("file2");

  fd["file2"] = uploadFile.raw;
};

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      uploadRef.value!.submit();
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const onSubmit = () => {
  console.log("submit!");
};
const uploadFun = () => {
  dialogVisible.value = true;
};
const changeList = () => {};
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>


<style lang="less" scoped>
#userInfo {
  // width: 1460px;
  height: 720px;
  position: relative;

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
  .upload-demo {
    width: 100%;
  }
  .demo-tabs {
    margin-top: 10px;

    padding: 10px;
    box-sizing: border-box;
    height: 650px;
    background: #ffffff;
    box-shadow: 0px 0px 13px 0px #ebebeb;
    border-radius: 4px;

    img {
      width: 200px;
      height: 200px;
    }
  }
}
</style>