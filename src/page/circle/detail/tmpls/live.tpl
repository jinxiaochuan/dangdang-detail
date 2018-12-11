<div class="common-circle-live-wrap">
    <h2 class="circle-live-title">{{ data.articleInfo.articleTitle }}</h2>

    <div class="circle-live-source">
        {% if data.articleInfo.liveInfo.author %}<span class="source">{{ data.articleInfo.liveInfo.author }}</span>{% endif %}
        <span class="name tap-avatar app-btn">{{ data.circleInfo.circleName }}</span>
        <span class="time">{{ data.articleInfo.liveInfo.formatLiveCreateTime }}</span>
    </div>

    <div class="circle-live-wrapper app-btn" style="background-image: url('{{ data.articleInfo.liveInfo.coverImage.picture }}')">
        <div class="blur-layer">
            {% if data.articleInfo.liveInfo.liveStatus == 3 %}
            <div class="video-play"></div>
            {% else %}
            <div class="play-btn"></div>
            {% endif %}
            {% if data.articleInfo.liveInfo.liveStatus == 2 %}
            <span class="live-status">
                直播中...
            </span>
            {% endif %}
        </div>
    </div>

    {% if data.source == 1 && data.circleInfo.closeMemberListOuter == 0 && data.circleInfo.memberInfo %}
    <div class="common-mini-avatar-wrap">
        <div class="mini-avatar-left">
            <ul class="mini-avatar-list clearfix">
                {% for item in  data.circleInfo.memberInfo.userList %}
                <li class="mini-avatar-item">
                    <img src="{{ item.headImage.picture }}" alt="">
                </li>
                {% endfor %}
            </ul>
            <span class="mini-avatar-num">{{ data.circleInfo.memberInfo.memberCount }}人</span>
        </div>
        <a class="mini-avatar-join app-btn" href="javascript:void(0)">加入</a>
    </div>
    {% endif %}

    <div class="circle-live-detail">
        <div class="detail-content">
            {{ data.articleInfo.detail|safe }}
        </div>
    </div>

    <div class="common-address">
        <a class="tap-location app-btn" href="javascript:void(0)">{{ (data.articleInfo.location|json_parse).name }}</a>
    </div>
    <div class="common-comment-wrap">
        <span class="access">
            <span class="publish-time">{{ data.articleInfo.formatCreateTime }}</span>
            {% if data.articleInfo.isOwner == '1' && data.isAdminIdentity == '1' %}
            {% if data.articleInfo.showAccess == 1 %}
            <a class="show-access" href="javascript:void(0)"><i class="member-part"></i></a>
            {% elseif data.articleInfo.showAccess == 2 %}
            <a class="show-access" href="javascript:void(0)"><i class="member-join"></i></a>
            {% elseif data.articleInfo.showAccess == 3 %}
            <a class="show-access" href="javascript:void(0)"><i class="member-part"></i></a>
            {% else %}
            <a class="show-access" href="javascript:void(0)"><i class="member"></i></a>
            {% endif %}
            {% endif %}
        </span>
        <span class="icon-wrap">
            <a class="read-wrap" href="javascript:void(0)"><i class="read"></i><span class="read-num">{% if data.webShowInfo.readCount != 0 %}{{ data.webShowInfo.readCount }}{% endif %}</span></a>
            {% if data.articleInfo.isCanComment == 1 %}
            <a class="comment-wrap app-btn" href="javascript:void(0)"><i class="comment"></i><span class="comment-num">{% if data.webShowInfo.commentCount != 0 %}{{ data.webShowInfo.commentCount }}{% endif %}</span></a>
            {% endif %}
        </span>
    </div>
    {% if data.isAdminIdentity ==  '1' %}
    <div class="live-type-wrap">
        {% if data.articleInfo.liveInfo.liveType == 1 %}
        <div class="live-cellphone-wrap {% if data.articleInfo.liveInfo.liveStatus == 1 || data.articleInfo.liveInfo.liveStatus == 2 %}init{% elseif data.articleInfo.liveInfo.liveStatus == 3 %}finish{% elseif data.articleInfo.liveInfo.liveStatus == 5 %}suspend{% else %}{% endif %}">
            <div class="live-status init">
                <a class="live-btn" href="javascript:void(0)"><span>进入直播</span></a>
                <p>直播即代表同意<a class="live-agree" href="javascript:void(0)">《铛铛主播协议》</a></p>
            </div>
            <div class="live-status suspend">
                <a class="continue-live-btn" href="javascript:void(0)"><span>继续直播</span></a>
            </div>
            <div class="live-status finish">
                <div class="finish-word">
                    <i class="line"></i>
                    <span>直播已结束</span>
                    <i class="line"></i>
                </div>
            </div>
        </div>
        {% elseif data.articleInfo.liveInfo.liveType == 2 %}
        <div class="live-profession-wrap">
            <span>＊专业设备摄像直播，请去PC端查看推流地址</span>
        </div>
        {% else %}
        {% endif %}
    </div>
    {% endif %}
</div>
