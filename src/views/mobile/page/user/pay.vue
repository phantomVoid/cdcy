<template>
  <div class="box">
    <div class="bonus">当前积分：{{ bonus }}</div>
    <div>
      <span style="color: #fff;font-size: 15px">充值积分 </span>
      <el-input type="text" style="width: 35%;margin-right: 10px" v-model="amount" placeholder="请输入充值积分"></el-input>
      <br>
      <span style="display: inline-block;color: #999999;font-size: 15px;margin:10px 0px 10px 65px">可前往收支明细页面查看</span>
      <span class="payDetail" @click="handleClick($event)">充值记录</span>
    </div>
    <div class="pay-type">
      <span style="display: block;color: #fff;font-size: 15px;">请选择支付方式：</span>
      <el-radio v-model="payType" label="2" @change="changeLabel">
        <img src="@/assets/images/alipay.png" class="pay-img" ref="alipay">
      </el-radio>
      <el-radio v-model="payType" label="1" style="margin-top: 15px"  @change="changeLabel">
        <img src="@/assets/images/wxpay.png" class="pay-img" ref="wx">
      </el-radio>
    </div>
    <div style="width: 600px">
<pre class="notice">
温馨提示：
不支持信用卡方式充值。
如您有未结清账单，充值后优先抵扣未结清账单。
充值后请及时对支付订单进行结算，以免影响正常服务。在您消费后，阿里云将基于您的消费进行发票开具。
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
      payType: '',
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
    },
    changeLabel(val){
      if(val === '2'){
        this.$refs['alipay'].style = 'border:2px solid #ff9308'
        this.$refs['wx'].style = 'border:2px solid transparent;'
      }
      if(val === '1'){
        this.$refs['wx'].style = 'border:2px solid #ff9308'
        this.$refs['alipay'].style = 'border:2px solid transparent;'
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
img {
  image-rendering: -moz-crisp-edges; /* Firefox */
  image-rendering: -o-crisp-edges; /* Opera */
  image-rendering: -webkit-optimize-contrast; /*Webkit (non-standard naming) */
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
}
.notice {
  margin:0 0 20px 0;
  width: 600px;
  padding: 10px 0px;
  font-size: 12px;
  color: #999999;
}

.pay-type {
  margin-top: 10px;
  color: #fff;
  .pay-img{
    display: inline-block;
  }
}

::v-deep .el-radio__label {
  font-size: 18px;
}

.bonus {
  margin: 20px 0;
  color: #fff;
  font-size: 15px;
}

.payDetail {
  margin-left: 10px;
  color: #fd9208;
  cursor: pointer;
  font-size: 15px;
  display: inline-block;
}

.check {
  margin-bottom: 20px;
}

.box {
  padding-left: 10px;
  padding-bottom: 30px;
  background-color: #1a1a1a;
}

::v-deep .el-checkbox__label {
  color: #fff;
}

::v-deep .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #fd9208;
  border-color: #fd9208;
}

::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #fd9208;
}

::v-deep .el-checkbox.is-bordered.is-checked {
  border-color: #fd9208;
}

::v-deep .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #fd9208;
}


::v-deep .el-radio__inner{
}

::v-deep .el-radio__label{
  color: #fff;
}
::v-deep .el-radio__input.is-checked .el-radio__inner {
  border-color: #ff9308;
  background: #ff9308;
}

::v-deep .el-radio__input.is-checked + .el-radio__label {
  color: #ff9308;
}

::v-deep .el-radio__input{
  display: none;
}

</style>
