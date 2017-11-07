<div class="praise-list-wrap">
    <p class="praise-number">{{ info.likeCount }}</p>
    <div class="praise-avatar-wrap clearfix">
        {% for item in zanList %}
        {% if loop.index < 46  %}
        <div class="avatar-item">
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

<div class="comment-list-wrap">
    <p class="comment-title"><span class="comment-number">{{ info.commentCount }}</span><span class="comment-sort">按时间</span></p>
    {% for item in commentList %}
    <div class="comment-item">
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
                                    <span class="nickname">{{ subitem.fromUserName }}{% if subitem.toUserId %}回复{{ subitem.toUserName }}{% endif %}</span>
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
