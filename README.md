# rtsp-players-web

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 使用vlc等工具测试，确保rtsp流可连接
后端环境：node express
安装第三方依赖：`npm install express express-ws fluent-ffmpeg websocket-stream -S -D`

其中setFfmpegPath这里是指明了ffmpeg的安装路径，如果没有安装，请看第4点
启动后端，node ffmpeg.index.js
