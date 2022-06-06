<template>
  <el-scrollbar height="calc( 100vh - 61px )">
    <div
      class="about"
      style="background: rgba(209, 213, 219, 0.4); padding: 1.45rem"
    >
      <div class="mainAboutFlex">
        <div class="logArea" v-for="(item, index) in log" :key="index">
          <img class="avatarImage" :src="item.avatar" />
          <span class="titleArea">{{ item.title }}</span
          ><br />
          <el-link class="nameArea" target="viewBox" :href="item.website"
            >{{ item.name }} <i class="el-icon-link"> </i> </el-link
          ><br />
          <span class="mottoArea">“ {{ item.motto }} ”</span>
        </div>
        <div
          class="infoDetailArea"
          v-for="(item, index) in infoDetail"
          :key="index"
        >
          <span class="titleArea">{{ item.title }}</span>
          <div
            class="contentArea"
            v-for="(inner, index) in item.content"
            :key="index"
          >
            <div v-if="inner.url && inner.func">
              <el-divider v-if="index != 0"></el-divider>
              <el-link target="viewBox" :href="inner.url">
                <i class="el-icon-link"></i>
                {{ inner.name }}
              </el-link>
              - [ {{ inner.func }} ]
            </div>
            <div v-if="inner.url && inner.value">
              <el-divider v-if="index != 0"></el-divider>
              {{ inner.name }} : {{ inner.value }}
              <br />
              <el-link target="viewBox" :href="inner.url">
                <i class="el-icon-link"></i>
                {{ inner.link }}
              </el-link>
            </div>
          </div>
        </div>
        <div class="aboutFooter">
          <el-divider>
            <i class="el-icon-info"> 在此致敬以上 · NeserCode </i>
          </el-divider>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
// @ is an alias to /src
export default {
  name: "About",
  data() {
    return {
      log: [
        {
          name: "NeserCode",
          title: "本例作者",
          website: "https://github.com/NeserCode",
          motto: "没有人能学完所有知识，这算是常识",
          avatar: "https://tenapi.cn/qqimg/?qq=510648363",
        },
        {
          name: "VSCode",
          title: "最佳编辑器",
          website: "https://code.visualstudio.com",
          motto: "Code editing.Redefined.",
          avatar: require("../../src/assets/vscode.png"),
        },
        {
          name: "Nodejs",
          title: "编译及后端支持",
          website: "http://nodejs.cn/",
          motto: "Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时",
          avatar: require("../../src/assets/Nodejs.png"),
        },
        {
          name: "Vue.js",
          title: "最佳框架",
          website: "https://vuejs.org/",
          motto: "The Progressive JavaScript Framework",
          avatar: require("../../src/assets/vue.png"),
        },
        {
          name: "TailWindCss",
          title: "效率最佳Css组件",
          website: "https://tailwindcss.com/",
          motto:
            "Rapidly build modern websites without ever leaving your HTML.",
          avatar: require("../../src/assets/tailwindcss.png"),
        },
        {
          name: "ElementUI",
          title: "效果最佳Css组件",
          website: "https://element.eleme.cn/#/zh-CN",
          motto:
            "Element Plus, a Vue 3.0 based component library for developers, designers and product managers",
          avatar: require("../../src/assets/elementui.png"),
        },
        {
          name: "Axios",
          title: "最佳通信构件",
          website: "https://www.axios-http.cn/",
          motto:
            "Axios 是一个基于 promise 的网络请求库，可以用于浏览器和 node.js",
          avatar: require("../../src/assets/axios.png"),
        },
      ],
      infoDetail: [
        {
          title: "WebApi请求明细(本例中)",
          content: [
            {
              name: "Ten · Api",
              func: "热榜获取、历史上的今天",
              url: "https://docs.tenapi.cn/",
            },
            {
              name: "一言 · hitokoto",
              func: "一个美丽的句子",
              url: "https://hitokoto.cn/",
            },
          ],
        },
        {
          title: "外链及引用出处",
          content: [
            {
              name: "百度知道 '加密' 词条内容",
              value: "由 百度知道 提供",
              url: "https://baike.baidu.com/item/加密/752748",
              link: "百度知道 '加密'",
            },
            {
              name: "微博热榜词条跳转链接",
              value: "由 WebApi [Ten·Api] 提供",
              url: "https://docs.tenapi.cn/resou.html",
              link: "微博热榜获取API",
            },
            {
              name: "知乎热榜词条跳转链接",
              value: "由 WebApi [Ten·Api] 提供",
              url: "https://docs.tenapi.cn/zhihuresou.html",
              link: "知乎热榜获取API",
            },
            {
              name: "首页输出语句及点击外链",
              value: "由 WebApi [一言·hitokoto] 提供",
              url: "https://developer.hitokoto.cn/sentence/",
              link: "一言 API",
            },
          ],
        },
        {
          title: "灵感及思路出处",
          content: [
            {
              name: "首页打字动效",
              value: "来自 Bilibili CodingStartup",
              url: "https://www.bilibili.com/video/BV1NV411v7Xp",
              link: "【CSS】打字特效",
            },
            {
              name: "游戏推荐动效",
              value: "来自 Epic Game 客户端首页推荐动效",
              url: "https://www.epicgames.com/site/zh-CN/home",
              link: "Epic官网",
            },
          ],
        },
      ],
    };
  },
  methods: {},
};
</script>

<style scoped>
.mainAboutFlex {
  @apply h-full w-1/2 mx-auto mt-8 py-16 mb-4 bg-white;
}

.logArea {
  @apply py-8 my-16 text-center;
}
.avatarImage {
  @apply rounded-full mx-auto h-32 w-auto;
}
.titleArea {
  @apply inline-block font-bold text-2xl mt-2;
}
.nameArea {
  @apply inline-block font-bold text-red-700 text-xs mt-2;
}
.mottoArea {
  @apply inline-block font-bold text-lg my-2 px-48;
}

.infoDetailArea {
  @apply w-2/3 mx-auto my-20 pt-8;
}
.infoDetailArea .titleArea {
  @apply mb-4 mt-12;
}
.contentArea {
  @apply my-4;
}
</style>

<style scoped>
/deep/.el-icon-info {
  font-family: "Lucida Console" sans-serif;
  color: cadetblue;
}
</style>