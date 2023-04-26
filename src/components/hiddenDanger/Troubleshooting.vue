<template>
  <div id="account" ref="account">
    <el-row :gutter="20">
      <!-- <el-col :span="8">
        <el-input v-model="input2" placeholder="关键词">
          <template #append>
            <el-button type="primary" @click="fileInfoFun">搜索</el-button>
          </template>
        </el-input>
      </el-col> -->
      <el-col :span="9">
        <el-button type="primary" @click="addFormFun">新增</el-button>

      </el-col>

    </el-row>
    <br />
    <el-table :data="tableData" stripe style="width: 100%;margin-bottom:50px" height="45vh">
      <el-table-column type="index" width="50" />
      <el-table-column prop="checkDate" label="检查日期" />
      <el-table-column prop="checkName" label="检查人员" />
      <!-- <el-table-column prop="hdTotal" label="隐患总数" /> -->
      <el-table-column prop="bigCount" label="重大隐患" />
      <el-table-column prop="midCount" label="较大隐患" />
      <el-table-column prop="smallCount" label="一般隐患" />
      <el-table-column prop="smallCount" label="检查状态">
        检查完成
      </el-table-column>
      <!-- <el-table-column prop="smallCount" label="检查状态" /> -->
      <el-table-column prop="address" label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" @click="see(scope.row)">查看</el-button>
          <el-button type="danger" @click="deltable(scope.row)">删除</el-button>

        </template>
      </el-table-column>
    </el-table>

    <Pagination :total="total" :type="1" @changeList="changeList" />

    <el-dialog v-model="dialogFormVisible" title="安全检查" center :before-close="handleClose">
      <el-form ref="formRef" :model="numberValidateForm2" class="demo-ruleForm">
        <el-form-item label="检查日期" prop="checkDate" :rules="[
            { required: true, message: '请输入检查日期' },

          ]">
          <el-input disabled v-model="numberValidateForm2.checkDate" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="检查人员" prop="checkName" :rules="[
            { required: true, message: '请输入检查人员' },

          ]">
          <el-input disabled v-model="numberValidateForm2.checkName" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="检查类型" prop="checkType" :rules="[
            { required: true, message: '请选择检查周期', trigger: 'change', },

          ]">
          <el-cascader v-model="numberValidateForm2.checkType" :props="{ value: 'id', label: 'name' }"
            :options="checkList" @change="cascaderChange" />
          <!-- <el-select v-model="numberValidateForm2.checkType" class="m-2">
            <el-option v-for="item in checkList" :key="item.value" :label="item.name" :value="item.id" />
          </el-select> -->
        </el-form-item>
        <el-form-item label="检查场所&nbsp;&nbsp;" prop="checkPlace">
          <el-input v-model="numberValidateForm2.checkPlace" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="检查情况&nbsp;&nbsp;" prop="checkSituation">
          <el-input v-model="numberValidateForm2.checkSituation" type="text" autocomplete="off" />
        </el-form-item>


        <el-form-item label="企业选择&nbsp;&nbsp;" prop="checkSituation" v-if="loginType == '2' || loginType == '3'">
          <el-select v-model="numberValidateForm2.regionCompChange" class="m-2">
            <el-option v-for="item in getRegionCompList" :key="item.value" :label="item.company"
              :value="item.companyId" />
          </el-select>
        </el-form-item>

      </el-form>
      <el-button type="primary" class="add" @click="dialogVisible = true">新增</el-button>
      <el-table :data="addHiddenList" stripe style="width: 100%" height="89%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="standard" label="隐患描述">
          <template #default="scope">
            <el-tooltip class="box-item" effect="dark" :content="scope.row.standard" placement="top-start">
              <span class="textp">{{ scope.row.standard }}</span>
            </el-tooltip>

          </template>
        </el-table-column>
        <el-table-column prop="date" label="检查时间" />
        <el-table-column prop="hdLevel" label="隐患等级" />
        <el-table-column prop="hdType" label="隐患类别" />
        <el-table-column prop="date2" label="整改期限" />



      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <!-- <el-button @click="dialogFormVisible = false">取消</el-button> -->
          <el-button type="primary" @click="submitForm2(formRef), dialogFormVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogVisible" title="隐患登记" center width="70%">
      <el-button type="primary" class="add" @click="openHiddenLibrary">从隐患库中添加</el-button>
      <el-form ref="formRef" :model="numberValidateForm" class="demo-ruleForm">
        <el-form-item label="隐患描述&#12288;" prop="review" :rules="[
            { required: true, message: '请输入隐患描述' },

          ]">
          <el-input v-model="numberValidateForm.review" type="textarea" :rows="5" />
        </el-form-item>

        <el-row>
          <el-col :span="12"> <el-form-item label="关联风险点" prop="risk" :rules="[
              { required: true, message: '请输入关联风险点' },

            ]">
              <el-input v-model="numberValidateForm.risk" multiple filterable allow-create default-first-option
                :reserve-keyword="false" placeholder="请选择" @focus="riskFun">

              </el-input>

            </el-form-item></el-col>
          <el-col :span="12"> <el-form-item label="隐患地点" prop="place" :rules="[
              { required: true, message: '请输入隐患地点' },

            ]">
              <el-input v-model="numberValidateForm.place" type="text" autocomplete="off" />
            </el-form-item></el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="隐患等级&#12288;" prop="level" :rules="[
                { required: true, message: '请输入隐患等级' },

              ]">
              <el-input v-model="numberValidateForm.level" disabled type="text" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="隐患类别	" prop="type" :rules="[
                { required: true, message: '请输入隐患类别' },

              ]">
              <el-input v-model="numberValidateForm.type" disabled type="text" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="排查日期&#12288;" prop="date" :rules="[
                { required: true, message: '请输入排查日期' },

              ]">
              <el-input v-model="numberValidateForm.date" disabled type="text" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排查人&#12288;" prop="people" :rules="[
                { required: true, message: '请输入排查人' },

              ]">
              <el-input v-model="numberValidateForm.people" disabled type="text" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="整改类型&#12288;" prop="type2" :rules="[
                { required: true, message: '请输入整改类型' },

              ]">
              <el-input v-model="numberValidateForm.type2" disabled type="text" autocomplete="off" />

            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="整改期限" prop="date2" :rules="[
                { required: true, message: '请输入整改期限	' },

              ]">
              <el-input v-model="numberValidateForm.date2" disabled type="text" autocomplete="off" />

            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="法律规定&#12288;&emsp;" prop="according">
              <el-input v-model="numberValidateForm.according" disabled type="text" autocomplete="off" />

            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="法律责任&emsp;" prop="liability">
              <el-input v-model="numberValidateForm.liability" disabled type="text" autocomplete="off" />

            </el-form-item>
          </el-col>

        </el-row>
        <el-form-item label="隐患图片&#12288;" prop="file" :rules="[
            { required: true, message: '请上传隐患图片' },

          ]">
          <el-upload ref="uploadRef" :auto-upload="false" class="upload-demo"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :on-change="handleChange2"
            :on-remove="handleChange2" :limit="1" list-type="picture" :http-request="handleHttpRequest">
            <el-button type="primary">上传照片</el-button>
            <!-- <template #tip>
              <div class="el-upload__tip">
                jpg/png files with a size less than 500kb
              </div>
            </template> -->
          </el-upload>

          <!-- <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog> -->
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
    <el-dialog v-model="dialogLibraryVisible" title="选择隐患库" center width="60%">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-position="left">

        <el-row>
          <el-col :span="8"> <el-form-item label="检查项&#12288;">
              <el-input v-model="formInline.user" placeholder="请输入" />
            </el-form-item></el-col>
          <el-col :span="8"><el-form-item label="检查项行业">
              <el-select v-model="formInline.trade" placeholder="请选择" clearable>
                <el-option :label="item.name" :value="item.id" v-for="item, index in HYList" :key="index" />

              </el-select>
            </el-form-item></el-col>
          <el-col :span="8"><el-form-item label="检查项领域">
              <el-select v-model="formInline.region" placeholder="请选择" clearable>
                <el-option :label="item.domainName" :value="item.domain" v-for="item, index in DomainList" :key="index" />

              </el-select>
            </el-form-item></el-col>
        </el-row>

        <el-row>
          <el-col :span="8"><el-form-item label="场所环节">
              <el-input v-model="formInline.place" placeholder="请输入" />
            </el-form-item></el-col>
          <el-col :span="8"><el-form-item label="隐患等级&#12288;">
              <el-select v-model="formInline.level" placeholder="请选择" clearable>
                <el-option :label="item.hdLevelName" :value="item.hdLevel" v-for="item, index in HdLevel" :key="index" />

              </el-select>
            </el-form-item></el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>




      </el-form>

      <!-- <el-divider /> -->
      <el-table :data="hiddenListArray" stripe style="width: 100%;margin-bottom: 30px;" height="500px"
        @selection-change="handleSelectionChange" ref="taskTableRef">
        <el-table-column type="selection" />
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

        <el-table-column prop="address" label="操作">
          <template #default="scope">
            <el-button size="small" type="primary" @click="seeInfoFun(scope.row)">查看</el-button>
            <!-- <el-button size="small" type="primary" @click="selectFun(scope.row)">选择 </el-button> -->

          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="selectFun(hiddenSelection)" style="margin-bottom: 30px;">确定选择 </el-button>
      <br />
      <Pagination :total="total" :type="1" @changeList="changeList" />
      <!-- <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template> -->
    </el-dialog>

    <el-dialog v-model="dialogRiskVisible" title="风险点选择" center width="60%">
      <el-button type="primary" class="add" @click="trueAddRiskFun">确定选择</el-button>
      <el-button type="primary" class="add" @click="addRiskVisible = true">添加风险点</el-button>
      <el-table :data="riskList" stripe style="width: 100%;margin-bottom: 30px;" height="500px"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" />
        <el-table-column prop="risk_name" label="风险点名称" />
        <el-table-column prop="risk_place" label="场所/位置" />
        <el-table-column prop="risk_use" label="工艺/用途" />
        <el-table-column prop="risk_level" label="风险等级" />
        <el-table-column prop="risk_response" label="管控责任人" />
        <el-table-column prop="address" label="操作">
          <template #default="scope">
            <el-button type="danger" size="small" @click="delRiskFun(scope.row)">删除</el-button>

          </template>
        </el-table-column>
      </el-table>
      <!-- <Pagination :total=" total" :type="1" @changeList="changeList" /> -->
    </el-dialog>
    <el-dialog v-model="addRiskVisible" title="风险点添加" center width="30%">

      <el-form ref="formRef" :model="numberValidateForm1" class="demo-ruleForm" label-width="auto">
        <el-form-item label="风险点名称" prop="risk_name" :rules="[
            { required: true, message: '请输入风险点名称' },

          ]">
          <el-input v-model="numberValidateForm1.risk_name" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="场所/位置" prop="risk_place" :rules="[
            { required: true, message: '请输入场所/位置' },

          ]">
          <el-input v-model="numberValidateForm1.risk_place" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="工艺/用途" prop="risk_use" :rules="[
            {
              required: true, message: '请输入工艺/用途'
            },

          ]">
          <el-input v-model="numberValidateForm1.risk_use" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="风险等级" prop="risk_level" :rules="[
            {
              required: true, message: '请输入风险等级'
            },

          ]">
          <el-input v-model="numberValidateForm1.risk_level" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="管控责任人" prop="risk_response" :rules="[
            {
              required: true, message: '请输入管控责任人'
            },

          ]">
          <el-input v-model="numberValidateForm1.risk_response" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addRiskSubmit(formRef)">确定</el-button>

        </el-form-item>
      </el-form>

    </el-dialog>
    <!-- <AuditFile ref="auditFile" /> -->
    <el-dialog v-model="seeVisible" title="查看" center width="60%">
      <el-descriptions border>

        <el-descriptions-item label="检查时间" label-align="right">{{ seeRow.checkDate
        }}</el-descriptions-item>
        <el-descriptions-item label="检查人员" label-align="right">{{ seeRow.checkName
        }}</el-descriptions-item>
        <el-descriptions-item label="检查场所" label-align="right">
          {{ seeRow.checkPlace }}
        </el-descriptions-item>
        <el-descriptions-item label="检查情况" label-align="right">{{ seeRow.checkSituation
        }}</el-descriptions-item>
      </el-descriptions>
      <br />
      <el-button type="primary" class="add" @click="dialogVisible = true">新增</el-button>
      <br />

      <el-table :data="loadHdInfoListArray" stripe style="width: 100%;margin-bottom:50px" height="400px">
        <el-table-column type="index" width="50" />
        <el-table-column prop="standard" label="隐患描述">
          <template #default="scope">
            <el-tooltip class="box-item" effect="dark" :content="scope.row.standard" placement="top-start">
              <span class="textp">{{ scope.row.standard }}</span>
            </el-tooltip>

          </template>
        </el-table-column>
        <!-- <el-table-column prop="checkName" label="检查时间" /> -->
        <el-table-column prop="hdLevelName" label="隐患等级" />
        <el-table-column prop="hdTypeName" label="隐患类别" />
        <el-table-column prop="time" label="整改期限" />

        <!-- <el-table-column prop="smallCount" label="检查状态" /> -->
        <el-table-column prop="address" label="操作" width="200">
          <template #default="scope">
            <el-button type="primary" @click="seeInfo(scope.row)">查看</el-button>
            <el-button type="danger" @click="delHidden(scope.row)">删除</el-button>

          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog v-model="seeInfoVisible" title="查看" center width="60%">
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
        <el-descriptions-item label="排查时间" label-align="right">
          {{ seeRow.checkDate }}
        </el-descriptions-item>
        <el-descriptions-item label="排查人" label-align="right">
          {{ seeRow.checkName }}
        </el-descriptions-item>
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


    <el-dialog v-model="seeInfosVisible" width="60%">
      <el-descriptions title="详情信息" :column="2" border class-name="colName">

        <el-descriptions-item label="检查项" label-align="right" align="center" class-name="colName">{{
          seeInfoFunRow.standard
        }}</el-descriptions-item>
        <el-descriptions-item label="检查项行业" label-align="right" align="center" class-name="colName">{{
          seeInfoFunRow.chkstdIndustryName
        }}</el-descriptions-item>
        <el-descriptions-item label="检查项领域" label-align="right" align="center">{{ seeInfoFunRow.domainName
        }}</el-descriptions-item>
        <el-descriptions-item label="隐患类别" label-align="right" align="center">{{ seeInfoFunRow.hdTypeName
        }}</el-descriptions-item>
        <el-descriptions-item label="隐患等级" label-align="right" align="center">{{ seeInfoFunRow.hdLevelName
        }}</el-descriptions-item>
        <el-descriptions-item label="必须检查" label-align="right" align="center">{{ seeInfoFunRow.mustCheck == 1 ? '是' : '否'
        }}</el-descriptions-item>
        <el-descriptions-item label="场所环节" label-align="right" align="center">{{ seeInfoFunRow.placeLink
        }}</el-descriptions-item>
        <el-descriptions-item label="法律规定" label-align="right" align="center">{{ seeInfoFunRow.according
        }}</el-descriptions-item>
        <el-descriptions-item label="法律责任" label-align="right" align="center">{{ seeInfoFunRow.liability
        }}</el-descriptions-item>

      </el-descriptions>

    </el-dialog>

    <!-- <Upload ref="upload" :status="status" :labelName="labelName" :ftp="' 1'" /> -->
    <!-- <SeeFlie ref="seeFile" /> -->
  </div>
</template>

<script script lang = "ts" setup >
import {
  getDomainList,
  getInstUpInfoByComp,
  getHdLevel,
  getHYHome,
  hiddenList,
  getHiddenRisk,
  addHiddenRisk,
  addHiddenRegister,
  addHidden,
  getHiddenCheckList,
  delHiddenRisk,
  loadHdInfoList,
  getRiskInfo,
  delHiddenRegister,
  delHiddenInfo,
  getHiddenZg,
  getRegionComp,
  getList,
  viewCompanyList
} from "@/api/index";
import { onMounted, reactive, ref, defineProps, watch } from "vue";

import Pagination from "../pagination/index.vue";
// import { Picture } from '@element-plus/icons-vue'
import moment from 'moment'
import { ElMessage, ElMessageBox, UploadProps, UploadInstance } from "element-plus";
import type { FormInstance } from 'element-plus'


const currentPage4 = ref(1);
const pageSize4 = ref(10);
const loginType = ref(sessionStorage.getItem('loginType'))
const total = ref(0);
const input2 = ref();
const account = ref(null);
const DomainList = ref([])
const HdLevel = ref([])
const HYList = ref([])
const riskList = ref([])
const hiddenListArray = ref([])
const getRegionCompList = ref([])
const addHiddenList = ref([])
const loadHdInfoListArray = ref([])
const checkList = ref([])
const seeRow: any = ref({})
const seeInfoRow: any = ref({})
const HiddenZg: any = ref({})
const seeInfoFunRow: any = ref({})
const taskTableRef = ref();

const dialogFormVisible = ref(false);
const seeInfosVisible = ref(false);
const dialogVisible = ref(false);
const dialogLibraryVisible = ref(false);
const dialogRiskVisible = ref(false);
const addRiskVisible = ref(false);
const seeVisible = ref(false);
const seeInfoVisible = ref(false);


const formInline = reactive({
  user: "",
  region: "",
  level: '',
  trade: '',
  place: ""
});

const uploadRef = ref<UploadInstance>();

const numberValidateForm2 = reactive({
  checkName: "",
  checkPlace: "",
  checkSituation: "",
  checkDate: "",
  checkType: '',
  regionCompChange: ""
})
const numberValidateForm1 = reactive({
  risk_name: "",
  risk_place: "",
  risk_use: "",
  risk_level: "",
  risk_response: ""
})
const numberValidateForm: any = reactive({
  date: '',
  date2: '',
  review: "",
  risk: "",
  people: '',
  place: "",
  level: '',
  type: "",
  type2: "",
  file: "",
  according: "",
  liability: ""
})
// const seeFile: any = ref(null);
// const upload: any = ref(null);
let fd = [];
const tableData = ref([]);
const days = ref();
const multipleSelection = ref([]);
const hiddenSelection = ref([]);
const formRef = ref<FormInstance>()
const props = defineProps({
  tid: Number,
  boxHeight: Number,
});
// watch(
//   () => props.tid,
//   (val) => {
//     console.log(val, "props");
//     fileInfoFun();
//   }
// );
// watch(
//   () => props.boxHeight,
//   (val) => {
//     console.log(val, "123");
//     account.value.style.height = val + "px";
//     // console.log(law.value.clientHeight);
//     // fileInfoFun();
//   }
// );

onMounted(() => {
  fileInfoFun()
});


const cascaderChange = (value) => {
  console.log(value, 'value');
  numberValidateForm2.checkType = value[value.length - 1]
}

const addFormFun = () => {
  dialogFormVisible.value = true

  numberValidateForm2.checkDate = moment().format('YYYY/MM/DD HH:mm:ss')
  numberValidateForm2.checkName = sessionStorage.getItem('userName')
  viewCompanyList(1, 100).then((res) => {
    getRegionCompList.value = res.data.data;
  });
  getList(3).then(res => {
    checkList.value = res.data.data
  })
}
const handleClose = (done: () => void) => {
  done()
  // console.log('关闭');
  fileInfoFun()
}
const delRiskFun = (row) => {
  ElMessageBox.confirm(
    `是否删除 <span style='color:red'>${row.risk_name}</span>  风险点?`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      dangerouslyUseHTMLString: true
    }
  )
    .then(() => {
      delHiddenRisk(row.risk_id).then(res => {
        if (res.data.code == 200) {
          ElMessage({
            type: 'success',
            message: '删除成功',
            showClose: true
          })
          getHiddenRiskFun()
        }
      })

    })


}
const seeInfoFun = (row) => {
  seeInfosVisible.value = true
  seeInfoFunRow.value = row
}
const delHidden = (row) => {
  ElMessageBox.confirm(
    `是否删除 <span style='color:red'>${row.standard}</span>  隐患?`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      dangerouslyUseHTMLString: true
    }
  )
    .then(() => {
      delHiddenRegister(seeRow.value.hdId, row.rid).then(res => {
        if (res.data.code == 200) {
          ElMessage({
            type: 'success',
            message: '删除成功',
            showClose: true
          })
          loadHdInfoListFun()
        }
      })

    })
}
const deltable = (row) => {
  ElMessageBox.confirm(
    `是否确定删除?`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      dangerouslyUseHTMLString: true
    }
  )
    .then(() => {

      delHiddenInfo(row.hdId).then(res => {
        if (res.data.code == 200) {
          ElMessage({
            type: 'success',
            message: '删除成功',
            showClose: true
          })
          fileInfoFun()
        }
      })

    })
}
const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles, 'delete')
}
const handleChange2: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
  numberValidateForm["file"] = uploadFiles;

  console.log(uploadFile, "lsed", uploadFiles);
  // file2uploadFiles.value = uploadFiles;

  formRef.value.validateField("file");

  fd["file"] = uploadFile.raw;
};
const handleHttpRequest = () => {
  console.log(321);
  let arr = []
  multipleSelection.value.forEach((item => {
    arr.push(item.risk_id)
  }))
  let formData = new FormData();
  // riskId, standard, hdPlace, hdLevel, hdType, type, days, file
  formData.append("file", fd["file"]);
  formData.append("standard", numberValidateForm.review);

  formData.append("riskId", arr.toString());
  formData.append("hdPlace", numberValidateForm.place);
  formData.append("hdLevel", numberValidateForm.hdLevel);
  formData.append("hdType", numberValidateForm.hdType);
  formData.append("type", numberValidateForm.type2 == '限期整改' ? '2' : '1');
  formData.append("days", numberValidateForm.days);
  formData.append("company", sessionStorage.getItem('companyId'));
  formData.append("create_date", moment().format('YYYY/MM/DD HH:mm:ss'));

  // console.log(formData.get("standard"), '123123');
  if (seeVisible.value == true) {
    formData.append("hdId", seeRow.value.hdId);

  }

  addHiddenRegister(formData).then(res => {
    if (res.data.code == 200) {
      ElMessage({
        message: '新增成功',
        type: 'success',
        showClose: true
      })
      dialogVisible.value = false

      if (seeVisible.value == true) {

        loadHdInfoListFun()
      } else {
        addHiddenList.value.push({
          rid: res.data.data,
          standard: numberValidateForm.review,
          date: numberValidateForm.date,
          date2: numberValidateForm.date2,
          hdLevel: numberValidateForm.level,
          hdType: numberValidateForm.type,
          type: numberValidateForm.type2,
          days: numberValidateForm.days,
        })
      }

    }
  })

};
const trueAddRiskFun = () => {
  dialogRiskVisible.value = false
  let arr = []
  multipleSelection.value.forEach((item => {
    arr.push(item.risk_name)
  }))
  numberValidateForm.risk = arr.toString()
}
const see = (row) => {
  seeVisible.value = true
  seeRow.value = row
  loadHdInfoListFun()
}
const loadHdInfoListFun = () => {
  loadHdInfoList(seeRow.value.hdId, 1, 1000).then(res => {
    loadHdInfoListArray.value = res.data.data
    res.data.data.forEach(element => {
      // console.log(moment(seeRow.value.checkDate).add(element.days * 1, 'days').format('YYYY-MM-DD'));
      element.time = moment(seeRow.value.checkDate).add(element.days * 1, 'days').format('YYYY-MM-DD')

    });
  })
}
const seeInfo = (row) => {
  seeInfoVisible.value = true
  seeInfoRow.value = row
  getRiskInfo(row.riskId).then(res => {
    seeInfoRow.value.riskLIst = res.data.data.toString()
  })
  getHiddenZg(row.rid).then(res => {
    if (res.data.data != null) {
      HiddenZg.value = res.data.data
    } else {
      HiddenZg.value = {}
    }

  })
}
const riskFun = () => {
  // console.log('ssss');
  dialogRiskVisible.value = true
  getHiddenRiskFun()
}
const getHiddenRiskFun = () => {
  getHiddenRisk(sessionStorage.getItem('companyId'), 1, 1000).then(res => {
    riskList.value = res.data.data
  })
}
const addRiskSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log(numberValidateForm1, 'q111')
      addHiddenRisk(
        numberValidateForm1.risk_name,
        numberValidateForm1.risk_place,
        numberValidateForm1.risk_use,
        numberValidateForm1.risk_level,
        numberValidateForm1.risk_response
      ).then(res => {
        if (res.data.code == 200) {
          ElMessage({
            showClose: true,
            message: '添加成功',
            type: 'success'
          })
          getHiddenRiskFun()
          addRiskVisible.value = false
        }
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      // console.log(numberValidateForm);
      uploadRef.value!.submit();
      // console.log('submit!')
    } else {
      // console.log('error submit!')
      return false
    }
  })
}
const submitForm2 = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log(numberValidateForm2);
      // numberValidateForm2.rid
      let rid = []
      addHiddenList.value.forEach((item => {
        rid.push(item.rid)
      }))
      addHidden(
        numberValidateForm2.checkName, numberValidateForm2.checkDate,
        numberValidateForm2.checkPlace, numberValidateForm2.checkSituation,
        rid.toString(),
        sessionStorage.getItem('companyId'), 1, numberValidateForm2.regionCompChange, numberValidateForm2.checkType,
      ).then(res => {
        if (res.data.code == 200) {
          ElMessage({
            showClose: true,
            message: '新增成功',
            type: 'success'
          })
          dialogFormVisible.value = false
          fileInfoFun()
        }
      })
      // console.log('submit!')
    } else {
      // console.log('error submit!')
      return false
    }
  })
}
const openHiddenLibrary = () => {
  dialogLibraryVisible.value = true
  getDomainList().then(res => {
    DomainList.value = res.data.data
  })
  getHdLevel().then(res => {
    HdLevel.value = res.data.data
  })
  getHYHome().then(res => {
    HYList.value = res.data.data
  })
  hiddenListFun();
}
const selectFun = (rows) => {
  console.log(rows[0], 'row');
  let row = rows[0]
  dialogLibraryVisible.value = false
  numberValidateForm.review = row.standard
  numberValidateForm.level = row.hdLevelName
  numberValidateForm.type = row.hdTypeName
  numberValidateForm.hdLevel = row.hdLevel
  numberValidateForm.hdType = row.hdType
  numberValidateForm.days = row.days
  numberValidateForm.according = row.according
  numberValidateForm.liability = row.liability
  numberValidateForm.type2 = row.days != '0' ? '限期整改' : '立即整改'
  // numberValidateForm.date2 = row.days != '0' ? '期限整改' : '立即整改'
  days.value = row.days
  var date = new Date();


  var seperator1 = "-";
  var year = date.getFullYear();
  var month: any = date.getMonth() + 1;
  var strDate: any = date.getDate();

  var day = date.getDate()
  console.log(day, 'day');

  if (month >= 1 && month <= 9) {
    month = "0" + month;

  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;

  }


  numberValidateForm.date = year + seperator1 + month + seperator1 + strDate

  // let ssss = new Date(numberValidateForm.date)
  // var t = new Date(ssss.setDate(ssss.getDate() + 8)).toLocaleString();



  numberValidateForm.date2 = moment().add(numberValidateForm.days * 1, 'days').format('YYYY-MM-DD')
  numberValidateForm.people = sessionStorage.getItem('userName')

}

const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
  hiddenSelection.value = val
  if (hiddenSelection.value.length > 1) {
    let del_row = val.shift();
    taskTableRef.value.toggleRowSelection(del_row, false); // 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
  }

  console.log(hiddenSelection.value, 'val');

}
//分页器组件传回来的数据
const changeList = (pageSize, currentPage) => {
  console.log(pageSize, currentPage, "收到啦分液器");

  pageSize4.value = pageSize;
  currentPage4.value = currentPage;
  hiddenListFun()
};
const hiddenListFun = () => {
  hiddenList(
    formInline.user,
    formInline.trade,
    formInline.region,
    formInline.level,
    formInline.place,
    currentPage4.value,
    pageSize4.value
  ).then(res => {
    hiddenListArray.value = res.data.data
    total.value = res.data.dataCount
  })
}
const onSubmit = () => {
  hiddenListFun();
};
//获取列表
const fileInfoFun = () => {
  getHiddenCheckList(
    // input2.value,
    sessionStorage.getItem("companyId"),
    currentPage4.value,
    pageSize4.value,
    0, "", "", ""
  )
    .then((res: any) => {
      // console.log(res, 99)
      tableData.value = res.data.data;
      total.value = res.data.dataCount;
    })

};
</script>

<style scoped lang="less">
// .demo-pagination-block {
//   position: absolute;
//   bottom: 10px;
//   right: 50px;
// }
// #account {
//   height: 500px;
// }

/deep/.el-radio-button__original-radio:checked+.el-radio-button__inner {
  background: #1f459c;
}

/deep/.el-table th .el-checkbox__inner {
  display: none;
}

.add {
  margin-bottom: 20px;
}

.hiddenImg {
  width: 200px;
  height: 200px;
}

/deep/.image-slot {
  width: 200px;
  height: 200px;
  text-align: center;
  line-height: 200px;
}

.textp {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis
}

/deep/.el-cascader {
  width: 100%;
}

.el-select {
  width: 100%;
}

// /deep/.is-active {
//   background: #bfa;
// }
</style>
