<template>
  <div style="display: inline-block" @click="videoVisible = true">
    <slot></slot>
  </div>

  <el-dialog v-model="videoVisible" @open="open" width="550px">
    <div>
      <video id="localVideo" autoplay></video>
    </div>
    <div>
      <video width="400" id="remoteVideo" autoplay class="hidden" ref="videos"></video>
    </div>
  </el-dialog>

</template>

<script>
export default {
  name: "Eject",
  data() {
    return {
      videoVisible: false,//dialog
    };
  },
  props: ['title'],
  methods: {
    open() {
      //获取title
      if (this.title === 'video') {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          let _this = this;

          navigator.mediaDevices.getUserMedia({video: true,}).then(function (stream) {
            _this.MediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[1];
            var video = _this.$refs.videos;
            video["srcObject"] = stream;
            video.play();
          }).catch(function (err) {
            console.log(err);
          });

        }
      } else {
        alert('暂不支持');
        this.videoVisible = false;
      }
    },
  }
}
</script>

<style scoped>

</style>