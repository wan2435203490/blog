import http from '@/utils/request'

const relativePath = "/user"

export function logout() {
  return http.get(relativePath + '/logout')
}

export function updateUserInfo(params) {
  return http.put(relativePath, params)
}

export function updateSecretInfo(params) {
  return http.put(relativePath + '/updateSecretInfo', params)
}

export function getUserByUsername(params) {
  return http.get(relativePath + '/getUserByUsername', params)
}


export function register(params) {
  return http.post(relativePath + '/register', params)
}

export function login(params) {
  return http.post(relativePath + '/login', params)
}

// refreshToken 刷新token
export function refreshToken(data) {
  return http.post(relativePath + '/refreshToken', data)
}

// getInfo 获取用户基本信息
export function getInfo() {
  return http.get(relativePath + '/getInfo')
}

export function token(params) {
  return http.post(relativePath + '/token', params)
}

export function getCaptcha(params, isForgetPassword) {
  if(isForgetPassword){
    return http.get(relativePath + '/getCaptchaForForgetPassword', params)
  }
  return http.get(relativePath + '/getCaptchaForBind', params)
}

export function updateForForgetPassword(params) {
  return http.put(relativePath + '/updateForForgetPassword', params)
}

export function getCaptchaImg() {
  return http.get(relativePath + '/getCaptchaImg')
}
