<template>
  <div class="answer-container" v-if="this.$route.params">
    <van-nav-bar
      :title="this.$route.params.data.pagetitle"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
      :placeholder="true"
    />
    <div v-if="answer.data" v-html="answer.data.content">
      {{ answer.data.content }}
    </div>
    <div class="footer">
      <div>广软疫宝</div>
      <div>提供优质服务</div>
    </div>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  data() {
    //这里存放数据
    return {
      answer: {},
    };
  },
  //方法集合
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.answer = this.$route.params;
  },
};
</script>
<style lang="scss">
.answer-container {
  position: relative;
  font-family: "思源黑体";
  width: 100%;
  min-height: 100vh;
  height: 100%;
  div {
    .article {
      width: 90%;
      // height: 92vh;
      margin: 0px auto;
      padding-bottom: 80px;
      .title {
        font-size: 1.1rem;
        font-weight: 700;
      }
      .info {
        border-top: 1px solid rgb(240, 240, 240);
        border-bottom: 1px solid rgb(240, 240, 240);
        width: 100%;
        display: flex;
        height: auto;
        align-items: center;
        .avatar {
          width: 50px;
          height: 50px;
          // line-height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 49px;
            height: 49px;
          }
        }
        .publish {
          width: 30%;
          height: auto;
          margin-left: 0.1rem;
          font-size: 0.5rem;
          color: rgb(136, 136, 136);
        }
      }
      .content {
        text-indent: 2rem;
        font-size: 0.9rem;
        h1 {
          font-size: 1rem;
        }
      }
      .answer-editor {
        .editor {
          font-size: 0.9rem;
          color: rgb(136, 136, 136);
          text-align: right;
        }
      }
      .answer-img {
        width: 100%;
        margin: 0rem auto;
        // padding-bottom: 60px;
        height: auto;
        margin-top: 1rem;
        img {
          width: 100%;
          height: auto;
        }
      }
    }
  }
  .footer {
    width: 100%;
    position: absolute;
    bottom: 1rem;
    // padding: 1rem 0rem;
    color: rgb(179, 179, 179);
    text-align: center;
    div:nth-child(1) {
      font-size: 1rem;
      font-weight: bold;
      font-style: italic;
    }
    div:nth-child(2) {
      font-size: 0.9rem;
    }
  }
}
</style>
