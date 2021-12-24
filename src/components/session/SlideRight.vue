<template>
  <div class="page-top-dian" @click="displays(slide)">
    <img src="https://cdn.jksusu.cn/diandaindian.png" />
  </div>
  <div v-if="slideStatus" class="sliding-frame">
    <div v-if="select.accept_type == 'personal'" class="person">
      <div class="sliding-frame-top juli">
        <div class="frame">
          <div
            style="
              width: 42px;
              height: 42px;
              background: url(https://cdn.jksusu.cn/page-add.png);
              background-size: 100%;
            "
          ></div>
          <span style>添加</span>
        </div>
        <div class="frame">
          <el-avatar
            shape="square"
            :size="42"
            :src="personal.head_image"
            @error="errorHandler"
          ></el-avatar>
          <span>{{ personal.name }}</span>
        </div>
      </div>
      <div class="juli">
        <div class="open-close-label">
          <p>消息免打扰</p>
        </div>
        <div
          class="open-close"
          @click="updateConfig('personal', 'disturb', personal.disturb)"
        >
          <el-switch v-model="personal.disturb" active-color="#13ce66" />
        </div>
        <div class="open-close-label">
          <p>置顶聊天</p>
        </div>
        <div class="open-close" @click="updateConfig('personal', 'topping', personal.topping)">
          <el-switch v-model="personal.topping" active-color="#13ce66" />
        </div>
        <div class="open-close-label">
          <p>星标朋友</p>
        </div>
        <div
          class="open-close"
          @click="updateConfig('personal', 'star', personal.star)"
        >
          <el-switch v-model="personal.star" active-color="#13ce66" />
        </div>
      </div>
    </div>

    <div v-if="select.accept_type == 'group'" class="group juli">
      <div class="search-group-member">
        <div class="searchs">
          <input
            class="search-input"
            placeholder="搜索"
            type="text"
            @click="input()"
          />
          <div class="search-btn">
            <img src="http://cdn.jksusu.cn/seach.png" />
          </div>
        </div>
      </div>

      <div class="slide">
        <div class="group-member-list">
          <div class="member">
            <create-group title="pull_in_group">
              <div
                style="
                  width: 42px;
                  height: 42px;
                  background: url(http://cdn.jksusu.cn/page-add.png);
                  background-size: 100%;
                "
              ></div>
            </create-group>
            <span style>添加</span>
          </div>
          <div
            class="member"
            v-for="(item, index) in group.members"
            :key="index"
          >
            <img style="display: block" :src="item.head_image" />
            <span>{{ item.nickname }}</span>
          </div>
        </div>
        <div class="setting">
          <div class="setting-info">
            <div class="line">
              <span>群聊名称</span>
              <div>hahah</div>
            </div>
            <div class="line">
              <spanp>群公告</spanp>
              <div>hahah</div>
            </div>
            <div class="line">
              <span>备注</span>
              <div>hahah</div>
            </div>
            <div class="line">
              <span>我在本群的昵称</span>
              <div>hahah</div>
            </div>
          </div>

          <div class="open-and-close">
            <div class="open-close-label">
              <p>显示群成员昵称</p>
            </div>
            <div class="open-close">
              <el-switch
                v-model="group.show_nicknames"
                active-color="#13ce66"
              />
            </div>

            <div class="open-close-label">
              <p>消息免打扰</p>
            </div>
            <div class="open-close">
              <el-switch v-model="group.dont_disturb" active-color="#13ce66" />
            </div>

            <div class="open-close-label">
              <p>置顶聊天</p>
            </div>
            <div class="open-close">
              <el-switch v-model="group.topping" active-color="#13ce66" />
            </div>

            <div class="open-close-label">
              <p>保存到通讯录</p>
            </div>
            <div class="open-close">
              <el-switch v-model="group.preservation" active-color="#13ce66" />
            </div>
          </div>
        </div>
        <div class="sign-out">
          <button type="button">删除并退出</button>
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
import sessionEffect from "../../utils/sessionEffect";

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
</script>

<style scoped lang="scss">
.page-top-dian {
  display: flex;
  align-items: center;
  width: 25px;
  margin-right: 15px;
}
.sliding-frame {
  width: 250px;
  height: 800px;
  background-color: #f5f5f5;
  z-index: 1;
  position: absolute;
  right: -250px;
  top: 0;

  .person {
    .sliding-frame-top {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      height: 90px;
      border-bottom: 1px solid #e2e2e2;

      .frame {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 70px;
        height: 70px;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        .add {
          width: 42px;
          height: 42px;
          background: url(https://cdn.jksusu.cn/page-add.png);
          background-size: 100%;
        }

        img {
          width: 42px;
          height: 42px;
        }
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
