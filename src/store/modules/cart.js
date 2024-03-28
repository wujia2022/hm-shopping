import { changeCount, delSelect, getCartList } from '@/api/cart'
import { Toast } from 'vant'
export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    setCartList (state, newList) {
      state.cartList = newList
    },
    toggleCheck (state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    toggleAllCheck (state, flag) {
      state.cartList.forEach(item => { item.isChecked = flag })
    },
    changeCount (state, { goodsId, goodsNum }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  actions: {
    async getCartAction (contex) {
      const { data } = await getCartList()
      // 后台返回的数据中，不包含复选框的选中状态，为了实现将来的功能
      // 需要手动维护数据，给每一项添加一个isChecked状态（标记当前商品是否选中）
      data.list.forEach(item => {
        item.isChecked = true
      })
      contex.commit('setCartList', data.list)
    },
    async changeCountAction (contex, obj) {
      const { goodsNum, goodsId, goodsSkuId } = obj
      // 先本地修改
      contex.commit('changeCount', { goodsId, goodsNum })
      // 再同步到后台
      await changeCount(goodsNum, goodsId, goodsSkuId)
    },
    async delSelect (contex) {
      const cartIds = contex.getters.selCartList.map(item => item.id)
      await delSelect(cartIds)
      Toast('删除成功')
      // 重新拉取最新的购物车数据 (重新渲染)
      contex.dispatch('getCartAction')
    }
  },
  getters: {
    // 求所有的商品累加总数
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品项
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中的总数
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的总价
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0).toFixed(2)
    },
    // 是否全选
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
