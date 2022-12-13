
import { service } from '../utils/request.js'
//获取资料列表
export function getList (parent_id) {
  return service({
    url: `/home/getList`,
    method: 'POST',
    params: {
      parent_id
    }
  })
}
//获取文件资料列表
export function fileInfo (tid, pageNum, pageSize, title) {
  return service({
    url: `/database/fileInfo`,
    method: 'GET',
    params: {
      tid, pageNum, pageSize, title
    }
  })
}
//获取待审核文件列表
export function getAuditFiles (pageNum, pageSize) {
  return service({
    url: `/database/getAuditFiles`,
    method: 'GET',
    params: {
      pageNum, pageSize
    }
  })
}
//登陆接口
export function login (username, password, type) {
  return service({
    url: `/acc/login`,
    method: 'POST',

    data: {
      username, password, type
    }
  })
}
//注销登陆
export function logout () {
  return service({
    url: `/acc/logout`,
    method: 'GET',

  })
}
//删除资料文件
export function delFileInfo (ids) {
  return service({
    url: `/database/delFileInfo`,
    method: 'GET',
    params: {
      ids
    }
  })
}
//删除台账文件
export function delStandFileInfo (ids) {
  return service({
    url: `/standBank/delStandFileInfo?`,
    method: 'GET',
    params: {
      ids
    }
  })
}
//审核文件
export function auditContent (status, ids, reason) {
  return service({
    url: `/database/auditContent`,
    method: 'GET',
    params: {
      status, ids, reason
    }
  })
}
//左侧列表
export function getStandList () {
  return service({
    url: `/home/getStandList`,
    method: 'GET',
    params: {

    }
  })
}
//获取台账文件
export function getStandInfo (tid, pageNum, pageSize, style, evaluation, title) {
  return service({
    url: `/standBank/getStandInfo`,
    method: 'GET',
    params: {
      tid, style, pageNum, pageSize, evaluation, title
    }
  })
}
//获取登记表数据
export function formTree () {
  return service({
    url: `/form/formTree`,
    method: 'GET',
    params: {

    }
  })
}
//获取登记表数据
export function getInsType () {
  return service({
    url: `/form/getInsType`,
    method: 'GET',
    params: {

    }
  })
}
//获取验证码
export function getCode (phone) {
  return service({
    url: `/acc/getCode`,
    method: 'GET',
    params: {
      phone
    }
  })
}
//获取验证码
export function getCompanyInfo (companyName) {
  return service({
    url: `/form/getCompanyInfo`,
    method: 'GET',
    params: {
      companyName
    }
  })
}
//获取验证码
export function hyTree () {
  return service({
    url: `/form/hyTree`,
    method: 'GET',
    params: {

    }
  })
}
export function setCompHy (tid, companyId, last_value) {
  return service({
    url: `/form/setCompHy`,
    method: 'GET',
    params: {
      tid, companyId, last_value
    }
  })
}
//企业表单提交
export function addFormContent (last_value, companyId, number, floor_space, operation_space, products, up_down, ids) {
  return service({
    url: `/form/addFormContent`,
    method: 'POST',
    data: {
      last_value, companyId, number, floor_space, operation_space, products, up_down, ids
    }
  })
}
//表单人员提交
export function addPerson (name, phone, type, companyId) {
  return service({
    url: `/form/addPerson`,
    method: 'GET',
    params: {
      name, phone, type, companyId
    }
  })
}

// -----------------------------------------后台管理

//获取待审核文件列表
export function getAuditFilesManage (pageNum, pageSize) {
  return service({
    url: `/manage/getAuditFiles`,
    method: 'GET',
    params: {
      pageNum, pageSize
    }
  })
}

//审核文件
export function auditContentManage (status, ids, reason) {
  return service({
    url: `/manage/auditContent`,
    method: 'GET',
    params: {
      status, ids, reason
    }
  })
}
//删除台账文件
export function delStandFileInfoManage (ids) {
  return service({
    url: `/manage/delStandFileInfo?`,
    method: 'GET',
    params: {
      ids
    }
  })
}
//企业列表
export function getCompanyList (company, id, pageNum, pageSize) {
  return service({
    url: `/manage/getCompanyList`,
    method: 'GET',
    params: {
      company, id, pageNum, pageSize
    }
  })
}
//机构列表
export function getInstitutionsList (institutions, id, pageNum, pageSize) {
  return service({
    url: `/manage/getInstitutionsList`,
    method: 'GET',
    params: {
      institutions, id, pageNum, pageSize
    }
  })
}
//行业列表
export function getHY () {
  return service({
    url: `/manage/getHY`,
    method: 'GET',
    params: {

    }
  })
}
//机构服务类型
export function getJG () {
  return service({
    url: `/manage/getJG`,
    method: 'GET',
    params: {

    }
  })
}
//用户列表
export function getUserInfo (username, state, pageNum, pageSize, type) {
  return service({
    url: `/manage/getUserInfo`,
    method: 'GET',
    params: {
      username, state, pageNum, pageSize, type
    }
  })
}
//用户禁用
export function banUser (id, state) {
  return service({
    url: `/manage/banUser`,
    method: 'GET',
    params: {
      id, state
    }
  })
}
//用户禁用
export function getCompanyStandInfo (companyId, title, status, tid, style, pageNum, pageSize) {
  return service({
    url: `/manage/getCompanyStandInfo`,
    method: 'GET',
    params: {
      companyId, title, status, tid, style, pageNum, pageSize
    }
  })
}
//企业详情
export function getCompanyInfoById (companyId) {
  return service({
    url: `/manage/getCompanyInfoById`,
    method: 'GET',
    params: {
      companyId
    }
  })
}
//平台资料库
export function getDataBaseInfo (title, tid, pageNum, pageSize) {
  return service({
    url: `/manage/getDataBaseInfo`,
    method: 'GET',
    params: {
      title, tid, pageNum, pageSize
    }
  })
}
//删除资料文件
export function delFileInfoManage (ids) {
  return service({
    url: `/manage/delFileInfo`,
    method: 'GET',
    params: {
      ids
    }
  })
}
// -----------------------------------------后台管理