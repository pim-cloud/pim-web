import store from "../store";

const noticeEffect = () => {

    const setNewsFriendList = (number) => {
        store.commit("notice/updateNewFriendList", number)
    }

    return {
        setNewsFriendList,
    }
}
export default noticeEffect