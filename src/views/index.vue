<template>
  <div class="container">
    <div class="index-box">
      <div class="last-news">
        <div class="news-title">
          <img src="@/assets/images/news-title.png">
        </div>
        <div class="news-box">
          <div class="news-item news-img">
            <img src="@/assets/images/news-img.png" @click="toNews">
            <div class="news-info">
              {{ newsBannerTitle }}
            </div>
          </div>
          <div class="news-all">
            <el-tabs v-model="newsTabName">
              <el-tab-pane label="综合" name="complex">
                <span slot="label" style="font-size: 16px">综合</span>
                <div class="news-box">
                  <div class="news-top">
                    {{ complexTopNews }}
                  </div>
                  <div class="news-items">
                    <div class="news-item" v-for="(news ,index) in complexNewsList" :key="index" @click="toNews">
                      <span class="news-type">[{{ news.type }}]</span>
                      <span class="news-title">{{ news.title }}</span>
                      <span class="news-time">{{ news.time }}</span>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="公告" name="announcement">
                <span slot="label" style="font-size: 16px">公告</span>
                <div class="news-box">
                  <div class="news-top">
                    {{ announTopNews }}
                  </div>
                  <div class="news-items">
                    <div class="news-item" v-for="(news ,index) in announNewsList" :key="index" @click="toNews">
                      <span class="news-type">[{{ news.type }}]</span>
                      <span class="news-title">{{ news.title }}</span>
                      <span class="news-time">{{ news.time }}</span>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
            <div class="more-news" @click="moreNews">更多</div>
          </div>
        </div>
      </div>
      <div class="fast-entry">
        <div class="entry-title">
          <img src="@/assets/images/entry-title.png" alt="">
        </div>
        <div class="entry-btns">
          <div class="btns">
            <div class="join-bg">
              <img src="@/assets/images/join.png" class="btn" @click="toJoin">
            </div>
          </div>
          <div class="btns">
            <div class="mall-bg">
              <img src="@/assets/images/mall.png" class="btn" @click="toMall">
            </div>
          </div>
          <div class="btns">
            <div class="contact-bg">
              <img src="@/assets/images/contact.png" class="btn" @click="toContact">
            </div>
          </div>
        </div>
      </div>
      <div class="popular-activities">
        <div class="activity-title-img">
          <img src="@/assets/images/popular-activities-title.png" alt="">
        </div>
        <div class="activities">
          <el-tabs v-model="hotTabName">
            <el-tab-pane label="正在进行" name="going">
              <span slot="label" class="label">正在进行</span>
              <div class="activity">
                <div class="activity-item" v-for="(activity, index) in activityList1" :key="index">
                  <div class="activity-img" @click="toAct(index,activity.title)">
                    <img :src="activity.url" :alt="activity.title">
                  </div>
                  <div class="activity-title">
                    {{ activity.title }}
                  </div>
                  <div class="activity-time">
                    {{ activity.time }}
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="商城特惠" name="preference">
              <span slot="label" class="label">商城特惠</span>
              <div class="activity">
                <div class="activity-item" v-for="(activity, index) in activityList2" :key="index">
                  <div class="activity-img" @click="toAct(index,activity.title)">
                    <img :src="activity.url" :alt="activity.title">
                  </div>
                  <div class="activity-title">
                    {{ activity.title }}
                  </div>
                  <div class="activity-time">
                    {{ activity.time }}
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="长期活动" name="LongTerm">
              <span slot="label" class="label">长期活动</span>
              <div class="activity">
                <div class="activity-item" v-for="(activity, index) in activityList1" :key="index">
                  <div class="activity-img" @click="toAct(index,activity.title)">
                    <img :src="activity.url" :alt="activity.title">
                  </div>
                  <div class="activity-title">
                    {{ activity.title }}
                  </div>
                  <div class="activity-time">
                    {{ activity.time }}
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="更多" name="moerAct">
              <span slot="label" class="label">更多</span>
              <div class="activity">
                <div class="activity-item" v-for="(activity, index) in activityList3" :key="index">
                  <div class="activity-img" @click="toAct">
                    <img :src="activity.url" :alt="activity.title">
                  </div>
                  <div class="activity-title">
                    {{ activity.title }}
                  </div>
                  <div class="activity-time">
                    {{ activity.time }}
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>

    <el-dialog :title="activityTitle" :visible.sync="open" width="50%" append-to-body center>
      <div class="rule-text">
        {{activityContent}}
      </div>
    </el-dialog>

    <el-dialog title="合伙人合作协议" :visible.sync="openContract" width="50%" append-to-body center>
      <div class="rule-text">
        合伙人层级分为初级合伙人、高级合伙人、超级合伙人：<br>
        初级合伙人：有效会员人数达到500<br>
        高级合伙人：有效会员人数达到2000<br>
        超级合伙人：有效会员人数达到5000<br>
        （有效会员，注册、充值、参与比赛即为有效会员）<br>
        合伙人奖金和返现佣金比例：<br>
        初级合伙人：人数达到500人即可向我们的合伙人专员领取1000元奖金并享有线下会员充值累计满10000元的百分之2的佣金，奖金和返现佣金由CD平台进行发放。<br>
        高级合伙人：人数达到2000人即可向我们的合伙人专员领取5000元奖金并享有线下会员充值累计满10000元的百分之4的佣金，奖金和返现佣金由CD平台进行发放。<br>
        超级合伙人：会人数达到5000人即可向我们的合伙人专员领取12888元奖金并享有线下会员充值累计满10000元的百分之6的佣金，奖金和返现佣金由CD平台进行发放。<br>
        （人数达到即可向我们的合伙人专员申请合伙人升级。合伙人等级晋升：初级晋升高级会员充值额度返现佣金自动转化为4%；高级晋升超级会员充值额度返现佣金自动转化为6%）
      </div>
    </el-dialog>
  </div>
</template>

<script>

import Cookies from "js-cookie";

export default {
  name: 'Index',
  components: {},
  data() {
    return {
      open: false,
      openContract:false,
      activityTitle: '',
      activityContent: '',
      newsTabName: 'complex',
      hotTabName: 'going',
      activityList1: [
        { id: 1, url: require('@/assets/images/activity-1.png'), title: '杀一当百', time: '无次数限制' },
        { id: 2, url: require('@/assets/images/activity-2.png'), title: '摧枯拉朽', time: '无次数限制' },
        { id: 3, url: require('@/assets/images/activity-3.png'), title: '万人无敌', time: '无次数限制' },
        { id: 4, url: require('@/assets/images/activity-4.png'), title: '借力回天', time: '无次数限制' },
        { id: 5, url: require('@/assets/images/activity-4.png'), title: '众志成城', time: '无次数限制' },
        { id: 6, url: require('@/assets/images/activity-3.png'), title: '最佳损友', time: '无次数限制' },
        { id: 7, url: require('@/assets/images/activity-2.png'), title: '敬请期待', time: '敬请期待' },
        { id: 8, url: require('@/assets/images/activity-1.png'), title: '敬请期待', time: '敬请期待' }
      ],
      activityList2: [
        { id: 1, url: require('@/assets/images/activity-3.png'), title: '合作助力', time: '火热进行中' },
        { id: 2, url: require('@/assets/images/activity-2.png'), title: '积分兑换', time: '无次数限制' },
        { id: 3, url: require('@/assets/images/activity-4.png'), title: '敬请期待', time: '敬请期待' },
        { id: 5, url: require('@/assets/images/activity-4.png'), title: '敬请期待', time: '敬请期待' },
        { id: 6, url: require('@/assets/images/activity-2.png'), title: '敬请期待', time: '敬请期待' },
        { id: 7, url: require('@/assets/images/activity-2.png'), title: '敬请期待', time: '敬请期待' },
        { id: 8, url: require('@/assets/images/activity-4.png'), title: '敬请期待', time: '敬请期待' }
      ],
      activityList3: [
        { id: 1, url: require('@/assets/images/activity-1.png'), title: '敬请期待', time: '敬请期待' },
        { id: 2, url: require('@/assets/images/activity-2.png'), title: '敬请期待', time: '敬请期待' },
        { id: 3, url: require('@/assets/images/activity-4.png'), title: '敬请期待', time: '敬请期待' },
        { id: 4, url: require('@/assets/images/activity-3.png'), title: '敬请期待', time: '敬请期待' },
        { id: 5, url: require('@/assets/images/activity-2.png'), title: '敬请期待', time: '敬请期待' }

      ],
      newsBannerTitle: '最新: 11.2版本更新公告: 破坏之王',
      complexTopNews: '11.2版本更新公告: 破坏之王',
      complexNewsList: [
        { id: 1, type: '公告', title: '积分商城:正在上架中如需兑换联系客服', time: '' },
        { id: 2, type: '公告', title: '微信充值窗口正在维护中请优先选择支付宝', time: '' },
        { id: 3, type: '公告', title: '请在参赛前仔细阅读比赛规则后在进行参赛报名', time: '' },
        { id: 4, type: '公告', title: '持大创盈商城app正在上架中敬请期待', time: '' }
      ],
      announTopNews: '2021公告: 新春快乐',
      announNewsList: [
        { id: 1, type: '公告', title: '积分商城:正在上架中如需兑换联系客服', time: '' },
        { id: 2, type: '公告', title: '微信充值窗口正在维护中请优先选择支付宝', time: '' },
        { id: 3, type: '公告', title: '请在参赛前仔细阅读比赛规则后在进行参赛报名', time: '' },
        { id: 4, type: '公告', title: '持大创盈商城app正在上架中敬请期待', time: '' }
      ]
    }
  },
  methods: {
    toJoin() {
      this.$router.push({ path: '/join' })
    },
    toMall() {
      this.msgWarn('请联系客服进行兑换')
    },
    readeMore() {
      this.msgWarn('建设中')
    },
    toAct(index, name) {
      // this.msgWarn('建设中111')
      this.activityTitle = name;
      if(name === '合作助力'){
        this.openContract = true
      }else{
        switch (name) {
          case '杀一当百' :
            this.activityContent = "玩家若在对局中只杀一人获得全局比赛前三名，即可凭借有效对局截图联系客服申请100额外积分奖励（无次数限制）"
            break
          case '摧枯拉朽' :
            this.activityContent = "玩家若在任何对局中击杀超过15人，即可凭借有效对局截图向客服申请50额外积分奖励（无次数限制）"
            break
          case '万人无敌' :
            this.activityContent = "玩家若在个人对局中击杀超过20人，即可凭借有效对局截图向客服申请200额外积分奖励（无次数限制）"
            break
          case '借力回天' :
            this.activityContent = "玩家若在个人赛连续四局落地成盒（落地成盒是指在游戏开始的短时间内未淘汰敌人反之被对手淘汰的选手），未有有效击杀数，即可凭借有效截图向客服申请25额外积分鼓励（没有次数限制）"
            break
          case '众志成城' :
            this.activityContent = "若在团队对局中连续五次获得前三名，即可凭借有效截图向客服申请500积分奖励（没有次数限制）"
            break
          case '最佳损友' :
            this.activityContent = "若在团队对局中连续五次倒数前三名，可以凭借有效对局截图向客服申请50额外积分鼓励（没有次数限制）"
            break
          case '积分兑换' :
            this.activityContent = "联系客服添加我们积分兑换专员企业微信咨询，即可积分兑换现金！"
            break
          case '敬请期待' :
            this.activityContent = "更多活动正准备袭来，敬请期待"
            break
          case '' :
            this.activityContent = ""
            break
        }
        this.open = true;
      }
    },
    toNews() {
      this.msgWarn('建设中')
    },
    toContact() {
      const chatInfo = sessionStorage.getItem('chatInfo')
      if(!chatInfo){
        this.msgWarn('请先登录系统')
        this.$router.push({path:'/login'})
        return
      }
      // window.open('/chatroom/', '_blank')
      this.$router.push("/ws/chat").catch(e => {})
    },
    toMsg() {
      this.msgWarn('建设中')
    },
    moreNews() {
      this.msgWarn('建设中')
    }

  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0px;
  background-color: #fff;
  position: relative;
  .index-box {
    background: url(../assets/images/index-bg.png) no-repeat;
    background-size: 100% 100%;
  }
}

img {
  image-rendering: -moz-crisp-edges; /* Firefox */
  image-rendering: -o-crisp-edges; /* Opera */
  image-rendering: -webkit-optimize-contrast; /*Webkit (non-standard naming) */
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
}

.fast-entry {
  text-align: center;

  .entry-title {
    text-align: center;
    padding: 40px 0;

    img {
      width: 65%;
      display: inline-block;
    }
  }

  .entry-btns {
    position: relative;

    .btns {
      display: inline-block;
      text-align: center;
      margin: 0 10px;
      width: 320px;

      .join-bg {
        background: url(../assets/images/join-bg.png) center center no-repeat;
        background-size: 80%;
        height: 200px;
        padding-top: 70px;
        padding-left: 30px;
      }

      .mall-bg {
        background: url(../assets/images/mall-bg.png) center center no-repeat;
        background-size: 80%;
        height: 200px;
        padding-top: 70px;
        padding-left: 30px;
      }

      .contact-bg {
        background: url(../assets/images/contact-bg.png) center center no-repeat;
        background-size: 80%;
        height: 200px;
        padding-top: 70px;
        padding-left: 30px;
      }

      .btn {
        height: 54px;
        display: block;
        cursor: pointer;
      }
    }
  }
}

::v-deep .last-news {

  .news-title {
    text-align: center;
    padding: 40px 0;

    img {
      width: 65%;
      display: inline-block;
    }
  }

  .news-box {
    .el-tabs__item.is-top {
      color: #fff !important;
    }

    .el-tabs__item.is-top.is-active {
      color: #ff9308 !important;
    }

    .el-tabs__nav-wrap::after {
      display: none !important;
    }

    .el-tabs__active-bar.is-top {
      background-color: #ff9308 !important;
    }

    .news-img {
      position: relative;
      width: 50%;
      text-align: right;
      vertical-align: top;
      display: inline-block;
      cursor: pointer;

      img {
        width: 420px;
        height: 237px;
        display: inline-block;
      }

      .news-info {
        font-size: 15px;
        color: #fff;
        position: absolute;
        bottom: 4px;
        text-align: left;
        right: 0;
        padding: 0px 10px;
        height: 30px;
        width: 420px;
        line-height: 30px;
        background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
      }
    }

    .news-all {
      display: inline-block;
      width: 30%;
      background-color: #333333;
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      height: 237px;
      position: relative;

      .el-tabs__header {
        margin: 0 !important;
      }

      .el-tabs__nav.is-top {
        margin-left: 25px;
      }

      .news-box {
        .news-top {
          line-height: 42px;
          height: 42px;
          font-size: 16px;
          font-weight: 500;
          color: #ff9308;
          padding-left: 25px;
          background-color: #424242;
        }

        .news-items {
          padding: 0 25px;

          .news-item {
            border-bottom: 1px solid #424242;
            height: 36px;
            line-height: 36px;
            font-size: 14px;
            cursor: pointer;

            .news-type {
              color: #999999;
              padding-right: 5px;
            }

            .news-title {
              color: #fff;
            }

            .news-time {
              color: #999999;
              text-align: right;
              float: right;
            }

            &:last-child {
              border-bottom: none;
            }
          }
        }

      }

      .more-news {
        font-size: 14px;
        color: #999999;
        position: absolute;
        right: 6%;
        top: 10px;
        cursor: pointer;
      }
    }
  }

}

::v-deep .popular-activities {
  width: 100%;

  .activity-title-img {
    text-align: center;
    padding: 30px 0 0 10px;

    img {
      width: 65%;
      display: inline-block;
    }
  }

  .label {
    font-size: 16px;
    width: 74px;
    display: inline-block;
    text-align: center;
  }

  .activities {
    width: 60%;
    margin: 0 auto;

    .el-tabs__item.is-top {
      color: #fff !important;
    }

    .el-tabs__item.is-top.is-active {
      color: #ff9308 !important;
    }

    .el-tabs__nav-wrap::after {
      display: none !important;
    }

    .el-tabs__active-bar.is-top {
      background-color: #ff9308 !important;
    }

    .el-tabs__nav.is-top {
      margin-left: 25%;
    }

    .activity {
      width: 100%;
      margin-top: 10px;
      margin-left: 15px;
      .activity-item {
        width: 24%;
        display: inline-block;
        color: #000;
        height: 100px;
        font-size: 14px;
        margin-bottom: 80px;

        .activity-img {
          cursor: pointer;

          img {
            width: 180px;
            height: 102px;
          }
        }

        .activity-title {
          color: #fff;
          padding: 2px;
          text-align: left;
        }

        .activity-time {
          color: #ff9308;
          padding: 2px;
          text-align: left;
        }
      }
    }
  }

}
@media screen and (min-width: 1900px) {
  .last-news .news-box .news-img img {
    width: 65% !important;
    height: 300px !important;
  }
  .last-news .news-box .news-all{
    height: 300px !important;
  }
   .last-news .news-box .news-img .news-info{
     width: 65% !important;
  }
  .popular-activities .activities .activity .activity-item .activity-img img {
    width: 255px !important;
    height: 142px !important;
  }
  .popular-activities .activities .activity{
    margin-bottom: 5% !important;
  }
  ::v-deep .popular-activities .activities .el-tabs__nav.is-top {
    margin-left: 34% !important;
  }
}
</style>
