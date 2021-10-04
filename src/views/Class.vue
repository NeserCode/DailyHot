<template>
  <div class="class">
    <el-container>
      <el-header></el-header>
      <el-main>
        <div class="inputContainer">
          <el-input
            v-model="searchOption.searchValue"
            placeholder="Please Search Here"
            @keyup.enter="searchUser(searchOption.searchValue)"
            class="input-with-select"
          >
            <template #prepend>
              <el-select v-model="searchOption.searchType">
                <el-option label="Search By id" value="id"></el-option>
                <el-option label="Search By name" value="name"></el-option>
                <el-option label="Search By age" value="age"></el-option>
              </el-select>
            </template>
          </el-input>
        </div>
        <el-table
          v-show="isShowTable"
          :data="userInfo"
          style="width: 50%; margin: 0 auto"
          v-loading="!userInfo[0].name"
          element-loading-spinner="el-icon-loading"
          element-loading-text="正在加载"
          height="305"
          stripe
          border
        >
          <el-table-column prop="id" label="ID" width="180" />
          <el-table-column prop="name" label="Name" width="420" />
          <el-table-column prop="age" label="Age" />
        </el-table>
        <el-result
          icon="error"
          title="┗|｀O′|┛ 出错了~~"
          sub-title="这里空空如也呢！"
          v-show="!isShowTable"
        />
        <i class="warning el-icon-warning">
          请注意，在本例中，需要后端服务及数据库支持，考虑安全因素，将不进行后端部署</i
        >
        <i class="warning"
          >部署文件将会被置于项目根目录下 server.7z 或者访问
          https://wws.lanzoui.com/ivDAkul0mkd 下载 密码:1fd6
        </i>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Class",
  mounted() {
    setTimeout(() => {
      // this.addUser('李华',17);
      // this.addUser('张丽',15);
      // this.addUser('张晓明',18);
      // this.addUser('李清明',17);
      // this.addUser('陈诗',19);
      // this.addUser('马力瑞',23);
      this.getAllUser();
    }, 1000);

    setInterval(() => {
      if (!this.isShowTable && this.searchOption.searchValue == "")
        this.getAllUser();
    }, 800);
  },
  data() {
    return {
      searchOption: {
        searchValue: "",
        searchType: "name",
      },
      returnIsNull: false,
      isShowTable: true,
      userInfo: [
        {
          id: null,
          name: null,
          age: null,
        },
      ],
      classInfo: [
        {
          id: null,
          name: null,
          teacher: null,
          date: null,
          week: null,
          address: null,
          direction: null,
          time: null,
        },
      ],
    };
  },
  methods: {
    addUser(name, age) {
      this.$axios
        .post(
          "/api/user/addUser",
          {
            name: name,
            age: age,
          },
          {}
        )
        .then((response) => {
          console.log(response);
        });
    },
    getAllUser() {
      let that = this;
      this.isShowTable = true;
      this.$axios.get("/api/user/getAllUser").then((res) => {
        that.clearUser();
        if (res.data.length == 0) that.isShowTable = false;
        else {
          for (let i = 0; i < res.data.length; i++) {
            if (this.userInfo.length < i + 1)
              this.userInfo.push({ id: null, name: null, age: null });
            that.userInfo[i].id = res.data[i].id;
            that.userInfo[i].name = res.data[i].name;
            that.userInfo[i].age = res.data[i].age;
          }
        }
      });
    },
    searchUser: function (value) {
      let that = this;
      this.isShowTable = true;
      this.$axios
        .get("/api/user/searchUser/" + that.searchOption.searchType, {
          params: {
            value: value,
          },
        })
        .then((res) => {
          that.clearUser();
          if (res.data.length == 0) that.isShowTable = false;
          else {
            for (let i = 0; i < res.data.length; i++) {
              if (this.userInfo.length < i + 1)
                this.userInfo.push({ id: null, name: null, age: null });
              that.userInfo[i].id = res.data[i].id;
              that.userInfo[i].name = res.data[i].name;
              that.userInfo[i].age = res.data[i].age;
            }
          }
        });
    },
    clearUser: function () {
      this.userInfo = [{ id: null, name: null, age: null }];
    },
  },
};
</script>

<style scoped>
.inputContainer {
  @apply w-1/2 mx-auto my-4;
}
.warning {
  @apply w-1/2 mx-auto block my-8 text-gray-600;
}
/deep/ .el-input-group__prepend {
  @apply w-40;
}
</style>