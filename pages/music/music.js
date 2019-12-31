// pages/music/music.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicList: [
      {
        title: '《阿尔布拉罕宫的回忆》',
        src: 'http://music.video.cntv.cn.dnion.com/2014/12/09/5022893_preview.mp4',
        epname: '',
        singer: 'Tarrega',
        cover: 'http://cdn-srdl.app.cctv.com/image/2019/12/17/4871087053665814669.jpg',
      },
      {
        title: 'D大调卡农与吉格',
        src: 'http://music.video.cntv.cn.dnion.com/2015/03/24/5022897_preview.mp4',
        cover: 'http://cdn-srdl.app.cctv.com/image/2019/12/17/4871091738762103534.jpg',
        epname: '',
        singer: 'Pachelbel',
      },
    ],
    curentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.timeUpdate = this.timeUpdate;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  timeUpdate: function (bgMusic) {
    console.log('onTimeUpdate: ', bgMusic.currentTime);
  },
  playMusic: function () {
    const { curentIndex, musicList } = this.data;
    const music = musicList[curentIndex]
    app.playAudio(music)
  },
  pauseMusic: function () {
    app.pauseAduio();
  },
  playNextMusic: function () {
    const { curentIndex, musicList } = this.data;
    let nextIndex = curentIndex + 1;
    if (nextIndex === musicList.length) {
      nextIndex = 0;
    }
    const media = musicList[nextIndex];
    app.playAudio(media);
    this.setData({
      curentIndex: nextIndex
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})