import HttpReq from '@/lib/https'
// 获取开关机设备列表 传入store_id
function getSwitchgearListApi (data) {
  return HttpReq.formPost({
    url: 'switchgear/operation_list',
    data
  })
}
// 远程开关机 传入mid action （1开 2关）
function setSwitchgearOnOffApi (data) {
  return HttpReq.formPost({
    url: 'switchgear/machine_on_off',
    data
  })
}
// 获取门店下所有开关机设备 store_id
function getSwitchgearDetailApi (data) {
  return HttpReq.formPost({
    url: 'switchgear/detail_list',
    data
  })
}
// 获取门店下所有开关机设备 mid  store_id area_id turn_on_time turn_off_time
function getSwitchgearTimeApi (data) {
  return HttpReq.formPost({
    url: 'switchgear/set_switchgrea',
    data
  })
}
export {
  getSwitchgearListApi,
  setSwitchgearOnOffApi,
  getSwitchgearDetailApi,
  getSwitchgearTimeApi
}
