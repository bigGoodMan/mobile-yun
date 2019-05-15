export default {
  state: {
    errorList: [], // 日错误志列表
    collapsed: false, // 是否展示popup菜单栏
    imagePreviewShow: false, // 预览图片展示默认关闭
    previewImage: [] // 预览的图片
  },
  mutations: {
    APP_IMAGEPREVIEW_MUTATE (state, { imagePreviewShow, previewImage }) {
      state.previewImage = previewImage
      state.imagePreviewShow = imagePreviewShow
    },
    APP_CLEARSTATE_MUTATE (state) {

    },
    // 操作是否展示popup菜单栏
    APP_SHOWCOLLAPSED_MUTATE (state, collapsed) {
      state.collapsed = collapsed
    },
    // 错误日志列表添加
    APP_ADDERRORLOG_MUTATE (state, error) {
      state.errorList.unshift(error)
    }
  },
  actions: {
    // 添加错误日志
    APP_ADDERRORLOG_ACTION ({ rootState, commit }, info) {
      const { user: { userId, userName, userHeadImage } } = rootState
      let data = {
        ...info,
        userId,
        time: new Date().getTime(),
        userName,
        userHeadImage
      }
      commit('APP_ADDERRORLOG_MUTATE', data)
    }
  }
}
