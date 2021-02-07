<template>
  <div class="box">
    <div class="bonus">当前积分：{{ bonus }}</div>
    <div>
      <span>充值积分：</span>
      <el-input type="text" style="width: 80px;margin-right: 10px" v-model="amount"></el-input>
      <span>可前往收支明细页面查看</span>
      <span class="payDetail" @click="handleClick($event)">充值记录</span>
    </div>
    <div class="pay-type">
      <el-radio v-model="payType" label="alipay">支付宝</el-radio>
      <el-radio v-model="payType" label="wechat">微信</el-radio>
    </div>
    <div style="width: 600px">
    <pre class="notice">
    温馨提示：<br>
      不支持信用卡方式充值。<br>
      如您有未结清账单，充值后优先抵扣未结清账单。<br>
      充值后请及时对支付订单进行结算，以免影响正常服务。在您消费后，阿里云将基于<br>
    您的消费进行发票开具。
    </pre>
    </div>
    <div class="check">
      <el-checkbox v-model="agree">我已了解，充值规则</el-checkbox>
    </div>
    <el-button type="primary" @click="pay">充值</el-button>
  </div>
</template>

<script scoped>
import {pay} from '@/api/pay'

export default {
  name: 'pay',
  props: {},
  components: {},
  data() {
    return {
      payType: 'alipay',
      bonus: '',
      agree: false,
      amount: null
    }
  },
  created() {
    this.userInfo = this.$store.state.user.info
    this.bonus = this.userInfo.amount || '0'
  },
  methods: {
    handleClick(event) {
      const id = event.currentTarget.className
      this.$emit('handleBtn', id)
    },
    pay() {
      const amount = this.amount
      if (amount === null || amount === '') {
        this.msgError('请输入充值积分')
        return
      }
      var reg = /^[1-9]\d*$/
      if (!reg.test(amount)) {
        this.msgError('充值积分输入不正确')
        return
      }
      if (!this.agree) {
        this.msgError('请阅读并勾选充值规则')
        return
      }


    }
  },
  mounted() {
  },
  watch: {},
  computed: {}
}
</script>

<style lang="scss" scoped>
.notice {
  margin: 20px 0;
  background-color: rgba(236, 234, 234, 0.3);
  width: 600px;
  padding: 10px 0px;

}

.pay-type {
  margin-top: 20px;
}

::v-deep .el-radio__label {
  font-size: 18px;
}

.bonus {
  margin: 20px 0;
}

.payDetail {
  margin-left: 10px;
  color: #02a7f0;
  cursor: pointer;
  display: inline-block;
}

.check {
  margin-bottom: 20px;
}

.box {
  margin-left: 10px
}
</style>
