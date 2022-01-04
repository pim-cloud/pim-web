<template>
  <div>
    <!--图片裁剪上传组件-->
    <Cutting>
      <el-avatar shape="square" :size="100"  :src="member.head_image"></el-avatar>
    </Cutting>
    <p style="font-size: 18px;">{{ member.username }}</p>
    <p>{{ member.uid }}</p>
    <button class="close" @click="close">退出登录</button>
  </div>
</template>

<script>
import {logout} from "../../api/relation";
import Cutting from "./Cutting.vue";

export default {
  name: "Account",
  components: {Cutting},
  computed: {
    member() {
      return this.$store.state.global.member;
    },
  },
  methods: {
    close() {
      this.$confirm('此操作将会退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        logout();//退出系统
        window.localStorage.removeItem('vuex');
        window.location.replace("/login")
        this.$message({
          type: 'success',
          message: '退出成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        });
      });
    },
  },
}


</script>

<style scoped lang="scss">
.close {
  margin-top: 10px;
  width: 105px;
  height: 25px;
  border: none;
  background-color: #FFFFFF;

  &:hover {
    background-color: #EFEFEF;
  }
}
</style>