import { inventoryGiftApi } from '@/api'
export default {
  state: {
    inventoryGiftList: [], // 盘点列表礼品
    inventoryMoreGiftList: [], // 更多盘点列表礼品
    inventoryingStoreName: '' // 在盘门店名字
  },
  mutations: {
    // 储存盘点列表礼品
    INVENTORY_GETINVENTORYGIFT_MUTATE (state, { giftData, moreGiftData }) {
      state.inventoryGiftList = giftData.list
      state.inventoryMoreGiftList = moreGiftData.list
      state.inventoryingStoreName = giftData.store_name
    },
    // 添加更多盘点礼品
    INVENTORY_ADDINVENTORYMOREGIFT_MUTATE (state, list) {
      state.inventoryGiftList = list.concat(state.inventoryGiftList)
    }
  },
  actions: {
    // 获取盘点单礼品列表
    async INVENTORY_GETINVENTORYGIFT_ACTION ({ commit }, { sid, id }) {
      let res = await inventoryGiftApi({
        store_id: sid
      })
      let res2 = await inventoryGiftApi({
        type: '1',
        store_id: sid,
        inventory_id: id
      })
      if (res.return_code === '0') {
        let { data } = res
        commit('INVENTORY_GETINVENTORYGIFT_MUTATE', { giftData: data, moreGiftData: res2.data })
      }
      return res
    }
  }
}
