
import { service2 } from '../utils/request.js'
//登录接口
export function login(username, password) {
  return service2({
    url: `http://psy119.cn/earlyWarn/LoginWeb.action`,
    method: 'POST',
    params: {
      username,
      password
    }
  })
}
//首页报警数接口
export function push_AlarmData(username, time_zone) {
  return service2({
    url: `http://psy119.cn/earlyWarn/admin/bigdata/push_AlarmData`,
    method: 'GET',
    params: {
      username,
      time_zone
    }
  })
}
//首页设备类型接口
export function check_device_type(user_name) {
  return service2({
    url: `http://psy119.cn/earlyWarn/check_device_type.action`,
    method: 'GET',
    params: {
      user_name,

    }
  })
}
//首页报警信息加载更多
export function AlarmInforMore(username, time_zone, pno, pagesize) {
  return service2({
    url: `http://psy119.cn/earlyWarn/admin/bigdata/push_AlarmInfo.action`,
    method: 'GET',
    params: {
      username,
      time_zone,
      pno,
      pagesize
    }
  })
}
//本周故障和报警数
export function push_AlarmAndFault(username, date) {
  return service2({
    url: `http://psy119.cn/earlyWarn/admin/bigdata/push_AlarmAndFault.action`,
    method: 'GET',
    params: {
      username,
      date
    }
  })
}

//首页报警数量接口
export function push_AlarmNumData(username, time_zone) {
  return service2({
    url: `http://psy119.cn/earlyWarn/admin/bigdata/push_AlarmNumData.action`,
    method: 'GET',
    params: {
      username,
      time_zone
    }
  })
}
//地图点
export function DeviceProjectNew(username, type, region) {
  return service2({
    url: `http://psy119.cn/earlyWarn/WebProject/DeviceProjectNew.action`,
    method: 'GET',
    params: {
      username,
      type,
      region
    }
  })
}
//在线情况
export function RegisterOnline(my_username) {
  return service2({
    url: `http://psy119.cn/earlyWarn/WebProject/RegisterOnline.action`,
    method: 'GET',
    params: {
      my_username
    }
  })
}
//报警统计
export function statisticsAlarm(username, startTime, endTime, productNumber, responsible, Dsid, typeName, type, pageNumber, pageSize, distinct) {
  return service2({
    url: `http://psy119.cn/earlyWarn/statisticsAlarm`,
    method: 'GET',
    params: {
      username, startTime, endTime, productNumber, responsible, Dsid, typeName, type, pageNumber, pageSize, distinct
    }
  })
}
//获取设备类型列表
export function getDsid(username) {
  return service2({
    url: `http://psy119.cn/earlyWarnWebProject/getDsid`,
    method: 'GET',
    params: {
      username
    }
  })
}
//设备管理
export function getAllDeviceWeb(username, cp, col, state, kw, ls, deviceName, dSid) {
  return service2({
    url: `http://psy119.cn/earlyWarn/admin/device/getAllDeviceWeb.action`,
    method: 'GET',
    params: {
      username, cp, col, state, kw, ls, deviceName, dSid
    }
  })
}
//单位管理信息获取
export function getProvince(username, otherParam, code) {
  return service2({
    url: `http://psy119.cn/earlyWarn/region/getProvince.action`,
    method: 'GET',
    params: {
      username, otherParam, code
    }
  })
}
//单位管理信息获取
export function getRegionList(username, pageSize, pno, region) {
  return service2({
    url: `http://psy119.cn/earlyWarn/region/getRegionList.action`,
    method: 'GET',
    params: {
      username, pno, pageSize, region
    }
  })
}
//单位管理信息获取
export function findRegion(username, region, pname) {
  return service2({
    url: `http://psy119.cn/earlyWarnregion/findRegion.action`,
    method: 'GET',
    params: {
      username, region, pname
    }
  })
}

//用户管理
export function gridSource(username, pageNo, pageSize, object) {
  return service2({
    url: `http://psy119.cn/earlyWarn/admin/device/gridSource.action`,
    method: 'GET',
    params: {
      username, pageNo, pageSize, object
    }
  })
}

//权限管理
export function pushRole_infos(username, r_name, pno, pageSize) {
  return service2({
    url: `http://psy119.cn/earlyWarn/power/pushRole_infos.action`,
    method: 'GET',
    params: {
      username, r_name, pno, pageSize
    }
  })
}
//权限管理 新增
export function givePowerRole(role_name, username, p_id, region) {
  return service2({
    url: `http://psy119.cn/earlyWarn/power/givePowerRole.action`,
    method: 'GET',
    params: {
      role_name, username, p_id, region
    }
  })
}
//权限管理 删除
export function delPower(username, r_id, type) {
  return service2({
    url: `http://psy119.cn/earlyWarn/power/delPower.action`,
    method: 'GET',
    params: {
      username, r_id, type
    }
  })
}
//权限管理 查看
export function getRoleByid(r_id) {
  return service2({
    url: `http://psy119.cn/earlyWarn/power/getRoleByid.action`,
    method: 'GET',
    params: {
      r_id
    }
  })
}

//权限管理 删除
export function editPower(id, role_name, p_id, username, region) {
  return service2({
    url: `http://psy119.cn/earlyWarn/power/editPower.action`,
    method: 'GET',
    params: {
      id, role_name, p_id, username, region
    }
  })
}
//权限获取
export function getPowerOther(username, role, powerOther) {
  return service2({
    url: `http://psy119.cn/earlyWarn/power/getPowerOther.action`,
    method: 'GET',
    params: {
      username, role, powerOther
    }
  })
}
//添加用户
export function addUserRole(user_name, password, realName, phone, address, company_phone, company, mobile, role, power, powerOther, code) {
  return service2({
    url: `http://psy119.cn/earlyWarnadmin/device/addUserRole.action`,
    method: 'GET',
    params: {
      user_name, password, realName, address, phone, company_phone, company, mobile, role, power, powerOther, code
    }
  })
}
//用户编辑
export function updateUser(user_name, realName, address, phone, company_phone, company, mobile, power, powerOther) {
  return service2({
    url: `http://psy119.cn/earlyWarn/admin/device/updateUser.action`,
    method: 'GET',
    params: {
      user_name, realName, address, phone, company_phone, company, mobile, power, powerOther
    }
  })
}
//编辑设备
export function updateDeviceSim(devId, remark, my_username, installLocation, long_lat) {
  return service2({
    url: `http://psy119.cn/earlyWarn/admin/device/check/updateDeviceSim.action`,
    method: 'GET',
    params: {
      devId, remark, my_username, installLocation, long_lat
    }
  })
}
//删除设备
export function deleDevice(devId, username) {
  return service2({
    url: `http://psy119.cn/earlyWarn/admin/device/check/deleDevice.action`,
    method: 'GET',
    params: {
      devId, username
    }
  })
}
//项目管理
export function getAllProjecForState(username, cp, col, state, kw, ls, pname) {
  return service2({
    url: `http://psy119.cn/earlyWarn/admin/project/getAllProjecForState.action`,
    method: 'GET',
    params: {
      username, cp, col, state, kw, ls, pname
    }
  })
}
//新增人员
export function addLegalFireMan(state, fname, username, fphone, tel, long_lat, long_latbai, ftelephone) {
  return service2({
    url: `http://psy119.cn/earlyWarn/admin/project/check/addLegalFireMan.action`,
    method: 'GET',
    params: {
      state, fname, username, fphone, tel, long_lat, long_latbai, ftelephone
    }
  })
}
//获取消防员/责任人数据
export function getLegalFireMan(state, object) {
  return service2({
    url: `http://psy119.cn/earlyWarn/getLegalFireMan.action`,
    method: 'GET',
    params: {
      state, object
    }
  })
}
//获取街道
export function regionList(code) {
  return service2({
    url: `http://psy119.cn/earlyWarn/region/regionList.action`,
    method: 'GET',
    params: {
      code
    }
  })
}
//新增项目
export function addProject(username, projName, projLocation, fireGuardId, legalPersonId, projRemark, long_lat, placetype, code, gridmanId, street_charge) {
  return service2({
    url: `http://psy119.cn/earlyWarn/admin/project/check/addProject.action`,
    method: 'GET',
    params: {
      username, projName, projLocation, fireGuardId, legalPersonId, projRemark, long_lat, placetype, code, gridmanId, street_charge
    }
  })
}
//删除项目
export function deleProject(pid, username) {
  return service2({
    url: `http://psy119.cn/earlyWarn/admin/project/check/deleProject.action`,
    method: 'GET',
    params: {
      pid, username
    }
  })
}
//编辑项目
export function newUpdateProjectSim(pid, projLocation, userName, userTel, resPeople, resTel, long_lat, projName, gridmanname, gridman, street_chargenanem, street_charge, long_latbai) {
  return service2({
    url: `http://psy119.cn/earlyWarn/admin/project/check/newUpdateProjectSim.action`,
    method: 'GET',
    params: {
      pid, projLocation, userName, userTel, resPeople, resTel, long_lat, projName, gridmanname, gridman, street_chargenanem, street_charge, long_latbai
    }
  })
}
//新增设备
export function addDevice(projName, devSignature, username, installLocation, long_lat, devtype, device_name, place, superiorEquipme, loopNumber, devId, devRemark, sms, video, channle, phone) {
  return service2({
    url: `http://psy119.cn/earlyWarn/admin/device/check/addDevice.action`,
    method: 'GET',
    params: {
      projName, devSignature, username, installLocation, long_lat, devtype, device_name, place, superiorEquipme, loopNumber, devId, devRemark, sms, video, channle, phone
    }
  })
}
//获取录像机列表
export function getVideo() {
  return service2({
    url: `http://psy119.cn/earlyWarn/admin/device/getVideo.action`,
    method: 'GET',
    params: {

    }
  })
}
//设备列表弹窗
export function getDeviceByPid(pid, type, pagetype, username) {
  return service2({
    url: `http://psy119.cn/earlyWarn/admin/project/getDeviceByPid.action`,
    method: 'GET',
    params: {
      pid,
      type,
      pagetype,
      username
    }
  })
}
//列表详情
export function GetMapData(pid, type, username) {
  return service2({
    url: `http://psy119.cn/earlyWarn/admin/project/GetMapData.action`,
    method: 'GET',
    params: {
      pid,
      type,
      username
    }
  })
}
//设备详情
export function ElecData_type(devId, type) {
  return service2({
    url: `http://psy119.cn/earlyWarn/admin/device/ElecData.action`,
    method: 'GET',
    params: {
      devId,
      type,

    }
  })
}
export function getYGTemp(productNumber) {
  return service2({
    url: `http://psy119.cn/earlyWarn/WebProject/getYGTemp`,
    method: 'GET',
    params: {
      productNumber
    }
  })
}
export function getHeartBea(productNumber) {
  return service2({
    url: `http://psy119.cn/earlyWarn/WebProject/getHeartBeat`,
    method: 'GET',
    params: {
      productNumber
    }
  })
}
export function getAlarmAndFault(productNumber) {
  return service2({
    url: `http://psy119.cn/earlyWarn/WebProject/getAlarmAndFault`,
    method: 'GET',
    params: {
      productNumber
    }
  })
}
//接入设备->报警=>解除报警接口
export function WebeditFileimageServlet(username, cause) {
  return service2({
    url: `http://psy119.cn/earlyWarn/WebeditFileimageServlet`,
    method: 'GET',
    params: {
      username,
      cause,

    }
  })
}
//接入设备->报警=>数据详情接口
export function getDeviceByDevId(devid) {
  return service2({
    url: `http://psy119.cn/earlyWarn/admin/device/getDeviceByDevId.action`,
    method: 'GET',
    params: {
      devid,

    }
  })
}
//接入设备->报警=>数据详情接口
export function ReadParameterApi(id) {
  return service2({
    url: `http://psy119.cn/earlyWarn/ReadParameterApi.action`,
    method: 'GET',
    params: {
      id,

    }
  })
}
export function setTime(username, productNumbers, type, startTime, endTime) {
  return service2({
    url: `http://psy119.cn/earlyWarn/WebProject/setTime.action`,
    method: 'GET',
    params: {
      username, productNumbers, type, startTime, endTime
    }
  })
}
export function ElectricDeviceDate(devId, lstDate) {
  return service2({
    url: `http://psy119.cn/earlyWarn/admin/device/ElectricDeviceDate.action`,
    method: 'GET',
    params: {
      devId,
      lstDate,

    }
  })
}
//历史报警
export function getHistDeviceAlarm(productNumber, date) {
  return service2({
    url: `http://psy119.cn/earlyWarn/admin/deviceAlarm/getHistDeviceAlarm.action`,
    method: 'GET',
    params: {
      productNumber, date
    }
  })
}
//接入设备->报警=>设备设置(远程断电/消音)接口
export function resetclose(username,
  imei,
  states) {
  return service2({
    url: `http://psy119.cn/earlyWarn/resetclose.action`,
    method: 'GET',
    params: {
      username,
      imei,
      states
    }
  })
}
//接入设备->报警=>设备设置(远程开/关机)接口
export function putMessToDeviceOn(username,
  imei,
  content) {
  return service2({
    url: `http://psy119.cn/earlyWarn/admin/project/putMessToDevice.action`,
    method: 'GET',
    params: {
      username,
      imei,
      content
    }
  })
}
//接入设备->报警=>设备设置(远程复位)接口
export function resetclosefuwei(username,
  imei,
  states) {
  return service2({
    url: `http://psy119.cn/earlyWarn/resetclose.action`,
    method: 'GET',
    params: {
      username,
      imei,
      states
    }
  })
}
//接入设备->报警=>设备设置(授权)接口
export function insertClouddog(devices) {
  return service2({
    url: `http://psy119.cn/earlyWarn/WebProject/insertClouddog.action`,
    method: 'GET',
    params: {
      devices,

    }
  })
}
//接入设备->报警=>设备设置(开启屏蔽器)接口
export function updateShutdown(devices, my_username) {
  return service2({
    url: `http://psy119.cn/earlyWarn/WebProject/updateShutdown`,
    method: 'GET',
    params: {
      devices,
      my_username
    }
  })
}
//接入设备->报警=>设备设置(保险单号)接口
export function putMessToDevice(imei, content) {
  return service2({
    url: `http://psy119.cn/earlyWarn/admin/project/putMessToDevice.action`,
    method: 'GET',
    params: {
      imei,
      "content=InsuranceNo": content
    }
  })
}
//接入设备->报警=>设备设置(阀值设置)接口
export function SetParameterApiCopyFire(devSignature, parNine, parTen, parEleven,
  parTwelve, parThirteen, parFourteen, parFifteen, parSixteen, parSeventeen, parEighteen, parNineteen) {
  return service2({
    url: `http://psy119.cn/earlyWarn/SetParameterApi.action`,
    method: 'GET',
    params: {
      devSignature, parNine, parTen, parEleven,
      parTwelve, parThirteen, parFourteen, parFifteen, parSixteen, parSeventeen, parEighteen, parNineteen
      // devSignature, parNine, parFourteen, parSeventeen, parTen, parThirteen, U_voltage, parEleven, parTwelve
    }
  })
}
//接入设备->报警=>设备设置(报警推送)接口
export function UpdateDevicePush(devicename, app, username, sms, deviceId, phone) {
  return service2({
    url: `http://psy119.cn/earlyWarn/WebProject/UpdateDevicePush.action`,
    method: 'GET',
    params: {
      devicename,
      app,
      username,
      sms,
      deviceId,
      phone
    }
  })
}
//接入设备->报警=>设备设置(报警推送)接口
export function getHistoryFault(deviceId, lodDate, newDate) {
  return service2({
    url: `http://psy119.cn/earlyWarn/WebProject/getHistoryFault`,
    method: 'GET',
    params: {

      deviceId,
      lodDate,
      newDate
    }
  })
}
//获取操作记录
export function getUserInfo(my_username, pname, deviceId, oldDate, newDate) {
  return service2({
    url: `http://psy119.cn/earlyWarn/WebProject/getUserInfo.action`,
    method: 'GET',
    params: {
      my_username, pname, deviceId, oldDate, newDate
    }
  })
}
//燃气探测-探头
export function getGasInfo(device) {
  return service2({
    url: `http://psy119.cn/earlyWarn/WebProject/getGasInfo.action`,
    method: 'GET',
    params: {
      device
    }
  })
}
//设备报警详情
export function getBluebirdevent(imei) {
  return service2({
    url: `http://psy119.cn/earlyWarn/getBluebirdevent.action`,
    method: 'GET',
    params: {
      imei
    }
  })
}
export function getHistoryPress_value(imei) {
  return service2({
    url: `http://psy119.cn/earlyWarn/admin/device/getHistoryPress_value.action`,
    method: 'GET',
    params: {
      imei
    }
  })
}
//萤石云视频
export function getvideo() {
  return service2({
    url: `http://psy119.cn/earlyWarn/getvideo.action`,
    method: 'GET',

  })
}
export function setHeartTime(username, imei, time) {
  return service2({
    url: `http://psy119.cn/earlyWarn/WebProject/setHeartTime`,
    method: 'GET',
    params: {
      username, imei, time
    }
  })
}
//启动灭火器摄像头
export function setFireSwitch(productNumber, style) {
  return service2({
    url: `http://psy119.cn/earlyWarn/WebProject/setFireSwitch.action`,
    method: 'GET',
    params: {
      productNumber, style
    }
  })
}
export function getFireState(productNumber) {
  return service2({
    url: `http://psy119.cn/earlyWarn/WebProject/getFireState`,
    method: 'GET',
    params: {
      productNumber
    }
  })
}
//功率因素
export function getNonphasekw(imei) {
  return service2({
    url: `http://psy119.cn/earlyWarn/getReclosing.action`,
    method: 'GET',
    params: {
      imei
    }
  })
}
//获取设备状态
export function getParaState(username, imei) {
  return service2({
    url: `http://psy119.cn/earlyWarn/WebProject/getParaState.action`,
    method: 'GET',
    params: {
      username, imei
    }
  })
}
export function upSwitch(imei, state, content) {
  return service2({
    url: `http://psy119.cn/earlyWarn/upSwitch.action`,
    method: 'GET',
    params: {
      imei, state, content
    }
  })
}
//接入设备->报警=>设备设置(阀值设置)接口
export function SetParameterApi(devSignature, parNine, parFourteen, parSeventeen, parTen, parThirteen, U_voltage, parEleven, parTwelve) {
  return service2({
    url: `http://psy119.cn/earlyWarn/SetParameterApi.action`,
    method: 'GET',
    params: {
      // devSignature, parNine, parTen, parEleven,
      // parTwelve, parThirteen, parFourteen, parFifteen, parSixteen, parSeventeen, parEighteen, parNineteen
      devSignature, parNine, parFourteen, parSeventeen, parTen, parThirteen, U_voltage, parEleven, parTwelve
    }
  })
}
//电力检测获取详情
export function fracture(did, my_username, st_date, en_date) {
  return service2({
    url: `http://psy119.cn/earlyWarn/fracture.action`,
    method: 'GET',
    params: {
      did, my_username, st_date, en_date
    }
  })
}
//接入设备接口
export function DeviceNum(username, type, region) {
  return service2({
    url: `http://psy119.cn/earlyWarn/WebProject/DeviceNum.action`,
    method: 'GET',
    params: {
      username,
      type,
      region
    }
  })
}
export function SElec_DetailElecDevice(pid) {
  return service2({
    url: `http://psy119.cn/earlyWarn/admin/project/SElec_DetailElecDevice.action`,
    method: 'POST',
    data: `pid=${pid}`


  })
}
export function controlDev(imei, username, state) {
  return service2({
    url: `http://psy119.cn/earlyWarnWebProject/controlDev`,
    method: 'GET',
    params: {
      imei, username, state
    }
  })
}
export function setJXStime(imei, username, day, open, close) {
  return service2({
    url: `http://psy119.cn/earlyWarnWebProject/setJXStime`,
    method: 'GET',
    params: {
      imei, username, day, open, close
    }
  })
}
export function setFirePower(productNumber, firePower) {
  return service2({
    url: `http://psy119.cn/earlyWarn/setFirePower`,
    method: 'GET',
    params: {
      productNumber, firePower
    }
  })
}
export function getvideoBydevno(devno) {
  return service2({
    url: `http://psy119.cn/earlyWarngetvideoBydevno.action`,
    method: 'GET',
    params: {
      devno
    }
  })
}
export function getAlarmCount(username, type) {
  return service2({
    url: `http://psy119.cn/earlyWarn/zhilianyun/getAlarmCount`,
    method: 'GET',
    params: {
      username, type
    }
  })
}
export function getUserMovies(username) {
  return service2({
    url: `http://psy119.cn/earlyWarn/zhilianyun/getUserMovies`,
    method: 'GET',
    params: {
      username
    }
  })
}
