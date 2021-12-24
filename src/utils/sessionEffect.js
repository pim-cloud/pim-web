import store from "../store";
import router from "../router";
import { getMsgRecord } from "../api/message";
import { createSession, deleteSession, getSessionLists, editSession, toppingSession } from "../api/session";

const sessionEffect = () => {
    //获取会话列表
    const sessionLists = () => {
        getSessionLists().then((res) => {
            store.dispatch('sessionList/saveList', res["data"])
        });
    }
    //增加一条会话
    const createSessions = (data) => {
      createSession({
          acceptCode: data.code,
          sessionType: data.type,
        }).then((res) => {
          if (res.code === 200) {
            router.push("/home");
            store.commit("sessionList/setSelect", {
              session_id: res.data.session_id,
              accept_code: data.code,
              accept_type: data.type,
            });
             //添加会话
            store.commit("sessionList/addSession", { 
              accept_code: data.code, 
              accept_type: data.type, 
              session_id: res.data.session_id,
              last_time:res.data.last_time,//上一条消息时间
              last_message:res.data.last_message,//上一条消息
              last_message_type:res.data.last_message_type,//上一条消息类型
            });
            //获取聊天记录
            getMsgRecords(data.code, data.type, 1, 20);
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