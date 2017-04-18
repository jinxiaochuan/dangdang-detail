<div class="cooperation-header">
    <a class="cooperation-avatar" href="javascript:void (0)"><img class="avatar" src="{{ data.userImage }}" alt=""/></a>
    <div class="cooperation-detail-wrap">
        <p class="name"><a class="cooperation-name" href="javascript:void (0)">{{ data.userShowName }}</a></p>
        <p class="content"><span class="time">{{ data.tradeName }}</span><span class="address">{{ data.provinceName }}</span></p>
</div>
</div>
<p class="cooperation-title">{{ data.notice }}</p>
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
<div class="cooperation-content">
    <p>{{ data.detailContent }}</p>
    {% if data.detailImageList %}
    {% for item in data.detailImageList %}
    <img src="{{ item.pictureUrl }}" alt=""/>
    {% endfor %}
    {% endif %}

    <p class="address"><a class="cooperation-address" href="javascript:void (0)">{{ data.location }}</a></p>
    <p class="time">{{ data.formatCreateTime }}
      {% if data.showAccess == 1 %}
      <a class="cooperation-show-access" href="javascript:void (0)"><i class="member"></i></a>
      {% elseif data.showAccess == 2 %}
      <a class="cooperation-show-access" href="javascript:void (0)"><i class="member-join"></i></a>
      {%elseif data.showAccess == 3 %}
      <a class="cooperation-show-access" href="javascript:void (0)"><i class="member-part"></i></a>
      {% else %}
      {% endif %}
      {% if data.isFinished == '1' %}
      <span class="timeout">已结束</span>
      {% endif %}</p>
</div>
{% if data.review || data.reviewImageList %}
<div class="cooperation-review">
    <p class="review-title">回顾</p>
    <div class="review-content">
        <p>{{ data.review }}</p>
        {% if data.reviewImageList %}
        {% for item in data.reviewImageList %}
        <img src="{{ item.pictureUrl }}" alt=""/>
        {% endfor %}
        {% endif %}
    </div>
</div>
{% endif %}
{% if data.isOwner == '1' %}
<div class="cooperation-handle">
    <a class="cooperation-inten" href="javascript:void (0)"><div class="cooperation-intention">有意向的人({{ data.coopMemberCount }}) <i class="icon-arrow"></i></div></a>
    <a class="cooperation-edit" href="javascript:void (0)">编辑</a>
</div>
{% else %}
{% if data.isFinished == '0' %}
<div class="cooperation-handle fix">
    <a class="cooperation-send" href="javascript:void (0)"><p>发意向</p></a>
</div>
{% endif %}
{% endif %}
