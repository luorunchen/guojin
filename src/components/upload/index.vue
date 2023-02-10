<template>
  <el-dialog v-model="dialogVisible" title="文件上传" width="30%">
    <el-form
      label-position="top"
      ref="formRef"
      :model="numberValidateForm"
      label-width="100px"
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
        v-if="props.labelName.parent_id == '2'"
        label="发文单位"
        prop="level"
        :rules="[
          {
            required: true,
            message: '请选择发文单位',
            trigger: 'change',
          },
        ]"
      >
        <el-select v-model="numberValidateForm.level" placeholder="请选择">
          <el-option label="国家" value="1" />
          <el-option label="省" value="2" />
          <el-option label="市" value="3" />
          <el-option label="区" value="4" />
        </el-select>
      </el-form-item>
      <el-form-item
        label="对应企业"
        v-if="props.status == 'mechanism'"
        prop="inst_comp"
        :rules="[
          {
            required: true,
            message: '请选择对应企业',
            trigger: 'change',
          },
        ]"
      >
        <el-select
          v-model="numberValidateForm.inst_comp"
          class="m-2"
          placeholder="Select"
        >
          <el-option
            v-for="item in getRegionCompList"
            :key="item.value"
            :label="item.company"
            :value="item.companyId"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="行业"
        v-if="props.status == 'AccountList'"
        prop="evaluation"
        :rules="[
          {
            required: true,
            message: '请选择类型',
            trigger: 'change',
          },
        ]"
      >
        <el-cascader
          v-model="numberValidateForm.evaluation"
          clearable
          :options="list"
          @change="handleChange"
          :props="{ value: 'id', label: 'name' }"
        />
      </el-form-item>
      <el-form-item
        label="当前上传版块"
        v-if="props.status == 'databases' || props.status == 'AccountList'"
        prop="tid"
      >
        <el-input v-model="props.labelName.name" disabled></el-input>
      </el-form-item>
    </el-form>

    <el-upload
      ref="uploadRef"
      class="upload-demo"
      :action="action"
      :auto-upload="false"
      accept=".pdf,.docx,.xlsx,.doc,.xls"
      :data="numberValidateForm"
      :limit="1"
      :on-change="onProgress"
    >
      <template #trigger>
        <el-button type="primary">选择文件</el-button>
      </template>

      <el-button
        class="ml-3"
        type="success"
        @click="submitForm(formRef)"
        :disabled="disabled"
      >
        确定上传
      </el-button>

      <!-- <template #tip>
        <div class="el-upload__tip">只允许上传pdf文件</div>
      </template> -->
    </el-upload>
  </el-dialog>
</template>
<script lang="ts" setup>
import {
  ref,
  reactive,
  defineExpose,
  onMounted,
  defineProps,
  watch,
} from "vue";
// import type {  } from 'element-plus'
import { getStandList, getRegionComp } from "@/api/index";
import type { FormInstance, UploadProps, UploadInstance } from "element-plus";
import { ElMessage } from "element-plus";
import { tr } from "element-plus/es/locale";

const formRef = ref<FormInstance>();
const list = ref([]);
const numberValidateForm = reactive({
  // title: "",
  // level: "",
  // tid: "",
  // inst_comp: "",
  // style: "1",
  // evaluation: [],
  // ftp: "1",
  // expire_date: "",
});
const emits = defineEmits(["uploadSuccess"]);
const action = ref("http://119.91.156.5/gjsafe/standBank/uploadStand");
const dialogVisible = ref(false);
const disabled = ref(true);
const databasesList = ref([]);
const getRegionCompList = ref([]);
const uploadRef = ref<UploadInstance>();

const props = defineProps({
  status: String,
  labelName: Array,
  ftp: String,
});

onMounted(() => {
  //后台平台资料库上传
  // if (props.status == 'databases') {
  //   getList(1).then(res => {
  //     databasesList.value = res.data.data[0].children

  //   })
  // }

  // 后台台账上传
  if (props.status == "AccountList") {
    let arr = [];
    getStandList().then((res) => {
      list.value = [
        ...res.data.data[0].children[0].children[0].children,
        ...res.data.data[0].children[0].children[1].children,
      ];
      list.value.forEach((element) => {
        arr.push(element.id);
      });

      digui(list.value, arr, "hy");
    });
  }
});
const digui = (item: any, arr, flag) => {
  item.forEach((element, index) => {
    // console.log(element, 'sd');

    if (arr.indexOf(element.id) != -1) {
      digui(element.children, arr, flag);
    } else {
      element.children = [];
    }
  });
};

const handleChange = (value) => {
  numberValidateForm.evaluation = value[value.length - 1];
};
const handleChangeMB = (value) => {
  // console.log(value, 'ii');

  numberValidateForm.tid = value[value.length - 1];
};
const submitUpload = () => {
  uploadRef.value!.submit();
};
const onProgress: UploadProps["onProgress"] = (
  UploadFile: any,
  UploadFiles
) => {
  console.log(UploadFile, UploadFiles);

  if (UploadFile.status == "ready") {
    disabled.value = false;
  }
  if (UploadFile.status == "success") {
    disabled.value = true;
    uploadRef.value!.clearFiles();
    // disabled.value = true
    if (UploadFile.response.code == 200) {
      ElMessage({
        showClose: true,
        message: "上传成功",
        type: "success",
      });
      emits("uploadSuccess", true);
      // dialogVisible.value = false
    } else {
      ElMessage({
        showClose: true,
        message: UploadFile.response.msg,
        type: "error",
      });
    }
  }
};
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!", numberValidateForm);

      submitUpload();
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const show = (tid: string) => {
  dialogVisible.value = true;
  let tids: any = sessionStorage.getItem("tid");
  numberValidateForm.tid = tids;

  // delete numberValidateForm["expire_date"];
  if (props.ftp != undefined) {
    numberValidateForm.ftp = props.ftp;
  }

  switch (props.status) {
    //后台台账上传
    case "AccountList":
      action.value = `http://119.91.156.5/gjsafe/manage/uploadStand`;
      numberValidateForm.style = "1";
      break;
    //前台台账上传
    case "Account":
      // action.value = `http://119.91.156.5/gjsafe/manage/uploadStand`;
      numberValidateForm.style = "2";
      break;
    //后台资料库上传
    case "databases":
      action.value = `http://119.91.156.5/gjsafe/manage/addDataBaseBank`;
      if (props.labelName.parent_id != "2") {
        numberValidateForm.level = "0";
      }

      break;
    //前台资料库上传
    // case "Law":
    //   action.value = `http://119.91.156.5/gjsafe/database/addDataBaseBank`;
    //   numberValidateForm.ftp = props.ftp;
    //   break;

    //前台机构上传
    case "mechanism":
      getRegionComp().then((res) => {
        getRegionCompList.value = res.data.data;
      });

      break;
  }

  // if (props.status == "Account" || props.status == "AccountList") {
  //   numberValidateForm.ftp = props.ftp;
  //   // action.value = `http://119.91.156.5/gjsafe/standBank/uploadStand`;

  //   delete numberValidateForm["level"];
  //   delete numberValidateForm["inst_comp"];

  //   if (props.status == "Account") delete numberValidateForm["evaluation"];

  //   // delete numberValidateForm['style']

  //   //前台上传台账,后台上传模板
  //   if (props.status == "Account") {
  //     numberValidateForm.style = "2";
  //   } else {
  //     numberValidateForm.style = "1";
  //   }
  // } else {
  //    else {
  //   }
  // }
};

defineExpose({
  show,
});
</script>
<style scoped lang="less">
/deep/.el-cascader {
  width: 100%;
}
</style>
