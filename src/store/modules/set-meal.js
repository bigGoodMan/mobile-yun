
import { getRechargePackageList } from '@/api'
export default {
  state: {
    rechargePackageId: '', // 当前充值套餐id
    rechargePackageList: [], // 充值套餐列表
    experienceTicketList: [] // 体验券列表
  },
  mutations: {
    // 获取体验券列表
    SET_MEAL_GETEXPERIENCETICKETLIST_MUTATION (state, { list, id }) {
      state.rechargePackageList = list.map(v => {
        let packages = v.package.map((its, inx) => {
          const coin = its['coins' + (inx + 1)]
          const discount = ((v.money / coin * 10) | 0) / 10
          const checked = !!its.check
          const items = {
            ...its,
            coin,
            discount,
            checked
          }
          return items
        })
        return { ...v, package: packages, checked: !!v.rec }
      })
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
        commit('SET_MEAL_GETEXPERIENCETICKETLIST_MUTATION', { list: res.data.list, id: res.data.id })
      }
      return res
    },
    // 获取体验券列表
    async SET_MEAL_GETEXPERIENCETICKETLIST_ACTION ({ commit }) {
      commit([])
    }
  }
}
