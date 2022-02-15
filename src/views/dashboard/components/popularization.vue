<template>
  <div class="popular-container">
    <van-cell center value-class="titlelink">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <div class="p-header">疫苗科普</div>
        <!-- <div class="underline"></div> -->
      </template>
    </van-cell>
    <div class="tabs">
      <van-tabs
        type="card"
        :border="false"
        v-model="activeName"
        animated
        title-active-color=""
        title-inactive-color="rgb(153, 153, 153)"
        :swipeable="true"
        color="rgb(255, 117, 37)"
      >
        <van-tab title="认识疫苗" name="a">
          <div class="cell-card" @click="toTypeDetail()">
            <!-- <div class="parts"> -->
            <div class="l-parts">
              <div class="title">疫苗类型</div>
              <div class="content">认识我国研发的疫苗</div>
            </div>
            <div class="r-parts">
              <div>详情</div>
              <van-icon name="arrow" />
            </div>
            <!-- </div> -->
          </div>
        </van-tab>
        <van-tab title="疫苗小知识" name="b">
          <div class="card-list">
            <div class="m-card one" @click="toAnswer('necessary')">
              <div class="content">
                <div>疫苗接种必要性</div>
                <div>为何要接种疫苗？一定要吗？</div>
              </div>
            </div>
            <div class="m-card two" @click="toAnswer('together')">
              <div class="content">
                <div>多种疫苗一起接种？</div>
                <div>接种疫苗的注意事项</div>
              </div>
            </div>
            <div class="m-card three" @click="toAnswer('deadline')">
              <div class="content">
                <div>疫苗的期限</div>
                <div>疫苗的有效期是多长？</div>
              </div>
            </div>
            <div class="m-card four" @click="toAnswer('against')">
              <div class="content">
                <div>变异病毒的针对性</div>
                <div>对变异病毒的保护性</div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="热点解答" name="c">
          <van-cell-group inset>
            <van-cell
              title="所有人都可以接种吗？"
              is-link
              @click="toAnswer('allpeople')"
            />
            <van-cell
              title="新冠疫苗是否有副作用？"
              is-link
              @click="toAnswer('effect')"
            />
            <van-cell
              title="第一、二、三针有何区别？"
              is-link
              @click="toAnswer('different')"
            />
            <van-cell
              title="关于疫苗的一些谣言"
              is-link
              @click="toAnswer('rumor')"
            />
          </van-cell-group>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  necessaryJson,
  togetherJson,
  deadlineJson,
  againstJson,
  allpeopleJson,
  effectJson,
  differentJson,
  rumorJson,
} from "@/api/answer.js";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
    //这里存放数据
    return {
      activeName: "a",
    };
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    toTypeDetail() {
      this.$router.push({ path: "/typedetail" });
    },
    async toAnswer(componentName) {
      let item = {};
      if (componentName == "necessary") {
        item = necessaryJson;
      } else if (componentName == "together") {
        item = togetherJson;
      } else if (componentName == "deadline") {
        item = deadlineJson;
      } else if (componentName == "against") {
        item = againstJson;
      } else if (componentName == "allpeople") {
        item = allpeopleJson;
      } else if (componentName == "effect") {
        item = effectJson;
      } else if (componentName == "different") {
        item = differentJson;
      } else if (componentName == "rumor") {
        item = rumorJson;
      }
      this.$router.push({
        name: "AnswerDetail",
        params: item,
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>
<style lang="scss" scoped>
.popular-container {
  width: 100%;
  height: auto;
  box-shadow: 0px 0px 8px 0px #ebebeb;
  margin: 0;
  .p-header {
    color: rgb(87, 135, 255);
    font-size: 1.2rem;
    font-weight: bold;
    width: 100%;
    // text-indent: 0rem;
    line-height: 1.5rem;
  }
  .underline {
    width: 2rem;
    height: 3px;
    line-height: 0.5rem;
    background-color: rgb(87, 135, 255);
    // margin: 0rem 0rem 0.5rem 0rem;
    margin: 0.1rem 0rem 0.4rem 0rem;
  }
  .tabs {
    margin-top: 1rem;
    // border-top: 1px solid rgb(240, 240, 240);
    background-color: white;
  }
}
.cell-card::before {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  z-index: -1;
  content: "";
  // background: url("../../../assets/img/疫苗.png") no-repeat;
  background: url("../../../assets/img/1642178326(1).jpg") no-repeat;
  background-size: cover;
  background-position: center center;
  filter: brightness(30%);
}
.cell-card {
  // clear: both;
  overflow: hidden;
  position: relative;
  z-index: 1;
  width: 85%;
  height: 3rem;
  margin: 1rem auto;
  padding: 3rem 0.8rem;
  box-shadow: 0px 0px 10px 1px #979797;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  .l-parts {
    z-index: 2;
    width: 70%;
    display: flex;
    flex-direction: column;
    color: white;
    .title {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 0.3rem;
    }
    .content {
      font-size: 0.9rem;
      margin-top: 0.3rem;
    }
  }
  .r-parts {
    z-index: 2;
    font-size: 0.9rem;
    color: white;
    display: flex;
    width: 28%;
    height: auto;
    align-items: center;
    justify-content: flex-end;
  }
  // }
}
.card-list {
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  align-items: center;
  justify-content: space-evenly;
  .m-card {
    width: 43%;
    height: 4.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.8rem;
    border-radius: 0.5rem;
    box-shadow: 0px 0px 8px 0px #dddddd;
    .content {
      width: 90%;
      height: 60%;
      display: flex;
      flex-wrap: wrap;
      align-content: space-around;
      div:nth-child(1) {
        font-size: 0.8rem;
      }
      div:nth-child(2) {
        font-size: 0.6rem;
        color: rgb(158, 158, 158);
      }
    }
  }
  .one {
    background: url("../../../assets/png/know1.png") no-repeat;
    background-size: cover;
    background-position: 90% 70%;
  }
  .two {
    background: url("../../../assets/png/know2.png") no-repeat;
    background-size: cover;
    background-position: 90% 70%;
  }
  .three {
    background: url("../../../assets/png/know3.png") no-repeat;
    background-size: cover;
    background-position: 90% 70%;
  }
  .four {
    background: url("../../../assets/png/know4.png") no-repeat;
    background-size: cover;
    background-position: 90% 70%;
  }
}
.card {
  margin: 1rem 0.8rem;
  box-shadow: 0px 0px 8px 0px #ebebeb;
}
/deep/ .van-cell {
  background-image: url("../../../assets/img/疫苗.png") no-repeat;
  background-size: cover;
  background-position: 0 0;
}
/deep/ .van-tabs__nav--card {
  border-radius: 0.5rem;
  overflow: hidden;
}
/deep/ .van-cell-group--inset {
  margin: 1rem 1rem;
  box-shadow: 0px 0px 8px 0px #ebebeb;
}
</style>
