<template>
  <div id="account">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input v-model="input2" placeholder="关键词">
          <template #append>
            <el-button type="primary" @click="fileInfoFun">搜索</el-button>
          </template>
        </el-input>
      </el-col>
      <el-col :span="9">
        <el-button type="primary" @click="uploadFun">上传文件</el-button>
        <!-- <el-button type="primary" @click="getAuditFilesFun">待审核文件</el-button> -->
      </el-col>
      <el-col :span="7">
        <el-select v-model="style" class="m-2" placeholder="Select" size="large">
          <el-option label="模板" value="1" />
          <el-option label="台账" value="2" />
        </el-select>
      </el-col>
    </el-row>
    <br />
    <el-table :data="tableData" stripe style="width: 100%" height="570px">
      <el-table-column type="index" width="50" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="create_date" label="上传时间" />
      <el-table-column prop="create_name" label="上传人员" />
      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" @click="see(scope.row)">查看</el-button>
          <el-button size="small" type="primary" @click="downloadFileFun(scope.row.url)" v-if="style == '1'">下载模板
          </el-button>
          <el-button size="small" type="danger" @click="delFileInfoFun(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <AuditFile ref="auditFile" />

    <Pagination :total="total" :type="1" @changeList="changeList" />
    <Upload ref="upload" :status="status" :labelName="labelName" />
    <SeeFlie ref="seeFile" />
  </div>

</template>

<script script lang = "ts" setup >
import { getStandInfo, delStandFileInfo } from '@/api/index'
import { onMounted, reactive, ref, defineProps, watch } from 'vue'
import SeeFlie from '../../seeFlie/index.vue'
import Upload from '../../upload/index.vue'
import Pagination from '../../pagination/index.vue'
import AuditFile from '../../auditFile/index.vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const currentPage4 = ref(1)
const pageSize4 = ref(10)
const currentPage3 = ref(1)
const pageSize3 = ref(10)
const total = ref(0)
const input2 = ref()
const total2 = ref(0)
const status = ref('Account')
const table = ref(false)
const style = ref('1')
const gridData = ref([])
const labelName = ref([
  {
    parent_id: ''
  }
])
const formInline = reactive({
  user: '',
  region: ''
})

const seeFile: any = ref(null)
const upload: any = ref(null)
const auditFile: any = ref(null)
const tableData = ref([
  {
    id: 44,
    tid: 12,
    title: '生产安全事故应急条例',
    url: 'http://119.91.156.5/download/b390071e-f679-4e00-a8a1-75ade57e79fe生产安全事故应急条例.docx',
    level: 1,
    status: null,
    create_date: '2022-11-22 07:51:46',
    create_name: 'admin',
    update_date: null,
    update_name: null
  }
])

const props = defineProps({
  tid: Number
})
watch(() => props.tid, (val) => {
  console.log(val, 'props');
  fileInfoFun()

})
watch(
  () => style.value,
  value => {
    console.log(value)

    fileInfoFun()
  }
)
onMounted(() => {
  fileInfoFun()
})
//下载模板
const downloadFileFun = (url: string) => {
  window.open(url)
}
//获取待审核文件列表
const getAuditFilesFun = () => {
  auditFile.value.show()
  console.log(123)
}

//删除资料文件
const delFileInfoFun = (row: any) => {
  ElMessageBox.confirm(
    `<span style='color:red'> ${row.title} < /span>文件?`,
    '审核文件',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
      dangerouslyUseHTMLString: true
    }
  ).then(() => {
    delStandFileInfo(row.id).then(res => {
      if (res.data.code == 200) {
        ElMessage({
          showClose: true,
          message: '删除成功',
          type: 'success'
        })
        fileInfoFun()
      } else {
        ElMessage({
          showClose: true,
          message: res.data.msg,
          type: 'error'
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
const changeList = (pageSize, currentPage) => {
  console.log(pageSize, currentPage, '收到啦分液器')

  pageSize4.value = pageSize
  currentPage4.value = currentPage
  fileInfoFun()
}
const uploadFun = () => {
  upload.value.show()
}
const onSubmit = () => {
  console.log('submit!')
}
//获取列表
const fileInfoFun = () => {
  getStandInfo(
    sessionStorage.getItem('tid'),
    currentPage4.value,
    pageSize4.value,
    style.value,
    sessionStorage.getItem('evaluation'),
    input2.value
  )
    .then((res: any) => {
      // console.log(res, 99)
      tableData.value = res.data.data
      total.value = res.data.dataCount
    })
    .catch(err => {
      console.log(err, 555)
    })
}
</script>

<style scoped lang="less">
// .demo-pagination-block {
//   position: absolute;
//   bottom: 10px;
//   right: 50px;
// }
#account {
  height: 680px;
}
</style>
