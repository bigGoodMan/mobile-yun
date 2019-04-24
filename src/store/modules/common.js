import { getStoreApi } from '@/api'
export default {
  state: {
    storeList: []
  },
  mutations: {
    COMMON_GETSTORE_MUTATE (state, data) {
      state.storeList = data
    }
  },
  actions: {
    async COMMON_GETSTORE_ACTION ({ commit }) {
      let res = await getStoreApi()
      if (res.return_code === '0') {
        let { data } = res
        commit('COMMON_GETSTORE_MUTATE', data)
      }
      return res
    }
  }
}
