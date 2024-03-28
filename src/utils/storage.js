// 约定一个通用的键名
const INFO_KEY = 'hm-shopping-info'
const HISTORY_KEY = 'hm_history_arr'
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
// 获取搜索历史
export const getHistory = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}
// 设置搜索历史
export const setHistory = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}
