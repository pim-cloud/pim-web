<template>
  <div class="homeSidebar">
    <div class="center" style="flex-grow: 1;">
      <router-link to="/setting">
        <el-avatar shape="square" :size="43" :src="member.head_image" @error="errorHandler"></el-avatar>
      </router-link>
    </div>

    <div v-for="(item, index) in data.tab" :key="index" :style="item.flex_grow" class="center">
      <router-link :to="item.to" replace active-class="active">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="item.icon" />
        </svg>
      </router-link>
    </div>

    <!--网络检测-->
    <div style="flex-grow: 8;" class="center">
      <svg class="icon" style="font-size: 20px" aria-hidden="true">
        <use v-if="socket" style="color: #07C160" xlink:href="#icon-wuxianwangluo" />
        <use v-else style="color: red" xlink:href="#icon-wuwangluo" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, computed, watch } from "vue";
import socketEffect from "../../utils/socketEffect";
import memberEffect from "../../utils/memberEffect";
import { useStore } from "vuex";

const data = reactive({
  head: { height: 43, width: 43 },
  tab: [
    { to: '/home', icon: '#icon-huihua', flex_grow: 'flex-grow:1' },
    { to: '/friends', icon: '#icon-lianxiren', flex_grow: 'flex-grow:1' },
    { to: '/setting', icon: '#icon-shezhi', flex_grow: 'flex-grow:1' },
  ]
})

const store = useStore();
const member = computed(() => store.getters.getMemberInfo)
const socket = computed(() => store.getters.getSocket)
const token = computed(() => store.state.token)

memberEffect().getMember();

//socket链接
onMounted(() => {
  socketEffect().connectSocket()
})
onUnmounted(() => {
  socketEffect().closeSocket()
})
watch(() => token.value, () => {
  console.log('token 没有了');
})
</script>

<style lang="scss" scoped>
.unread_prompt {
  width: 10px;
  height: 10px;
  background-color: #ff3b30;
  border-radius: 8px;
  position: absolute;
  line-height: 14px;
  color: white;
  font-size: 12px;
  text-align: center;
  margin-left: 20px;
  margin-top: -25px;
}

.icon {
  font-size: 25px;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.homeSidebar {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: #2e2e2e;
  width: 54px;
  height: 800px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;

  .active {
    color: #07c160;
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>