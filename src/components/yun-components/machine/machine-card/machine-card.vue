<!-- 机器卡 -->
<template>
  <div>
    <div class="machine-list-img bgcolor-f2 flex-row flex-center">
      <div class="machine-list-tag size-24">
        <van-tag
        v-if="$slots.default"
          :color="tagColor"
          size="large"
        >{{its.MACHINE_STATUS}}</van-tag>
      </div>
      <img
        class="machine-list-img-content"
        :src="its.img"
        alt=""
      >
      <!-- <img class="machine-list-img-content" src="http://www.3d2000.com/wp-content/uploads/2016/05/294194-63df2252ee261b59.gif" alt=""> -->
    </div>
    <div class="machine-list-substance">
      <p><span class="weight-bold size-28 color-3">{{its.name}}-{{its.no}}</span><span class="size-24 color-9 machine-list-panel-number">({{its.machine_id}})</span></p>
      <p class="flex-row flex-between-center"><span class="size-24 color-9">{{its.type_name}}</span><span class="size-28 color-ff0000 weight-bold">{{its.coins_sell}}</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MachineCard',

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
<style lang="stylus" scoped></style>
