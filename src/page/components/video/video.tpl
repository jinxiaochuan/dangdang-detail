<div class="video-player-wrap">
    <div class="video-player">
        <video ref="videoPlayer" v-show="canplay" webkit-playsinline="true" playsinline="true" preload="metadata" poster src="http://s1.im-dangdang.com/online/20180119/等你下课 - 周杰伦.mp4" autoplay poster="posterimage.jpg">

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
