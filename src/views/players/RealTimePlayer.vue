<template>
  <div>
    <el-container>
      <el-header>
        <el-select v-model="channel"
                   placeholder="请选择摄像头">
          <el-option v-for="item in this.$hkNvrData.channels"
                     :key="item.code"
                     :label="item.name+' '+item.ip"
                     :value="item.code" />
        </el-select>
        <el-button type="primary"
                   @click="connection()">连接</el-button>
      </el-header>
      <el-main>
        <el-space fill
                  wrap
                  direction="vertical"
                  style="width: 100%;  border: 1px solid var(--el-border-color);">
          <video class="video-streaming"
                 ref="player"
                 muted
                 autoplay></video> <video class="video-streaming"
                 ref="player"
                 muted
                 autoplay></video>
        </el-space>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'RealTimePlayer',
  data() {
    return {
      channel: undefined,
    }
  },
  mounted() {},
  methods: {
    /**
     * 连接数据
     */
    connection() {
      if (this.$flvjs.isSupported()) {
        let video = this.$refs.player
        let channelCode = this.channel
        if (video) {
          var camera
          this.$hkNvrData.channels.forEach(function (value) {
            if (value.code === channelCode) {
              camera = value
            }
          })
          if (camera) {
            let username = this.$hkNvrData.username
            let password = this.$hkNvrData.password
            let ip = this.$hkNvrData.ip
            let port = 554

            let rtspTemplate = `rtsp://${username}:${password}@${ip}:${port}/Streaming/tracks/${channelCode}01/`
            console.log(rtspTemplate)
            this.player = this.$flvjs.createPlayer({
              type: 'flv',
              isLive: true,
              url: `ws://localhost:8888/rtsp/${ip}/?url=${rtspTemplate}`,
            })
            console.log(`ws://localhost:8888/rtsp/${ip}/?url=${rtspTemplate}`)
            console.log(this.player)
            this.player.attachMediaElement(video)
            try {
              this.player.load()
              this.player.play()
            } catch (error) {
              console.log(error)
            }
          }
        } else {
          console.log('失败')
        }
      }
    },
  },
}
</script>

<style>
</style>