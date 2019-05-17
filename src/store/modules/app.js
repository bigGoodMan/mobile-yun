import { getOssInfoApi } from '@/api'
export default {
  state: {
    errorList: [], // 日错误志列表
    collapsed: false, // 是否展示popup菜单栏
    imagePreviewShow: false, // 预览图片展示默认关闭
    previewImage: [], // 预览的图片
    accessKeyID: '', // oss id
    policy: '', // oss policy
    signature: '', // oss signature
    securityToken: '', // oss securityToken
    callback: '' // oss callback
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
    },
    // 设置oss信息
    APP_SETOSSINFO_MUTATE (state, { accessKeyID, policy, signature, securityToken, callback }) {
      state.accessKeyID = accessKeyID
      state.policy = policy
      state.signature = signature
      state.securityToken = securityToken
      state.callback = callback
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
    },
    async APP_SETOSSINFO_ACTION ({ state, commit }) {
      if (state.accessKeyID) {
        const {
          accessKeyID,
          policy,
          signature,
          securityToken,
          callback
        } = state
        return {
          return_code: '0',
          data: {
            AccessKeyId: accessKeyID,
            policy: policy,
            signature: signature,
            SecurityToken: securityToken,
            callback: callback
          }
        }
      }
      const res = await getOssInfoApi()
      if (res.return_code === '0') {
        const { data } = res
        commit('APP_SETOSSINFO_MUTATE', {
          accessKeyID: data.AccessKeyId,
          policy: data.policy,
          signature: data.signature,
          securityToken: data.SecurityToken,
          callback: data.callback
        })
      }
      return res
    }
  }
}
