<template>
  <div id="setting">
    <div style="padding-top: 25%">
      <el-tabs tab-position="left">
        <el-tab-pane label="账号设置">
          <Account class="account-settings"></Account>
        </el-tab-pane>
        <!-- <el-tab-pane label="通用设置">
          <Currency class="account-settings"></Currency>
        </el-tab-pane> -->
        <el-tab-pane label="修改密码">
          <Password class="account-settings"></Password>
        </el-tab-pane>
        <el-tab-pane label="关于项目">
          <About class="account-settings"></About>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import About from "../../components/setting/About.vue";
import Account from "../../components/setting/Account.vue";
import Password from "../../components/setting/Password.vue";
import Currency from "../../components/setting/Currency.vue";
</script>

<style scoped lang="scss">

.el-tabs__item.is-active {
  color: #1AAD19 !important;
}

#setting {
  background-color: #F5F5F5;
  width: 938px;
  height: 800px;

  .account-settings {
    width: 500px;
    text-align: center;
  }
}

</style>
