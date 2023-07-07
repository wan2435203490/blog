import http from '@/utils/request'

// login 登陆
export function login(data) {
  return http.post(
    '/login',
    data
  )
}

// logout 退出
export function logout() {
  return http.post({
    url: '/logout',
  })
}

// refreshtoken 刷新token
export function refreshtoken(data) {
  return http.post(
    '/refreshToken',
    data
  )
}

// getInfo 获取用户基本信息
export function getInfo() {
  return http.get(
     '/getinfo',
  )
}

