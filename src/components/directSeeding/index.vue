<template>
  <el-button type="primary" @click="iWant">
    我要开播
  </el-button>
  <div class="box">
    <el-row :gutter="10">
      <el-col :span="6" v-for="item, index in liveList" :key="index">
        <div class="room" @click="roomSkip(item)">
          <img src="https://res.yun.jxntv.cn/a/10001/202201/457c08082b22d0b03ca1c8e0fe715212.jpeg" alt="">
          <h4>标题:{{ item.title }}</h4>
          <h4>主播:{{ item.username }}</h4>

        </div>

      </el-col>

    </el-row>
    <h3 v-if="liveList.length == 0">暂无直播</h3>
    <Pagination :total="total" @changeList="changeList" />
    <el-dialog v-model="dialogVisible" title="我要开播" width="30%" center>
      <el-form ref="formRef" :model="numberValidateForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="直播间标题" prop="title" :rules="[
          { required: true, message: '请输入直播间标题' },

        ]">
          <el-input v-model="numberValidateForm.title" type="text" />
        </el-form-item>
        <el-form-item label="直播类型" prop="type" :rules="[
          {
            required: true,
            message: '请选择直播类型',
            trigger: 'change',
          },
        ]">
          <el-select v-model="numberValidateForm.type" placeholder="请选择">
            <el-option label="内部会议" value="1" />
            <el-option label="公开会议" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="直播摄像头" prop="productNumber" :rules="[
          {
            required: true,
            message: '请选择直播摄像头',
            trigger: 'change',
          },
        ]">
          <el-select v-model="numberValidateForm.productNumber" placeholder="请选择">
            <el-option :label="item.productNumber" :value="item.productNumber" v-for="item, index in vedioList"
              :key="index" />

          </el-select>
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
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { ElMessageBox } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { useStore } from "vuex";
import { getCompDeviceList, createLive, getLive } from '@/api/index.js'
import Pagination from "../pagination/index.vue";
const store = useStore();
const dialogVisible = ref(false)
const formRef = ref<FormInstance>()
const currentPage4 = ref(1);
const total = ref(0);
const pageSize4 = ref(10);

const numberValidateForm = reactive({
  title: '',
  type: '',
  productNumber: ""
})

// const props = defineProps({
//   vedioId: String
// })

const vedioList = ref([])
const liveList = ref([])



watch(() => store.state.vedioId, (val) => {
  console.log('视频更新', val);

  getLiveFun()
})


onMounted(() => {
  getLiveFun()
})
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      createLive(
        numberValidateForm.title,
        numberValidateForm.productNumber,
        numberValidateForm.type,
        sessionStorage.getItem('userId'),
        sessionStorage.getItem('companyId'),

      ).then(res => {
        if (res.data.code == 200) {

          let messagee = {
            roomId: res.data.data,
            productNumber: numberValidateForm.productNumber,
            userId: sessionStorage.getItem('userId'),
          }
          let arr = {
            title: numberValidateForm.title,
            status: '直播间',
            id: JSON.stringify(messagee),


          }
          store.commit("setMenus", arr);
          // }
          dialogVisible.value = false
          getLiveFun()
        }
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}
const roomSkip = (item) => {
  // console.log(item, 'item');

  let messagee = {
    roomId: item.id,
    productNumber: item.productNumber,
    userId: item.uid
  }
  let arr = {
    title: item.title,
    status: '直播间',
    id: JSON.stringify(messagee),
  }
  store.commit("setMenus", arr);
  // console.log(store.state.menus, 'menus');

}
const getLiveFun = () => {
  getLive(sessionStorage.getItem('companyId'), currentPage4.value, pageSize4.value).then(res => {
    liveList.value = res.data.data
  })
}
//分页器组件传回来的数据
const changeList = (pageSize, currentPage, type) => {
  console.log(pageSize, currentPage, "收到啦分液器", type);

  pageSize4.value = pageSize;
  currentPage4.value = currentPage;

  // props.titleChangeName == '隐患排查治理' ? hiddenListFun() : fileInfoFun();

};
const iWant = () => {
  dialogVisible.value = true
  getCompDeviceList(59, '', 1, 1000).then(res => {
    vedioList.value = res.data.data
  })
}
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 500px;
  // background: black;
  // padding: 10px 10px 30px;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 30px;
  box-sizing: border-box;
  // background: #ededed;
  overflow-y: auto;

  h3 {
    text-align: center;
    line-height: 400px;
  }

  // text-align:;
  .room {
    // height: 200px;
    background: #1f459c;
    margin-bottom: 10px;
    cursor: pointer;

    img {
      width: 100%;
      height: 150px;
    }

    h4 {
      color: #fff;
      margin-left: 10px;
      margin-bottom: 5px;
    }
  }

  /deep/.el-select {
    width: 100%;
  }
}
</style>