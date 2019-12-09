import { Error404, Login } from './base'
import Machine from './modules/machine' // 我的机台
import Inventory from './modules/inventory' // 库存盘点
import Gift from './modules/gift' // 自建礼品
import Other from './modules/other' //
import FirmwareUpdate from './modules/firmware-update' // 固件更新
import IntelligentGrasp from './modules/intelligent-grasp' // 智能抓感
import Switchgear from './modules/switchgear' // 开关机设置
import MachineOperate from './modules/machine-operate' // 机台操作
import TrainingCamp from './modules/training-camp' // 商家训练营
const Container = () => import(/* webpackChunkName: "container" */'@yun/container')
export default [
  {
    path: '/my-machine',
    name: 'default',
    alias: '/',
    component: Container,
    meta: {
      title: '洞见云'
    },
    children: [Login, ...Machine, ...Inventory, ...Gift, ...Other, ...IntelligentGrasp, ...FirmwareUpdate, ...Switchgear, ...MachineOperate, ...TrainingCamp]
  },
  Error404
]
