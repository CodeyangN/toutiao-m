<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isFreshLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import ArticleItem from "@/components/article-item";
export default {
  name: "ArticleList",
  components: { ArticleItem },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isFreshLoading: false,
      refreshSuccessText: "刷新成功",
    };
  },
  // created() {
  //   this.onLoad();
  // },
  methods: {
    async onLoad() {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1,
        });
        const { results } = data.data;
        this.list.push(...results);
        this.loading = false;
        if (results.length) {
          this.timestamp = data.data.pre_timestamp;
        } else {
          this.finished = true;
        }
        console.log(data);
      } catch (err) {
        this.error = true;
        this.loading = false;
      }
    },
    async onRefresh() {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
        });
        const { results } = data.data;
        this.list.shift(...results);
        this.isFreshLoading = false;
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`;
      } catch (err) {
        this.refreshSuccessText = "刷新失败";
        this.isFreshLoading = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>