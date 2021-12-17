import request from '../utils/request'

/**注册 */
export function register(data) {
    return request({
        url: '/login/register',
        method: 'post',
        data
    })
}

/**登录 */
export function login(data) {
    return request({
        url: '/login/login',
        method: 'post',
        data
    })
}

export function code(data) {
    return request({
        url: '/login/code',
        method: 'get',
        params: data
    })
}