import { getGiftCreateInfoApi } from '@/api'
export default {
  state: {
    giftDetail: {}
  },
  mutations: {
    GIFT_GETGIFTCREATEINFO_MUTATE (state, data) {
      state.giftDetail = data
    }
  },
  actions: {
    async GIFT_GETGIFTCREATEINFO_ACTION ({ commit }, { id }) {
      let res = await getGiftCreateInfoApi({
        gift_id: id
      })
      if (res.return_code === '0') {
        let { data } = res
        commit('GIFT_GETGIFTCREATEINFO_MUTATE', data)
      }
      return res
    }
  }
}
