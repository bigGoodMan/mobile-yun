<!-- 头部搜索 -->
<template>
    <div class="flex-row flex-between-center bgcolor-f2 header-search">
      <form action="javascript:return true" class="flex-1">
      <van-search :placeholder="placeholder" class="header-search-content" background="#f2f2f2" @search="handleSearch" v-model="value" />
      </form>
      <div v-if="filter" class="header-search-filter color-2f4056">
        <van-icon name="filter-o" @click="handleClick" />
      </div>
    </div>
</template>

<script>
export default {
  name: 'header_search',
  model: {
    event: 'trigger-input'
  },
  props: {
    value: {
      default: ''
    },
    filter: {
      type: Boolean,
      default: false
    },
    status: {
      type: Boolean,
      default: false
    },
    placeholder: String
  },
  data () {
    return {
    }
  },
  watch: {
    value (currVal) {
      this.$emit('trigger-input', currVal)
    }
  },
  components: {},

  computed: {},

  methods: {
    handleSearch () {
      this.$emit('trigger-search', this.value)
    },
    handleClick () {
      this.$emit('trigger-click')
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.header-search
  .header-search-content
    .van-search__content
      background-color #ffffff
  .header-search-filter
    padding-right rems(20)
    font-size rems(50)
    line-height 0
</style>
