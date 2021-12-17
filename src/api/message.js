import request from '../utils/request'

/**发送消息 */
export function sendMessage(data) {
    return request({
        url: 'message/sendMessage',
        method: 'post',
        data
    })
}

/**发送文件 */
export function fileUpload(data) {
    return request({
        url: 'file/upload',
        method: 'post',
        headers: {"Content-Type": "multipart/form-data;charse=UTF-8"},
        data
    })
}

/**所有通过websocket推送的数据都需要ack确认，否则服务端会反复推送同一条消息 */
export function getMessageAck(params) {
    return request({
        url: 'message/ack',
        method: 'get',
        params
    })
}

/**获取历史消息列表*/
export function getMsgRecord(data) {
    return request({
        url: '/message/getMsgRecord',
        method: 'get',
        params: data
    })
}
