<template>
  <div>
    <el-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="id" border height="700px">

      <el-table-column prop="name" label="名称" />
      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <div>
            <el-button type="primary" @click="editTree(scope.row)">编辑</el-button>
            <el-button type="danger" @click="deleteTree(scope.row)">删除</el-button>
            <el-button v-if="scope.row.parent_id == 1" type="primary" @click="addKind(scope.row)">添加</el-button>
          </div>
          <!-- <div >
            
          </div> -->

        </template>
      </el-table-column>
    </el-table>


  </div>
</template>
<script lang="ts" setup>
import { formTree, addFormTree, editFormTree, delFormTree } from '@/api/index.js'
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

interface User {
  id: number
  date: string
  name: string
  address: string
  hasChildren?: boolean
  children?: User[]
}
const tableData: any = ref([])
onMounted(() => {
  formTreeFun()
});

const formTreeFun = () => {
  formTree().then(res => {
    console.log(res);
    tableData.value = res.data.data[0].children
  })
}
const editTree = (row) => {
  console.log(row);
  ElMessageBox.prompt('请输入名称', `编辑${row.name}`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',


  })
    .then(({ value }) => {
      editFormTree(value, row.id, 4).then(res => {
        if (res.data.code == 200) {
          ElMessage({
            type: 'success',
            message: `修改成功`,
            showClose: true
          })
          formTreeFun()
        }
      })

    })

}
const addKind = (row) => {
  console.log(row);
  ElMessageBox.prompt('请输入名称', `添加到${row.name}`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',


  })
    .then(({ value }) => {
      addFormTree(value, row.id, 4).then(res => {
        if (res.data.code == 200) {
          ElMessage({
            type: 'success',
            message: `添加成功`,
            showClose: true
          })
          formTreeFun()
        }
      })

    })

}
const deleteTree = (row) => {
  console.log(row);
  ElMessageBox.confirm(`确定删除<span style='color:red'>${row.name}<span/>吗?`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',

    dangerouslyUseHTMLString: true
  })
    .then(() => {
      delFormTree(row.id, 4).then(res => {
        if (res.data.code == 200) {
          ElMessage({
            type: 'success',
            message: `删除成功`,
            showClose: true
          })
          formTreeFun()
        }
      })

    })

}


</script>
<style scoped lang="less">
/deep/.el-table__row--level-0 {
  // background: #e8f3fc;

  // .el-table__cell {
  //   &:nth-child(2) {
  //     display: none;
  //   }

  // }
}

.levelTwo {
  margin-left: 30px;
}
</style>