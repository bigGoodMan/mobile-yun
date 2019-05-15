<!-- 礼品列表可以多选 -->
<template>
  <div
    class="flex-row flex-between-stretch size-28 color-393d49 gift-list bgcolor-f"
    @click="handleClick(result)"
  >
    <div
      class="gift-list-check"
      v-if="checked !== void 0"
    >
      <van-checkbox
        :name="result.gift_id"
        v-model="checked"
      ></van-checkbox>
    </div>
    <div class="flex-1 flex-row flex-between-stretch">
      <div class="flex-row flex-start-stretch">
        <div class="gift-list-img bgcolor-f2 flex-row flex-center">
          <img
            class="gift-list-img-content"
            v-lazy="result.thumb"
            @click.stop="APP_IMAGEPREVIEW_MUTATE({ previewImage: [result.img], imagePreviewShow: true })"
          >
        </div>
        <div class="flex-column flex-center-start">
          <span class="color-393d49 size-30 weight-bold padding-bottom-20 max-width-400 text-ellipsis text-break text-justify">{{result.gift_name}}</span>
          <span class="size-28 color-454545">编号{{result.gift_id}}</span>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'gift_list',
  props: {
    result: {
      type: Object
    }
  },
  data () {
    return {
    }
  },

  components: {},

  computed: {
    checked: {
      get () {
        return this.result.checked
      },
      set (val) {
        this.$emit('trigger-click', {
          ...this.result,
          checked: val
        })
      }
    }
  },

  methods: {
    ...mapMutations(['APP_IMAGEPREVIEW_MUTATE']),
    handleClick (items) {
      this.$emit('trigger-click', {
        ...this.result,
        checked: !this.result.checked
      })
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.gift-list
  padding rems(20)
  .gift-list-check
    margin-right rems(50)
  .gift-list-img
    width rems(150)
    height rems(150)
    margin-right rems(20)
    .gift-list-img-content
      max-width 100%
      max-height 100%
</style>
