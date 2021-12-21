<template>
    <div class="item">
        <el-avatar
            class="head_image"
            shape="square"
            :size="42"
            :src="src"
            @error="errorHandler"
        ></el-avatar>
        <div class="text">
            <div class="name">{{ name }}</div>
            <div class="msg">{{ msg }}</div>
        </div>
        <div class="end">
            <div class="time">{{ time }}</div>
            <div class="icon">
                <el-icon v-if="icon">
                    <warning-filled />
                </el-icon>
            </div>
        </div>
    </div>
</template>

<script setup>
import { WarningFilled } from '@element-plus/icons'

const { src, name, msg, time, icon } = defineProps({
    src: {
        required: false,
        default: '00'
    },
    name: {
        required: false,
        default: '测试'
    },
    msg: {
        required: false,
        default: ''
    },
    time: {
        required: false,
        default: ''
    },
    icon: {
        required: false,
        default: false
    }
})
</script>

<style lang="scss" >
.item {
    display: flex;
    background-color: #e5e4e4;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;

    .head_image {
        margin-left: 18px;
        border-radius: 3px;
    }
    .text {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100px;
        margin-left: 18px;
        height: 100%;

        .name {
            line-height: 39px;
           // min-height: 30px;
            font-size: 1em;
            color: #000000;
        }

        .msg {
            line-height: 30px;
            //min-height: 30px;
            color: #999999;
            font-size: 0.7em;
        }
    }

    .end {
        cursor: pointer;
        width: 60px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;

        .time {
            line-height: 39px;
            min-height: 30px;
            font-size: 1em;
            color: #999999;
        }
        .icon {
            line-height: 30px;
            min-height: 30px;
            color: #999999;
        }
    }
    &:hover {
        background-color: #d9d8d9;
    }
}
</style>