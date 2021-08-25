<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        @click="isEdit = !isEdit"
        type="danger"
        plain
        round
        size="mini"
        class="edit-btn"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        :text="channel.name"
        @click="onMyChannelClick(channel, index)"
      >
        <van-icon
          v-show="isEdit && !fiexChannels.includes(channel.id)"
          slot="icon"
          name="clear"
        >
        </van-icon>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        icon="plus"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        @click="onAddchannel(channel)"
      />
    </van-grid>
    <!-- 频道推荐 -->
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user";
import { addUserChannel, deleteUserChannel } from "@/api/channel";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage";
export default {
  name: "ChannelEdit",
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState(["user"]),
    // 筛选频道的列表
    recommendChannels() {
      return this.allChannels.filter((channel) => {
        return !this.myChannels.find((myChannels) => {
          return myChannels.id === channel.id;
        });
      });
    },
    //   const channels = [];
    //   this.allChannels.forEach((channel) => {
    //     const res = this.myChannels.find((myChannels) => {
    //       return myChannels.id === channel.id;
    //     });
    //     if (!res) {
    //       channels.push(channel);
    //     }
    //   });
    //   return channels;
    // },
  },
  data() {
    return {
      allChannels: [],
      isEdit: false,
      fiexChannels: [0], //固定不能删除的频道
    };
  },
  created() {
    this.loadAllChannels();
  },
  methods: {
    async loadAllChannels() {
      const { data } = await getUserChannels();
      this.allChannels = data.data.channels;
      try {
      } catch (err) {
        this.$toast("加载失败，请稍后重试");
      }
    },
    async onAddchannel(channel) {
      this.myChannels.push(channel);
      if (this.user) {
        // 已登录存储到线上
        try {
          await addUserChannel({
            id: channel.id,
            seq: this.myChannels.length,
          });
        } catch (err) {
          this.$toast("加载失败，请稍后重试");
        }
      } else {
        // 未登录存储到本地
        setItem("TOUTIAO_CHANNELS", this.myChannels);
      }
    },
    onMyChannelClick(channel, index) {
      // 编辑状态执行删除，非编辑执行切换频道
      if (this.isEdit) {
        if (this.fiexChannels.includes(index)) {
          return;
        }
        this.myChannels.splice(index, 1);
        if (index <= this.active) {
          this.$emit("update-active", this.active - 1, true);
        }
        this.deleteChannel(channel);
      } else {
        this.$emit("update-active", index, false);
      }
    },
    async deleteChannel(channel) {
      if (this.user) {
        await deleteUserChannel(channel.id);
      } else {
        setItem("TOUTIAO_CHANNELS", this.myChannels);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/.grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/.my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  /deep/.recommend-grid {
    .grid-item {
      .van-grid-item__content {
        white-space: nowrap;
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>