<div class="lotto-preheat-wrap">
    <div class="preheat-title">
        {{ activityInfo && activityInfo.title }}
    </div>
    <div class="preheat-video-wrap">
        <video-component v-if="activityInfo && activityInfo.coverImage && activityInfo.coverImage.videoUrl" :video-title="activityInfo && activityInfo.title" :video-poster="activityInfo && activityInfo.coverImage && activityInfo.coverImage.pictureUrl" :video-duration="activityInfo && activityInfo.coverImage && activityInfo.coverImage.duration" :video-url="activityInfo && activityInfo.coverImage && activityInfo.coverImage.videoUrl"></video-component>
        <div v-else class="preheat-image-wrap" v-bind:style="{backgroundImage: 'url(' + pictureUrl + ')'}"><img :src="pictureUrl" ref="preheatCover" alt=""></div>
    </div>
    <div class="preheat-detail" ref="preheatDetail" v-html="activityInfo && activityInfo.desc">
    </div>
    <div class="preheat-time">
        {{ activityInfo && activityInfo.formatCreateTime }}
    </div>
    <div v-if="hasCard" class="invite-wrap">
        <div class="invite-card">
            <div class="invite-code">我的邀请码：{{ code }}</div>
        </div>
        <span class="invite-word">使用我的邀请码，一起抢大奖</span>
    </div>
</div>
