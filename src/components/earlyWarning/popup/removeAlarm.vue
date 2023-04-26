<template>
  <el-dialog v-model="removeVisible" title="解除报警" width="50%" center>
    <div class="alarm">
      <h3>报警处理(请填写后提交处理)</h3>
      <el-form ref="formRef" :model="numberValidateForm" label-width="auto" class="demo-ruleForm">
        <el-form-item label="备注" prop="age" :rules="[{ required: true, message: '请填写备注信息' }]">
          <el-input v-model.number="numberValidateForm.age" autocomplete="off" :autosize="{ minRows: 4, maxRows: 4 }"
            type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineExpose, reactive } from 'vue'
import { delAlarm } from '@/api/index.js'
import { ElMessage } from 'element-plus'
const removeVisible = ref(false)
const alarmIndex = ref()
const emit = defineEmits(['getAlarmStatus'])
const numberValidateForm = reactive({
  age: ""
})
const aFid = ref()
const show = (afid, index) => {
  removeVisible.value = true
  aFid.value = afid
  alarmIndex.value = index
  console.log(afid, index);

}
const submitForm = () => {
  delAlarm(aFid.value, numberValidateForm.age).then(res => {
    if (res.data.code == 200) {
      ElMessage({
        showClose: true,
        message: '解除成功',
        type: 'success'
      })
      removeVisible.value = false

      emit('getAlarmStatus', alarmIndex.value)
    }
  })
}
defineExpose({
  show
})
</script>

<style lang="less" scoped>
.alarm {
  background: #EBFAF2;
  padding-right: 100px;
}

h3 {
  clear: both;
  border-bottom: 1px solid #eff1f4;
  border-left: 4px solid #0165d0;
  padding-left: 20px;
  margin-bottom: 10px;
  margin-top: 30px;
  color: #000;

  &:nth-child(1) {
    margin-top: 0;
  }
}
</style>