const sessionList = {
    namespaced: true,
    state: {
        list: {},//会话列表
        selectInfo: '',//当前选中信息
        messageList: {},
        views: 'SessionLists',//当前选择组件
    },
    mutations: {
        list(state, list) {
            if (list.length != 0) {
                state.list = list;
            }
        },
        addSession(state, session) {
            //增加消息记录
            let arr = session.accept_code in state.list
            if (!arr) {
                state.list[session.accept_code] = session;
            }
        },
        delSession(state, code) {
            delete state.list[code];
        },
        topSession(state,code){
            console.log(code);
        },
        updateRemarks(state,data) {
            const { acceptCode, remarks } = data;
            console.log(acceptCode);
            console.log(remarks);
            if (state.list[acceptCode]) {
                state.list[acceptCode].accept_info.remarks = remarks;
            }
        },
        delMessages(state, code) {
            //删除本地聊天记录列表
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
        setSelectInfo(state, data) {
            console.log(data);
            //设置当前选择的会话
            state.selectInfo = {
                session_id: data.session_id,
                accept_code: data.accept_code,
                nickname: data.nickname,
                remarks: data.remarks,
                session_type: data.session_type,
            }
        },
        delSelectInfo(state, code) {
            //防止误删，判断排除一下
            let { accept_code } = state.selectInfo;
            if (accept_code == code) {
                state.selectInfo = '';
            }
        },
        updateSelectInfo(state,data) {
            console.log('修改选择');
            console.log(data);
            console.log(state.selectInfo);
            if (state.selectInfo.accept_code === data.acceptCode) {
                state.selectInfo.remarks = data.remarks;
            }
        }
    }
    ,
    actions: {
        //修改会话
        saveList({ commit }, list) {
            commit('list', list);
        },
        //删除会话
        deleteSession({ commit }, code) {
            commit('delSession', code)//删除session
            commit('delSelectInfo', code)//删除当前选择
            commit('delMessages', code)//删除消息记录
        },
        //给消息列表添加一条消息
        addMessage({ commit, state }, message) {
            //添加一条消息
            commit('addMessage', message)
            //判断当前是否处于聊天框中，增加未读提示红点
            if (state.selectInfo.accept_code != message.accept_code) {
                //增加小红点未读数
            }
        }
    },
    getters: {
        //获取会话列表
        getSessionList(state) {
            return state.list;
        },
        getSelectInfo(state) {
            return state.selectInfo;
        },
        getMessageLists(state) {
            return state.messageList[state.selectInfo.accept_code];
        },
        getList(state) {
            if (JSON.stringify(state.messageList) != '{}') {
                if (state.selectInfo.accept_code in state.messageList) {
                    return state.messageList[state.selectInfo.accept_code].lists
                }
            }
        },
        getListItem(state, code){
            console.log(code);
            let res = code in state.list
            if (!res) {
                return false
            }
            return true
        }
    }
}

export default sessionList;