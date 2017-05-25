<div class="common-header clearfix">
    <a class="news-avatar avatar-wrap" href="javascript:void(0)"><img class="avatar" src="{{ data.circleInfo.circleLogo.pictureUrl }}" alt=""/></a>
    <div class="common-detail">
        <a class="news-name name-wrap" href="javascript:void(0)"><span class="name">{{ data.circleInfo.circleName }}</span></a>
        <p class="time">{{ data.articleInfo.formatCreateTime }}</p>
    </div>
    {% if data.webShowInfo.commentCount %}
    <div class="comment">
        <span class="comment-num">{{ data.webShowInfo.commentCount }}</span>
        <i class="comment-icon"></i>
    </div>
    {% endif %}
</div>

<div class="news-wrapper">
    <p class="news-title">{{ data.articleInfo.articleTitle }}</p>
    <div class="news-detail">
        {% if data.articleInfo.detailImages.length %}
            {% for item in data.articleInfo.detailImages %}
        <img src="{{ item.pictureUrl }}" alt=""/>
            {% endfor %}
        {% endif %}
        {% if data.articleInfo.detail %}
        {{ data.articleInfo.detail.split('').length }}
        <p class="detail">{{ data.articleInfo.detail }}</p>
        {% endif %}
    </div>
</div>

<div class="common-footer">
    <div class="common-code clearfix">
        <img class="code" src="{{ data.circleInfo.twoDimensionCode.pictureUrl }}" alt=""/>
        <!--<div class="common-follow">
            <p class="follow-prompt">长按左侧二维码，关注{{ data.circleInfo.circleName }}</p>
            <p class="follow-keywords">财经 、资讯、热点</p>
        </div>-->
    </div>
    {% if data.articleInfo.source %}
    <p class="source">来源：{{ data.articleInfo.source }}</p>
    {% endif %}
</div>
