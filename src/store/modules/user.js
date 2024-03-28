import { getInfo, setInfo } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      // 个人权证相关
      userInfo: getInfo()
    }
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }
  },
  actions: {
    logout (contex) {
      // 个人信息要重置
      contex.commit('setUserInfo', {})
      // 购物车信息要重置（跨模块调用 mutation）
      contex.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: {}
}
