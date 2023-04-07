<template>
  <el-row :gutter="20">
    <el-col :span="5">
      <div class="box">
        <p>类目表</p>
        <el-tree :data="databasesList" :props="defaultProps" @node-click="handleNodeClick" highlight-current />
      </div>
    </el-col>
    <el-col :span="19">

      <div v-if="treeChangName == '隐患库'">
        <div class="hidden">
          <el-form :inline="true" :model="formInline" class="demo-ruleForm" label-position="left">

            <el-row>
              <el-col :span="8"> <el-form-item label="检查项&#12288;">
                  <el-input v-model="formInline.user" placeholder="请输入" />
                </el-form-item></el-col>
              <el-col :span="8"> <el-form-item label="检查项行业">
                  <el-select v-model="formInline.trade" placeholder="请选择" clearable>
                    <el-option :label="item.name" :value="item.id" v-for="item, index in HYList" :key="index" />

                  </el-select>
                </el-form-item></el-col>
              <el-col :span="8"> <el-form-item label="检查项领域">
                  <el-select v-model="formInline.region" placeholder="请选择" clearable>
                    <el-option :label="item.domainName" :value="item.domain" v-for="item, index in DomainList"
                      :key="index" />

                  </el-select>
                </el-form-item></el-col>
            </el-row>
            <el-row>
              <el-col :span="8"> <el-form-item label="场所环节">
                  <el-input v-model="formInline.place" placeholder="请输入" />
                </el-form-item></el-col>
              <el-col :span="8"> <el-form-item label="隐患等级&#12288;">
                  <el-select v-model="formInline.level" placeholder="请选择" clearable>
                    <el-option :label="item.hdLevelName" :value="item.hdLevel" v-for="item, index in HdLevel"
                      :key="index" />

                  </el-select>
                </el-form-item></el-col>
              <el-col :span="8"> <el-form-item>
                  <el-button type="primary" @click="hiddenListFun">查询</el-button>
                  <el-button type="primary" @click="dialogVisible = true">新增</el-button>
                </el-form-item></el-col>
            </el-row>






          </el-form>

        </div>
        <div class="table">
          <el-table :data="gridData" style="width: 100%;margin-bottom: 30px;" stripe height="540px" v-loading="loading"
            element-loading-text="正在加载中...">
            <el-table-column type="index" width="50" />
            <el-table-column prop="standard" label="检查项">
              <template #default="scope">
                <el-tooltip class="box-item" effect="dark" :content="scope.row.standard" placement="top-start">
                  <span class="textp">{{ scope.row.standard }}</span>
                </el-tooltip>

              </template>
            </el-table-column>
            <el-table-column prop="chkstdIndustryName" label="检查项行业" />
            <el-table-column prop="domainName" label="检查项领域" />
            <el-table-column prop="hdTypeName" label="隐患类别" />
            <el-table-column prop="hdLevelName" label="隐患等级" />
            <el-table-column prop="create_name" label="必须检查">

              <template #default="scope">
                <!-- <el-button size="small" type="primary">查看</el-button> -->
                {{ scope.row.mustCheck == 1 ? '是' : '否' }}

              </template>
            </el-table-column>

            <el-table-column prop="address" label="操作" width="180">
              <template #default="scope">
                <el-button type="primary" @click="seeInfo(scope.row)">查看</el-button>
                <el-button type="danger" @click="delBankFun(scope.row)">删除</el-button>


              </template>
            </el-table-column>
          </el-table>
        </div>

      </div>
      <div v-else>
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
          <el-table :data="gridData" height="570px" style="width: 100%;margin-bottom: 30px;" v-loading="loading"
            element-loading-text="正在加载中...">
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

        </div>
      </div>

    </el-col>
    <el-dialog v-model="seeVisible" width="60%">
      <el-descriptions title="详情信息" :column="2" border class-name="colName">

        <el-descriptions-item label="检查项" label-align="right" align="center" class-name="colName">{{ seeInfoRow.standard
        }}</el-descriptions-item>
        <el-descriptions-item label="检查项行业" label-align="right" align="center" class-name="colName">{{
          seeInfoRow.chkstdIndustryName
        }}</el-descriptions-item>
        <el-descriptions-item label="检查项领域" label-align="right" align="center">{{ seeInfoRow.domainName
        }}</el-descriptions-item>
        <el-descriptions-item label="隐患类别" label-align="right" align="center">{{ seeInfoRow.hdTypeName
        }}</el-descriptions-item>
        <el-descriptions-item label="隐患等级" label-align="right" align="center">{{ seeInfoRow.hdLevelName
        }}</el-descriptions-item>
        <el-descriptions-item label="必须检查" label-align="right" align="center">{{ seeInfoRow.mustCheck == 1 ? '是' : '否'
        }}</el-descriptions-item>
        <el-descriptions-item label="场所环节" label-align="right" align="center">{{ seeInfoRow.placeLink
        }}</el-descriptions-item>
        <el-descriptions-item label="法律规定" label-align="right" align="center">{{ seeInfoRow.according
        }}</el-descriptions-item>
        <el-descriptions-item label="法律责任" label-align="right" align="center">{{ seeInfoRow.liability
        }}</el-descriptions-item>

      </el-descriptions>

    </el-dialog>

    <el-dialog v-model="dialogVisible" title="新增" width="60%" center>
      <el-form :inline="true" ref="formRef" :model="numberValidateForm" class="demo-ruleForm">

        <el-row>
          <el-col :span="12">
            <el-form-item label="检查项&#12288;&#12288;" prop="standard" :rules="[
              { required: true, message: '请输入检查项' },

            ]">
              <el-input v-model="numberValidateForm.standard" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否检查" prop="mustCheck" :rules="[
              { required: true, message: '请选择是否必须检查', trigger: 'change', },]">
              <el-select v-model="numberValidateForm.mustCheck" placeholder="请选择" clearable>
                <el-option label="否" value="0" />
                <el-option label="是" value="1" />
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>


        <el-row>
          <el-col :span="12">
            <el-form-item label="行业&#12288;&#12288;&#12288;" prop="industry" :rules="[
              { required: true, message: '请选择行业', trigger: 'change', },

            ]">
              <el-select v-model="numberValidateForm.industry" placeholder="请选择" clearable>
                <el-option :label="item.name" :value="item.id" v-for="item, index in HYList" :key="index" />

              </el-select>

            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="检查领域" prop="domain" :rules="[
              { required: true, message: '请选择检查领域', trigger: 'change', },]">
              <el-select v-model="numberValidateForm.domain" placeholder="请选择" clearable>
                <el-option :label="item.domainName" :value="item.domain" v-for="item, index in DomainList" :key="index" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="场所环节&#12288;" prop="placeLink" :rules="[
              { required: true, message: '请输入场所环节' },

            ]">
              <el-input v-model="numberValidateForm.placeLink" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="隐患类别" prop="hdType" :rules="[
              { required: true, message: '请输入隐患类别' },

            ]">
              <el-select v-model="numberValidateForm.hdType" placeholder="请选择" clearable>
                <el-option :label="item.hdTypeName" :value="item.hdType" v-for="item, index in HiddenType" :key="index" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>
          <el-col :span="12">
            <el-form-item label="搜索关键词" prop="keyWord" :rules="[
              { required: true, message: '请输入搜索关键词' },

            ]">
              <el-input v-model="numberValidateForm.keyWord" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="隐患等级" prop="hdLevel" :rules="[
              { required: true, message: '请选择隐患等级', trigger: 'change', },]">
              <el-select v-model="numberValidateForm.hdLevel" placeholder="请选择" clearable>
                <el-option :label="item.hdLevelName" :value="item.hdLevel" v-for="item, index in HdLevel" :key="index" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="整改天数&#12288;" prop="days" :rules="[
              { required: true, message: '请输入整改天数' },

            ]">
              <el-input v-model="numberValidateForm.days" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="隐患描述" prop="hdDesc" :rules="[
              { required: true, message: '请输入隐患描述' },

            ]">
              <el-input v-model="numberValidateForm.hdDesc" type="text" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">

            <el-form-item label="法律规定&#12288;&#12288;" prop="according">
              <el-input v-model="numberValidateForm.according" type="text" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="法律责任&nbsp;&nbsp;" prop="liability">
              <el-input v-model="numberValidateForm.liability" type="text" />
            </el-form-item>
          </el-col>
        </el-row>








      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm(formRef)">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <Pagination :total="total" @changeList="changeList" />
    <SeeFlie ref="seeFile"></SeeFlie>
    <Upload ref="upload" :status="status" @uploadSuccess="uploadSuccess" :labelName="labelName" :tid="formInline.tid" />
  </el-row>
</template>
        
<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from "vue";
import Pagination from "../../pagination/index.vue";
import SeeFlie from "../../seeFlie/index.vue";
import Upload from "../../upload/index.vue";
import type { FormInstance } from 'element-plus'
import {
  getList, getDataBaseInfo, delFileInfoManage, hiddenList,
  getDomainList,
  getHdLevel,
  getHY,
  addHiddenBank,
  getHiddenType,
  delHiddenBank
} from "@/api/index";

import { ElMessage, ElMessageBox, ElLoading } from "element-plus";
const formInline = reactive({
  user: "",
  region: "",
  tid: "",
  level: '',
  trade: '',
  place: ""
});


const formRef = ref<FormInstance>()

const numberValidateForm = reactive({
  standard: '',
  industry: '',
  domain: '',
  mustCheck: '',
  placeLink: '',
  hdType: '',
  hdLevel: '',
  keyWord: '',
  days: '',
  hdDesc: '',
  according: '',
  liability: '',
})
const currentPage3 = ref(1);
const pageSize3 = ref(10);
const gridData = ref([]);
const industryList = ref([]);
const databasesList = ref([]);
const HiddenType = ref([]);
const total = ref(0);
const upload = ref(null);
const seeFile = ref(null);
const loading = ref(false);
const dialogVisible = ref(false)
const seeVisible = ref(false)
const treeChangName = ref();
const status = "databases";
const labelName: any = ref([]);
const seeInfoRow: any = ref([]);
const defaultProps = {
  children: "children",
  label: "name",
};

onMounted(() => {
  getListFun();
  // getDataBaseInfoFun("")
  // ElLoading.service({
  //   text: 'ssss'
  // })
});
const DomainList = ref([])
const HdLevel = ref([])
const HYList = ref([])
watch(() => treeChangName.value, (val: any) => {

})
const hiddenListFun = () => {
  hiddenList(
    formInline.user,
    formInline.trade,
    formInline.region,
    formInline.level,
    formInline.place,
    currentPage3.value,
    pageSize3.value
  ).then(res => {
    gridData.value = res.data.data
    total.value = res.data.dataCount
  })
}

const getDataBaseInfoFun = (select) => {
  loading.value = true;
  getDataBaseInfo(
    formInline.user,
    formInline.tid,
    currentPage3.value,
    pageSize3.value
  ).then((res) => {
    if (!(res.data.code == 200 && res.data.dataCount > 0)) {
      if (select != "") {
        ElMessage({
          message: "暂无查询数据",
          type: "error",
          showClose: true,
        });
      }
    }
    // res.data.data.forEach((item) => {
    //   item.id = "d" + item.id;
    // });
    loading.value = false;
    gridData.value = res.data.data;
    total.value = res.data.dataCount;
  });
};

const delBankFun = (row) => {
  ElMessageBox.confirm(
    `是否删除 <span style='color:red'>${row.standard}</span>  检查项?`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      dangerouslyUseHTMLString: true
    }
  )
    .then(() => {
      delHiddenBank(row.chkstdId).then(res => {
        if (res.data.code == 200) {
          ElMessage({
            type: 'success',
            message: '删除成功',
            showClose: true
          })
          hiddenListFun()
        }
      })

    })

}
const seeInfo = (row) => {
  seeVisible.value = true
  seeInfoRow.value = row
}
const handleNodeClick = (data: Tree) => {
  // labelName.value = ref()
  sessionStorage.setItem("tid", data.id);

  console.log(data.name, 'name');
  treeChangName.value = data.name

  formInline.tid = data.id;
  labelName.value = {
    name: data.name,
    tid: data.id,
    parent_id: data.parent_id,
  };
  if (data.name == '隐患库') {
    getDomainList().then(res => {
      DomainList.value = res.data.data
    })
    getHdLevel().then(res => {
      HdLevel.value = res.data.data
    })
    getHY().then(res => {
      HYList.value = res.data.data
    })
    getHiddenType().then(res => {
      HiddenType.value = res.data.data
    })
    hiddenListFun()
  } else {
    getDataBaseInfoFun("");
  }

};
const getListFun = () => {
  getList(1).then((res) => {
    databasesList.value = res.data.data[0].children;
    databasesList.value.splice(2, 0, databasesList.value[9], databasesList.value[10])
    // menu.value.splice(4, 0, menu.value[11])
    // console.log(menu.value, 'sss');
    databasesList.value.pop()
    databasesList.value.pop()
    digui(databasesList.value);
  });
};
const handleChange = (value) => {
  // console.log(value, 'ii');

  formInline.tid = value[value.length - 1];
};
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      addHiddenBank(
        numberValidateForm.standard,
        numberValidateForm.industry,
        numberValidateForm.domain,
        numberValidateForm.mustCheck,
        numberValidateForm.placeLink,
        numberValidateForm.hdType,
        numberValidateForm.hdLevel,
        numberValidateForm.keyWord,
        numberValidateForm.days,
        numberValidateForm.hdDesc,
        numberValidateForm.according,
        numberValidateForm.liability,
      ).then(res => {
        if (res.data.code == 200) {
          ElMessage({
            message: '添加成功',
            type: 'success',
            showClose: true
          })
          hiddenListFun()
        }
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}

//删除资料文件
const delFileInfoFun = (row: any) => {
  ElMessageBox.confirm(
    `是否确定删除<span style='color:red'>${row.title}</span>文件?`,
    "审核文件",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      dangerouslyUseHTMLString: true,
    }
  ).then(() => {
    delFileInfoManage(row.id).then((res) => {
      if (res.data.code == 200) {
        ElMessage({
          showClose: true,
          message: "删除成功",
          type: "success",
        });
        getDataBaseInfoFun("");
      } else {
        ElMessage({
          showClose: true,
          message: res.data.msg,
          type: "error",
        });
      }
    });
  });
};
//文件上传成功回调
const uploadSuccess = (data) => {
  // console.log(data, '成功');
  getDataBaseInfoFun("");
};
const digui = (item: any) => {
  item.forEach((element, index) => {
    element.label = element.name;
    element.value = element.id;
    digui(element.children);
  });
};

const uploadFun = () => {
  upload.value.show();
};
//查看文件
const see = (row: any) => {
  // row.id = "d" + row.id;
  seeFile.value.show(row, "law");
  console.log("测试");
};
//分页器组件传回来的数据
const changeList = (pageSize, currentPage, type) => {
  console.log(pageSize, currentPage, "收到啦分液器", type);

  pageSize3.value = pageSize;
  currentPage3.value = currentPage;
  treeChangName.value == '隐患库' ? hiddenListFun() : getDataBaseInfoFun("");


};
</script>

<style lang="less" scoped>
.top {
  width: 100%;
  height: 75px;
  background: #ffffff;
  box-shadow: 0px 0px 13px 0px #ebebeb;
  border-radius: 4px;
  margin: 10px 0;
  line-height: 90px;
  padding-left: 20px;
  box-sizing: border-box;

}

.hidden {
  width: 100%;
  // height: 75px;
  background: #ffffff;
  box-shadow: 0px 0px 13px 0px #ebebeb;
  border-radius: 4px;
  margin: 10px 0;
  padding-top: 10px;
  padding-left: 20px;
  box-sizing: border-box;
}

.box {
  margin-top: 10px;
  width: 100%;
  height: 725px;
  box-shadow: 0px 0px 13px 0px #ebebeb;
  padding: 10px;
  box-sizing: border-box;
  background: #fff;
  overflow: auto;

  p {
    background: #dcefff;
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
    background-color: rgba(135,
        206,
        235,
        0.2); // 透明度为0.2的skyblue，作者比较喜欢的颜色
    color: #0165d0ff; // 节点的字体颜色
    font-weight: bold; // 字体加粗
  }
}

.table {
  margin-top: 10px;
  padding: 20px;
  // width: 1560px;
  // height: 640px;
  background: #ffffff;
  box-shadow: 0px 0px 13px 0px #ebebeb;
  border-radius: 4px;
  box-sizing: border-box;
  position: relative;

  .textp {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis
  }
}



/deep/.colName {
  width: 40%
}

.demo-ruleForm {
  /deep/.el-form-item {
    width: 98%;

    .el-select {
      width: 100%;
    }
  }
}
</style>