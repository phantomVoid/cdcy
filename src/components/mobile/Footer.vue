<template>
  <div class="footer">
    <div class="info">
        厦门持大创盈网络科技有限公司版权所有 <br>
      备案号：闽ICP备19023846号  闽公网安备 19023846号
    </div>
    <div class="logo">
      <img src="@/assets/images/footer-logo.png" alt="">
    </div>
    <div class="wechat">
      <img src="@/assets/images/wechat.png" alt="">
    </div>
  </div>
</template>
<script>
export default {
  name: 'Footer',
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
img{
  image-rendering: -moz-crisp-edges; /* Firefox */
  image-rendering: -o-crisp-edges; /* Opera */
  image-rendering: -webkit-optimize-contrast; /*Webkit (non-standard naming) */
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
}
.footer {
  width: 100%;
  height: 120px;
  color: #fff;
  background: #333333;
  overflow: hidden;
  font-size: 12px;
}

.info{
  display: inline-block;
  margin: 50px 20%;
}

.logo{
  display: inline-block;
  vertical-align: top;
  margin-top: 30px ;
  margin-left: 20px;
  img{
    height: 68px;
  }
}

.wechat{
  display: inline-block;
  vertical-align: top;
  margin-top: 30px ;
  margin-left: 30px;
  img{
    height: 68px;
  }
}

</style>

