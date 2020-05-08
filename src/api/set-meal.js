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
 * @param {{store_id: number; id?: number, data: {pos: number, id: number, rec: number}[]}} data 数据对象
 * @returns {Promise}
 */
function setRechargePackage (data) {
  return HttpReq.formPost({
    url: 'recharge_set_meal/set_recharge',
    data
  })
}
/**
 * 获取消费套餐列表
 * @param {{store_id: number; limit: number; page: number}} data 数据对象
 * @returns {Promise}
 */
function getConsumptionPackageList (data) {
  return HttpReq.formPost({
    url: 'consum_combo/combo_list',
    data
  })
}
/**
 * 编辑消费套餐
 * @param {{store_id: number; rules: {limit: number; discount: number}[]; id: number, title: string}} data 数据对象
 * @returns {Promise}
 */
function editConsumptionPackage (data) {
  return HttpReq.formPost({
    url: 'consum_combo/consum_combo_edit',
    data
  })
}
/**
 * 新增消费套餐
 * @param {{store_id: number; rules: {limit: number; discount: number}[]; title: string}} data 数据对象
 * @returns {Promise}
 */
function addConsumptionPackage (data) {
  return HttpReq.formPost({
    url: 'consum_combo/consum_combo_add',
    data
  })
}
/**
 * 删除消费套餐
 * @param {{id: number;}} data 数据对象
 * @returns {Promise}
 */
function deleteConsumptionPackage (data) {
  return HttpReq.formPost({
    url: 'consum_combo/consum_combo_del',
    data
  })
}
/**
 * 获取机台消费套餐包
 * @param {{mid: number; store_id: number;}} data 数据对象
 * @returns {Promise}
 */
function getMachineConsumptionPackage (data) {
  return HttpReq.formPost({
    url: 'consum_combo/get_combo_list',
    data
  })
}
/**
 * 保存机台消费套餐
 * @param {{mid: number;combo_id: number; start_time: number; end_time: number; exchange: 0 | 1}} data 数据对象
 * @returns {Promise}
 */
function saveMachineConsumptionPackage (data) {
  return HttpReq.formPost({
    url: 'consum_combo/set_combo',
    data
  })
}
/**
 * 获取体验券列表
 * @param {{store_id: number; limit: number; page: number}} data 数据对象
 * @returns {Promise}
 */
function getExperienceTicketList (data) {
  return HttpReq.formPost({
    url: 'experience_combo/get_list',
    data
  })
}
/**
 * 体验券生效
 * @param {{id: number}} data 数据对象
 * @returns {Promise}
 */
function takeEffectExperienceTicket (data) {
  return HttpReq.formPost({
    url: 'experience_combo/set_activity',
    data
  })
}
/**
 * 体验券停用
 * @param {{id: number}} data 数据对象
 * @returns {Promise}
 */
function discontinueExperienceTicket (data) {
  return HttpReq.formPost({
    url: 'experience_combo/disable',
    data
  })
}
/**
 * 保存体验券
 * @param {{id?: number, name: string, start_time: number, end_time: number, num: number, card_info: {start: number, end: number, coin: number, num: number}[]}} data 数据对象
 * @returns {Promise}
 */
function saveExperienceTicket (data) {
  return HttpReq.formPost({
    url: 'experience_combo/add_combo',
    data
  })
}
export {
  getRechargePackageList,
  setRechargePackage,
  getConsumptionPackageList,
  getExperienceTicketList,
  takeEffectExperienceTicket,
  discontinueExperienceTicket,
  saveExperienceTicket,
  editConsumptionPackage,
  addConsumptionPackage,
  deleteConsumptionPackage,
  getMachineConsumptionPackage,
  saveMachineConsumptionPackage
}
