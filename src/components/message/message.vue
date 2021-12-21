<template>
    <li>
        <div
            class="msg_container"
            v-for="(item, index) in data.lists"
            :key="index"
        >
            <div class="time">
                <p>14:00</p>
            </div>
            <div class="com" :class="(item.main_code === code ? 'right' : 'left')">
                <div class="content" v-if="item.content_type === 'text'">
                    <span>{{ item.content }}</span>
                </div>
                <div class="avatar">
                    <el-avatar shape="square" :size="42" :src="item.main_code === code ? data.send.head_image : data.accept.head_image" @error="errorHandler"></el-avatar>
                </div>
            </div>
        </div>
    </li>
</template>

<script setup>
const { data, code } = defineProps({
    data: {
        required: false,
        default: ''
    },
    code: {
        required: false,
        default: ''
    },
})
</script>

<style lang="scss">
li {
    .msg_container {
        display: flex;
        flex-direction: column;

        .time {
            text-align: center;
        }
        .com {
            display: flex;
            justify-content: flex-end;
        }
        .right {
            .content {
                background-color: #9eea6a;
            }
            .avatar {
                padding: 0 5px 0 10px;
            }
        }
        .left {
            flex-flow: row-reverse;
            .content {
                background-color: #ffffff;
            }
            .avatar {
                padding: 0 10px 0 5px;
            }
        }
        .content {
            position: relative;
            max-width: 55%;
            line-height: 3;
            font-size: 16px;
            color: #232323;
            border-radius: 8px;
            padding: 0px 9px;
        }
    }
}
</style>