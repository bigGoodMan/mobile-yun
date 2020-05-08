<!-- 充值套餐配置 -->
<template>
  <div class="recharge-package-configuration">
    <div class="title flex-row flex-left-center">
      <span class="size-30">请选择充值折扣</span>
    </div>
    <dl class="container bgcolor-f" v-for="value of list" :key="value.id">
      <dt class="size-30 price border flex-row flex-between-center">
        <span>{{value.money}}元</span>
        <van-checkbox :value="value.checked" label-position="left" :disabled="value.disabled" @click="handleRecommond(value)">推荐</van-checkbox>
      </dt>
      <dd class="content">
        <van-grid :gutter="10">
          <van-grid-item v-for="(items, index) of value.package" :key="index">
            <RechargePackageItem :checked="items.checked" :disabled="items.disabled" :text="items.coin" @trigger-click="handleChecked(value, items, index)">
              <template #left-top>
                <span :class="['size-24 weight-bold', items.checked ? 'color-f' : 'color-ff5722']">{{items.discount}}</span>
              </template>
            </RechargePackageItem>
          </van-grid-item>
        </van-grid>
      </dd>
    </dl>
    <div class="height-100">
      <div class="fixed-max-width bottom-0 zindex-2">
        <HhfButton type="info" size="large" @trigger-click="handleSave">保存配置</HhfButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import HhfButton from '@hhf/hhf-button'
import RechargePackageItem from './recharge-package-item'
export default {
  name: 'RechargePackageConfiguration',

  data () {
    return {
      checked: false,
      list: [],
      checkedData: {}
    }
  },
  inject: ['params'],
  components: {
    RechargePackageItem,
    HhfButton
  },

  computed: {
    ...mapState({
      rechargePackageList: state => state.setMeal.rechargePackageList
    })
  },
  watch: {
    rechargePackageList (currList) {
      this.getInit(currList)
    }
  },
  methods: {
    ...mapActions(['SET_MEAL_SAVERECHARGEPACKAGELIST_ACTION']),
    getInit (list) {
      this.checkedData = {}
      this.checkedList = []
      list.forEach((value, index) => {
        value.package.forEach((its, inx) => {
          if (its.checked) {
            this.checkedData[index] = inx
            this.checkedList.push({ id: value.id, rec: value.checked ? 1 : 0, pos: inx + 1 })
          }
        })
      })
      this.list = list.map((value, x) => {
        let disabledCount = 0
        let packages = value.package.map((its, y) => {
          let disabled = this.getDisabled(x, y) || !its.coin
          if (disabled) {
            ++disabledCount
          }
          return {
            ...its,
            disabled
          }
        })
        return {
          ...value,
          package: packages,
          checked: this.checkedData[x] !== void 0 && value.checked,
          disabled: this.checkedData[x] === void 0 || disabledCount === value.package
        }
      })
    },
    getDisabled (x, y) {
      if (this.checkedData[x] !== void 0) {
        return false
      } else if (Object.keys(this.checkedData).length < 6) {
        return false
      }
      return true
    },
    handleChecked (value, item, index) {
      if (item.disabled) {
        return
      }
      value.package.forEach((v, i) => {
        if (i === index) {
          v.checked = !v.checked
          return
        }
        v.checked = false
      })
      this.getInit(this.list)
    },
    handleRecommond (value) {
      if (value.disabled) {
        return
      }
      value.checked = !value.checked
    },
    handleSave () {
      this.$Loading('加载中……')
      const {
        params,
        params: {
          storeId
        },
        list
      } = this
      const checkedList = []
      list.forEach((value, index) => {
        value.package.forEach((its, inx) => {
          if (its.checked) {
            checkedList.push({ id: value.id, rec: value.checked ? 1 : 0, pos: inx + 1 })
          }
        })
      })
      if (checkedList.length === 0) {
        this.$Loading.clear()
        this.$Tip.warning('请选择套餐')
        return
      }
      this.SET_MEAL_SAVERECHARGEPACKAGELIST_ACTION({ list, storeId, data: checkedList }).then(res => {
        this.$Loading.clear()
        if (res.return_code === '0') {
          params.tab = 1
          this.$Tip.success(res.msg)
          return
        }
        this.$Tip.warning(res.msg)
      })
    }
  },
  created () {
    this.getInit(this.rechargePackageList)
  },
  mounted () {}
}
</script>
<style lang="stylus">
.recharge-package-configuration
  .title
    padding 15px 10px
  .container
    margin 0
    margin-bottom rems(30)
    padding-bottom rems(30)
    .price
      padding rems(20) 0
      margin 0 10px
    .content
      margin-left 0
      padding-top rems(30)
</style>
