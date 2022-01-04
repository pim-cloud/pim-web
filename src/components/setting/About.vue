<template>
  <div>
    <div>
      <a href="https://github.com/pim-cloud/pim-service" target="_blank">
        <el-avatar shape="square" :size="100" src="http://cdn.jksusu.cn/logo.jpg"></el-avatar>
      </a>
      <el-avatar style="margin-left: 10px" shape="square" :size="100"  src="http://cdn.jksusu.cn/mtwechatbig.jpg"></el-avatar>
    </div>
    <p>开源即时通讯服务</p>
    <a class="github-url" target="_blank" href="https://github.com/pim-cloud/pim-service">https://github.com/pim-cloud/pim-service</a>
  </div>
</template>

<script>
export default {
  name: "About"
}
</script>

<style scoped lang="scss">
.github-url {
  &:hover {
    color: red;
  }
}
</style>