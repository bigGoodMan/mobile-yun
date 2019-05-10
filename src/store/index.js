import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import app from './modules/app'
import machine from './modules/machine'
import common from './modules/common'
import inventory from './modules/inventory'

Vue.use(Vuex)
// 数据初始化保存
const initData = {
  user: user.state,
  app: app.state,
  machine: machine.state,
  common: common.state,
  inventory: inventory.state
}
export default new Vuex.Store({
  state: {
  },
  mutations: {
    CLEARSTATE_MUTATE (state) {
      for (let key in state) {
        for (let name in state[key]) {
          state[key][name] = initData[key][name]
        }
      }
    }
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    machine,
    common,
    inventory
  }
})
