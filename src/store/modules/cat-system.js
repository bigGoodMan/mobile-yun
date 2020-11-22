import { getCatSid, setCatSid } from "@/lib/core";
export default {
  state: {
    cSid: getCatSid()
  },
  mutations: {
    CAT_SYSTEM_SETCATSTOREID_MUTATION(state, data) {
      state.cSid = data;
      setCatSid(data);
    }
  },
  actions: {}
};
