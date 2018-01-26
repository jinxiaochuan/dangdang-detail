var TPL_VIDEO = require('./video.tpl');

require('./video.less');

var Vue = require('vue');

Vue.filter('formatTime', function (value) {
  if (!value) return '00:00'
  var min = parseInt(value/60) > 9 ? parseInt(value/60) : '0' + parseInt(value/60);
  var sec = parseInt(value%60) > 9 ? parseInt(value%60) : '0' + parseInt(value%60);
  return min + ':' + sec
})

// 关于播放进度条的操作须注意以下几点
// 1. 由于不同的设备的尺寸不同，进度条的总长度也不同，所以页面初始化时须计算进度条的长度
// 2. 播放的位置的定位可采用两种方式：1> 采用px单位，需要计算当前位置时间/总时长*总进度条长度 （横竖屏切换时存在定位不准的问题）
//                               2> 采用百分比，需要计算当前位置时间/总时长 （强烈建议）
// 3. 由于存在横竖屏的切换，此时会造成：总进度条长度的改变，此时需要更新播放的位置，此时问题就出现了：
//    由于js仅仅能检测到横竖屏的切换前的瞬间，此时获取进度条的长度肯定是之前的，唯一的方式就是setTimeout，但是不同的设备切换横竖屏的过程时间长短不一；
//    所以更新获取进度条的长度放在touchstart触发时计算即可，但是播放的位置的重新计算必须采用百分比，这样不会发生横竖屏的切换时播放位置的定位不准的情况

module.exports = Vue.extend({
    name: 'videoComponent',

    template: TPL_VIDEO,

    props: ['videoUrl', 'videoPoster', 'videoTitle', 'videoDuration'],

    data: function () {
        return {
            videoWHTimer: null,
            fullTimer: null,
            progressTimer: null,
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
            currentPercent: '0%', // 当前播放的百分比
            spaceX: 0, // touch处位置
            progressBarWidth: '', // 当前设备的进度条长度 注意: 之所以不在computed中进行设置是由于当横竖屏切换时无法重新设置该属性的值
            fullscreen : false
        }
    },

    computed: {

        progressPlayElWid: function () {
            return this.duration ? this.currentTime/this.duration * (this.progressBarWidth - 15) + 15 + 'px' : '15px'
        }

    },

    watch: {
        currentTime: function(val, oldval){
            this.currentPercent = val / this.duration * 100 + '%';
        }
    },

    methods: {

        progressStart (e) {
            // 记录下touchstart的时间
            this.spaceX = $(this.$refs.progressPlayEl).offset().left;
            this.spaceX  = this.spaceX < 0 ? 0 : this.spaceX;
            // 重新更新当前进度条的长度
            this.initProgressBarWidth()
        },

        progressMove (e) {
            this.timer && clearTimeout(this.timer)
            var left = e.targetTouches[0].clientX - this.spaceX;
            left = left > this.progressBarWidth ? this.progressBarWidth : (left < 0 ? 0 : left);
            this.currentTime = left / this.progressBarWidth * this.duration;
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

        videoPause () {
            this.$refs.videoPlayer.pause();
        },

        tapVideo () {
            var self = this;
            this.timer && clearTimeout(this.timer)
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
            var self = this;
            // document.documentElement.requestFullScreen();
            // screen.orientation.lock("landscape-primary");

            // window.screen.lockOrientation = screen.lockOrientation ||screen.mozLockOrientation || screen.msLockOrientation;
            // window.screen.lockOrientation(["landscape-primary","landscape-secondary"]);

            // var video = this.$refs.videoPlayer;
            // if(video.requestFullscreen){
            //     video.requestFullscreen()
            //     return
            // }
            // if(video.mozRequestFullScreen){
            //     video.mozRequestFullScreen()
            //     return
            // }
            // if(video.msRequestFullscreen){
            //     video.msRequestFullscreen()
            //     return
            // }
            // if(video.oRequestFullscreen){
            //     video.oRequestFullscreen()
            //     return
            // }
            // if(video.webkitRequestFullScreen){
            //     video.webkitRequestFullScreen()
            //     return
            // }

            this.fullscreen = !this.fullscreen;
            if(!this.fullscreen){
                $('.video-player-wrap').css({
                    'width': '100%',
                    'height': '100%'
                }).removeClass('landscape')
                $('body').removeClass('full');
                this.videoWHTimer = setTimeout(function(){
                    self.initVideoWH();
                    clearTimeout(self.videoWHTimer);
                }, 500)
                return
            }
            var clientWidth = this.getClientWidth();
            var clientHeight = this.getClientHeight();
            $('.video-player-wrap').css({
                'width': clientWidth,
                'height': clientHeight
            }).addClass('landscape');
            $('body').addClass('full');

        },

        getClientHeight () {
            var clientHeight = 0;

            if(document.body.clientHeight && document.documentElement.clientHeight){
                clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
            }else {
                clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
            }

            return clientHeight;
        },

        getClientWidth () {
            var clientWidth = 0;

            if(document.body.clientWidth && document.documentElement.clientWidth){
                clientWidth = Math.min(document.body.clientWidth, document.documentElement.clientWidth);
            }else {
                clientWidth = Math.max(document.body.clientWidth, document.documentElement.clientWidth);
            }

            return clientWidth;
        },

        initProgressBarWidth () {
            this.progressBarWidth = $(this.$refs.progressTrackEl).width();
        },

        initVideoWH () {
            $('.video-player-wrap').css({
                'width': $('.video-player-wrap').width(),
                'height': $('.video-player-wrap').height()
            })
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
                self.canplay = true;
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
                self.loading = true;
            }, false)

            // 开始回放
            this.$refs.videoPlayer.addEventListener('playing', function(){
                console.log('开始回放');
                self.isPause = false;
                self.playing = true;
                self.loading = false;
            }, false)

            // 可以播放，但中途可能因为加载而暂停
            this.$refs.videoPlayer.addEventListener('canplay', function(){
                console.log('可以播放，但中途可能因为加载而暂停');
                self.loading = false;
            }, false)

            // 可以播放，歌曲全部加载完毕
            this.$refs.videoPlayer.addEventListener('canplaythrough', function(e){
                console.log('可以播放，歌曲全部加载完毕');
                self.playError = false;
                self.loading = false;
            }, false)

            // 播放时间改变
            this.$refs.videoPlayer.addEventListener('timeupdate', function(e){
                self.currentTime = this.currentTime;
            }, false)

            // 横屏/竖屏监听重新计算进度条的长度
            window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
                // 竖屏状态
                if (window.orientation === 180 || window.orientation === 0) {

                }
                // 横屏状态
                if (window.orientation === 90 || window.orientation === -90 ){

                }

                if(self.fullscreen){
                    self.fullTimer && clearTimeout(self.fullTimer);
                    self.fullTimer = setTimeout(function(){
                        var clientWidth = self.getClientWidth();
                        var clientHeight = self.getClientHeight();
                        $('.video-player-wrap').css({
                            'width': clientWidth,
                            'height': clientHeight
                        })
                    },1000)
                }

                // 当检测到横屏/竖屏切换时，需要重新计算当前进度条的长度，但是旋转过程还需要一定的时间，不同的设备旋转的时间也不相同，要重新计算长度必须延迟相当的时间以保证重新计算的长度时准确的
                // self.progressTimer && clearTimeout(self.progressTimer);
                // self.progressTimer = setTimeout(function(){
                //     self.progressBarWidth = $(self.$refs.progressTrackEl).width();
                //     clearTimeout(self.progressTimer)
                // },1500)

            }, false);

        }
    },

    mounted: function(){
        this.$nextTick(() =>{
            this.initVideoWH();
            this.initProgressBarWidth();
            this.eventListener()
        })
    }
})
