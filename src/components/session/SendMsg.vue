<template>
  <div class="m-text">
    <div class="m-tool">
      <div class="m-tool__item">
        <Expression @addIcon="addIcon" style="margin-left: 10px;"></Expression>
      </div>
      <div class="m-tool__item" style="margin-top: 3px;">
        <el-upload
          class="m-tool__item"
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
      <textarea placeholder="Enter" v-model="text" @keyup="inputing"></textarea>
    </div>
    <div class="send-btn">
      <button @click="inputing({ keyCode: 13 })">发送</button>
    </div>
  </div>
</template>

<script setup>
import { sendMessage, fileUpload } from "../../api/message";
import Expression from "../dropdown/expression.vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const accept = computed(() => store.getters["sessionList/getSelectInfo"])
const send = computed(() => store.getters.getMemberInfo)

const svgSize = 20
const svgFill = '#4C4C4C'
const text = ref("");


const addIcon = (emoji) => {
  let va = ''
  if (text.value != "") {
    console.log(text.value);
    text.value = text.value + emoji
  } else {
    text.value = emoji
  }
}

var timer = new Date(+new Date() + 8 * 3600 * 1000).toJSON().substr(0, 19).replace("T", " ");

//发送文本
const inputing = async (e) => {
  if (e.keyCode === 13 && text.value.length) {

    let content = text.value;
    text.value = "";
    const message = {
      main_code: send.value.code,
      accept_code: accept.value.accept_code,
      accept_type: accept.value.session_type,
      message_type: 'chat',
      content: content,
      content_type: "text",
    };

    store.commit('sessionList/addMessage', message)

    try {
      await sendMessage(message)
    } catch (error) {
      console.log(error)
    }
  }
};

// 发送图片
const beforeUpload = async (file) => {

  const accept = store.getters["sessionList/getSelectSessionInfo"];
  const send = store.state.member;

  const formData = new FormData();
  formData.append("file", file);
  const result = await fileUpload(formData)
  const { path } = result.data

  const message = {
    send_code: send.value.code,
    accept_code: accept.value.accept_code,
    accept_type: accept.value.session_type,
    content: 'http://' + path,
    content_type: "picture",
    message_type: 'chat',
    created_at: timer,
  };
  store.commit('sessionList/addMessage', message)

  try {
    await sendMessage(message)
    text.value = "";
  } catch (error) {
    text.value = "";
  }
};

</script>

<style lang="scss" scoped>
.m-text {
  width: 488px;
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
    width: 488px;
  }

  textarea {
    height: 63px;
    width: 448px;
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