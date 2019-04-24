import HttpReq from '@/lib/https'
// 获取机台列表
function getMachineListApi (data) {
  return HttpReq.formPost({
    url: 'param_setting/get_machine_list',
    data
  })
}
// 机台详情
function getMachineDetailApi (data) {
  return HttpReq.formPost({
    url: 'param_setting/get_machine_info',
    data
  })
}
// 保存预警参数
function saveEarlyParamApi (data) {
  return HttpReq.formPost({
    url: 'param_setting/setting_warning_param',
    data
  })
}
// 保存游玩单价
function savePlayPriceApi (data) {
  return HttpReq.formPost({
    url: 'param_setting/setting_play_price',
    data
  })
}
// 获取运营参数
function getOperateParamApi (data) {
  return HttpReq.formPost({
    url: 'param_setting/get_machine_param',
    data
  })
}
// 下发运营参数
function setOperateParamApi (data) {
  return HttpReq.formPost({
    url: 'param_setting/setting_param',
    data
  })
}

export {
  getMachineListApi, // 机台列表
  getMachineDetailApi, // 机台详情
  saveEarlyParamApi, // 保存预警参数
  savePlayPriceApi, // 保存游玩单价
  getOperateParamApi, // 获取运营参数
  setOperateParamApi // 下发运营参数
}
