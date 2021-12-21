<template>
  <div>
    <div v-for="(item, index) in option" :key="index" >
      <label>{{item.name}}</label>
      <el-switch v-model="item.setting" active-color="#13ce66"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Currency",
  data() {
    return {
      option: [
        {
          name: '新消息通知声音',
          setting: true
        },
        {
          name: '语音和视频通话通知声音',
          setting: true
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>