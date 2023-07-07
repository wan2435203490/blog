import http from '@/utils/request'
import common from "@/utils/common";

const relativePath = "/webInfo"
const resourcePath = relativePath + "/resourcePath"
const sort = relativePath + "/sort"
const label = relativePath + "/label"
const treeHole = relativePath + "/treeHole"

export function updateWebInfo(params) {
  return http.put(relativePath, params)
}

export function saveResourcePath(params, isUpdate) {
  if (isUpdate){
    return http.put(resourcePath, params)
  }
  return http.post(resourcePath, params)
}

export function deleteResourcePath(params) {
  return http.delete(resourcePath, params)
}

export function listResourcePath(params) {
  return http.get(resourcePath + '/list', params)
}

export function saveFriend(params) {
  return http.put(relativePath + '/saveFriend', params)
}

export function saveFunny(params) {
  return http.put(relativePath + '/saveFunny', params)
}

export function saveLovePhoto(params) {
  return http.put(relativePath + '/saveLovePhoto', params)
}

export function saveSort(params) {
  if (common.isEmpty(params.id)){
    return http.post(sort, params)
  }
  return http.put(sort, params)
}

export function deleteSort(params) {
  return http.delete(sort, params)
}

export function getSortInfo() {
  return http.get(sort)
}

export function listSort(params) {
  return http.get(sort + '/list', params)
}

export function listSortAndLabel() {
  return http.get(relativePath + '/listSortAndLabel')
}

export function listLabel(params) {
  return http.get(label + '/list', params)
}

export function saveLabel(params) {
  if (common.isEmpty(params.id)){
    return http.post(label, params)
  }
  return http.put(label, params)
}

export function deleteLabel(params) {
  return http.delete(label, params)
}

export function getWebInfo(params) {
  return http.get(relativePath, params)
}

export function getAdmire() {
  return http.get(relativePath + '/getAdmire')
}

export function getWaifuJson(params) {
  return http.get(relativePath + '/getWaifuJson', params)
}

// export function listFunny(params) {
//   return http.get(relativePath + '/listFunny', params)
// }

export function listCollect(params) {
  return http.get(relativePath + '/listCollect', params)
}

export function listAdminLovePhoto() {
  return http.get(relativePath + '/listAdminLovePhoto')
}

export function deleteTreeHole(params) {
  return http.delete(treeHole, params)
}

export function saveTreeHole(params) {
  return http.post(treeHole, params)
}

export function listTreeHole() {
  return http.get(treeHole+"/list")
}
