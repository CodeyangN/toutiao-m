<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" />
    <!-- 搜索结果 -->
    <!-- 联想记忆 -->
    <search-suggest v-else-if="searchText" />
    <!-- 联想记忆 -->
    <!-- 历史记录 -->
    <search-history v-else />
    <!-- 历史记录 -->
  </div>
</template>

<script>
import SearchHistory from "@/views/search/components/search-history.vue";
import SearchSuggest from "@/views/search/components/search-suggest.vue";
import SearchResult from "@/views/search/components/search-result.vue";
export default {
  name: "SearchIndex",
  components: { SearchHistory, SearchSuggest, SearchResult },
  data() {
    return {
      searchText: "",
      isResultShow: false,
    };
  },
  methods: {
    onSearch(val) {
      console.log("请求成功", val);
      this.isResultShow = true;
    },
    onCancel() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>
