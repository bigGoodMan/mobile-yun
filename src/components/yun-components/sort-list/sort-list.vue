<!-- 排序列表 -->
<template>
  <ul class="sort-list flex-row flex-start-center bgcolor-f padding-20">
    <li v-for="items of sortData" class="flex-1 flex-row flex-center" :key="items.key" @click="handleClick(items)">
      <span :class="['text-nowrap size-28', items.sort ? 'active' : null]">{{items.name}}</span>
      <div class="padding-left-10 flex-column flex-center" v-if="items.sort !== void 0">
        <span :class="['triangle color-d', items.sort]"></span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'SortList',

  data () {
    return {
    }
  },
  props: {
    sortData: {
      type: Array,
      default: () => []
    }
  },
  components: {},

  computed: {},

  methods: {
    handleClick (items) {
      if (items.sort !== void 0) {
        this.$emit('trigger-click', items)
      }
    }
  },

  mounted () {}
}
</script>
<style lang="stylus">
.sort-list
  .active
    color $primary
  .triangle
    &.asc
      &::before
        border-bottom-color: $primary
    &.desc
      &::after
        border-top-color: $primary
</style>
