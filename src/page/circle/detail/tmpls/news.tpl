<div class="common-circle-header my-gallery">
    <div class="avatar-wrap">
        <a class="tap-avatar" href="javascript:void(0)">
            <img class="avatar" src="{{ data.circleInfo.circleLogo.pictureUrl }}" alt="">
        </a>
    </div>
</div>
<div class="common-circle-news-wrap">
    <div class="circle-news-title">{{ data.articleInfo.articleTitle }}</div>
    {% if data.articleInfo.source %}
    <div class="circle-news-source">
        <span class="source">来源：{{ data.articleInfo.source }}</span>
    </div>
    {% endif %}
    <div class="circle-news-detail">
        <div class="detail-content my-gallery">
            <!-- <div class="">
                <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
                    <a href="{{ data.circleInfo.circleLogo.pictureUrl }}" itemprop="contentUrl" data-size="690x690">
                        <img class="avatar" src="{{ data.circleInfo.circleLogo.pictureUrl }}" alt="">
                    </a>
                </figure>
                <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
                    <a href="http://s1.im-dangdang.com/20170930/e8R8WTZXmp.jpg" itemprop="contentUrl" data-size="72x72">
                        <img class="avatar" src="http://s1.im-dangdang.com/20170930/e8R8WTZXmp.jpg" alt="">
                    </a>
                </figure>
            </div> -->
            {{ data.articleInfo.detail|safe }}
        </div>
    </div>
    <div class="common-address">
        <a class="tap-location" href="javascript:void(0)">{{ (data.articleInfo.location|json_parse).name }}</a>
    </div>
    <div class="common-comment-wrap">
        <span class="access">
            <span class="publish-time">{{ data.articleInfo.formatCreateTime }}</span>
            {% if data.articleInfo.isOwner == '1' && data.isAdminIdentity == '1' %}
            {% if data.articleInfo.showAccess == 1 %}
            <a class="show-access" href="javascript:void (0)"><i class="member"></i></a>
            {% elseif data.articleInfo.showAccess == 2 %}
            <a class="show-access" href="javascript:void (0)"><i class="member-join"></i></a>
            {% elseif data.articleInfo.showAccess == 3 %}
            <a class="show-access" href="javascript:void (0)"><i class="member-part"></i></a>
            {% else %}
            {% endif %}
            {% endif %}
        </span>

        {% if data.articleInfo.isCanComment == 1 %}
        <a class="comment-wrap" href="javascript:void (0)"><i class="comment"></i><span class="comment-num">{% if data.webShowInfo.commentCount != 0 %}{{ data.webShowInfo.commentCount }}{% endif %}</span></a>
        {% endif %}

    </div>
</div>
