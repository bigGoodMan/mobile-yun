import { Home, Error404 } from './base'
import { MyMachine } from './modules/machine'
const Container = () => import(/* webpackChunkName: "container" */'@yun/container')
export default [
  {
    path: '/home',
    name: '_home',
    alias: '/',
    component: Container,
    meta: {
      title: '洞见云'
    },
    children: [Home, MyMachine]
  },
  Error404
]
