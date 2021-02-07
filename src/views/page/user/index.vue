<template>
  <div class="container">
    <div class="index-header">
      <span class="zh">个人中心</span>
      <span class="en">Personal Center</span>
    </div>
    <div class="index-box">
      <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left">
        <el-tab-pane label="我的积分" name="myBonus">
          <my-bonus @handleBtn="handleBtn"></my-bonus>
        </el-tab-pane>
        <el-tab-pane label="用户信息" name="info">
          <h2>用户信息</h2>
          <el-divider></el-divider>
          <!--          <info></info>-->
          <component v-bind:is="info"></component>
        </el-tab-pane>
        <el-tab-pane label="参赛记录" name="record">
          <h2>参赛记录</h2>
          <el-divider></el-divider>
          <!--          <record></record>-->
          <component v-bind:is="record"></component>
        </el-tab-pane>
        <el-tab-pane label="积分明细" name="bonusDetail">
          <h2>积分明细</h2>
          <el-divider></el-divider>
          <!--          <bonus-detail></bonus-detail>-->
          <component v-bind:is="bonusDetail"></component>
        </el-tab-pane>
        <el-tab-pane label="充值明细" name="payDetail">
          <h2>充值明细</h2>
          <el-divider></el-divider>
          <!--          <pay-detail></pay-detail>-->
          <component v-bind:is="payDetail"></component>
        </el-tab-pane>
        <el-tab-pane label="充值" name="pay">
          <h2>充值</h2>
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

  ::v-deep .el-tabs__item {
    color: #d8d8d8;
    font-size: 15px;
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
}
</style>
