<div class="media-index-wrap">
    <div class="index-header">
        <div class="avatar tap-avatar">
            <img src="{{ data.mediaInfo.mediaLogo.pictureUrl }}?x-oss-process=image/resize,m_fill,w_100,h_100,limit_0" alt="">
        </div>
        <span class="name">{{ data.mediaInfo.mediaName }}</span>
    </div>
    <div class="index-intro">
        {{ data.mediaInfo.mediaDetail|safe }}
    </div>
    <div class="index-handle">
        <a class="media-home {% if data.source %}app-btn{% endif %}" href="javascript:void(0)"><span>进入媒体</span></a>
    </div>
</div>
