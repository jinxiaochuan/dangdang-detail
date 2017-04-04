<div class="discovery-in24-header">
    {% if data.in24hInfo.isCanSeePersonFile == '1'%}
    <a class="in24-avatar" href="javascript:void (0)"><img class="avatar" src="{{ data.in24hInfo.userInfo.userImage }}" alt=""/></a>
    {% else %}
    <img class="avatar scale"  data-src="{{ data.in24hInfo.userInfo.userImage }}" src="{{ data.in24hInfo.userInfo.userImage }}" alt=""/>
    {% endif %}
    <div class="discovery-in24-detail-wrap">
        <p class="name">
          <a class="in24-name" href="javascript:void (0)">{{ data.in24hInfo.userInfo.showName }}</a>
        </p>
        <p class="content"><span class="time">{{ data.in24hInfo.formatStartTime }}</span>
          {% if data.in24hInfo.activityType == 0 %}
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
          {% endif %}
        </p>
        <p class="location clearfix"><a class="in24-address" href="javascript:void (0)"><span class="address">{{ data.in24hInfo.webInfo.activityLocation }}</span></a><span class="distance">{{ data.in24hInfo.distance }}km</span></p>
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
    <p class="address">{{ data.in24hInfo.provinceName }} {{ data.in24hInfo.cityName }}</p>
    <p class="time">{{ data.in24hInfo.formatCreateTime }}
      {% if data.showAccess == 1 %}
      <a class="in24-show-access" href="javascript:void (0)"><i class="member"></i></a>
      {% elseif data.showAccess == 2 %}
      <a class="in24-show-access" href="javascript:void (0)"><i class="member-join"></i></a>
      {%elseif data.showAccess == 3 %}
      <a class="in24-show-access" href="javascript:void (0)"><i class="member-part"></i></a>
      {% else %}
      {% endif %}
      {% if data.isOver == '1' %}
      <span class="timeout">已结束</span>
      {% endif %}
    </p>
    <p class="limit">限{{ data.in24hInfo.activityNum }}人</p>
</div>
{% if data.in24hInfo.review %}
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
   <a class="in24-inten" href="javascript:void (0)"><div class="discovery-in24-intention">已报名的人({{ data.in24hInfo.signPeopleCount }}) <i class="icon-arrow"></i></div></a>
   <a class="discovery-in24-edit" href="javascript:void (0)">编辑</a>
</div>
{% else %}
{% if data.in24hInfo.isOver == '0' %}
<div class="discovery-in24-handle fix">
    <a class="discovery-in24-send" href="javascript:void (0)"><p>报名</p></a>
</div>
{% endif %}
{% endif %}
