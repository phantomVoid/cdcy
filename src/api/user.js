import request from '@/utils/request'

export function userEdit(data) {
  return request({
    url: '/system/front',
    method: 'put',
    data: data
  })
}

export function getRecordList(query) {
  return request({
    url: '/system/game/userList',
    method: 'post',
    data: query
  })
}


export function getUserBonusDetail(query) {
  return request({
    url: '/system/integral/list',
    method: 'get',
    params: query
  })
}


export function getPayDetail(query) {
  return request({
    url: '/system/tran/list',
    method: 'get',
    params: query
  })
}

