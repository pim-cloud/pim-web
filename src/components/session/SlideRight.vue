<template>
  <div class="page-top-dian" @click="displays()"></div>

  <div v-if="slideStatus && select.accept_type == 'personal'"
    class="sliding-frame animate__animated  animate__slideInLeft">
    <div class="person">
      <div class="sliding-frame-top">
        <div class="frame">
          <div class="add"></div>
          <span style>添加</span>
        </div>
        <div class="frame">
          <el-avatar shape="square" :size="42" :src="personal.head_image" @error="errorHandler"></el-avatar>
          <span>{{ personal.name }}</span>
        </div>
      </div>
      <div class="person-edit">
        <div class="edit">
          <p>消息免打扰</p>
          <el-switch v-model="personal.disturb" active-color="#13ce66"
            @click="updateConfig('personal', 'disturb', personal.disturb)" />
        </div>

        <div class="edit">
          <p>置顶聊天</p>
          <el-switch v-model="personal.topping" active-color="#13ce66"
            @click="updateConfig('personal', 'topping', personal.topping)" />
        </div>
        <div class="edit">
          <p>星标朋友</p>
          <el-switch v-model="personal.star" active-color="#13ce66"
            @click="updateConfig('personal', 'star', personal.star)" />
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { getGroupDetail } from "../../api/relation";
import { computed, reactive, ref, watch } from "vue";
import memberEffect from "../../utils/memberEffect";
import store from "../../store";

const slideStatus = ref(false);
const select = computed(() => store.getters["sessionList/select"]);


const personal = reactive({
  name: "",
  id: "",
  code: "",
  head_image: "",
  disturb: false,
  topping: false,
  star: false,
});

const group = reactive({
  details: "",
  members: "",
});

//开关
const displays = () => {
  if (slideStatus.value) {
    slideStatus.value = false;
  } else {
    if (select.value.accept_type === "personal" && personal.code === "") {
      initData();
    }
    if (select.value.accept_type === "group" && group.details === "") {
      initData();
    }
    slideStatus.value = true;
  }
};

//初始化赋值
const initData = () => {
  let data = { code: select.value.accept_code };

  if (select.value.accept_type === "personal") {
    const friend = computed(
      () => store.state.common.friendList[select.value.accept_code]
    );
    personal.name = friend.value.showName;
    personal.id = friend.value.id;
    personal.code = friend.value.code;
    personal.head_image = friend.value.head_image;
    personal.disturb = friend.value.config.disturb === 1 ? true : false;
    personal.topping = friend.value.config.topping === 1 ? true : false;
    personal.star = friend.value.config.star === 1 ? true : false;
  }
  if (select.value.accept_type === "group") {
    const groupLists = computed(
      () => store.state.common.groupList[select.value.accept_code]
    );
    getGroupDetail(data).then((res) => {
      if (res.code === 200) {
        group.details = res.data.detail;
        group.members = res.data.members;
      }
    });
  }
};

watch(
  () => select.value,
  () => {
    close();
  }
);

/**
 * 修改配置
 * accept_type 对象类型
 * config_type 配置类型
 * value 配置值
 */
const updateConfig = (accept_type, config_type, value) => {
  if (accept_type === "personal") {
    memberEffect().editContacts({
      sessionId: select.value.session_id,
      accept_type: accept_type,
      type: config_type,
      id: personal.id,
      acceptCode: personal.code,
      configValue: value ? 1 : 0,
    });
  }
};

const close = () => {
  slideStatus.value = false;

  personal.name = "";
  personal.id = "";
  personal.code = "";
  personal.head_image = "";
  personal.disturb = false;
  personal.topping = false;
  personal.star = false;
  // group = ''
};
</script>·

<style scoped lang="scss">
.page-top-dian {
  display: flex;
  align-items: center;
  width: 25px;
  margin-right: 15px;
  background-image: url("https://cdn.jksusu.cn/diandaindian.png");
  background-repeat: no-repeat;
  background-position: center;
}

.sliding-frame {
  width: 250px;
  height: 800px;
  background-color: #f5f5f5;
  z-index: -1;
  position: absolute;
  right: -250px;

  .person {
    width: 200px;
    margin-left: 10px;

    .sliding-frame-top {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      height: 90px;
      border-bottom: 1px solid #e2e2e2;
      margin-left: 10px;

      .frame {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 70px;
        height: 70px;

        .add {
          width: 42px;
          height: 42px;
          background: url(https://cdn.jksusu.cn/page-add.png);
          background-size: 100%;

          &:hover {
            background-color: #d9d8d9;
          }
        }
      }
    }

    .person-edit {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 25px;
      height: 150px;
      width: 200px;

      .edit {
        height: 40px;
        width: 160px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

  .juli {
    margin-left: 20px;
    margin-right: 20px;
  }

  .group {
    .search-group-member {
      height: 60px;
      display: flex;
      align-items: center;

      .searchs {
        display: flex;
        width: 231px;
        height: 25px;

        .search-input {
          height: 21px;
          width: 180px;
          outline: none;
          background-color: #e2e2e2;
          border: 1px solid #e2e2e2;

          &:focus {
            background-color: #f7f7f7;
          }
        }

        .search-btn {
          display: inline-block;
          width: 15px;
          height: 100%;
          background-color: #e2e2e2;
          line-height: 24px;
        }
      }
    }

    .slide::-webkit-scrollbar {
      width: 1px;
    }

    .slide::-webkit-scrollbar-thumb {
      height: 3px;
      border-radius: 1px;
      background: #f5f5f5;
    }

    .slide {
      height: 700px;
      overflow: auto;

      .group-member-list {
        max-height: 290;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        border-bottom: solid 1px #e7e7e7;

        .member {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 70px;

          img {
            width: 42px;
            height: 42px;
          }

          &:hover {
            background-color: #e6e6e6;
          }
        }
      }

      .setting {
        //height: 230px;
        border-bottom: solid 1px #e7e7e7;

        .setting-info {
          margin-top: 20px;
          height: 230px;
          border-bottom: solid 1px #e7e7e7;

          .line {
            height: 60px;
            font-size: 15px;
            line-height: 22px;
            cursor: pointer;
            color: #05070a;
          }
        }

        .open-and-close {
          margin-top: 10px;
          margin-bottom: 20px;

          .open-close-label {
            display: inline-block;
            width: 165px;
            height: 12px;
          }

          .open-close {
            display: inline-block;
            height: 12px;
          }
        }

        p {
          height: 22px;
          font-size: 15px;
          line-height: 22px;
          cursor: pointer;
          color: #05070a;
        }

        div {
          font-size: 14px;
          color: #808181;
        }
      }

      .sign-out {
        height: 60px;
        line-height: 60px;
        text-align: center;

        button {
          color: #f45d5d;
          border: none;
          background-color: #f5f5f5;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
