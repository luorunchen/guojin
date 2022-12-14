
import { service, map } from '../utils/request.js'
//获取资料列表
export function getList(parent_id) {
  return service({
    url: `/home/getList`,
    method: 'POST',
    params: {
      parent_id
    }
  })
}
//获取地图定位
export function getMapInfo(key, address, subdistrict) {
  return map({
    url: `https://restapi.amap.com/v3/geocode/geo`,
    method: 'GET',
    params: {
      key, address, subdistrict
    }
  })
}
//获取地图定位
export function addFormTree(name, id) {
  return map({
    url: `/form/addFormTree`,
    method: 'GET',
    params: {
      name, id
    }
  })
}
//获取文件资料列表
export function fileInfo(tid, pageNum, pageSize, title) {
  return service({
    url: `/database/fileInfo`,
    method: 'GET',
    params: {
      tid, pageNum, pageSize, title
    }
  })
}
//获取待审核文件列表
export function getAuditFiles(pageNum, pageSize) {
  return service({
    url: `/database/getAuditFiles`,
    method: 'GET',
    params: {
      pageNum, pageSize
    }
  })
}
//登陆接口
export function login(username, password, type) {
  return service({
    url: `/acc/login`,
    method: 'POST',

    data: {
      username, password, type
    }
  })
}
//注销登陆
export function logout() {
  return service({
    url: `/acc/logout`,
    method: 'GET',

  })
}
//删除资料文件
export function delFileInfo(ids) {
  return service({
    url: `/database/delFileInfo`,
    method: 'GET',
    params: {
      ids
    }
  })
}
//删除台账文件
export function delStandFileInfo(ids) {
  return service({
    url: `/standBank/delStandFileInfo?`,
    method: 'GET',
    params: {
      ids
    }
  })
}
//审核文件
export function auditContent(status, ids, reason) {
  return service({
    url: `/database/auditContent`,
    method: 'GET',
    params: {
      status, ids, reason
    }
  })
}
//五新商店获取列表
export function getWxStoreList(type, content, pageNum, pageSize) {
  return service({
    url: `/wx/getWxStoreList`,
    method: 'GET',
    params: {
      type, content, pageNum, pageSize
    }
  })
}
//左侧列表
export function getStandList() {
  return service({
    url: `/home/getStandList`,
    method: 'GET',
    params: {

    }
  })
}
//获取台账文件
export function getStandInfo(tid, pageNum, pageSize, style, evaluation, title) {
  return service({
    url: `/standBank/getStandInfo`,
    method: 'GET',
    params: {
      tid, style, pageNum, pageSize, evaluation, title
    }
  })
}
//获取登记表数据
export function formTree() {
  return service({
    url: `/form/formTree`,
    method: 'GET',
    params: {

    }
  })
}
//获取登记表数据
export function getInsType() {
  return service({
    url: `/form/getInsType`,
    method: 'GET',
    params: {

    }
  })
}
//获取验证码
export function getCode(phone) {
  return service({
    url: `/acc/getCode`,
    method: 'GET',
    params: {
      phone
    }
  })
}
//获取验证码
export function getCompanyInfo(companyName) {
  return service({
    url: `/form/getCompanyInfo`,
    method: 'GET',
    params: {
      companyName
    }
  })
}
//获取验证码
export function hyTree() {
  return service({
    url: `/form/hyTree`,
    method: 'GET',
    params: {

    }
  })
}
export function setCompHy(tid, companyId, last_value) {
  return service({
    url: `/form/setCompHy`,
    method: 'GET',
    params: {
      tid, companyId, last_value
    }
  })
}
//企业表单提交
export function addFormContent(last_value, companyId, number, floor_space, operation_space, products, up_down, ids) {
  return service({
    url: `/form/addFormContent`,
    method: 'POST',
    data: {
      last_value, companyId, number, floor_space, operation_space, products, up_down, ids
    }
  })
}
//企业表单人员提交
export function addPerson(name, phone, type, companyId) {
  return service({
    url: `/form/addPerson`,
    method: 'GET',
    params: {
      name, phone, type, companyId
    }
  })
}
//机构表单提交
export function addInstFormInfo(obj) {
  return map({
    url: `/gjsafe/form/addInstFormInfo`,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: obj

  })
}
export function upWxProduct(obj) {
  return map({
    url: `/gjsafe/wx/upWxProduct`,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: obj

  })
}
//机构列表获取
export function getInstBankInfo(tid, title, inst_comp, pageNum, pageSize) {
  return service({
    url: `/inst/getInstBankInfo`,
    method: 'GET',
    params: {
      tid, title, inst_comp, pageNum, pageSize
    }


  })
}
//机构企业列表
export function getRegionComp() {
  return service({
    url: `/inst/getRegionComp`,
    method: 'GET',
    params: {

    }


  })
}
//企业备案信息
export function getCompanyInfoByIds() {
  return service({
    url: `/company/getCompanyInfoById`,
    method: 'GET',
    params: {
    }
  })
}
//企业备案信息
export function getViewUrlDbPath(fileId, userId) {
  return service({
    url: `/wps/api/getViewUrlDbPath`,
    method: 'GET',
    params: {
      fileId, userId
    }
  })
}
//缴费记录
export function getPayHistorys(pageNum, pageSize) {
  return service({
    url: `/company/getPayHistory`,
    method: 'GET',
    params: {
      pageNum, pageSize
    }
  })
}
//企业备案信息
export function getCompDeviceList(type, device_name, pageNum, pageSize) {
  return service({
    url: `/device/getCompDeviceList`,
    method: 'GET',
    params: {
      type, device_name, pageNum, pageSize
    }
  })
}
//获取设备类型
export function getDeviceType() {
  return service({
    url: `/device/getDeviceType`,
    method: 'GET',
    params: {

    }
  })
}
//获取设备类型
export function addDevice(device_name, type, supplier, productNumber, installLocation, long_lat) {
  return service({
    url: `/device/addDevice`,
    method: 'GET',
    params: {
      device_name, type, supplier, productNumber, installLocation, long_lat
    }
  })
}

// -----------------------------------------后台管理

//获取待审核文件列表
export function getAuditFilesManage(pageNum, pageSize) {
  return service({
    url: `/manage/getAuditFiles`,
    method: 'GET',
    params: {
      pageNum, pageSize
    }
  })
}

//审核文件
export function auditContentManage(status, ids, reason) {
  return service({
    url: `/manage/auditContent`,
    method: 'GET',
    params: {
      status, ids, reason
    }
  })
}
//删除台账文件
export function delStandFileInfoManage(ids) {
  return service({
    url: `/manage/delStandFileInfo`,
    method: 'GET',
    params: {
      ids
    }
  })
}
//企业列表
export function getCompanyList(company, id, pageNum, pageSize, code) {
  return service({
    url: `/manage/getCompanyList`,
    method: 'GET',
    params: {
      company, id, pageNum, pageSize, code
    }
  })
}
//机构列表
export function getInstitutionsList(institutions, id, pageNum, pageSize, code) {
  return service({
    url: `/manage/getInstitutionsList`,
    method: 'GET',
    params: {
      institutions, id, pageNum, pageSize, code
    }
  })
}
//行业列表
export function getHY() {
  return service({
    url: `/manage/getHY`,
    method: 'GET',
    params: {

    }
  })
}
//机构服务类型
export function getJG() {
  return service({
    url: `/manage/getJG`,
    method: 'GET',
    params: {

    }
  })
}
//用户列表
export function getUserInfo(username, state, pageNum, pageSize, type) {
  return service({
    url: `/manage/getUserInfo`,
    method: 'GET',
    params: {
      username, state, pageNum, pageSize, type
    }
  })
}
//用户禁用
export function banUser(id, state) {
  return service({
    url: `/manage/banUser`,
    method: 'GET',
    params: {
      id, state
    }
  })
}
//用户禁用
export function getCompanyStandInfo(companyId, title, status, tid, style, pageNum, pageSize) {
  return service({
    url: `/manage/getCompanyStandInfo`,
    method: 'GET',
    params: {
      companyId, title, status, tid, style, pageNum, pageSize
    }
  })
}
//企业详情
export function getCompanyInfoById(companyId) {
  return service({
    url: `/manage/getCompanyInfoById`,
    method: 'GET',
    params: {
      companyId
    }
  })
}
//平台资料库
export function getDataBaseInfo(title, tid, pageNum, pageSize) {
  return service({
    url: `/manage/getDataBaseInfo`,
    method: 'GET',
    params: {
      title, tid, pageNum, pageSize
    }
  })
}
//删除资料文件
export function delFileInfoManage(ids) {
  return service({
    url: `/manage/delFileInfo`,
    method: 'GET',
    params: {
      ids
    }
  })
}
//添加年费设置
export function addPrice(name, price, years, type) {
  return service({
    url: `/manage/addPrice`,
    method: 'GET',
    params: {
      name, price, years, type
    }
  })
}
//编辑年费设置
export function editPrice(id, name, price, years, type) {
  return service({
    url: `/manage/editPrice`,
    method: 'GET',
    params: {
      id, name, price, years, type
    }
  })
}
//删除年费设置
export function delPrice(id) {
  return service({
    url: `/manage/delPrice`,
    method: 'GET',
    params: {
      id
    }
  })
}
//年费列表
export function getPriceList(name, pageNum, pageSize) {
  return service({
    url: `/manage/getPriceList`,
    method: 'GET',
    params: {
      name, pageNum, pageSize
    }
  })
}
//年费到期查询
export function getExpireUser(name, type, isExpire, startTime, endTime, pageNum, pageSize) {
  return service({
    url: `/manage/getExpireUser`,
    method: 'GET',
    params: {
      name, type, isExpire, startTime, endTime, pageNum, pageSize
    }
  })
}
//缴费详情
export function getPayHistory(username, pageNum, pageSize) {
  return service({
    url: `/manage/getPayHistory`,
    method: 'GET',
    params: {
      username, pageNum, pageSize
    }
  })
}
//获取行政区域
export function getRegionCode(code) {
  return service({
    url: `/manage/getRegionCode`,
    method: 'GET',
    params: {
      code
    }
  })
}
//五新商店审核
export function auditWxStore(id, status, reason) {
  return service({
    url: `/manage/auditWxStore`,
    method: 'GET',
    params: {
      id, status, reason
    }
  })
}
//获取行政区域
export function getWxAudit(title, create_name, type, pageNum, pageSize, status) {
  return service({
    url: `/manage/getWxAudit`,
    method: 'GET',
    params: {
      title, create_name, type, pageNum, pageSize, status
    }
  })
}
// -----------------------------------------后台管理