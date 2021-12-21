import request from '../utils/request'

/**发送好友请求 */
export function requestAddFriends(data) {
    return request({
        url: '/contacts/sendAddFriendRequest',
        method: 'post',
        data
    })
}

/**搜索用户符合条件的用户或群 */
export function search(data) {
    return request({
        url: 'contacts/search',
        method: 'get',
        params: data
    })
}

/**获取好友申请列表 */
export function getFriendsRequestList(data) {
    return request({
        url: 'contacts/getFriendsRequestList',
        method: 'get',
        params: data
    })
}

/**获取联系人详情 */
export function getFriendDetail(data) {
    return request({
        url: 'contacts/getFriendDetail',
        method: 'get',
        params: data
    })
}

/**申请好友处理 */
export function friendRequestProcessing(data) {
    return request({
        url: 'contacts/friendRequestProcessing',
        method: 'post',
        data
    })
}

/**联系人列表 */
export function getContactsList() {
    return request({
        url: 'contacts/getContactsList',
        method: 'get'
    })
}

/**编辑联系人*/
export function editFriend(data) {
    return request({
        url: '/contacts/edit',
        method: 'post',
        data
    })
}


/**群组列表 */
export function getContactGroups() {
    return request({
        url: 'contacts/getContactGroups',
        method: 'get'
    })
}

/**根据uid获取用户信息，如果uid不传默认获取当前登录用户 */
export function getMemberDetailByUid(data) {
    return request({
        url: 'member/getMemberInfo',
        method: 'get',
        params: data
    })
}

/**创建群聊 api  */
export function createGroup(data) {
    return request({
        url: '/group/create',
        method: 'post',
        data
    })
}

/**获取群组详情 */
export function getGroupDetail(data) {
    return request({
        url: '/group/getGroupDetail',
        method: 'get',
        params: data
    })
}

/**退出|移除群聊 api  */
export function deleteGroupMember(data) {
    return request({
        url: '/group/deleteGroupMember',
        method: 'get',
        params: data
    })
}
/**退出系统 api  */
export function logout() {
    return request({
        url: '/login/logout',
        method: 'get',
    })
}

/**修改密码*/
export function updateP(data) {
    return request({
        url: '/member/updateP',
        method: 'post',
        data
    })
}
/**修改签名*/
export function updateAutograph(data) {
    return request({
        url: '/member/updateAutograph',
        method: 'post',
        data
    })
}
/**修改头像*/
export function updateImage(data) {
    return request({
        url: '/member/updateImage',
        method: 'post',
        data
    })
}
