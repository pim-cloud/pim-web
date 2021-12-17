<template>
  <div class="friend-flex">
    <div class="search-list-tool">
      <div class="friend-search">
        <dropdown />
      </div>

      <div class="lists">
        <Function @select="select({ type: '' })"></Function>
        <div class="labels">群聊</div>
        <Item
          v-for="(item, index) in group_list"
          :key="index"
          @click="select(item)"
          :data="item"
          v-menus:right="group_menus"
          :src="item.head_image"
          :name="item.nickname"
          :class="{ active: selected.code == item.code && selected.type == item.type }"
        />

        <!-- 好友list -->
        <div v-for="(value, initials) in friends_list" :key="initials">
          <div class="labels">{{ initials }}</div>
          <Item
            v-for="(item, index) in value"
            :key="index"
            @click="select(item)"
            :data="item"
            v-menus:right="friend_menus"
            :src="item.head_image"
            :name="item.nickname"
            :time="item.created_at"
            :class="{ active: selected.code == item.code && selected.type == item.type }"
          />
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { sendMessage, setRemarks, delFriend, quitGroup } from "../../utils/menuEffect.js";
import Dropdown from "../../components/dropdown/Dropdown.vue";
import Function from "../../components/friend/Function.vue";
import memberEffect from "../../utils/memberEffect";
import Item from "../../components/list/Item.vue";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";


//群组好友列表
const group_list = reactive(memberEffect().contactGroups);
const friends_list = reactive(memberEffect().contactFriends);
//菜单
const group_menus = ref([sendMessage, quitGroup,]);
const friend_menus = ref([sendMessage, setRemarks, delFriend]);

const router = useRouter()
const selected = reactive({ code: '', type: '' })
const select = (data) => {
  memberEffect().getSelectDetail(data);
  if (data.type == '') {
    selected.code = ''
    selected.type = ''
    return
  }
  selected.code = data.code
  selected.type = data.type
  router.push({ path: '/friends/' + data.type });
};
</script>

<style scoped lang="scss">
.active {
  background-color: #c5c5c6 !important;
}

.friend-flex {
  display: flex;

  .search-list-tool {
    background-color: rgb(231, 232, 233);
    width: 250px;
    height: 600px;
    border-right: solid 1px #d6d6d6;

    .friend-search {
      display: flex;
      align-items: center;
      background-color: #f7f7f7;
      width: 100%;
      height: 60px;
    }

    //滑动条区域
    .lists {
      width: 250px;
      height: 540px;
      overflow-y: scroll;
      overflow-x: hidden;
      position: relative; //绝对定位可以滚动

      &::-webkit-scrollbar {
        width: 0px;
        background-color: #f5f5f5;
      }

      &::-webkit-scrollbar-thumb {
        height: 3px;
        border-radius: 5px;
        background: #aeacaa;
      }

      .labels {
        cursor: pointer;
        line-height: 40px;
        font-size: 12px;
        color: #999;
        height: 32px;
        width: 226px;
        margin-left: 19px;
      }
    }
  }
}
</style>
