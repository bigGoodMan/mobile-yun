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
export {
  loginApi, // 登录

  getStoreApi, // 获取门店

  getMachineListApi, // 机台列表
  getMachineDetailApi, // 机台详情
  saveEarlyParamApi, // 保存预警参数
  savePlayPriceApi, // 保存游玩单价
  getOperateParamApi, // 获取运营参数
  setOperateParamApi // 下发运营参数
}
