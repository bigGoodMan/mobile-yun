<!-- 头部搜索 -->
<template>
  <div class="flex-row flex-between-center bgcolor-f2 header-search">
    <form action="javascript:return true" class="flex-1">
      <van-search
        :value="value"
        :placeholder="placeholder"
        class="header-search-content"
        background="#f2f2f2"
        @input="handleInput"
        @search="handleSearch"
      />
    </form>
    <div v-if="filter" class="header-search-filter color-2f4056">
      <van-icon name="filter-o" @click="handleClick" />
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderSearch",
  components: {},
  model: {
    event: "trigger-input"
  },
  props: {
    value: {
      default: ""
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
  data() {
    return {};
  },

  mounted() {},

  methods: {
    handleSearch() {
      this.$emit("trigger-search", this.value);
    },
    handleInput(val) {
      this.$emit("trigger-input", val);
    },
    handleClick() {
      this.$emit("trigger-click");
    }
  }
};
</script>
<style lang="stylus">
.header-search
  .header-search-content
    .van-search__content
      background-color #ffffff
  .header-search-filter
    padding-right rems(20)
    font-size rems(50)
    line-height 0
</style>
