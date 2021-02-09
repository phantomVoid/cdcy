<template>
  <div class="box">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="时间" prop="time">
        <el-date-picker
          v-model="queryParams.time"
          type="datetimerange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="loading"
      :data="recordList"
      row-key="id"
      border
    >
      <el-table-column label="序号" align="center" type="index" width="50"/>
      <el-table-column label="比赛编号" align="center" prop="id" width="120"/>
      <el-table-column label="时间" align="center" prop="startTime" width="150"/>
      <el-table-column label="房间号" align="center" prop="roomNum"/>
      <el-table-column label="游戏ID" align="center" prop="gameId">
        <template slot-scope="scope">
          <span>{{ userInfo.gameId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="比赛状态" align="center" prop="status">
        <template slot-scope="scope">
          <span :style="{color: getStatusColor(scope.row.status)}">{{ gameStatusFormat(scope.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-document"
            @click="handleDetail(scope.row)"
          >查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <el-dialog title="查看比赛详情" :visible.sync="open" width="700px" center append-to-body>
      <el-row :gutter="20">
        <el-col :span="10">
          <div class="detail-item">
            比赛编号：{{ recordDetail.id }}
          </div>
        </el-col>
        <el-col :span="6">
          <div class="detail-item">
            比赛状态：<span :style="'color:'+getStatusColor(recordDetail.status)">{{ gameStatusFormat(recordDetail) }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="detail-item">
            时间：{{ recordDetail.startTime }}
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="10">
          <div class="detail-item">
            房间号：{{ recordDetail.roomNum }}
          </div>
        </el-col>
        <el-col :span="6">
          <div class="detail-item">
            房间密码：{{ recordDetail.password }}
          </div>
        </el-col>
        <el-col :span="8">
          <div class="detail-item">
            游戏id：{{ userInfo.gameId }}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="detail-item">
            比赛结束时间：{{ recordDetail.endTime }}
          </div>
        </el-col>
      </el-row>

      <el-divider></el-divider>
      <el-row :gutter="20">
        <el-col :span="10">
          <div class="detail-item">
            <!--            比赛区服：{{ recordDetail.server ==='qq'?'QQ':'微信' }}-->
            比赛区服：{{ gameServerFormat(recordDetail) }}
          </div>
        </el-col>
        <el-col :span="8">
          <div class="detail-item">
            比赛模式：{{ gameTypeFormat(recordDetail) }}
          </div>
        </el-col>
      </el-row>
      <el-button type="primary" class="close-btn" @click="open=false">关 闭</el-button>
    </el-dialog>
  </div>
</template>

<script>

import { getRecordList } from '@/api/user'

export default {
  name: 'Record',
  components: {},
  data() {
    return {
      open: false,
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
        isAsc: 'desc'
      }
      getRecordList(params).then(res => {
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
    }
  }
}
</script>
<style lang="scss" scoped>

.box {
  padding-left: 10px;
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: #1a1a1a;
  ::v-deep .el-tabs__item{
    height: 35px;
    line-height: 35px;
    font-size: 15px;
    padding: 0 20px;
  }

  ::v-deep .el-form-item__label{
    color: #fff;
    font-weight: 500;
  }
}


::v-deep .el-dialog__body {
  padding: 5px 30px 20px 30px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}

.detail-item{
  margin: 10px 0;
}

::v-deep .el-dialog {
  background: none;
}
::v-deep .el-dialog__header {
  background-color: #444444;
  background: #444444;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  .el-dialog__title{
    color: #fff;
  }
}
::v-deep .el-dialog__body{
  background-color: #333333;
  background: #333333;
  color: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

::v-deep .el-divider {
  background-color: #666666;
}
.el-divider.el-divider--horizontal {
  margin: 10px 0;
}

.close-btn{
  width: 50%;
  height: 35px;
  display: inline-block;
  text-align: center;
  margin: 45px 25% 20px 25%;
  font-weight: 600;
}
</style>
