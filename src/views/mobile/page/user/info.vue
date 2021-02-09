<template>
  <div class="box">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本资料" name="first">
        <el-form ref="infoForm1" :model="infoForm1" :rules="infoRules" label-width="150" label-position="left" class="infoForm1">
          <el-form-item prop="name" label="姓名">
            <el-input v-model="infoForm1.name" type="text" auto-complete="off" placeholder="姓名">
            </el-input>
          </el-form-item>
          <el-form-item prop="gameId" label="游戏ID">
            <el-input v-model="infoForm1.gameId" type="text" auto-complete="off" placeholder="游戏ID">
            </el-input>
          </el-form-item>
          <el-form-item prop="phone" label="手机号">
            <el-input v-model="infoForm1.phone" type="text" auto-complete="off" placeholder="手机号">
            </el-input>
          </el-form-item>
          <el-form-item prop="code" label="验证码">
            <el-input v-model="infoForm1.code" type="text" auto-complete="off" placeholder="验证码" style="width: calc(50% - 110px)"
            ></el-input>
            <el-button style=" margin-left: 10px;margin-top:5px;width: 100px" @click="getSmsCode1"
                       :disabled="codeDisable1"
            >
              {{ codeLabel1 }}
            </el-button>
          </el-form-item>
          <el-button type="primary" class="submit-btn" @click="handleSubmit1">提交</el-button>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="second">
        <el-form ref="infoForm2" :model="infoForm2" :rules="infoRules" label-width="150" label-position="left">
          <el-form-item prop="oldPassword" label="旧密码">
            <el-input v-model="infoForm2.oldPassword" type="password" auto-complete="off" placeholder="旧密码">
            </el-input>
          </el-form-item>
          <el-form-item prop="password" label="新密码">
            <el-input v-model="infoForm2.password" type="password" auto-complete="off" placeholder="新密码">
            </el-input>
          </el-form-item>
          <el-form-item prop="checkPass" label="确认新密码">
            <el-input v-model="infoForm2.checkPass" type="password" auto-complete="off" placeholder="确认新密码">
            </el-input>
          </el-form-item>
          <el-form-item prop="code" label="验证码">
            <el-input v-model="infoForm2.code" type="text" auto-complete="off" placeholder="验证码" style="width: calc(50% - 110px)"
            ></el-input>
            <el-button style=" margin-left: 10px;margin-top:5px;width: 100px" @click="getSmsCode2"
                       :disabled="codeDisable2"
            >
              {{ codeLabel2 }}
            </el-button>
          </el-form-item>
          <el-button type="primary" class="submit-btn" @click="handleSubmit2">提交</el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script scoped>
import { userEdit } from '@/api/user'
import { getRegCode } from '@/api/register'

export default {
  name: 'info',
  props: {},
  components: {},
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (value === this.infoForm2.oldPassword) {
        callback(new Error('新密码不能与旧密码相同'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.infoForm2.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      activeName: 'first',
      infoForm1: {
        name: '',
        gameId: '',
        phone: '',
        code: '',
        uuid: ''
      },
      infoForm2: {
        password: '',
        oldPassword: '',
        checkPass: '',
        code: '',
        uuid:''
      },
      infoRules: {
        name: [
          { required: true, trigger: 'blur', message: '用户昵称不能为空' }
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
        password: [
          { required: true, trigger: 'blur', message: '新密码不能为空' },
          { min: 8, message: '密码长度不能少于8个字符', trigger: 'blur' },
          { validator: validatePass1, trigger: 'blur' }
        ],
        oldPassword: [
          { required: true, trigger: 'blur', message: '旧密码不能为空' }
        ],
        checkPass: [
          { required: true, trigger: 'blur', message: '确认密码不能为空' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        code: [
          { required: true, trigger: 'blur', message: '验证码不能为空' }
        ]
      },
      userInfo: {},
      codeDisable1: false,
      codeLabel1: '获取验证码',
      timer1: null,
      codeDisable2: false,
      codeLabel2: '获取验证码',
      timer2: null
    }
  },
  created() {
    this.userInfo = this.$store.state.user.info
    this.infoForm1.name = this.userInfo.name
    this.infoForm1.phone = this.userInfo.phone
    this.infoForm1.gameId = this.userInfo.gameId
  },
  methods: {
    countdown1() {
      if (this.codeDisable1) return
      this.codeDisable1 = true
      let n = 60
      this.codeLabel1 = '剩余 ' + n + 's'
      const run = setInterval(() => {
        n = n - 1
        if (n < 0) {
          clearInterval(run)
        }
        this.codeLabel1 = '剩余 ' + n + 's'
        if (this.codeLabel1 < '剩余 ' + 0 + 's') {
          this.codeDisable1 = false
          this.codeLabel1 = '重新获取'
        }
      }, 1000)
    },
    countdown2() {
      if (this.codeDisable2) return
      this.codeDisable2 = true
      let n = 60
      this.codeLabel2 = '剩余 ' + n + 's'
      const run = setInterval(() => {
        n = n - 1
        if (n < 0) {
          clearInterval(run)
        }
        this.codeLabel2 = '剩余 ' + n + 's'
        if (this.codeLabel2 < '剩余 ' + 0 + 's') {
          this.codeDisable2 = false
          this.codeLabel2 = '重新获取'
        }
      }, 1000)
    },
    handleClick() {
      this.infoForm2 = {
        password: '',
        oldPassword: '',
        checkPass: '',
        code: '',
        uuid: ''
      }
      this.resetForm('infoForm2')
    },
    userEdit(data) {
      data.id = this.userInfo.id
      userEdit(data).then(res => {
        this.msgSuccess('修改成功')
      }).catch(err => {
      })
    },
    handleSubmit1() {
      this.$refs['infoForm1'].validate(valid => {
        if (valid) {
          this.userEdit(this.infoForm1)
          this.updateInfo()
          this.infoForm1.code =''
        }
      })
    },
    handleSubmit2() {
      this.$refs['infoForm2'].validate(valid => {
        if (valid) {
          const form = this.infoForm2
          delete form.checkPass
          this.userEdit(form)
          this.updateInfo()
          this.infoForm2.code =''
        }
      })
    },
    getSmsCode1() {
      this.$refs['infoForm1'].validateField('phone', valid => {
        if (valid === '') {
          const param = {
            phone: this.infoForm1.phone
          }
          getRegCode(param).then(res => {
            this.infoForm1.uuid = res.msg
            this.countdown1()
          }).catch(err => {
          })
        }

      })

    },
    getSmsCode2() {
      const param = {
        phone: this.userInfo.phone
      }
      getRegCode(param).then(res => {
        this.infoForm2.uuid = res.msg
        this.countdown2()
      }).catch(err => {
      })

    },
    updateInfo(){
      const userId = this.userInfo.id
      this.$store.dispatch('GetInfo', { userId })
    }
  },
  mounted() {
  },
  watch: {},
  computed: {}
}
</script>

<style lang="scss" scoped>
.el-input {
  width: 50%;
}

::v-deep .el-tabs__nav-wrap::after {
  width: 44%;
}

.box {
  //margin-left: 10px;
  padding-left: 10px;
  padding-bottom: 30px;
  background-color: #1a1a1a;
  ::v-deep .el-tabs__item{
    height: 35px;
    line-height: 35px;
    font-size: 15px;
    padding: 0 20px;
  }

  ::v-deep .el-form-item__label{
    color: #fff;
    font-weight: 500;
  }
}

::v-deep .el-form-item__label {
  width: 100px;
}

::v-deep .infoForm1 .el-form-item__label {
  width: 80px;
}
::v-deep .el-form-item__error {
  margin-left: 100px;
  margin-top: 3px;
  color: #ff9308;
}

.submit-btn {
  margin-left: 100px;
  width: 50%;
}
.infoForm1 .submit-btn {
  margin-left: 80px;
}
::v-deep .el-tabs__item.is-top.is-active {
  color: #ff9308 !important;
}

::v-deep .el-tabs__nav-wrap::after {
  display: none !important;
}

::v-deep .el-tabs__active-bar.is-top {
  background-color: #ff9308 !important;
}

</style>
