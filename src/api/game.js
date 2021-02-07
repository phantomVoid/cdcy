import request from '@/utils/request'

export function joinGame(data) {
  return request({
    url: '/system/front/joinGame',
    method: 'post',
    data: data
  })
}
