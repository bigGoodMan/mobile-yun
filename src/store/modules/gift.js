import { getGiftCreateInfoApi } from '@/api'
export default {
  state: {
    giftDetail: {},
    giftStorageList: []
  },
  mutations: {
    // 储存礼品创建详情
    GIFT_GETGIFTCREATEINFO_MUTATE (state, data) {
      state.giftDetail = data
    },
    // 储存当前门店礼品入库
    GIFT_GIFTSTORAGELIST_MUTATE (state, addArr) {
      addArr.forEach(v => {
        const isExist = state.giftStorageList.some(its => its.gift_id === v.gift_id)
        if (!isExist) {
          state.giftStorageList.unshift(v)
        }
      })
    },
    // 删除当前门店礼品入库
    GIFT_DELETEGIFTSTORAGELIST_MUTATE (state, obj) {
      state.giftStorageList = state.giftStorageList.filter(v => v.gift_id !== obj.gift_id)
    }
    // 修改当前礼品列表
    // GIFT_EDITGIFTSTORAGELIST_MUTATE (state, obj) {
    //   state.giftStorageList = state.giftStorageList.map(v => {
    //     return
    //   })
    // }

  },
  actions: {
    // 获取礼品创建详情
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
