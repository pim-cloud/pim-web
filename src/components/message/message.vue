<template>
    <li>
        <div :class="(data.main_code === code ? 'right' : 'left')">
            <el-avatar class="avatar" shape="square" :size="38" :src="src" @error="errorHandler"></el-avatar>
            <div class="text" v-if="data.content_type === 'text'">{{ data.content }}</div>
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
    margin-bottom: 15px;

    .right {
        text-align: right;
        .avatar {
            float: right;
            margin: 0 4px 0 10px;
        }
        .text {
            background-color: #9eea6a;
        }
    }
    .left {
        margin-left: 4px;
        .avatar {
            float: left;
            margin: 0 10px 0 10px;
        }
    }
    .avatar {
        float: left;
        margin: 0 5px 0 0;
        border-radius: 5px;
    }
    .text {
        display: inline-block;
        position: relative;
        max-width: 230px;
        min-height: 30px;
        line-height: 2.2;
        font-size: 17px;
        background-color: #fff;
        color: #000;
        border-radius: 4px;
        padding: 0px 9px;
    }
}
</style>