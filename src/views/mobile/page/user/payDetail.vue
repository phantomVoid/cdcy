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
      <el-table-column label="流水号" align="center" prop="id"/>
      <el-table-column label="时间" align="center" prop="logTime" width="150"/>
      <el-table-column label="支付类型" align="center" prop="orderType" :formatter="payTypeFormat"/>
      <el-table-column label="订单状态" align="center" prop="tranStatus" :formatter="tranStatusFormat"/>
      <el-table-column label="金额" align="center" prop="amount"/>
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
</style>

<script>
import { getPayDetail } from '@/api/user'

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
      payTypeOptions: [],
      tranStatusOptions: []
    }
  },
  created() {
    this.userInfo = this.$store.state.user.info

    this.getDicts('order_type').then(res => {
      this.tranStatusOptions = res.data
    })

    this.getDicts('pay_type').then(res => {
      this.payTypeOptions = res.data
    })

    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      this.getPayDetail()
    },
    payTypeFormat(row, column) {
      return this.selectDictLabel(this.payTypeOptions, row.orderType)
    },
    tranStatusFormat(row, column) {
      return this.selectDictLabel(this.tranStatusOptions, row.tranStatus)
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
    getPayDetail() {
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
      getPayDetail(params).then(res => {
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
