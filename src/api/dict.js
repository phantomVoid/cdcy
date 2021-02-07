import request from '@/utils/request'

// 查询字典数据详细
export function getDicts(id) {
  return request({
    url: '/system/dict/data/type/' + id,
    method: 'get'
  })
}
