<div class="scene-sign-in-wrap">

    <div v-if="sceneInfo" class="scene-wrap">
        <p class="name">{{ sceneInfo.name }}</p>

        <p class="scene clearfix">
            <i class="location-icon"></i>
            <span class="scene-location">{{ sceneInfo.location | location_covert }}</span>
        </p>

        <p class="duration">
            签到时效: {{ sceneInfo.formatDuration }}
        </p>

        <div v-if="sceneInfo.desc" class="desc">
            {{ sceneInfo.desc }}
        </div>
    </div>

    <div v-if="sceneInfo" class="member-wrap">
        <span class="member-desc">现场成员</span>
        <div class="member">
            <div v-if="signinList.length" class="avatar-list">
                <div v-for="(item, index) in signinList" v-if="index < 5" class="avatar-item">
                    <img :src="item.userImage" alt="">
                </div>
            </div>
            <span v-if="sceneInfo.signinNum != 0" class="member-num">{{ sceneInfo.signinNum }}人</span>
            <i class="arrow"></i>
        </div>
    </div>

    <div v-if="sceneInfo && sceneInfo.hasLottery == 1" class="draw-wrap">
        <span class="draw-desc">现场抽奖</span>
        <i class="arrow"></i>
    </div>

    <div v-if="sceneInfo" class="scene-handle-wrap">
        <a class="scene-btn" :class="{'app-btn': source == 1}" href="avascript:void(0)">签到</a>
    </div>

    <div v-if="msg" class="scene-error-wrap">
        <err :msg="msg"></err>
    </div>

</div>
