import http from '@/utils/request'

const relativePath = "/qiniu"

export function getUpToken() {
  return http.get(relativePath + '/getUpToken')
}
