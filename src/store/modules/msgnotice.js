const msgNotice = {
    namespaced: true,
    state: {
        //home按钮
        home: true,
        friends: false,
        setting: false,
        newsFriendsNumber: false,//内页
    },
    mutations: {
        updateOneNumber(state, obj) {
            const {project} = obj;
            if (project == 'SessionLists') {
                state.sessionNumber = true
            }
            if (project == 'FriendsLists') {
                state.friendsNumber = true
            }
            if (project == 'Setting') {
                state.settingNumber = true
            }
        },
    },
    actions: {
        //修改新的朋友消息提示
        updateNewsFriendNumber({commit, state}) {
            commit('updateOneNumber', {type: "+", project: "friendsNumber"})
            state.newsFriendsNumber += 1
        },
    },
    getters: {
        getLeftNotice(state) {
            return state.home
        }
    },
}

export default msgNotice;