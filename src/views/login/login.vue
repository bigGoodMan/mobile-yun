<!-- 登录 -->
<template>
  <div class="bgcolor-f2">
    <div class="login">
      <div class="padding-20-30 flex-row flex-center">
        <div class="login-logo">
          <img
            class="max-width"
            :src="logo"
          />
        </div>
      </div>
      <div class="padding-20-30">
        <div class="radius-10">
          <van-cell-group>
            <div class="radius-10">
              <van-field
                v-model="account"
                class="size-32"
                type="tel"
                clearable
                label="手机"
                placeholder="请输入手机号"
              />
            </div>
            <div class="radius-10">
              <van-field
                v-model="password"
                class="size-32"
                clearable
                type="password"
                label="密码"
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
  </div>
</template>

<script>
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
  },

  computed: {
    disabled () {
      return this.account === '' || this.password === ''
    }
  },

  methods: {
    ...mapActions(['USER_LOGIN_ACTION']),
    handleLogin (e) {
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
          $this.$Tip({
            type: 'success',
            message: '登录成功！',
            duration: 1.5,
            mask: true,
            close () {
              if ($this.$route.query.url) {
                const url = $this.$route.query.url
                $this.$router.push({
                  ...JSON.parse(decodeURIComponent(decodeURIComponent(url)))
                })
              } else {
                $this.$router.push({
                  name: 'my_machine'
                })
              }
            }
          })
        } else {
          this.$Tip.warning({
            message: res.msg,
            mask: true
          })
        }
      })
    }
  },
  created () {
    let windowScroll
    const isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (isiOS) {
      document.body.addEventListener('focusout', () => { windowScroll = window.setTimeout(() => { window.scroll(0, 0) }, 100) })
      document.body.addEventListener('focusin', () => { // 软键盘弹出的事件处理
        if (windowScroll !== undefined) { window.clearTimeout(windowScroll) }
      })
    }
  },
  mounted () {
  },
  beforeDestroy () {
  }
}
</script>
<style lang="stylus" scoped>
.login
  position absolute
  top 50%
  left 0
  right 0
  margin 0 auto
  transform translate(0, -50%)
  .login-logo
    width rems(200)
  .login-title
    padding rems(20) 0
    font-size rems(50)
</style>
