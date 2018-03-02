<div class="lotto-red-envelope-wrap">
    <div class="envelope-top">

    </div>
    <div v-if="record" class="envelope-detail">
        <div @click="tapUser" class="avatar">
            <img :src="record && record.userImage" alt="">
        </div>
        <span class="name">{{ record && record.userName }}</span>
        <span class="num">已领取了{{ record && record.showNo }}号红包</span>
        <span v-if="record && record.hbType == 0" class="cash-wrap">
            <span class="cash-amount"><span class="amount-num">{{ record && record.amount|amount_convert }}</span>元</span>
            <span class="cash-prize">{{ record && record.prizeName }}</span>
            <i v-if="record && record.isInList == 1" class="honor-roll"></i>
        </span>
        <span v-if="record && record.hbType == 1" class="material-wrap">
            <span class="material-name">{{ record && record.materialName }}</span>
            <span v-if="record && record.materialImage" class="material-img"><img :src="record && record.materialImage" alt=""></span>
            <span class="material-prize">{{ record && record.prizeName }}</span>
            <i v-if="record && record.isInList == 1" class="honor-roll"></i>
        </span>
        <a @click="tapDetail" href="javascript:void(0)" class="sponsor"><span class="sponsor-title">{{ record && record.title }}</span> <i class="triangle"></i></a>
    </div>
    <div v-if="record && record.drawImage" class="envelope-star" v-bind:style="{backgroundImage: 'url('+ recordBg +')'}">
        <div class="avatar-wrap">
            <div class="avatar-inner-wrap">
                <div v-for="item in JSON.parse(record.drawImage)" :class="{'big': JSON.parse(record.drawImage).length < 4}" class="star avatar">
                    <img :src="item.picture" alt="">
                </div>
            </div>
        </div>
        <div class="envelope-bless-wrap">
            <div class="envelope-bless-top"></div>
            <div class="envelope-bless-middle">
                {{ record && record.drawSlogan }}
            </div>
            <div class="envelope-bless-bottom"></div>
        </div>
        <!-- <div class="envelope-word-wrap">
            <div class="envelope-word">
                <i class="dot lt"></i>
                <i class="dot rt"></i>
                {{ record && record.drawSlogan }}
                <i class="dot lb"></i>
                <i class="dot rb"></i>
            </div>
        </div> -->
        <div class="envelope-code">
            <span class="word">使用我的红包码，均可获得一张红包卡</span>
            <span class="code">{{ record && record.code }}</span>
        </div>
    </div>
    <div v-if="record && !record.drawImage" class="envelope-card">
        <span class="code">{{ record && record.code }}</span>
        <span class="word">我的红包码</span>
    </div>
</div>
