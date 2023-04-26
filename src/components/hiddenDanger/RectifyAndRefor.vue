<template>
  <div>

    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="整改情况">
        <el-select v-model="qingkuang" placeholder="请选择" clearable>
          <el-option label="已整改" value="1" />
          <el-option label="未整改" value="0" />
          <!-- <el-option label="政府排查" value="3" /> -->
        </el-select>

      </el-form-item>
      <el-form-item label=" 隐患来源">
        <el-select v-model="source" class="selectPoration" placeholder="请选择" clearable>
          <el-option label="企业自查" value="1" />
          <el-option label="机构检查" value="2" />
          <el-option label="政府排查" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getHiddenRegisterFun">查询</el-button>
      </el-form-item>
    </el-form>

    <br />
    <el-table :data="tableData" stripe style="width: 100%;margin-bottom:50px" height="400px">
      <el-table-column type="index" width="50" />
      <el-table-column prop="standard" label="隐患描述">

        <template #default="scope">
          <el-tooltip class="box-item" effect="dark" :content="scope.row.standard" placement="top-start">
            <span class="textp">{{ scope.row.standard }}</span>
          </el-tooltip>

        </template>
      </el-table-column>
      <el-table-column prop="time" label="整改期限">


      </el-table-column>
      <!-- <el-table-column prop="hdTotal" label="隐患总数" /> -->
      <el-table-column prop="bigCount" label="整改情况">
        <template #default="scope">
          {{ scope.row.state == 0 ? '未整改' : '已整改' }}
        </template>
      </el-table-column>
      <el-table-column prop="hdLevelName" label="隐患等级" />
      <el-table-column prop="sourceName" label="隐患来源" />
      <!-- <el-table-column prop="smallCount" label="复查结果" /> -->

      <!-- <el-table-column prop="smallCount" label="检查状态" /> -->
      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <el-button type="primary" @click="see(scope.row)">查看</el-button>
          <el-button type="primary" @click="formChange(scope.row)" v-if="scope.row.state == 0">整改</el-button>


        </template>
      </el-table-column>

    </el-table>
    <Pagination :total="total" :type="1" @changeList="changeList" />

    <el-dialog v-model="dialogVisible" title="整改" width="40%" center>
      <el-form ref="formRef" :model="numberValidateForm" label-width="auto" class="demo-ruleForm">
        <!-- <el-form-item label="整改情况" prop="zg_name" :rules="[
          {
            required: true,
            message: '请选择整改情况',
            trigger: 'change',
          },
        ]">
          <el-select v-model="numberValidateForm.zg_name" placeholder="请选择">
            <el-option label="已整改" value="1" />
            <el-option label="未整改" value="0" />
          </el-select>
        </el-form-item> -->
        <el-form-item label="整改完成日期" prop="zg_date" :rules="[
            {
              type: 'date',
              required: true,
              message: '请选择整改日期',
              trigger: 'change',
            }

          ]">
          <el-date-picker v-model="numberValidateForm.zg_date" type="datetime" label="Pick a date" placeholder="请选择时间"
            value-format="YYYY/MM/DD HH:mm:ss" style="width: 100%" />

        </el-form-item>
        <el-form-item label="整改责任人" prop="zg_name" :rules="[
            { required: true, message: '请输入整改责任人' },

          ]">
          <el-input v-model="numberValidateForm.zg_name" type="text" />
        </el-form-item>
        <el-form-item label="整改措施" prop="zg_measure" :rules="[
            { required: true, message: '请输入整改责任人' },

          ]">
          <el-input v-model="numberValidateForm.zg_measure" type="text" />
        </el-form-item>
        <el-form-item label="整改后图片" prop="zg_name">
          <el-upload ref="uploadRef" :auto-upload="false" class="upload-demo"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :on-change="handleChange2"
            :on-remove="handleChange2" :limit="1" list-type="picture" :http-request="handleHttpRequest">
            <el-button type="primary">上传照片</el-button>

          </el-upload>
        </el-form-item>

      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm(formRef)">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="seeVisible" title="查看" width="60%" center>
      <el-descriptions border :column="1">

        <el-descriptions-item label="隐患描述" width="2" label-align="right">{{ seeInfoRow.standard
        }}</el-descriptions-item>
        <el-descriptions-item label="隐患地点" label-align="right">{{ seeInfoRow.hdPlace
        }}</el-descriptions-item>
        <el-descriptions-item label="关联风险点" label-align="right">
          {{ seeInfoRow.riskLIst }}
        </el-descriptions-item>
        <el-descriptions-item label="隐患等级" label-align="right">
          {{ seeInfoRow.hdLevelName }}
        </el-descriptions-item>
        <el-descriptions-item label="隐患类别" label-align="right">
          {{ seeInfoRow.hdTypeName }}
        </el-descriptions-item>
        <el-descriptions-item label="整改类型" label-align="right">
          {{ seeInfoRow.type == '1' ? '立即整改' : '限期整改' }}
        </el-descriptions-item>
        <el-descriptions-item label="整改期限" label-align="right">
          {{ seeInfoRow.time }}
        </el-descriptions-item>
        <!-- <el-descriptions-item label="排查时间" label-align="right">
          {{ seeRow.checkDate }}
        </el-descriptions-item>
        <el-descriptions-item label="排查人" label-align="right">
          {{ seeRow.checkName }} -->
        <!-- </el-descriptions-item> -->
        <el-descriptions-item label="隐患图片" label-align="right">

          <el-image class="hiddenImg" :src="seeInfoRow.image" :zoom-rate="1.2" :preview-src-list="[seeInfoRow.image]"
            :initial-index="4" fit="cover" />
          <!-- <img :src="seeInfoRow.image" alt="" class="hiddenImg"> -->
        </el-descriptions-item>
      </el-descriptions>
      <br />
      <el-descriptions border :column="1">
        <el-descriptions-item label="整改情况" width="2" label-align="right">
          {{ seeInfoRow.state == 0 ? '未整改' : '已整改' }}
        </el-descriptions-item>
        <el-descriptions-item label="完成日期" label-align="right">
          {{ HiddenZg.zg_date }}
        </el-descriptions-item>
        <el-descriptions-item label="责任人" label-align="right">
          {{ HiddenZg.zg_name }}
        </el-descriptions-item>
        <el-descriptions-item label="整改措施" label-align="right">
          {{ HiddenZg.zg_measure }}
        </el-descriptions-item>
        <el-descriptions-item label="整改后照片" label-align="right">
          <el-image class="hiddenImg" :src="HiddenZg.zg_image" :zoom-rate="1.2" :preview-src-list="[HiddenZg.zg_image]"
            :initial-index="4" fit="cover">
            <template #error>
              <div class="image-slot">
                无整改后图片
              </div>
            </template>
          </el-image>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import Pagination from "../pagination/index.vue";
import { ref, onMounted, reactive } from 'vue'
import { getHiddenRegister, addHiddenZg, getHiddenZg, getRiskInfo } from "@/api/index.js"
import { ElMessage, ElMessageBox, UploadProps, UploadInstance } from "element-plus";
import type { FormInstance } from 'element-plus'
import moment from 'moment'
const total = ref(0)
const pageSize4 = ref(10)
const currentPage4 = ref(1)
const tableData = ref([])
const source = ref()
const qingkuang = ref()
const seeInfoRow: any = ref({})
const HiddenZg: any = ref({})
let fd = []

const dialogVisible = ref(false)
const seeVisible = ref(false)
const uploadRef = ref<UploadInstance>();
const formRef = ref<FormInstance>()
const numberValidateForm: any = reactive({
  zg_name: '',
  zg_date: '',
  zg_measure: "",
  file: ""
})

onMounted(() => {
  getHiddenRegisterFun()
})



const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log(fd, 'sdad');

      handleHttpRequest();
    } else {
      console.log('error submit!')
      return false
    }
  })
}
const handleHttpRequest = () => {
  console.log(321);
  // // let arr = []

  let formData = new FormData();

  formData.append("file", fd["file"]);
  formData.append("zg_name", numberValidateForm.zg_name);
  formData.append("zg_measure", numberValidateForm.zg_measure);
  formData.append("zg_date", numberValidateForm.zg_date);
  formData.append("zg_money", "");
  formData.append("zg_scheme", "");

  // console.log(seeRow.value);

  formData.append("rid", seeInfoRow.value.rid);



  addHiddenZg(formData).then(res => {
    if (res.data.code == 200) {
      ElMessage({
        message: '整改成功',
        type: 'success',
        showClose: true
      })
      dialogVisible.value = false
      getHiddenRegisterFun()
    }
  })

};
const handleChange2: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
  numberValidateForm["file"] = uploadFiles;

  console.log(uploadFile, "lsed", uploadFiles);
  // file2uploadFiles.value = uploadFiles;

  // formRef.value.validateField("file");

  fd["file"] = uploadFile.raw;
};
//分页器组件传回来的数据
const changeList = (pageSize, currentPage) => {
  console.log(pageSize, currentPage, "收到啦分液器");

  pageSize4.value = pageSize;
  currentPage4.value = currentPage;
  // hiddenListFun()
  getHiddenRegisterFun()
};
const see = (row) => {
  seeInfoRow.value = row
  seeVisible.value = true
  getHiddenZg(row.rid).then(res => {
    if (res.data.data != null) {
      HiddenZg.value = res.data.data
    } else {
      HiddenZg.value = {}
    }
  })
  getRiskInfo(row.riskId).then(res => {
    seeInfoRow.value.riskLIst = res.data.data.toString()
  })
}
const formChange = (row) => {
  seeInfoRow.value = row
  dialogVisible.value = true
}
const getHiddenRegisterFun = () => {
  getHiddenRegister(qingkuang.value, currentPage4.value, pageSize4.value, source.value, sessionStorage.getItem('companyId')).then(res => {
    tableData.value = res.data.data
    total.value = res.data.dataCount
    res.data.data.forEach(element => {
      // console.log(moment(seeRow.value.checkDate).add(element.days * 1, 'days').format('YYYY-MM-DD'));
      element.time = moment(element.create_date).add(element.days * 1, 'days').format('YYYY-MM-DD')

    });
  })
}
</script>

<style scoped lang="less">
.hiddenImg {
  width: 200px;
  height: 200px;
}

.selectPoration {
  margin-right: 10px;
}

.textp {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis
}

/deep/.image-slot {
  width: 200px;
  height: 200px;
  text-align: center;
  line-height: 200px;
}
</style> 