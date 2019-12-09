import HttpReq from '@/lib/https'
// 重置局数
function resetNumber (data) {
  return HttpReq.formPost({
    url: 'resetnum/reset_number',
    data
  })
}
// 下发强抓
function commandStrongGrasp (data) {
  return HttpReq.formPost({
    url: 'set_strong_grasp/setting_operation',
    data
  })
}
export {
  resetNumber, // 重置局数
  commandStrongGrasp // 下发强抓
}
