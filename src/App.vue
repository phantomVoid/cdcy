<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default  {
  name:  'App'
}
</script>
<style scope>
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background-color: #e2e2e2;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background-color: #979797;
  border-radius: 5px;
}
#nprogress .bar {
  background: #ff9308 !important;
}
</style>
