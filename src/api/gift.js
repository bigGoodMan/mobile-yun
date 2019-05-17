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
export {
  getGiftCreateListApi,
  getGiftCreateInfoApi,
  addGiftCreateApi
}
