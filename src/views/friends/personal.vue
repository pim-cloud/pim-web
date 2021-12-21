<template>
  <div class="detail-page">
    <div class="personal-detail">
      <div class="detail-name-sex-img">
        <div class="detail-name-sex fl">
          <div class="detail-name fl">{{ detail.nickname }}</div>
          <div class="detail-sex fl">
            <img src="https://www.17sucai.com/preview/731884/2019-12-09/H5/common/img/man.jpg" />
          </div>
          <div class="detail-sign fl">{{ detail.autograph }}</div>
          <div class="clear"></div>
        </div>
        <div class="detail-head-img fr">
          <el-avatar shape="square" :size="60" :src="detail.head_image" @error="errorHandler"></el-avatar>
        </div>
      </div>
      <div class="base-data">
        <label>备&nbsp;&nbsp;&nbsp;注</label>
        <div class="value fl">
          <!-- <el-input
            v-model='detail.config.remarks'
            clearable
            size="mini"
            @blur="blur_update_remarks"
            @change="change_update_remarks"
            placeholder="点击添加备注"
          /> -->
        </div>
        <div class="clear"></div>

        <label>PIM号</label>
        <div class="value fl">{{ detail.code }}</div>
        <div class="clear"></div>

        <label>邮&nbsp;&nbsp;&nbsp;箱</label>
        <div class="value fl">{{ detail.email }}</div>
        <div class="clear"></div>

        <label>地&nbsp;&nbsp;&nbsp;区</label>
        <div class="value fl"></div>
        <div class="clear"></div>
      </div>
      <div class="btn-send-msg">
        <div
          @click="sessionEffect().createSessions({ session_type: 'personal', accept_code: detail.code, 'nickname': detail.nickname, 'remarks': detail.remarks })"
        >发送消息</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from "vuex";
import memberEffect from "../../utils/memberEffect";
import sessionEffect from "../../utils/sessionEffect"

const store = useStore();

const detail = computed(() => store.getters["friendsList/getDetail"])

//修改好友备注
const blur_update_remarks = () => {
  update_friend_remarks()
}
const change_update_remarks = () => {
  update_friend_remarks()
}
const update_friend_remarks = () => {
  if (detail.value.remarks == '' || detail.value.remarks === 'undefined') {
    return false;
  }
  memberEffect().editContacts({ 'type': 'remarks', 'acceptCode': detail.value.code, 'remarks': detail.value.remarks })
}

</script>

<style lang="scss">
.detail-page {
  width: 688px;
  background-color: white;

  //个人资料详情
  .personal-detail {
    width: 370px;
    margin: auto;
    margin-top: 180px;

    .fl {
      float: left;
    }

    .fr {
      float: right;
    }

    //姓名头像签名性别样式
    .detail-name-sex-img {
      height: 105px;
      cursor: pointer;
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
        cursor: pointer;

        .el-input {
          width: 120px !important;
          --el-input-focus-border: #dcdbda !important;
        }
        .el-input__inner {
          height: 23px !important;
          line-height: 23px !important;
          padding: 0 0px;
          border: none;
          border-radius: 0px;
          font-size: 14px;
        }
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
      cursor: pointer;
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
        background-color: #01ad19;
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