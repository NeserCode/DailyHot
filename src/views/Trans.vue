<template>
  <div class="about">
    <div id="input">
      <el-input
        v-model="inputValue"
        @input="Translate()"
        placeholder="请输入转换内容"
      ></el-input>
    </div>
    <div id="answer">
      <h3>
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
      </h3>
      <el-divider></el-divider>
      <span>{{ transValue }}</span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Trans",
  data() {
    return {
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
        console.log(NumberX.join(","));
        this.transValue = NumberRe.join("");
      }
    },
  },
};
</script>

<style scoped>
.abput {
  display: flexbox;
  align-content: center;
  justify-content: center;
  flex-direction: row;
}

#input {
  @apply w-1/4 mx-auto pt-12;
}

#answer {
  @apply w-1/4 mx-auto pt-12 text-center;
}
#answer h3 {
  @apply w-60 my-8 mx-auto;
}
</style>