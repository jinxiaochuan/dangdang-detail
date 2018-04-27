<div v-if="sceneInfo" class="scene-sign-in-wrap">
    <div v-if="sceneInfo" class="scene-wrap">
        <p class="name">{{ sceneInfo.name }}</p>

        <p class="scene clearfix"><i class="location-icon"></i><span class="scene-location">{{ sceneInfo.location | json_covert('name') }}</span></p>

        <div v-if="sceneInfo.desc" class="desc">
            {{ sceneInfo.desc }}
        </div>
    </div>

    <div  class="member-wrap">
        <span class="member-desc">现场成员</span>
        <div class="member">
            <div v-if="signinList.length" class="avatar-list">
                <div v-for="item in signinList" class="avatar-item">
                    <img :src="item.userImage" alt="">
                </div>
            </div>
            <span v-if="sceneInfo.signinNum != 0" class="member-num">{{ sceneInfo.signinNum }}人</span>
            <i class="arrow"></i>
        </div>
    </div>

    <div v-if="sceneInfo.hasLottery == 1" class="draw-wrap">
        <span class="draw-desc">现场抽奖</span>
        <i class="arrow"></i>
    </div>

    <div class="scene-handle-wrap">
        <a class="scene-btn" href="avascript:void(0)">签到</a>
    </div>

</div>
