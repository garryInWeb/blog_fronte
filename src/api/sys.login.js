import request from '@/plugin/axios'

export function AccountLogin (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
