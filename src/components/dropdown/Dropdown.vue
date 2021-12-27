<template>
  <div class="searchs">
    <el-input
      v-model="searchF"
      placeholder="搜索"
      class="input-with-select"
      size="mini"
      clearable
      :prefix-icon="Search"
    >
    </el-input>

    <el-dropdown placement="bottom-end">
      <div class="add-btn">
        <!-- <img src="https://cdn.jksusu.cn/add.png" /> -->
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <router-link to="/friends/lookup">
            <el-dropdown-item>添加好友</el-dropdown-item>
          </router-link>
          <div>
            <CreateGroup></CreateGroup>
          </div>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import CreateGroup from "../group/CreateGroup.vue";
import { Search } from "@element-plus/icons";
import { ref } from "vue";

const searchF = ref("");
</script>

<style lang="scss" >
.searchs {
  display: flex;
  width: 232px;
  height: 26px;
  margin-left: 19px;

  .el-input__inner {
    height: 25px !important;
    line-height: 26px !important;
    background-color: #e2e2e2 !important;
  }
  .el-input {
    width: 185px !important;
    --el-input-focus-border: #dcdbda !important;
  }
  .el-icon {
    --color: #666666 !important;
    --font-size: 11px !important;
  }

  .add-btn {
    border-radius: 4px;
    width: 25px;
    height: 24px;
    background-color: #e2e2e2;
    margin-left: 10px;
    background-image: url("https://cdn.jksusu.cn/add.png");
    background-repeat: no-repeat;
    background-position: center;

    &:hover {
      background-color: #d1d1d1;
    }
  }
}
</style>