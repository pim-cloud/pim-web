<template>
  <div class="m-text">
    <div class="m-tool">
      <div class="m-tool__item">
        <discord-picker style="" gif-format="md" @emoji="setEmoji" />
      </div>
      <div class="m-tool__item">
        <el-upload
          style="padding-top: 6px"
          accept="image/*"
          :before-upload="beforeUpload"
          :show-file-list="false"
        >
          <svg
            t="1639381072726"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="7287"
            :width="svgSize"
            :height="svgSize"
          >
            <path
              d="M76.8 327.8848V187.7504a25.6 25.6 0 0 1 25.6-25.6h307.2a25.6 25.6 0 0 1 25.6 25.6v64H512v-64a102.4 102.4 0 0 0-102.4-102.4H102.4a102.4 102.4 0 0 0-102.4 102.4v153.6l76.8-13.4656z m0 0V187.7504a25.6 25.6 0 0 1 25.6-25.6h307.2a25.6 25.6 0 0 1 25.6 25.6v64H512v-64a102.4 102.4 0 0 0-102.4-102.4H102.4a102.4 102.4 0 0 0-102.4 102.4v153.6l76.8-13.4656z"
              p-id="7288"
              :fill="svgFill"
            />
            <path
              d="M102.4 315.7504a25.6 25.6 0 0 0-25.6 25.6v496.2304a25.6 25.6 0 0 0 25.6 25.6h819.2a25.6 25.6 0 0 0 25.6-25.6V341.3504a25.6 25.6 0 0 0-25.6-25.6H102.4z m0-76.8h819.2a102.4 102.4 0 0 1 102.4 102.4v496.2304a102.4 102.4 0 0 1-102.4 102.4H102.4a102.4 102.4 0 0 1-102.4-102.4V341.3504a102.4 102.4 0 0 1 102.4-102.4z"
              p-id="7289"
              :fill="svgFill"
            />
          </svg>
        </el-upload>
      </div>
    </div>
    <div class="text">
      <textarea
        id="textarea"
        placeholder="Enter"
        v-model="text"
        @keyup="inputing"
      ></textarea>
    </div>
    <div class="send-btn">
      <button @click="inputing({ keyCode: 13 })">发送</button>
    </div>
  </div>
</template>

<script setup>
import { sendMessage, fileUpload } from "../../api/message";
import DiscordPicker from "vue3-discordpicker";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import dayjs from "dayjs";

const store = useStore();
const accept = computed(() => store.getters["sessionList/select"]);
const send = computed(() => store.getters.member);

const svgSize = 20;
const svgFill = "#4C4C4C";
const text = ref("");

//表情插入
const setEmoji = (emoji) => {
  const textarea = document.querySelector("#textarea");
  if (textarea.selectionStart || textarea.selectionStart === 0) {
    let startPos = textarea.selectionStart;
    let endPos = textarea.selectionEnd;
    text.value =
      textarea.value.substring(0, startPos) +
      emoji +
      textarea.value.substring(endPos, textarea.value.length);
  } else {
    text.value = emoji;
  }
};

//发送文本
const inputing = async (e) => {
  if (e.keyCode === 13 && text.value.length) {
    let content = text.value;
    text.value = "";
    const message = {
      main_code: send.value.code,
      accept_code: accept.value.accept_code,
      accept_type: accept.value.accept_type,
      message_type: "chat",
      content: content,
      content_type: "text",
      created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };

    store.commit("sessionList/addMessage", message);

    try {
      await sendMessage(message);
    } catch (error) {
      console.log(error);
    }
  }
};

// 发送图片
const beforeUpload = async (file) => {
  const accept = store.getters["sessionList/getSelectSessionInfo"];
  const send = store.state.member;

  const formData = new FormData();
  formData.append("file", file);
  const result = await fileUpload(formData);
  const { path } = result.data;

  const message = {
    send_code: send.value.code,
    accept_code: accept.value.accept_code,
    accept_type: accept.value.session_type,
    content: "http://" + path,
    content_type: "picture",
    message_type: "chat",
    created_at: timer,
  };
  store.commit("sessionList/addMessage", message);

  try {
    await sendMessage(message);
    text.value = "";
  } catch (error) {
    text.value = "";
  }
};
</script>

<style lang="scss" >
.vue3-emojipicker {
  .right-0 {
    right: -200px !important;
  }
  .relative {
    .mt-4 {
      /* margin-top: 1rem; */
      margin-top: 0 !important;
    }
  }
  .vue3-discord-emojipicker {
    height: 340px !important;
    width: 380px !important;
  }
  .vue3-discord-emojipicker {
    background: #ffffff !important;
  }
  .bg-grey-400 {
    --tw-bg-opacity: 1;
    background-color: #ffffff !important;
  }
  .bg-grey-700 {
    background-color: #ffffff !important;
  }
  .bg-grey-600 {
    background-color: #ffffff !important;
  }
  .vue3-discordpicker__container {
    height: 100%;
  }
  .px-5 {
    display: none; 
  }
  .overflow-auto {
    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      height: 3px;
      border-radius: 5px;
      background: #ffffff;
    }
  }
}

.m-text {
  width: 688px;
  height: 160px;
  display: flex;
  flex-direction: column;

  .m-tool {
    height: 48px;
    display: flex;
    background-color: #ffffff;
    border-top: solid 1px #e7e7e7;

    .m-tool__item {
      width: 40px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .send-btn {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 50px;
    background-color: #ffffff;

    button {
      width: 62px;
      height: 26px;
      border: 1px solid #e5e5e5;
      background-color: #f5f5f5;
      font-size: 13px;
      line-height: 24px;
      margin-right: 20px;
    }

    button:hover {
      border: 1px solid #129611;
      background-color: #129611;
      color: white;
    }
  }
  .text {
    height: 63px;
    width: 688px;
  }

  textarea {
    height: 63px;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 15px;
    border: none;
    outline: none;
    resize: none;
    font-family: "Micrsofot Yahei";
  }
}
</style>