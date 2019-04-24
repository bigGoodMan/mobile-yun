<!-- 机台列表 -->
<template>
  <div class="machine-list">
    <dl class="machine-list-container" v-for="(items, index) in record" :key="index">
      <dt class="size-28 color-3 machine-list-place">{{items.area_name}}（{{items.intro}}）</dt>
      <dd class="machine-list-main bgcolor-f2">
        <ul class="machine-list-content">
          <li class="machine-list-panel bgcolor-f" v-for="its in items.items" :key="its.machine_id" @click="handleHref(its.machine_id, its.machine_type)">
            <div class="machine-list-img bgcolor-f2 flex-row flex-center">
              <div v-if="its.lack_type !== '0'" class="machine-list-tag color-ff5722 size-24"><van-tag color="#ff5722" size="large">{{its.MACHINE_STATUS}}</van-tag></div>
              <img class="machine-list-img-content" :src="its.img" alt="">
              <!-- <img class="machine-list-img-content" src="http://www.3d2000.com/wp-content/uploads/2016/05/294194-63df2252ee261b59.gif" alt=""> -->
            </div>
            <div class="machine-list-substance">
              <p><span class="weight-bold size-28 color-3">{{its.name}}-{{its.machine_id}}</span><span class="size-24 color-9 machine-list-panel-number">({{its.no}})</span></p>
              <p class="flex-row flex-between-center"><span class="size-24 color-9">{{its.MACHINE_TYPE}}</span><span class="size-28 color-ff0000 weight-bold">{{its.coins_sell}}</span></p>
            </div>
          </li>
        </ul>
      </dd>
    </dl>
  </div>
</template>

<script>
import { Tag } from 'vant'
import { MACHINE_STATUS, MACHINE_TYPE } from '@l/judge'
export default {
  name: '',
  props: {
    columns: {
      default: () => ([]),
      type: Array
    }
  },
  data () {
    return {
    }
  },

  components: {
    'van-tag': Tag
  },

  computed: {
    record () {
      return this.columns.map((v) => ({
        ...v,
        items: v.items.map(its => ({
          ...its,
          MACHINE_STATUS: MACHINE_STATUS[its.lack_type],
          MACHINE_TYPE: MACHINE_TYPE[its.machine_type],
          coins_sell: its.coins_sell ? its.coins_sell + '币' : ''
        }))
      }))
    }
  },
  methods: {
    handleHref (id, type) {
      if (type === '1') { // 礼品机可以去详情
        this.$router.push({
          name: 'machine_detail',
          query: { id }
        })
      }
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.machine-list
  .machine-list-container
    margin 0
    .machine-list-place
      padding rems(20)
    .machine-list-main
      margin 0
      padding rems(20) rems(20) 0 rems(20)
      .machine-list-content
        display flex
        flex-flow row wrap
        justify-content space-between
        .machine-list-panel
          padding rems(20)
          box-sizing border-box
          width rems(345)
          margin-bottom rems(20)
          .machine-list-img
            position relative
            width 100%
            height rems(345)
            font-size 0
            .machine-list-tag
              position absolute
              top 0
              right 0
              // padding rems(10) rems(20)
              // background-color rgba(0, 0, 0, 0.5)
            .machine-list-img-content
              max-width 100%
              max-height 100%
          .machine-list-panel-number
            padding-left rems(20)
</style>
