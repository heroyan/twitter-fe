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

export function updateInfo(data) {
    return request({
        url: '/api/user/updateInfo',
        method: 'post',
        data: data
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

export function addFollow(data) {
    return request({
        url: '/api/user/addFollow',
        method: 'post',
        data: data
    })
}

export function unFollow(data) {
    return request({
        url: '/api/user/unFollow',
        method: 'post',
        data: data
    })
}

export function followerNum(query) {
    return request({
        url: '/api/user/followerNum',
        method: 'get',
        params: query
    })
}

export function followeeNum(query) {
    return request({
        url: '/api/user/followeeNum',
        method: 'get',
        params: query
    })
}

export function isLike(query) {
    return request({
        url: '/api/user/isLike',
        method: 'get',
        params: query
    })
}

export function isStar(query) {
    return request({
        url: '/api/user/isStar',
        method: 'get',
        params: query
    })
}

export function isFollow(query) {
    return request({
        url: '/api/user/isFollow',
        method: 'get',
        params: query
    })
}

export function myFollower(query) {
    return request({
        url: '/api/user/myFollower',
        method: 'get',
        params: query
    })
}

export function myFollowee(query) {
    return request({
        url: '/api/user/myFollowee',
        method: 'get',
        params: query
    })
}