import http from '@/utils/request'

const relativePath = "/admin"

export function listUser(params) {
  return http.get(relativePath + '/user/list', params)
}

export function changeUserStatus(params) {
  return http.put(relativePath + '/user/changeUserStatus', params)
}

export function changeUserAdmire(params) {
  return http.put(relativePath + '/user/changeUserAdmire', params)
}

export function changeUserType(params) {
  return http.put(relativePath + '/user/changeUserType', params)
}

export function getAdminWebInfo() {
  return http.get(relativePath + '/webInfo/getAdminWebInfo')
}

export function changeArticleStatus(params) {
  return http.put(relativePath + '/article/changeArticleStatus', params)
}

export function getArticleById(params) {
  return http.get(relativePath + '/article/getArticleById', params)
}

export function deleteComment(params) {
  return http.delete( relativePath + '/comment/delete', params)
}

export function listArticle(params) {
  return http.get(relativePath + '/article/list', params)
}

export function listComment(params) {
  return http.get(relativePath + '/comment/list', params)
}

export function listBossTreeHole(params) {
  return http.get(relativePath + '/treeHole/boss/list', params)
}

