<div class="common-circle-header my-gallery">
    <div class="avatar-wrap">
        <a class="tap-avatar" href="javascript:void(0)">
            <img class="avatar" src="{{ data.circleInfo.circleLogo.pictureUrl }}" alt="">
        </a>
    </div>
</div>
<div class="common-circle-news-wrap">
    <div class="circle-news-title">{{ data.articleInfo.articleTitle }}</div>

    <div class="circle-news-source">
        {% if data.articleInfo.source %}<span class="source">{{ data.articleInfo.source }}</span>{% endif %}
        <span class="time">{{ data.articleInfo.formatNewsTime }}</span>
    </div>

    <div class="circle-news-detail">
        <div class="detail-content my-gallery">
            {{ data.articleInfo.detail|safe }}
        </div>
    </div>
    <!-- 分享至外部且有红包 -->
    {% if data.source %}
    {% if data.articleInfo.hbInfo %}
    <div class="circle-red-envelope">
        <div class="red-envelope">
            <div class="red-envelope-word">{{ data.articleInfo.hbInfo.hbMessage }}</div>
            <div class="red-envelope-status">领取红包</div>
        </div>
    </div>
    {% endif %}
    {% else %}
    <!-- app内部支持红包且有红包 -->
    {% if data.supportHb && data.articleInfo.hbInfo %}
    <div class="circle-red-envelope {% if data.articleInfo.hbInfo.hbStatus == 3 %}rev{% elseif data.articleInfo.hbInfo.hbStatus == 4 %}expire{% elseif data.articleInfo.hbInfo.hbStatus == 5 %}rev-al{% else %}{% endif %}">
        {% if data.articleInfo.hbInfo.hbStatus == 2 %}
        <div class="red-envelope">
            <div class="red-envelope-word">{{ data.articleInfo.hbInfo.hbMessage }}</div>
            <div class="red-envelope-status">领取红包</div>
        </div>
        {% elseif data.articleInfo.hbInfo.hbStatus == 3 %}
        <div class="red-envelope-rev">
            <div class="red-envelope-status">红包已被领完</div>
        </div>
        {% elseif data.articleInfo.hbInfo.hbStatus == 4 %}
        <div class="red-envelope-expire">
            <div class="red-envelope-word">{{ data.articleInfo.hbInfo.hbMessage }}</div>
            <div class="red-envelope-status">红包已过期</div>
        </div>
        {% elseif data.articleInfo.hbInfo.hbStatus == 5 %}
        <div class="red-envelope-rev-al">
            <div class="red-envelope-status">红包已领取</div>
        </div>
        {% else %}
        {% endif %}
    </div>
    {% endif %}
    <!-- app内部不支持红包且有红包 -->
    {% if !data.supportHb && data.articleInfo.hbInfo %}
    <div class="circle-red-envelope">
        <div class="red-envelope-nosupport">

        </div>
    </div>
    {% endif %}
    {% endif %}

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
    {% if data.articleInfo.openDonate == '1' %}
    {% if data.isAdminIdentity ==  '1' %}
    <div class="common-sign-list-wrap">
        <a class="tap-donate" href="javascript:void(0)">
            <div class="sign-wrap">
                <span class="num">捐赠记录{% if data.articleInfo.donateCount != 0 %}（{{ data.articleInfo.donateCount }}）{% endif %}</span>
                <span class="arrow"></span>
            </div>
        </a>
    </div>
    {% else %}
    <div class="circle-donate-wrap">
        <a class="donate-btn" href="javascript:void(0)"><span>捐赠</span></a>
    </div>
    {% endif %}
    {% endif %}
</div>
