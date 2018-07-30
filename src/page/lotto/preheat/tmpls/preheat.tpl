<div class="lotto-preheat-wrap">
    <h2 class="preheat-title">{{ activityInfo && activityInfo.title }}</h2>
    <!-- <div class="preheat-video-wrap">
        <video-component v-if="activityInfo && activityInfo.coverImage && activityInfo.coverImage.videoUrl" :video-title="activityInfo && activityInfo.title" :video-poster="activityInfo && activityInfo.coverImage && activityInfo.coverImage.pictureUrl" :video-duration="activityInfo && activityInfo.coverImage && activityInfo.coverImage.duration" :video-url="activityInfo && activityInfo.coverImage && activityInfo.coverImage.videoUrl"></video-component>
        <div v-else class="preheat-image-wrap" v-bind:style="{backgroundImage: 'url(' + pictureUrl + ')'}"><img :src="pictureUrl" ref="preheatCover" alt=""></div>
    </div> -->
    <div class="preheat-detail" ref="preheatDetail" v-html="activityInfo && activityInfo.desc">
    </div>
    <div v-if="activityInfo" class="preheat-time">
        <span class="time">{{ activityInfo && activityInfo.formatCreateTime }}</span>
        <a class="read-wrap" href="javascript:void(0)"><i class="read"></i><span v-if="activityInfo && activityInfo.formatReadAmount != 0" class="read-num">{{ activityInfo && activityInfo.formatReadAmount }}</span></a>
    </div>
    <div v-if="hasCard" class="invite-wrap app-btn">
        <div class="invite-card">
            <div class="invite-code">我的朋友码：{{ code }}</div>
        </div>
        <span class="invite-word">使用我的朋友码，双方均可获得3张红包卡，一起抢大奖</span>
    </div>
</div>
