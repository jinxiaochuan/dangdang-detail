<div class="info-header">
    <img class="avatar" src="{{ data.newsDetail.mediaLogoUrl }}" alt="">
    <div class="info-detail-wrap">
        <p class="info-name">{{ data.newsDetail.mediaName }}</p>
        <p class="info-detail clearfix">
            <span class="time">{{ data.newsDetail.formatNewsTime }}</span>
            <span class="read">{{ data.newsDetail.readAmount }}</span>
            <span class="like">{{ data.newsDetail.likeAmount }}</span>
        </p>
    </div>
</div>

<div class="info-content-wrap">
    <p class="info-title">{{ data.newsDetail.title }}</p>
    <div class="info-content">
        {{ data.newsDetail.content }}
    </div>
</div>

<div class="news-list-wrap">
    {% for item in data.recommendNews %}
    <div class="news-item">
        <div class="news-detail">
            <p class="news-title">{{ item.title }}</p>
            <p class="news-issuer"><span>{{ item.mediaName }}</span><span class="news-comment">{{ data.commentAmount }}评</span></p>
        </div>
        <img class="news-cover" src="{{ item.coverImageUrl[0] }}" alt="">
    </div>
    {% endfor %}
</div>
