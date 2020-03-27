import HttpReq from '@/lib/https'
/**
 * 获取充值套餐列表
 * @param {{store_id: number;}} data 数据对象
 * @returns {Promise}
 */
function getRechargePackageList (data) {
  return HttpReq.formPost({
    url: 'recharge_set_meal/recharge_set_meal',
    data
  })
}
/**
 * 设置充值套餐
 * @param {{store_id: number;}} data 数据对象
 * @returns {Promise}
 */
function setRechargePackage (data) {
  return HttpReq.formPost({
    url: 'recharge_set_meal/set_recharge',
    data
  })
}
export {
  getRechargePackageList,
  setRechargePackage
}
