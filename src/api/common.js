import HttpReq from '@/lib/https'
// 获取门店
function getStoreApi (data) {
  return HttpReq.formPost({
    url: 'param_setting/get_store_list',
    data
  })
}
// 获取子品牌列表
function getChildBrandListApi (data) {
  return HttpReq.formPost({
    url: 'Gift_storage/getBrandList',
    data
  })
}
// 根据门店store_id获取区域列表
function getAreaListByStoreApi (data) {
  return HttpReq.formPost({
    url: 'Smart_grip/getAreaList',
    data
  })
}
// 根据门店store_id区域area_id获取机台列表
function getMachineListByStoreAndAreaApi (data) {
  return HttpReq.formPost({
    url: 'Smart_grip/getMachineByArea',
    data
  })
}
// 根据门店store_id区域area_id获取机型
function getMachineTypeByStoreAndAreaApi (data) {
  return HttpReq.formPost({
    url: 'gift_sell_advise/get_machine_type',
    data
  })
}

export {
  getStoreApi,
  getChildBrandListApi,
  getAreaListByStoreApi,
  getMachineListByStoreAndAreaApi,
  getMachineTypeByStoreAndAreaApi
}
