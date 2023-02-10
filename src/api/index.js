
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
//注册账号查重
export function recheck(username) {
  return service({
    url: `/acc/recheck`,
    method: 'GET',
    params: {
      username
    }
  })
}
//注册账号缴费
export function getPayList(type) {
  return service({
    url: `/acc/getPayList`,
    method: 'GET',
    params: {
      type
    }
  })
}
//查询支付宝订单
export function aliPayStatus(orderId) {
  return service({
    url: `/pay/aliPayStatus`,
    method: 'GET',
    params: {
      orderId
    }
  })
}
//注册账号支付宝缴费
export function aliPay(id, username) {
  return service({
    url: `/pay/aliPay`,
    method: 'GET',
    params: {
      id, username
    }
  })
}
//注册账号
export function register(username, password, type, phone, code, orderId, pay_type) {
  return service({
    url: `/acc/register`,
    method: 'POST',
    data: {
      username, password, type, phone, code, orderId, pay_type
    }
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
//五新商店我的上传
export function getMyUPStoreList(pageNum, pageSize, type, title, status) {
  return service({
    url: `/wx/getMyUPStoreList`,
    method: 'GET',
    params: {
      pageNum, pageSize, type, title, status
    }
  })
}
//五新商店删除
export function delWxProduct(id) {
  return service({
    url: `/wx/delWxProduct`,
    method: 'GET',
    params: {
      id
    }
  })
}
//政府企业查询
export function getVideosById(companyId, pageNum, pageSize) {
  return service({
    url: `/government/getVideosById`,
    method: 'GET',
    params: {
      companyId, pageNum, pageSize
    }
  })
}
//我的发票信息
export function getInVoiceInfo(uid) {
  return service({
    url: `/invoice/getInVoiceInfo`,
    method: 'GET',
    params: {
      uid
    }
  })
}
//删除发票地址
export function delMailAddress(ids) {
  return service({
    url: `/invoice/delMailAddress`,
    method: 'GET',
    params: {
      ids
    }
  })
}
//删除发票邮箱
export function delMail(ids) {
  return service({
    url: `/invoice/delMail`,
    method: 'GET',
    params: {
      ids
    }
  })
}
//机构备案表查询
export function getInstitutionsInfoById() {
  return service({
    url: `/inst/getInstitutionsInfoById`,
    method: 'GET',
    params: {

    }
  })
}
//后台机构备案表查询
export function manageGetInstitutionsInfoById(companyId) {
  return service({
    url: `/manage/getInstitutionsInfoById`,
    method: 'GET',
    params: {
      companyId
    }
  })
}
//发生开票信息
export function sendInVoiceInfo(orderId, price, invoiceId, addressId, mailId, status) {
  return service({
    url: `/invoice/sendInVoiceInfo`,
    method: 'GET',
    params: {
      orderId, price, invoiceId, addressId, mailId, status
    }
  })
}
//设置开票信息
export function setInvoiceInfo(uid, company, bank, cardId, code, type, place, phone, style) {
  return service({
    url: `/invoice/setInvoiceInfo`,
    method: 'GET',
    params: {
      uid, company, bank, cardId, code, type, place, phone, style
    }
  })
}
//编辑开票信息
export function editInvoiceInfo(id, uid, company, bank, cardId, code, type, place, phone, style) {
  return service({
    url: `/invoice/editInvoiceInfo`,
    method: 'GET',
    params: {
      id, uid, company, bank, cardId, code, type, place, phone, style
    }
  })
}
//我的发票地址信息
export function setMailAddress(uid, name, province, city, area, address, phone, code, defaults) {
  return service({
    url: `/invoice/setMailAddress`,
    method: 'GET',
    params: {
      uid, name, province, city, area, address, phone, code, defaults
    }
  })
}
//修改我的发票地址信息
export function editMailAddress(uid, name, province, city, area, address, phone, code, defaults, id) {
  return service({
    url: `/invoice/editMailAddress`,
    method: 'GET',
    params: {
      uid, name, province, city, area, address, phone, code, defaults, id
    }
  })
}
//新增我的发票地址信息
export function getMailAddress(uid, pageNum, pageSize) {
  return service({
    url: `/invoice/getMailAddress`,
    method: 'GET',
    params: {
      uid, pageNum, pageSize
    }
  })
}
//我的邮箱
export function getMail(uid, pageNum, pageSize) {
  return service({
    url: `/invoice/getMail`,
    method: 'GET',
    params: {
      uid, pageNum, pageSize
    }
  })
}
//修改我的邮箱
export function editMail(id, mail) {
  return service({
    url: `/invoice/editMail`,
    method: 'GET',
    params: {
      id, mail
    }
  })
}
//新增我的发票邮箱信息
export function setMail(uid, mail, defaults) {
  return service({
    url: `/invoice/setMail`,
    method: 'GET',
    params: {
      uid, mail, defaults
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
//获取设备类型
export function medical(evaluation) {
  return service({
    url: `/company/medical`,
    method: 'GET',
    params: {
      evaluation
    }
  })
}

// -----------------------------------------政府前台
//政府企业备案表
export function getCompList(company, id, pageNum, pageSize) {
  return service({
    url: `/government/getCompList`,
    method: 'GET',
    params: {
      company, id, pageNum, pageSize
    }
  })
}
//政府机构备案表
export function getInstList(institutions, id, pageNum, pageSize) {
  return service({
    url: `/government/getInstList`,
    method: 'GET',
    params: {
      institutions, id, pageNum, pageSize
    }
  })
}
//政府机构备案表
export function governmentGetInstitutionsInfoById(companyId) {
  return service({
    url: `/government/getInstitutionsInfoById`,
    method: 'GET',
    params: {
      companyId
    }
  })
}
//政府台账完成度排名
export function tzRank(pageNum, pageSize) {
  return service({
    url: `/government/tzRank`,
    method: 'GET',
    params: {
      pageNum, pageSize
    }
  })
}
//政府平台数据分析
export function dataAnalysis() {
  return service({
    url: `/government/dataAnalysis`,
    method: 'GET',
    params: {

    }
  })
}
// -----------------------------------------政府前台
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
export function governmentGetCompanyInfoById(companyId) {
  return service({
    url: `/government/getCompanyInfoById`,
    method: 'GET',
    params: {
      companyId
    }
  })
}
//政府企业详情
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