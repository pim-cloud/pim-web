const friendsList = {
    namespaced: true,
    state: {
        select: '',
    },
    mutations: {
        //修改当前选定信息
        updateSelect(state,detail) {
            state.select = detail
        },
    },
    getters: {
        select(state) {
            return state.select
        },
    }
}

export default friendsList;