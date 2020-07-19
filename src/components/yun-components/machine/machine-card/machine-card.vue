<!-- 机台卡片 -->
<template>
  <dl class="machine-card">
    <dt v-if="title" class="size-28 color-3 machine-card-place">{{ title }}</dt>
    <dd class="machine-card-main bgcolor-f2">
      <ul class="machine-card-content">
        <slot></slot>
      </ul>
    </dd>
  </dl>
</template>

<script>
export default {
  name: "MachineCard",

  components: {},
  props: {
    title: String
  },
  data() {
    return {};
  },

  computed: {},

  mounted() {},

  methods: {}
};
</script>
<style lang="stylus">
.machine-card
  margin 0
.machine-card-place
  padding rems(20)
.machine-card-main
  margin 0
  padding rems(20) rems(20) 0 rems(20)
.machine-card-content
  display flex
  flex-flow row wrap
  justify-content space-between
  & > li
    padding rems(20)
    box-sizing border-box
    width rems(345)
    margin-bottom rems(20)
    background-color #ffffff
</style>
