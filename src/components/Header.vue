<template>
  <div class="header">
    <div class="nav">
      <div class="logo">
        <img src="@/assets/images/logo.png">
      </div>
      <ul class="header-nav-wrapper">
        <li
          v-for="(item,index) in navList"
          :key="index"
          :class="index==navIndex?'active':''"
          @click="navClick(index,item.name)"
        >
          <router-link :to="item.path">
            {{ item.name }}
            <span v-if="item.children.length>0" class="glyphicon glyphicon-menu-down"></span>
            <i class="underline"></i>
          </router-link>
          <dl v-if="item.children.length>0">
            <dt v-for="(i,n) in item.children" :key="n">
              <router-link :to="i.path">{{ i.name }}</router-link>
            </dt>
          </dl>
        </li>
      </ul>
      <div class="other">
        <div class="login-btn">
          <img src="@/assets/images/login.png" v-if="!isLogin" @click="toLogin">
        </div>
        <div class="info">
          <el-dropdown v-if="isLogin">
          <span class="el-dropdown-link">
            {{ userInfo.name }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="toCenter">个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="banner">
      <el-carousel height="580px">
        <el-carousel-item v-for="(item,index) in imgList" :key="index">
          <img :src="item.url" class="banner-image" height="580px" width="100%">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data() {
    return {
      activeIndex: 1,
      navIndex: sessionStorage.getItem('navIndex') ? sessionStorage.getItem('navIndex') : 0,
      menuName: '首页',
      menuClass: 'glyphicon glyphicon-menu-down',
      navList: [
        {
          name: '首页',
          path: '/',
          children: []
        },
        {
          name: '积分商城',
          path: '/',
          children: []
        },
        {
          name: '报名中心',
          path: '/join',
          children: []
        },
        {
          name: '个人中心',
          path: '/user',
          children: []
        },
        {
          name: '合作助力',
          path: '/',
          children: []
        }
      ],
      isLogin: false,
      userInfo: {},
      imgList: [
        {id: 1, url: require('@/assets/images/banner1.png')},
        {id: 2, url: require('@/assets/images/banner.jpg')},
        {id: 3, url: require('@/assets/images/banner1.png')},
        {id: 4, url: require('@/assets/images/banner.jpg')}
      ]
    }
  },
  created() {
    this.userInfo = this.$store.state.user.info
    if (Object.keys(this.userInfo).length !== 0) {
      this.isLogin = true
    }
  },
  methods: {
    navClick(index, name) {
      if (name === '积分商城') {
        this.msgWarn('请联系客服进行兑换')
        return
      }
      if (name === '合作助力') {
        this.msgWarn('请联系客服参加助力')
        return
      }
      this.navIndex = index
      sessionStorage.setItem('navIndex', index)
      this.menuName = name
    },
    menuClick() {
      if (this.menuClass == 'glyphicon glyphicon-menu-down') {
        this.menuClass = 'glyphicon glyphicon-menu-up'
      } else {
        this.menuClass = 'glyphicon glyphicon-menu-down'
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    toCenter() {
      const path = this.$route.path
      if (path === '/user') {
        return
      }
      this.navClick(3, '个人中心')
      this.$router.replace({path: '/user'})
    },
    async logout() {
      this.$confirm('确定退出账号吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          this.navClick(0, '首页')
          location.href = '/index'
        })
      })
    },
    toLogin() {
      this.$router.push({path: '/login'})
    }
  }
}
</script>
<style scoped lang="scss">
img {
  image-rendering: -moz-crisp-edges; /* Firefox */
  image-rendering: -o-crisp-edges; /* Opera */
  image-rendering: -webkit-optimize-contrast; /*Webkit (non-standard naming) */
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
}

.header {
  position: relative;
}

.banner {
  height: 580px;
  background-color: #272a25;
}

.nav {
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 65px;
  background: inherit;
  background-color: rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  border: 0;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  position: absolute;
}

.nav-fixed .header-nav-wrapper {
  line-height: 60px;
}

.nav .header-nav-wrapper {
  line-height: 60px;
  margin: 0 auto;
  max-width: 600px;
}

.nav .header-nav-wrapper > li {
  float: left;
  margin: 0 25px;
  position: relative;
}

.nav .header-nav-wrapper > li > a {
  color: #fff;
  font-size: 16px;
  padding: 8px 0;
  position: relative;

}

.nav .header-nav-wrapper > li > a > i {
  display: block;
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 2px;
  opacity: 0;
  transition: all 0.6s ease;
  background-color: #ff9308;
}

.nav .header-nav-wrapper > li > a > span {
  font-size: 12px;
  transition: transform ease 0.5s;
}

.nav .header-nav-wrapper > li > a:hover {
  color: #ff9308;
  text-decoration: none;
}

.nav .header-nav-wrapper > li > a:hover .underline {
  opacity: 1;
  width: 100%;
  left: 0;
}

.nav .header-nav-wrapper > li > a:hover span {
  transform: rotate(180deg);
}

.nav .header-nav-wrapper > li.active > a {
  color: #ff9308;
  text-decoration: none;
  border-bottom: 2px solid #ff9308;
}

.nav .header-nav-wrapper > li > dl {
  display: none;
  position: absolute;
  width: 168px;
  top: 80%;
  left: 0;
  z-index: 999999;
  box-shadow: 0 0 3px 1px #ccc;
  background: #fff;
}

.nav .header-nav-wrapper > li > dl > dt {
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.nav .header-nav-wrapper > li > dl > dt > a:hover {
  text-decoration: none;
}

.nav .header-nav-wrapper > li:hover dl {
  display: block;
}

.nav .header-nav-wrapper > li > dl > dt:hover {
  cursor: pointer;
  background: #ccc;
}


.other {
  float: right;
  margin-right: 20%;

  .login-btn {
    display: inline-block;
    height: 65px;
    text-align: center;
    line-height: 65px;
    margin-top: 15px;

    img {
      height: 34px;
      cursor: pointer;
    }
  }

  .info {
    display: inline-block;
    vertical-align: top;
    margin-top: 18px;

    .el-dropdown-link {
      font-size: 16px;
      padding: 0 5px;

      .el-icon--right {
        padding-left: 5px;
      }
    }
  }
}

.banner {
  left: 0px;
  top: 0px;
}

.logo {
  float: left;
  margin-left: 10%;
  color: #fff;
  line-height: 60px;
  margin-top: 18px;

  img {
    height: 28px;
  }
}

.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}

.el-icon-arrow-down {
  font-size: 12px;
}

a {
  margin-right: 5px;
}

::v-deep .el-dropdown-menu__item:not(.is-disabled):hover, .el-dropdown-menu__item:focus {
  background-color: rgba(255, 147, 8, 0.1);
  color: #ff9308;
}

@media screen and (min-width: 1900px) {
  .banner-image {
    height: 860px !important;
  }
  .banner {
    height: 860px !important;
  }
  ::v-deep .el-carousel__container {
    height: 860px !important;
  }
}
</style>
