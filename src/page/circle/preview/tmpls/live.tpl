<div class="common-circle-live-wrap">
    <h2 class="circle-live-title">{{ data.articleInfo.articleTitle }}</h2>

    <div class="circle-live-source">
        {% if data.articleInfo.liveInfo.author %}<span class="source">{{ data.articleInfo.liveInfo.author }}</span>{% endif %}
        <span class="name tap-avatar">{{ data.circleInfo.circleName }}</span>
        <span class="time">{{ data.articleInfo.liveInfo.formatLiveCreateTime }}</span>
    </div>

    <div class="circle-live-wrapper" style="background-image: url('{{ data.articleInfo.liveInfo.coverImage.picture }}')">
        <div class="blur-layer">
            {% if data.articleInfo.liveInfo.liveStatus == 3 %}
            <div class="video-play"></div>
            {% else %}
            <div class="play-btn"></div>
            {% endif %}
        </div>
    </div>

    <div class="circle-live-detail">
        <div class="detail-content">
            {{ data.articleInfo.detail|safe }}
        </div>
    </div>

</div>

<div class="preview-fix">
    <span>此为临时链接，仅用于文章预览，将在短期内失效</span>
    <i class="close-icon">×</i>
</div>
