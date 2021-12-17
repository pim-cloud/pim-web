<template>
  <div v-for="(value,initials) in list" :key="initials">
    <span class="labels">{{ initials }}</span>
    <div class="list" v-for="(item,index) in value" :key="index">
      <div style="display: flex">
        <img :src="item.head_image" style="margin-left: 18px">
        <p class="text-exceeded" style="margin-left: 18px">{{ item.nickname }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FriendsList",
  data() {
    return {
      list: '',
    }
  }
}
</script>

<style scoped lang="scss">

img {
  border-radius: 3px;
  width: 42px;
  height: 42px;
}
.labels {
  line-height: 41px;
  font-size: 12px;
  color: #999;
  height: 32px;
  width: 231px;
  margin-left: 19px;
}

.list {
  display: flex;
  align-items: center;
  height: 60px;

  &:hover {
    background-color: #D9D8D9;
  }
}
</style>