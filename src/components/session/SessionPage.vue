<template>
  <div class="session-page">
    <div class="page-top">
      <div class="page-top-name">
        {{ showName }}
      </div>
      <slide-right />
    </div>
    <div class="page-center">
      <div class="message" id="m-message">
        <ul>
          <a>
            <!-- <p style="text-align: center">查看更多消息</p> -->
          </a>
          <message
            v-for="(item, index) in messageList"
            :key="index"
            :data="item"
            :member="member"
            :accept="messageInfo.accept"
          />
        </ul>
      </div>
    </div>
    <el-dialog v-model="centerDialogVisible" width="40%" center>
      <img style="width: 95%; height: 80%" :src="url" />
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, onUpdated, watch } from "vue";
import Message from "../message/message.vue";
import SlideRight from "./SlideRight.vue";
import { useStore } from "vuex";

onMounted(() => {
  assemble();
  scroll();
});

onUpdated(() => {
  scroll();
});

const store = useStore();
const showName = ref("");
const member = computed(() => store.getters["member"]);
const select = computed(() => store.getters["sessionList/select"]);
const messageList = computed(() => store.getters["sessionList/messageList"]);
const messageInfo = computed(() => store.getters["sessionList/messageInfo"]);

//监听选择
watch(select.value, () => {
    assemble();
});

const assemble = () => {
  let accept_code = select.value.accept_code;
  if (select.value.accept_type === "personal") {
    const friendLists = computed(
      () => store.state.common.friendList[accept_code]
    );
    showName.value = friendLists.value.showName;
  } else {
    const groupLists = computed(
      () => store.state.common.groupList[accept_code]
    );
    showName.value = groupLists.value.showName;
  }
};

const url = ref("");
const centerDialogVisible = ref(false);

const scroll = () => {
  let ele = document.getElementById("m-message");
  if (ele) {
    ele.scrollTop = ele.scrollHeight;
  }
};
const showPicture = (url) => {
  centerDialogVisible.value = true;
  url.value = url;
};
</script>

<style lang="scss" scoped>
.session-page {
  display: flex;
  background-color: #f5f5f5;
  flex-direction: column;
  width: 688px;
  height: 640px;

  .page-top {
    display: flex;
    width: 100%;
    height: 59px;
    background-color: #f5f5f5;
    border-bottom: solid 1px #e7e7e7;
    justify-content: space-between;

    .page-top-name {
      display: flex;
      line-height: 20px;
      font-size: 18px;
      align-items: center;
      margin-left: 30px;
    }

    .page-top-dian {
      display: flex;
      align-items: center;
      width: 25px;
      margin-right: 15px;
    }
  }

  .page-center {
    width: 100%;
    height: 380px;
    background-color: #f5f5f5;

    .message {
      background-color: #f5f5f5;
      overflow: auto;
      width: 688px;
      height: 580px;
      .image {
        max-width: 288px;
        max-height: 100px;
      }
    }

    .message::-webkit-scrollbar {
      width: 8px;
    }

    .message::-webkit-scrollbar-thumb {
      height: 3px;
      border-radius: 10px;
      background: #aeacaa;
    }

    .message .text:before {
      content: " ";
      position: absolute;
      top: 9px;
      right: 100%;
      border: 6px solid transparent;
      border-right-color: #fff;
    }

    .message .self .text:before {
      right: inherit;
      left: 100%;
      border-right-color: transparent;
      border-left-color: #9eea6a;
    }

    img.static-emotion-gif,
    img.static-emotion {
      vertical-align: middle !important;
    }
  }
}
</style>