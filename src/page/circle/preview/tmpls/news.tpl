<div class="common-circle-header">
    <div class="avatar-wrap">
        <a class="tap-avatar" href="javascript:void(0)">
            <img class="avatar" src="{{ data.circleInfo.circleLogo.pictureUrl }}" alt="">
        </a>
    </div>
</div>
<div class="common-circle-news-wrap">
    <div class="circle-news-title">{{ data.articleInfo.articleTitle }}</div>

    <div class="circle-news-source">
        {% if data.articleInfo.source %}<span class="source">{{ data.articleInfo.source }}</span>{% endif %}
        <span class="time">{{ data.articleInfo.formatNewsTime }}</span>
    </div>

    <div class="circle-news-detail">
        <div class="detail-content">{{ data.articleInfo.detail|safe }}</div>
    </div>
    <div class="common-comment-wrap">
        <span class="access">
            <span class="publish-time">{{ data.articleInfo.formatCreateTime }}</span>
        </span>
    </div>
</div>

<div class="preview-fix">
    <span>此为临时链接，仅用于文章预览，将在短期内失效</span>
    <i class="close-icon">×</i>
</div>
