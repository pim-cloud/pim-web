import Vuex from "vuex";
import msgNotice from "./modules/msgnotice";
import global from './modules/global'
import sessionList from "./modules/sessionlist";
import friendsList from "./modules/friendslist";
import createPersistedState from "vuex-persistedstate";

const store = new Vuex.Store({
    plugins: [createPersistedState()],
    modules: {
        global,
        sessionList,
        friendsList,
        msgNotice,
    }
});

export default store