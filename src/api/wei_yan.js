import http from '@/utils/request'

const relativePath = "/weiYan"

export function saveWeiYan(params) {
  return http.post(relativePath, params)
}

export function saveNews(params) {
  return http.post(relativePath + '/news', params)
}

export function listNews(params) {
  return http.get(relativePath + '/listNews', params)
}

export function deleteWeiYan(params) {
  return http.delete(relativePath, params)
}

export function listWeiYan(params) {
  return http.get(relativePath + '/list', params)
}
