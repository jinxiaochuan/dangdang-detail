<div class="media-index-wrap">
    <div class="index-header">
        <div class="index-avatar">
            <div class="avatar tap-avatar app-btn">
                <img src="{{ data.mediaInfo.mediaLogo.pictureUrl }}?x-oss-process=image/resize,m_fill,w_100,h_100,limit_0" alt="">
            </div>
            <h2 class="name app-btn">{{ data.mediaInfo.mediaName }}</h2>
        </div>
        <a class="media-home app-btn" href="javascript:void(0)">进入媒体</a>
    </div>
    <div class="index-slogan">
        {{ data.mediaInfo.mediaSlogan }}
    </div>
    <div class="index-intro">
        {{ data.mediaInfo.mediaDetail|safe }}
    </div>
</div>
