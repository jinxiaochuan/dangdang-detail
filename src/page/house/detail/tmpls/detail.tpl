<div>
    <div class="house-detail-wrap">
        <div v-if="iSlider_is" class="iSlider-wrapper" @click="tapPV">
            <div class="iSlider" ref="iSlider">
                <i class="slide-dot">{{ slideIndex + 1 }}/{{ list.length }}</i>
                <!-- <i v-if="house && house.status == 2" class="status cancel">已取消</i> -->
                <!-- <i v-if="house && house.isFreeze == 1" class="status prohibite">已封禁</i> -->
            </div>
        </div>
        <div v-if="house" class="house-issue">
            <div class="issue">
                <div class="avatar" @click="tapUser">
                    <img :src="house.user.userImage" alt="">
                </div>
                <span class="name">{{ house.user.showName }}</span>
                <span class="identity">{{ house.userType | map('H_USER_TYPE') }}</span>
            </div>
            <div class="info">
                <p class="title"><span v-if="house.rentType != 0" class="rent">{{ house.rentType | map('H_RENT_TYPE') }}·</span>{{ house.title }}</p>
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
        <div v-if="house && MAP_STATIC" class="house-location">
            <span class="title">房屋位置</span>
            <div class="AMap-wrapper">
                <div @click="tapAMap" class="AMap-inner" id="AMap" :style="{backgroundImage: 'url('+ MAP_STATIC +')' }">
                    <div class="map__mark">
                        <div class="map__mark--circle"></div>
                        <div class="map__mark--des">
                            <p class="map__mark--title">{{ MAP_ADDRESS }}</p>
                        </div>
                    </div>
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
        <div v-if="house && house.content" class="house-survey">
            <span class="title">更多信息</span>
            <div class="survey" v-html="house.content"></div>
        </div>
        <div v-if="house" class="house-time">
            <span v-if="house.createTime == house.updateTime">发布于{{ house.formatPublishTime }}</span>
            <span v-else>更新于{{ house.formatPublishTime }}</span>
        </div>
        <div v-if="house && isAdmin == 0 && house.user.userId == userId && source == 0" class="house-handle">
            <div class="publish-offline">
                <span class="time">

                </span>
                <span class="handle-publish-offline">
                    <span v-if="house.isFreeze == 0 && house.status == 2" class="offline-status">已下线</span>
                    <span v-if="house.isFreeze == 1" class="prohibite-status">已封禁</span>
                    <a v-if="house.status == 1 && house.isFreeze == 0" @click="tapOffLine" class="offline" href="javascript:void(0)">下线</a>
                    <a v-else class="publish" @click="tapPublish" href="javascript:void(0)">重新发布</a>
                </span>
            </div>
            <div class="edit-delete">
                <a @click="tapEdit" class="edit" href="javascript:void(0)">编辑</a>
                <a @click="tapDel" class="delete" href="javascript:void(0)">删除</a>
            </div>
        </div>
    </div>
    <div v-if="msg" class="house-error-wrap">
        <err :msg="msg"></err>
    </div>
</div>
