<template>
  <div class="container">
    <div class="index-box">
      <div class="last-news">
        <div class="news-box">
          <div class="news-all">
            <el-tabs v-model="newsTabName">
              <el-tab-pane label="参赛记录" name="complex">
                <span slot="label" style="font-size: 16px">参赛记录</span>
                <div class="news-box">
                  <div class="news-items">
                    <div class="news-item" v-for="(row ,index) in recordList" :key="index" >
                      <p>
                        <span class="news-type">{{ row.id }}</span>
<!--                        <span class="news-time">+ {{ row.amount }}</span>-->
                        <br/><span class="news-title">游戏ID: {{ userInfo.gameId }}</span>
                        <br/><span class="news-title">比赛时间: {{ row.startTime }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
            <div class="more-news" @click="backToUserCenter">返回</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { getRecordList } from '@/api/user'

export default {
  name: 'Record',
  components: {},
  data() {
    return {
      loading: false,
      total: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        time: null
      },
      recordList: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      newsTabName: "complex",
      userInfo: {},
      gameStatusOptions: [],
      gameTypeOptions: [],
      gameServerOptions: [],
      recordDetail: {}
    }
  },
  created() {
    this.userInfo = this.$store.state.user.info
    this.getDicts('game_type').then(res => {
      this.gameStatusOptions = res.data
    })
    this.getDicts('sys_game_type').then(res => {
      this.gameTypeOptions = res.data
    })
    this.getDicts('game_server').then(res => {
      this.gameServerOptions = res.data
    })
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      this.getRecordList()
    },
    gameStatusFormat(row, column) {
      return this.selectDictLabel(this.gameStatusOptions, row.status)
    },
    gameTypeFormat(row, column) {
      return this.selectDictLabel(this.gameTypeOptions, row.gameType)
    },
    gameServerFormat(row, column) {
      return this.selectDictLabel(this.gameServerOptions, row.server)
    },
    handleQuery() {
      this.getList()
    },
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    handleDetail(row) {
      console.log(row)
      this.recordDetail = row
      this.open = true
    },
    getRecordList() {
      let startTime = ''
      let endTime = ''
      try {
        startTime = this.queryParams.time[0]
        endTime = this.queryParams.time[1]
      } catch (err) {
      }
      const params = {
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        userId: this.userInfo.id,
        startTime: startTime,
        endTime: endTime,
        orderByColumn: 'log_time',
        isAsc: 'asc'
      }
      getRecordList(params).then(res => {
        console.log(res);
        this.recordList = res.rows
        this.total = res.total
        this.loading = false
      }).catch(err => {
        this.loading = false
      })

    },
    getStatusColor(val) {
      if (val === 0) {
        return '#0090ff'
      } else if (val === 1) {
        return '#00ee65'
      } else if (val === 2) {
        return '#ffe201'
      } else if (val === 3) {
        return '#ff4d4f'
      } else {
        return '#d1d1d1'
      }
    },
    backToUserCenter() {
      this.$router.push("/user").catch(e => {
      });
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
      background-color: #1a1a1a;
      background-size: 100% 100%;
    }
  }

  ::v-deep .last-news {
    height: auto;

    .news-title {
      text-align: center;
      padding: 0 0;
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


      .news-all {
        display: inline-block;
        width: 100%;
        background-color: #333333;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        height: 100%;
        padding-bottom: 20px;
        position: relative;
        margin-bottom: 0.5rem;

        .el-tabs__header {
          margin: 0 !important;
        }

        .el-tabs__nav.is-top {
          margin-left: 25px;
        }

        .news-box {
          .news-items {
            padding: 15px 25px;
            margin: 5px 0px;
            .news-item {
              border-bottom: 1px solid #424242;
              height: 80px;
              margin-top: 10px;
              padding-top: 0px;
              line-height: 20px;
              cursor: pointer;

              .news-type {
                color: #ffffff;
                padding-right: 5px;
                font-size: 14px;
              }

              .news-title {
                font-size: 12px;
                color: #999999;
              }

              .news-time {
                font-size: 12px;
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
          color: #ffffff;
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
</style>
