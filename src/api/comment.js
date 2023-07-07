import http from '@/utils/request'

const relativePath = "/comment"

export function saveComment(params) {
  return http.post(relativePath, params)
}

export function deleteComment(params) {
  return http.delete(relativePath, params)
}

export function getCommentCount(params) {
  return http.get(relativePath + '/count', params)
}

export function listComment(params) {
  return http.get(relativePath + '/list', params)
}
