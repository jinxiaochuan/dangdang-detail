<div class="common-circle-header">
    <div class="avatar-wrap">
        <a class="tap-avatar" href="javascript:void(0)">
            <img class="avatar" src="{{ data.circleInfo.circleLogo.pictureUrl }}" alt="">
        </a>
    </div>
</div>

<div class="common-circle-live-wrap">
    <div class="circle-live-title">{{ data.articleInfo.articleTitle }}</div>

    <div class="circle-live-source">
        {% if data.articleInfo.liveInfo.author %}<span class="source">{{ data.articleInfo.liveInfo.author }}</span>{% endif %}
        <span class="time">{{ data.articleInfo.liveInfo.formatLiveCreateTime }}</span>
    </div>

    <div class="circle-live-wrapper" style="background-image: url('{{ data.articleInfo.coverImage.picture }}')">
        <div class="blur-layer">
            {% if data.articleInfo.liveInfo.liveStatus == 3 %}
            <div class="video-play"></div>
            {% else %}
            <div class="play-btn"></div>
            {% endif %}
        </div>
    </div>

    <div class="circle-live-detail">
        <div class="detail-content">
            {{ data.articleInfo.detail|safe }}
        </div>
    </div>

    <div class="common-address">
        <a class="tap-location" href="javascript:void(0)">{{ (data.articleInfo.location|json_parse).name }}</a>
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
            <a class="comment-wrap" href="javascript:void(0)"><i class="comment"></i><span class="comment-num">{% if data.webShowInfo.commentCount != 0 %}{{ data.webShowInfo.commentCount }}{% endif %}</span></a>
            {% endif %}
        </span>
    </div>
    <div class="live-type-wrap">
        {% if data.articleInfo.liveInfo.liveType == 1 %}
        <div class="live-cellphone-wrap {% if data.articleInfo.liveInfo.liveStatus == 1 || data.articleInfo.liveInfo.liveStatus == 2 %}init{% elseif data.articleInfo.liveInfo.liveStatus == 3 %}finish{% elseif data.articleInfo.liveInfo.liveStatus == 5 %}suspend{% else %}{% endif %}">
            <div class="live-status init">
                <a class="live-btn" href="javascript:void(0)"><span>进入直播</span></a>
                <p>直播即代表同意<a class="live-agree" href="/ddweb/live/rule">《铛铛主播协议》</a></p>
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
</div>
