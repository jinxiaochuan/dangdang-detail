<div>
    <div v-show="house" class="house-detail-wrap">
        <div class="iSlider-wrapper" @click="tapPV">
            <div class="iSlider" ref="iSlider">
                <i class="slide-dot">{{ slideIndex + 1 }}/{{ list.length }}</i>
                <!-- <i v-if="house && house.status == 2" class="status cancel">已取消</i> -->
                <!-- <i v-if="house && house.isFreeze == 1" class="status prohibite">已封禁</i> -->
            </div>
        </div>
        <div v-if="house" class="house-issue">
            <div class="issue">
                <div class="avatar" @click="tapUser">
                    <img :src="house.user.headImage.pictureUrl" alt="">
                </div>
                <span class="name">{{ house.user.showName }}</span>
                <span v-if="house.userType == 2" class="identity">{{ house.userType | map('H_USER_TYPE') }}</span>
            </div>
            <div class="info">
                <p class="title">{{ house.title }}</p>
                <div class="standard-price">
                    <div class="standard">
                        <span v-if="house.houseType != 0" class="standard-item">{{ house.houseType | map('H_HOUSE_TYPE') }}</span>
                        <span v-if="house.decoration != 0" class="standard-item">{{ house.decoration | map('H_DECORATION') }}</span>
                        <span v-if="house.paymentType != 0" class="standard-item">{{ house.paymentType | map('H_PAYMENT_TYPE') }}</span>
                    </div>
                    <span class="price">{{ house.formatMoney }}</span>
                </div>
                <div class="area-type">
                    <span class="area">{{ house.houseArea }}㎡</span>
                    <span class="type">{{ house.houseModel }}</span>
                    <span class="floor">{{ house.floor }}</span>
                    <span class="towards">{{ house.towards | map('H_TOWARDS') }}</span>
                </div>
                <div v-if="house.type == 2" class="years-unit">
                    <span class="years">
                        <label>年代：</label>
                        <span>{{ house.buildTime | map('H_BUILD_TIME') }}</span>
                    </span>
                    <span class="unit">
                        <label>单价：</label>
                        <span>{{ house.formatUnitPrice }}</span>
                    </span>
                </div>
            </div>
        </div>
        <div class="house-location">
            <span class="title">所在位置</span>
            <div class="AMap-wrapper">
                <div class="AMap-inner" id="AMap">

                </div>
            </div>
        </div>
        <p class="house-address" v-text="house && house.houseUnit"></p>

        <div v-if="house && house.type == 1" class="house-facility">
            <span class="title">配套设施</span>
            <div class="facility-list clearfix">
                <div v-for="(item, index) in facilities" class="facility-item" :class="{'active': isExist(index + 1)}">
                    <i class="facility" :class="'facility_' + (index + 1)"></i>
                    <span class="facility-name">{{ index | map('H_FACILITY') }}</span>
                </div>
            </div>
        </div>
        <div v-if="house" class="house-survey">
            <span class="title">房屋概况</span>
            <div class="survey" v-html="house.content"></div>
        </div>
        <div v-if="house" class="house-handle">
            <div class="publish-offline">
                <span class="time">{{ house.formatPublishTime }}</span>
                <span v-if="house.user.userId == userId && source == 0" class="handle-publish-offline">
                    <span v-if="house.isFreeze == 1" class="prohibite">已封禁</span>
                    <a v-if="house.status == 1 && house.isFreeze == 0" @click="tapOffLine" class="offline" href="javascript:void(0)">下线</a>
                    <a v-else class="publish" @click="tapPublish" href="javascript:void(0)">重新发布</a>
                </span>
            </div>
            <div v-if="house.user.userId == userId && source == 0" class="edit-delete">
                <a @click="tapEdit" class="edit" href="javascript:void(0)">编辑</a>
                <a @click="tapDel" class="delete" href="javascript:void(0)">删除</a>
            </div>
        </div>
    </div>
    <div v-if="msg" class="house-error-wrap">
        <err :msg="msg"></err>
    </div>
</div>
