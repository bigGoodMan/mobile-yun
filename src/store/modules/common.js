import {
  getStoreApi,
  getAreaListByStoreApi,
  getMachineListByStoreAndAreaApi,
  getMachineTypeByStoreAndAreaApi
} from "@/api";
export default {
  state: {
    storeList: [],
    area: {},
    machine: {},
    machineType: {}
  },
  mutations: {
    // 根据门店和区域设置机台类型
    COMMON_SETMACHINETYPE_MUTATE(state, { data, key }) {
      state.machineType[key] = data.map(v => ({
        text: v.name,
        id: v.type_id,
        ...v
      }));
    },
    // 根据门店和区域设置机台列表
    COMMON_SETMACHINE_MUTATE(state, { data, key }) {
      state.machine[key] = data.map(v => ({
        text: v.no,
        ...v
      }));
    },
    // 根据门店设置区域列表
    COMMON_SETAREA_MUTATE(state, { data, key }) {
      state.area[key] = data.map(v => ({
        text: v.name,
        ...v
      }));
    },
    // 获取门店列表
    COMMON_GETSTORE_MUTATE(state, data) {
      state.storeList = data;
    }
  },
  actions: {
    // 根据门店和区域获取机台类型
    async COMMON_GETMACHINETYPE_ACTION({ commit, state }, { storeId, areaId }) {
      const key = `${storeId}&${areaId}`;
      const { machineType } = state;
      if (machineType[key]) {
        return {
          return_code: "0",
          data: machineType[key]
        };
      }
      const res = await getMachineTypeByStoreAndAreaApi({
        store_id: storeId,
        area_id: areaId
      });
      if (res.return_code === "0") {
        const { data } = res;
        commit("COMMON_SETMACHINETYPE_MUTATE", { data, key });
      }
      return {
        return_code: res.return_code,
        msg: res.msg,
        data: machineType[key]
      };
    },
    // 根据门店和区域获取机台列表
    async COMMON_GETMACHINE_ACTION({ commit, state }, { storeId, areaId }) {
      const key = `${storeId}&${areaId}`;
      const { machine } = state;
      if (machine[key]) {
        return {
          return_code: "0",
          data: machine[key]
        };
      }
      const res = await getMachineListByStoreAndAreaApi({
        store_id: storeId,
        area_id: areaId
      });
      if (res.return_code === "0") {
        const { data } = res;
        commit("COMMON_SETMACHINE_MUTATE", { data, key });
      }
      return {
        return_code: res.return_code,
        msg: res.msg,
        data: machine[key]
      };
    },
    // 根据门店获取区域列表
    async COMMON_GETAREA_ACTION({ commit, state }, { storeId }) {
      const key = storeId;
      const { area } = state;
      if (area[key]) {
        return {
          return_code: "0",
          data: area[key]
        };
      }
      const res = await getAreaListByStoreApi({ store_id: storeId });
      if (res.return_code === "0") {
        const { data } = res;
        commit("COMMON_SETAREA_MUTATE", { data, key });
      }
      return {
        return_code: res.return_code,
        msg: res.msg,
        data: area[key]
      };
    },
    // 获取门店列表
    async COMMON_GETSTORE_ACTION({ commit }) {
      const res = await getStoreApi();
      if (res.return_code === "0") {
        const { data } = res;
        commit("COMMON_GETSTORE_MUTATE", data);
      }
      return res;
    }
  }
};
