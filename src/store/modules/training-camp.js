import { getTrainInfoApi } from '@/api'
export default {
  state: {
    keywordsList: [],
    userInfo: {},
    contactInfo: {
      mobile: '',
      email: ''
    }
  },
  mutations: {
    TRAININGCAMP_INFO_MUTATION (state, data) {
      state.keywordsList = data.keyWords
      state.userInfo = data.user
      state.contactInfo = data.contact
    }
  },
  actions: {
    // 获取训练营信息
    async TRAININGCAMP_INFO_ACTION ({ commit, state }) {
      const res = await getTrainInfoApi()
      if (res.return_code === '0') {
        commit('TRAININGCAMP_INFO_MUTATION', res.data)
      }
      return res
    }
  }
}
