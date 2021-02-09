<template>
  <div class="box">
    <div style="width: 60px;margin: 0 auto;">
      <img src="@/assets/images/bonus.png" width="60px">
    </div>
    <div class="remain">
      <span class="label">我的积分: {{ userInfo.amount }}</span>
    </div>
    <div class="button">
      <el-button type="primary" @click="handleClick($event)" id="pay" style="width: 40%">立即充值</el-button>
    </div>
    <div class="link">
      <el-link @click="handleClick($event)" id="bonusDetail">积分明细</el-link>
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
      const id = event.currentTarget.id;
      // this.$emit('handleBtn', id);
      let pushUrl = "/user/" + id;
      this.$router.push(pushUrl).catch(e => {});
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
  width: 100%;
  background-color: #1a1a1a;
  text-align: center;
  padding-top: 30px;
  padding-bottom: 30px;
  .button {
    margin-top: 40px;
  }
  .link{
    margin-top: 20px;
    ::v-deep .el-link--inner{
      color: #f88f08;
    }
    ::v-deep .el-link.is-underline:hover:after {
      border-bottom: 1px solid #f88f08;
    }
  }

  .remain {
    margin-top: 10px;
    font-size: 16px;
    color: #fff;
  }
}

</style>
