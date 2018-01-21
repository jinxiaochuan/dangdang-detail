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

    props: ['videoUrl', 'videoPoster', 'videoTitle', 'videoDuration'],

    data: function () {
        return {
            timer: null,
            canplay: false, // 是否可以播放
            poster: true, // 是否展示封面图片
            loading: false, // 是否处于加载中
            playing: false, // 是否处于播放中
            controlBar: false, // 是否展示控制面板
            isPause: true, // 是否处于暂停状态
            playError: false, // 是否播放时发生错误
            duration: '', // 总时长
            currentTime: '', // 当前时间
            spaceX: 0, // touch处位置
        }
    },

    computed: {
        // 不同设备的进度条长度不同，须计算
        progressBarWidth: function(){
            return $(this.$refs.progressTrackEl).width()
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
            left = left > this.progressBarWidth ? this.progressBarWidth : (left < 15 ? 15 : left);
            this.currentTime = (left - 15) / (this.progressBarWidth - 15) * this.duration;
            this.$refs.videoPlayer.currentTime = this.currentTime;
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
            var video = this.$refs.videoPlayer;
            if(video.requestFullscreen){
                video.requestFullscreen()
                return
            }
            if(video.mozRequestFullScreen){
                video.mozRequestFullScreen()
                return
            }
            if(video.msRequestFullscreen){
                video.msRequestFullscreen()
                return
            }
            if(video.oRequestFullscreen){
                video.oRequestFullscreen()
                return
            }
            if(video.webkitRequestFullScreen){
                video.webkitRequestFullScreen()
                return
            }
        },

        eventListener () {
            var self = this;

            // 客户端开始请求数据
            this.$refs.videoPlayer.addEventListener('loadstart', function(){
                self.loading = true;
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
                self.poster = false;
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
