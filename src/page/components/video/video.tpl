<div class="video-player-wrap">
    <div class="video-player">
        <video ref="videoPlayer" v-show="canplay" webkit-playsinline="true" playsinline="true" preload="metadata" poster :src="videoUrl" autoplay>

        </video>
    </div>
    <div class="video-title" :class="{'show': !playing || controlBar}">
        {{ videoTitle }}
    </div>
    <div v-show="poster" class="video-poster">
        <img :src="videoPoster" alt="">
    </div>
    <div @click="tapVideo" class="video-button">
        <div v-show="isPause" @click="videoPlay" class="video-play-ico x-iconmode-new">

        </div>
    </div>
    <div class="x-iconmode-new video-youkulogo">

    </div>
    <div v-show="loading" class="x-video-loading">

    </div>
    <div v-show="!playing && playError" class="x-noticeshow">
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
                    <div class="x-progress-track" ref="progressTrackEl" v-on:touchmove="progressMove" v-on:touchend="progressEnd">
                        <span class="x-progress-play" ref="progressPlayEl" v-on:touchstart="progressStart" :style="{'width': duration ? currentTime/duration * (progressBarWidth - 15) + 15 + 'px' : '15px'}"><i class="seekBtn"></i></span>
                    </div>
                    <span class="x-alltime">{{ duration|formatTime }}</span>
                </div>
                <div @click="fullScreen" class="x-iconmode i_fscreen">

                </div>
            </div>
        </div>
    </div>
</div>
