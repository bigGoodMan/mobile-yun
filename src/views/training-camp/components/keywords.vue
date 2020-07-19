<!-- 关键字 -->
<template>
  <ul class="no-ul keywords">
    <li
      v-for="(item, index) of keywordsList"
      :key="index"
      class="keywords-list"
      @click="handleClick(item)"
    >
      <van-tag color="#969799" round size="large">{{ item }}</van-tag>
    </li>
  </ul>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TrainingCampKeywords",

  components: {},

  data() {
    return {};
  },

  computed: {
    ...mapState({
      keywordsList: state => state.trainingCamp.keywordsList
    })
  },
  created() {},
  mounted() {},

  methods: {
    handleClick(item) {
      this.$emit("trigger-click", item);
    }
  }
};
</script>
<style lang="stylus" scoped>
.keywords
  display flex
  flex-flow row wrap
  justify-content flex-start
  align-items center
  .keywords-list
    font-size 0
    padding 0 rems(20) rems(20) 0
</style>
