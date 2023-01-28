<template>
  <el-row :gutter="20">
    <el-col :span="5">
      <div class="box">
        <p>类目表</p>
        <el-tree :data="databasesList" :props="defaultProps" @node-click="handleNodeClick" highlight-current />
      </div>
    </el-col>
    <el-col :span="19">
      <div class="top">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="文件名称:">
            <el-input v-model="formInline.user" placeholder="请输入" />
          </el-form-item>
          <!-- <el-form-item label="版块:">

            <el-cascader v-model="formInline.tid" :options="databasesList" clearable @change="handleChange"
              :props="{ value: 'id', label: 'name' }" />
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="getDataBaseInfoFun('select')">查询</el-button>
            <el-button type="primary" @click="uploadFun">上传</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table">
        <el-table :data="gridData" height="570px" v-loading="loading" element-loading-text="正在加载中...">
          <el-table-column type="index" width="50" />
          <el-table-column prop="title" label="标题" />
          <el-table-column prop="create_date" label="上传时间" />
          <el-table-column prop="create_name" label="上传人员" />
          <el-table-column prop="name" label="版块" />
          <el-table-column prop="address" label="操作">
            <template #default="scope">
              <el-button size="small" type="primary" @click="see(scope.row)">查看</el-button>
              <el-button size="small" type="danger" @click="delFileInfoFun(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <Pagination :total="total" @changeList="changeList" />
        <SeeFlie ref="seeFile"></SeeFlie>
        <Upload ref="upload" :status='status' @uploadSuccess="uploadSuccess" :labelName='labelName' />
      </div>
    </el-col>
  </el-row>



</template>
        
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import Pagination from "../../pagination/index.vue"
import SeeFlie from "../../seeFlie/index.vue"
import Upload from '../../upload/index.vue'
import { getList, getDataBaseInfo, delFileInfoManage } from '@/api/index'

import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'
const formInline = reactive({
  user: '',
  region: "",
  tid: ""
})

const currentPage3 = ref(1)
const pageSize3 = ref(10)
const gridData = ref([])
const industryList = ref([])
const databasesList = ref([])
const total = ref(0)
const upload = ref(null)
const seeFile = ref(null)
const loading = ref(false)
const status = 'databases'
const labelName: any = ref([])
const defaultProps = {
  children: 'children',
  label: 'name',
}

onMounted(() => {
  getListFun()
  // getDataBaseInfoFun("")
  // ElLoading.service({
  //   text: 'ssss'
  // })


})
const getDataBaseInfoFun = (select) => {
  loading.value = true
  getDataBaseInfo(formInline.user, formInline.tid, currentPage3.value, pageSize3.value).then(res => {
    if (!(res.data.code == 200 && res.data.dataCount > 0)) {
      if (select != "") {
        ElMessage({
          message: '暂无查询数据',
          type: 'error',
          showClose: true
        })
      }

    }
    res.data.data.forEach((item) => {
      item.id = "d" + item.id;
    });
    loading.value = false
    gridData.value = res.data.data
    total.value = res.data.dataCount
  })
}
const handleNodeClick = (data: Tree) => {
  // labelName.value = ref()
  sessionStorage.setItem('tid', data.id)
  formInline.tid = data.id
  labelName.value = { name: data.name, tid: data.id, parent_id: data.parent_id }
  // console.log({ name: data.name, tid: data.id });

  // digui([data])
  // console.log(formInline.tid)
  getDataBaseInfoFun("")
}
const getListFun = () => {
  getList(1).then(res => {
    databasesList.value = res.data.data[0].children
    digui(databasesList.value)
  })
}
const handleChange = (value) => {

  // console.log(value, 'ii');

  formInline.tid = value[value.length - 1]

}
//删除资料文件
const delFileInfoFun = (row: any) => {
  ElMessageBox.confirm(
    `是否确定删除<span style='color:red'>${row.title}</span>文件?`,
    '审核文件',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      dangerouslyUseHTMLString: true,
    }
  ).then(() => {
    delFileInfoManage(row.id).then((res) => {
      if (res.data.code == 200) {
        ElMessage({
          showClose: true,
          message: '删除成功',
          type: 'success',
        })
        getDataBaseInfoFun("")
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
//文件上传成功回调
const uploadSuccess = (data) => {
  // console.log(data, '成功');
  getDataBaseInfoFun("")
}
const digui = (item: any) => {
  item.forEach((element, index) => {
    element.label = element.name
    element.value = element.id
    digui(element.children)
  });

}

const uploadFun = () => {
  upload.value.show()
}
//查看文件
const see = (row: any) => {
  seeFile.value.show(row)
}
//分页器组件传回来的数据
const changeList = (pageSize, currentPage, type) => {
  console.log(pageSize, currentPage, '收到啦分液器', type)

  pageSize3.value = pageSize
  currentPage3.value = currentPage
  getDataBaseInfoFun("")
}
</script>

<style lang="less" scoped>
.top {
  width: 100%;
  height: 75px;
  background: #FFFFFF;
  box-shadow: 0px 0px 13px 0px #EBEBEB;
  border-radius: 4px;
  margin: 10px 0;
  line-height: 90px;
  padding-left: 20px;
  box-sizing: border-box;
}

.box {
  margin-top: 10px;
  width: 100%;
  height: 725px;
  box-shadow: 0px 0px 13px 0px #EBEBEB;
  padding: 10px;
  box-sizing: border-box;
  background: #fff;
  overflow: auto;

  p {
    background: #DCEFFF;
    padding: 10px;
    font-size: 16px;
    font-weight: 900;
  }

  /deep/.el-tree-node__label {
    font-size: 16px;
    // font-weight: 600;
    display: inline-block;
    margin: 2px 0;
    // color: #fff;
  }

  /deep/.el-tree {
    background: transparent;

    // .el-tree-node__content:hover {
    //   background: none;
    // }
  }

  /deep/.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    // 设置颜色
    background-color: rgba(135, 206, 235, 0.2); // 透明度为0.2的skyblue，作者比较喜欢的颜色 
    color: #0165D0FF; // 节点的字体颜色
    font-weight: bold; // 字体加粗
  }

}

.table {
  margin-top: 10px;
  padding: 20px;
  // width: 1560px;
  height: 640px;
  background: #FFFFFF;
  box-shadow: 0px 0px 13px 0px #EBEBEB;
  border-radius: 4px;
  box-sizing: border-box;
  position: relative;
}
</style>