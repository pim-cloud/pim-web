<template>
  <!--功能按钮-->
  <div class="list" v-for="(item,index) in list" :key="index" @click="select">
    <div class="labels">{{ item.labels_name }}</div>
    <router-link class="info" :to="item.to" active-class="active">
      <span style="width: 18px"></span>
      <img class="head_image" :src="item.src" />
      <p style="margin-left: 18px">{{ item.nickname }}</p>
    </router-link>
  </div>
</template>
<script setup>
const emit = defineEmits(['select'])
const select = () => {
  emit("select")
}

const list = [
  {
    'labels_name': '新的朋友',
    'nickname': '新的朋友',
    'to': '/friends/new_friends',
    'type': 'news_friend',
    'src': 'https://cdn.jksusu.cn/news_friend.jpg',
  },
  {
    'labels_name': '查找',
    'nickname': '查找',
    'to': '/friends/lookup',
    'type': 'news_friend_search',
    'src': 'https://cdn.jksusu.cn/search.jpg',
  }
]
</script>

<style scoped lang="scss">
.list {
  width: 250px;
  height: 100px;
  .labels {
    cursor: pointer;
    line-height: 40px;
    font-size: 12px;
    color: #999;
    height: 32px;
    width: 226px;
    margin-left: 19px;
  }
  .info {
    height: 60px;
    display: flex;
    line-height: 60px;
    align-items: center;
    &:hover {
      background-color: #d9d8d9;
    }
  }
  .active {
    background-color: #c5c5c6 !important;
  }
}
</style>