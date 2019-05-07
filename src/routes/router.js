import { Error404, Login } from './base'
import Machine from './modules/machine' // 我的机台
import Inventory from './modules/inventory' // 库存盘点
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
    children: [Login, ...Machine, ...Inventory]
  },
  Error404
]
