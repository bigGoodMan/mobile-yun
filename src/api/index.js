// 用户
import {
  loginApi
} from './user'
// 公共接口
import {
  getStoreApi,
  getChildBrandListApi
} from './common'
import {
  uploadImgToOssApi,
  getOssInfoApi
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
export {
  loginApi, // 登录

  getStoreApi, // 获取门店
  getChildBrandListApi, // 获取子品牌列表

  uploadImgToOssApi, // 上传图片到oss
  getOssInfoApi, // 获取oss签名等相关信息

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
  putEquipmentUpdateApi // 设置门店设备更新
}
