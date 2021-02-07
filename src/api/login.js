import request from '@/utils/request'

export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/frontLogin',
    method: 'post',
    data: data
  })
}

export function getUserId(){
  return request({
    url: '/frontGetInfo',
    method: 'get'
  })
}

export function getInfo(id) {
  return request({
    url: '/system/front/' + id,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function getCodeImg() {
  return request({
    url: '/captchaImage',
    method: 'get'
  })
}
