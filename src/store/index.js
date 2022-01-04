import Vuex from "vuex";
import notice from "./modules/notice";
import global from './modules/global'
import sessionList from "./modules/sessionlist";
import friendsList from "./modules/friendslist";
import common from "./modules/common";
import createPersistedState from "vuex-persistedstate";

const store = new Vuex.Store({
    plugins: [createPersistedState()],
    modules: {
        global,
        common,
        sessionList,
        friendsList,
        notice,
    }
});

export default store