
import { service, map } from '../utils/request.js'
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
export function getStreetList (code) {
  return service({
    url: `/form/getStreetList`,
    method: 'GET',
    params: {
      code
    }
  })
}
export function sign (name, age, phone, address, description) {
  return service({
    url: `/home/sign`,
    method: 'GET',
    params: {
      name, age, phone, address, description
    }
  })
}
export function setIsExit (companyId) {
  return service({
    url: `/form/setIsExit`,
    method: 'GET',
    params: {
      companyId
    }
  })
}
export function getPersonList (pageNum, pageSize, region) {
  return service({
    url: `/home/getPersonList`,
    method: 'GET',
    params: {
      pageNum, pageSize, region
    }
  })
}
export function delPerson (id) {
  return service({
    url: `/form/delPerson`,
    method: 'GET',
    params: {
      id
    }
  })
}

export function List (pageNum, pageSize, FBillNo) {
  return service({
    url: `/List`,
    method: 'GET',
    params: {
      pageNum, pageSize, FBillNo
    }
  })
}
export function setRegion (companyId, code, long_lat) {
  return service({
    url: `/form/setRegion`,
    method: 'GET',
    params: {
      companyId, code, long_lat
    }
  })
}
export function getPlace () {
  return service({
    url: `/device/getPlace`,
    method: 'GET',
    params: {

    }
  })
}
//获取地图定位
export function getMapInfo (key, address, subdistrict) {
  return map({
    url: `https://restapi.amap.com/v3/geocode/geo`,
    method: 'GET',
    params: {
      key, address, subdistrict
    }
  })
}
export function district (keywords, subdistrict, extensions) {
  return map({
    url: `https://restapi.amap.com/v3/config/district`,
    method: 'GET',
    params: {
      keywords, subdistrict, extensions
    }
  })
}
//
export function addFormTree (name, id, type, companyId) {
  return service({
    url: `/form/addFormTree`,
    method: 'GET',
    params: {
      name, id, type, companyId
    }
  })
}
//设备详情
export function getDevInfoByDevId (devId) {
  return service({
    url: `/device/getDevInfoByDevId`,
    method: 'GET',
    params: {
      devId
    }
  })
}
//设备详情
export function delDevice (devId) {
  return service({
    url: `/device/delDevice`,
    method: 'GET',
    params: {
      devId
    }
  })
}
//设备详情
export function delAlarm (aFid, content) {
  return service({
    url: `/device/delAlarm`,
    method: 'GET',
    params: {
      aFid, content
    }
  })
}
//设备详情
export function getHistoryAlarm (productNumber, startTime, endTime, pageNum, pageSize) {
  return service({
    url: `/device/getHistoryAlarm`,
    method: 'GET',
    params: {
      productNumber, startTime, endTime, pageNum, pageSize
    }
  })
}
export function getVideoAppkey () {
  return service({
    url: `/device/getVideoAppkey`,
    method: 'GET',
    params: {

    }
  })
}
export function addFormBank (formbank) {
  return map({
    url: `/gjsafe/form/addFormBank`,
    method: 'POST',
    data: {
      formbank
    }
  })
}
export function editFormTreeByComp (formbank) {
  return map({
    url: `/gjsafe/company/editFormTreeByComp`,
    method: 'POST',
    data: {
      formbank
    }
  })
}
export function editCompanyOther (last_value, number, floor_space, operation_space, industry, safe_input, evaluation_standard, products, up_down) {
  return service({
    url: `/form/editCompanyOther`,
    method: 'GET',
    params: {
      last_value, number, floor_space, operation_space, industry, safe_input, evaluation_standard, products, up_down
    }
  })
}
export function select (content, pageNum, pageSize) {
  return service({
    url: `/company/select`,
    method: 'GET',
    params: {
      content, pageNum, pageSize
    }
  })
}
export function viewCompanyList (pageNum, pageSize) {
  return service({
    url: `/inst/viewCompanyList`,
    method: 'GET',
    params: {
      pageNum, pageSize
    }
  })
}
export function InstgetCompanyList (company) {
  return service({
    url: `/inst/getCompanyList`,
    method: 'GET',
    params: {
      company
    }
  })
}
export function addInst_comp (companyId) {
  return service({
    url: `/inst/addInst_comp`,
    method: 'GET',
    params: {
      companyId
    }
  })
}
export function getTid (companyId) {
  return service({
    url: `/standBank/getTid`,
    method: 'GET',
    params: {
      companyId
    }
  })
}
export function selectChatLog (username, servicename, pageNum, pageSize) {
  return service({
    url: `/manage/selectChatLog`,
    method: 'GET',
    params: {
      username, servicename, pageNum, pageSize
    }
  })
}
export function getOnlineCount () {
  return service({
    url: `/manage/getOnlineCount`,
    method: 'GET',
    params: {

    }
  })
}
//设备详情
export function remoteControlDev (productNumber, type, state, style) {
  return service({
    url: `/device/remoteControlDev`,
    method: 'GET',
    params: {
      productNumber, type, state, style
    }
  })
}
export function setParam (deviceid, APhasecur, BPhasecur, CPhasecur, APhaseVolt, BPhaseVolt, CPhaseVolt, ATemp, BTemp, CTemp, NTemp, Residualvalue, U_voltage, noise) {
  return service({
    url: `/device/setParam`,
    method: 'GET',
    params: {
      deviceid, APhasecur, BPhasecur, CPhasecur, APhaseVolt, BPhaseVolt, CPhaseVolt, ATemp, BTemp, CTemp, NTemp, Residualvalue, U_voltage, noise
    }
  })
}
//设备详情
export function viewDeviceGraphs (productNumber, startTime, endTime) {
  return service({
    url: `/device/viewDeviceGraphs`,
    method: 'GET',
    params: {
      productNumber, startTime, endTime
    }
  })
}
export function editFormTree (name, id, type) {
  return service({
    url: `/form/editFormTree`,
    method: 'GET',
    params: {
      name, id, type
    }
  })
}
//验证码校验
export function checkSmsCode (phone, code) {
  return service({
    url: `/acc/checkSmsCode`,
    method: 'GET',
    params: {
      phone, code
    }
  })
}
//隐患库
export function getDomainList () {
  return service({
    url: `/hidden/getDomainList`,
    method: 'GET',
    params: {

    }
  })
}
//隐患库
export function delHiddenRegister (hdId, rid) {
  return service({
    url: `/hidden/delHiddenRegister`,
    method: 'GET',
    params: {
      hdId, rid
    }
  })
}
//隐患库
export function delHiddenInfo (hdId) {
  return service({
    url: `/hidden/delHiddenInfo`,
    method: 'GET',
    params: {
      hdId
    }
  })
}
//隐患库
export function getHiddenRegister (state, pageNum, pageSize, source, company) {
  return service({
    url: `/hidden/getHiddenRegister`,
    method: 'GET',
    params: {
      state, pageNum, pageSize, source, company
    }
  })
}
//隐患库
export function getHdLevel () {
  return service({
    url: `/hidden/getHdLevel`,
    method: 'GET',
    params: {

    }
  })
}
//隐患库
export function getHiddenRisk (companyId, pageNum, pageSize) {
  return service({
    url: `/hidden/getHiddenRisk`,
    method: 'GET',
    params: {
      companyId, pageNum, pageSize
    }
  })
}
//隐患库
export function delHiddenRisk (risk_id) {
  return service({
    url: `/hidden/delHiddenRisk`,
    method: 'GET',
    params: {
      risk_id
    }
  })
}
//隐患库
export function delHiddenBank (chkstdId) {
  return service({
    url: `/hidden/delHiddenBank`,
    method: 'GET',
    params: {
      chkstdId
    }
  })
}
//隐患库
export function getHiddenType () {
  return service({
    url: `/hidden/getHiddenType`,
    method: 'GET',
    params: {

    }
  })
}
//隐患库
export function addHiddenBank (standard, industry, domain, mustCheck, placeLink, hdType, hdLevel, keyWord, days, hdDesc, according, liability) {
  return service({
    url: `/hidden/addHiddenBank`,
    method: 'GET',
    params: {
      standard, industry, domain, mustCheck, placeLink, hdType, hdLevel, keyWord, days, hdDesc, according, liability
    }
  })
}
export function loadHdInfoList (hdId, pageNum, pageSize) {
  return service({
    url: `/hidden/loadHdInfoList`,
    method: 'GET',
    params: {
      hdId, pageNum, pageSize
    }
  })
}
export function getRiskInfo (riskIds) {
  return service({
    url: `/hidden/getRiskInfo`,
    method: 'GET',
    params: {
      riskIds
    }
  })
}
export function getHiddenZg (rid) {
  return service({
    url: `/hidden/getHiddenZg`,
    method: 'GET',
    params: {
      rid
    }
  })
}
export function Bookmarks (id, bookmarks) {
  return service({
    url: `/wps/api/Bookmarks`,
    method: 'GET',
    params: {
      id, bookmarks
    }
  })
}
export function returnBookmarksContent (id) {
  return service({
    url: `/wps/api/returnBookmarksContent`,
    method: 'GET',
    params: {
      id
    }
  })
}
export function getEvaluation (companyId) {
  return service({
    url: `/company/getEvaluation`,
    method: 'GET',
    params: {
      companyId
    }
  })
}
export function typeCount () {
  return service({
    url: `/government/typeCount`,
    method: 'GET',
    params: {

    }
  })
}
export function score () {
  return service({
    url: `/government/score`,
    method: 'GET',
    params: {

    }
  })
}
export function hiddenLevelCount () {
  return service({
    url: `/government/hiddenLevelCount`,
    method: 'GET',
    params: {

    }
  })
}
export function getZS (pageNum, pageSize, name, tid) {
  return service({
    url: `/company/getZS`,
    method: 'GET',
    params: {
      pageNum, pageSize, name, tid
    }
  })
}
export function getJC () {
  return service({
    url: `/company/getJC`,
    method: 'GET',
    params: {

    }
  })
}
export function delZS (id) {
  return service({
    url: `/company/delZS`,
    method: 'GET',
    params: {
      id
    }
  })
}
export function delJC (id) {
  return service({
    url: `/company/delJC`,
    method: 'GET',
    params: {
      id
    }
  })
}
export function addZS (obj) {
  return map({
    url: `/gjsafe/company/addZS`,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: obj
  })
}
export function addTest (obj) {
  return map({
    url: `/gjsafe/company/addTest`,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: obj
  })
}
export function getPercent (id, percent) {
  return service({
    url: `/wps/api/getPercent`,
    method: 'GET',
    params: {
      id, percent
    }
  })
}
//隐患库
export function addHiddenRegister (obj) {
  return map({
    url: `/gjsafe/hidden/addHiddenRegister`,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: obj


  })
}
//隐患库
export function addHiddenZg (obj) {
  return map({
    url: `/gjsafe/hidden/addHiddenZg`,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: obj


  })
}
//隐患库
export function addHidden (checkName, checkDate, checkPlace, checkSituation, rid, companyId, status, sendto, checkType) {
  return service({
    url: `/hidden/addHidden`,
    method: 'GET',

    params: {
      checkName, checkDate, checkPlace, checkSituation, rid, companyId, status, sendto, checkType
    }


  })
}
//隐患库
export function addHiddenRisk (risk_name, risk_place, risk_use, risk_level, risk_response) {
  return service({
    url: `/hidden/addHiddenRisk`,
    method: 'GET',
    params: {
      risk_name, risk_place, risk_use, risk_level, risk_response
    }
  })
}
//隐患库
export function getHiddenCheckList (companyId, pageNum, pageSize, rec, checkName, startTime, endTime) {
  return service({
    url: `/hidden/getHiddenCheckList`,
    method: 'GET',
    params: {
      companyId, pageNum, pageSize, rec, checkName, startTime, endTime
    }
  })
}
//隐患库
export function hiddenList (standard, industry, domain, hdLevel, placeLink, pageNum, pageSize) {
  return service({
    url: `/hidden/hiddenList`,
    method: 'GET',
    params: {
      standard, industry, domain, hdLevel, placeLink, pageNum, pageSize
    }
  })
}
export function delFormTree (id, type) {
  return service({
    url: `/form/delFormTree`,
    method: 'GET',
    params: {
      id, type
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
//生产台账
export function editMb (id) {
  return service({
    url: `/company/editMb`,
    method: 'GET',
    params: {
      id
    }
  })
}
//生产台账
export function getDataBaseBank (sid, pageNum, pageSize) {
  return service({
    url: `/company/getDataBaseBank`,
    method: 'GET',
    params: {
      sid, pageNum, pageSize
    }
  })
}
//生产台账
export function syncDataBaseBank (tid, evaluation, ids) {
  return service({
    url: `/company/syncDataBaseBank`,
    method: 'GET',
    params: {
      tid, evaluation, ids
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
export function login (username, password, type, device) {
  return service({
    url: `/acc/login`,
    method: 'POST',

    data: {
      username, password, type, device
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
//注册账号查重
export function recheck (username) {
  return service({
    url: `/acc/recheck`,
    method: 'GET',
    params: {
      username
    }
  })
}
//注册账号缴费
export function getPayList (type) {
  return service({
    url: `/acc/getPayList`,
    method: 'GET',
    params: {
      type
    }
  })
}
//查询支付宝订单
export function aliPayStatus (orderId) {
  return map({
    url: `/gjsafe/pay/aliPayStatus`,
    method: 'GET',
    params: {
      orderId
    }
  })
}
//注册账号支付宝缴费
export function aliPay (id, username) {
  return service({
    url: `/pay/aliPay`,
    method: 'GET',
    params: {
      id, username
    }
  })
}
//注册账号
export function register (username, password, type, phone, code, orderId, pay_type) {
  return service({
    url: `/acc/register`,
    method: 'POST',
    data: {
      username, password, type, phone, code, orderId, pay_type
    }
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
//五新商店获取列表
export function getWxStoreList (type, content, pageNum, pageSize) {
  return service({
    url: `/wx/getWxStoreList`,
    method: 'GET',
    params: {
      type, content, pageNum, pageSize
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
export function getLive (companyId, pageNum, pageSize) {
  return service({
    url: `/home/getLive`,
    method: 'GET',
    params: {
      companyId, pageNum, pageSize
    }
  })
}
export function delLive (id) {
  return service({
    url: `/home/delLive`,
    method: 'GET',
    params: {
      id
    }
  })
}
export function getParam (productNumber) {
  return service({
    url: `/device/getParam`,
    method: 'GET',
    params: {
      productNumber
    }
  })
}
export function createLive (title, productNumber, type, uid, companyId) {
  return service({
    url: `/home/createLive`,
    method: 'GET',
    params: {
      title, productNumber, type, uid, companyId
    }
  })
}
export function chatLog (uid, username, sid, servicename, startTime, endTime, appraise, content) {
  return service({
    url: `/home/chatLog`,
    method: 'GET',
    params: {
      uid, username, sid, servicename, startTime, endTime, appraise, content
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
//企业表单人员提交
export function addPerson (name, phone, type, companyId) {
  return service({
    url: `/form/addPerson`,
    method: 'GET',
    params: {
      name, phone, type, companyId
    }
  })
}
//机构表单提交
export function addInstFormInfo (obj) {
  return map({
    url: `/gjsafe/form/addInstFormInfo`,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: obj

  })
}
export function upWxProduct (obj) {
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
export function getInstBankInfo (tid, title, inst_comp, pageNum, pageSize, style) {
  return service({
    url: `/inst/getInstBankInfo`,
    method: 'GET',
    params: {
      tid, title, inst_comp, pageNum, pageSize, style
    }


  })
}
//机构企业列表
export function getRegionComp () {
  return service({
    url: `/inst/getRegionComp`,
    method: 'GET',
    params: {

    }


  })
}
//企业备案信息
export function getCompanyInfoByIds () {
  return service({
    url: `/company/getCompanyInfoById`,
    method: 'GET',
    params: {
    }
  })
}
//企业备案信息
export function getViewUrlDbPath (fileId, userId) {
  return service({
    url: `/wps/api/getViewUrlDbPath`,
    method: 'GET',
    params: {
      fileId, userId
    }
  })
}
//缴费记录
export function getPayHistorys (pageNum, pageSize) {
  return service({
    url: `/company/getPayHistory`,
    method: 'GET',
    params: {
      pageNum, pageSize
    }
  })
}
//企业备案信息
export function getCompDeviceList (type, device_name, pageNum, pageSize, place) {
  return service({
    url: `/device/getCompDeviceList`,
    method: 'GET',
    params: {
      type, device_name, pageNum, pageSize, place
    }
  })
}
//获取设备类型
export function getDeviceType () {
  return service({
    url: `/device/getDeviceType`,
    method: 'GET',
    params: {

    }
  })
}
//五新商店我的上传
export function getMyUPStoreList (pageNum, pageSize, type, title, status) {
  return service({
    url: `/wx/getMyUPStoreList`,
    method: 'GET',
    params: {
      pageNum, pageSize, type, title, status
    }
  })
}
//五新商店删除
export function delWxProduct (id) {
  return service({
    url: `/wx/delWxProduct`,
    method: 'GET',
    params: {
      id
    }
  })
}
//政府企业查询
export function getVideosById (companyId, pageNum, pageSize) {
  return service({
    url: `/government/getVideosById`,
    method: 'GET',
    params: {
      companyId, pageNum, pageSize
    }
  })
}
export function addCount (wid) {
  return service({
    url: `/wx/addCount`,
    method: 'GET',
    params: {
      wid
    }
  })
}
//我的发票信息
export function getInVoiceInfo (uid) {
  return service({
    url: `/invoice/getInVoiceInfo`,
    method: 'GET',
    params: {
      uid
    }
  })
}
//删除发票地址
export function delMailAddress (ids) {
  return service({
    url: `/invoice/delMailAddress`,
    method: 'GET',
    params: {
      ids
    }
  })
}
//删除发票邮箱
export function delMail (ids) {
  return service({
    url: `/invoice/delMail`,
    method: 'GET',
    params: {
      ids
    }
  })
}
//机构备案表查询
export function getInstitutionsInfoById () {
  return service({
    url: `/inst/getInstitutionsInfoById`,
    method: 'GET',
    params: {

    }
  })
}
//后台机构备案表查询
export function manageGetInstitutionsInfoById (companyId) {
  return service({
    url: `/manage/getInstitutionsInfoById`,
    method: 'GET',
    params: {
      companyId
    }
  })
}
//发生开票信息
export function sendInVoiceInfo (orderId, price, invoiceId, addressId, mailId, status) {
  return service({
    url: `/invoice/sendInVoiceInfo`,
    method: 'GET',
    params: {
      orderId, price, invoiceId, addressId, mailId, status
    }
  })
}
//设置开票信息
export function setInvoiceInfo (uid, company, bank, cardId, code, type, place, phone, style) {
  return service({
    url: `/invoice/setInvoiceInfo`,
    method: 'GET',
    params: {
      uid, company, bank, cardId, code, type, place, phone, style
    }
  })
}
//编辑开票信息
export function editInvoiceInfo (id, uid, company, bank, cardId, code, type, place, phone, style) {
  return service({
    url: `/invoice/editInvoiceInfo`,
    method: 'GET',
    params: {
      id, uid, company, bank, cardId, code, type, place, phone, style
    }
  })
}
//我的发票地址信息
export function setMailAddress (uid, name, province, city, area, address, phone, code, defaults) {
  return service({
    url: `/invoice/setMailAddress`,
    method: 'GET',
    params: {
      uid, name, province, city, area, address, phone, code, defaults
    }
  })
}
//修改我的发票地址信息
export function editMailAddress (uid, name, province, city, area, address, phone, code, defaults, id) {
  return service({
    url: `/invoice/editMailAddress`,
    method: 'GET',
    params: {
      uid, name, province, city, area, address, phone, code, defaults, id
    }
  })
}
//新增我的发票地址信息
export function getMailAddress (uid, pageNum, pageSize) {
  return service({
    url: `/invoice/getMailAddress`,
    method: 'GET',
    params: {
      uid, pageNum, pageSize
    }
  })
}
//我的邮箱
export function getMail (uid, pageNum, pageSize) {
  return service({
    url: `/invoice/getMail`,
    method: 'GET',
    params: {
      uid, pageNum, pageSize
    }
  })
}
//修改我的邮箱
export function editMail (id, mail) {
  return service({
    url: `/invoice/editMail`,
    method: 'GET',
    params: {
      id, mail
    }
  })
}
//新增我的发票邮箱信息
export function setMail (uid, mail, defaults) {
  return service({
    url: `/invoice/setMail`,
    method: 'GET',
    params: {
      uid, mail, defaults
    }
  })
}
//获取设备类型
export function addDevice (device_name, type, supplier, productNumber, installLocation, long_lat, maintainTime, cycle, place) {
  return service({
    url: `/device/addDevice`,
    method: 'GET',
    params: {
      device_name, type, supplier, productNumber, installLocation, long_lat, maintainTime, cycle, place
    }
  })
}
//获取设备类型
export function medical (evaluation) {
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
export function getCompList (company, id, pageNum, pageSize) {
  return service({
    url: `/government/getCompList`,
    method: 'GET',
    params: {
      company, id, pageNum, pageSize
    }
  })
}
//政府机构备案表
export function getInstList (institutions, id, pageNum, pageSize) {
  return service({
    url: `/government/getInstList`,
    method: 'GET',
    params: {
      institutions, id, pageNum, pageSize
    }
  })
}
//政府机构备案表
export function governmentGetInstitutionsInfoById (companyId) {
  return service({
    url: `/government/getInstitutionsInfoById`,
    method: 'GET',
    params: {
      companyId
    }
  })
}
//政府台账完成度排名
export function tzRank (pageNum, pageSize) {
  return service({
    url: `/government/tzRank`,
    method: 'GET',
    params: {
      pageNum, pageSize
    }
  })
}
//政府台账完成度排名
export function getInstUpInfoByComp (title, pageNum, pageSize, tid) {
  return service({
    url: `/standBank/getInstUpInfoByComp`,
    method: 'GET',
    params: {
      title, pageNum, pageSize, tid
    }
  })
}
//政府平台数据分析
export function dataAnalysis () {
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
    url: `/manage/delStandFileInfo`,
    method: 'GET',
    params: {
      ids
    }
  })
}
//企业列表
export function getCompanyList (company, id, pageNum, pageSize, code) {
  return service({
    url: `/manage/getCompanyList`,
    method: 'GET',
    params: {
      company, id, pageNum, pageSize, code
    }
  })
}
//机构列表
export function getInstitutionsList (institutions, id, pageNum, pageSize, code) {
  return service({
    url: `/manage/getInstitutionsList`,
    method: 'GET',
    params: {
      institutions, id, pageNum, pageSize, code
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
//行业列表
export function getHYHome () {
  return service({
    url: `/home/getHY`,
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
export function moveToCompany (tid, inst_comp, id) {
  return service({
    url: `/inst/moveToCompany`,
    method: 'GET',
    params: {
      tid, inst_comp, id
    }
  })
}
export function getInstType (companyId) {
  return service({
    url: `/home/getInstType`,
    method: 'GET',
    params: {
      companyId
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
export function governmentGetCompanyStandInfo (companyId, title, status, tid, pageNum, pageSize) {
  return service({
    url: `/government/getCompanyStandInfo`,
    method: 'GET',
    params: {
      companyId, title, status, tid, pageNum, pageSize
    }
  })
}
//企业详情
export function governmentGetCompanyInfoById (companyId) {
  return service({
    url: `/government/getCompanyInfoById`,
    method: 'GET',
    params: {
      companyId
    }
  })
}
//政府企业详情
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
//添加年费设置
export function addPrice (name, price, years, type) {
  return service({
    url: `/manage/addPrice`,
    method: 'GET',
    params: {
      name, price, years, type
    }
  })
}
//编辑年费设置
export function editPrice (id, name, price, years, type) {
  return service({
    url: `/manage/editPrice`,
    method: 'GET',
    params: {
      id, name, price, years, type
    }
  })
}
//删除年费设置
export function delPrice (id) {
  return service({
    url: `/manage/delPrice`,
    method: 'GET',
    params: {
      id
    }
  })
}
//年费列表
export function getPriceList (name, pageNum, pageSize) {
  return service({
    url: `/manage/getPriceList`,
    method: 'GET',
    params: {
      name, pageNum, pageSize
    }
  })
}
//年费到期查询
export function getExpireUser (name, type, isExpire, startTime, endTime, pageNum, pageSize) {
  return service({
    url: `/manage/getExpireUser`,
    method: 'GET',
    params: {
      name, type, isExpire, startTime, endTime, pageNum, pageSize
    }
  })
}
//缴费详情
export function getPayHistory (username, pageNum, pageSize) {
  return service({
    url: `/manage/getPayHistory`,
    method: 'GET',
    params: {
      username, pageNum, pageSize
    }
  })
}
//获取行政区域
export function getRegionCode (code) {
  return service({
    url: `/manage/getRegionCode`,
    method: 'GET',
    params: {
      code
    }
  })
}
//五新商店审核
export function auditWxStore (id, status, reason) {
  return service({
    url: `/manage/auditWxStore`,
    method: 'GET',
    params: {
      id, status, reason
    }
  })
}
//获取行政区域
export function getWxAudit (title, create_name, type, pageNum, pageSize, status) {
  return service({
    url: `/manage/getWxAudit`,
    method: 'GET',
    params: {
      title, create_name, type, pageNum, pageSize, status
    }
  })
}
// -----------------------------------------后台管理