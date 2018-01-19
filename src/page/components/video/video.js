var TPL_VIDEO = require('./video.tpl');

require('./video.less');

var Vue = require('vue');

Vue.filter('formatTime', function (value) {
  if (!value) return '00:00'
  var min = parseInt(value/60) > 9 ? parseInt(value/60) : '0' + parseInt(value/60);
  var sec = parseInt(value%60) > 9 ? parseInt(value%60) : '0' + parseInt(value%60);
  return min + ':' + sec
})

module.exports = Vue.extend({
    name: 'videoComponent',

    template: TPL_VIDEO,

    data: function () {
        return {
            timer: null,
            canplay: false, // 是否可以播放
            loading: true, // 是否处于加载中
            playing: false, // 是否处于播放中
            controlBar: false, // 是否展示控制面板
            isPause: true, // 是否处于暂停状态
            playError: false, // 是否播放时发生错误
            duration: '', // 总时长
            currentTime: '', // 当前时间
            spaceX: 0, // touch处位置
        }
    },

    methods: {

        progressStart (e) {
            // 记录下touchstart的时间
            this.spaceX = $(this.$refs.progressPlayEl).offset().left;
            this.spaceX  = this.spaceX < 15 ? 15 : this.spaceX;
        },

        progressMove (e) {
            clearTimeout(this.timer)
            var left = e.targetTouches[0].clientX - this.spaceX;
            left = left > 180 ? 180 : left;
            this.currentTime = (left - 15) / 165 * this.duration;
            this.$refs.videoPlayer.currentTime = this.currentTime < 0 ? 0 : this.currentTime;
        },

        progressEnd (e) {
            var self = this;
            this.timer = setTimeout(function(){
                self.controlBar = false;
                clearTimeout(self.timer)
            },2500)
        },

        videoPlay () {
            this.$refs.videoPlayer.play();
        },

        tapVideo () {
            var self = this;
            clearTimeout(this.timer)
            this.controlBar = !this.controlBar;
            if(this.controlBar){
                this.timer = setTimeout(function(){
                    self.controlBar = false;
                    clearTimeout(self.timer)
                },2500)
            }
        },

        togglePlay () {
            if(this.$refs.videoPlayer.paused){
                this.$refs.videoPlayer.play();
            }else {
                this.$refs.videoPlayer.pause();
            }
        },

        retry () {
            this.$refs.videoPlayer.load();
        },

        fullScreen () {
            var de = document.documentElement;
            if(de.requestFullscreen){
                de.requestFullscreen()
                return
            }
            if(de.mozRequestFullScreen){
                de.mozRequestFullScreen()
                return
            }
            if(de.webkitRequestFullScreen){
                de.webkitRequestFullScreen()
                return
            }
        },

        eventListener () {
            var self = this;

            // 客户端开始请求数据
            this.$refs.videoPlayer.addEventListener('loadstart', function(){
                console.log('客户端开始请求数据');
            }, false)

            // 客户端正在请求数据
            this.$refs.videoPlayer.addEventListener('progress', function(){
                console.log('客户端正在请求数据');
            }, false)

            // 延迟下载
            this.$refs.videoPlayer.addEventListener('suspend', function(){
                console.log('延迟下载');
            }, false)

            // 客户端主动终止下载（不是因为错误引起）
            this.$refs.videoPlayer.addEventListener('abort', function(){
                console.log('客户端主动终止下载（不是因为错误引起）');
            }, false)

            // 请求数据时遇到错误
            this.$refs.videoPlayer.addEventListener('error', function(){
                console.log('请求数据时遇到错误');
                self.playError = true;
                self.controlBar = false;
            }, false)

            // 网速失速
            this.$refs.videoPlayer.addEventListener('stalled', function(){
                console.log('网速失速');
            }, false)

            // play()和autoplay开始播放时触发
            this.$refs.videoPlayer.addEventListener('play', function(){
                console.log('play()和autoplay开始播放时触发');
                self.isPause = false;
            }, false)

            // pause()触发
            this.$refs.videoPlayer.addEventListener('pause', function(){
                console.log('pause()触发');
                self.isPause = true;
                self.playing = false;
            }, false)

            // 成功获取资源长度
            this.$refs.videoPlayer.addEventListener('loadedmetadata', function(){
                console.log('成功获取资源长度');
                self.duration = this.duration;
            }, false)

            // 等待数据，并非错误
            this.$refs.videoPlayer.addEventListener('waiting', function(){
                console.log('等待数据，并非错误');
            }, false)

            // 开始回放
            this.$refs.videoPlayer.addEventListener('playing', function(){
                console.log('开始回放');
                self.loading = false;
                self.isPause = false;
                self.playing = true;
            }, false)

            // 可以播放，但中途可能因为加载而暂停
            this.$refs.videoPlayer.addEventListener('canplay', function(){
                console.log('可以播放，但中途可能因为加载而暂停');
            }, false)

            // 可以播放，歌曲全部加载完毕
            this.$refs.videoPlayer.addEventListener('canplaythrough', function(e){
                console.log('可以播放，歌曲全部加载完毕');
                self.playError = false;
                self.canplay = true;
            }, false)

            // 播放时间改变
            this.$refs.videoPlayer.addEventListener('timeupdate', function(e){
                console.log('播放时间改变');
                self.currentTime = this.currentTime;
            }, false)


        }
    },

    mounted: function(){
        this.$nextTick(() =>{
            this.eventListener()
        })
    }
})
