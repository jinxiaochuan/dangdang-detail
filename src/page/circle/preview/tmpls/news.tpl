<div class="common-circle-news-wrap">
    <h2 class="circle-news-title">{{ data.articleInfo.articleTitle }}</h2>

    <div class="circle-news-source">
        {% if data.articleInfo.source %}<span class="source">{{ data.articleInfo.source }}</span>{% endif %}
        <span class="name tap-avatar">{{ data.circleName }}</span>
        <span class="time">{{ data.articleInfo.formatNewsTime }}</span>
    </div>

    <div class="circle-news-detail">
        <div class="detail-content">{{ data.articleInfo.detail|safe }}</div>
    </div>

    {% if data.voteInfo %}
    <div class="circle-vote-wrap">
        <div class="vote-wrap">
            <div class="common-deadline-wrap">
                <span class="deadline">投票截止时间：{{ data.voteInfo.fmtDeadline }}</span>
            </div>
            <a class="vote-btn vote-action" href="javascript:void(0)">投票</a>
        </div>
    </div>
    {% endif %}

    <div class="common-comment-wrap">
        <span class="access">
            <span class="publish-time">{{ data.articleInfo.formatCreateTime }}</span>
        </span>
    </div>
</div>

<div class="preview-fix">
    <span>此为临时链接，仅用于文章预览，将在短期内失效</span>
    <i class="close-icon">×</i>
</div>
