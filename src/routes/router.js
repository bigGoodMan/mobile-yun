import { Error404, Login } from './base'
import Machine from './modules/machine'
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
    children: [Login, ...Machine]
  },
  Error404
]
