<div class="news-detail-wrap">
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
      {% if data.liveInfo %}
        <div class="live-wrapper" style="background-image:url('{{ data.liveInfo.coverImage.picture }}')">
          <div class="blur-layer">
            {% if data.liveInfo.liveStatus != 4 %}
            <div class="play-btn"></div>
            {% else %}
            <div class="video-play"></div>
            {% endif %}
            <span class="live-status">
                {{ data.liveInfo.coverMsg }}
            </span>
          </div>
        </div>
      {% endif %}
        <div class="content">
            {% if data.newsDetail.newsType == 1 %}
            {% for item in data.newsDetail.newsPictures %}
            <div class="news-album-item">
                <img class="album" src="{{ item.picture.picture }}" alt="">
                <div class="album-desc">
                    {{ item.desc }}
                </div>
            </div>
            {% endfor %}
            {% else %}
            {{ data.newsDetail.content|safe }}
            {% endif %}
        </div>
        {% if data.newsDetail.links %}
        <div class="download-link-wrap">
            {% for item in data.newsDetail.links %}
            <a class="download-link-item" href="{{ item.url }}">{{ item.name }}</a>
            {% endfor %}
        </div>
        {% endif %}
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
        <a class="news-link" data-user="{{ data.userId }}" data-type="{{ item.newsType }}" data-news="{{ item.newsId }}" data-media="{{ item.mediaId }}" href="javascript:void(0)">
            <div class="news-item">
                <div class="news-detail">
                    <p class="news-title">{{ item.title }}</p>
                    <p class="news-issuer"><span>{{ item.formatCreateTime }}</span></p>
                </div>
                <div class="news-cover-wrap">
                    <img class="news-cover" src="{{ item.coverImageUrl[0] }}" alt="">
                    {% if item.newsType == 1 %}
                      {% if item.pictureNum > 0 %}
                      <span class="pic-count">{{ item.pictureNum }}图</span>
                      {% endif %}
                    {% endif %}
                    {% if item.newsType == 2 %}
                      <span class="video-play"></span>
                    {% endif %}
                </div>
            </div>
        </a>
        {% endfor %}
    </div>
    {% endif %}
</div>
