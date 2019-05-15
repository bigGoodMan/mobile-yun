<!-- 盘点中 -->
<template>
  <div class="inventorying">
    <!-- 头部搜索 -->
    <div>
      <HeaderSearch
        v-model="giftValue"
        placeholder="请输入礼品名称或编号"
        @trigger-input="handleSearchInput"
      />
    </div>
    <!-- 统计&添加礼品 -->
    <div class="flex-row flex-between-center bgcolor-f inventorying-header-data">
      <div class="flex-column flex-between-start">
        <span class="size-28 color-393d49 inventorying-store">{{inventoryingStoreName}}</span>
        <span class="size-24 color-393d49">共<i class="color-success">{{typeNum}}</i>款，实盘数<i class="color-success">{{inventoryNum}}</i></span>
      </div>
      <HhfButton
        type="info"
        size="small"
        radius="0.4rem"
        @trigger-click="handleShowPopup('giftShow', true)"
      >添加更多礼品</HhfButton>
    </div>
    <!-- 盘点中列表 -->
    <div class="inventorying-container">
      <template v-for="items in giftList">
        <InventoryingList
          :obj="items"
          :key="items.gift_id"
          @trigger-preview="handlePreview"
        />
      </template>
    </div>
    <div class="inventorying-btn">
      <ul class="inventorying-btn-container flex-row flex-center fixed-max-width bottom-0">
        <li style="width: 30%">
          <HhfButton
            type="default"
            :loading="closeLoading"
            @trigger-click="handleClose"
            size="large"
          >关闭</HhfButton>
        </li>
        <li style="width: 70%">
          <HhfButton
            type="info"
            size="large"
            :loading="submitLoading"
            @trigger-click="handleSubmit"
          >提交</HhfButton>
        </li>
      </ul>
    </div>
    <MoreGift :show="giftShow" @trigger-close="handleAddMore" />
    <van-image-preview
  v-model="show"
  :images="images"
>
</van-image-preview>
  </div>
</template>

<script>
import HhfButton from '@hhf/hhf-button'
import HeaderSearch from '@yun/header-search'
import InventoryingList from '@yun/stock-taking/inventorying-list'
import { submitInventoryApi, closeInventoryApi } from '@/api'
import { mapState, mapActions, mapMutations } from 'vuex'
import { positiveIntegerRegularTool } from '@l/tools'
import MoreGift from '@yun/stock-taking/more-gift'
export default {
  name: 'inventorying',

  data () {
    return {
      giftValue: '',
      filterShow: false,
      giftShow: false,
      giftList: [], // 当前展示数据
      submitLoading: false,
      closeLoading: false,

      images: [],
      show: false
    }
  },

  components: {
    HeaderSearch,
    HhfButton,
    InventoryingList,
    MoreGift
  },

  computed: {
    ...mapState({
      inventoryGiftList: state => state.inventory.inventoryGiftList,
      inventoryingStoreName: state => state.inventory.inventoryingStoreName
    }),
    // 总款数
    typeNum () {
      return this.inventoryGiftList.length
    },
    // 总盘数
    inventoryNum () {
      let num = 0
      this.inventoryGiftList.forEach(v => {
        num += positiveIntegerRegularTool(v.num) ? v.num - 0 : 0
      })
      return num
    }
  },
  watch: {
  },
  methods: {
    ...mapActions(['INVENTORY_GETINVENTORYGIFT_ACTION']),
    ...mapMutations(['INVENTORY_ADDINVENTORYMOREGIFT_MUTATE']),
    // 预览图片
    handlePreview (img) {
      this.images = [img]
      this.show = true
    },

    handleShowPopup (key, boo) {
      this[key] = boo
    },
    // 添加更多礼品
    handleAdd () {
      const {
        sid,
        id
      } = this.$route.query
      this.$router.push({ name: 'more_gift',
        query: {
          sid,
          id
        } })
    },
    // 获取盘点礼品列表
    getInventoryGift () {
      this.$toast.loading({
        message: '加载中...',
        duration: 0
      })
      const { sid, id } = this.$route.query
      this.INVENTORY_GETINVENTORYGIFT_ACTION({ sid, id }).then(res => {
        this.$toast.clear('clearAll')
        if (res.return_code === '0') {
          this.giftList = this.inventoryGiftList
        } else if (res.msg) {
          this.$Tip.warning({
            mask: true,
            message: res.msg
          })
        }
      })
    },
    handleClearTimer () {
      clearTimeout(this.timer)
      this.timer = null
    },
    // 搜索监听
    handleSearchInput (val) {
      this.handleClearTimer()
      this.timer = setTimeout(() => {
        if (val === '') {
          this.giftList = this.inventoryGiftList
        } else {
          this.giftList = this.inventoryGiftList.filter(v => v.gift_id === val || v.name.indexOf(val) > -1)
        }
      }, 300)
    },
    // 提交
    handleSubmit () {
      const $this = this
      $this.submitLoading = true
      const {
        sid,
        id
      } = $this.$route.query
      if ($this.inventoryGiftList.length === 0) {
        this.$Tip.warning({
          message: '盘点礼品为空，无法提交审核'
        })
        $this.submitLoading = false
        return
      }
      for (let items of $this.inventoryGiftList) {
        if (items.num === '') {
          this.$Tip.warning({
            message: '有实盘数未填'
          })
          $this.submitLoading = false
          return
        }
        if (items.num < items.conf_num - 0) {
          this.$Tip.warning({
            message: '有实盘数小于可抓取数'
          })
          $this.submitLoading = false
          return
        }
      }
      $this.$Confirm.warning({
        message: '是否确定提交，提交后不可修改',
        mask: true,
        cancel () {
          $this.submitLoading = false
        },
        confirm (keyName) {
          submitInventoryApi({
            store_id: sid,
            inventory_id: id
          }).then(res => {
            $this.$Confirm.close(keyName)
            $this.submitLoading = false
            if (res.return_code === '0') {
              $this.$Tip.success({
                message: '提交成功',
                mask: true,
                close () {
                  $this.$router.push({ name: 'stock_taking' })
                }
              })
            } else if (res.msg) {
              $this.$Tip.warning({
                message: res.msg,
                mask: true
              })
            }
          })
        }
      })
    },
    // 关闭盘点单
    handleClose () {
      const $this = this
      $this.closeLoading = true
      $this.$Confirm.warning({
        message: '是否关闭',
        mask: true,
        confirm (keName) {
          const {
            sid,
            id
          } = $this.$route.query
          closeInventoryApi({
            store_id: sid,
            inventory_id: id
          }).then(res => {
            $this.closeLoading = false
            $this.$Confirm.close(keName)
            if (res.return_code === '0') {
              $this.$Tip.success({
                message: '关闭成功',
                mask: true,
                close () {
                  $this.$router.push({ name: 'stock_taking' })
                }
              })
            } else if (res.msg) {
              $this.$Tip.warning({
                message: res.msg,
                mask: true
              })
            }
          })
        },
        cancel () {
          $this.closeLoading = false
        }
      })
    },
    // 添加更多礼品
    handleAddMore (list) {
      this.handleShowPopup('giftShow', false)
      if (list.length === 0) {
        return
      }
      this.INVENTORY_ADDINVENTORYMOREGIFT_MUTATE(list)
      this.giftList = list.concat(this.giftList)
    }
  },
  created () {
    this.getInventoryGift()
  },
  mounted () {},
  beforeDestroy () {
    this.handleClearTimer()
  }
}
</script>
<style lang="stylus">
.inventorying
  .van-search__content
    background-color #ffffff
  .inventorying-header-data
    padding rems(20)
    .inventorying-store
      margin-bottom rems(20)
  .inventorying-container
    margin-top rems(20)
  .inventorying-btn
    height rems(100)
</style>
