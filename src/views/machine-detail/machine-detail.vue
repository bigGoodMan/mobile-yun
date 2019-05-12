<!-- 机台详情 -->
<template>
  <div class="machine-detail bgcolor-f2">
    <!-- 基础信息 -->
    <div class="machine-detail-basics bgcolor-f">
      <h5 class="size-30 color-3 machine-detail-title">基础信息</h5>
      <van-cell-group>
        <van-cell
          title="门店"
          :value="machine.store_name"
        />
        <van-cell
          title="编号"
          :value="`${machine.area_name}-${machine.no}`"
        />
        <van-cell title="资产id">
          <template>
            <van-tag
              v-if="machine.is_online === '1'"
              color="#5fb878"
              :key="new Date() + 1"
            >在线</van-tag>
            <van-tag
              v-else
              color="#ff0000"
              :key="new Date() + 2"
            >离线</van-tag>
            <span class="machine-detail-id">{{machine.machine_id}}</span>
          </template>
        </van-cell>
        <van-cell
          title="机型"
          :value="machine.type_name"
        />
        <van-cell
          title="爪型"
          :value="machine.claw_type"
        />
        <van-cell
          title="游玩单价"
          :value="machine.coins_sell + '币'"
          is-link
          :to="{name: 'play_price', query: { id }}"
        />
      </van-cell-group>
    </div>
    <!-- 在售礼品 -->
    <div class="machine-detail-gift bgcolor-f" v-if="machine.gift_info.length > 0">
      <h5 class="size-30 color-3 machine-detail-title">在售礼品</h5>
      <template v-for="(items, index) in machine.gift_info">
        <div :key="index">
          <div class="border border-border-ebedf0"></div>
          <div class="flex-row flex-between-stretch machine-detail-gift-container">
            <div class="flex-row flex-between-stretch">
              <div class="size-0 machine-detail-gift-img flex-row flex-center">
                <img
                  class="machine-detail-gift-img-content"
                  :src="items.thumb"
                  @click="handleImgPreview(items)"
                />
              </div>
              <div class="flex-column flex-around-start machine-detail-gift-info" style="flex-wrap: wrap;">
                <span class="color-3 weight-bold size-30">{{items.gift_name}}</span>
                <span class="color-3 size-28">礼品编号：{{items.gift_id}}</span>
              </div>
            </div>
            <div class="flex-column flex-start-stretch">
              <span class="color-3 size-28">可抓取数：{{items.gift_num}}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
    <van-image-preview
  v-model="show"
  :images="images"
  @change="handleChange"
>
  <template v-slot:index>第{{ index }}页</template>
</van-image-preview>
    <!-- 参数设置 -->
    <div class="machine-detail-param bgcolor-f">
      <h5 class="size-30 color-3 machine-detail-title">参数设置</h5>
      <van-cell-group>
        <van-cell
          title="运营参数"
          is-link
          :to="{name: 'operational_parameters', query: { id }}"
        />
        <van-cell
          title="预警参数"
          is-link
          :to="{name: 'early_warning_parameters', query: { id }}"
        />
      </van-cell-group>
    </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'machine_detail',

  data () {
    return {
      id: '',
      index: 1,
      show: false,
      images: []
    }
  },
  computed: {
    ...mapState({
      machine: state => state.machine
    })
  },
  components: {
  },
  methods: {
    ...mapActions(['MACHINE_MACHINEDETAIL_ACTION']),
    handleChange (e) {
    },
    getMachineDetail () {
      const { id } = this.$route.query
      if (id) {
        this.id = id
        this.$toast.loading()
        this.MACHINE_MACHINEDETAIL_ACTION({ id }).then(res => {
          this.$toast.clear()
          if (res.return_code !== '0') {
            this.$Tip.warning(res.msg)
          }
        })
      }
    },
    // 预览
    handleImgPreview (items) {
      let giftArr = this.machine.gift_info.filter(v => v.gift_id !== items.gift_id)
      giftArr.unshift(items)
      this.images = giftArr.map(v => {
        return v.name
      })
      this.show = true
    }
  },
  created () {
    this.getMachineDetail()
  }
}
</script>
<style lang="stylus" scoped>
.machine-detail
  .machine-detail-title
    margin 0
    padding rems(20) rems(10)
  .machine-detail-id
    margin-left rems(10)
  .machine-detail-gift
    margin-top rems(20)
    .machine-detail-gift-container
      padding 10px 15px
      .machine-detail-gift-img
        width rems(150)
        height rems(150)
        .machine-detail-gift-img-content
          max-width 100%
          max-height 100%
      .machine-detail-gift-info
        padding-left rems(20)
  .machine-detail-param
    margin-top rems(20)
</style>
