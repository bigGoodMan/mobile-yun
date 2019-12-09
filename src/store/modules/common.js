import { getStoreApi, getAreaListByStoreApi, getMachineListByStoreAndAreaApi } from '@/api'
export default {
  state: {
    storeList: [],
    areaList: [],
    machineList: []
  },
  mutations: {
    // 根据门店和区域获取机台列表
    COMMON_GETMACHINE_MUTATE (state, data) {
      state.machineList = data.map(v => ({
        text: v.no,
        ...v
      }))
    },
    // 根据门店获取区域列表
    COMMON_GETAREA_MUTATE (state, data) {
      state.areaList = data.map(v => ({
        text: v.name,
        ...v
      }))
    },
    // 获取门店列表
    COMMON_GETSTORE_MUTATE (state, data) {
      state.storeList = data
    }
  },
  actions: {
    // 根据门店和区域获取机台列表
    async COMMON_GETMACHINE_ACTION ({ commit }, { storeId, areaId }) {
      let res = await getMachineListByStoreAndAreaApi({ store_id: storeId, area_id: areaId })
      if (res.return_code === '0') {
        let { data } = res
        commit('COMMON_GETMACHINE_MUTATE', data)
      }
      return res
    },
    // 根据门店获取区域列表
    async COMMON_GETAREA_ACTION ({ commit }, { storeId }) {
      let res = await getAreaListByStoreApi({ store_id: storeId })
      if (res.return_code === '0') {
        let { data } = res
        commit('COMMON_GETAREA_MUTATE', data)
      }
      return res
    },
    // 获取门店列表
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
