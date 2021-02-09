<template>
  <div>
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
      <el-table-column label="流水号" align="center" prop="id" min-width="120"/>
      <el-table-column label="时间" align="center" prop="logTime" width="150"/>
      <el-table-column label="类型" align="center" prop="changeType" :formatter="integralTypeFormat"/>
      <el-table-column label="积分" align="center" prop="changeNum"/>
      <el-table-column label="备注" align="center" prop="remark"/>
    </el-table>
    <pagination
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>

import { getUserBonusDetail } from '@/api/user'

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
      userInfo: {},
      integralTypeOptions: []
    }
  },
  created() {
    this.userInfo = this.$store.state.user.info
    this.getDicts('integral_type').then(res => {
      this.integralTypeOptions = res.data
    })
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      this.getUserBonusDetail()
    },
    integralTypeFormat(row, column) {
      return this.selectDictLabel(this.integralTypeOptions, row.changeType)
    },
    handleQuery() {
      this.getList()
    },
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    handleDetail() {

    },
    getUserBonusDetail() {
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
      getUserBonusDetail(params).then(res => {
        this.recordList = res.rows
        this.total = res.total
        this.loading = false
      }).catch(err => {
        this.loading = false
      })
    }
  }
}
</script>
