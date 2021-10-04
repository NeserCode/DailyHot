<template>
  <div class="home">
    <div class="oneWord">
      <div class="hitokotoText" @click="getOneWordDetail">
        {{ oneWord.text }}
      </div>
      <div class="logo" v-show="oneWord.uuid">
        <a target="viewBox" href="https://hitokoto.cn/">Api 来自 [一言]</a>
      </div>
      <div class="from" v-show="oneWord.uuid">
        {{ oneWord.type }} | {{ oneWord.from }}
      </div>
      <el-progress
        :percentage="progress.percentage"
        :status="progress.status"
        color="rgba(0,0,0,.5)"
        v-show="oneWord.uuid"
      ></el-progress>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  mounted() {
    for (let i = 0; i < this.animationId.length; i++) {
      clearInterval(this.animationId[i]);
    }
    this.initAnimation();
  },
  data() {
    return {
      oneWordApi: "https://v1.hitokoto.cn",
      animationId: [null, null],
      isDataGot: true,
      oneWord: {
        text: null,
        from: null,
        type: null,
        uuid: null,
      },
      progress: {
        percentage: 0,
        status: null,
      },
    };
  },
  methods: {
    getOneWordData: function () {
      let that = this;
      that.isDataGot = false;
      if (this.$route.name == "home") {
        this.$axios
          .get(
            this.oneWordApi + "?c=a&c=c&c=d&c=i&c=k&minlength=10&maxlength=25"
          )
          .then(function (response) {
            that.oneWord.text = response.data.hitokoto;
            that.oneWord.from = response.data.from_who
              ? "[" + response.data.from + "] " + response.data.from_who
              : response.data.from;
            that.oneWord.type =
              response.data.type == "a"
                ? "动漫"
                : response.data.type == "c"
                ? "游戏"
                : response.data.type == "d"
                ? "文学"
                : response.data.type == "i"
                ? "诗词"
                : response.data.type == "k"
                ? "哲学"
                : null;
            that.oneWord.uuid = response.data.uuid;
            if (that.animationId[1]) clearInterval(that.animationId[1]);
            that.animateLine(that.oneWord.text);
            that.isDataGot = true;
          })
          .catch(function (err) {
            console.log(err);
            that.$message.error("获取数据失败");
          });
      }
    },
    animateLine: function (string) {
      // let reg =
      //   /[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]/;

      let element = document.querySelector(".hitokotoText");
      let count = 0;
      let arr = string.split("");

      element.style.width = `0ch`;
      element.classList.remove("ended");

      this.animationId[1] = setInterval(() => {
        if (count < arr.length + 1) {
          element.style.width = `${2 * count}ch`;
          count++;
        }

        if (count == arr.length + 1)
          setTimeout(() => {
            element.classList.add("ended");
          }, 500);
      }, 200);
    },
    initAnimation: function () {
      if (localStorage.getItem("id_interval"))
        clearInterval(localStorage.getItem("id_interval"));
      if (this.$route.name == "home") {
        this.getOneWordData();
        this.animationId[0] = setInterval(() => {
          if (this.oneWord.text) {
            if (this.progress.percentage < 100 && this.isDataGot) {
              if (this.progress.percentage == 1) {
                this.progress.status = "success";
                setTimeout(() => {
                  this.progress.status = null;
                }, 500);
              }
              this.progress.percentage++;
            } else if (this.progress.percentage == 100) {
              if (document.querySelector(".hitokotoText"))
                document
                  .querySelector(".hitokotoText")
                  .classList.remove("ended");
              this.progress.percentage = 0;
              this.getOneWordData();
            }
          }
        }, 100);
        localStorage.setItem("id_interval", this.animationId[0]);
      }
    },
    getOneWordDetail: function () {
      window.open("https://hitokoto.cn?uuid=" + this.oneWord.uuid, "viewBox");
    },
  },
};
</script>

<style scoped>
.oneWord {
  @apply w-5/6 mx-auto py-8 text-gray-700 text-center
   text-3xl relative top-48 rounded-lg select-none;
}
.from {
  @apply text-xs absolute right-0 mr-2 bottom-2 font-bold text-gray-500;
}
.logo {
  @apply text-xs absolute right-0 top-0 text-gray-400;
}
.logo a:hover {
  @apply text-blue-300;
}

.el-progress {
  @apply w-60 absolute top-0 right-32;
}
</style>

<style scoped>
.oneWord {
  font-family: "consolas";
}
.hitokotoText {
  position: relative;
  width: 0ch;
  height: 2ch;
  margin: 0 auto;
  padding-right: 1ch;
  overflow: hidden;
}

.hitokotoText::after {
  margin-left: 1ch;
  content: "";
  display: inline-block;
  width: 1.5ch;
  height: 0.1ch;
  background-color: rgba(12, 0, 23, 0.8);
  position: absolute;
  bottom: 0;
  border-radius: 3px;
  right: 0.5ch;
}

.hitokotoText.ended::after {
  animation: cursor 1.2s steps(2, jump-none) infinite;
}

@keyframes cursor {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>