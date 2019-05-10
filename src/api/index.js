// 用户
import {
  loginApi
} from './user'
// 公共接口
import {
  getStoreApi
} from './common'
import {
  getMachineDetailApi,
  getMachineListApi,
  saveEarlyParamApi,
  savePlayPriceApi,
  getOperateParamApi,
  setOperateParamApi
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
export {
  loginApi, // 登录

  getStoreApi, // 获取门店

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
  getInventoryDetailGiftListApi // 盘点单详情礼品列表
}
