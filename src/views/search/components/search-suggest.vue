<template>
  <div class="search-suggest">
    <van-cell icon="search" v-for="(text, index) in suggestions" :key="index" @click="$emit('search',text)"
      ><div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggest } from "@/api/search";
import { debounce } from "lodash";
export default {
  name: "SearchSuggest",
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestions: [],
    };
  },
  methods: {
    async loadSearchSuggest(q) {
      try {
        const { data } = await getSearchSuggest(q);
        this.suggestions = data.data.options;
      } catch (err) {
        this.$toast("获取数据失败，请稍后重试");
      }
    },
    //字符串高亮
    highlight(text) {
      const highlightStr = `<span style="color: red;">${this.searchText}</span>`;
      const reg = new RegExp(this.searchText, "gi");
      return text.replace(reg, highlightStr);
    },
  },
  watch: {
    searchText: {
      immediate: true,
      handler: debounce(function (value) {
        this.loadSearchSuggest(value);
      }, 200),
      // handler(value) {
      //   this.loadSearchSuggest(value);
      //   console.log(value);
      // },
    },
  },
};
</script>

<style lang="less" scoped>
</style>