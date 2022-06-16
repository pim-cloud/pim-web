<!--会话列表组件-->
<template>
  <div class="session_flex">
    <!-- <div id="session_lists">
      <div class="search">
        <dropdown />
      </div>
      <div class="lists">
        <Item
          v-for="(item, index) in lists"
          :key="index"
          @click="setSelect(item)"
          :data="{
            code: item.accept_code,
            id: item.id,
            session_id: item.session_id,
            accept_type: item.accept_type,
          }"
          v-menus:right="menus"
          :src="item.head_image"
          :name="item.showName"
          :time="item.last_time"
          :msg="item.last_message"
          :icon="item.disturb"
          :class="{ active: select.accept_code === item.accept_code }"
        />
      </div>
    </div> -->
    <div>
      <div v-if="select.accept_code" style="display: flex; position: relative">
        <div>
          <SessionPage :user="user" />
          <!-- <SendMsg /> -->
        </div>
      </div>
      <Welcome v-if="!select.accept_code" />
    </div>
  </div>
</template>

<script setup>
import {
  msgTopping,
  nodisturb,
  setRemarks,
  delSession,
} from "../../utils/menuEffect";
import SessionPage from "../../components/session/SessionPage.vue";
import { computed, ref, reactive, watch, onMounted } from "vue";
import Dropdown from "../../components/dropdown/Dropdown.vue";
import SendMsg from "../../components/session/SendMsg.vue";
import sessionEffect from "../../utils/sessionEffect";
import Item from "../../components/list/Item.vue";
import Welcome from "../public/welcome.vue";
import store from "../../store";
import dayjs from "dayjs";

onMounted(() => {
  assemble();
});

const lists = ref([]);
const sessionList = computed(() => store.getters["sessionList/sessionList"]);
const friendList = computed((code) => store.state.common.friendList);
const select = computed(() => store.getters["sessionList/select"]);

watch([() => sessionList.value, friendList.value], () => {
  assemble();
});

//组装数据赋值
const assemble = () => {
  lists.value = [];
  sessionList.value.forEach((item) => {
    let showName = "";
    let head_image = "";
    let disturb = "";
    let star = "";
    let topping = "";
    let id = 0;
    if (item.accept_type === "personal") {
      showName = friendList.value[item.accept_code].showName;
      head_image = friendList.value[item.accept_code].head_image;
      disturb = friendList.value[item.accept_code].config.disturb;
      star = friendList.value[item.accept_code].config.star;
      topping = friendList.value[item.accept_code].config.topping;
      id = friendList.value[item.accept_code].id;
    } else {
      //从群组列表信息中取值
      console.log("会话列表中群组信息");
    }
    let jsonArr = {
      accept_code: item.accept_code,
      accept_type: item.accept_type,
      last_message: item.last_message,
      last_message_type: item.last_message_type,
      last_time: analysisTime(item.last_time),
      session_id: item.session_id,
      id: id,
      head_image: head_image,
      showName: showName,
      disturb: disturb,
      star: star,
      topping: topping,
    };
    if (topping === 1) {
      lists.value.unshift(jsonArr);
    } else {
      lists.value.push(jsonArr);
    }
  });
};

//时间计算
const analysisTime = (time) => {
  if (time === "" || time === null || time === "undefined") {
    return dayjs().format("H:mm");
  }
  const thisTime = dayjs().format("YYYY-MM-DD H:mm:ss"); //现在时间
  const lastTime = dayjs(time).format("YYYY-MM-DD H:mm:ss"); //最后消息时间
  const diffHours = dayjs(thisTime).diff(lastTime, "hours"); //相差的小时
  if (diffHours < 24) {
    return dayjs(time).format("H:m:ss");
  }
  if (diffHours > 24 && diffHours < 48) {
    return "昨天";
  }
  if (diffHours >= 48) {
    return dayjs(time).format("YY/MM/DD");
  }
};

//切换选择会话
const setSelect = (item) => {
  sessionEffect().getMsgRecords(item.accept_code, item.accept_type, 1, 20);
  store.commit("sessionList/setSelect", {
    session_id: item.session_id,
    accept_code: item.accept_code,
    accept_type: item.accept_type,
  });
};
const menus = ref([msgTopping, nodisturb, setRemarks, delSession]);
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