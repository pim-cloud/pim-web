import sessionEffect from "./sessionEffect"
import memberEffect from "./memberEffect";
import { ElMessageBox } from "element-plus";
import store from "../store";

export const sendMessage = {
    label: "发送消息",
    click: (menu, arg) => {
        sessionEffect().createSessions({ type: 'personal', code: arg.data.acceptCode })
    }
}
export const setRemarks = {
    label: "设置备注",
    click: (menu, arg) => {
        ElMessageBox.prompt('请输入备注', { confirmButtonText: '确定', cancelButtonText: '取消' })
            .then(({ value }) => {
                let data = { 'id': arg.data.id, 'type': 'remarks', 'accept_type': arg.data.accept_type, 'acceptCode': arg.data.code, configValue: value }
                memberEffect().editContacts(data)
            })
    }
}
export const delFriend = {
    label: "删除好友",
    click: (menu, arg) => {
        memberEffect().deleteFriend(arg.data.showName, arg.data.acceptCode)
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
        let data = { 'id': arg.data.id, 'type': 'topping', 'accept_type': arg.data.accept_type, 'acceptCode': arg.data.code, configValue: 1 }
        memberEffect().editContacts(data)
    }
}
export const  nodisturb = {
    label: "消息免打扰",
    click: (menu, arg) => {
        let data = { 'id': arg.data.id, 'type': 'disturb', 'accept_type': arg.data.accept_type, 'acceptCode': arg.data.code, configValue: 1 }
        memberEffect().editContacts(data)
    }
}
export const delSession = {
    label: "删除会话",
    click: (menu, arg) => {
        sessionEffect().deleteSessions(arg.data.code, arg.data.session_id)
    }
}