import HttpReq from '@/lib/https'
// 获取门店
function getStoreApi () {
  return HttpReq.formPost({
    url: 'param_setting/get_store_list'
  })
}
export {
  getStoreApi // 获取门店
}
