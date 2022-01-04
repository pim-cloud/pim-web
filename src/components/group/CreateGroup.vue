<template>
  <el-dropdown-item @click="onShow">创建群聊</el-dropdown-item>
  <el-dialog v-model="showStatus" width="550px" append-to-body>
    <div class="creat-group">
      <div class="friend-list">
        <!-- <div v-for="(value,initials) in friendsList" :key="initials">
          <div class="labels">{{ initials }}</div>
          <div
            class="list"
            v-for="(item,index) in value"
            :key="index"
            @click="select(item)"
            :class="{ active: selectCode === item.code }"
          >
            <el-avatar
              style="margin-left: 8px;"
              shape="square"
              :size="42"
              :src="item.head_image"
              @error="errorHandler"
            ></el-avatar>
            <div class="nickname">
              <p>{{ item.nickname }}</p>
            </div>
            <div style="width: 60px"></div>
            <div class="gouxuan" :class="{ active: selectCode === item.code }">
              <img v-if="!selectList[item.code]" src="https://cdn.jksusu.cn/gouxuan.png" />
              <img v-else src="https://cdn.jksusu.cn/gouxuaned.png" />
            </div>
          </div>
        </div> -->
        <div
          class="list"
          v-for="(item, index) in friendsList"
          :key="index"
          @click="select(item)"
          :class="{ active: selectCode === item.code }"
        >
          <el-avatar
            style="margin-left: 8px"
            shape="square"
            :size="42"
            :src="item.head_image"
            @error="errorHandler"
          ></el-avatar>
          <div class="nickname">
            <p>{{ item.showName }}</p>
          </div>
          <div style="width: 60px"></div>
          <div class="gouxuan" :class="{ active: selectCode === item.code }">
            <img
              v-if="!selectList[item.code]"
              src="https://cdn.jksusu.cn/gouxuan.png"
            />
            <img v-else src="https://cdn.jksusu.cn/gouxuaned.png" />
          </div>
        </div>
      </div>

      <div class="selected-list">
        <p style="text-align: center">
          {{
            selectNumber === 0
              ? "请勾选需要添加的联系人"
              : "已选择" + selectNumber + "个联系人"
          }}
        </p>

        <div class="selectLists">
          <div v-for="(item, index) in selectList" :key="index">
            <div class="list">
              <el-avatar
                style="margin-left: 8px"
                shape="square"
                :size="42"
                :src="item.head_image"
                @error="errorHandler"
              ></el-avatar>
              <div class="nickname">
                <p>{{ item.showName }}</p>
              </div>
              <div style="width: 60px"></div>
              <div class="gouxuan" @click="select(item)">
                <img src="https://cdn.jksusu.cn/close.png" />
              </div>
            </div>
          </div>
        </div>

        <div class="sureAndCancel">
          <div class="sure-btn btn" @click="setGroupName()">确定</div>
          <div class="cancel-btn btn" @click="onShow">取消</div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ElMessage, ElMessageBox } from "element-plus";
import memberEffect from "../../utils/memberEffect";
import commonEffect from "../../utils/commonEffect";
import Item from "../../components/list/Item.vue";
import { createGroup } from "../../api/relation";
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";

//计算属性
const store = useStore();
const { contactFriends } = memberEffect();
const friendsList = commonEffect().friendLists;
const getMember = computed(() => store.state.member);

const selectCode = ref(""); //当前选中code，渲染选中class
const selectNumber = ref(0);
const selectList = reactive({});
const showStatus = ref(false);

const onShow = () => {
  showStatus.value ? (showStatus.value = false) : (showStatus.value = true);
};
//列表选择
const select = (row) => {
  const { code } = row;
  selectCode.value = code;
  if (!selectList[code]) {
    selectNumber.value++;
    selectList[code] = row;
  } else {
    selectNumber.value--;
    delete selectList[code];
  }
};

//创建群聊
const setGroupName = () => {
  if (JSON.stringify(selectList) == "{}") {
    return false;
  }
  ElMessageBox.prompt("请设置群名", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  }).then(({ value }) => {
    createGroups(value);
  });
};
const createGroups = (nickname) => {
  var arr = [];
  for (let key in selectList) {
    arr.push(key);
  }
  // group info
  const data = {
    head_image: "timg.jfif",
    nickname: nickname,
    group_member: arr,
  };
  createGroup(data).then((res) => {
    if (res.code != 200) {
      ElMessage.error("创建失败");
      return;
    }
    const { getContactGroupLists } = memberEffect();
    getContactGroupLists();
    onShow();
  });
};
</script>

<style scoped lang="scss">
.add-btn {
  display: inline-block;
  border-radius: 5px;
  width: 25px;
  height: 100%;
  background-color: #e2e2e2;
  margin-left: 10px;
  line-height: 24px;

  img {
    padding: 0 0 0 7px;
  }

  &:hover {
    background-color: #d1d1d1;
  }
}
.creat-group {
  height: 400px;
  display: flex;

  .active {
    background-color: #c5c5c6;
  }

  .friend-list {
    width: 275px;
    height: 420px;
    border-right: solid 1px #d6d6d6;
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative; //绝对定位可以滚动

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      height: 3px;
      border-radius: 5px;
      background: #aeacaa;
    }

    .labels {
      cursor: pointer;
      height: 32px;
      line-height: 41px;
      font-size: 12px;
      color: #999;
      margin-left: 18px;
    }

    .list {
      display: flex;
      align-items: center;
      height: 60px;

      .nickname {
        width: 100px;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 8px;
      }

      .gouxuan {
        width: 20px;
        height: 20px;
        float: right;

        img {
          border: none;
          vertical-align: middle;
        }
      }

      &:hover {
        background-color: #d9d8d9;
      }
    }
  }

  .selected-list {
    width: 275px;
    height: 420px;

    .selectLists {
      height: 320px;
      overflow-y: scroll;
      overflow-x: hidden;
      position: relative; //绝对定位可以滚动

      &::-webkit-scrollbar {
        width: 5px;
      }

      &::-webkit-scrollbar-thumb {
        height: 3px;
        border-radius: 5px;
        background: #aeacaa;
      }

      .list {
        display: flex;
        align-items: center;
        height: 60px;

        .touxiang {
          border-radius: 3px;
          width: 42px;
          height: 42px;
          margin-left: 8px;
        }

        .nickname {
          cursor: pointer;
          width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-left: 8px;
        }

        .gouxuan {
          width: 20px;
          height: 20px;
          float: right;
        }
        &:hover {
          background-color: #d9d8d9;
        }
      }
    }

    .sureAndCancel {
      height: 60px;

      .btn {
        width: 65px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        margin: auto;
        font-size: 14px;
      }

      .sure-btn {
        cursor: pointer;
        display: inline-block;
        color: white;
        background-color: #1aac19;
        margin-left: 75px;

        &:hover {
          background-color: #129611;
        }
      }

      .cancel-btn {
        cursor: pointer;
        display: inline-block;
        background-color: #ffffff;
        border: solid 1px #e7e7e7;
        margin-left: 10px;

        &:hover {
          background-color: #d9d8d9;
        }
      }
    }
  }
}
</style>