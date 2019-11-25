import { getSwitchgearListApi } from '@/api'
export default {
  state: {
    storeId: '', // 门店id
    areaId: '', // 区域id
    machineId: '', // 机台id
    switchgearList: [] // 开关机设备列表
  },
  mutations: {
    // 设置门店id
    SWITCHGEAR_SETSTOREID_MUTATE (state, storeId) {
      state.storeId = storeId
    },
    // 设置区域id
    SWITCHGEAR_AREAID_MUTATE (state, areaId) {
      state.areaId = areaId
    },
    // 设置机器id
    SWITCHGEAR_MACHINEID_MUTATE (state, machineId) {
      state.machineId = machineId
    },
    // 获取开关机列表
    SWITCHGEAR_GETSWITCHGEARLIST_MUTATE (state, data) {
      state.switchgearList = data
    },
    // 设置快关机列表信息
    SWITCHGEAR_SETSWITCHGEARLIST_MUTATE (state, data) {
      state.switchgearList = state.switchgearList.map(v => {
        if (v.area_id === data.area_id) {
          return v.items.map(its => {
            if (its.machine_id === data.machine_id) {
              return {
                ...its,
                turn_on_time: its.turn_on_time,
                turn_off_time: its.turn_off_time
              }
            }
            return its
          })
        }
        return v
      })
    }
  },
  actions: {
    // 获取开关机列表
    async SWITCHGEAR_GETSWITCHGEARLIST_ACTION ({ commit }, storeId) {
      const res = await getSwitchgearListApi({
        store_id: storeId
      })
      if (res.return_code === '0') {
        commit('SWITCHGEAR_GETSWITCHGEARLIST_MUTATE', res.data)
      }
      return res
    }
  }
}
