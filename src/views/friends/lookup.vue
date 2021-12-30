<template>
  <div class="news-friends-search">
    <div class="news-friends-search-top">
      <div class="news-friends-search-top-name">查找</div>
    </div>
    <div class="news-friends-search-input flr">
      <el-input
        placeholder="请输入"
        v-model="keyword"
        class="input-with-select"
        style="margin-top: 20px"
      >
        <template #prepend>
          <el-select
            v-model="select_type"
            placeholder="选择"
            style="width: 80px"
          >
            <el-option label="个人" value="personal"></el-option>
            <el-option label="群组" value="group"></el-option>
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="searchs"></el-button>
        </template>
      </el-input>
    </div>

    <div class="news-friends-search-list flr">
      <div v-for="(item, index) in list" :key="index" class="news-search-list">
        <el-avatar
          shape="square"
          :size="50"
          :src="item.head_image"
          @error="errorHandler"
        ></el-avatar>
        <div class="news-search-info">
          <p>用户名：{{ item.nickname }}</p>
          <p style="font-size: 12.5px; color: #999">
            签名：{{ item.autograph }}
          </p>
        </div>
        <div class="news-friends-status" @click="add(item.code)">
          <button>发送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { requestAddFriends, search } from "../../api/relation";
import { Search } from "@element-plus/icons";
import { ElMessage } from "element-plus";
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const member = computed(() => store.getters["member"]);

const select_type = ref("personal");
const keyword = ref("");
const list = ref("");

const searchs = () => {
  list.value = "";
  if (select_type.value && keyword.value) {
    const data = {
      keyword: keyword.value,
      accept_type: select_type.value,
    };
    search(data).then((res) => {
      if (res.code === 200 && res.data != "") {
        list.value = res.data;
        return ElMessage.success("搜索成功");
      }
      ElMessage.error("搜索结果为空");
    });
  }
};

const add = (accept_code) => {
  if (select_type.value === "personal") {
    let data = {
      accept_code: accept_code,
      remarks: "hello",
    };
    requestAddFriends(data).then((res) => {
      ElMessage.success("请求发送成功！");
    });
  }
};
</script>

<style scoped lang="scss">
.news-friends-search {
  width: 688px;
  height: 800px;
  background-color: #f5f5f5;

  .news-friends-search-top {
    width: 100%;
    height: 59px;
    background-color: #f5f5f5;
    border-bottom: solid 1px #e7e7e7;

    .news-friends-search-top-name {
      line-height: 60px;
      font-size: 18px;
      margin-left: 30px;
    }
  }

  .flr {
    margin-left: 10%;
    margin-right: 10%;
  }

  .news-friends-search-input {
    height: 100px;
  }

  .news-friends-search-list {
    height: 440px;

    .news-search-list {
      height: 69px;
      //width: 400px;
      border-bottom: solid 1px #e7e7e7;
      margin-left: 10%;
      margin-right: 10%;

      .news-search-info {
        height: 60px;
        display: inline-block;
        margin-left: 20px;
      }

      .news-friends-status {
        display: inline-block;
        float: right;
        padding: 22px;

        button {
          width: 50px;
          height: 25px;
          line-height: 25px;
          background-color: #1aac19;
          font-size: 14px;
          border: none;
          color: white;

          &:hover {
            background-color: #129611;
          }
        }
      }
    }
  }
}
</style>