import HttpReq from '@/lib/https'
// 获取礼品创建列表
function getGiftCreateListApi (data) {
  return HttpReq.formPost({
    url: 'Gift_storage/getGiftList',
    data
  })
}
// 获取创建礼品信息
function getGiftCreateInfoApi (data) {
  return HttpReq.formPost({
    url: 'Gift_storage/getGiftInfo',
    data
  })
}
// 添加礼品创建
function addGiftCreateApi (data) {
  return HttpReq.formPost({
    url: 'Gift_storage/addGift',
    data
  })
}
// 修改礼品创建
function editGiftCreateApi (data) {
  return HttpReq.formPost({
    url: 'Gift_storage/saveGiftInfo',
    data
  })
}
// 获取礼品入库记录
function getGiftStorageRecordApi (data) {
  return HttpReq.formPost({
    url: 'Storage/getGiftStockRecord',
    data
  })
}
// 添加礼品入库单
function addGiftStorageOrderApi (data) {
  return HttpReq.formPost({
    url: 'Storage/addGiftStock',
    data
  })
}
export {
  getGiftCreateListApi,
  getGiftCreateInfoApi,
  addGiftCreateApi,
  editGiftCreateApi,
  getGiftStorageRecordApi,
  addGiftStorageOrderApi
}
