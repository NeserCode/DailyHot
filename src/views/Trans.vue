<template>
  <div class="about">
    <div id="input">
      <el-input
        v-model="inputValue"
        @input="Translate()"
        class="passWord"
        placeholder="请输入转换内容"
        ><template #prepend>
          <span>密文</span>
          <el-divider direction="vertical"></el-divider>
          <el-select
            v-model="TranslateIdea"
            @change="Translate()"
            placeholder="请选择加密方法"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-input>
    </div>
    <div id="answer">
      <el-divider></el-divider>
      <el-input class="clearWord" v-model="transValue" maxlength="0"
        ><template #prepend> 明文 </template>
      </el-input>
    </div>
    <div id="discuss">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="什么是加密" name="1">
          <div class="innerText">
            加密，是以某种特殊的算法改变原有的信息数据，使得未授权的用户即使获得了已加密的信息，但因不知解密的方法，仍然无法了解信息的内容。
          </div>
          <br />
          <el-link
            href="https://baike.baidu.com/item/加密/752748"
            target="viewBox"
            type="primary"
            >详情见百度百科 [加密] 词条</el-link
          >
        </el-collapse-item>
        <el-collapse-item title="简单密码加密" name="2">
          <div class="innerText">
            简单密码加密是指以较为简单的明密文对应关系作为主要加密手段的加密方法。例如著名的凯撒加密，是将26个英文字母按一定偏移量的关系进行一一关联并转换密文为明文，对这种加密方法进行暴力破解的次数为26的阶乘减一。
          </div>
          <div class="innerText">
            本例中讨论的数英加密及英数加密均未设置加密偏移量，不具有一定的加密效能。
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Trans",
  data() {
    return {
      activeName: "1",
      inputValue: "",
      transValue: "",
      isDisabled: true,
      TranslateIdea: "Nothing",
      options: [
        {
          label: "English-Number",
          value: "English-Number",
        },
        {
          label: "Number-English",
          value: "Number-English",
        },
      ],
    };
  },
  methods: {
    Translate() {
      if (this.TranslateIdea === undefined)
        this.$message.error("未选择相关加密方法");
      let EnglishbArr = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ];
      let EnglishsArr = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ];
      let NumberArr = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26,
      ];
      let StringArr = this.inputValue.split("");
      let StringRe = [],
        NumberRe = [],
        NumberX = [];
      if (this.TranslateIdea == "English-Number") {
        for (let k = 0; k < StringArr.length; k++) {
          for (let j = 0; j < NumberArr.length; j++)
            if (
              StringArr[k] == EnglishbArr[j] ||
              StringArr[k] == EnglishsArr[j]
            ) {
              if (NumberArr[j] >= 10) StringRe[k] = NumberArr[j];
              else StringRe[k] = "0" + NumberArr[j];
            } else if (StringArr[k] == " ") StringRe[k] = "-";
        }
        this.transValue = StringRe.join("");
      } else if (this.TranslateIdea == "Number-English") {
        for (let k = 0; k < StringArr.length; k++) {
          if (StringArr[k] == "-") {
            NumberRe[k] = " ";
            continue;
          }
          if (parseInt(StringArr[k]) * 10 + parseInt(StringArr[k + 1]) > 26) {
            NumberX[k] = parseInt(StringArr[k]);
            for (let j = 0; j < NumberArr.length; j++)
              if (NumberX[k] == NumberArr[j])
                NumberRe[k] =
                  NumberRe[k - 1] == " " || k == 0
                    ? EnglishbArr[j]
                    : EnglishsArr[j];
          } else if (
            parseInt(StringArr[k]) * 10 + parseInt(StringArr[k + 1]) <=
            26
          ) {
            NumberX[k] =
              parseInt(StringArr[k]) * 10 + parseInt(StringArr[k + 1]);
            for (let j = 0; j < NumberArr.length; j++)
              if (NumberX[k] == NumberArr[j])
                NumberRe[k] =
                  NumberRe[k - 1] == " " || k == 0
                    ? EnglishbArr[j]
                    : EnglishsArr[j];
            k++;
          }
        }
        this.transValue = NumberRe.join("");
      }
    },
  },
};
</script>

<style scoped lang="postcss">
#input {
  @apply w-1/3 mx-auto pt-12;
}

#answer,
#discuss {
  @apply w-1/4 mx-auto pt-1 text-center;
}

#discuss {
  @apply mt-8;
}

.innerText {
  @apply text-left;
}
:deep(.passWord .el-input-group__prepend) {
  @apply w-56;
}
:deep(.passWord) {
  @apply w-full;
}
:deep(.el-select) {
  @apply w-44 ml-0;
}
</style>