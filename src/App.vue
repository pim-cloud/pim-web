<template>
  <div class="chat-bg">
    <a target="_blank" href="https://github.com/pim-cloud/pim-service">
      <img style="position: absolute; top: 0; right: 0; border: 0;z-index: 5" src="https://cdn.jksusu.cn/gotogithub.png"
        alt="Fork me on GitHub">
    </a>
    <LeftTab v-if="$route.meta.auth" />
    <transition name="el-fade-in-linear">
      <router-view />
    </transition>
  </div>
</template>
<script setup>
import LeftTab from "./components/tab/LeftTab.vue";
</script>
<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

body,
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}

a {
  text-decoration: none;
  color: #979797;
}

.chat-bg {
  width: 100%;
  height: 100%;
  color: #4d4d4d;
  font: 14px/1.4em "Helvetica Neue", Helvetica, "Microsoft Yahei", Arial, sans-serif;
  background: #f5f5f5 url("https://cdn.jksusu.cn/bg.jpg") no-repeat center;
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.head_image {
  border-radius: 3px;
  width: 42px;
  height: 42px;
}
</style>

