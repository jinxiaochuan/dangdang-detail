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
        <pre class="detail-content">{{ data.articleInfo.detail|safe }}</pre>
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
    <!-- <div class="circle-news-code">
        <span class="name">{{ data.circleInfo.circleName }}</span>
        <div class="code-wrap">
            <img src="{{ data.circleInfo.twoDimensionCode.pictureUrl }}" alt="">
        </div>
        <span class="word">长按识别图中二维码</span>
    </div> -->
    <div class="common-address">
        <a class="tap-location" href="javascript:void(0)">{{ (data.articleInfo.location|json_parse).name }}</a>
    </div>
    <div class="common-comment-wrap">
        <span>
            <span class="publish-time">{{ data.articleInfo.formatCreateTime }}</span>
            {% if data.articleInfo.isOwner == '1' && data.isAdminIdentity == '1' %}
            {% if data.articleInfo.showAccess == 1 %}
            <a class="show-access" href="javascript:void (0)"><i class="member"></i></a>
            {% elseif data.articleInfo.showAccess == 2 %}
            <a class="show-access" href="javascript:void (0)"><i class="member-join"></i></a>
            {% elseif data.articleInfo.showAccess == 3 %}
            <a class="show-access" href="javascript:void (0)"><i class="member-part"></i></a>
            {% else %}
            {% endif %}
            {% endif %}
        </span>

        {% if data.articleInfo.isCanComment == 1 %}
        <a class="comment-wrap" href="javascript:void (0)"><i class="comment"></i><span class="comment-num">{% if data.webShowInfo.commentCount != 0 %}{{ data.webShowInfo.commentCount }}{% endif %}</span></a>
        {% endif %}

    </div>
</div>
