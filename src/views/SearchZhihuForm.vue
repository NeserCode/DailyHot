<template>
  <div class="searchForm">
    <el-container class="plainCon">
      <el-tag
        color="#FFEEFF"
        style="transform: translateY(-25%); margin-right: 0.5rem"
        v-if="searchData[0].hot != 0"
        >实时</el-tag
      >
      <span>{{ timeSet.date }}</span>
      <el-tag
        style="transform: translateY(-25%); margin-left: 0.5rem"
        effect="dark"
        >{{ timeSet.happen ? timeSet.happen : "历史上的今天" }}
        <i
          :class="timeSet.happen ? 'el-icon-refresh' : 'el-icon-loading'"
          @click="getOneDayDate"
        >
        </i
      ></el-tag>
    </el-container>
    <el-container>
      <div id="keyword">
        <span class="ledPreSpan">『</span>
        <div id="ledHead">
          <div class="ledLine" data-show>知乎</div>
          <div class="ledLine">热搜</div>
          <div class="ledLine">排行榜</div>
        </div>
        <span class="ledPreSpan">』</span>
      </div>
    </el-container>
    <el-skeleton
      style="width: 720px; margin: 0 auto"
      :loading="searchDataLoading"
      animated
    >
      <template #template>
        <el-skeleton-item variant="h1" style="width: 10%"> </el-skeleton-item>
        <el-skeleton-item variant="h1" style="width: 10%; margin-left: 5%">
        </el-skeleton-item>
        <el-skeleton-item variant="h1" style="width: 10%; margin-left: 55%">
        </el-skeleton-item>
        <el-skeleton-item variant="h2" style="margin-top: 1.2rem">
        </el-skeleton-item>
        <el-skeleton-item variant="h2" style="margin-top: 1.2rem">
        </el-skeleton-item>
        <el-skeleton-item variant="h2" style="margin-top: 1.2rem">
        </el-skeleton-item>
        <el-skeleton-item variant="h2" style="margin-top: 1.2rem">
        </el-skeleton-item>
        <el-skeleton-item variant="h2" style="margin-top: 1.2rem">
        </el-skeleton-item>
        <el-skeleton-item variant="h2" style="margin-top: 1.2rem">
        </el-skeleton-item>
        <el-skeleton-item variant="h2" style="margin-top: 1.2rem">
        </el-skeleton-item>
        <el-skeleton-item variant="h2" style="margin-top: 1.2rem">
        </el-skeleton-item>
        <el-skeleton-item variant="h2" style="margin-top: 1.2rem">
        </el-skeleton-item>
        <el-skeleton-item variant="h2" style="margin-top: 1.2rem">
        </el-skeleton-item>
        <el-skeleton-item variant="h2" style="margin-top: 1.2rem">
        </el-skeleton-item>
        <el-skeleton-item variant="h2" style="margin-top: 1.2rem">
        </el-skeleton-item>
        <el-skeleton-item variant="h2" style="margin-top: 1.2rem">
        </el-skeleton-item>
      </template>
      <template #default>
        <el-container id="searchForm" v-loading="searchDataLoading">
          <el-table :data="searchData" style="width: 840px">
            <el-table-column width="90" prop="nth" label="序号"
              ><template #default="searchData">
                <el-tag size="small" :color="searchData.row.color">
                  {{ searchData.row.nth }}
                </el-tag>
              </template></el-table-column
            >
            <el-table-column width="500" prop="text" label="热搜">
              <template #default="searchData">
                <el-link :href="searchData.row.url" target="viewBox">
                  {{ searchData.row.text }} <i class="el-icon-s-promotion"></i>
                </el-link>
              </template>
            </el-table-column>
            <el-table-column width="240" prop="title" label="话题">
              <template #default="searchData">
                #{{ searchData.row.title }}#
              </template>
            </el-table-column>
          </el-table>
        </el-container>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "SearchZhihuForm",
  mounted() {
    var timeSetBefore = new Date();

    // clearInterval(this.intervalQueue[0]);
    localStorage.clear();
    this.animateKeyword(this.intervalQueue);
    this.timeSet.date = timeSetBefore.toLocaleDateString();

    this.getSearchData();
    this.getOneDayDate();

    window.addEventListener("beforeunload", this.unloadFunc);
  },
  data() {
    return {
      searchDataLoading: true,
      intervalQueue: [],
      apiUrl: "https://tenapi.cn/",
      timeSet: {
        date: "",
        happen: "",
      },
      searchData: [
        {
          nth: "0",
          text: "test",
          title: "test",
          url: "test",
          color: "#FFF",
        },
      ],
    };
  },
  methods: {
    getSearchData: function () {
      let that = this;
      this.$axios
        .get(this.apiUrl + "zhihuresou/")
        .then(function (response) {
          for (let k = 0; k < response.data.list.length; k++) {
            if (that.searchData[k] == undefined) {
              that.searchData.push({
                nth: 0,
                text: "test",
                title: "test",
                url: "test",
                color: "#FFF",
              });
            }
            that.searchData[k].nth = k + 1;
            that.searchData[k].text = response.data.list[k].query;
            that.searchData[k].title = response.data.list[k].name;
            that.searchData[k].url = response.data.list[k].url;
            that.searchData[k].color =
              k == 2
                ? "#67C23A"
                : k == 1
                ? "#E6A23C"
                : k == 0
                ? "#F56C6C"
                : "#FFF";
          }
          that.searchDataLoading = false;
        })
        .catch(function (err) {
          console.log(err);
          that.$message.error("获取数据失败");
        });
    },
    getOneDayDate: function () {
      let that = this;
      this.timeSet.happen = null;
      this.$axios
        .get(this.apiUrl + "lishi/")
        .then(function (response) {
          that.timeSet.happen = response.data;
        })
        .catch(function (err) {
          console.log(err);
          that.$message.error("获取数据失败");
        });
    },
    animateKeyword: function (array) {
      if (localStorage.getItem("isAnimation") != "true") {
        array[0] = setInterval(this.animationFunc, 2750);
        localStorage.setItem("isAnimation", "true");
      }
    },
    animationFunc: function () {
      if (document.querySelector(".ledLine[data-show]")) {
        const show = document.querySelector(".ledLine[data-show]"),
          next =
            show.nextElementSibling ||
            document.querySelector(".ledLine:first-child"),
          up = document.querySelector(".ledLine[data-up]");
        if (up) up.removeAttribute("data-up");
        show.removeAttribute("data-show");
        show.setAttribute("data-up", "");
        next.setAttribute("data-show", "");
      }
    },
    unloadFunc: function () {},
  },
};
</script>

<style scoped>
#searchForm {
  @apply h-full w-screen border-r border-gray-300;
}

#keyword {
  @apply mx-auto w-56;
}
#ledHead {
  @apply w-36 h-12 mx-5 relative overflow-hidden text-center my-12 text-3xl font-bold select-none
  float-left;
}
.ledPreSpan {
  @apply relative h-12 font-bold text-xl inline-block my-12 float-left select-none;
}
.ledLine {
  @apply w-full h-12 block box-border absolute top-12;
  line-height: 42px;
}
</style>

<style scoped>
.ledLine {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.ledLine:nth-child(1) {
  background-image: linear-gradient(45deg, #0ecffe, 50%, #07a6f1);
}
.ledLine:nth-child(2) {
  background-image: linear-gradient(45deg, #18e198, 50%, #0ec15d);
}
.ledLine:nth-child(3) {
  background-image: linear-gradient(45deg, #8a7cfb, 50%, #633e9c);
}
.ledLine:nth-child(4) {
  background-image: linear-gradient(45deg, #fa7a71, 50%, #f45f7f);
}

.ledLine[data-show] {
  transform: translateY(-100%);
  transition: ease-in-out 0.8s transform;
}
.ledLine[data-up] {
  transform: translateY(-200%);
  transition: ease-in-out 0.8s transform;
}

.ledPreSpan:first-child {
  top: -0.2rem;
}
.ledPreSpan:last-child {
  bottom: -1.2rem;
}

#searchForm,
.el-table {
  min-width: 840px;
  margin: 0 auto;
}

.plainCon {
  height: 2rem;
  margin: 0.5rem;
  margin-top: 1rem;
  line-height: 1rem;
  font-size: 1rem;
  padding: 0.5rem 0.25rem;
  position: fixed;
}
</style>
