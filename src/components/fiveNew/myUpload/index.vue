<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="标题">
      <el-input v-model="formInline.user" placeholder="请输入" />
    </el-form-item>
    <!-- <el-form-item label="所属分类">
      <el-select v-model="formInline.region" clearable placeholder="请选择">
        <el-option label="新技术" value="1" />
        <el-option label="新工艺" value="2" />
        <el-option label="新设备" value="3" />
        <el-option label="新材料" value="4" />
        <el-option label="新产品" value="5" />
      </el-select>
    </el-form-item> -->
    <el-form-item label="状态" v-if="props.activeName == '6'">
      <el-select v-model="formInline.status" clearable placeholder="请选择">
        <el-option label="已通过" value="1" />
        <el-option label="审核中" value="0" />
        <el-option label="已驳回" value="2" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="primary" @click="uploadFun">我要上传</el-button>
    </el-form-item>
  </el-form>
  <div
    class="rowBox"
    v-loading="loading"
    element-loading-text="正在加载中..."
    :element-loading-spinner="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    element-loading-background="rgba(255, 255, 255)"
  >
    <el-row :gutter="20">
      <el-col
        :span="4"
        v-for="(item, index) in getWxStoreListArray"
        :key="index"
        class="colBox"
      >
        <div class="zhezhao" v-if="item.status == 0">
          <div class="font">审核中</div>
        </div>
        <div class="zhezhao" v-if="item.status == 2">
          <div class="danger">已驳回</div>
        </div>
        <img
          :src="props.activeName != '6' ? item.content.cover : item.cover_image"
          alt=""
        />
        <div class="text">
          <p>{{ props.activeName != "6" ? item.content.title : item.title }}</p>
          <el-link
            type="danger"
            v-if="props.activeName == '6'"
            @click="deleteFun(item)"
            >删除</el-link
          >
        </div>

        <div class="text">
          <el-tag
            effect="dark"
            :type="
              item.type == 1
                ? ''
                : item.type == 2
                ? 'success'
                : item.type == 3
                ? 'info'
                : item.type == 4
                ? 'danger'
                : 'warning'
            "
            >{{
              item.type == 1
                ? "新技术"
                : item.type == 2
                ? "新工艺"
                : item.type == 3
                ? "新设备"
                : item.type == 4
                ? "新材料"
                : "新产品"
            }}</el-tag
          >

          <el-link
            type="danger"
            v-if="item.status == 2"
            @click="open(item.reason)"
            >驳回原因</el-link
          >
          <el-link type="primary" @click="detailsFun(item)">详情</el-link>
        </div>
      </el-col>
    </el-row>
  </div>

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
  <el-dialog v-model="detailsVisible" title="详情" width="40%" center>
    <div>
      <h3>产品图片</h3>
      <div class="demo-image__preview">
        <el-image
          v-for="(info, index2) in props.activeName == '6'
            ? drawerRow.product_image.split(',')
            : drawerRow.content.productImage.split(',')"
          :key="index2"
          class="elImage"
          :src="info"
          :preview-src-list="
            props.activeName == '6'
              ? drawerRow.product_image.split(',')
              : drawerRow.content.productImage.split(',')
          "
          :zoom-rate="1.2"
          :initial-index="4"
        />
      </div>
      <h3>产品优势</h3>
      <p class="info">
        {{ drawerRow.product_super }}
      </p>
      <h3>产品介绍</h3>
      <p class="info">{{ drawerRow.product_introduce }}</p>
    </div></el-dialog
  >
</template>

<script lang="ts" setup>
import {
  upWxProduct,
  getWxStoreList,
  getMyUPStoreList,
  delWxProduct,
} from "@/api/index.js";
import Pagination from "../../pagination/index.vue";
import { ref, reactive, onMounted, watch } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import {
  TabsPaneContext,
  FormInstance,
  UploadInstance,
  UploadProps,
  ElMessage,
} from "element-plus";
const props = defineProps({
  activeName: String,
  currentPages: Number,
  pageSizes: Number,
});
const emits = defineEmits(["totalFun"]);
const loading = ref(true);
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;
const dialogVisible = ref(false);
const detailsVisible = ref(false);
const activeName = ref("first");
const total = ref(0);
const getWxStoreListArray = ref([]);
const drawerRow = ref([]);
const file2uploadFiles = ref([]);
// const getMyUPStoreListArray = ref([]);
let fd = [];
const formInline = reactive({
  user: "",
  region: "",
  status: "",
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

watch(
  () => props.activeName,
  (val) => {
    console.log(val);

    if (val == "6") {
      getMyUPStoreListFun();
    } else {
      getWxStoreListFun();
    }
  }
);
watch(
  () => [props.currentPages, props.pageSizes],
  (val) => {
    if (props.activeName == "6") {
      getMyUPStoreListFun();
    } else {
      getWxStoreListFun();
    }
  }
);

onMounted(() => {
  getWxStoreListFun();
});

const getMyUPStoreListFun = () => {
  loading.value = true;
  getMyUPStoreList(
    props.currentPages,
    props.pageSizes,
    "",
    formInline.user,
    formInline.status
  ).then((res) => {
    // console.log();
    loading.value = false;
    getWxStoreListArray.value = res.data.data;
    emits("totalFun", res.data.dataCount);
  });
};
const open = (reason) => {
  ElMessageBox.alert(reason, "驳回原因", {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: "确定",
  });
};
const deleteFun = (item) => {
  ElMessageBox.confirm(
    `是否确定删除 <span style='color:red'> ${item.title}</span> ?`,
    "提示",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      dangerouslyUseHTMLString: true,
    }
  ).then(() => {
    delWxProduct(item.id).then((res) => {
      // console.log(res);
      if (res.data.code == 200) {
        ElMessage({
          type: "success",
          message: "删除成功",
          showClose: true,
        });
        if (props.activeName == "6") {
          getMyUPStoreListFun();
        } else {
          getWxStoreListFun();
        }
      } else {
        ElMessage({
          type: "error",
          message: "删除失败",
          showClose: true,
        });
      }
    });
  });
  // .catch(() => {
  //   ElMessage({
  //     type: "info",
  //     message: "Delete canceled",
  //   });
  // });
};

const detailsFun = (item) => {
  detailsVisible.value = true;
  drawerRow.value = item;
  console.log(item, "item");
};
const handleChange: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
  numberValidateForm["file1"] = uploadFiles;
  formRef.value.validateField("file1");

  fd["file1"] = uploadFile.raw;
};
const getWxStoreListFun = () => {
  loading.value = true;

  getWxStoreList(
    props.activeName,
    formInline.user,
    props.currentPages - 1,
    props.pageSizes
  ).then((result) => {
    getWxStoreListArray.value = result.data.data;
    loading.value = false;
    emits("totalFun", result.data.dataCount);
    result.data.data.forEach((element) => {
      element.type = element.content.type;
    });
  });
};
const handleHttpRequest = () => {
  console.log(321);
  var formData = new FormData();
  file2uploadFiles.value.forEach((element, index) => {
    console.log(element.raw, 1111, index);
    formData.append(`file${index + 2}`, element.raw);
  });
  formData.append("file1", fd["file1"]);
  // formData.append("file2", fd["file2"]);
  formData.append("title", numberValidateForm.title);
  ``;
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
  file2uploadFiles.value = uploadFiles;

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
  if (props.activeName == "6") {
    getMyUPStoreListFun();
  } else {
    getWxStoreListFun();
  }
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

  .upload-demo {
    width: 100%;
  }
  .rowBox {
    height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
    border-bottom: #eaeaea 1px solid;
    padding-bottom: 20px;

    img {
      width: 100%;
      height: 180px;
    }
    .colBox {
      margin-bottom: 10px;
      position: relative;
      .zhezhao {
        width: 92%;
        height: 180px;
        background: rgba(0, 0, 0, 0.5);
        position: absolute;
        display: flex;
        .font {
          margin: 0 auto;
          width: 95px;
          height: 45px;
          background: #fff7eb;
          text-align: center;
          line-height: 45px;
          font-weight: 900;
          color: #ef8514;
          // color: ;
          font-size: 20px;
          // line-height: 180px;
          align-self: center;
        }
        .danger {
          margin: 0 auto;
          width: 95px;
          height: 45px;
          background: #f8dbd4;
          text-align: center;
          line-height: 45px;
          font-weight: 900;
          color: red;
          // color: ;
          font-size: 20px;
          // line-height: 180px;
          align-self: center;
        }
      }
    }
    .text {
      display: flex;
      justify-content: space-between;
    }
  }
  h3 {
    border-bottom: 1px solid #eff1f4;
    border-left: 4px solid #0165d0;
    padding-left: 20px;
    margin-top: 50px;
  }
  .info {
    padding: 30px;
  }

  // .el-form-item {
  //   width: 46%;
  // }
  .info {
    text-indent: 2em;
  }
  .elImage {
    width: 200px;
    height: 200px;
    margin-top: 10px;
  }
}
</style>