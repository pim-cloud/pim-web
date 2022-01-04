import store from '../store/index'
import memberEffect from "./memberEffect";
import { getMessageAck } from '../api/message'
import sessionEffect from "../utils/sessionEffect";
import noticeEffect from "./noticeEffect";
import { ElMessage } from "element-plus";

// 回调消息已送达
const handleAcceptMsg = async (msg_id) => {
    try {
        await getMessageAck({ msgId: msg_id })
    } catch (error) {
        console.log(error)
    }
}

// websocket
const socketEffect = () => {
    let websocket = null;
    let number = 0;//重连次数

    const connectSocket = () => {
        try {
            console.log(import.meta.env.VITE_APP_SOCKET_URL + store.state.global.token)
            websocket = new WebSocket(import.meta.env.VITE_APP_SOCKET_URL + store.state.global.token);
            websocket.onopen = function () {
                number = 0;
                store.commit('setSocket', true)
            };
            websocket.onmessage = function (event) {
                const { data } = event;

                let result = null;
                try {
                    result = JSON.parse(data);
                } catch (error) {
                    result = null;
                }
                console.log(result);
                if (result) {
                    const { msg_id } = result
                    // 回执消息是否送达
                    if (msg_id) {
                        handleAcceptMsg(msg_id)
                    }
                    switch (result.message_type) {
                        case "chat":
                            ElMessage.info('收到一条消息')
                            let accept_code = ''
                            if (result.accept_type === 'group') {
                                this.accept_code = result.accept_code
                                //群聊需要服务端用户基础信息
                                store.dispatch('sessionList/addMessage', result)
                            } else {
                                this.accept_code = result.main_code
                                result.accept_code = result?.main_code;
                                store.dispatch('sessionList/addMessage', result)
                            }
                            sessionEffect().createSessions({ type: result.accept_type, code: this.accept_code })
                            break;
                        case "add_friend":
                            sessionEffect().setNewFriendList()//刷新好友
                            noticeEffect().setNewsFriendList(1)//刷新未读消息
                            break;
                        case "add_friend_reply":
                            //memberEffect().getContactFriendsList()//刷新好友列表
                            //缓存选择聊天对象信息
                            sessionEffect().createSessions({
                                accept_type: 'personal',
                                accept_code: result.send_code,
                            })
                            break;
                        case "create_group":
                            console.log('创建群聊消息');
                            break;
                    }
                } else {
                    console.log('暂不支持当前消息类型')
                }
            };
            websocket.onclose = function () {
                number = number + 1;
                if (number >= 3) {
                    //重连三次后停止重连
                    ElMessage({
                        message: '网络重连失败，请刷新页面重新连接',
                        duration:0,
                        type: 'error',
                    })
                    return false;
                }
                store.commit('setSocket', false)
                connectSocket();
            };
        } catch (exception) {
            console.log("websocket connect failed");
        }
    };


    const closeSocket = () => {
        try {
            websocket.close();
        } catch (error) {
            console.log(error);
        }
    };
    return { connectSocket, closeSocket };
};

export default socketEffect