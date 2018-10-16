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
    <div class="grid-area grid-video">
        <div class="grid-item is-video" data-url="{{ info.video.videoUrl }}" style="background-image:url('{{ info.video.pictureUrl }}')">
            <i class="play-btn"></i>
        </div>
    </div>
    {% endif %}
    {% if info.pictureList %}
    <div class="grid-area
    {% if info.pictureList.length == 1 %}
    grid-one
    {% elseif info.pictureList.length == 2 %}
    grid-two
    {% elseif info.pictureList.length == 3 %}
    grid-three
    {% elseif info.pictureList.length == 4 %}
    grid-four
    {% elseif info.pictureList.length == 5 %}
    grid-five
    {% else %}
    grid-more
    {% endif %}
    ">
    {% for index,item in info.pictureList %}
    <div class="grid-item grid-pic" style="background-image:url('{{ item.pictureUrl }}')"></div>
    {% endfor %}
    </div>
    {% endif %}
    {% if info.shareInfo %}
    <div class="share-wrapper app-btn">
      <img src="{{ info.shareInfo.shareImage }}" alt="" class="share-pic">
      <p class="share-content">{{ info.shareInfo.shareTitle }}</p>
    </div>
    {% endif %}
    {% if info.location && (info.location != '{}') %}
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
