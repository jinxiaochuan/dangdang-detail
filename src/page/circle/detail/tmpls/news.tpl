<div class="common-circle-news-wrap">
    <h2 class="circle-news-title">{{ data.articleInfo.articleTitle }}</h2>

    <div class="circle-news-source">
        {% if data.articleInfo.source %}<span class="source">{{ data.articleInfo.source }}</span>{% endif %}
        <span class="name tap-avatar app-btn">{{ data.circleInfo.circleName }}</span>
        <span class="time">{{ data.articleInfo.formatNewsTime }}</span>
    </div>

    {% if data.source == 1 && data.circleInfo.closeMemberListOuter == 0 && data.circleInfo.memberInfo  %}
    <div class="common-mini-avatar-wrap">
        <div class="mini-avatar-left">
            <ul class="mini-avatar-list clearfix">
                {% for item in  data.circleInfo.memberInfo.userList %}
                <li class="mini-avatar-item">
                    <img src="{{ item.headImage.picture }}" alt="">
                </li>
                {% endfor %}
            </ul>
            <span class="mini-avatar-num">{{ data.circleInfo.memberInfo.memberCount | Numberal }}人</span>
        </div>
        <a class="mini-avatar-join app-btn" href="javascript:void(0)">加入</a>
    </div>
    {% endif %}

    <div class="circle-news-detail {% if data.source == 1 %}outer{% endif %}">
        <div class="detail-content my-gallery">
            {{ data.articleInfo.detail|safe }}
        </div>
    </div>
    {% if data.source == 1 %}
    <div class="common-packup-wrap">
        <div class="packup-gradient">
            <span class="packup-arrow"></span>
        </div>
        <div class="packup-open app-btn">打开铛铛阅读</div>
    </div>
    {% endif %}
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

    {% if data.voteInfo %}
    <div class="circle-vote-wrap">
        {% if data.isAdminIdentity == 1 %}
        <div class="vote-wrap">
            <div class="vote-sign-list-wrap">
                <a class="tap-sign vote-action" href="javascript:void(0)">
                    <div class="sign-wrap">
                        <span class="num">投票详情</span>
                        <span class="arrow"></span>
                    </div>
                </a>
            </div>
        </div>
        {% else %}
        <div class="vote-wrap">
            <div class="common-deadline-wrap">
                <span class="deadline">投票截止时间：{{ data.voteInfo.fmtDeadline }}</span>
            </div>
            <a class="vote-btn vote-action" href="javascript:void(0)">投票</a>
        </div>
        {% endif %}
    </div>
    {% endif %}

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
