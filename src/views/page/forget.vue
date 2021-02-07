<script src="../../api/login.js"></script>
<template>
  <div class="login">
    <el-form ref="forgetForm" :model="forgetForm" :rules="rules" class="login-form" label-width="80px">
      <h3 class="title">找回密码</h3>
      <el-form-item prop="oldPassword" label="旧密码">
        <el-input v-model="forgetForm.oldPassword" type="password" auto-complete="off" placeholder="旧密码">
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input v-model="forgetForm.password" type="password" auto-complete="off" placeholder="新密码">
        </el-input>
      </el-form-item>
      <el-form-item prop="checkPass" label="确认新密码">
        <el-input v-model="forgetForm.checkPass" type="password" auto-complete="off" placeholder="确认新密码">
        </el-input>
      </el-form-item>
      <el-form-item prop="code" label="验证码">
        <el-input v-model="forgetForm.code" type="text" auto-complete="off" placeholder="验证码" style="width: 18%"
        ></el-input>
        <el-button style=" margin-left: 10px;margin-top:5px;width: 100px" @click="getCode2"
                   :disabled="codeDisable2"
        >
          {{ codeLabel2 }}
        </el-button>
      </el-form-item>
      <el-form-item prop="code" label="验证码">
        <el-input v-model="registerForm.code" type="text" auto-complete="off" placeholder="验证码" style="width: 58%"
        ></el-input>
        <el-button style="float: right; margin-top: 0px;width: 100px" @click="getRegCode" :disabled="codeDisable">
          {{ codeLabel }}
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
      forgetForm: {
        password: '',
        oldPassword: '',
        checkPass: '',
        code: '',
        uuid:''
      },
      rules: {
        nickname: [
          { required: true, trigger: 'blur', message: '用户昵称不能为空' }
        ],
        username: [
          { required: true, trigger: 'blur', message: '用户名不能为空' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空' }
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
        nickname: '',
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
            console.log(res)
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

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 40px;
  background: #ffffff url(../../assets/images/background.svg) no-repeat 50%;
  background-size: 100%;
}

.title {
  margin: 0px auto 15px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  border: 1px solid #DCDFE6;

  .el-input {
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
  color: #b3b3b3;
}
</style>
