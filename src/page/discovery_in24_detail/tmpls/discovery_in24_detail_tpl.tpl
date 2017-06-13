<div class="discovery-in24-header">
    <a class="in24-avatar" href="javascript:void (0)"><img class="avatar" src="{{ data.in24hInfo.userInfo.userImage }}" alt=""/></a>
    <div class="discovery-in24-detail-wrap">
        <p class="name">
          <a class="in24-name" href="javascript:void (0)">{{ data.in24hInfo.userInfo.showName }}</a>
        </p>
        <p class="content flex-space">
          <span class="time">{{ data.in24hInfo.formatStartTime }}</span>
          <!-- {% if data.in24hInfo.activityType == 0 %}
          <span class="type other">其他</span>
          {% elseif data.in24hInfo.activityType == 1 %}
          <span class="type food">吃饭</span>
          {% elseif data.in24hInfo.activityType == 2 %}
          <span class="type movie">电影</span>
          {% elseif data.in24hInfo.activityType == 3 %}
          <span class="type sing">唱歌</span>
          {% elseif data.in24hInfo.activityType == 4 %}
          <span class="type sports">运动</span>
          {% elseif data.in24hInfo.activityType == 5 %}
          <span class="type coffee">咖啡</span>
          {% else %}
          {% endif %} -->
          <span class="location">
              <a class="in24-address" href="javascript:void (0)">{{ data.in24hInfo.webInfo.activityLocation }}</a><span class="distance">{{ data.in24hInfo.formatDistance }}</span>
          </span>
        </p>
    </div>
    <!-- <div class="comment">
        <span class="comment-num">55</span>
        <i class="comment-icon"></i>
    </div> -->
</div>
<p class="discovery-in24-title">{{ data.in24hInfo.title }}</p>
<div class="notice-container">
    {% if data.noticeList.length %}
      <div class="notice-list-wrap">
          <p class="notice-title">公告：</p>
          <ul class="notice-list">
              {% for item in data.noticeList %}
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
<div class="discovery-in24-content">
    <p>{{ data.in24hInfo.detailContent }}</p>
    {% if data.in24hInfo.detailImages %}
    {% for item in data.in24hInfo.detailImages %}
    <img src="{{ item.pictureUrl }}" alt=""/>
    {% endfor %}
    {% endif %}
    <p class="address">{{ data.in24hInfo.location }}</p>
    <p class="time">
        <span>{{ data.in24hInfo.formatCreateTime }}</span>
        {% if data.in24hInfo.showAccess == 1 %}
        <a class="in24-show-access" href="javascript:void (0)"><i class="only-friend"></i></a>
        {% elseif data.in24hInfo.showAccess == 2 || data.in24hInfo.showAccess == 3 %}
        <a class="in24-show-access" href="javascript:void (0)"><i class="part"></i></a>
        {% else %}
        {% endif %}
      {% if data.in24hInfo.isOver == '1' %}
      <span class="timeout">已结束</span>
      {% endif %}
    </p>
    <p class="limit"><span class="limit-time">报名截止：{{ data.in24hInfo.formatDeadline }}</span><span class="limit-num">{% if data.in24hInfo.activityNum == '0' %}不限{%else%}限{{ data.in24hInfo.activityNum }}人{% endif %}</span></p>
</div>
{% if data.in24hInfo.review || data.in24hInfo.reviewImages %}
<div class="discovery-in24-review">
    <p class="review-title">回顾</p>
    <div class="review-content">
        <p>{{ data.in24hInfo.review }}</p>
        {% if data.in24hInfo.reviewImages %}
        {% for item in data.in24hInfo.reviewImages %}
        <img src="{{ item.pictureUrl }}" alt=""/>
        {% endfor %}
        {% endif %}
    </div>
</div>
{% endif %}
{% if data.in24hInfo.isOwner == '1' %}
<div class="discovery-in24-handle">
   <div class="discovery-in24-intention"><a class="in24-inten" href="javascript:void (0)"><span>已报名的人（{{ data.in24hInfo.signPeopleCount }}）</span><i class="icon-arrow"></i></a></div>
   <a class="discovery-in24-edit" href="javascript:void (0)">编辑</a>
</div>
{% else %}
<div class="discovery-in24-handle">
    {% if !data.in24hInfo.applyStatus || data.in24hInfo.applyStatus == '2' || data.in24hInfo.applyStatus == '3' %}
    <a class="discovery-in24-send {% if data.in24hInfo.isCanSignUp == '0' %}disabled{% endif %}" href="javascript:void (0)">报名</a>
    {% else %}
    <a class="discovery-in24-communicate" href="javascript:void (0)">沟通</a>
    {% endif %}
</div>
{% endif %}
