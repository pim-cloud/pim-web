<template>
  <li>
    <div :class="data.main_code === member.code ? 'right' : 'left'">
      <div class="times">
        <p class="time">{{ jisuan(data.created_at) }}</p>
      </div>
      <el-avatar
        class="avatar"
        shape="square"
        :size="38"
        :src="
          data.main_code === member.code ? member.head_image : accept.head_image
        "
        @error="errorHandler"
      ></el-avatar>
      <div class="text" v-if="data.content_type === 'text'">
        {{ data.content }}
      </div>
      <div class="text" v-if="data.content_type === 'picture'">
        <img :src="data.content">
      </div>
    </div>
  </li>
</template>

<script setup>
import dayjs from "dayjs";

const today = dayjs().format("YYYY-MM-DD");

const { data, member, accept } = defineProps({
  data: {
    required: false,
    default: "",
  },
  member: {
    required: false,
    default: "",
  },
  accept: {
    required: false,
    default: "",
  },
});

const jisuan = (time) => {
  let today = dayjs().format("YYYY-MM-DD");
  let thisTime = dayjs(time).format("YYYY-MM-DD");
  if (today === thisTime) {
    return dayjs(time).format("HH:mm");
  }
  return dayjs(time).format("YYYY年MM月DD日 HH:mm");
};
</script>

<style lang="scss">
li {
  margin-bottom: 15px;

  .right {
    text-align: right;
    .avatar {
      float: right;
      margin: 0 4px 0 10px;
    }
    .text {
      background-color: #9eea6a;
    }
  }
  .left {
    margin-left: 4px;
    .avatar {
      float: left;
      margin: 0 10px 0 10px;
    }
  }
  .times {
    padding: 10px 0 10px 0;
    display: flex;
    justify-content: center;

    .time {
      padding: 0 5px 0 5px;
      background-color: #dadada;
      text-align: center;
      font-size: 5px;
      color: white;
      border-radius: 3px;
    }
  }

  .avatar {
    float: left;
    margin: 0 5px 0 0;
    border-radius: 5px;
  }
  .text {
    display: inline-block;
    position: relative;
    max-width: 55%;
    min-height: 30px;
    line-height: 2.2;
    font-size: 17px;
    background-color: #fff;
    color: #000;
    border-radius: 4px;
    padding: 0px 9px;
  }
}
</style>