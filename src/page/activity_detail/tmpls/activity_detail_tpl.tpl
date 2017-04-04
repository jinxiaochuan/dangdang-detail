<div class="activity-header">
    <a href="userId:{{ data.webShowInfo.userId }},circleId:{{ data.circleInfo.circleId }},memberType:{{ data.circleInfo.memberType }}"><img class="avatar" src="{{ data.circleInfo.circleLogo.pictureUrl }}" alt=""/></a>
    <div class="activity-detail-wrap">
        <a href="userId:{{ data.webShowInfo.userId }},circleId:{{ data.circleInfo.circleId }},memberType:{{ data.circleInfo.memberType }}"><p class="name">{{ data.circleInfo.circleName }}</p></a>
        <p class="content"><span class="time">{{ data.articleInfo.activityInfo.formatStartTime }} - {{ data.articleInfo.activityInfo.formatEndTime }}</span><span class="address">{{ data.articleInfo.activityInfo.procvinceName }} {{ data.articleInfo.activityInfo.cityName }}</span></p>
    </div>
    {% if data.webShowInfo.commentCount %}
    <div class="comment">
        <span class="comment-num">{{ data.webShowInfo.commentCount }}</span>
        <i class="comment-icon"></i>
    </div>
    {% endif %}
</div>
<p class="activity-title">{{ data.articleInfo.articleTitle }} {% if data.articleInfo.showAccess == 1 %}<a href="userId:{{ data.webShowInfo.userId }},circleId:{{ data.circleInfo.circleId }},articleId:{{ data.articleInfo.articleId }}"><i class="member"></i></a>{% elseif data.articleInfo.showAccess == 2 %}<a href="userId:{{ data.webShowInfo.userId }},circleId:{{ data.circleInfo.circleId }},articleId:{{ data.articleInfo.articleId }}"><i class="member-join"></i></a>{% elseif data.articleInfo.showAccess == 3 %}<a href="userId:{{ data.webShowInfo.userId }},circleId:{{ data.circleInfo.circleId }},articleId:{{ data.articleInfo.articleId }}"><i class="member-part"></i></a>{% else %}{% endif %}</p>
<div class="notice-container">
    {% if data.articleInfo.activityInfo.noticeList.length %}
    <div class="notice-list-wrap">
        <p class="notice-title">公告：</p>
        <ul class="notice-list">
            {% for item in data.articleInfo.activityInfo.noticeList %}
            <li class="notice-item">
                <p class="notice-time">{{ item.formatCreateTime }}</p>
                <p class="notice-content">{{ item.notice }}</p>
            </li>
            {% endfor %}
        </ul>
    </div>
    {% else %}
    <div class="notice-normal">公告：<span class="notice-word">正常</span></div>
    {% endif %}
</div>
<div class="activity-content">
    <p>{{ data.articleInfo.activityInfo.detail }}</p>
    {% if data.articleInfo.activityInfo.detailImages %}
    {% for item in data.articleInfo.activityInfo.detailImages %}
    <img src="{{ item.pictureUrl }}" alt=""/>
    {% endfor %}
    {% endif %}
</div>
<div class="common-footer">
    <div class="common-code clearfix">
        <img class="code" src="{{ data.circleInfo.twoDimensionCode.pictureUrl }}" alt=""/>
        <!--<div class="common-follow">
            <p class="follow-prompt">长按左侧二维码，关注{{ data.circleInfo.circleName }}</p>
            <p class="follow-keywords">财经 、资讯、热点</p>
        </div>-->
    </div>
    {% if data.articleInfo.source %}
    <p class="source">来源：{{ data.articleInfo.source }}</p>
    {% endif %}
</div>
{% if data.articleInfo.activityInfo.review %}
<div class="activity-review">
    <p class="review-title">回顾</p>
    <div class="review-content">
        {% if data.articleInfo.activityInfo.reviewImages %}
            {% for item in data.articleInfo.activityInfo.reviewImages %}
        <img src="{{ item.pictureUrl }}" alt=""/>
            {% endfor %}
        {% endif %}
        <p>{{ data.articleInfo.activityInfo.review }}</p>
    </div>
</div>
{% endif %}
<div class="activity-sign">报名截止：{{ data.articleInfo.activityInfo.formatDeadLine }}<span class="limit-num">限{{ data.articleInfo.activityInfo.activityNum }}人</span></div>

{% if data.webShowInfo.showWhichButton %}
<p class="activity-num">已报名的人（{{ data.webShowInfo.enterCount }}）<i class="arrow"></i></p>
{% endif %}

{% if data.webShowInfo.showWhichButton %}
<div class="sign-btn-wrap">
    {% if data.webShowInfo.showWhichButton == 1 %}
    <a href="userId:{{ data.webShowInfo.userId }},activityId:{{ data.articleInfo.articleId }}">编辑详情</a>
    {% elseif data.webShowInfo.showWhichButton == 2 %}
    <a href="userId:{{ data.webShowInfo.userId }},activityId:{{ data.articleInfo.articleId }}">报名</a>
    {% elseif data.webShowInfo.showWhichButton == 3 %}
    <a href="userId:{{ data.webShowInfo.userId }},activityId:{{ data.articleInfo.articleId }}">取消报名</a>
    {% else %}
    {% endif %}
</div>
{% endif %}
