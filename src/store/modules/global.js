const global = {
    state: {
        token: '',
        member: '',
        socket: false,
        acceptConfig:{},//用户信息
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        delToken(state) {
            state.token = "";
        },
        setMember(state, member) {
            state.member = member;
        },
        setSocket(state, socket) {
            state.socket = socket;
        },
        setAccept(state,list) {
            state.acceptConfig = list
        },
        addAccept(state,accept){
            state.acceptConfig[accept.accept_code] = accept
        },
        delAccept(state,code) {
            delete state.acceptConfig[code];
        }
    },
    getters: {
        getMemberInfo(state) {
            return state.member;
        },
        getSocket(state) {
            return state.socket;
        },
        getAcceptConfig(state,code) {
            return state.acceptConfig[code];
        }
    },
}
export default global

