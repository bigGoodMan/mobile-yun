<!-- 我的门店 -->
<template>
  <div class="my-store">
    <div class="my-store-container size-32 flex-row flex-start-center" @click="handleClick">
      <span class="my-store-name color-393D49">{{store.store_name}}</span>
      <van-icon class="color-de" :name="arrow" />
    </div>
    <div class="border"></div>
    <div>
       <BottomPopup :columns="columns" :default-index="defaultIndex" :show="show" @trigger-confirm="handleConfirm" @trigger-close="handleClose" />
    </div>
  </div>
</template>

<script>
import BottomPopup from '@yun/bottom-popup'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'my_store',
  props: {
    open: { // 是否打开
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      show: false,
      defaultIndex: 0,
      store: {
        store_name: '请选择门店'
      }
    }
  },
  components: {
    BottomPopup
  },

  computed: {
    ...mapState({
      storeList: state => state.common.storeList
    }),
    columns () {
      const storeList = this.storeList
      return storeList.map((v) => {
        const items = {
          text: v.store_name,
          ...v
        }
        return items
      })
    },
    arrow () {
      return this.show ? 'arrow-up' : 'arrow-down'
    }
  },

  methods: {
    ...mapActions(['COMMON_GETSTORE_ACTION']),
    // 打开
    handleClick () {
      this.show = true
    },
    handleConfirm ({ value, index }) {
      this.store = {
        ...value
      }
      this.$emit('trigger-click', { value, index })
    },
    // 关闭
    handleClose () {
      this.show = false
    },
    getStore () {
      this.COMMON_GETSTORE_ACTION().then(res => {
        if (res.return_code !== '0') {
          this.$toast.fail(res.msg)
        }
      })
    }
  },
  created () {
    this.getStore()
  },
  mounted () {}
}
</script>
<style lang="stylus" scoped>
.my-store
  .my-store-container
    padding rems(30) rems(20)
    height rems(106)
    box-sizing border-box
    .my-store-name
      padding-right rems(10)
</style>
