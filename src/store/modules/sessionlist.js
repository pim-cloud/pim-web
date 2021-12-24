const sessionList = {
    namespaced: true,
    state: {
        select: '',
        sessionList: [],
        messageList: {},
    },
    mutations: {
        addSession(state,session) {
            try {
                state.sessionList.forEach(element => {
                    if (element.accept_code === session.accept_code) {
                        throw new Error("已存在，添加失败");
                    }
                });
                state.sessionList.push(session)
            } catch(e) {
                return false
            }
        },
        deleteSession(state,code){
            try {
                let list = state.sessionList
                if (list.length === 1) {
                    state.sessionList = []
                    return false;
                }
                for(var i = 0;i < list.length ; i++){
                    if(list[i].accept_code === code){
                        list.splice(i, 1);
                    }
                }
                state.sessionList = []
                state.sessionList = list
              
            } catch(e) {
                return false
            }
        },
        topSession(state, code) {
            try {
                let length = state.sessionList.length
                if (length === 1) {
                    return false;
                }
                let list = []
                for(var i = 0;i < length ; i++){
                    if(state.sessionList[i].accept_code === code){
                        list.unshift(state.sessionList[i])
                    } else {
                        list.push(state.sessionList[i])
                    }
                }
                state.sessionList = list
            } catch(e) {
                console.log('置顶失败');
                return false
            }
        },
        deleteMessages(state, code) {
            delete state.messageList[code];
        },
        addMessages(state, list) {
            //增加消息记录
            let arr = list.accept.code in state.messageList
            if (!arr) {
                state.messageList[list.accept.code] = list;
            }
        },
        addMessage(state, message) {
            //添加一条消息记录
            const { accept_code } = message

            const msg = {
                accept_code: message.accept_code,
                content: message.content,
                content_type: message.content_type,
                created_at: message.created_at,
                msg_id: message.msg_id,
                read_state: "unread",
                main_code: message.main_code,
            };
            //本地是否有聊天记录
            if (accept_code in state.messageList) {
                state.messageList[accept_code].lists.push(msg);
            }
        },
        setSelect(state,data){
           state.select = data 
        },
        deleteSelect(state, code) {
            if (state.select.accept_code === code) {
                state.select = '';
            }
        },
    }
    ,
    actions: {
        //删除会话
        deleteSession({ commit }, code) {
            commit('deleteSession', code)//删除session
            commit('deleteSelect', code)//删除当前选择
            commit('deleteMessages', code)//删除消息记录
        },
        //给消息列表添加一条消息
        addMessage({ commit }, message) {
            commit('addMessage', message)
        }
    },
    getters: {
        select(state) {
            return state.select;
        },
        sessionList(state) {
            return state.sessionList
        },
        messageList (state) {
            if (state.select.accept_code in state.messageList) {
                return state.messageList[state.select.accept_code].lists
            }
        },
        messageInfo(state) {
            return state.messageList[state.select.accept_code]
        }
    }
}

export default sessionList;