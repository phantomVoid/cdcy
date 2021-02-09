<template>
  <div class="dashboard-editor-container">
    积分商城
  </div>
</template>

<script>

export default {
  name: 'Index',
  components: {},
  data() {
    return {}
  },
  methods: {
    handleSetLineChartData(type) {

    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: #fff;
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
