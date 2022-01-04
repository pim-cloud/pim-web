const common = {
    namespaced: true,
    state: {
        friendList: '',//共享的好友及设置列表
        groupList: '',//共享的群组及设置列表
    },
    mutations: {
        setFriendList (state,lists) {
            state.friendList = lists
        },
        addFriend(state,list) {
            if (!list.accept_code in state.friendList) {
                state.friendList[list.accept_code] = list;
            }
        },
        deleteFriend(state, code) {
            delete state.friendList[code];
        },
        updateFriend(state) {},
        setGroupList (state) {},
        addGroup(state) {},
        deleteGroup(state) {},
        updateGroup(state) {},
        updateFriendRemarks(state,data) {
            let {code,remarks} = data
            state.friendList[code].showName = remarks
            state.friendList[code].config.remarks = remarks
        },
        updateConfig(state, data){
            let code = data.acceptCode
            if (data.accept_type === 'personal') {
                switch (data.type) {
                    case 'remarks':
                        state.friendList[code].showName = data.configValue
                        state.friendList[code].config.remarks = data.configValue
                        break;
                    case 'disturb':
                        state.friendList[code].config.disturb = data.configValue
                        break;
                    case 'topping':
                        state.friendList[code].config.topping = data.configValue
                        break;
                    case 'star':
                        state.friendList[code].config.star = data.configValue
                        break;
                }
              }
              if (data.accept_type === 'group') {
                console.log('修改群组配置');
              }
        },
    },
    actions: {
        init (state) {

        }
    },
    getters: {
        groupLists(state){
            return state.groupList
        },
        friendList(state) {
            return state.friendList
        },
        friendItem: (state) => {
            return state.friendList[code]
        }
    },
}
export default common

