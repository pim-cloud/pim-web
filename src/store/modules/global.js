const global = {
    state: {
        token: '',
        member: '',
        socket: false,
        slideRight: false,//右侧边栏
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
        updateSlideRight(state) {
            //开关右侧边栏
            !state.slideRight ? state.slideRight = true : state.slideRight = false
        }
    },
    getters: {
        socket(state) {
            return state.socket;
        },
        member(state){
            return state.member
        }
    },
}
export default global

