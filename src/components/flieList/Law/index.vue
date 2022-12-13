<template>
  <div id="law">

    <el-row :gutter="20">
      <el-col :span="8">
        <el-input v-model="input2" placeholder="关键词">
          <template #append>
            <el-button type="primary">搜索</el-button>
          </template>
        </el-input>
      </el-col>
      <!-- <el-col :span="8">
        <el-button type="primary" @click="uploadFun">上传文件</el-button>
      
      </el-col> -->
    </el-row>
    <br />
    <el-table :data="tableData" stripe height="570px">
      <el-table-column type="index" width="50" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="create_date" label="上传时间" />
      <el-table-column prop="create_name" label="上传人员" />
      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" @click="see(scope.row)">查看</el-button>
          <!-- <el-button size="small" type="danger" @click="delFileInfoFun(scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>




    <AuditFile ref="auditFile" />

    <Pagination :total="total" @changeList="changeList" />
    <Upload ref="upload" :status=status :labelName="labelName" />
    <SeeFlie ref="seeFile"></SeeFlie>
  </div>

</template>

<script lang="ts" setup>
import { fileInfo, getAuditFiles, auditContent, delFileInfo } from '@/api/index'
import { onMounted, reactive, ref, defineProps, watch } from 'vue'
import SeeFlie from '../../seeFlie/index.vue'
import Upload from '../../upload/index.vue'
import Pagination from '../../pagination/index.vue'
import AuditFile from '../../auditFile/index.vue'
import { Search } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'
const currentPage4 = ref(1)
const pageSize4 = ref(10)
const currentPage3 = ref(1)
const pageSize3 = ref(10)
const total = ref(0)
const labelName = ref([])
const status = ref('Law')
const total2 = ref(0)
const activeName = ref('first')
const table = ref(false)
const gridData = ref([])
const formInline = reactive({
  user: '',
  region: '',
})
const store = useStore();
const seeFile: any = ref(null)
const auditFile: any = ref(null)
const upload: any = ref(null)
const tableData = ref([])

const props = defineProps({
  tid: Number
})

watch(() => props.tid, (val) => {
  console.log(val, 'props');
  fileInfoFun()

})
onMounted(() => {
  fileInfoFun()
})

//获取待审核文件列表
const getAuditFilesFun = () => {
  auditFile.value.show()
}

//删除资料文件
const delFileInfoFun = (row: any) => {
  ElMessageBox.confirm(
    `是否确定删除<span style='color:red'>${row.title}</span>文件?`,
    '审核文件',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
      dangerouslyUseHTMLString: true,
    }
  ).then(() => {
    delFileInfo(row.id).then((res) => {
      if (res.data.code == 200) {
        ElMessage({
          showClose: true,
          message: '删除成功',
          type: 'success',
        })
        fileInfoFun()
      } else {
        ElMessage({
          showClose: true,
          message: res.data.msg,
          type: 'error',
        })
      }
    })
  })
}
//查看文件
const see = (row: any) => {
  seeFile.value.show(row)
}
//分页器组件传回来的数据
const changeList = (pageSize, currentPage, type) => {
  console.log(pageSize, currentPage, '收到啦分液器', type)

  pageSize4.value = pageSize
  currentPage4.value = currentPage
  fileInfoFun()
}
const uploadFun = () => {
  // labelName.value=
  upload.value.show()

}
const onSubmit = () => {
  console.log('submit!')
}
//获取列表
const fileInfoFun = () => {
  fileInfo(sessionStorage.getItem('tid'), currentPage4.value, pageSize4.value, "")
    .then((res: any) => {
      // console.log(res, 99)

      tableData.value = res.data.data
      total.value = res.data.dataCount
    })
    .catch((err) => {
      console.log(err, 555)
    })
}
</script>

<style scoped lang="less">
#law {
  height: 680px;


}
</style>
