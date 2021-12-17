<template>
  <div class="detail-page">
    <div class="group-detail">
      <div class="group-name">
        <p>{{ detail.detail ? detail.detail.nickname : '' }}</p>
      </div>
      <div class="group-member">
        <ul class="group-member-list">
          <li v-for="(item, index) in detail.members" :key="index">
            <el-avatar
              style="justify-content:center;"
              shape="square"
              :size="50"
              :src="item.head_image"
              @error="errorHandler"
            ></el-avatar>
            <p>{{ item.nickname }}</p>
          </li>
        </ul>
      </div>
      <div class="group-send">
        <button
          @click="createSessions({ session_type: 'group', accept_code: detail.detail.code, 'nickname': detail.detail.nickname, 'remarks': '' })"
        >发送消息</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from 'vue'
import sessionEffect from '../../utils/sessionEffect'

const store = useStore();
const detail = computed(() => store.getters["friendsList/getDetail"])

const { createSessions } = sessionEffect();

</script>

<style scoped lang="scss">
.detail-page {
  width: 488px;
  background-color: white;

  //个人资料详情
  .personal-detail {
    width: 370px;
    margin: auto;
    margin-top: 80px;

    .fl {
      float: left;
    }

    .fr {
      float: right;
    }

    //姓名头像签名性别样式
    .detail-name-sex-img {
      height: 105px;
      border-bottom: 1px #e7e7e7 solid;

      .detail-name-sex {
        width: 300px;

        .detail-name {
          max-width: 280px;
          font-size: 30px;
          line-height: 30px;
        }

        .detail-sex {
          margin-left: 17px;
          margin-top: 11px;
        }

        .detail-sign {
          height: 20px;
          font-size: 14px;
          color: #999;
          margin-top: 12px;
        }

        .clear {
          clear: both;
        }
      }

      .detail-head-img {
        width: 60px;
        height: 60px;
        overflow: hidden;
        border-radius: 2px;
        float: right;
      }
    }

    //中间详细资料
    .base-data {
      height: 151px;
      margin: auto;
      margin-top: 32px;
      border-bottom: 1px #e7e7e7 solid;

      label {
        width: 80px;
        height: 22px;
        line-height: 22px;
        font-size: 14px;
        color: #999;
        margin-bottom: 12px;
        float: left;
      }

      .value {
        width: 92px;
        height: 22px;
        line-height: 22px;
        font-size: 14px;
      }

      .clear {
        clear: both;
      }
    }

    //发送消息按钮
    .btn-send-msg {
      width: 138px;
      height: 36px;
      line-height: 36px;
      background-color: #1aac19;
      text-align: center;
      margin: auto;
      color: white;
      margin-top: 20px;
      font-size: 14px;
    }

    .btn-send-msg:hover {
      background-color: #129611;
    }
  }

  .group-detail {
    display: flex;
    flex-direction: column;
    background-color: #efefef;

    .group-name {
      height: 59px;
      border-bottom: solid 1px #e7e7e7;

      p {
        line-height: 20px;
        margin-left: 30px;
        font-size: 18px;
      }
    }

    .group-member {
      height: 390px;

      .group-member-list {
        cursor: pointer;
        display: flex;
        flex-wrap: wrap;
        padding: 40px;

        li {
          padding: 8px;
          text-align: center;
        }

        li:hover {
          background-color: #e6e6e6;
        }
      }
    }

    .group-send {
      height: 150px;
      display: flex;
      justify-content: center; //左右居中
      align-items: center; //上下居中

      button {
        width: 138px;
        height: 36px;
        line-height: 36px;
        background-color: #01AD19;
        font-size: 14px;
        border: none;
        color: white;
      }

      button:hover {
        background-color: #129611;
      }
    }
  }
}
</style>