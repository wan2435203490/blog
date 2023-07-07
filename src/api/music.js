import http from '@/utils/request'

const relativePath = "/music"

export function randomMusic(params) {
  return http.get(relativePath + '/song/randomMusic', params)
}
