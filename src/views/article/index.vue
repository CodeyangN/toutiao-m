<template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar
      fixed
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 文章信息区域 -->
    <div class="article-container">
      <!-- 文章标题 -->
      <h1 class="art-title">小程序</h1>

      <!-- 用户信息 -->
      <van-cell center title="张三" label="3天前">
        <template #icon>
          <!-- 头像 -->
          <img src="" alt="" class="avatar" />
        </template>
        <template #default>
          <div>
            <!-- 是否关注了作者 -->
            <van-button type="info" size="mini">已关注</van-button>
            <van-button icon="plus" type="info" size="mini" plain
              >关注</van-button
            >
          </div>
        </template>
      </van-cell>

      <!-- 分割线 -->
      <van-divider></van-divider>

      <!-- 文章内容 -->
      <div class="art-content">好好学习, 天天向上</div>

      <!-- 分割线 -->
      <van-divider>End</van-divider>

      <!-- 点赞 -->
      <div class="like-box">
        <van-button icon="good-job" type="danger" size="small"
          >已点赞</van-button
        >
        <van-button icon="good-job-o" type="danger" plain size="small"
          >点赞</van-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Article",
};
</script>


<style lang="less" scoped>
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
</style>