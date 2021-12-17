<template>
  <div v-if="list">
    <slot name="labels">
      <div class="labels">{{ labels }}</div>
    </slot>
    <div class="list" v-for="(item, index) in list" :key="index">
      <router-link to="/friends/gdetail" active-class="friend_tab_active">
        <div style="display: flex">
          <img :src="item.head_image" style="margin-left: 18px">
          <p class="text-exceeded" style="margin-left: 18px">{{ item.name }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
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