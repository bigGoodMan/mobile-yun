export default {
  state: {
    storeId: '',
    areaId: '',
    machineId: ''
  },
  mutations: {
    COMMON_GETSTORE_MUTATE (state, data) {
      state.storeList = data
    }
  },
  actions: {
  }
}
