import { ElMessage, ElMessageBox } from "element-plus";
import store from '../store/index'
import { computed } from 'vue'
import {
    editFriend,
    getFriendDetail,
    deleteGroupMember,
    getContactGroups,
    getContactsList,
    getGroupDetail,
    getMemberDetailByUid
} from '../api/relation'

const memberEffect = () => {
    //好友群组列表
    const contactGroups = computed(() => store.state.friendsList.contactGroupList)
    const contactFriends = computed(() => store.state.friendsList.contactFriendsList)

    //获取群组列表
    const getContactGroupLists = () => {
        //置空
        store.state.friendsList.contactGroupList = {};
        return getContactGroups().then((res) => {
            //如果好友列表不为空则默认选中第一个
          if (res["data"].length != 0) {
                //调用详情接口
                store.commit('friendsList/setContactGroupList', res["data"])
                return res['data'];
            }
        })
    }

    //获取好友列表
    const getContactFriendsList = () => {
        return getContactsList().then((res) => {
            if (res['data'].length != 0) {
                store.state.friendsList.contactFriendsList = {}
                store.commit('friendsList/setContactFriendsList', res["data"])
                return res['data']
            }
            return ''
        })
    }

    const getMember = () => {
        getMemberDetailByUid({uid: ''}).then((res) => {
            store.commit('setMember', res["data"])
        })
    }

    const getSelectDetail = (data) => {
      let params = { code: data.code };
        //修改当前选中的条目类型
        store.commit("friendsList/updateThisSelectCodeAndType", data)
        if (data.type === 'group') {
          getGroupDetail(params).then((res) => {
            if (res['code'] === 200) {
              store.commit("friendsList/updateSelectCodeDetail", res["data"])
            }
          })
        }
        if (data.type === "personal") {
          getFriendDetail(params).then((res) => {
            if (res['code'] === 200) {
              store.commit("friendsList/updateSelectCodeDetail", res["data"])
            }
          })
        }
    }

    //删除群成员
    const deleteGm = (data) => {
        deleteGroupMember(data).then(() => {
                getContactGroupLists()
                ElMessage.success("退出成功")
            }
        )
    }
    //联系人编辑
    const editContacts = (data) => {
      editFriend(data).then((res) => {
        //ElMessage.success("success");
      })
    }

    //删除好友
    const deleteFriend = (name, code) => {
        ElMessageBox.confirm('是否确定删除好友 ' + name + ' ?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          editContacts({ 'type': 'deleteFriend', 'acceptCode': code })
        })
    }
    

    return {
      contactGroups,
      contactFriends,
      deleteGm,
      deleteFriend,
      editContacts,
      getContactGroupLists,
      getContactFriendsList,
      getMember,
      getSelectDetail,
    };
}
export default memberEffect