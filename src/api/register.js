import request from '@/utils/request'

export function register(data) {
  return request({
    url: '/frontReg',
    method: 'post',
    data: data
  })
}


export function getRegCode(data) {
  return request({
    url: '/getRegCode',
    method: 'post',
    data: data
  })
}
