import request from '@/utils/request'

export function loginUser(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    params: data
  })
}

export function logout() {
    return request({
        url: '/api/user/logout',
        method: 'get'
    })
}

export function getUser(query) {
    return request({
        url: '/api/user/info',
        method: 'get',
        params: query
    })
}

