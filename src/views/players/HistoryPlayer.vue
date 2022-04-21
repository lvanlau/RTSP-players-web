<template>
  <el-container style="height:100%">
    <el-header>
      <el-select v-model="channel"
                 placeholder="请选择数据源">
        <el-option v-for="item in this.$hkNvrData.channels"
                   :key="item.code"
                   :label="item.name+' '+item.ip"
                   :value="item.code" />
      </el-select>
      <el-date-picker v-model="channelDataTime"
                      type="datetimerange"
                      :picker-options="pickerOptions"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      align="right">
      </el-date-picker>
      <el-button type="primary"
                 @click="connection()">连接</el-button>
    </el-header>
    <el-main v-loading="loading">
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
</template>

<script>
import { ElNotification } from 'element-plus'
export default {
  name: 'HistoryPlayer',
  data() {
    return {
      loading: false, // 加载
      playerVideo: false, // 是否播放视频
      channel: '', // 选中是视频流
      channelDataTime: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
    }
  },
  methods: {
    /**
     * 连接历史数据
     */
    connection() {
      // rtsp://admin:zksx-12345@10.10.10.20:554/Streaming/tracks/101/?starttime=20220421T082905Z&endtime=20220421T092915Z
      // rtsp://admin:passwd@192.168.120.100:554/Streaming/tracks/201/?starttime=20200714T100000Z&endtime=20200714T110000Z
      //rtsp://[username]:[password]@[ip]:[port]/[codec]/[channel]/[subtype]/av_stream

      // 1、判断选中通讯端口
      if (!this.channel) {
        ElNotification({
          title: '连接失败',
          message: '没有选中的通讯视频端口',
          type: 'error',
        })
      }
      // 2、选中的时间
      if (!this.channelDataTime) {
        ElNotification({
          title: '连接失败',
          message: '没有选中的通讯视频时间段',
          type: 'error',
        })
      }
      let username = this.$hkNvrData.username
      let password = this.$hkNvrData.password
      let ip = this.$hkNvrData.ip
      let port = 554
      let channelCode = this.channel
      let startTime = new Date(this.channelDataTime[0]).format(
        'yyyyMMddThhmmssZ'
      )
      let endTime = new Date(this.channelDataTime[1]).format('yyyyMMddThhmmssZ')
      let rtspTemplate = `rtsp://${username}:${password}@${ip}:${port}/Streaming/tracks/${channelCode}01/?starttime=${startTime}&endtime=${endTime}`
      console.log(rtspTemplate)
      if (this.$flvjs.isSupported()) {
        let video = this.$refs.player
        if (video) {
          this.player = this.$flvjs.createPlayer({
            type: 'flv',
            isLive: true,
            url: `ws://localhost:8888/rtsp/${channelCode}/?url=${rtspTemplate}`,
          })
          this.player.attachMediaElement(video)
          try {
            this.player.load()
            this.player.play()
            ElNotification({
              title: '连接成功',
              message: '连接成功',
              type: 'success',
            })
          } catch (error) {
            console.log(error)
          }
        }
      }
    },
  },
}
</script>

<style>
</style>