import request from '@/utils/request'

export function loginUser(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data: data
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

export function myPost(query) {
    return request({
        url: '/api/user/myPost',
        method: 'get',
        params: query
    })
}

export function register(data) {
    return request({
        url: '/api/user/register',
        method: 'post',
        data: data
    })
}

export function myLike(query) {
    return request({
        url: '/api/user/myLike',
        method: 'get',
        params: query
    })
}

export function myStar(query) {
    return request({
        url: '/api/user/myStar',
        method: 'get',
        params: query
    })
}

export function myFollow(query) {
    return request({
        url: '/api/user/myFollow',
        method: 'get',
        params: query
    })
}

export function hotPost(query) {
    return request({
        url: '/api/user/hotPost',
        method: 'get',
        params: query
    })
}