<div class="news-detail">
    <div class="news-detail-header">
        <p class="title">
            {{ data.newsDetail.title }}
        </p>
        <div class="source">
            <img class="source-logo" src="{{ data.newsDetail.mediaLogoUrl }}" alt="">
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
        <span class="read">{{ data.newsDetail.readAmount }}</span>
    </div>
    {% if data.recommendNews.length %}
    <div class="news-list-wrap">
        {% for item in data.recommendNews %}
        <a href="/ddweb/news/detail?userId={{ data.userId }}&newsId={{ item.newsId }}">
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
