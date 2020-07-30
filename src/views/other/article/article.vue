<!-- 文章 -->
<template>
  <div
    class="article"
    :style="columns.length === 0 ? { 'background-color': 'white' } : null"
  >
    <template v-if="columns.length > 0">
      <ul v-for="(items, index) of columns" :key="index" class="article-card">
        <li v-for="(el, inx) of items" :key="inx" class="article-list">
          <h5 class="article-title">{{ el.title }}</h5>
          <p class="article-content">{{ el.content }}</p>
        </li>
      </ul>
    </template>
    <van-skeleton v-else title :row="50" />
  </div>
</template>

<script>
// import definitions from "./definitions";
import { getDefinitions } from "@/api";
export default {
  name: "Article",

  data() {
    return {
      columns: []
    };
  },
  created() {
    const { name } = this.$route.query;
    if (name) {
      this.getDefinitions(name);
      // this.columns = definitions[name];
    }
  },
  methods: {
    getDefinitions(name) {
      getDefinitions({ name }).then(res => {
        if (res && res.return_code === "0") {
          this.columns = res.data;
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.article
  &-card
    padding 0 rems(5) 0 rems(10)
    background-color #ffffff
    margin-bottom rems(40)
  &-list
    padding-top rems(20)
    &:not(:last-child)
      border-bottom 1px dashed #dddddd
  &-title
    font-size rems(30)
    margin 0
  &-content
    margin 0
    padding rems(20) 0
    font-size rems(24)
</style>
