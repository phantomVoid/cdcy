<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">账号登录</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号或手机号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 70%"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon"/>
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img"/>
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 18px 0px;">记住密码</el-checkbox>
      <a href="#" class="forget" @click="forget">忘记密码</a>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <div style="float: right;margin-top: 5px;color: #fff">还没有账号? <a href="/register" style="color: #ff9308">立即注册</a>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { decrypt, encrypt } from '@/utils/jsencrypt'
import { getCodeImg } from '@/api/login'

export default {
  name: 'Login',
  data() {
    return {
      codeUrl: '',
      cookiePassword: '',
      loginForm: {
        username: '',
        password: '',
        rememberMe: false
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '登录账号不能为空' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空' }
        ],
        code: [
          { required: true, trigger: 'change', message: '验证码不能为空' }
        ]
      },
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.getCode()
    this.getCookie()
  },
  methods: {
    getCookie() {
      const username = Cookies.get('username')
      const password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.loginForm.rememberMe) {
            Cookies.set('username', this.loginForm.username, { expires: 30 })
            Cookies.set('password', encrypt(this.loginForm.password), { expires: 30 })
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 })
          } else {
            Cookies.remove('username')
            Cookies.remove('password')
            Cookies.remove('rememberMe')
          }
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' }).catch(() => {
            })
          }).catch(() => {
            this.loading = false
            this.getCode()
          })
        }
      })
    },
    forget() {
      this.msgWarn('暂未开放')
    },
    getCode() {
      getCodeImg().then(res => {
        this.codeUrl = 'data:image/gif;base64,' + res.img
        this.loginForm.uuid = res.uuid
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: url(../../assets/images/login-bg.jpg) no-repeat;
  background-size: 118% 100%;
}

.title {
  margin: 0px auto 20px auto;
  text-align: left;
  color: #ff9308;
  font-weight: 500;
}

.login-form {
  border-radius: 6px;
  background: rgba(45, 45, 44, 0.8);
  width: 460px;
  padding: 20px 40px 5px 40px;
  border: 1px solid rgba(45, 45, 44, 0.5);

  ::v-deep .el-input {
    height: 38px;

    input {
      height: 38px;
    }

  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}

.login-img {
  width: 400px;
  margin-right: 20px;
}

.forget {
  display: inline-block;
  float: right;
  font-size: 14px;
  color: #fff;

  &:hover {
    color: #fff !important;
  }
}

::v-deep .el-checkbox__label {
  color: #fff;
}

::v-deep .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #ff9308;
  border-color: #ff9308;
}

::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #ff9308;
}

::v-deep .el-checkbox.is-bordered.is-checked {
  border-color: #ff9308;
}

::v-deep .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #ff9308;
}

.login-code {
  width: 27%;
  height: 38px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.login-code-img {
  height: 38px;
}

::v-deep .el-input__prefix {
  color: #343434;
}

::v-deep .el-form-item__error {
  color: #ff9308;
}

</style>
