<!-- 智能抓感机器扫一扫 -->
<template>
  <div class="grasp-equipment-choice">
    <div class="header bgcolor-f">
      <MyStore
        @trigger-click="handleConfirm"
        :default-index="0"
      >
        <div class="flex-row flex-end-center flex-1">
          <van-icon
            @click="handleRouter"
            name="question-o"
            size="0.4rem"
          />
        </div>
      </MyStore>
    </div>
    <div class="container flex-column flex-start-stretch">
      <div class="bgcolor-f content">
        <h5 class="margin-0 padding-20-30 size-30">我的机台</h5>
        <div class="border"></div>
        <LinkageSelection
          right-icon
          title="请选择区域"
        />
        <div class="border"></div>
        <LinkageSelection
          right-icon
          title="请选择机台编号"
        />
        <div class="border"></div>
      </div>
      <div class="bgcolor-f content">
        <CellList
          right-icon
          placeholder="请选择礼品"
          @trigger-click="handleRouterGift"
        >
          <template v-slot:title>
            <h5 class="margin-0 size-30">我的礼品</h5>
          </template>
        </CellList>
        <div class="border"></div>
        <div>
          <van-cell
            title="礼品名称"
            value="xx寸正版皮卡丘"
          />
        </div>
        <div class="border"></div>
        <div>
          <van-cell
            title="礼品编号"
            value="952777"
          />
        </div>
      </div>
    </div>
    <div class="fixed-max-width bottom-0 size-0 zindex-2">
      <HhfButton
        size="large"
        type="info"
        :loading="loading"
        @trigger-click="handleSave"
        radius="0.05rem"
      >开始配置</HhfButton>
    </div>
  </div>
</template>

<script>
import CellList from '@yun/cell-list'
import LinkageSelection from '@yun/linkage-selection'
import MyStore from '@yun/my-store'
import HhfButton from '@hhf/hhf-button'
export default {
  name: 'GraspEquipmentChoice',

  data () {
    return {
      loading: false
    }
  },

  components: {
    MyStore,
    LinkageSelection,
    CellList,
    HhfButton
  },

  computed: {},

  methods: {
    handleRouter () {
      this.$router.push({
        name: 'Article'
      })
    },
    handleRouterGift () {
      this.$router.push({
        name: 'GraspGiftChoice'
      })
    },
    handleSave () {}
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.grasp-equipment-choice
  .header
    position absolute
    top 0
    left 0
    width 100%
    z-index 10
  .container
    padding-top rems(106)
    height 100vh
    box-sizing border-box
    .content
      margin-top rems(100)
</style>
