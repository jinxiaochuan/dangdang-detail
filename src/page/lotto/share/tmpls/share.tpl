<div class="lotto-share-wrap">
    <div class="share-top">

    </div>
    <div class="share-detail">
        <div @click="tapUser" class="avatar">
            <img :src="userImage" alt="">
        </div>
        <span class="name">{{ showName }}</span>
        <span class="bless">{{ shareGreeting }}</span>
        <div @click="openEnvelope" class="share-envelope">
            <span class="num">{{ showNo }}</span>
            <span class="share-receive">
                <span class="code">{{ shareCode }}</span>
                <span class="word">红包领取码</span>
            </span>
        </div>
        <span class="guide">【发现】—【红包天天乐】—【…】—【领取红包】</span>
        <span class="story">{{ shareStory }}</span>
        <div class="share-invite-wrap">
            <span class="code-word">使用我的邀请码，均可获得一张红包卡</span>
            <div class="share-invite">
                <span class="invite-code">{{ code }}</span>
            </div>
        </div>
    </div>
</div>
