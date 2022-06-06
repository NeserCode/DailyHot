<template>
  <div class="userAvatarContainer">
    <el-avatar @click="handleAvatar()" :src="N_imageUrl"></el-avatar><br />
    <div class="usernameDiv">
      <span class="usernameSpan">{{ N_username }}</span>
      <i @click="handleNameChange()" class="el-icon-edit"></i>
      <div class="infomation">
        <span>QQ</span><span>[ Ej Fdhcfc ]</span> <span>Email</span
        ><span>[ 140519051803150405 @0713010912.031513 ]</span>
      </div>
    </div>
  </div>
  <!-- AvatarChange -->
  <el-dialog title="修改头像" v-model="isDialogShow">
    <img
      v-if="setImageUrl && isImageChecked"
      :src="setImageUrl"
      class="innerAvatar"
    />
    <el-input
      type="textarea"
      clearable
      :disabled="isImageChecked"
      :autosize="inputSizeObject"
      placeholder="输入图片直链链接"
      v-model="setImageUrl"
    >
    </el-input>
    <div class="btns">
      <el-button @click="handleAvatarSuccess" class="getSuccessBtn">{{
        getPicMesssage
      }}</el-button>
      <el-button
        type="danger"
        @click="handleAvatarReset"
        v-if="setImageUrl && isImageChecked"
        class="getPicResetBtn"
        >重选</el-button
      >
    </div>
  </el-dialog>
  <!-- NameChange -->
  <el-dialog title="修改昵称" v-model="isNameDialogShow">
    <el-input
      type="text"
      clearable
      rows="1"
      placeholder="输入新的昵称"
      v-model="setNewName"
    >
    </el-input>
    <div class="btns">
      <el-button @click="handleRenameSuccess" class="getSuccessBtn"
        >修改</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
function checkImgExists(imgurl) {
  return new Promise(function (resolve, reject) {
    var ImgObj = new Image();
    ImgObj.src = imgurl;
    ImgObj.onload = function (res) {
      resolve(res);
    };
    ImgObj.onerror = function (err) {
      reject(err);
    };
  });
}

export default {
  name: "User",
  props: {
    username: String,
  },
  watch: {},
  computed: {},
  data() {
    return {
      isDialogShow: false,
      isNameDialogShow: false,
      isImageChecked: false,
      getPicMesssage: "查看",
      setImageUrl: "",
      N_username: localStorage.getItem("username")
        ? localStorage.getItem("username")
        : this.username
        ? this.username
        : "NaN",
      N_imageUrl: localStorage.getItem("imgSrc")
        ? localStorage.getItem("imgSrc")
        : "http://localhost/Images/q.jpg",
      setNewName: "",
      inputSizeObject: {
        minRows: 1,
        maxRows: 8,
      },
    };
  },
  methods: {
    handleAvatar: function () {
      this.isDialogShow = !this.isDialogShow;
    },
    handleAvatarSuccess: function () {
      checkImgExists(this.setImageUrl)
        .then(() => {
          if (this.getPicMesssage == "修改") {
            localStorage.setItem("imgSrc", this.setImageUrl);
            this.N_imageUrl = this.setImageUrl;
            this.$emit("message", this.setImageUrl);
            this.setImageUrl = "";
            this.isDialogShow = !this.isDialogShow;
            this.$message.success("修改成功");
          }
          if (!this.isImageChecked) this.getPicMesssage = "修改";
          else this.getPicMesssage = "查看";
          this.isImageChecked = !this.isImageChecked;
        })
        .catch(() => {
          this.$message.error("未找到图片/图片不存在");
        });
    },
    handleAvatarReset: function () {
      this.imageUrl = "";
      this.isImageChecked = !this.isImageChecked;
      this.getPicMesssage = "查看";
    },
    handleNameChange: function () {
      this.isNameDialogShow = !this.isNameDialogShow;
      this.setNewName = this.N_username;
    },
    handleRenameSuccess: function () {
      localStorage.setItem("username", this.setNewName);
      this.N_username = this.setNewName;
      this.setNewName = "";
      this.isNameDialogShow = !this.isNameDialogShow;
    },
  },
};
</script>

<style scoped>
.btns {
  @apply w-full text-center;
}

.userAvatarContainer {
  @apply w-full h-48 text-center py-10 select-none;
}
.el-avatar {
  @apply w-20 h-20 mb-4 border border-gray-400 rounded-full;
}
.innerAvatar {
  @apply max-w-xs block mx-auto my-8;
}
.getSuccessBtn {
  @apply inline-block mt-4;
}
.getPicResetBtn {
  @apply inline-block;
}
.infomation {
  @apply w-80 h-32 mt-48 mx-auto text-center text-gray-500;
}
.infomation span {
  @apply w-64 inline-block select-text;
}
</style>

<style>
.el-dialog .el-dialog__header button,
.el-dialog .el-dialog__body button {
  outline: none;
}
.el-dialog .el-input {
  max-height: 320px;
}
.usernameSpan {
  display: inline-block;
  margin: 0 8px;
}
</style>
