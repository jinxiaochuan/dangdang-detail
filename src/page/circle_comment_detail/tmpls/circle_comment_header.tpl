<div class="comment-header clearfix">
    <img class="avatar" src="{{ data.info.userImageUrl }}" alt=""/>
    <div class="comment-detail-wrap">
        <p class="name">{{ data.info.userName }}</p>
        <p class="content content-outline">{{ data.info.content }}</p>
        {% if data.info.content.split('').length > 120 %}
        <a class="slide-down-btn" href="javascript:void (0)">全文</a>
        {% endif %}
        {% if data.info.picture %}
        <div class="album-container">
            <img src="{{ data.info.picture.pictureUrl }}" alt=""/>
        </div>
        {% endif %}
        <div class="share-link-container">
            <a class="clearfix" href="javascript:void (0)">
                <img class="share-link-avatar" src="{{ data.info.articleInfo.coverImage.pictureUrl }}" alt=""/>
                <p class="share-link-content">{{ data.info.articleInfo.articleTitle }}</p>
            </a>
        </div>
        <!--<p class="comment-address">北京市·北京市建国路华贸中心3座</p>-->
        <p class="comment-time">{{ data.info.createTime }}<span class="delete-btn">删除</span> <i class="spread-icon"></i></p>
    </div>
</div>