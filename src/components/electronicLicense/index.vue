<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="formInline.name" p />
      </el-form-item>
      <el-form-item label="证书类型">
        <el-cascader v-model="formInline.type" :props="{ value: 'id', label: 'name' }" :options="typeList"
          @change="cascaderChange" clearable />
        <!-- <el-input v-model="formInline.type" placeholder="Approved by" /> -->
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getZSFun">查询</el-button>
        <el-button type="primary" @click="dialogVisible = true">上传人员证书</el-button>
        <el-button type="primary" @click="ziziVisible = true">上传证书/报告</el-button>
        <el-button type="primary" @click="seeJClist">查看证书/报告</el-button>
      </el-form-item>
    </el-form>


    <el-table :data="tableData" stripe style="width: 100%;margin-bottom: 50px;margin-top: 10px;" height="400px">


      <el-table-column prop="typeName" label="证件类型" />
      <el-table-column prop="license_name" label="证件名称" />
      <el-table-column prop="name" label="证书持有人" />
      <el-table-column prop="create_date" label="发证时间" />
      <el-table-column prop="expire_date" label="证书到期时间" />
      <el-table-column prop="name" label="操作">
        <template #default="scope">
          <el-button type="primary" @click="see(scope.row)">查看</el-button>
          <el-button type="danger" @click="delZSFun(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total" @changeList="changeList" />
  </div>

  <el-dialog v-model="dialogVisible" title="上传" width="40%" center>
    <el-form ref="formRef" :model="numberValidateForm" class="demo-ruleForm">
      <el-form-item label="姓名&#12288;&#12288;&#12288;&#12288;" prop="name" :rules="[
        { required: true, message: '请输入姓名' },

      ]">
        <el-input v-model="numberValidateForm.name" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="身份证号码&#12288;" prop="cardId" :rules="[
        { required: true, message: '请输入身份证号码' },

      ]">
        <el-input v-model="numberValidateForm.cardId" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="证书名称&#12288;&#12288;" prop="license_name" :rules="[
        { required: true, message: '请输入证书名称' },

      ]">
        <el-input v-model="numberValidateForm.license_name" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="证书类型&#12288;&#12288;" prop="type" :rules="[
        {
          required: true,
          message: '请选择类型',
          trigger: 'change',
        },

      ]">

        <!-- <el-select v-model="numberValidateForm.type" placeholder="请选择">
          <el-option :label="item.name" :value="item.id" v-for="item, index in typeList " :key="index" />
         
        </el-select> -->
        <el-cascader v-model="numberValidateForm.type" :props="{ value: 'id', label: 'name' }" :options="typeList"
          @change="cascaderChange" />
      </el-form-item>
      <el-form-item label="证书下发时间" prop="create_date" :rules="[
        {
          type: 'date',
          required: true,
          message: '请选择下发时间',
          trigger: 'change',
        },

      ]">
        <el-date-picker value-format="YYYY/MM/DD HH:mm:ss" v-model="numberValidateForm.create_date" type="datetime"
          style="width: 100%" />
      </el-form-item>
      <el-form-item label="证书到期时间" prop="date" :rules="[
        {
          type: 'date',
          required: true,
          message: '请选择到期时间',
          trigger: 'change',
        },

      ]">
        <el-date-picker value-format="YYYY/MM/DD HH:mm:ss" v-model="numberValidateForm.date" type="datetime"
          style="width: 100%" />
      </el-form-item>
      <el-form-item label="提醒到期手机" prop="phone" :rules="[
        {

          required: true,
          message: '请输入提醒到期手机号码',

        },

      ]">
        <el-input v-model="numberValidateForm.phone" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="提醒周期(年)" :rules="[
        {

          required: true,
          message: '请输入提醒周期(年)',

        },

      ]">
        <el-input-number v-model="numberValidateForm.cycle" :precision="0" :min="1" :max="10" />
      </el-form-item>
      <el-form-item label="上传身份证&#12288;" prop="file1" :rules="[
        {
          required: true, trigger: 'change', message: '请上传身份证正面',
        }]">
        <el-upload ref="uploadRef" class="upload-demo" :auto-upload="false" :on-change="handleChange"
          :on-remove="handleChange" list-type="picture" :limit="1">
          <template #trigger>
            <el-button type="primary">上传身份证</el-button>
          </template>




        </el-upload>
      </el-form-item>
      <el-form-item label="上传证书&#12288;&#12288;" prop="file2" :rules="[
        {
          required: true, trigger: 'change', message: '请上传证书',
        }]">
        <el-upload ref="uploadRef" class="upload-demo" :auto-upload="false" :on-change="handleChange2"
          :on-remove="handleChange2" list-type="picture" :limit="1">
          <template #trigger>
            <el-button type="primary">上传证书</el-button>
          </template>




        </el-upload>
      </el-form-item>
      <el-form-item label="证书/报告&#12288;&#12288;" prop="file3" v-if="numberValidateForm.type[0] == 4">
        <el-link type="primary" @click="addOther">新增+</el-link>
      </el-form-item>

    </el-form>

    <template #footer>
      <el-button type="primary" @click="submitForm(formRef)">确定</el-button>

    </template>
  </el-dialog>
  <el-dialog v-model="ziziVisible" title="上传" width="40%" center>
    <el-form :model="numberValidateForm" ref="formRef">
      <el-form-item label="证书/报告名称" prop="zizi" :rules="[
        { required: true, message: '请输入证书/报告名称' },

      ]">
        <el-input v-model="numberValidateForm.zizi" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="报告下发时间" prop="create_date2" :rules="[
        {
          type: 'date',
          required: true,
          message: '请选择下发时间',
          trigger: 'change',
        },

      ]">
        <el-date-picker value-format="YYYY/MM/DD HH:mm:ss" v-model="numberValidateForm.create_date2" type="datetime"
          style="width: 100%" />
      </el-form-item>
      <el-form-item label="报告到期时间" prop="date2" :rules="[
        {
          type: 'date',
          required: true,
          message: '请选择报告到期时间',
          trigger: 'change',
        },

      ]">
        <el-date-picker value-format="YYYY/MM/DD HH:mm:ss" v-model="numberValidateForm.date2" type="datetime"
          style="width: 100%" />

      </el-form-item>
      <el-form-item label="证书/报告上传" prop="file3" :rules="[
        {
          required: true, trigger: 'change', message: '请上传证书/报告',
        }]">

        <el-upload ref="uploadRef" class="upload-demo" :auto-upload="false"
          :on-change="(uploadFile, uploadFiles) => handleChange3(uploadFile, uploadFiles)"
          :on-remove="(uploadFile, uploadFiles) => handleChange3(uploadFile, uploadFiles)" list-type="picture" :limit="1">
          <template #trigger>
            <el-button type="primary">上传证书/报告</el-button>
          </template>
        </el-upload>
      </el-form-item>

    </el-form>
    <template #footer>
      <el-button type="primary" @click="submitForm(formRef)">确定</el-button>

    </template>
  </el-dialog>
  <el-dialog v-model="seeVisible" title="查看" width="50%" center>
    <el-descriptions :column="2" border>
      <el-descriptions-item label="证书持有人" label-align="right" align="center">
        {{ seeRow.name }}

      </el-descriptions-item>
      <el-descriptions-item label="身份证号码" label-align="right" align="center">
        {{ seeRow.cardId }}

      </el-descriptions-item>
      <el-descriptions-item label="发证时间" label-align="right" align="center">
        {{ seeRow.create_date }}

      </el-descriptions-item>
      <el-descriptions-item label="证书到期时间" label-align="right" align="center">
        {{ seeRow.expire_date }}

      </el-descriptions-item>
      <el-descriptions-item label="身份证照片" label-align="right" align="center">
        <el-image :src="seeRow.card_image" :zoom-rate="1.2" :preview-src-list="[seeRow.card_image]" :initial-index="4"
          fit="cover" />

      </el-descriptions-item>
      <el-descriptions-item label="证件照片" label-align="right" align="center">
        <el-image :src="seeRow.license" :zoom-rate="1.2" :preview-src-list="[seeRow.license]" :initial-index="4"
          fit="cover" />
      </el-descriptions-item>

    </el-descriptions>


  </el-dialog>
  <el-dialog v-model="seeJClistVisible" title="查看" width="50%" center>

    <el-table :data="JClist" stripe style="width: 100%;margin-bottom: 50px;margin-top: 10px;" height="400px">



      <!-- <el-table-column prop="test_image" label="证书/报告图片">
        <template #default="scope">
        </template>

      </el-table-column> -->
      <el-table-column prop="test_name" label="证书/报告名称">


      </el-table-column>
      <el-table-column prop="create" label="证书/报告下发时间">


      </el-table-column>
      <el-table-column prop="expire" label="证书/报告过期时间">


      </el-table-column>
      <el-table-column prop="name" label="操作">
        <template #default="scope">
          <el-button type="primary" @click="seeJCFun(scope.row)">查看</el-button>
          <el-button type="danger" @click="delJCFun(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
  <el-dialog v-model="imgVisible" title="查看" width="30%">
    <el-image :src="seeJCROW" :zoom-rate="1.2" :preview-src-list="[seeJCROW]" :initial-index="4" fit="cover"
      :preview-teleported="true" class="imgBox" />
  </el-dialog>
  <SeeFlie ref="seeFile"></SeeFlie>
</template>

<script lang="ts" setup>
import { getZS, getList, addZS, addTest, getJC, delZS, delJC } from "@/api/index.js"
import { onMounted, ref, reactive, defineProps } from 'vue'
import Pagination from "../pagination/index.vue"
import SeeFlie from "../seeFlie/index.vue";;
import { UploadInstance, FormInstance, ElMessage, ElMessageBox } from 'element-plus'
const tableData = ref([])
const typeList = ref([])
const JClist = ref([])
const seeJCROW = ref()
const total = ref(0)
const seeFile = ref(null)
const pageSize4 = ref(10)
const currentPage4 = ref(1)
const seeRow: any = ref({})

const dialogVisible = ref(false)
const ziziVisible = ref(false)
const imgVisible = ref(false)
const seeVisible = ref(false)
const seeJClistVisible = ref(false)
const numberValidateForm: any = reactive({
  name: '',
  type: '',
  date: '',
  date2: '',
  create_date: "",
  create_date2: "",
  file1: "",
  file2: "",
  file3: "",
  cardId: "",
  license_name: "",
  zizi: "",
  cycle: '',
  phone: ''
})
const formInline = reactive({
  name: "",
  type: ""
})

const props = defineProps({
  tid: Number
})

const uploadRef = ref<UploadInstance>()
const formRef = ref<FormInstance>()


onMounted(() => {
  getZSFun()

  getList(2).then(res => {
    typeList.value = res.data.data
    console.log(res.data.data);
    typeList.value.forEach(element => {
      switch (element.name) {
        case '主要负责人':
          element.id = 1
          break;
        case '安全生产管理人员':
          element.id = 2
          break;
        case '特种作业人员':
          element.id = 3
          break;
        case '特种设备证书':
          element.id = 4
          break;
      }
    });

  })
})


const seeJCFun = (row) => {
  if (row.test_image.indexOf('img') != -1 || row.test_image.indexOf('png') != -1) {
    seeJCROW.value = row.test_image
    imgVisible.value = true
  } else {
    row.url = row.test_image
    seeFile.value.show(row, "law");
  }

}
const see = (row) => {
  seeVisible.value = true
  seeRow.value = row


}

const handleChange: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
  numberValidateForm.file1 = uploadFile.raw;
  formRef.value.validateField("file1");



};
const handleChange2: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
  numberValidateForm.file2 = uploadFile.raw;
  formRef.value.validateField("file2");



};
const handleChange3: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
  // numberValidateForm.file3[index].file = uploadFile.raw;
  // formRef.value.validateField("file2");

  // console.log(uploadFile, uploadFiles, index, 'dadsds');
  numberValidateForm.file3 = uploadFile.raw;
  formRef.value.validateField("file3");

};
const addOther = () => {
  numberValidateForm.file3.push({
    file: '',
    date: ''
  })
}
const delOther = (index) => {
  numberValidateForm.file3.splice(index, 1)
}

const seeJClist = () => {
  seeJClistVisible.value = true

  getJC().then(res => {
    JClist.value = res.data.data
  })

}
const getZSFun = () => {
  getZS(currentPage4.value, pageSize4.value, formInline.name, formInline.type).then(res => {
    tableData.value = res.data.data
    total.value = res.data.dataCount
  })

}

const delZSFun = (row) => {
  ElMessageBox.confirm(
    `确定删除 <span style='color:red'>${row.typeName}</span> 吗?`,
    '删除',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      dangerouslyUseHTMLString: true
    }
  )
    .then(() => {
      delZS(row.id).then(res => {

        if (res.data.code == 200) {
          getZSFun()
          ElMessage({
            type: 'success',
            message: '删除成功',
            showClose: true
          })
        }

      })

    })

}
const delJCFun = (row) => {
  ElMessageBox.confirm(
    `确定删除该证书/报告吗?`,
    '删除',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      dangerouslyUseHTMLString: true
    }
  )
    .then(() => {
      delJC(row.id).then(res => {

        if (res.data.code == 200) {
          // getZSFun()
          getJC().then(res => {
            JClist.value = res.data.data
          })
          ElMessage({
            type: 'success',
            message: '删除成功',
            showClose: true
          })
        }

      })

    })

}
const cascaderChange = (value) => {
  console.log(value, 'value');
  formInline.type = value[value.length - 1]
}
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      var formData = new FormData();
      var formData2 = new FormData();


      if (ziziVisible.value == true) {

        formData2.append("test_name", numberValidateForm.zizi);
        formData2.append("create", numberValidateForm.create_date2);
        formData2.append("file", numberValidateForm.file3);
        formData2.append("expire", numberValidateForm.date2);
        addTest(formData2).then(res => {
          if (res.data.code == 200) {
            ElMessage({
              showClose: true,
              message: '上传成功',
              type: 'success'
            })
            // getZSFun()
            ziziVisible.value = false
          }
        })

      } else {
        formData.append("license_name", numberValidateForm.license_name);
        formData.append("create_date", numberValidateForm.create_date);
        formData.append("cardId", numberValidateForm.cardId);
        formData.append("file1", numberValidateForm.file1);
        formData.append("file2", numberValidateForm.file2);
        formData.append("name", numberValidateForm.name);
        formData.append("type", numberValidateForm.type[0]);
        formData.append("expire_date", numberValidateForm.date);
        formData.append("tid", String(numberValidateForm.type[1]));
        formData.append("phone", numberValidateForm.phone);
        formData.append("cycle", numberValidateForm.cycle);

        console.log(numberValidateForm);
        addZS(formData).then(res => {
          if (res.data.code == 200) {
            ElMessage({
              showClose: true,
              message: '上传成功',
              type: 'success'
            })
            getZSFun()
            dialogVisible.value = false
          }
        })
      }






    } else {
      console.log('error submit!')
      return false
    }
  })
}
//分页器组件传回来的数据
const changeList = (pageSize, currentPage, type) => {
  console.log(pageSize, currentPage, "收到啦分液器", type);

  pageSize4.value = pageSize;
  currentPage4.value = currentPage;
  getZSFun()
  // props.titleChangeName == '隐患排查治理' ? hiddenListFun() : fileInfoFun();

};
</script>
<style lang='less' scoped>
/deep/.el-cascader {
  width: 100%;
}

.addOther {
  padding: 5px;
  margin-top: 10px;
  // height: 80px;
  border: 1px solid #0165d0;
}


.el-image {
  width: 150px;
  height: 150px;
}

.imgBox {
  width: 100%;
  height: 100%;
}
</style>