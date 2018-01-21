<div class="lotto-preheat-wrap">
    <div class="preheat-title">
        {{ activityInfo && activityInfo.title }}
    </div>
    <div class="preheat-video-wrap">
        <video-component :video-title="activityInfo && activityInfo.title" :video-poster="activityInfo && activityInfo.coverImage && activityInfo.coverImage.pictureUrl" :video-duration="activityInfo && activityInfo.coverImage && activityInfo.coverImage.duration" :video-url="activityInfo && activityInfo.coverImage && activityInfo.coverImage.videoUrl" v-if="activityInfo && activityInfo.coverImage && activityInfo.coverImage.videoUrl"></video-component>
    </div>
    <div class="preheat-detail" v-html="activityInfo && activityInfo.desc">
    </div>
    <div class="preheat-time">
        {{ activityInfo && activityInfo.formatStartTime }}
    </div>
    <div class="invite-wrap">
        <div class="invite-card">
            <div class="invite-code">我的邀请码：{{ code }}</div>
        </div>
        <span class="invite-word">使用我的邀请码，一起抢大奖</span>
    </div>
</div>
