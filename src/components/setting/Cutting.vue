<template>
  <div @click="showCutting()">
    <slot></slot>
  </div>
  <el-dialog v-model="isShow" title="更换头像" width="550px">
    <div class="cut">
      <vue-cropper ref="cropper" :img="option.img" :output-size="option.size" :output-type="option.outputType"
                   :info="true" :full="option.full" :fixed="fixed" :fixed-number="fixedNumber"
                   :can-move="option.canMove" :can-move-box="option.canMoveBox" :fixed-box="option.fixedBox"
                   :original="option.original"
                   :auto-crop="option.autoCrop" :auto-crop-width="option.autoCropWidth"
                   :auto-crop-height="option.autoCropHeight" :center-box="option.centerBox"
                   @real-time="realTime" :high="option.high"
                   mode="cover" :max-img-size="option.max"></vue-cropper>
    </div>
    <div class="test-button">
      <label class="btn" for="uploads">选择图片</label>
      <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);"
             accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
      <button @click="rotateLeft" class="btn">左旋转</button>
      <button @click="rotateRight" class="btn">右旋转</button>
      <a @click="() => option.img = ''" class="btn">清除</a>
      <a @click="saveHeadImage" class="btn">更换头像</a>
    </div>
  </el-dialog>
</template>

<script>
import 'vue-cropper/dist/index.css'
import {VueCropper} from "vue-cropper";
import {updateImage} from "../../api/relation";
import {ElMessage} from "element-plus";
import memberEffect from "../../utils/memberEffect";

export default {
  name: "Cutting",
  components: {VueCropper},
  data() {
    return {
      isShow: false,
      option: {
        img: '',
        size: 1,
        full: false,
        outputType: 'png',
        canMove: true,
        fixedBox: false,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 160,
        autoCropHeight: 150,
        centerBox: false,
        high: true,
        max: 99999,
      },
      fixed: true,
      fixedNumber: [12, 12],
    }
  },
  methods: {
    showCutting() {
      this.isShow ? this.isShow = false : this.isShow = true;
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    uploadImg(e, num) {
      var file = e.target.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        ElMessage.error('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false;
      }
      var reader = new FileReader();
      reader.onload = (e) => {
        let data;
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          this.option.img = data;
        } else if (num === 2) {
          this.example2.img = data;
        }
      };
      reader.readAsArrayBuffer(file);
    },
    //更换头像
    saveHeadImage() {
      this.$refs.cropper.getCropBlob(data => {
        // 获取截图的blob数据
        let aTime = new Date().getTime() // 取时间戳，给文件命名
        let fileName = aTime + '.' + data.type.substr(6) // 给文件名加后缀
        let file = new window.File([data], fileName, {type: data.type}) // blob转file

        const formData = new FormData();
        formData.append("file", file);
        updateImage(formData).then((res) => {
              if (res.code === 200) {
                this.isShow = false
                const {getMember} = memberEffect();
                getMember();
                ElMessage.success("更换成功");
              }
            },
        );

      })
    },
  },
}
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}

.cut {
  width: 200px;
  height: 200px;
  margin: 30px auto;
}

.test-button {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
}

.btn {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #c0ccda;
  color: #1f2d3d;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 20px 10px 0px 0px;
  padding: 9px 15px;
  font-size: 14px;
  border-radius: 4px;
  color: #fff;
  background-color: #50bfff;
  border-color: #50bfff;
  transition: all .2s ease;
  text-decoration: none;
  user-select: none;
}
</style>