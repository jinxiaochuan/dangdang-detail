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
    <div class="comment-wrap">
        <span class="time">{{ data.newsDetail.formatCreateTime }}</span>
        <a href="javascript:void(0)" class="comment">{{ data.newsDetail.commentAmount }}</a>
    </div>
    {% if data.recommendNews.length %}
    <div class="news-list-wrap">
        {% for item in data.recommendNews %}
        <a class="news-link" data-user="{{ userId }}" data-news="{{ newsId }}" href="javascript:void(0)">
            <div class="news-item">
                <div class="news-detail">
                    <p class="news-title">{{ item.title }}</p>
                    <p class="news-issuer"><span>{{ item.formatCreateTime }}</span></p>
                </div>
                <img class="news-cover" src="{{ item.coverImageUrl[0] }}" alt="">
            </div>
        </a>
        {% endfor %}
    </div>
    {% endif %}
</div>
