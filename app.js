//app.js
const bgMusic = wx.getBackgroundAudioManager()

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    this.initAudioPlayer();

  
  },
  initAudioPlayer: function(){
    var _this = this;
    bgMusic.onEnded(function(){
      console.log('播放结束;');
    })
    bgMusic.onPlay(function () {
      console.log('开始播放;');
    })
    bgMusic.onPause(function () {
      console.log('暂停播放;');
    })
    bgMusic.onTimeUpdate(function () {

      _this.timeUpdate(bgMusic)
    })
  },
  playAudio: function(media){
        // string src
    // 音频的数据源（2.2.3 开始支持云文件ID）。默认为空字符串，当设置了新的 src 时，会自动开始播放，目前支持的格式有 m4a, aac, mp3, wav。

    // number startTime
    // 音频开始播放的位置（单位：s）。

    // string title
    // 音频标题，用于原生音频播放器音频标题（必填）。原生音频播放器中的分享功能，分享出去的卡片标题，也将使用该值。

    // string epname
    // 专辑名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。

    // string singer
    // 歌手名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。

    // string coverImgUrl
    // 封面图 URL，用于做原生音频播放器背景图。原生音频播放器中的分享功能，分享出去的卡片配图及背景也将使用该图。

    // string webUrl
    // 页面链接，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值。
    if (media) {
      bgMusic.src = media.src;
      bgMusic.title = media.title;
      bgMusic.epname = media.epname;
      bgMusic.singer = media.singer;
      bgMusic.coverImgUrl = media.cover;
    }else{
      // 又音频直接播放
      if (bgMusic.src){
        bgMusic.play()
      }
    }
  },
  pauseAduio: function(){
    bgMusic.pause();
  },

timeUpdate: function() {
  console.log('onTimeUpdate: ', bgMusic.currentTime);
},
  globalData: {
    userInfo: null
  }
})