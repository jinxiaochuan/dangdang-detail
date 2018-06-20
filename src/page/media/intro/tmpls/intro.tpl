<div class="media-index-wrap">
    <div class="index-header">
        <div class="index-avatar">
            <div class="avatar tap-avatar">
                <img src="{{ data.mediaInfo.mediaLogo.pictureUrl }}?x-oss-process=image/resize,m_fill,w_100,h_100,limit_0" alt="">
            </div>
            <span class="name">{{ data.mediaInfo.mediaName }}</span>
        </div>
        <a class="media-home {% if data.source == 1 %}app-btn{% endif %}" href="javascript:void(0)">进入媒体</a>
    </div>
    <div class="index-intro">
        {{ data.mediaInfo.mediaDetail|safe }}
    </div>
</div>
