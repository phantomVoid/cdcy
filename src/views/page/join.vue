<template>
  <div>
    <div class="container">
      <div class="join-header">
        <span class="zh">报名中心</span>
        <span class="en">Registration Center</span>
        <span class="rule" @click="clickRule">比赛规则</span>
      </div>
      <div class="join-box" v-if="userInfo.gameStatus === 0 ">
        <div class="select">
          <div class="item server">
            <div class="type-label">区服</div>
            <div>
              <el-radio v-model="server" label="2">微信</el-radio>
              <el-radio v-model="server" label="1">QQ</el-radio>
            </div>
          </div>
          <div class="item model">
            <div class="type-label">模式</div>
            <div>
              <el-radio v-model="model" label="1">1V1</el-radio>
              <el-radio v-model="model" label="2">4V4</el-radio>
            </div>
          </div>
          <div class="btn-box">
            <el-button type="primary" class="join-btn" @click="join">立即参赛</el-button>
          </div>
        </div>

      </div>
      <div class="join-box" v-else>
        <div class="btn-box">
          <div style="text-align: center;color: #ff9308;margin-top: 10px">{{ sysGameStatusFormat(userInfo.gameStatus) }}</div>
          <el-button type="primary" class="exit-btn" @click="exit" :disabled="disableExit">{{ exitLabel }}
          </el-button>
        </div>
      </div>
      <div class="remark">
        注: 报名前请查看上方比赛规则并打开个人历史战绩！
      </div>
      <div class="record">
        <el-table
          v-loading="loading"
          :data="recordList"
          row-key="id"
          border
        >
          <el-table-column label="序号" align="center" type="index" width="80"/>
          <el-table-column label="参赛记录" align="center">
            <template slot-scope="scope">
              <el-row :gutter="20">
                <el-col :span="12">房间号：{{ scope.row.roomNum }}</el-col>
                <el-col :span="12">游戏id：{{ userInfo.gameId }}</el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">游戏：和平精英</el-col>
                <el-col :span="12">开始时间：{{ scope.row.startTime }}</el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" prop="status" width="180">
            <template slot-scope="scope">
              <span :style="{color: getStatusColor(scope.row.status)}">{{ gameStatusFormat(scope.row) }}</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- <pagination
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />-->
      </div>
    </div>

    <el-dialog title="查看比赛规则" :visible.sync="open" width="680px" append-to-body>
    <div class="rule-text">
      和平精英<br>
      个人赛(1V1)：<br>
      1.报名后请在10分钟以内进入房间耐心等待比赛的开始。<br>
      2.参与比赛的过程中请打开个人历史战绩，便于CD平台在增加积分时进行核对。(注：请务必打开个人历史战绩，没有打开便视为无效比赛，无效比赛不退还积分和比赛过程中增加的积分)<br>
      3.参赛竞技过程中如有发现与人开黑(单人与单人组队)或者开外挂、科技等和平精英中单人模式禁止的行为，本次比赛所有增加积分清零，本场服务积分一并扣除。(遇到违规情况可截图或者录屏的方式向我们客服举报该玩家，审核通过将返还您的服务积分并有积分奖励)<br>
      4.本场比赛积分结算会在本场次比赛结算后自动结算。<br>
      组队赛(4V4):<br>
      1.报名后请在10分钟以内进入房间耐心等待比赛的开始。<br>
      2.参与比赛的过程中请打开个人历史战绩，便于CD平台在增加积分时进行核对。(注：请务必打开个人历史战绩，没有打开便视为无效比赛，无效比赛不退还积分和比赛过程中增加的积分)<br>
      3.参赛竞技过程中如有发现与人开黑(队伍与队伍组队)或者开外挂、科技等和平精英中团队4v4模式禁止的行为，本次比赛所有增加积分清零，本场服务积分一并扣除。(遇到违规情况可截图或者录屏的方式向我们客服举报该玩家，审核通过将返还您的服务积分并有积分奖励)<br>
      4.本场比赛积分结算会在本场次比赛结算后自动结算。<br>
      (4v4团队赛，仅需小队长报名之后进入房间邀请自己队友即可)<br>
      积分说明：<br>
      每场参赛固定扣除25积分<br>
      个人赛：击杀数对应积分，击杀1人得10积分，以此类推，无击杀则为0。<br>
      组队赛：击杀数对应名次，第一名得500积分（队员每人对应得125积分奖励），第二名得300（队员每人得75积分奖励），第三名得200（队员每人对应得50积分奖励）。<br>
    </div>
    </el-dialog>
  </div>
</template>

<script scoped>
import { getRecordList } from '@/api/user'
import { joinGame } from '@/api/game'

export default {
  name: 'join',
  props: {},
  components: {},
  data() {
    return {
      open: false,
      server: '',
      model: '',
      loading: false,
      total: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      recordList: [],
      userInfo: {},
      sysGameStatusOptions: [],
      gameStatusOptions: [],
      disableExit: false,
      exitLabel: '退出',
      timer: null
    }
  },
  beforeCreate() {
    const userInfo = this.$store.state.user.info
    const userId = userInfo.id
    this.$store.dispatch('GetInfo', { userId })
  },
  created() {
    this.userInfo = this.$store.state.user.info

    this.getDicts('sys_game_status').then(res => {
      this.sysGameStatusOptions = res.data
    })
    this.getDicts('game_type').then(res => {
      this.gameStatusOptions = res.data
    })
    this.getList()

  },
  mounted() {
    this.noticeMsg()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    getList() {
      this.loading = true
      this.getRecordList()
    },
    sysGameStatusFormat(val) {
      return this.selectDictLabel(this.sysGameStatusOptions, val)
    },
    gameStatusFormat(row, column) {
      return this.selectDictLabel(this.gameStatusOptions, row.status)
    },
    join() {
      const gameType = this.model
      const server = this.server
      if (gameType === '') {
        this.msgError('请选择模式')
        return
      }
      if (server === '') {
        this.msgError('请选择区服')
        return
      }
      const param = {
        id: this.userInfo.id,
        gameStatus: 1,
        gameType: gameType,
        server: server
      }
      const _this = this
      joinGame(param).then(res => {
        this.userInfo.gameStatus = 1
        this.countdown()
      })
    },
    exit() {
      const param = {
        id: this.userInfo.id,
        gameStatus: 0
      }
      joinGame(param).then(res => {
        this.userInfo.gameStatus = 0
      })
    },
    getRecordList() {
      const param = {
        userId: this.userInfo.id,
        startTime: '',
        endTime: ''
      }
      getRecordList(param).then(res => {
        const { rows } = res
        if (rows.length > 0) {
          rows.sort((a, b) => {
            return new Date(b.startTime) - new Date(a.startTime)
          })
          this.recordList = rows.slice(0, 15)
        }
        this.total = res.total
        this.loading = false
      }).catch(err => {
        this.loading = false
      })
    },
    noticeMsg() {
      const _this = this
      _this.timer = setInterval(function() {
        _this.getRecordList()
        const userId = _this.userInfo.id
        _this.$store.dispatch('GetInfo', { userId })
        _this.userInfo = _this.$store.state.user.info

        const recordList = _this.recordList
        const playList = []
        recordList.some(record => {
          if (record.status === 1) {
            playList.push(record)
          }
        })
        if (playList.length > 0) {
          const palyRecord = playList.slice(0, 1)[0]
          if (sessionStorage.getItem(palyRecord.id)) {
            return
          }
          const noticeMsg = '<div>您有一场比赛等待参加</div><div>房间号: ' + palyRecord.roomNum + '</div><div>密码: ' + palyRecord.password + '</div>'
          _this.$notify({
            title: '比赛通知',
            dangerouslyUseHTMLString: true,
            message: noticeMsg,
            duration: 0
          })
          sessionStorage.setItem(palyRecord.id, '比赛中')
        }
        console.log(playList)
      }, 10 * 1000)
    },
    countdown() {
      if (this.disableExit) {
        return
      }
      this.disableExit = true
      let n = 60
      this.exitLabel = '退出(' + n + 's)'
      const run = setInterval(() => {
        n = n - 1
        if (n < 0) {
          clearInterval(run)
        }
        this.exitLabel = '退出(' + n + 's)'
        if (this.exitLabel < '退出(' + 0 + 's)') {
          this.disableExit = false
          this.exitLabel = '退出'
        }
      }, 1000)
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
    clickRule(){
      this.open = true
    }
  },
  watch: {},
  computed: {}
}
</script>

<style lang="scss" scoped>
img {
  image-rendering: -moz-crisp-edges; /* Firefox */
  image-rendering: -o-crisp-edges; /* Opera */
  image-rendering: -webkit-optimize-contrast; /*Webkit (non-standard naming) */
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
}

.container {
  padding: 5px;
  background-color: #1a1a1a;
  position: relative;
}

.join-box {
  width: 100%;
}
.join-header {
  padding: 0 20%;
  margin-top: 20px;

  .zh {
    display: inline-block;
    color: #f9f9f9;
    font-size: 26px;
    font-weight: 800;
    margin-right: 15px;
  }

  .en {
    color: #666666;
    display: inline-block;
    font-weight: 600;
    font-size: 15px;
  }

  .rule{
    color: #fff;
    font-size: 15px;
    margin-left: 20px;
    cursor: pointer;
    text-decoration:underline;
  }
}

.select {
  margin: 10px 20%;
  background: url(../../assets/images/join-page-bg.png) center center no-repeat;
  background-size: 100% 100%;
  height: 215px;
  .item {
    display: inline-block;
    background-color: #333333;
    border: 1px solid #ff9308;
    border-radius: 5px;
    width: 40%;
    height: 100px;
    margin-top: 20px;
    margin-bottom: 10px;
    &:first-child{
      margin-left: 7%;
      margin-right: 3%;
    }
    &:last-child{
      margin-right: 7%;
      margin-left: 3%;
    }
    text-align: center;
    .type-label {
      text-align: center;
      width: 100%;
      height: 30px;
      background-color: #ff9308;
      margin-bottom: 25px;
      font-size: 18px;
      border: 0px;
    }
    ::v-deep .el-radio__label{
      color: #fff;
    }
    ::v-deep .el-radio__input.is-checked .el-radio__inner {
      border-color: #ff9308;
      background: #ff9308;
    }
  }

}



.btn-box {
  .join-btn {
    margin: 20px auto;
    display: block;
    width: 50%;
    font-size: 16px;
    height: 35px;
    font-weight: 600;
  }

  .exit-btn{
    margin: 20px auto;
    margin-bottom: 30px;
    display: block;
    width: 25%;
    color: #fff;
    font-size: 16px;
    height: 35px;
    font-weight: 600;
    background-color: #666666;
    border: none;
  }
}

.remark{
  padding: 0 20%;
  height: 40px;
  color: #fff;
  letter-spacing:2px;
}

.record {
  padding: 0 20%;
  margin-bottom: 5%;
}

.rule-text{
  letter-spacing:1px;
}


::v-deep .el-dialog__body {
   padding: 10px 25px 25px 25px;
 }
::v-deep .el-table th {
  background-color: #222222;
}

::v-deep .el-table tr {
  background-color: #1a1a1a;
}

::v-deep .el-table--border {
  border: 1px solid #333333;
  border-top: none;
  border-left: none;
  border-right: none !important;
}

::v-deep .el-table--border th {
  border-right: none;
  border-left: none;
}

::v-deep .el-table--border td {
  border-right: none;
  border-left: none;
}

::v-deep .el-table th.is-leaf {
  border-bottom: 1px solid #333333;
}

::v-deep .el-table--border th.gutter:last-of-type {
  width: 0px !important;
  display: inherit !important;
}

::v-deep .el-table td {
  border-bottom: 1px solid #333333;
}

::v-deep .el-table {
  color: #d1d1d1;
  background-color: #1a1a1a;
}

::v-deep .el-table thead {
  color: #d1d1d1;
  font-weight: 550;
}

::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #222222;
}

::v-deep .el-table--border::after {
  display: none;
}

::v-deep .el-table::before {
  height: 0px;
}


</style>
