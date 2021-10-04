<template>
  <div class="game" :ondragstart="keepDrag">
    <el-container>
      <el-header></el-header>
      <el-main class="container">
        <div class="mainShow">
          <img :src="nowTarget.image" />
        </div>
        <div class="asideShow">
          <div
            class="asideUnit"
            @click="handleChangeTab(index)"
            v-for="(item, index) in allGames"
            :key="index"
          >
            <div class="content">
              <img class="asideIcon" :class="'icon' + index" :src="item.icon" />
              <span class="asideName">
                {{ item.name }} <br />
                <span class="tags">{{ item.tags }}</span>
              </span>
            </div>
            <div class="backDiv"></div>
            <div
              class="coverDiv"
              :class="'cover' + index"
              :style="percentClip"
            ></div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Game",
  mounted() {
    if (localStorage.getItem("gamePercent"))
      this.percentCount = this.initData("gamePercent");
    else this.percentCount = 1000;

    if (localStorage.getItem("gameIndex"))
      this.nowTarget.id = this.initData("gameIndex");
    else this.nowTarget.id = 0;
    this.setInterForGames();
  },
  beforeUnmount() {
    if (localStorage.getItem("gameInterval"))
      clearInterval(localStorage.getItem("gameInterval"));
  },
  data() {
    return {
      percentCount: 1000,
      nowTarget: {
        image: null,
        id: 0,
      },
      intervalArray: [],
      allGames: [
        {
          name: "饥荒",
          icon: require("../../src/assets/jihuang_icon.jpg"),
          show: require("../../src/assets/jihuang.jpg"),
          tags: "沙盒 第三人称 生存",
        },
        {
          name: "人类一败涂地",
          icon: require("../../src/assets/renlei_icon.png"),
          show: require("../../src/assets/renlei.jpg"),
          tags: "探索 解谜",
        },
        {
          name: "月圆之夜",
          icon: require("../../src/assets/yueyuan_icon.jpg"),
          show: require("../../src/assets/yueyuan.png"),
          tags: "卡牌 策略 回合制",
        },
        {
          name: "堡垒之夜",
          icon: require("../../src/assets/baolei_icon.jpg"),
          show: require("../../src/assets/baolei.png"),
          tags: "动作射击 TPS 第三人称",
        },
        {
          name: "炉石传说",
          icon: require("../../src/assets/lushi_icon.jpeg"),
          show: require("../../src/assets/lushi.jpg"),
          tags: "策略 卡牌 回合制",
        },
      ],
      percentClip: {
        "--percentage": `100%`,
      },
    };
  },
  methods: {
    keepDrag: function () {
      return false;
    },
    setInterForGames: function () {
      if (localStorage.getItem("gameInterval"))
        clearInterval(localStorage.getItem("gameInterval"));

      this.intervalArray[0] = setInterval(() => {
        if (this.percentCount == 0) {
          this.percentCount = 1000;
          document
            .querySelector(".cover" + this.nowTarget.id)
            .style.setProperty("--percentage", `${this.percentCount / 10}%`);
          this.nowTarget.id =
            this.nowTarget.id == 4 ? 0 : parseInt(this.nowTarget.id) + 1;
          this.scaleIcon(`.icon${this.nowTarget.id}`, 1.2, 300);
        } else if (this.percentCount <= 1000) {
          this.percentCount--;
          localStorage.setItem("gameIndex", this.nowTarget.id);
          localStorage.setItem("gamePercent", this.percentCount);
        }

        if (document.querySelector(".mainShow"))
          document
            .querySelector(".cover" + this.nowTarget.id)
            .style.setProperty(
              "--percentage",
              `${parseInt(this.percentCount) / 10}%`
            );
        this.nowTarget.image = this.allGames[this.nowTarget.id].show;
        this.toggleOpacity(this.percentCount <= 10 || this.percentCount >= 980);
      }, 10);

      localStorage.setItem("gameInterval", this.intervalArray[0]);
    },
    toggleOpacity: function (op) {
      let show = document.querySelector(".mainShow img");

      if (op) {
        show.style.transform = `translateX(-10%)`;
        this.intervalArray[1] = setTimeout(() => {
          show.style.opacity = `0`;
        }, 5);
      } else {
        this.intervalArray[1] = setTimeout(() => {
          show.style.opacity = `1`;
          this.intervalArray[2] = setTimeout(() => {
            show.style.transform = `translateX(0%)`;
          }, 5);
        }, 25);
      }
    },
    initData: function (dataString) {
      console.log(
        `${dataString} had init as : ${localStorage.getItem(dataString)}`
      );
      return localStorage.getItem(dataString)
        ? localStorage.getItem(dataString)
        : null;
    },
    scaleIcon: function (selector, size, time) {
      document.querySelector(selector).style.transform = "scale(" + size + ")";
      console.log(document.querySelector(selector).transform);
      this.intervalArray[3] = setTimeout(() => {
        document.querySelector(selector).style.transform = `scale(1)`;
      }, time);
    },
    handleChangeTab: function (id) {
      this.nowTarget.id = id;
      this.percentCount = 1000;
      this.scaleIcon(`.icon${id}`, 1.2, 150);
    },
  },
};
</script>

<style scoped>
.game {
  @apply w-screen bg-gray-100;
}
.container {
  @apply h-full w-full mx-auto select-none;
}
.mainShow {
  @apply float-left rounded-2xl overflow-hidden;
}
.mainShow img {
  @apply w-full h-full opacity-0 rounded-2xl;
}
.asideShow {
  @apply float-left;
}
.asideUnit {
  @apply bg-transparent w-full rounded-2xl;
}
.coverDiv {
  @apply bg-gray-900 w-12 rounded-2xl select-none relative;
}
.backDiv {
  @apply bg-gray-600 w-12 rounded-2xl select-none relative;
}
.asideIcon {
  @apply w-12 h-12 m-4 my-6 rounded-lg block float-left;
}
.asideName {
  @apply w-48 h-16 my-4 text-white text-2xl inline-block;
}
.asideName .tags {
  @apply font-light text-gray-400 text-xs;
}
</style>
<style scoped>
.game {
  height: calc(99vh - 55px);
}
.container {
  min-width: 1280px;
}
.mainShow {
  width: 56rem;
  height: 32rem;
}
.mainShow img {
  transition: all ease-in-out 0.1s;
}
.asideShow {
  width: 20rem;
  height: 32rem;
}
.asideUnit {
  width: 100%;
  height: 6rem;
  margin: 0.5rem 1.5rem;
}
.asideUnit .content {
  width: 100%;
  position: relative;
  height: 6rem;
  z-index: 2;
}
.asideUnit:first-child {
  margin-top: 0;
}
.asideIcon {
  transition: transform ease-in-out 0.1s;
}
.coverDiv {
  width: 100%;
  height: 6rem;
  top: -12rem;
  z-index: 1;
  clip-path: inset(0 var(--percentage) 0 0);
}
.backDiv {
  width: 100%;
  height: 6rem;
  top: -6rem;
}
</style>