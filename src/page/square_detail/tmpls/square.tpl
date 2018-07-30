<div class="content-wrapper">
  <img src="{{ info.userImageUrl }}" alt="" class="avatar app-btn"/>
  <div class="content">
    <span class="pub-name app-btn">{{ info.userName }}</span>
    {% if info.content %}
    <div class="content-detail">
      {{ info.content }}
    </div>
    {% endif %}
    {% if info.video %}
    <div class="content-img single-pic">
      <div class="pic pic1 is-video" data-url="{{ info.video.videoUrl }}">
        <img src="{{ info.video.pictureUrl }}" alt="">
        <div class="play-btn"></div>
      </div>
    </div>
    {% endif %}
    {% if info.pictureList %}
      {% if info.pictureList.length == 1 %}
      <div class="content-img single-pic">
        <div class="pic pic1 video-pic" href="{{info.pictureList[0].pictureUrl}}">
          <img src="{{ info.pictureList[0].pictureUrl }}" alt="">
        </div>
      </div>
      {% elseif info.pictureList.length > 1 and info.pictureList.length < 4 %}
        <div class="content-img normal-layout one-row">
          {% for index,item in info.pictureList %}
            <div class="pic pic{{ index + 1 }} pic-block" target="_blank" style="background-image:url('{{ item.pictureUrl }}')"></div>
          {% endfor %}
        </div>
      {% elseif info.pictureList.length == 4 %}
      <div class="content-img four-pic">
        {% for index,item in info.pictureList %}
          <div class="pic pic{{ index + 1}} pic-block" href="{{ item.pictureUrl }}" target="_blank" style="background-image:url('{{ item.pictureUrl }}')"></div>
        {% endfor %}
      </div>
      {% elseif info.pictureList.length > 3 and info.pictureList.length <= 6%}
      <div class="content-img normal-layout two-row">
        {% for index,item in info.pictureList %}
        <div class="pic pic{{index+1}} pic-block" href="{{ item.pictureUrl }}" target="_blank" style="background-image:url('{{ item.pictureUrl }}')"></div>
        {% endfor %}
      </div>
      {% elseif info.pictureList.length > 6 %}
        <div class="content-img full-pic">
          {% for index,item in info.pictureList %}
            <div class="pic pic-block" href="{{ item.pictureUrl }}" target="_blank" style="background-image:url('{{ item.pictureUrl }}')"></div>
          {% endfor %}
        </div>
      {% endif %}
      {%endif%}
    {% if info.shareInfo %}
    <div class="share-wrapper app-btn">
      <img src="{{ info.shareInfo.shareImage }}" alt="" class="share-pic">
      <p class="share-content">{{ info.shareInfo.shareTitle }}</p>
    </div>
    {% endif %}
    {% if info.location %}
    <p class="address app-btn">{{ (info.location|json_parse).name }}</p>
    {% endif %}
    <p class="func"><span class="time">{{ info.createTime }}</span><i class="leave-msg app-btn"></i></p>
  </div>

</div>

{% if info.likeCount != 0%}
<div class="praise-list-wrap">
    <p class="praise-number">{{ info.likeCount }}</p>
    <div class="praise-avatar-wrap clearfix">
        {% for item in zanList %}
        {% if loop.index < 46  %}
        <div class="avatar-item app-btn">
            <img src="{{ item.userImageUrl }}" alt="">
        </div>
        {% endif %}
        {% endfor %}
    </div>
    {% if info.likeCount > 45 %}
    <div class="praise-more">
        <a href="javascript:void(0)">查看更多</a>
        <i class="arrow-right"></i>
    </div>
    {% endif %}
</div>
{% endif %}
{% if info.commentCount != 0%}
<div class="comment-list-wrap">
    <p class="comment-title"><span class="comment-number">{{ info.commentCount }}</span><span class="comment-sort">按时间</span></p>
    {% for item in commentList %}
    <div class="comment-item app-btn">
        <img src="{{ item.fromUserImageUrl }}" alt="">
        <div class="comment-info">
            <div class="comment-title">
                <span class="nickname">{{ item.fromUserName }}</span>
                <span class="time">{{ item.createTime }}</span>
            </div>
            <div class="comment-content">
                <div class="content">
                    {{ item.commentContent }}
                </div>
                {% if item.replyNum != 0 %}
                <div class="sub-comment-wrap">
                    <p class="sub-comment-num">{{ item.replyNum }}</p>
                    <div class="sub-comment-list">
                        {% for subitem in item.replyList %}
                        <div class="sub-comment-item">
                            <img src="{{ subitem.fromUserImageUrl }}" alt="">
                            <div class="sub-comment-info">
                                <div class="sub-comment-title">
                                    <span class="nickname">{{ subitem.fromUserName }}{% if subitem.toUserId %}<span class="reply-word">回复</span>{{ subitem.toUserName }}{% endif %}</span>
                                    <span class="time">{{ subitem.createTime }}</span>
                                </div>
                                <div class="sub-comment-content">
                                    {{ subitem.commentContent }}
                                </div>
                            </div>
                        </div>
                        {% endfor %}
                    </div>
                    {% if item.replyNum > 2 %}
                    <div class="sub-comment-more">
                        <a href="javascript:void(0)">查看更多回复</a>
                        <i class="arrow-down"></i>
                    </div>
                    {% endif %}
                </div>
                {% endif %}
            </div>
        </div>
    </div>
    {% endfor %}
</div>
{% endif %}
