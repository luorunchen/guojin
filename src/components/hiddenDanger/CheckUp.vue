<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input v-model="input2" placeholder="关键词">
          <template #append>
            <el-button type="primary" @click="fileInfoFun">搜索</el-button>
          </template>
        </el-input>
      </el-col>
      <!-- <el-col :span="9">
      <el-button type="primary" @click="addFormFun">新增</el-button>

    </el-col> -->

    </el-row>
    <br />
    <el-table :data="tableData" stripe style="width: 100%;margin-bottom:50px" height="400px">
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
      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <el-button type="primary" @click="see(scope.row)">查看</el-button>
          <!-- <el-button type="danger" @click="deltable(scope.row)">删除</el-button> -->

        </template>
      </el-table-column>

    </el-table>
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
      <!-- <el-button type="primary" class="add" @click="dialogVisible = true">新增</el-button> -->
      <!-- <br /> -->

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
        <el-table-column prop="address" label="操作">
          <template #default="scope">
            <el-button type="primary" @click="seeInfo(scope.row)">查看</el-button>
            <!-- <el-button type="danger" @click="delHidden(scope.row)">删除</el-button> -->

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
    <Pagination :total="total" :type="1" @changeList="changeList" />
  </div>
</template>

<script lang="ts" setup>
import Pagination from "../pagination/index.vue";
import { onMounted, ref } from 'vue'
import { getHiddenCheckList, loadHdInfoList, getRiskInfo, getHiddenZg } from '@/api/index.js'
import moment from 'moment'
const total = ref(0)
const pageSize4 = ref(10)
const currentPage4 = ref(1)
const tableData = ref([])
const loadHdInfoListArray = ref([])

const seeVisible = ref(false)
const seeInfoVisible = ref(false)
const seeRow: any = ref({})
const seeInfoRow: any = ref({})
const HiddenZg: any = ref({})

onMounted(() => {
  getHiddenCheckListFun()
})

const getHiddenCheckListFun = () => {
  getHiddenCheckList(
    // input2.value,
    sessionStorage.getItem("companyId"),
    currentPage4.value,
    pageSize4.value,
    1, "", "", ""

  )
    .then((res: any) => {
      // console.log(res, 99)
      tableData.value = res.data.data;
      total.value = res.data.dataCount;
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
//分页器组件传回来的数据
const changeList = (pageSize, currentPage) => {
  console.log(pageSize, currentPage, "收到啦分液器");

  pageSize4.value = pageSize;
  currentPage4.value = currentPage;
  // hiddenListFun()
  getHiddenCheckListFun()
};
</script>

<style scoped lang="less">
.textp {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis
}

.hiddenImg {
  width: 200px;
  height: 200px;
}
</style> 