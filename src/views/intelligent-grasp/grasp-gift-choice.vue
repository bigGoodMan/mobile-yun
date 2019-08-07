<!-- 智能抓感--选择礼品 -->
<template>
  <div class="grasp-gift-choice">
    <div class="header">
      <HeaderSearch
        v-model="value"
        @trigger-click="handleFilterClick"
        @trigger-search="handleSearch"
        placeholder="请输入礼品编号或礼品名称"
        filter
      />
    </div>
    <div class="container">
      <div>
        <HhfDropdown />
        <GiftList :result="{checked: false, gift_name: '皮卡丘', gift_id: '88888'}">
          <div class="flex-row flex-end-center">
          <van-tag color="#ff9800">自采</van-tag>
          <van-tag color="#8bc34a" class="tag-content">待配置</van-tag>
          </div>
        </GiftList>
        <div class="border"></div>
      </div>
    </div>
  </div>
</template>

<script>
import GiftList from '@yun/gift-list'
import HhfDropdown from '@hhf/hhf-dropdown'
import HeaderSearch from '@yun/header-search'
export default {
  name: 'GraspGiftChoice',

  data () {
    return {
    }
  },

  components: {
    HeaderSearch,
    GiftList,
    HhfDropdown
  },

  computed: {},

  methods: {
    handleFilterClick () {

    },
    handleSearch () {

    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.grasp-gift-choice
  .tag-content
    margin-left rems(20)
</style>
