import http from '@/utils/request'

const relativePath = "/resource"

export function saveResource(params) {
  return http.post(relativePath, params)
}

export function deleteResource(params) {
  return http.delete(relativePath, params)
}

export function getResourceInfo(params) {
  return http.get(relativePath, params)
}

export function getImageList(params) {
  return http.get(relativePath + '/getImageList', params)
}

export function listResource(params) {
  return http.get(relativePath + '/list', params)
}

export function changeResourceStatus(params) {
  return http.put(relativePath + '/changeResourceStatus', params)
}
