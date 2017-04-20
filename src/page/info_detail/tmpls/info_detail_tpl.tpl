<div class="info-header">
    <img class="info-avatar" src="{{ data.newsDetail.mediaLogoUrl }}" alt="">
    <div class="info-detail-wrap">
        <p class="info-name-wrap"><span class="info-name">{{ data.newsDetail.mediaName }}</span></p>
        <p class="info-detail clearfix">
            <span class="time">{{ data.newsDetail.formatNewsTime }}</span>
            <span class="comment-wrap">
                <span class="like">{{ data.newsDetail.likeAmount }}</span>
                <span class="read">{{ data.newsDetail.readAmount }}</span>
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
    <a href="http://test.im-dangdang.com/ddweb/v1/newsComment/detail?userId={{ data.newsDetail.userId }}&newsId={{ item.newsId }}">
        <div class="news-item">
            <div class="news-detail">
                <p class="news-title">{{ item.title }}</p>
                <p class="news-issuer"><span>{{ item.mediaName }}</span>{% if item.commentAmount != '0' %}<span class="news-comment">{{ item.commentAmount }}评</span>{% endif %}</p>
            </div>
            <img class="news-cover" src="{{ item.coverImageUrl[0] }}" alt="">
        </div>
    </a>
    {% endfor %}
</div>
