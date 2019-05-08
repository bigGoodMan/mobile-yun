<!-- 筛选的列表 -->
<template>
  <dl class="filter-list">
    <dt class="filter-list-dt size-32 weight-bold color-393d49">{{title}}<span v-if="placeholder" class="color-9 size-24">{{placeholder}}</span></dt>
    <dd class="filter-list-dd"><slot></slot></dd>
  </dl>
</template>

<script>
export default {
  name: 'filter_list',
  props: {
    title: String,
    placeholder: String
  },
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  methods: {},

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.filter-list
  margin 0
  padding rems(20) rems(20) 0
  .filter-list-dt
    margin-bottom rems(20)
  .filter-list-dd
    margin-left rems(5)
</style>
