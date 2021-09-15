<template>
  <div
    class="about"
    style="background: rgba(209, 213, 219, 0.4); padding: 1.45rem"
  >
    <div class="mainAboutFlex">
      <div class="logArea" v-for="(item, index) in log" :key="index">
        <img class="avatarImage" :src="item.avatar" />
        <span class="titleArea">{{ item.title }}</span
        ><br />
        <span class="nameArea"
          >{{ item.name }}
          <i @click="getLinkAct(item.website)" class="el-icon-link"> </i> </span
        ><br />
        <span class="mottoArea">“ {{ item.motto }} ”</span>
      </div>
    </div>
  </div>
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
          website: "https://nesercode.top",
          motto: "没有人能学完所有知识，这算是常识",
          avatar: require("../../src/assets/q.jpg"),
        },
        {
          name: "VSCode",
          title: "最佳编辑器",
          website: "https://code.visualstudio.com",
          motto: "Code editing.Redefined.",
          avatar: require("../../src/assets/vscode.png"),
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
          title: "最佳Api构件",
          website: "https://www.axios-http.cn/",
          motto:
            "Axios 是一个基于 promise 的网络请求库，可以用于浏览器和 node.js",
          avatar: require("../../src/assets/axios.png"),
        },
      ],
    };
  },
  methods: {
    getLinkAct: function (link) {
      window.open(link, "viewBox");
    },
  },
};
</script>

<style scoped>
.mainAboutFlex {
  @apply h-full w-1/2 mx-auto py-16 bg-white;
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
</style>