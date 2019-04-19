import Vue from 'vue'
import Router from 'vue-router'
import allRouter from './router'
import { setTitle } from '@/lib/utils'
Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    ...allRouter
  ]
})
router.afterEach(route => {
  setTitle(route.meta.title)
  window.scrollTo(0, 0)
})
export default router
