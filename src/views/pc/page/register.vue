<script src="../../../api/login.js"></script>
<template>
  <div class="login">
    <el-form ref="registerForm" :model="registerForm" :rules="loginRules" class="login-form" label-width="80px">
      <h3 class="title">账号注册</h3>
<!--      <el-form-item prop="nickname" label="用户昵称">
        <el-input v-model="registerForm.nickname" type="text" auto-complete="off" placeholder="用户昵称">
        </el-input>
      </el-form-item>-->
      <el-form-item prop="username" label="账号">
        <el-input v-model="registerForm.username" type="text" auto-complete="off" placeholder="账号">
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input
          v-model="registerForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="registerForm.checkPass" autocomplete="off" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item prop="idcard" label="身份证">
        <el-input v-model="registerForm.idcard" type="text" auto-complete="off" placeholder="身份证">
        </el-input>
      </el-form-item>
      <el-form-item prop="name" label="真实姓名">
        <el-input v-model="registerForm.name" type="text" auto-complete="off" placeholder="真实姓名">
        </el-input>
      </el-form-item>
      <el-form-item prop="gameId" label="游戏ID">
        <el-input v-model="registerForm.gameId" type="text" auto-complete="off" placeholder="游戏昵称">
        </el-input>
      </el-form-item>
      <el-form-item prop="phone" label="手机号码">
        <el-input v-model="registerForm.phone" type="text" auto-complete="off" placeholder="手机号码">
        </el-input>
      </el-form-item>
      <el-form-item prop="code" label="验证码">
        <el-input v-model="registerForm.code" type="text" auto-complete="off" placeholder="验证码" style="width: 62%"
        ></el-input>
        <el-button style="float: right; margin-top: 0px;width: 100px" @click="getRegCode" :disabled="codeDisable">
          {{codeLabel}}
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width: 40%"
          @click.native.prevent="handleRegister"
        >
          <span v-if="!loading">注 册</span>
          <span v-else>注 册 中...</span>
        </el-button>
        <el-button
          size="medium"
          type="primary"
          style="margin-left: 10px;width: 40%"
          @click.native.prevent="handleReset"
        ><span>重 置</span>
        </el-button>
        <div style="text-align:center;margin-top: 10px;margin-left:-40px;color: #fff">已有账号, <a href="/login" style="color: #ff9308">去登录</a></div>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { getRegCode, register } from '@/api/register'

export default {
  name: 'Login',
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      codeUrl: '',
      cookiePassword: '',
      registerForm: {
        // nickname: '',
        username: '',
        password: '',
        checkPass: '',
        idcard: '',
        name: '',
        gameId: '',
        phone: '',
        code: ''
      },
      loginRules: {
        nickname: [
          { required: true, trigger: 'blur', message: '用户昵称不能为空' }
        ],
        username: [
          { required: true, trigger: 'blur', message: '用户名不能为空' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空' },
          { min: 8, message: '密码长度不能少于8个字符', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, trigger: 'blur', message: '确认密码不能为空' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        idcard: [
          { required: true, trigger: 'blur', message: '身份证不能为空' }
        ],
        name: [
          { required: true, trigger: 'blur', message: '真实姓名不能为空' }
        ],
        gameId: [
          { required: true, trigger: 'blur', message: '游戏ID不能为空' }
        ],
        phone: [
          { required: true, trigger: 'blur', message: '手机号码不能为空' },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, trigger: 'blur', message: '验证码不能为空' }
        ]

      },
      loading: false,
      codeDisable: false,
      codeLabel: '获取验证码',
      timer: null
    }
  },
  watch: {},
  created() {
  },
  methods: {
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          const form = this.registerForm
          delete form.checkPass
          register(form).then(() => {
            this.msgSuccess('注册成功')
            this.$router.push({ path: '/login' }).catch(() => {
            })
          }).catch(() => {
            this.$set(this.registerForm, 'checkPass', '')
            this.loading = false
          })
        }
      })
    },
    countdown() {
      if (this.codeDisable) {
        return
      }
      this.codeDisable = true
      let n = 60
      this.codeLabel = '剩余 ' + n + 's'
      const run = setInterval(() => {
        n = n - 1
        if (n < 0) {
          clearInterval(run)
        }
        this.codeLabel = '剩余 ' + n + 's'
        if (this.codeLabel < '剩余 ' + 0 + 's') {
          this.codeDisable = false
          this.codeLabel = '重新获取'
        }
      }, 1000)
    },
    handleReset() {
      this.registerForm = {
        // nickname: '',
        username: '',
        password: '',
        checkPass: '',
        idcard: '',
        name: '',
        gameId: '',
        phone: '',
        code: '',
        uuid: ''
      }
      this.resetForm('registerForm')
    },
    getRegCode() {
      this.$refs['registerForm'].validateField('phone', valid => {
        if (valid === '') {
          const param = {
            phone: this.registerForm.phone
          }
          getRegCode(param).then(res => {
            this.registerForm.uuid = res.msg
            this.countdown()
          }).catch(err => {
          })
        }

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
  background: #ffffff url(../../../assets/images/login-bg.jpg) no-repeat;
  background-size: 118% 100%;
}

.title {
  margin: 0px auto 15px auto;
  text-align: left;
  color: #ff9308;
}

.login-form {
  border-radius: 6px;
  background: rgba(45, 45, 44, 0.8);
  width: 460px;
  padding: 20px 40px 5px 40px;
  border: 1px solid rgba(45, 45, 44, 0.5);

  .el-input {
    height: 36px;

    input {
      height: 38px;
    }
  }
  .el-form-item {
    margin-bottom: 18px;
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
  color: #b3b3b3;
}
::v-deep .el-form-item__label{
  color: #fff !important;
}
::v-deep .el-form-item__error {
  color: #ff9308;
}
</style>
