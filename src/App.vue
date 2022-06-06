<template>
  <el-menu :default-active="$route.name" mode="horizontal" router>
    <el-menu-item index="searchWeiboForm"> 微博热搜 </el-menu-item>
    <el-menu-item index="searchZhihuForm"> 知乎热搜 </el-menu-item>
    <el-menu-item index="searchDouyinForm"> 抖音热搜 </el-menu-item>
    <el-menu-item index="trans"> 加密转换 </el-menu-item>
    <el-menu-item index="about">关于</el-menu-item>
    <el-avatar @click="handleAvatar()" :src="baseAvatarUrl"></el-avatar>
  </el-menu>
  <el-drawer v-model="isAvatarDrawer" :with-header="isAvatarDrawerHead">
    <User :username="userInfoUserName"></User>
  </el-drawer>

  <router-view />
</template>

<script>
import User from "@/components/User.vue";

export default {
  components: {
    User,
  },
  mounted() {},
  data() {
    return {
      radio: "1",
      activeIndex: "1",
      isAvatarDrawer: false,
      isAvatarDrawerHead: false,
      userInfoUserName: "NeserCode",
      baseAvatarUrl: `https://tenapi.cn/qqimg/?qq=510648363`,
    };
  },
  methods: {
    handleAvatar: function () {
      this.isAvatarDrawer = true;
    },
    getImageUrl: function (val) {
      this.handleAvatarUrl = val;
    },
  },
};
</script>

<style scoped lang="postcss">
.el-menu {
  @apply select-none;
}
.el-avatar {
  @apply block my-3 absolute right-3;
}
.el-avatar img {
  @apply h-9 border-gray-400 border rounded-full;
}
</style>

<style scoped>
.el-menu {
  position: sticky;
  top: 0;
}
</style>