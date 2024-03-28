import request from '@/utils/request'

// 获取收货地址列表
export const getAddressList = () => {
  return request.get('/address/list')
}
