import request from '../utils/request'

/**获取session列表*/
export function getSessionLists() {
    return request({
        url: '/session/getSessionList',
        method: 'get'
    })
}

/**增加一条session记录*/
export function createSession(data) {
    return request({
        url: '/session/create',
        method: 'post',
        data
    })
}

/**删除一条会话记录*/
export function deleteSession(data) {
    return request({
        url: '/session/delete',
        method: 'post',
        data
    })
}

/**会话编辑*/
export function editSession(data) {
    return request({
        url: '/session/editSession',
        method: 'post',
        data
    })
}

/**会话置顶*/
export function toppingSession(data) {
    return request({
        url: '/session/sessionTopping',
        method: 'post',
        data
    })
}