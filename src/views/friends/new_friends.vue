<template>
  <div class="news-friends">
    <div class="news-friends-top">
      <div class="news-friends-top-name">新的朋友</div>
    </div>
    <div class="news-friends-lists">
      <p
        style="text-align: center"
        v-if="newFriendLists == ''"
      >{{ newFriendLists == '' ? '暂时没有新朋友' : '' }}</p>

      <div class="news-friends-search-list flr">
        <div v-for="(item, index) in newFriendLists" :key="index" class="news-search-list">
          <el-avatar shape="square" :size="50" :src="item.send_head_image" @error="errorHandler"></el-avatar>
          <div class="news-search-info">
            <p>用户名：{{ item.send_nickname }}</p>
            <p style="font-size: 12.5px;color: #999;">备注：{{ item.remarks }}</p>
          </div>
          <div class="news-friends-status" @click="add(item.code)">
            <p
              v-if="item.status === 'agree'"
              style="color: rgb(153, 153, 153); font-size: 12.5px;"
            >已添加</p>
            <button v-if="item.status === 'pending'" @click="updateApply(item, 'agree')">接受</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { friendRequestProcessing, getFriendsRequestList } from "../../api/relation";
import sessionEffect from "../../utils/sessionEffect";
import memberEffect from "../../utils/memberEffect";
import { ElMessage } from "element-plus";
import { ref, onMounted } from "vue";

onMounted(() => {
  getApplyList();
})

const newFriendLists = ref('');


const getApplyList = () => {
  getFriendsRequestList().then((res) => {
    if (res.code === 200) {
      newFriendLists.value = res.data;
    }
  });
}

const updateApply = (item, status) => {
  //接收人和发送人在这里要互换一下
  let data = {
    main_code: item.accept_code,
    accept_code: item.send_code,
    message_type: 'add_friend_reply',
    status: status,
    record_id: item.record_id,
  };
  friendRequestProcessing(data).then(() => {
    getApplyList();
    ElMessage.success("处理成功！");
    if (status === "agree") {
      //添加到会话列表
      sessionEffect().createSessions({
        session_type: 'personal',
        accept_code: item.send_code,
      })
    }
  });
}
</script>

<style scoped lang="scss">
.news-friends {
  width: 688px;
  height: 800px;
  background-color: #f5f5f5;

  .news-friends-top {
    width: 100%;
    height: 59px;
    background-color: #f5f5f5;
    border-bottom: solid 1px #e7e7e7;

    .news-friends-top-name {
      line-height: 60px;
      font-size: 18px;
      margin-left: 30px;
    }
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