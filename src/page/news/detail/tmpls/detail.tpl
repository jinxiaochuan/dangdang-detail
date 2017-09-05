<div class="news-detail">
    <div class="news-detail-header">
        <p class="title">
            {{ data.newsDetail.title }}
        </p>
        <div class="source">
            <a class="tap-source" href="javascript:void(0)">
                <img class="source-logo" src="{{ data.newsDetail.mediaLogoUrl }}" alt="">
            </a>
            <span class="source-name">{{ data.newsDetail.mediaName }}</span>
            <span class="source-time">{{ data.newsDetail.formatNewsTime }}</span>
        </div>
    </div>
    <div class="news-detail-main">
        <div class="content">
            {{ data.newsDetail.content|safe }}
        </div>
    </div>
    <div class="comment-outer-wrap">
        <span class="time">{{ data.newsDetail.formatCreateTime }}</span>
        <a class="comment-wrap" href="javascript:void (0)"><i class="comment"></i><span class="comment-num">{% if data.newsDetail.commentAmount != 0 %}{{ data.newsDetail.commentAmount }}{% endif %}</span></a>
    </div>
    {% if data.recommendNews.length %}
    <div class="split-mark">

    </div>
    {% endif %}
    {% if data.recommendNews.length %}
    <div class="news-list-wrap">
        <div class="news-list-title">
            <span class="short"></span>
            <span class="title">推荐资讯</span>
            <span class="short"></span>
        </div>
        {% for item in data.recommendNews %}
        <a class="news-link" data-user="{{ data.userId }}" data-news="{{ item.newsId }}" data-media="{{ item.mediaId }}" href="javascript:void(0)">
            <div class="news-item">
                <div class="news-detail">
                    <p class="news-title">{{ item.title }}</p>
                    <p class="news-issuer"><span>{{ item.formatCreateTime }}</span></p>
                </div>
                <div class="news-cover-wrap">
                    <img class="news-cover" src="{{ item.coverImageUrl[0] }}" alt="">
                </div>
            </div>
        </a>
        {% endfor %}
    </div>
    {% endif %}
</div>
