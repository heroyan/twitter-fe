import request from '@/utils/request'

export function addPost(data) {
    return request({
        url: '/api/post/addPost',
        method: 'post',
        data: data
    })
}

export function addLike(data) {
    return request({
        url: '/api/post/addLike',
        method: 'post',
        data: data
    })
}

export function addStar(data) {
    return request({
        url: '/api/post/addStar',
        method: 'post',
        data: data
    })
}

export function addComment(data) {
    return request({
        url: '/api/post/addComment',
        method: 'post',
        data: data
    })
}