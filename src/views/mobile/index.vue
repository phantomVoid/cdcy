<template>
  <div class="container">
    <div class="index-box">
      <div class="last-news">
        <div class="news-title">
          <img src="@/assets/mobile/images/news-title-3x.png">
        </div>

        <div class="news-box">
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
          <div class="news-item news-img">
            <img class="newsImg" @click="toNews">
            <div class="news-info">
              {{ newsBannerTitle }}
            </div>
          </div>
        </div>
      </div>
      <div class="fast-entry">
        <div class="entry-title">
          <img src="@/assets/mobile/images/entry-title-3x.png" alt="">
        </div>

        <div class="entry-btns">
          <div class="btns">
            <div class="join-bg" :width="autoWidth">
              <img src="@/assets/images/join.png" :height="autoHeight" :width="autoWidth" class="btn" @click="toJoin">
            </div>
          </div>
          <div class="btns">
            <div class="mall-bg">
              <img src="@/assets/images/mall.png" :height="autoHeight" :width="autoWidth" class="btn" @click="toMall">
            </div>
          </div>
          <div class="btns">
            <div class="contact-bg">
              <img src="@/assets/images/contact.png" :height="autoHeight" :width="autoWidth" class="btn"
                   @click="toContact">
            </div>
          </div>
        </div>
      </div>
      <div class="popular-activities">
        <div class="activity-title-img">
          <img src="@/assets/images/popular-activities-title.png" alt="">
        </div>
        <div class="activites">
          <el-tabs v-model="hotTabName">
            <el-tab-pane label="正在进行" name="going">
              <span slot="label" class="label">正在进行</span>
              <div class="activity">
                <div class="activity-item" v-for="(activity, index) in activityList1" :key="index">
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
            <el-tab-pane label="商城特惠" name="preference">
              <span slot="label" class="label">商城特惠</span>
              <div class="activity">
                <div class="activity-item" v-for="(activity, index) in activityList2" :key="index">
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
            <el-tab-pane label="长期活动" name="LongTerm">
              <span slot="label" class="label">长期活动</span>
              <div class="activity">
                <div class="activity-item" v-for="(activity, index) in activityList1" :key="index">
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
  </div>
</template>

<script>

export default {
  name: 'Index',
  components: {},
  data() {
    return {
      newsTabName: 'complex',
      hotTabName: 'going',
      activityList1: [
        {id: 1, url: require('@/assets/images/activity-1.png'), title: '2021新赛季 新征程', time: '6天后结束'},
        {id: 2, url: require('@/assets/images/activity-2.png'), title: '新春周边限定', time: '1天后结束'},
        {id: 3, url: require('@/assets/images/activity-3.png'), title: '光明&黑暗 骑士', time: '31天后结束'},
        {id: 4, url: require('@/assets/images/activity-4.png'), title: '光明&黑暗 骑士', time: '31天后结束'},
        {id: 5, url: require('@/assets/images/activity-4.png'), title: '光明&黑暗 骑士', time: '31天后结束'},
        {id: 6, url: require('@/assets/images/activity-3.png'), title: '光明&黑暗 骑士', time: '31天后结束'},
        {id: 7, url: require('@/assets/images/activity-2.png'), title: '光明&黑暗 骑士', time: '31天后结束'},
        {id: 8, url: require('@/assets/images/activity-1.png'), title: '光明&黑暗 骑士', time: '31天后结束'}
      ],
      activityList2: [
        {id: 1, url: require('@/assets/images/activity-3.png'), title: '光明&黑暗 骑士', time: '31天后结束'},
        {id: 2, url: require('@/assets/images/activity-2.png'), title: '2021新赛季 新征程', time: '6天后结束'},
        {id: 3, url: require('@/assets/images/activity-4.png'), title: '新春周边限定', time: '16天后结束'},
        {id: 5, url: require('@/assets/images/activity-4.png'), title: '新春周边限定', time: '15天后结束'},
        {id: 6, url: require('@/assets/images/activity-2.png'), title: '2021新赛季 限定', time: '12天后结束'},
        {id: 7, url: require('@/assets/images/activity-2.png'), title: '新春周边限定', time: '13天后结束'},
        {id: 8, url: require('@/assets/images/activity-4.png'), title: '光明&黑暗 限定', time: '11天后结束'}
      ],
      activityList3: [
        {id: 1, url: require('@/assets/images/activity-1.png'), title: '新春周边限定', time: '1天后结束'},
        {id: 2, url: require('@/assets/images/activity-2.png'), title: '光明&黑暗 骑士', time: '31天后结束'},
        {id: 3, url: require('@/assets/images/activity-4.png'), title: '2021新赛季 新征程', time: '6天后结束'},
        {id: 4, url: require('@/assets/images/activity-3.png'), title: '2021新赛季 新征程', time: '6天后结束'},
        {id: 5, url: require('@/assets/images/activity-2.png'), title: '2021新赛季 新征程', time: '6天后结束'}

      ],
      newsBannerTitle: '最新: 11.2版本更新公告: 破坏之王',
      complexTopNews: '11.2版本更新公告: 破坏之王',
      complexNewsList: [
        {id: 1, type: '公告', title: '命运之轮1123123', time: '1-30'},
        {id: 2, type: '新闻', title: '命运之轮1123123', time: '1-30'},
        {id: 3, type: '公告', title: '命运之轮1123123', time: '1-30'},
        {id: 4, type: '新闻', title: '命运之轮1123123', time: '1-30'}
      ],
      announTopNews: '2021公告: 新春快乐',
      announNewsList: [
        {id: 1, type: '公告', title: '新春快乐2333333333', time: '1-30'},
        {id: 2, type: '公告', title: '新春快乐2333333333', time: '1-30'},
        {id: 3, type: '公告', title: '新春快乐2333333333', time: '1-30'},
        {id: 4, type: '公告', title: '新春快乐2333333333', time: '1-30'}
      ]
    }
  },
  methods: {
    toJoin() {
      this.$router.push({path: '/join'})
    },
    toMall() {
      this.msgWarn('请联系客服进行兑换')
    },
    readeMore() {
      this.msgWarn('建设中')
    },
    toAct() {
      this.msgWarn('建设中')
    },
    toNews() {
      this.msgWarn('建设中')
    },
    toContact() {
      this.$router.push("/ws/chat").catch(e => {})
    },
    toMsg() {
      this.msgWarn('建设中')
    },
    moreNews() {
      this.msgWarn('建设中')
    }
  },
  computed: {
    autoWidth() {
      let _w = document.documentElement.clientWidth || document.body.clientWidth;
      console.log("_w: >>> " + _w);
      //576 * 120
      let ret = (_w / 780) / 3 * 576 + "px";
      console.log(ret);
      return ret;
    },
    autoHeight() {
      let _w = document.documentElement.clientWidth || document.body.clientWidth;
      console.log("_h: >>> " + _w);
      let ret = (_w / 780) / 3 * 120 + "px";
      console.log(ret);
      //576 * 120
      return ret;
    }
  },
}
</script>

<style lang="scss" scoped>

/* 手机屏幕的字体大小 */
@media screen and (max-width: 768px) {
  .container {
    padding: 0px;
    background-color: #fff;
    position: relative;
    //min-width: 1366px;
    width: 100%;
    height: auto;

    .index-box {
      background: url(../../assets/mobile/images/index-bg.png) no-repeat;
      background-size: 100% 100%;
    }
  }

  ::v-deep .last-news {
    height: 550px;

    .news-title {
      text-align: center;
      padding: 40px 0;

      img {
        width: 55%;
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
        width: 100%;
        text-align: right;
        vertical-align: top;
        display: inline-block;
        cursor: pointer;

        .newsImg {
          width: 100%;
          content: url("../../assets/mobile/images/news-img-2x.png");
          //height: 237px;
          display: inline-block;
        }

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
          margin-left: 10%;
          height: 30px;
          width: 100%;
          line-height: 30px;
          background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
        }
      }

      .news-all {
        display: inline-block;
        width: 100%;
        background-color: #333333;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        height: 237px;
        position: relative;
        margin-bottom: 0.5rem;

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
}

/* 笔记本电脑的字体大小 */
@media screen and (min-width: 768px) and (max-width: 1024px) {
  .container {
    padding: 0px;
    background-color: #fff;
    position: relative;
    min-width: 1366px;

    .index-box {
      background: url(../../assets/images/index-bg.png) no-repeat;
      background-size: 100% 100%;
    }
  }

  ::v-deep .last-news {
    height: 550px;

    .news-title {
      text-align: center;
      padding: 40px 0;

      img {
        width: 55%;
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
}

/* 台式电脑显示器屏幕字体大小 */
@media screen and (min-width: 1024px) {
  .container {
    padding: 0px;
    background-color: #fff;
    position: relative;
    min-width: 1366px;

    .index-box {
      background: url(../../assets/images/index-bg.png) no-repeat;
      background-size: 100% 100%;
    }
  }

  ::v-deep .last-news {
    height: 550px;

    .news-title {
      text-align: center;
      padding: 40px 0;

      img {
        width: 55%;
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
  height: auto;

  .entry-title {
    text-align: center;
    margin-top: 50px;
    padding: 20px 0;

    img {
      width: 55%;
      display: inline-block;
    }
  }

  .entry-btns {
    position: relative;

    .btns {
      display: inline-block;
      text-align: center;
      margin: 0 10px;

      .btn {
        height: auto;
        display: block;
        cursor: pointer;
      }
    }
  }
}

::v-deep .popular-activities {
  height: 650px;
  width: 100%;

  .activity-title-img {
    text-align: center;
    padding: 30px 0 0 10px;

    img {
      width: 55%;
      display: inline-block;
    }
  }

  .label {
    font-size: 12px;
    width: 74px;
    display: inline-block;
    text-align: center;
  }

  .activites {
    width: 80%;
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
      //margin-left: 25%;
      margin-left: 25%;
    }

    .activity {
      width: 100%;
      margin-top: 10px;
      text-align: center;
      margin-left: 15px;

      .activity-item {
        width: 45%;
        display: inline-block;
        color: #000;
        height: 100px;
        font-size: 12px;
        margin-bottom: 10px;

        .activity-img {
          cursor: pointer;

          img {
            //width: 180px;
            //height: 102px;
            width: 85%;
            height: auto;
          }
        }

        .activity-title {
          color: #fff;
          padding: 2px;
        }

        .activity-time {
          color: #ff9308;
          padding: 2px;
        }
      }
    }
  }

}

</style>
