import { Home, Error404, Login } from './base'
import Machine from './modules/machine'
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
    children: [Login, Home, ...Machine]
  },
  Error404
]
