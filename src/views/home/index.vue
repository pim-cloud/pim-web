<!--会话列表组件-->
<template>
  <div class="session_flex">
    <div id="session_lists">
      <div class="search">
        <dropdown />
      </div>
      <div class="lists">
        <Item
          v-for="(item, index) in sessionList"
          :key="index"
          @click="setSelect(item)"
          :data="{ code: item.accept_code, session_id: item.session_id, session_type: item.session_type }"
          v-menus:right="menus"
          :src="item.accept_info.head_image"
          :name="!item.accept_info.remarks ? item.accept_info.nickname : item.accept_info.remarks"
          :time="item.created_at"
          :msg="今天在干嘛"
          :icon="false"
          :class="{ active: getSelectInfo.accept_code == item.accept_code }"
        />
      </div>
    </div>
    <div>
      <div v-if="getSelectInfo.accept_code" style="display: flex; position: relative">
        <div>
          <SessionPage :user="user" />
          <SendMsg />
        </div>
      </div>
      <Welcome v-if="!getSelectInfo.accept_code" />
    </div>
  </div>
</template>

<script setup>
import { msgTopping, nodisturb, setRemarks, delSession } from "../../utils/menuEffect";
import SessionPage from "../../components/session/SessionPage.vue";
import Dropdown from "../../components/dropdown/Dropdown.vue";
import SendMsg from "../../components/session/SendMsg.vue";
import sessionEffect from "../../utils/sessionEffect";
import Item from "../../components/list/Item.vue";
import Welcome from "../public/welcome.vue";
import { computed, ref } from "vue";
import store from "../../store";

const sessionList = computed(() => store.getters["sessionList/getSessionList"])
const getSelectInfo = computed(() => store.getters["sessionList/getSelectInfo"]);

//切换选择会话
const setSelect = (item) => {
  sessionEffect().getMsgRecords(item.accept_code, item.session_type, 1, 20);
  store.commit("sessionList/setSelectInfo", {
    session_id: item.session_id,
    accept_code: item.accept_code,
    remarks: item.accept_info.remarks,
    nickname: item.accept_info.nickname,
    session_type: item.session_type,
  });
};
const menus = ref([msgTopping, nodisturb, setRemarks, delSession])
</script>

<style scoped lang="scss">
.icon {
  font-size: 15px;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;

  &:hover {
    background-color: #07c160;
  }
}

.active {
  background-color: #c5c5c6 !important;
}

.session_flex {
  display: flex;

  #session_lists {
    background-color: #f5f5f5;
    width: 250px;
    height: 800px;
    border-right: solid 1px #d6d6d6;

    /*搜索框*/
    .search {
      display: flex;
      background-color: #f7f7f7;
      width: 100%;
      height: 60px;
      align-items: center;
    }

    /*会话列表*/
    .lists {
      height: 540px;
      overflow-y: scroll;
      overflow-x: hidden;
      position: relative;

      &::-webkit-scrollbar {
        width: 0px;
        background-color: #f5f5f5;
      }

      &::-webkit-scrollbar-thumb {
        height: 3px;
        border-radius: 5px;
        background: #aeacaa;
      }
    }
  }
}
</style>