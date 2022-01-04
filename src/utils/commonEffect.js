import store from "../store";
import { computed, ref } from 'vue'
import {
    getContactGroups,
    getContactsList,
    getFriendsRequestList,//好友请求列表
} from '../api/relation'
import {getSessionLists,} from '../api/session'

const commonEffect = () => {
    const friendLists = computed(() => store.getters['common/friendList'])
    const groupLists = computed(() => store.getters['common/groupList'])


    const init = () => {
        initFriendList()
        initGroupList()
        initSessionList()
    }
    const initFriendList = () => {
        getContactsList().then((res) => {
            if (res['code'] === 200 && res['data'].length != 0) {
                store.commit('common/setFriendList', res['data'])
            }
        })
    }
    const initGroupList = () => {
        getContactGroups().then((res) => {
            if (res['code'] === 200 && res['data'].length != 0) {
                store.commit('common/setGroupList', res['data'])
            }
        })
    }
    const initSessionList = () => {
        getSessionLists().then((res) => {
            if (res.code === 200 && res.data != '[]') {
                store.commit('sessionList/setSessionList', res.data)
            }
        });
    }
    return {
        init,
        initFriendList,
        initGroupList,
        friendLists,
        groupLists,
    }
}
export default commonEffect