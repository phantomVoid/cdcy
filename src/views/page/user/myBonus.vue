<template>
  <div class="box">
    <div style="width: 60px;margin: 0 auto;">
      <img src="@/assets/images/bonus.png" width="60px">
    </div>
    <div class="remain">
      <span class="label">积分余额</span>
      <span class="label remain-val">{{ userInfo.amount }}</span>
    </div>
    <div class="button">
      <el-button type="primary" @click="handleClick($event)" id="pay">积分充值</el-button>
    </div>
    <div class="button">
      <el-button type="primary" @click="handleClick($event)" id="payDetail">积分明细</el-button>
    </div>
  </div>
</template>

<script scoped>
export default {
  name: 'myBonus',
  props: {},
  components: {},
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    this.userInfo = this.$store.state.user.info
  },
  methods: {
    handleClick(event) {
      const id = event.currentTarget.id
      this.$emit('handleBtn', id)
    }
  },
  mounted() {
  },
  watch: {},
  computed: {}
}
</script>

<style lang="scss" scoped>
.label {
  display: block;
}

::v-deep .el-button {
  margin-left: 0px;
}

.box {
  width: 200px;
  margin: 0 auto;
  text-align: center;

  .button {
    margin-top: 20px;
  }

  .remain {
    margin-top: 10px;

    .remain-val {
      font-size: 18px;
      margin-top: 6px;
    }
  }
}

</style>
