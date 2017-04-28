<div class="info-header">
    <img class="info-avatar" src="{{ data.newsDetail.mediaLogoUrl }}" alt="">
    <div class="info-detail-wrap">
        <p class="info-name-wrap"><span class="info-name">{{ data.newsDetail.mediaName }}</span></p>
        <p class="info-detail clearfix">
            <span class="time">{{ data.newsDetail.formatNewsTime }}</span>
            <span class="comment-wrap">
                {% if data.newsDetail.likeAmount != '0' %}
                <span class="like">{{ data.newsDetail.likeAmount }}</span>
                {% endif %}
                {% if data.newsDetail.readAmount != '0' %}
                <span class="read">{{ data.newsDetail.readAmount }}</span>
                {% endif %}
            </span>
        </p>
    </div>
</div>

<div class="info-content-wrap">
    <p class="info-title">{{ data.newsDetail.title }}</p>
    <div class="info-content">
        {{ data.newsDetail.content|safe }}
    </div>
</div>

<div class="news-list-wrap">
    {% for item in data.recommendNews %}
    <a href="http://test.im-dangdang.com/ddweb/news/detail?newsId={{ item.newsId }}&userId={{  data.userId }}">
        <div class="news-item">
            <div class="news-detail">
                <p class="news-title">{{ item.title }}</p>
                <p class="news-issuer">
                    <span class="media-name">{{ item.mediaName }}</span>
                    <span class="comment-wrap">
                        {% if item.commentAmount != '0' %}
                        <span class="like">{{ item.commentAmount }}</span>
                        {% endif %}
                        {% if item.likeAmount != '0' %}
                        <span class="read">{{ item.likeAmount }}</span>
                        {% endif %}
                    </span>
            </div>
            <img class="news-cover" src="{{ item.coverImageUrl[0] }}" alt="">
        </div>
    </a>
    {% endfor %}
</div>
