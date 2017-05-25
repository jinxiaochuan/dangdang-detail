<div class="cooperation-header">
    <a class="cooperation-avatar avatar-wrap" href="javascript:void (0)"><img class="avatar" src="{{ data.circleInfo.circleLogo.pictureUrl }}" alt=""/></a>
    <div class="cooperation-detail-wrap">
        <p class="name"><a class="cooperation-name name-wrap" href="javascript:void (0)">{{ data.circleInfo.circleName }}</a></p>
        <p class="content"><span class="time">{{ data.articleInfo.coopInfo.tradeName }}</span><span class="address">{{ data.articleInfo.coopInfo.provinceName }} {{ data.articleInfo.coopInfo.cityName }}</span></p>
    </div>
</div>
<p class="cooperation-title">{{ data.articleInfo.articleTitle }}</p>
<div class="notice-container">
    {% if data.articleInfo.coopInfo.noticeList.length %}
    <div class="notice-list-wrap">
        <p class="notice-title">公告：</p>
        <ul class="notice-list">
            {% for item in data.articleInfo.coopInfo.noticeList %}
            <li class="notice-item">
                <p class="notice-time">{{ item.formatCreateTime }}</p>
                <p class="notice-content">{{ item.notice }}</p>
            </li>
            {% endfor %}
        </ul>
    </div>
    {% else %}
    <!-- <div class="notice-normal">公告：<span class="notice-word">正常</span></div> -->
    {% endif %}

</div>
<div class="cooperation-content">
    <p>{{ data.articleInfo.detail }}</p>
    {% if data.articleInfo.detailImages %}
    {% for item in data.articleInfo.detailImages %}
    <img src="{{ item.pictureUrl }}" alt=""/>
    {% endfor %}
    {% endif %}

    <!-- <p class="address"><a class="cooperation-address" href="javascript:void (0)">{{ data.location }}</a></p> -->
    <p class="time">{{ data.articleInfo.formatCreateTime }}
      {% if data.articleInfo.showAccess == 1 %}
      <a class="cooperation-show-access show-access-wrap" href="javascript:void (0)"><i class="member"></i></a>
      {% elseif data.articleInfo.showAccess == 2 %}
      <a class="cooperation-show-access show-access-wrap" href="javascript:void (0)"><i class="member-join"></i></a>
      {%elseif data.articleInfo.showAccess == 3 %}
      <a class="cooperation-show-access show-access-wrap" href="javascript:void (0)"><i class="member-part"></i></a>
      {% else %}
      {% endif %}
      {% if data.articleInfo.coopInfo.isFinished == '1' %}
      <span class="timeout">已结束</span>
      {% endif %}</p>
</div>
{% if data.articleInfo.coopInfo.review || data.articleInfo.coopInfo.reviewImageList.length %}
<div class="cooperation-review">
    <p class="review-title">回顾</p>
    <div class="review-content">
        <p>{{ data.articleInfo.coopInfo.review }}</p>
        {% if data.articleInfo.coopInfo.reviewImageList.length %}
        {% for item in data.articleInfo.coopInfo.reviewImageList %}
        <img src="{{ item.pictureUrl }}" alt=""/>
        {% endfor %}
        {% endif %}
    </div>
</div>
{% endif %}
{% if data.articleInfo.coopInfo.isOwner == '1' %}
<div class="cooperation-handle">
    <a class="cooperation-inten apply-list-wrap" href="javascript:void (0)"><div class="cooperation-intention">有意向的人（{{ data.webShowInfo.enterCount }}）<i class="icon-arrow"></i></div></a>
    <a class="cooperation-edit" href="javascript:void (0)">编辑</a>
</div>
{% else %}
{% if data.articleInfo.coopInfo.isFinished == '0' %}
<div class="cooperation-handle fix">
    <a class="cooperation-send apply-wrap" href="javascript:void (0)"><p>发意向</p></a>
</div>
{% endif %}
{% endif %}
