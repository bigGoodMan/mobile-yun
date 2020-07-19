<!-- 下拉菜单 -->
<template>
  <div ref="dropdown" class="hhf-dropdown">
    <!-- <div @click="show = !show" class="bgcolor-f">aaaaaaaa -->
    <slot></slot>
    <!-- </div> -->
    <div
      v-show="show"
      class="hhf-dropdown-mask"
      :style="{ height: maskHeight, top: maskTop }"
      @click="handleFade"
    ></div>
    <div ref="anim" style="position: relative;">
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @:enter-cancelled="enterCancelled"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
        @leave-cancelled="leaveCancelled"
      >
        <div v-if="show" class="hhf-dropdown-anim">
          <template v-if="$slots.dropdown">
            <slot name="dropdown"></slot>
          </template>
          <template v-else>
            <ul class="hhf-dropdown-list">
              <li v-for="(items, index) of columns" :key="index">
                <HhfTicketSelectionBox
                  :title="items.name"
                  :value="items.checked"
                  @trigger-change="
                    checked =>
                      handleChange({
                        checked,
                        name: items.name,
                        value: items.value,
                        index
                      })
                  "
                />
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
import { getParentsOffsetTop } from "@l/tools";
import HhfTicketSelectionBox from "../hhf-ticket-selection-box";
export default {
  name: "HhfDropdown",

  components: {
    HhfTicketSelectionBox
  },
  model: {
    prop: "show",
    event: "trigger-fade"
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    columns: Array
  },
  data() {
    return {
      maskHeight: null,
      maskTop: null
    };
  },

  computed: {},

  mounted() {
    const maskHeightTop = getParentsOffsetTop(this.$refs["anim"]);
    const top = getParentsOffsetTop(this.$refs["anim"], this.$refs["dropdown"]);
    this.maskTop = `${top}px`;
    this.maskHeight = `${document.documentElement.clientHeight -
      maskHeightTop}px`;
  },

  methods: {
    handleFade() {
      this.$emit("trigger-fade", false);
    },
    beforeEnter(el) {
      //  const node = this.$refs['anim']
      el.style.transition = "all 0.5s";
    },
    enter(el, done) {
      const offsetHeight = el.offsetHeight;
      el.style.height = "0px";
      setTimeout(() => {
        el.style.height = `${offsetHeight}px`;
      }, 1);
      setTimeout(() => {
        done();
      }, 500);
      // el.style.height = ''
    },
    afterEnter(el) {
      el.style.height = null;
      el.style.transition = null;
    },
    enterCancelled(el) {
      el.style.height = null;
      el.style.transition = null;
    },
    beforeLeave(el) {
      el.style.transition = "all 0.5s";
      el.style.height = `${el.offsetHeight}px`;
    },
    leave(el, done) {
      setTimeout(() => {
        el.style.height = "0px";
      }, 1);
      setTimeout(() => {
        done();
      }, 500);
      // el.style.height = ''
    },
    afterLeave(el) {
      el.style.height = null;
      el.style.transition = null;
    },
    leaveCancelled(el) {
      el.style.height = null;
      el.style.transition = null;
    },
    handleChange({ name, index, value, checked }) {
      this.$emit("trigger-change", { name, index, value, checked });
    }
  }
};
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
