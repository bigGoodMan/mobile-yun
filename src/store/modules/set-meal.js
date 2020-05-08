
import { getRechargePackageList, setRechargePackage } from '@/api'
export default {
  state: {
    rechargePackageId: '', // 当前充值套餐id
    rechargePackageList: [], // 充值套餐列表
    experienceTicketList: [] // 体验券列表
  },
  mutations: {
    // 获取充值套餐列表
    SET_MEAL_GETRECHARGEPACKAGELIST_MUTATION (state, { list, id }) {
      state.rechargePackageList = list.map(v => {
        let packages = v.package.map((its, inx) => {
          let coins = its['coins' + (inx + 1)] - 0
          const coin = coins ? coins + '币' : ''
          const discount = coins ? ((v.money / coins * 100) | 0) / 10 + '折' : ''
          const checked = !!its.check
          const items = {
            ...its,
            coin,
            discount,
            checked
          }
          return items
        }).filter(v => v.coin)
        return { ...v, package: packages, checked: !!v.rec }
      })
      state.rechargePackageId = id
    },
    // 保存体验券
    SET_MEAL_SAVERECHARGEPACKAGELIST_MUTATION (state, { list, id }) {
      state.rechargePackageList = list
      state.rechargePackageId = id
    },
    // 设置一条体验券
    SET_MEAL_SETEXPERIENCETICKETITEM_MUTATION (state, item) {

    }
  },
  actions: {
    // 获取充值套餐列表
    async SET_MEAL_GETRECHARGEPACKAGELIST_ACTION ({ commit }, storeId) {
      const res = await getRechargePackageList({ store_id: storeId })
      if (res.return_code === '0') {
        commit('SET_MEAL_GETRECHARGEPACKAGELIST_MUTATION', { list: res.data.list, id: res.data.id })
      }
      return res
    },
    // 保存充值套餐
    async SET_MEAL_SAVERECHARGEPACKAGELIST_ACTION ({ commit, state }, { storeId, list, data }) {
      let id
      if (state.id - 0 > 0) {
        id = state.id
      }
      const res = await setRechargePackage({ store_id: storeId, id, data })
      if (res.return_code === '0') {
        commit('SET_MEAL_SAVERECHARGEPACKAGELIST_MUTATION', { list, id: res.data.id })
      }
      return res
    },
    // 获取体验券列表
    async SET_MEAL_GETEXPERIENCETICKETLIST_ACTION ({ commit }) {
      commit([])
    }
  }
}
