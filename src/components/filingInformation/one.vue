<template>
  <div class="info">
    <!-- --------------------- -->
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="市场监督管理注册信息" name="first">
        <el-form :inline="true" class="demo-form-inline" ref="ruleFormRef" :model="ruleForm" label-width="auto">
          <el-form-item label="企业名称" prop="name">
            <el-input v-model="ruleForm.company" placeholder="企业名称" disabled>
            </el-input>
          </el-form-item>
          <el-form-item label="法定代表人">
            <el-input v-model="ruleForm.legal_person" placeholder="自动生成" disabled />
          </el-form-item>
          <el-form-item label="注册资本">
            <el-input v-model="ruleForm.register_capital" placeholder="自动生成" disabled>
              <template #append> 万元 </template>
            </el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="ruleForm.style" placeholder="自动生成" disabled />
          </el-form-item>
          <el-form-item label="成立日期">
            <el-input v-model="ruleForm.register_date" placeholder="自动生成" disabled />
          </el-form-item>
          <el-form-item label="营业期限">
            <el-input v-model="ruleForm.expire_date" placeholder="自动生成" disabled />
          </el-form-item>
          <el-form-item label="社会信用代码">
            <el-input v-model="ruleForm.code" placeholder="自动生成" disabled />
          </el-form-item>
          <el-form-item label="注册地址">
            <el-input v-model="ruleForm.address" placeholder="自动生成" disabled />
          </el-form-item>

          <el-form-item label="经营范围">
            <el-input v-model="ruleForm.scope" placeholder="自动生成" disabled type="textarea" autosize />
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <!-- 其他信息 -->
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="其他信息" name="first">
        <div style="margin-bottom: 10px;" v-if="props.status == undefined">
          <el-button type="primary" @click="qitaInfo = false" v-if="qitaInfo">我要修改</el-button>
          <el-button type="primary" @click="editFun" v-if="!qitaInfo">确定</el-button>
          <el-button type="primary" @click="qitaInfo = true" v-if="!qitaInfo">取消</el-button>
        </div>

        <el-form :inline="true" class="demo-form-inline" ref="ruleFormRef" :model="ruleForm" label-width="auto">
          <el-form-item label="上年产值" prop="name">
            <el-input v-model="ruleForm.last_value" placeholder="上年产值" :disabled="qitaInfo" @input="inputChange">
              <template #append> 万元 </template>
            </el-input>
          </el-form-item>
          <el-form-item label="员工人数">
            <el-input v-model="ruleForm.number" placeholder="请输入" :disabled="qitaInfo">
              <template #append> 人 </template>
            </el-input>
          </el-form-item>

          <el-form-item label="占地面积">
            <el-input v-model="ruleForm.floor_space" placeholder="请输入" :disabled="qitaInfo">
              <template #append> 平方 </template>
            </el-input>
          </el-form-item>
          <el-form-item label="经营面积">
            <el-input v-model="ruleForm.operation_space" placeholder="请输入" :disabled="qitaInfo">
              <template #append> 平方 </template>
            </el-input>
          </el-form-item>
          <el-form-item label="行业类别" prop="hangye" v-if="!qitaInfo">
            <el-cascader :props="{ value: 'id', label: 'name' }" :options="hyTreeList" v-model="ruleForm.hangye"
              @change="industryChang" placeholder="请选择" @focus="indeustryFocus" />
          </el-form-item>
          <el-form-item label="所属行业" prop="industry">
            <!-- <el-cascader :props="props" v-model="ruleForm.industry" /> -->
            <el-input v-model="ruleForm.industry" placeholder="请输入" disabled />
          </el-form-item>

          <el-form-item label="安全投入">
            <el-input v-model="ruleForm.safe_input" placeholder="请输入" disabled>
              <template #append> 万元 </template>
            </el-input>
          </el-form-item>
          <el-form-item label="评定标准">
            <el-input v-model="ruleForm.evaluation_standard" placeholder="请输入" disabled />
          </el-form-item>
          <el-form-item label="企业规模">
            <el-input v-model="ruleForm.up_down" placeholder="请输入" disabled />
          </el-form-item>
          <el-form-item label="主要产品">
            <el-input v-model="ruleForm.products" placeholder="请输入" :disabled="qitaInfo" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <!-- 相关人员联系方式 -->
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="相关人员联系方式" name="first">
        <el-form :inline="true" class="demo-form-inline" ref="ruleFormRef" :model="ruleForm" label-width="auto">
          <el-form-item label="主要负责人" prop="name">
            <template v-for="(i, j) in ruleForm.people" :key="j">
              <el-input v-model="ruleForm.people[j]" placeholder="请输入" style="margin-bottom: 10px" disabled>
              </el-input>
            </template>
          </el-form-item>
          <el-form-item label="安全生产管理人员" prop="name">
            <template v-for="(i, j) in ruleForm.anquan" :key="j">
              <el-input v-model="ruleForm.anquan[j]" placeholder="请输入" style="margin-bottom: 10px" disabled>
              </el-input>
            </template>
          </el-form-item>
          <el-form-item label="消防生产管理人员" prop="name">
            <template v-for="(i, j) in ruleForm.xiaofang" :key="j">
              <el-input v-model="ruleForm.xiaofang[j]" placeholder="请输入" disabled style="margin-bottom: 10px">
              </el-input>
            </template>
          </el-form-item>
          <el-form-item label="电工" prop="name">
            <template v-for="(i, j) in ruleForm.diangong" :key="j">
              <el-input v-model="ruleForm.diangong[j]" placeholder="请输入" disabled style="margin-bottom: 10px">
              </el-input>
            </template>
          </el-form-item>
          <el-form-item label="设备管理人员" prop="name">
            <template v-for="(i, j) in ruleForm.shebei" :key="j">
              <el-input v-model="ruleForm.shebei[j]" placeholder="请输入" disabled style="margin-bottom: 10px">
              </el-input>
            </template>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <!-- <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="相关人员联系方式" name="first">
        <el-form :inline="true" class="demo-form-inline" :model="ruleForm" :rules="rules" label-width="160px"
          label-position="right">
          <el-form-item label="主要负责人" prop="people">
            <template v-for="(i, j) in ruleForm.people" :key="j">
              <el-input v-model="ruleForm.people[j].name" placeholder="请输入" @focus="inputFocus(1, j, i.id)"
                style="margin-bottom: 10px">
                <template #append>
                  <el-link type="primary" @click="add(ruleForm.people)">
                    新增
                  </el-link>
                  <span v-if="i.id != undefined || j >= 1"> /</span>
                  <el-link type="danger" v-if="i.id != undefined || i.id != undefined || j >= 1"
                    @click="delList(ruleForm.people, j, i.id)">
                    删除
                  </el-link>
                </template>
              </el-input>
            </template>
          </el-form-item>
          <el-form-item label="安全生产管理人员" prop="name">
            <template v-for="(i, j) in ruleForm.anquan" :key="j">
              <el-input v-model="ruleForm.anquan[j].name" placeholder="请输入" @focus="inputFocus(2, j, i.id)"
                style="margin-bottom: 10px">
                <template #append>
                  <el-link type="primary" @click="add(ruleForm.anquan)">
                    新增
                  </el-link>
                  <span v-if="i.id != undefined || j >= 1"> /</span>
                  <el-link type="danger" v-if="i.id != undefined || j >= 1" @click="delList(ruleForm.anquan, j, i.id)">
                    删除
                  </el-link>
                </template>
              </el-input>
            </template>
          </el-form-item>
          <el-form-item label="消防生产管理人员" prop="name">
            <template v-for="(i, j) in ruleForm.xiaofang" :key="j">
              <el-input v-model="ruleForm.xiaofang[j].name" placeholder="请输入" @focus="inputFocus(3, j, i.id)"
                style="margin-bottom: 10px">
                <template #append>
                  <el-link type="primary" @click="add(ruleForm.xiaofang)">
                    新增
                  </el-link>
                  <span v-if="i.id != undefined || j >= 1"> /</span>
                  <el-link type="danger" v-if="i.id != undefined || j >= 1" @click="delList(ruleForm.xiaofang, j, i.id)">
                    删除
                  </el-link>
                </template>
              </el-input>
            </template>
          </el-form-item>
          <el-form-item label="电工" prop="name">
            <template v-for="(i, j) in ruleForm.diangong" :key="j">
              <el-input v-model="ruleForm.diangong[j].name" placeholder="请输入" @focus="inputFocus(4, j, i.id)"
                style="margin-bottom: 10px">
                <template #append>
                  <el-link type="primary" @click="add(ruleForm.diangong)">
                    新增
                  </el-link>
                  <span v-if="i.id != undefined || j >= 1"> /</span>
                  <el-link type="danger" v-if="i.id != undefined || j >= 1" @click="delList(ruleForm.diangong, j, i.id)">
                    删除
                  </el-link>
                </template>
              </el-input>
            </template>
          </el-form-item>
          <el-form-item label="设备管理人员" prop="name">
            <template v-for="(i, j) in ruleForm.shebei" :key="j">
              <el-input v-model="ruleForm.shebei[j].name" placeholder="请输入" @focus="inputFocus(5, j, i.id)"
                style="margin-bottom: 10px">
                <template #append>
                  <el-link type="primary" @click="add(ruleForm.shebei)">
                    新增
                  </el-link>
                  <span v-if="i.id != undefined || j >= 1"> /</span>
                  <el-link type="danger" v-if="i.id != undefined || j >= 1" @click="delList(ruleForm.shebei, j, i.id)">
                    删除
                  </el-link>
                </template>
              </el-input>
            </template>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs> -->

    <!-- 本单位涉及的场所(可多选) -->
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="本单位涉及的场所" name="first">
        <div style="margin-bottom: 10px;" v-if="props.status == undefined">
          <el-button type="primary" @click="threeInfo = false" v-if="threeInfo">我要修改</el-button>
          <el-button type="primary" @click="editThreeFun" v-if="!threeInfo">确定</el-button>
          <el-button type="primary" @click="threeInfo = true" v-if="!threeInfo">取消</el-button>
        </div>
        <el-form class="demo-form-inline" ref="ruleFormRef" :model="ruleForm" label-width="auto">
          <el-form-item :label="item.name" prop="resource" v-for="(item, index) in treeList" :key="index">
            <el-checkbox-group :disabled="threeInfo" v-model="ruleForm.resource" v-for="(item2, index2) in item.children"
              :key="index2">
              <el-checkbox :label="item2.id" @change="sdr($event, item2.id, item2.name)">{{ item2.name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="(自行建立专用设备设施)" prop="resource" label-width="auto">
            <!-- {{ ruleForm.zijian }} -->
            <el-input disabled v-for="(item, index) in ruleForm.zijian" v-model="ruleForm.zijian[index]" :key="index"
              style="margin-bottom: 5px;"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <!-- --------------------- -->
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, defineProps, watch } from "vue";
import {
  formTree,
  getCompanyInfoByIds,
  getCompanyInfoById,
  governmentGetCompanyInfoById,
  hyTree,
  setCompHy,
  editCompanyOther,
  editFormTreeByComp
} from "@/api/index";

import { ElMessage } from "element-plus";
import { ru } from "element-plus/es/locale";
const activeName = ref("first");
const treeList = ref([]);
const hyTreeList = ref([]);
const companyOther = ref([]);
const formbank = ref([]);
const qitaInfo = ref(true);
const threeInfo = ref(true);
const ruleForm = reactive({
  legal_person: "",
  resource: [],
  people: [],
  anquan: [],
  xiaofang: [],
  diangong: [],
  shebei: [],
  company: "",
  register_capital: "",
  style: "",
  expire_date: "",
  register_date: "",
  code: "",
  address: "",
  scope: "",
  last_value: "",
  number: "",
  floor_space: "",
  operation_space: "",
  industry: "",
  evaluation_standard: "",
  up_down: "",
  products: "",
  safe_input: "",
  industryId: '',
  zijian: []
});
onMounted(() => {
  props.status == "government"
    ? governmentGetCompanyInfoByIdFun()
    : props.status == 'mange' ? getCompanyInfoByIdFun() : getCompanyInfoByIdsFun();
  // getCompanyInfoByIdsFun();
  // console.log(props.seeRowId, "status");

  // console.log();
  console.log('进到这里了', props.status)

});


watch(
  () => props.seeRowId,
  (val) => {
    console.log(val, 'val更新');

    props.status == "government"
      ? governmentGetCompanyInfoByIdFun()
      : props.status == 'mange' ? getCompanyInfoByIdFun() : getCompanyInfoByIdsFun();
  }
);
const props = defineProps({
  status: String,
  seeRowId: String,
});
const editThreeFun = (e, item) => {
  // console.log(e, item);
  editFormTreeByComp(JSON.stringify(formbank.value)).then(res => {
    if (res.data.code == 200) {
      ElMessage({
        showClose: true,
        message: '修改成功',
        type: 'success'
      })
      threeInfo.value = true
      getCompanyInfoByIdsFun()
    }
  })
}

// const digui = (list) => {

// }

const sdr = (e, id, name) => {
  // console.log(e, id, name);


  // digui(treeList.value)



  if (e) {
    formbank.value.push(
      {
        "companyId": sessionStorage.getItem('companyId'),
        "tid": id,
        "name": name,
        "count": 0
      }
    )

    // console.log(formbank);

  } else {

    formbank.value.map((item, index) => {
      // console.log(item, 'item');

      if (item.tid == id) {
        // uniqueTids.push(item.tid);

        formbank.value.splice(index, 1)

      }

    });
    // console.log(uniqueTids);
    console.log(formbank.value, 'formbank');

  }






}
const editFun = () => {

  var pattern = new RegExp("[\u4E00-\u9FA5]+");
  // console.log();
  let name = pattern.test(ruleForm.evaluation_standard)

  editCompanyOther(
    ruleForm.last_value,
    ruleForm.number,
    ruleForm.floor_space,
    ruleForm.operation_space,
    ruleForm.industryId,
    ruleForm.safe_input,
    name ? sessionStorage.getItem('evaluation') : ruleForm.evaluation_standard,
    ruleForm.products,
    ruleForm.up_down == "规上企业" ? 1 : 0
  ).then(res => {
    if (res.data.code == 200) {
      ElMessage({
        showClose: true,
        message: '修改成功',
        type: 'success'
      })
      qitaInfo.value = true
      getCompanyInfoByIdsFun()
    }
  })
}
const industryChang = (value) => {
  console.log(value);


  setCompHy(value[value.length - 1], sessionStorage.getItem('companyId'), ruleForm.last_value).then(
    (res) => {
      if (res.data.code == 200) {
        ruleForm.industry = res.data.data.industry;
        ruleForm.industryId = res.data.data.industryId;
        ruleForm.evaluation_standard = res.data.data.evaluation_standard;
        ruleForm.safe_input = res.data.data.safe_input;
      }
    }
  );
};
const inputChange = (e) => {
  // console.log(e, 'ssssseeee');
  if (e * 1 >= 2000) {
    ruleForm.up_down = '规上企业'
  } else {
    ruleForm.up_down = '规下企业'
  }

}
const indeustryFocus = () => {
  // if (ruleForm.chanzhi == '') {
  //   return ElMessage({
  //     showClose: this,
  //     message: '请先输入年产值',
  //     type: 'error'
  //   })
  // } else {

  // }
  hyTree().then((res) => {
    hyTreeList.value = res.data.data[0].children;
  });
}

//后台
const getCompanyInfoByIdFun = () => {
  formTree().then((res) => {
    treeList.value = res.data.data[0].children;
  });

  getCompanyInfoById(props.seeRowId).then((res) => {




    for (let key in res.data.data.companyOther) {
      for (let label in ruleForm) {
        if (label == key) {
          ruleForm[label] = res.data.data.companyOther[key];
        }
      }
    }
    ruleForm.up_down == '1' ? (ruleForm.up_down = '规上企业') : (ruleForm.up_down = '规下企业')
    ruleForm.resource = res.data.data.treeList;

    ruleForm.people = [];
    ruleForm.anquan = [];
    ruleForm.xiaofang = [];
    ruleForm.diangong = [];
    ruleForm.shebei = [];
    res.data.data.owenList.forEach(element => {
      ruleForm.zijian.push(element.name)
    })


    res.data.data.personList.forEach((element) => {
      switch (element.type) {
        case 1:
          ruleForm.people.push(`${element.name}${element.phone}`);
          break;
        case 2:
          ruleForm.anquan.push(`${element.name}${element.phone}`);
          break;
        case 3:
          ruleForm.xiaofang.push(`${element.name}${element.phone}`);
          break;
        case 4:
          ruleForm.diangong.push(`${element.name}${element.phone}`);
          break;
        case 5:
          ruleForm.shebei.push(`${element.name}${element.phone}`);
          break;
      }
    });
  });
};

//企业
const getCompanyInfoByIdsFun = () => {
  formTree().then((res) => {
    treeList.value = res.data.data[0].children;
  });

  getCompanyInfoByIds().then((res) => {
    companyOther.value = res.data.data.treeList
    for (let key in res.data.data.companyOther) {
      for (let label in ruleForm) {
        if (label == key) {
          ruleForm[label] = res.data.data.companyOther[key];
        }
      }
    }

    console.log(companyOther.value, 'companyOther.value');

    treeList.value.forEach(item => {
      // console.log(item.children);
      item.children.forEach(asd => {
        companyOther.value.forEach(arr => {
          // console.log(arr, 'arr');


          if (asd.id == arr) {
            formbank.value.push(
              {
                "companyId": sessionStorage.getItem('companyId'),
                "tid": asd.id,
                "name": asd.name,
                "count": 0
              }
            )
          }


        })
      })


    })
    console.log(formbank.value, 'companyOther.value');
    ruleForm.up_down == '1' ? (ruleForm.up_down = '规上企业') : (ruleForm.up_down = '规下企业')
    ruleForm.resource = res.data.data.treeList;

    ruleForm.people = [];
    ruleForm.anquan = [];
    ruleForm.xiaofang = [];
    ruleForm.diangong = [];
    ruleForm.shebei = [];
    res.data.data.owenList.forEach(element => {
      ruleForm.zijian.push(element.name)
    })
    res.data.data.personList.forEach((element) => {
      switch (element.type) {
        case 1:
          ruleForm.people.push(`${element.name}${element.phone}`);
          break;
        case 2:
          ruleForm.anquan.push(`${element.name}${element.phone}`);
          break;
        case 3:
          ruleForm.xiaofang.push(`${element.name}${element.phone}`);
          break;
        case 4:
          ruleForm.diangong.push(`${element.name}${element.phone}`);
          break;
        case 5:
          ruleForm.shebei.push(`${element.name}${element.phone}`);
          break;
      }
    });
  });
};

// 政府
const governmentGetCompanyInfoByIdFun = () => {

  console.log('进来这里');

  formTree().then((res) => {
    treeList.value = res.data.data[0].children;
  });

  governmentGetCompanyInfoById(props.seeRowId).then((res) => {
    companyOther.value = res.data.data.companyOther
    for (let key in res.data.data.companyOther) {
      for (let label in ruleForm) {
        if (label == key) {
          ruleForm[label] = res.data.data.companyOther[key];
        }
      }
    }



    ruleForm.resource = res.data.data.treeList;
    ruleForm.up_down == '1' ? (ruleForm.up_down = '规上企业') : (ruleForm.up_down = '规下企业')
    console.log(ruleForm.up_down, 'updown');

    ruleForm.people = [];
    ruleForm.anquan = [];
    ruleForm.xiaofang = [];
    ruleForm.diangong = [];
    ruleForm.shebei = [];

    res.data.data.owenList.forEach(element => {
      ruleForm.zijian.push(element.name)
    })



    res.data.data.personList.forEach((element) => {
      switch (element.type) {
        case 1:
          ruleForm.people.push(`${element.name}${element.phone}`);
          break;
        case 2:
          ruleForm.anquan.push(`${element.name}${element.phone}`);
          break;
        case 3:
          ruleForm.xiaofang.push(`${element.name}${element.phone}`);
          break;
        case 4:
          ruleForm.diangong.push(`${element.name}${element.phone}`);
          break;
        case 5:
          ruleForm.shebei.push(`${element.name}${element.phone}`);
          break;
      }
    });
  });
};
</script>
<style lang='less' scoped>
.demo-tabs {
  margin-top: 10px;

  padding: 10px;
  box-sizing: border-box;
  // height: 500px;
  background: #ffffff;
  box-shadow: 0px 0px 13px 0px #ebebeb;
  border-radius: 4px;

  .el-form-item {
    width: 46%;

    /deep/.el-cascader {
      width: 100%;
    }
  }
}

/deep/.el-checkbox-group {
  width: 100%;
}
</style>