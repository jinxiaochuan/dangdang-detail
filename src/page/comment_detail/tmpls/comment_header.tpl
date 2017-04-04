<div class="comment-header clearfix">
    <img class="avatar" src="{{ data.info.userImageUrl }}" alt=""/>
    <div class="comment-detail-wrap">
        <p class="name">{{ data.info.showName }}</p>
        <p class="content content-outline">{{ data.info.commentContent }}</p>
        {% if data.info.commentContent.split('').length > 120 %}
        <a class="slide-down-btn" href="javascript:void (0)">全文</a>
        {% endif %}

        {% if data.info.commentImageUrl %}
        <div class="album-container">
            <img src="{{ data.info.commentImageUrl }}" alt=""/>
        </div>
        {% endif %}

        {% if data.info.newsInfo %}
        <div class="share-link-container">
            <a class="clearfix" href="javascript:void (0)">
                <img class="share-link-avatar" src="{{ data.info.newsInfo.imageUrl }}" alt=""/>
                <p class="share-link-content">{{ data.info.newsInfo.title  }}</p>
            </a>
        </div>
        {% endif %}

        {% if data.info.location %}
        <p class="comment-address">{{ data.info.location }}</p>
        {% endif %}

        <p class="comment-time">{{ data.info.createTime }} <i class="spread-icon"></i></p>
    </div>
</div>