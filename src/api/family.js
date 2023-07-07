import http from '@/utils/request'

const relativePath = "/family"

export function saveFamily(params) {
  return http.post(relativePath, params)
}

export function deleteFamily(params) {
  return http.delete(relativePath, params)
}

export function getFamily() {
  return http.get(relativePath)
}

export function listFamily(params) {
  return http.get(relativePath + '/list', params)
}

export function changeLoveStatus(params) {
  return http.put(relativePath + '/changeLoveStatus', params)
}

export function getAdminFamily() {
  return http.get(relativePath + '/getAdminFamily')
}

export function listRandomFamily() {
  return http.get(relativePath + '/listRandomFamily')
}
