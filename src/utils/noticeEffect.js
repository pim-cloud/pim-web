import store from "../store";

const noticeEffect = () => {
    //增加消息提示
    const sessionNotice = (accept_code) => {
        console.log(accept_code)
    }
    //修改侧边栏未读
    const clearTab = (views) => {
        store.commit("msgNotice/updateOneNumber", {project: views})
    }

    //渲染侧边栏未读
    const renderTab = (views) => {
        store.commit("msgNotice/updateOneNumber", {project: views})
    }

    return {
        sessionNotice,
        clearTab,
        renderTab,
    }
}
export default noticeEffect