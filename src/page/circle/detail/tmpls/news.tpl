<div class="common-circle-header my-gallery">
    <div class="avatar-wrap">
        <a class="tap-avatar" href="javascript:void(0)">
            <img class="avatar" src="{{ data.circleInfo.circleLogo.pictureUrl }}" alt="">
        </a>
    </div>
</div>
<div class="common-circle-news-wrap">
    <div class="circle-news-title">{{ data.articleInfo.articleTitle }}</div>

    <div class="circle-news-source">
        {% if data.articleInfo.source %}<span class="source">{{ data.articleInfo.source }}</span>{% endif %}
        <span class="time">{{ data.articleInfo.formatNewsTime }}</span>
    </div>

    <div class="circle-news-detail">
        <div class="detail-content my-gallery">
            {{ data.articleInfo.detail|safe }}
        </div>
    </div>
    <!-- <div class="circle-red-envelope">
        <div class="red-envelope">
            <div class="red-envelope-word">恭喜发财，大吉大利，恭喜发财，大吉大利，恭喜发财，</div>
            <div class="red-envelope-status">领取红包</div>
        </div>
        <div class="red-envelope-expire">
            <div class="red-envelope-word">恭喜发财，大吉大利，恭喜发财，大吉大利，恭喜发财，</div>
            <div class="red-envelope-status">红包已过期</div>
        </div>
        <div class="red-envelope-rev">
            <div class="red-envelope-status">红包已被领完</div>
        </div>
    </div> -->
    <div class="common-address">
        <a class="tap-location" href="javascript:void(0)">{{ (data.articleInfo.location|json_parse).name }}</a>
    </div>
    <div class="common-comment-wrap">
        <span class="access">
            <span class="publish-time">{{ data.articleInfo.formatCreateTime }}</span>
            {% if data.articleInfo.isOwner == '1' && data.isAdminIdentity == '1' %}
            {% if data.articleInfo.showAccess == 1 %}
            <a class="show-access" href="javascript:void (0)"><i class="member-part"></i></a>
            {% elseif data.articleInfo.showAccess == 2 %}
            <a class="show-access" href="javascript:void (0)"><i class="member-join"></i></a>
            {% elseif data.articleInfo.showAccess == 3 %}
            <a class="show-access" href="javascript:void (0)"><i class="member-part"></i></a>
            {% else %}
            <a class="show-access" href="javascript:void (0)"><i class="member"></i></a>
            {% endif %}
            {% endif %}
        </span>

        {% if data.articleInfo.isCanComment == 1 %}
        <a class="comment-wrap" href="javascript:void (0)"><i class="comment"></i><span class="comment-num">{% if data.webShowInfo.commentCount != 0 %}{{ data.webShowInfo.commentCount }}{% endif %}</span></a>
        {% endif %}

    </div>

</div>
