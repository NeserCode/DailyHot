<template>
  <el-menu :default-active="$route.name" mode="horizontal" router>
    <el-menu-item index="home">一言</el-menu-item>
    <el-submenu index="2" class="elSubMenu">
      <template #title>发现</template>
      <el-menu-item index="class"> 数据库交互 </el-menu-item>
      <el-menu-item index="game"> 游戏推荐 </el-menu-item>
      <el-menu-item index="trans"> 加密转换 </el-menu-item>
      <el-submenu index="2-4">
        <template #title>热搜排行榜</template>
        <el-menu-item index="searchWeiboForm"> 微博热搜 </el-menu-item>
        <el-menu-item index="searchZhihuForm"> 知乎热搜 </el-menu-item>
        <el-menu-item index="searchDouyinForm"> 抖音热搜 </el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="about">关于</el-menu-item>
    <el-avatar
      @click="handleAvatar()"
      :src="handleAvatarUrl"
      :key="handleAvatarUrl"
    ></el-avatar>
  </el-menu>
  <el-drawer v-model="isAvatarDrawer" :with-header="isAvatarDrawerHead">
    <User @message="getImageUrl" :username="userInfoUserName"></User>
  </el-drawer>

  <router-view />
</template>

<script>
function setCookie(name, value, seconds) {
  seconds = seconds || 0;
  var expires = "";
  if (seconds != 0) {
    var date = new Date();
    date.setTime(date.getTime() + seconds * 1000);
    expires = "; expires=" + date.toGMTString();
  }
  document.cookie = name + "=" + escape(value) + expires + "; path=/";
}

function setInfo(key, value) {
  localStorage.setItem(key, value);
  setCookie(key, value);
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) == 0) {
      return unescape(c.substring(nameEQ.length, c.length));
    }
  }
  return false;
}

import User from "@/components/User.vue";

export default {
  components: {
    User,
  },
  mounted() {
    if (!getCookie("Token")) {
      localStorage.clear();
    }
    setInfo("isTest", false);
  },
  data() {
    return {
      radio: "1",
      activeIndex: "1",
      isAvatarDrawer: false,
      isAvatarDrawerHead: false,
      handleAvatarUrl: localStorage.getItem("imgSrc")
        ? localStorage.getItem("imgSrc")
        : "http://localhost/Images/q.jpg",
      userInfoUserName: "NeserCode",
    };
  },
  methods: {
    handleAvatar: function () {
      this.isAvatarDrawer = true;
      // if (localStorage.getItem("isTest") == "true") {
      //   this.isAvatarDrawer = !this.isAvatarDrawer;
      // } else {
      //   alert("您还没有登录");
      //   localStorage.setItem("isTest", true);
      // }
    },
    getImageUrl: function (val) {
      this.handleAvatarUrl = val;
    },
  },
};
</script>

<style scoped>
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