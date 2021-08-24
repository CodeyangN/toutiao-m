<template>
  <div class="layout-container">
    <router-view />
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item replace to="/">
        <i slot="icon" class="iconfont icon-zhuye"></i>
        首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/qa">
        <i slot="icon" class="iconfont icon-comments"></i>
        问答</van-tabbar-item
      >
      <van-tabbar-item replace to="/radio" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item replace to="/my">
        <i slot="icon" class="iconfont icon-wode"></i>
        {{ $store.state.user ? "我的" : "未登录" }}</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.layout-container {
  .layout-tabbar {
    i.iconfont {
      font-size: 40px;
      span.text {
        font-size: 20px;
      }
    }
  }
}
</style>