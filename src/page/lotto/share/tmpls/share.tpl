<div class="lotto-share-wrap">
    <div class="share-top">

    </div>
    <div class="share-detail">
        <div @click="tapUser" class="avatar">
            <img :src="userImage" alt="">
        </div>
        <span class="name">{{ showName }}</span>
        <div class="share-bless-wrap">
            <div class="share-bless-top"></div>
            <div class="share-bless-middle">
                {{ shareGreeting }}
            </div>
            <div class="share-bless-bottom"></div>
        </div>
        <div @click="openEnvelope" class="share-envelope" :class="{'app-btn': source}">
            <span class="num">{{ showNo }}</span>
        </div>
        <span class="share-receive">
            <span class="word">领取码：</span>
            <span class="code">{{ shareCode }}</span>
        </span>
        <span class="guide">领取步骤：下载注册/登录铛铛APP，点击【发现】-<br>进入【红包天天乐】- 点击右上角【...】-【领取红包】<br>输入领取码 - 确定</span>
        <div class="share-code-wrap">
            <span class="story">{{ shareStory }}</span>
            <div class="share-invite-wrap">
                <span class="code-word">使用我的邀请码，均可获得一张红包卡</span>
                <div class="share-invite">
                    <span class="invite-code">{{ code }}</span>
                </div>
            </div>
        </div>
    </div>
</div>
