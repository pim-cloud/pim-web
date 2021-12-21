const friendsList = {
    namespaced: true,
    state: {
        thisSelectCode: 0,//当前选中code
        thisSelectType: 'personal',//默认是个人
        selectCodeDetail: '',//当前选中详情
        contactGroupList: {},//好友群组列表
        contactFriendsList: '',//好友列表
    },
    mutations: {
        setContactFriendsList(state, list) {
            state.contactFriendsList = list;
        },
        //好友群组列表缓存
        setContactGroupList(state, list) {
            state.contactGroupList = list;
        },
        updateSelectCodeDetail(state, detail) {
            state.selectCodeDetail = detail;
        },
        //修改当前聊天对象code和类型
        updateThisSelectCodeAndType(state, obj) {
            var {code, type} = obj
            state.thisSelectCode = code;
            state.thisSelectType = type;
        }
    },
    getters: {
        //获取当前选中详情
        getDetail(state) {
            return state.selectCodeDetail
        },
        getContactFriendsList(state) {
            return state.contactFriendsList;
        }
    }
}

export default friendsList;