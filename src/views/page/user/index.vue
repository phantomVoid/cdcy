<template>
  <div class="container">
    <div class="index-header">
      <span class="zh">个人中心</span>
      <span class="en">Personal Center</span>
    </div>
    <div class="index-box">
      <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left">
        <el-tab-pane label="我的积分" name="myBonus">
          <div class="header-divider">我的积分</div>
          <el-divider></el-divider>
          <my-bonus @handleBtn="handleBtn"></my-bonus>
        </el-tab-pane>
        <el-tab-pane label="用户信息" name="info">
          <div class="header-divider">用户信息</div>
          <el-divider></el-divider>
          <!--          <info></info>-->
          <component v-bind:is="info"></component>
        </el-tab-pane>
        <el-tab-pane label="参赛记录" name="record">
          <div class="header-divider">参赛记录</div>
          <el-divider></el-divider>
          <!--          <record></record>-->
          <component v-bind:is="record"></component>
        </el-tab-pane>
        <el-tab-pane label="积分明细" name="bonusDetail">
          <div class="header-divider">积分明细</div>
          <el-divider></el-divider>
          <!--          <bonus-detail></bonus-detail>-->
          <component v-bind:is="bonusDetail"></component>
        </el-tab-pane>
        <el-tab-pane label="充值明细" name="payDetail">
          <div class="header-divider">充值明细</div>
          <el-divider></el-divider>
          <!--          <pay-detail></pay-detail>-->
          <component v-bind:is="payDetail"></component>
        </el-tab-pane>
        <el-tab-pane label="充值" name="pay">
          <div class="header-divider">充值</div>
          <el-divider></el-divider>
          <!--          <pay @handleBtn="handleBtn"></pay>-->
          <component v-bind:is="pay" @handleBtn="handleBtn"></component>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import myBonus from '@/views/page/user/myBonus'

const info = resolve => require(['@/views/page/user/info'], resolve)
const record = resolve => require(['@/views/page/user/record'], resolve)
const bonusDetail = resolve => require(['@/views/page/user/bonusDetail'], resolve)
const payDetail = resolve => require(['@/views/page/user/payDetail'], resolve)
const pay = resolve => require(['@/views/page/user/pay'], resolve)

export default {
  name: 'User',
  components: {
    myBonus
  },
  data() {
    return {
      activeName: 'myBonus',
      myBonus: null,
      info: null,
      record: null,
      bonusDetail: null,
      payDetail: null,
      pay: null
    }
  },
  create(){
  },
  mounted() {
    const tabName = sessionStorage.getItem('tabName')
    if(tabName){
      this.checkVue(tabName)
      this.activeName = tabName
    }
  },
  beforeDestroy() {
    sessionStorage.removeItem('tabName')
  },
  methods: {
    handleClick(tab, event) {
      this.checkVue(tab.name)
      sessionStorage.setItem('tabName',tab.name)
    },
    handleBtn(val) {
      this.checkVue(val)
      this.activeName = val
    },
    checkVue(name) {
      switch (name) {
        case 'info' :
          this.info = info
          break
        case 'record' :
          this.record = record
          break
        case 'bonusDetail' :
          this.bonusDetail = bonusDetail
          break
        case 'payDetail' :
          this.payDetail = payDetail
          break
        case 'pay' :
          this.pay = pay
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 5px;
  background-color: #1a1a1a;
  position: relative;
}

.card {
  margin-top: 5px;
  padding: 10px 100px;
}

.el-divider.el-divider--horizontal {
  margin: 10px 0;
}

::v-deep .el-tab-pane {
  margin-left: 10px;
}

::v-deep .el-tabs__item.is-left {
  font-size: 16px;
}
.index-header {
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



.index-box{
  padding: 0 18%;
  margin: 20px;

  .header-divider{
    color: #fff;
    font-size: 16px;
  }

  ::v-deep .el-tabs__item {
    color: #d8d8d8;
    font-size: 16px;
    padding: 0 40px;
    height: 60px;
    line-height: 60px;
  }
  ::v-deep .el-tabs__nav.is-left{
    background-color: #333333;
  }
  ::v-deep .el-tabs__active-bar.is-left{
    display: none;
  }

  ::v-deep .el-tabs__item.is-left.is-active{
    background-color: #444444;
  }

  ::v-deep .el-divider {
    background-color: #666666;
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

  ::v-deep .el-pagination__total {
    color: #fff;
  }
  ::v-deep.el-pagination__jump{
    color: #fff;
  }

  ::v-deep .el-loading-mask{
    background-color: rgba(34,34,34, 0.9);
  }

  ::v-deep .el-loading-spinner .path {
    stroke: #f88f08;
  }

  ::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #f88f08;
    color: #000;
  }
}

@media screen and (max-width: 1366px) {
  .index-box{
    padding: 0 12%;
  }
  .index-header {
    padding: 0 12%;
  }
}


</style>
