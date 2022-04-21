<template>
  <div>
    <el-container>
      <el-header>
        <el-space wrap>
          <el-radio-group v-model="type">
            <el-radio-button label="选择摄像头" />
            <el-radio-button label="rtsp" />
          </el-radio-group>
        </el-space>
        <el-space wrap>
          <el-select v-model="channel"
                     v-if="type==='选择摄像头'"
                     placeholder="请选择摄像头">
            <el-option v-for="item in this.$hkNvrData.channels"
                       :key="item.code"
                       :label="item.name+' '+item.ip"
                       :value="item.code" />
          </el-select>
          <el-input v-if="type==='rtsp'"
                    v-model="rtsp"
                    placeholder="rtsp input"
                    style="width:400px"
                    clearable />
        </el-space>
        <el-space wrap>
          <el-button type="primary"
                     @click="connection()">连接</el-button>
        </el-space>
      </el-header>
      <el-main>
        <el-space fill
                  wrap
                  direction="vertical"
                  style="width: 100%;  border: 1px solid var(--el-border-color);">
          <video class="demo-video"
                 ref="player"
                 muted
                 autoplay></video>
        </el-space>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { ElNotification } from 'element-plus'
export default {
  name: 'RealTimePlayer',
  data() {
    return {
      channel: undefined,
      player: undefined,
      type: '选择摄像头',
      rtsp: undefined,
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
          let rtsp
          if (this.type === '选择摄像头') {
            let username = this.$hkNvrData.username
            let password = this.$hkNvrData.password
            let ip = this.$hkNvrData.ip
            let port = 554
            rtsp = `rtsp://${username}:${password}@${ip}:${port}/Streaming/tracks/${channelCode}01/`
          } else if (this.type === 'rtsp') {
            rtsp = this.rtsp
          }
          this.player = this.$flvjs.createPlayer({
            type: 'flv',
            isLive: true,
            url: `ws://localhost:8888/rtsp/${channelCode}/?url=${rtsp}`,
          })
          this.player.attachMediaElement(video)
          try {
            this.player.load()
            this.player.play()
            ElNotification({
              title: '连接成功',
              message: '连接流成功',
              type: 'success',
            })
          } catch (error) {
            ElNotification({
              title: 'Error',
              message: error,
              type: 'error',
            })
          }
        } else {
          ElNotification({
            title: '连接失败',
            message: '为找到播放器对象',
            type: 'warning',
          })
        }
      }
    },
  },
}
</script>

<style>
</style>