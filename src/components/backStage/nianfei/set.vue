<template>
  <div class="top">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="年费名称:">
        <el-input v-model="formInline.user" placeholder="请输入" />
      </el-form-item>
      <!-- <el-form-item orm-item label="所属分类:">
        <el-select v-model="formInline.region" placeholder="请选择">
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="(item, index) in industryList"
            :key="index"
          />
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="getPriceListFun('select')">查询</el-button>
        <el-button type="primary" @click="(dialogVisible = true), (key = 'add')">新增</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="gridData" height="550px">
      <el-table-column type="index" width="50" />
      <el-table-column prop="name" label="套餐名称" />
      <!-- <el-table-column prop="name" label="所属分类" /> -->
      <el-table-column prop="price" label="套餐金额" />
      <el-table-column prop="years" label="套餐年限" />
      <el-table-column prop="years" label="套餐类型">
        <template #default="scope">
          {{ scope.row.type == 1 ? "平台年费" : "五新商店年费" }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="create_name" label="审核类型">
        <template #default="scope">
          {{ scope.row.remark == 1 ? '上传' : scope.row.remark == 2 ? '编辑' : '删除' }}
        </template>
      </el-table-column> -->

      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <el-button size="small" type="primary" @click="editPriceFun(scope.row, 'edit')">详情</el-button>
          <el-button size="small" type="danger" @click="delPriceFun(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total" @changeList="changeList" />
    <SeeFlie ref="seeFile"></SeeFlie>

    <el-drawer v-model="drawer" size="80%" :title="drawerTitle">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <!-- <el-tab-pane label="Role" name="third">Role</el-tab-pane>
        <el-tab-pane label="Task" name="fourth">Task</el-tab-pane> -->
      </el-tabs>
    </el-drawer>
    <SeeFlie ref="seeFile"></SeeFlie>
  </div>
  <el-dialog v-model="dialogVisible" title="年费设置" width="30%" center>
    <el-form :model="formInline" class="demo-form-inline" ref="formRef">
      <el-form-item label="套餐名称:" prop="name" :rules="[{ required: true, message: '请输入套餐名称' }]">
        <el-input v-model="formInline.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="套餐类型" prop="resource" :rules="[
          { required: true, message: '请选择套餐类型', trigger: 'change' },
        ]">
        <el-radio-group v-model="formInline.resource">
          <el-radio label="2" value="2">五新商店</el-radio>
          <el-radio label="1" value="1">平台年费</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="套餐金额:" prop="money" :rules="[{ required: true, message: '请输入套餐名称' }]">
        <el-input v-model="formInline.money" placeholder="请输入">
          <template #append> 元 </template>
        </el-input>
      </el-form-item>
      <el-form-item label="套餐时间:" :rules="[{ required: true, message: '请输入套餐名称' }]" prop="time">
        <el-input v-model="formInline.time" placeholder="请输入">
          <template #append> 年 </template>
        </el-input>
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
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import Pagination from "../../pagination/index.vue";
import SeeFlie from "../../seeFlie/index.vue";
import { addPrice, getPriceList, editPrice, delPrice } from "@/api/index";
import { tableV2RowProps, TabsPaneContext } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";

const formRef = ref<FormInstance>();
const formInline = reactive({
  user: "",
  name: "",
  resource: "",
  money: "",
  time: "",
  id: "",
});
const dialogVisible = ref(false);
const currentPage3 = ref(1);
const key = ref("");
const pageSize3 = ref(10);
const gridData = ref([]);

const total = ref(0);

onMounted(() => {
  getPriceListFun();
});
const getPriceListFun = () => {
  getPriceList(formInline.user, currentPage3.value, pageSize3.value).then(
    (res) => {
      gridData.value = res.data.data;
      total.value = res.data.dataCount;
    }
  );
};
const editPriceFun = (row, data) => {
  dialogVisible.value = true;
  formInline.id = row.id;
  formInline.resource = String(row.type);
  formInline.money = row.price;
  formInline.time = row.years;
  formInline.name = row.name;

  key.value = data;
  // console.log(formInline.value);

  // editPrice(row.id).then((res) => {});
};
const delPriceFun = (row) => {
  ElMessageBox.confirm(
    `是否确定删除<span style='color:red'>${row.name}</span>年费设置?`,
    "删除年费设置",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      dangerouslyUseHTMLString: true,
    }
  ).then(() => {
    delPrice(row.id).then((res) => {
      if (res.data.code == 200) {
        ElMessage({
          type: "success",
          message: "删除成功",
          showClose: true,
        });
        getPriceListFun();
      } else {
        ElMessage({
          type: "error",
          message: res.data.msg,
          showClose: true,
        });
      }
    });
  });
};

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (key.value == "add") {
        addPrice(
          formInline.name,
          formInline.money,
          formInline.time,
          formInline.resource
        ).then((res) => {
          if (res.data.code == 200) {
            ElMessage({
              message: "添加成功",
              type: "success",
              showClose: true,
            });
            getPriceListFun();
            dialogVisible.value = false;
          } else {
            ElMessage({
              message: res.data.msg,
              type: "error",
              showClose: true,
            });
          }
        });
      } else {
        editPrice(
          formInline.id,
          formInline.name,
          formInline.money,
          formInline.time,
          formInline.resource
        ).then((res) => {
          if (res.data.code == 200) {
            ElMessage({
              message: "编辑成功",
              type: "success",
              showClose: true,
            });
            getPriceListFun();
            dialogVisible.value = false;
          } else {
            ElMessage({
              message: res.data.msg,
              type: "error",
              showClose: true,
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

//分页器组件传回来的数据
const changeList = (pageSize, currentPage, type) => {
  console.log(pageSize, currentPage, "收到啦分液器", type);

  pageSize3.value = pageSize;
  currentPage3.value = currentPage;
  // getAuditFilesFun()
  getPriceListFun()
};
</script>

<style lang="less" scoped>
.top {
  width: 1560px;
  height: 75px;
  background: #ffffff;
  box-shadow: 0px 0px 13px 0px #ebebeb;
  border-radius: 4px;
  margin: 10px 0;
  line-height: 90px;
  padding-left: 20px;
  box-sizing: border-box;
}

.table {
  margin-top: 10px;
  padding: 20px;
  width: 1560px;
  height: 640px;
  background: #ffffff;
  box-shadow: 0px 0px 13px 0px #ebebeb;
  border-radius: 4px;
  box-sizing: border-box;
  position: relative;
}

/deep/.el-drawer.rtl {
  height: 88%;
  top: 100px;
  bottom: 0;
  /* right: 28px; */
  left: 350px;
  /* right: 0; */
  // text-align: center;
  margin-bottom: 0;

  // font-size: 30px;
  // position: fixed;
  .el-drawer__title {
    font-size: 25px;
    color: #000;
  }

  .info {
    padding: 30px;
  }

  .el-form-item {
    width: 46%;
  }
}
</style>