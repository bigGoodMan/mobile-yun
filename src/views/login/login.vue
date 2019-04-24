<!-- 登录 -->
<template>
  <div class="login">
    <div class="padding-20-30">
      <img
        class="max-width"
        :src="logo"
      />
    </div>
    <div class="padding-20-30">
      <div class="radius-10">
        <van-cell-group>
          <div class="radius-10">
            <van-field
              v-model="account"
              class="size-32"
              clearable
              label="登录账号"
              placeholder="请输入账号"
            />
          </div>
          <div class="radius-10">
            <van-field
              v-model="password"
              class="size-32"
              clearable
              type="password"
              label="登录密码"
              placeholder="请输入密码"
            />
          </div>
        </van-cell-group>
      </div>
    </div>
    <div class="padding-20-30">
      <van-button
        type="info"
        :loading="loading"
        @click="handleLogin"
        :disabled="disabled"
        size="large"
      >登录</van-button>
    </div>
  </div>
</template>

<script>
import { Field, CellGroup, Button } from 'vant'
import { logo } from '@l/img'
import { mapActions } from 'vuex'
import JSEncrypt from 'jsencrypt'
import config from '@/config'
export default {
  name: 'login',

  data () {
    return {
      logo: logo,
      loading: false,
      account: '',
      password: ''
    }
  },

  components: {
    'van-field': Field,
    'van-button': Button,
    'van-cell-group': CellGroup
  },

  computed: {
    disabled () {
      return this.account === '' || this.password === ''
    }
  },

  methods: {
    ...mapActions(['USER_LOGIN_ACTION']),
    handleLogin () {
      this.loading = true
      const account = this.account
      let password = this.password
      const pwdLen = password.length
      const encrypt = new JSEncrypt()
      encrypt.setPublicKey(config.publicKey)
      const encrypted = encrypt.encrypt(password)
      // const decrypt = new JSEncrypt()
      // decrypt.setPrivateKey(config.privateKey)
      // const uncrypted = decrypt.decrypt(encrypted)
      // console.log(uncrypted)
      this.USER_LOGIN_ACTION({ account, password: encrypted, pwdLen }).then(res => {
        this.loading = false
        if (res.return_code === '0') {
          const $this = this
          this.$toast({
            type: 'success',
            message: '登录成功！',
            mask: true,
            onClose () {
              $this.$router.push({
                name: 'my_machine'
              })
            }
          })
        } else {
          this.$toast.fail(res.msg)
        }
      })
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.login
  position fixed
  top 50%
  left 0
  right 0
  margin 0 auto
  transform translate(0, -50%)
  .login-title
    padding rems(20) 0
    font-size rems(50)
</style>
