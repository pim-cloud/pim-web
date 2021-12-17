<template>
    <el-popover v-model:visible="visible" placement="top" :width="250" append-to-body>
        <div class="emoji_list">
            <div class="list" v-for="(item, index) in emojis" :key="index">
                <li @click="add(ite)" v-for="(ite, i) in item" :key="i">{{ ite }}</li>
            </div>
        </div>
        <template #reference>
            <div @click="visible = true">
                <div style="font-size: 20px;cursor: pointer;">😃</div>
            </div>
        </template>
    </el-popover>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(false)
const icon = ref('😡')

const emojis = {
    '😀': [
        '😀', '😄', '😅', '🤣', '😂', '😉', '😊', '😍', '😘', '😜',
        '😝', '😏', '😒', '🙄', '😔', '😴', '😷', '🤮', '🥵', '😎',
        '😮', '😰', '😭', '😱', '😩', '😡', '💀', '👽', '🤓', '🥳',
        '😺', '😹', '😻', '🤚', '💩', '👍', '👎', '👏', '🙏', '💪'
    ]
}

const add = (emoji) => {
    visible.value = false
    icon.value = emoji
    addIcon()
}

const emits = defineEmits(['addIcon'])
const addIcon = () => {
    emits('addIcon',icon.value)
}

</script>

<style lang="scss" >
.el-popover.el-popper {
    height: 200px;
    min-width: 200px;
}

.emoji_list {
    cursor: pointer;
    white-space: pre-wrap;
    height: 200px;
    min-width: 200px;

    .list {
        cursor: pointer;
        white-space: pre-wrap;
        display: flex;
        flex-wrap: wrap;

        li {
            font-size: 20px;
            border-radius: 3px;

            &:hover {
                background-color: #d9d8d9;
            }
        }
    }
}
</style>