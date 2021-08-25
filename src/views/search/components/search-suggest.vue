<template>
  <div class="search-suggest">
    <van-cell icon="search" v-for="(text, index) in suggestions" :key="index"
      ><div slot="title" v-html="text"></div>
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
      htmlStr: `<span style="color: red; font-weight: bold;">${val}</span>`,
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