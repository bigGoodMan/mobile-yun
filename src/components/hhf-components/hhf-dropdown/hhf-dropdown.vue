<!-- 下拉菜单 -->
<template>
  <div class="hhf-dropdown">
    <div @click="show = !show" class="bgcolor-f">aaaaaaaa
      <!-- <slot></slot> -->
    </div>
    <div class="hhf-dropdown-mask" v-show="show" :style="{height: maskHeight, top: maskTop}"></div>
    <div style="position: relative" ref="anim">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @:enter-cancelled="enterCancelled" @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave" @leave-cancelled="leaveCancelled">
      <div v-if="show" class="hhf-dropdown-anim">
        <template v-if="$slots.dropdown">
          <slot name="dropdown"></slot>
        </template>
        <template v-else>
          <ul class="hhf-dropdown-list">
            <li>
              <HhfTicketSelectionBox title="全部" v-model="checked" />
              <div class="border"></div>
            </li>
            <li>
              <HhfTicketSelectionBox title="全部" v-model="checked" />
              <div class="border"></div>
            </li>
            <li>
              <HhfTicketSelectionBox title="全部" v-model="checked" />
              <div class="border"></div>
            </li>
            <li>
              <HhfTicketSelectionBox title="全部" v-model="checked" />
              <div class="border"></div>
            </li>
            <li>
              <HhfTicketSelectionBox title="全部" v-model="checked" />
              <div class="border"></div>
            </li>
          </ul>
        </template>
      </div>
    </transition>
    </div>
  </div>
</template>

<script>
import { getParentsOffsetTop } from '@l/tools'
import HhfTicketSelectionBox from '../hhf-ticket-selection-box'
export default {
  name: 'HhfDropdown',
  props: {
  },
  data () {
    return {
      checked: false,
      show: false,
      maskHeight: null,
      maskTop: null
    }
  },

  components: {
    HhfTicketSelectionBox
  },

  computed: {
  },

  methods: {
    beforeEnter (el) {
    //  const node = this.$refs['anim']
      el.style.transition = 'all 0.5s'
    },
    enter (el, done) {
      const offsetHeight = el.offsetHeight
      el.style.height = '0px'
      setTimeout(() => {
        el.style.height = `${offsetHeight}px`
      }, 1)
      setTimeout(() => {
        done()
      }, 500)
      // el.style.height = ''
    },
    afterEnter (el, done) {
      el.style.height = null
      el.style.transition = null
    },
    enterCancelled (el) {
      el.style.height = null
      el.style.transition = null
    },
    beforeLeave (el) {
      el.style.transition = 'all 0.5s'
      el.style.height = `${el.offsetHeight}px`
    },
    leave (el, done) {
      setTimeout(() => {
        el.style.height = '0px'
      }, 1)
      setTimeout(() => {
        done()
      }, 500)
      // el.style.height = ''
    },
    afterLeave (el) {
      el.style.height = null
      el.style.transition = null
    },
    leaveCancelled (el) {
      el.style.height = null
      el.style.transition = null
    }

  },

  mounted () {
    const top = getParentsOffsetTop(this.$refs['anim'])
    this.maskTop = `${top}px`
    this.maskHeight = `${document.documentElement.clientHeight - top}px`
  }
}
</script>
<style lang="stylus">
.hhf-dropdown
  position relative
  z-index 99
  .hhf-dropdown-mask
    position absolute
    width 100vw
    height 100vh
    left 0
    top 0
    background-color rgba(0, 0, 0, .7)
  .hhf-dropdown-anim
    position absolute
    overflow hidden
    width 100%
    background-color #ffffff
    .hhf-dropdown-list
      margin 0
      padding 0
      list-style none
// .hhf-dropdown-anim-enter-active, .hhf-dropdown-anim-leave-active
//   transition all 0.2s
// .hhf-dropdown-anim-enter, .hhf-dropdown-anim-leave-to
//   opacity 0
//   transform translateY(-100%)
  // transform-origin left
// .hhf-dropdown-anim-leave-active
</style>
