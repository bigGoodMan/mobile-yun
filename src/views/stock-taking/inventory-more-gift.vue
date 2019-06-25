<!-- 更多礼品 -->
<template>
  <div class="more-gift bgcolor-f2">
    <div class="more-gift-main">
        <!-- 头部搜索 -->
        <div>
          <HeaderSearch
            v-model="value"
            placeholder="请输入礼品名称或编号"
            @trigger-search="handleSearch"
          />
        </div>
        <!-- 礼品内容 -->
        <div>
          <div class="color-393d49 size-28 more-gift-title">该门店库存为0的礼品</div>
          <div class="border"></div>
          <div>
            <div
              v-for="items in giftList"
              :key="items.gift_id"
            >
              <div
                class="flex-row flex-between-center size-28 color-393d49 more-gift-describe bgcolor-f"
                @click="handleCheck(items)"
              >
                <van-checkbox
                  :name="items.gift_id"
                  v-model="items.checked"
                ></van-checkbox>
                <div class="flex-1 flex-row flex-start">
                  <div class="more-gift-describe-img bgcolor-f2 flex-row flex-center">
                    <img
                      class="more-gift-describe-img-content"
                      v-lazy="items.thumb"
                    >
                  </div>
                  <div class="flex-column flex-start">
                    <span class="color-393d49 size-32 weight-bold padding-bottom-20">{{items.name}}</span>
                    <span class="size-28 color-454545">编号{{items.gift_id}}</span>
                  </div>
                </div>
              </div>
              <div class="border"></div>
            </div>
          </div>
        </div>
        <!-- 添加礼品按钮 -->
    </div>
        <div class="more-gift-btn">
          <div class="more-gift-btn-container fixed-max-width bottom-0">
            <HhfButton
              type="info"
              size="large"
              @trigger-click="handleAdd"
            >添加到列表</HhfButton>
          </div>
        </div>
  </div>
</template>

<script>
import HeaderSearch from '@yun/header-search'
import HhfButton from '@hhf/hhf-button'
import { inventoryGiftApi } from '@/api'
export default {
  name: 'more_gift',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      initGiftList: [],
      giftList: [],
      arr: [{ id: 1 }, { id: 2 }]
    }
  },

  components: {
    HeaderSearch,
    HhfButton
  },

  computed: {},

  methods: {
    handleSearch () {

    },
    handleCheck (items) {
      items.checked = !items.checked
    },
    getInventoryGift () {
      this.$toast.loading({
        message: '加载中...',
        duration: 0
      })
      const {
        sid,
        id
      } = this.$route.query
      inventoryGiftApi({
        type: '1',
        store_id: sid,
        inventory_id: id
      }).then(res => {
        this.$toast.clear()
        if (res.return_code === '0') {
          this.initGiftList = res.data.list.map(v => ({ ...v, checked: false }))
          this.giftList = this.initGiftList
        } else if (res.msg) {
          this.$Tip.warning({
            mask: true,
            message: res.msg
          })
        }
      })
    },
    handleAdd () {
    }
  },
  created () {
    this.getInventoryGift()
  },
  mounted () {}
}
</script>
<style lang="stylus" scoped>
.more-gift
  .more-gift-main
    position relative
    z-index 5
    .more-gift-title
      padding rems(20)
    .more-gift-describe
      padding rems(20)
      .more-gift-describe-img
        width rems(150)
        height rems(150)
        margin 0 rems(20) 0 rems(50)
        .more-gift-describe-img-content
          max-width 100%
          max-height 100%
.more-gift-btn
  height rems(100)
  .more-gift-btn-container
    z-index 6
</style>
