// 约定一个通用的键名
const INFO_KEY = 'hm-shopping-info'
// 获取个人信息
export const getInfo = () => {
  const defaltObj = { token: '', userId: '' }
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaltObj
}
// 设置个人信息
export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}
// 移出个人信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}
