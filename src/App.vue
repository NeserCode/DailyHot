<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">主页</el-menu-item>
    <el-submenu index="2" class="elSubMenu">
      <template #title>发现</template>
      <el-menu-item index="2-1"> 课表编辑 </el-menu-item>
      <el-menu-item index="2-2"> 微博热搜排行榜 </el-menu-item>
      <el-menu-item index="2-3">加密码转换</el-menu-item>
      <el-submenu index="2-4">
        <template #title>选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3">关于</el-menu-item>
    <el-avatar
      @click="handleAvatar()"
      :src="handleAvatarUrl"
      :key="handleAvatarUrl"
    ></el-avatar>
  </el-menu>
  <el-drawer v-model="isAvatarDrawer" :with-header="isAvatarDrawerHead">
    <User @message="getImageUrl" :username="userInfoUserName"></User>
  </el-drawer>
  <div id="Banner"></div>
  <el-scrollbar>
    <router-view />
  </el-scrollbar>
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

window.onload = () => {
  if (!getCookie("Token")) {
    localStorage.clear();
  }
  setInfo("isTest", false);
};

import User from "@/components/User.vue";

export default {
  components: {
    User,
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
      imgUrlApi: "https://tenapi.cn/bing/",
    };
  },
  methods: {
    handleSelect: function (key) {
      let location = "/";
      // let location = key == "3" ? "/about" : "/";
      switch (key) {
        case "3":
          location = "/about";
          this.activeIndex = "3";
          break;
        case "2-1":
          location = "/class";
          this.activeIndex = "2-1";
          break;
        case "2-2":
          location = "/searchForm";
          this.activeIndex = "2-2";
          break;
        case "2-3":
          location = "/trans";
          this.activeIndex = "2-3";
          break;
        default:
          break;
      }
      this.$router.replace(location);
    },
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