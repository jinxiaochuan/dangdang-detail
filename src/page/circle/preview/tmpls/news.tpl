<div class="common-circle-header">
    <div class="avatar-wrap">
        <a class="tap-avatar" href="javascript:void(0)">
            <img class="avatar" src="{{ data.circleInfo.circleLogo.pictureUrl }}?x-oss-process=image/resize,m_fill,w_100,h_100,limit_0" alt="">
        </a>
    </div>
</div>
<div class="common-circle-news-wrap">
    <div class="circle-news-title">{{ data.articleInfo.articleTitle }}</div>
    {% if data.articleInfo.source %}
    <div class="circle-news-source">
        <span class="source">来源：{{ data.articleInfo.source }}</span>
    </div>
    {% endif %}
    <div class="circle-news-detail">
        <div class="detail-content">{{ data.articleInfo.detail|safe }}</div>
        {% if data.articleInfo.detailImages.length %}
        {% for item in data.articleInfo.detailImages %}
        {% if loop.first %}
        <img class="first" src="{{ item.pictureUrl }}" alt="">
        {% else %}
        <img src="{{ item.pictureUrl }}" alt="">
        {% endif %}
        {% endfor %}
        {% endif %}
    </div>
    <div class="common-comment-wrap">
        <span>
            <span class="publish-time">{{ data.articleInfo.formatCreateTime }}</span>
        </span>

        {% if data.articleInfo.isCanComment == 1 %}
        <a class="comment-wrap" href="javascript:void (0)"><i class="comment"></i><span class="comment-num">{% if data.webShowInfo.commentCount != 0 %}{{ data.webShowInfo.commentCount }}{% endif %}</span></a>
        {% endif %}

    </div>
</div>

<div class="preview-fix clearfix">
    <span>此为临时链接，仅用于文章预览，将在短期内失效</span>
    <i class="close-icon">×</i>
</div>
