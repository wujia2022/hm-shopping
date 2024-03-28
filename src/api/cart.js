import request from '@/utils/request'

// 加入商品到购物车
// goodsId 商品id  iPhone8
// goodsSkuld 商品规格id 红色iPhone8 粉色iPhone8
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}
// 获取购物车列表
export const getCartList = () => {
  return request.get('/cart/list')
}
// 修改购物车商品数量
export const changeCount = (goodsNum, goodsId, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsNum,
    goodsId,
    goodsSkuId
  })
}
// 删除购物车商品
export const delSelect = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
