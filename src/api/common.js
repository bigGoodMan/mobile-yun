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
export {
  getStoreApi,
  getChildBrandListApi
}
