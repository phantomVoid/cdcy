<script src="../../api/login.js"></script>
<template>
  <div class="login">
    <el-form ref="forgetForm" :model="forgetForm" :rules="loginRules" class="login-form" label-width="80px">
      <h3 class="title">找回密码</h3>
      <el-form-item prop="phone" label="手机号码">
        <el-input v-model="forgetForm.phone" type="text" auto-complete="off" placeholder="手机号码">
        </el-input>
      </el-form-item>
      <el-form-item prop="code" label="验证码">
        <el-input v-model="forgetForm.code" type="text" auto-complete="off" placeholder="验证码" style="width: 62%"
        ></el-input>
        <el-button style="float: right; margin-top: 0px;width: 100px" @click="getRegCode" :disabled="codeDisable">
          {{codeLabel}}
        </el-button>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input
          v-model="forgetForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="forgetForm.checkPass" autocomplete="off" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width: 40%;margin-left: 25%"
          @click.native.prevent="handleForget"
        >
          <span v-if="!loading">提 交</span>
          <span v-else>提 交 中...</span>
        </el-button>
        <div style="text-align:center;margin-top: 10px;margin-left:-40px;"> <a href="/login" style="color: #ff9308">返回登录</a></div>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { userEdit } from '@/api/user'
import { getRegCode } from '@/api/register'

export default {
  name: 'Login',
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.forgetForm.password) {
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
        checkPass: '',
        phone: '',
        code: '',
        uuid: ''
      },
      loginRules: {

        password: [
          { required: true, trigger: 'blur', message: '密码不能为空' },
          { min: 8, message: '密码长度不能少于8个字符', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, trigger: 'blur', message: '确认密码不能为空' },
          { validator: validatePass2, trigger: 'blur' }
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
      timer: null,
      agree: false,
      open: false
    }
  },
  watch: {},
  created() {
  },
  methods: {
    handleForget() {
      this.$refs['forgetForm'].validate(valid => {
        if (valid) {
          this.userEdit(this.forgetForm)
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
    getRegCode() {
      this.$refs['forgetForm'].validateField('phone', valid => {
        if (valid === '') {
          const param = {
            phone: this.forgetForm.phone
          }
          getRegCode(param).then(res => {
            this.forgetForm.uuid = res.msg
            this.countdown()
          }).catch(err => {
          })
        }

      })

    },
    userEdit(data) {
      userEdit(data).then(res => {
        this.msgSuccess('找回成功')
      }).catch(err => {
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
  background: #ffffff url(../../assets/images/login-bg.jpg) no-repeat;
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

::v-deep .el-checkbox__label {
  color: #fff;
  font-size: 12px;
}

::v-deep .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #fd9208;
  border-color: #fd9208;
}

::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #fff;
}

::v-deep .el-checkbox.is-bordered.is-checked {
  border-color: #fd9208;
}

::v-deep .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #fd9208;
}

.check{
  font-size: 12px;
  span{
    color: #fd9208;
    margin-left: 10px ;
    display: inline-block;
    text-decoration: underline;
  }
}
</style>
