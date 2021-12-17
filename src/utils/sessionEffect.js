import store from "../store";
import router from "../router";
import { getMsgRecord } from "../api/message";
import { createSession, deleteSession, getSessionLists, editSession, toppingSession } from "../api/session";

const sessionEffect = () => {
    //获取会话列表
    const sessionLists = () => {
        store.dispatch('sessionList/saveList', '')
        getSessionLists().then((res) => {
            store.dispatch('sessionList/saveList', res["data"])
        });
    }
    //增加一条会话
    const createSessions = (data) => {
      // if (data.accept_code in store.state.sessionList.list) {
      //   router.push("/home");
      //   return false
      // }
      createSession({
          acceptCode: data.accept_code,
          nickname: data.nickname,
          remarks: data.remarks,
          sessionType: data.session_type,
        }).then((res) => {
          if (res.code === 200) {
            router.push("/home");
            store.commit("sessionList/setSelectInfo", {
              session_id: res.data.session_id,
              accept_code: data.accept_code,
              nickname: res.data.accept_info.nickname,
              remarks: data.remarks,
              session_type: data.session_type,
            });
            store.commit("sessionList/addSession", res.data); //添加会话
            //获取聊天记录
            getMsgRecords(data.accept_code, data.session_type, 1, 20);
          }
        });
    }
   
    //获取消息记录，储存在本地缓存
    const getMsgRecords = (acceptCode,sessionType,page,perPage) => {
        getMsgRecord({
          acceptCode: acceptCode,
          sessionType: sessionType,
          page: page,
          perPage: perPage,
        }).then((res) => {
          if (res.code === 200) {
            store.commit("sessionList/addMessages", res.data);
          }
        });
    }
    //删除一条会话
    const deleteSessions = (acceptCode, sessionId) => {
        console.log("接收到的code是***" + acceptCode);
        store.dispatch("sessionList/deleteSession", acceptCode);
        deleteSession({ sessionId: sessionId })
    };
    //编辑会话
    const editSessions = (data) => {
      editSession(data)
    }


    //会话置顶
    const setToppings = (data) => {
      toppingSession(data)
    }


    return {
      setToppings,
      editSessions,
        sessionLists,
        createSessions,
        deleteSessions,
        getMsgRecords,
    }
}
export default sessionEffect