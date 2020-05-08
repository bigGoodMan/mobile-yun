// 用户
import {
  loginApi
} from './user'
// 公共接口
import {
  getStoreApi,
  getChildBrandListApi,
  getAreaListByStoreApi,
  getMachineListByStoreAndAreaApi,
  getMachineTypeByStoreAndAreaApi
} from './common'
import {
  uploadImgToOssApi,
  getOssInfoApi,
  testApi
} from './app'
import {
  getMachineDetailApi,
  getMachineListApi,
  saveEarlyParamApi,
  savePlayPriceApi,
  getOperateParamApi,
  setOperateParamApi,
  getEquipmentUpdateListApi,
  judgeEquipmentUpdateStatusApi,
  getEquipmentUpdateProgressApi,
  putEquipmentUpdateApi
} from './machine'
import {
  createInventoryOrderApi,
  inventoryGiftApi,
  submitInventoryApi,
  closeInventoryApi,
  addInventoryDataApi,
  getInventoryListApi,
  getInventoryDetailApi,
  getInventoryDetailGiftListApi
} from './inventory'
import {
  getGiftCreateListApi,
  getGiftCreateInfoApi,
  addGiftCreateApi,
  editGiftCreateApi,
  getGiftStorageRecordApi,
  addGiftStorageOrderApi
} from './gift'
import {
  getGraspGiftListApi,
  startConfigureGraspApi,
  getConfigureGraspResultApi
} from './intelligent-grasp'
import {
  getSwitchgearListApi,
  setSwitchgearOnOffApi,
  getSwitchgearDetailApi,
  getSwitchgearTimeApi
} from './switchgear'
import {
  resetNumber,
  commandStrongGrasp,
  getFreeInfiniteGraspList,
  setFreeInfiniteGraspApi
} from './machine-operate'
import {
  getTrainInfoApi,
  operetionFavouriteApi,
  getTrainFavouriteListApi,
  getTrainSearchListApi,
  getTrainTypeListApi,
  getTrainHomeApi,
  getTrainStudyDetailApi
} from './training-camp'
import {
  getSalesSuggestionList
} from './business-data' // 营业数据
import {
  getRechargePackageList,
  setRechargePackage,
  getConsumptionPackageList,
  editConsumptionPackage,
  addConsumptionPackage,
  deleteConsumptionPackage,
  getExperienceTicketList,
  takeEffectExperienceTicket,
  discontinueExperienceTicket,
  saveExperienceTicket,
  getMachineConsumptionPackage,
  saveMachineConsumptionPackage
} from './set-meal' // 套餐设置
export {
  loginApi, // 登录

  getStoreApi, // 获取门店
  getChildBrandListApi, // 获取子品牌列表
  getAreaListByStoreApi, // 根据门店获取区域列表
  getMachineListByStoreAndAreaApi, // 根据门店区域获取机台列表
  getMachineTypeByStoreAndAreaApi, // 根据门店区域获取机型

  uploadImgToOssApi, // 上传图片到oss
  getOssInfoApi, // 获取oss签名等相关信息
  testApi,

  getMachineListApi, // 机台列表
  getMachineDetailApi, // 机台详情
  saveEarlyParamApi, // 保存预警参数
  savePlayPriceApi, // 保存游玩单价
  getOperateParamApi, // 获取运营参数
  setOperateParamApi, // 下发运营参数

  createInventoryOrderApi, // 创建盘点单
  inventoryGiftApi, // 盘点礼品列表（同添加礼品列表）
  submitInventoryApi, // 提交盘点单
  closeInventoryApi, // 关闭盘点单
  addInventoryDataApi, // 增加盘点数
  getInventoryListApi, // 盘点单列表
  getInventoryDetailApi, // 盘点单详情
  getInventoryDetailGiftListApi, // 盘点单详情礼品列表

  getGiftCreateListApi, // 获取礼品创建列表
  getGiftCreateInfoApi, // 获取创建礼品信息
  addGiftCreateApi, // 添加礼品创建
  editGiftCreateApi, // 修改礼品创建
  getGiftStorageRecordApi, // 获取礼品入库记录
  addGiftStorageOrderApi, // 添加礼品入库单
  getEquipmentUpdateListApi, // 获取门店设备更新列表
  judgeEquipmentUpdateStatusApi, // 判断门店设备是否在更新
  getEquipmentUpdateProgressApi, // 获取门店设备更新进度
  putEquipmentUpdateApi, // 设置门店设备更新

  getGraspGiftListApi, // 获取抓感配置礼品列表
  startConfigureGraspApi, // 开始配置只能抓感
  getConfigureGraspResultApi, // 获取配置抓感结果

  getSwitchgearListApi,
  setSwitchgearOnOffApi,
  getSwitchgearDetailApi,
  getSwitchgearTimeApi,

  resetNumber, // 重置局数
  commandStrongGrasp, // 下发强抓

  getTrainInfoApi, // 获取商家训练营信息
  operetionFavouriteApi, // 商家训练营收藏或取消收藏
  getTrainFavouriteListApi, // 商家训练营收藏列表
  getTrainSearchListApi, // 获取商家训练营搜索列表
  getTrainTypeListApi, // 商家训练营类别列表
  getTrainHomeApi, // 商家训练营 首页数据
  getTrainStudyDetailApi, // 商家训练营 学习手册详情列表
  getFreeInfiniteGraspList, // 免费无限抓列表
  setFreeInfiniteGraspApi, // 设置无限抓

  getRechargePackageList, // 获取充值套餐列表
  setRechargePackage, // 设置充值套餐
  getConsumptionPackageList, // 获取消费套餐列表
  editConsumptionPackage, // 编辑消费套餐
  addConsumptionPackage, // 新增消费套餐
  deleteConsumptionPackage, // 删除消费套餐
  getMachineConsumptionPackage, // 获取机台消费套餐
  saveMachineConsumptionPackage, // 保存机台套餐
  getExperienceTicketList, // 获取体验券列表
  takeEffectExperienceTicket, // 体验券生效
  discontinueExperienceTicket, // 禁用体验券
  saveExperienceTicket, // 保存体验券

  getSalesSuggestionList // 销售提升建议列表
}
