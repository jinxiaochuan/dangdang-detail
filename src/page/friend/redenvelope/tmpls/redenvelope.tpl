<div class="lotto-red-envelope-wrap">
    <div class="envelope-top">

    </div>
    <div v-if="receiveInfo" class="envelope-detail">
        <div class="avatar">
            <img :src="receiveInfo.sender.headUrl" alt="">
        </div>
        <span class="name">{{ receiveInfo.sender.showName }}</span>
        <div class="receive-info-wrap">
            <div @click="tapUser" class="receive-avatar">
                <img :src="receiveInfo.useCodeUser.headUrl" alt="">
            </div>
            <div class="receive-detail">
                <span><span @click="tapUser" class="receive-name">{{ receiveInfo.useCodeUser.showName }}</span></span>
                <span class="receive-desc">使用了<em @click="tapCodeUser">{{ receiveInfo.codeUser.showName }}</em>的<span v-if="receiveInfo.codeType == 1">朋友码</span><span v-if="receiveInfo.codeType == 2">圈子码</span><span v-if="receiveInfo.codeType == 3">圈子码</span></span>
            </div>
        </div>
        <span class="cash-wrap">
            <span class="cash-amount"><span class="amount-num">{{  receiveInfo.hbMoney|amount_convert }}</span>元</span>
        </span>
    </div>
    <div v-if="receiveInfo" class="envelope-star" v-bind:style="{backgroundImage: 'url('+ receiveBg +')'}">
        <!-- <div class="envelope-bless-wrap">
            <div class="envelope-bless-top"></div>
            <div class="envelope-bless-middle">
                {{ receiveInfo.info.activityInfo.hbSlogan }}
            </div>
            <div class="envelope-bless-bottom"></div>
        </div> -->
        <div class="friend-envelope-bless-wrap">
            {{ receiveInfo.info.activityInfo.hbSlogan }}
        </div>
        <div class="envelope-code" :class="{'no-slogn': !receiveInfo.info.activityInfo.hbSlogan}">
            <span class="word" v-if="receiveInfo.codeType == 1">使用我的朋友码，双方均可获得奖励</span>
            <span class="word" v-if="receiveInfo.codeType == 2">使用圈子码，加入相应公众圈并获得奖励</span>
            <span class="word" v-if="receiveInfo.codeType == 3">使用圈子码，加入相应公众圈并获得奖励</span>
            <span class="code">{{ receiveInfo.info.codeInfo.code }}</span>
        </div>
    </div>
</div>
