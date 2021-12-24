import store from "../store";
import { computed, ref } from 'vue'
import {
    getContactGroups,
    getContactsList,
} from '../api/relation'

const commonEffect = () => {
    const friendLists = computed(() => store.getters['common/friendList'])
    const groupLists = computed(() => store.getters['common/groupList'])


    const init = () => {
        initFriendList()
        initGroupList()
    }
    const initFriendList = () => {
        getContactsList().then((res) => {
            if (res['code'] === 200 && res['data'].length != 0) {
                store.commit('common/setFriendList', res['data'])
            }
        })
        return this
    }
    const initGroupList = () => {
        getContactGroups().then((res) => {
            if (res['code'] === 200 && res['data'].length != 0) {
                store.commit('common/setGroupList', res['data'])
            }
        })
        return this
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