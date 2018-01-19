<div class="video-player-wrap">
    <div class="video-player">
        <video ref="videoPlayer" v-show="canplay" webkit-playsinline="true" playsinline="true" preload="metadata" poster src="http://v4.music.126.net/20180120020412/39bf3b26fb32945d63101fb4807579c5/web/cloudmusic/ICBgYWA0IDYzMCEiIDAiMA==/mv/5780003/9cf8911807c98ba7474d8d6ef5f6245e.mp4" autoplay poster="posterimage.jpg">

        </video>
    </div>
    <div v-show="loading" class="video-title">
        等你下课 - 周杰伦
    </div>
    <div v-show="loading" class="video-poster">
        <img src="http://p3.music.126.net/OFhwUU6ozSVveVsACccADw==/109951163111179433.webp?imageView&thumbnail=600x0&quality=75&tostatic=0&type=webp" alt="">
    </div>
    <div @click="tapVideo" class="video-button">
        <div v-show="isPause" @click="videoPlay" class="video-play-ico x-iconmode-new">

        </div>
    </div>
    <div class="x-iconmode-new video-youkulogo">

    </div>
    <div v-show="loading" class="x-video-loading">

    </div>
    <div v-show="playError" class="x-noticeshow">
        <div class="x-errortip">
            <div class="x-youkulogo x-iconmode"></div>
            <span>视频播放失败，请重试</span>
            <div @click="retry" class="x-error-retry x-iconmode"></div>
        </div>
    </div>
    <div class="x-dashboard" :class="{'show': controlBar}">
        <div class="x-console-out">
            <div class="x-console">
                <div @click="togglePlay" class="x-iconmode-new" :class="[{'i_play': isPause}, {'i_pause': !isPause}]">

                </div>
                <div class="x-progress">
                    <span class="x-playtime">{{ currentTime|formatTime }}</span>
                    <div class="x-progress-track">
                        <span class="x-progress-play" :style="{'width': currentTime/duration * 165 + 16 + 'px'}"><i class="seekBtn"></i></span>
                    </div>
                    <span class="x-alltime">{{ duration|formatTime }}</span>
                </div>
                <div class="x-iconmode i_fscreen">

                </div>
            </div>
        </div>
    </div>
</div>
