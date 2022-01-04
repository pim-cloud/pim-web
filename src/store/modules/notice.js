const notice = {
    namespaced: true,
    state: {
        newsFriendsNumber: 0,
    },
    mutations: {
        updateNewFriendList(state,number) {
            state.newsFriendsNumber = number
        }
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

export default notice;