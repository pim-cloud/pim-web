import sessionEffect from "./sessionEffect"
import memberEffect from "./memberEffect";
import { ElMessageBox } from "element-plus";
import store from "../store";

export const sendMessage = {
    label: "发送消息",
    click: (menu, arg) => {
        sessionEffect().createSessions({ 'session_type': arg.data.type, 'accept_code': arg.data.code, 'nickname': arg.data.nickname, 'remarks': arg.data.remarks })
    }
}
export const setRemarks = {
    label: "设置备注",
    click: (menu, arg) => {
        ElMessageBox.prompt('请输入备注', { confirmButtonText: '确定', cancelButtonText: '取消' })
            .then(({ value }) => {
                console.log(arg.data);

                const dd = { 'type': 'remarks', 'acceptCode': arg.data.code, 'remarks': value }
                store.commit("sessionList/updateRemarks", dd);//修改session列表备注
                store.commit("sessionList/updateSelectInfo", dd);//修改session列表备注
                //修改通讯录列表
                if (arg.data.session_type === 'personal') {
                    store.commit("friendList/updateSelectInfo", dd);//修改好友列表备注
                }
                memberEffect().editContacts(dd)
            })
    }
}
export const delFriend = {
    label: "删除好友",
    click: (menu, arg) => {
        memberEffect().deleteFriend(arg.data.remarks, arg.data.code)
    }
}
export const quitGroup = {
    label: "退出群聊",
    click: (menu, arg) => {
        console.log('退出群聊');
    }
}
export const  msgTopping = {
    label: "消息置顶",
    click: (menu, arg) => {
        store.commit("sessionList/topSession", arg.data.code);
        sessionEffect().editSessions({ 'type': 'topping', 'value': 1, 'sessionId': arg.data.session_id })
    }
}
export const  nodisturb = {
    label: "消息免打扰",
    click: (menu, arg) => {
        console.log('消息免打扰');
    }
}
export const delSession = {
    label: "删除会话",
    click: (menu, arg) => {
        sessionEffect().deleteSessions(arg.data.code, arg.data.session_id)
    }
}