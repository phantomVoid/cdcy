import request from '@/utils/request'

export function pay(data) {
  return request({
    url: '/system/tran/newTran',
    method: 'post',
    data: data
  })
}

export function newTranZfb(data){
  return request({
    url: '/system/tran/newTranZfb',
    method: 'post',
    params: data
  })
}
