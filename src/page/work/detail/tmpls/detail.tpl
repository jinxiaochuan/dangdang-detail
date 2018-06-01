<div>
    <div class="work-detail-wrap">
        <div class="hr">
            <div class="avatar">
                <img src="http://s1.im-dangdang.com/20171013/7iXfT2m85a.png?x-oss-process=image/crop,x_0,y_81,w_999,h_999" alt="">
            </div>
            <span class="hr-name">上官娜娜</span>
            <span class="hr-position">(人力资源经理)</span>
        </div>
        <div class="position">
            <div class="position-name">
                <span class="name">交互设计专家</span>
                <span class="salary">30-50K</span>
            </div>
            <div class="position-criteria">
                <div class="position-item industry">
                    互联网/移动互联网/电子商务
                </div>
                <div class="position-item experience">
                    经验1-2年
                </div>
                <div class="position-item education">
                    博士
                </div>
                <div class="position-item nature">
                    全职 | 招聘人数: 5人
                </div>
            </div>
            <div class="position-welfare">
                <div class="welfare-list clearfix">
                    <span class="welfare-item">五险一金</span>
                    <span class="welfare-item">绩效奖金</span>
                    <span class="welfare-item">股票期权</span>
                    <span class="welfare-item">年终分红</span>
                    <span class="welfare-item">出差补贴</span>
                    <span class="welfare-item">带薪年假</span>
                    <span class="welfare-item">高温补贴</span>
                    <span class="welfare-item">定期体检</span>
                    <span class="welfare-item">奖金丰厚</span>
                    <span class="welfare-item">全勤奖</span>
                    <span class="welfare-item">周末双休</span>
                    <span class="welfare-item">餐补</span>
                    <span class="welfare-item">房补</span>
                </div>
            </div>
            <div class="position-company">
                <span class="company-name">智慧家科技(北京)有限公司</span>
                <div class="company-album">
                    <div class="album-list">
                        <div class="album-item">
                            <img src="http://s1.im-dangdang.com/20171013/7iXfT2m85a.png?x-oss-process=image/crop,x_0,y_81,w_999,h_999" alt="">
                        </div>
                        <div class="album-item">
                            <img src="http://s1.im-dangdang.com/20171013/7iXfT2m85a.png?x-oss-process=image/crop,x_0,y_81,w_999,h_999" alt="">
                        </div>
                        <div class="album-item">
                            <img src="http://s1.im-dangdang.com/20171013/7iXfT2m85a.png?x-oss-process=image/crop,x_0,y_81,w_999,h_999" alt="">
                        </div>
                        <div class="album-item">
                            <img src="http://s1.im-dangdang.com/20171013/7iXfT2m85a.png?x-oss-process=image/crop,x_0,y_81,w_999,h_999" alt="">
                        </div>
                        <div class="album-item">
                            <img src="http://s1.im-dangdang.com/20171013/7iXfT2m85a.png?x-oss-process=image/crop,x_0,y_81,w_999,h_999" alt="">
                        </div>
                        <div class="album-item">
                            <img src="http://s1.im-dangdang.com/20171013/7iXfT2m85a.png?x-oss-process=image/crop,x_0,y_81,w_999,h_999" alt="">
                        </div>
                    </div>
                </div>
                <span class="company-address">北京市朝阳区建国路77号华贸中心3座35层</span>
            </div>
        </div>
        <div class="position-desc">
            <span class="title">职位描述</span>
            <div class="desc">
                <span v-html="handleDesc(desc)"></span>
                <span v-if="isViewAll && viewAllStatus" @click="togView" class="view-all">查看全部</span>
                <span v-if="isViewAll && !viewAllStatus" @click="togView" class="view-all">收起</span>
            </div>
        </div>
        <div class="position-concat">
            <span class="title">联系人邮箱</span>
            <div class="concat-email">
                <span class="email">18210898122@163.com</span>
                <span>(长按复制)</span>
            </div>
        </div>
        <div class="position-handle">
            <div class="publish-offline">
                <span class="time">

                </span>
                <span class="handle-publish-offline">
                    <span class="offline-status">已下线</span>
                    <span class="prohibite-status">已封禁</span>
                    <a @click="tapOffLine" class="offline" href="javascript:void(0)">下线</a>
                    <a class="publish" @click="tapPublish" href="javascript:void(0)">重新发布</a>
                </span>
            </div>
            <div class="edit-delete">
                <a @click="tapEdit" class="edit" href="javascript:void(0)">编辑</a>
                <a @click="tapDel" class="delete" href="javascript:void(0)">删除</a>
            </div>
        </div>
    </div>
</div>
