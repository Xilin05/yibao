<template>
  <div class="health-deatail-container">
    <van-nav-bar
      title="新闻详情"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
      :placeholder="true"
    />
    <div class="head">
      <h1 class="title">{{ news.title }}</h1>
      <div class="info">{{ news.time }}</div>
    </div>
    <div class="news-img">
      <img :src="news.pic" alt="" />
    </div>
    <article class="news-content" v-html="news.content">
      {{ news.content }}
    </article>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
    //这里存放数据
    return {
      news: {},
    };
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.news = this.$route.params;
  },
};
</script>
<style lang="scss" scoped>
.health-deatail-container {
  // height: auto;
  padding-bottom: 1rem;
  // width: 90%;
  // margin: 1rem auto;
  // font-size: 0.9rem;
  .head {
    font-weight: 400;
    padding: 0.4rem 0.3rem 0;
    .title {
      font-size: 1.3rem;
      font-weight: 700;
      padding: 0 0 0.2rem;
      color: #404040;
    }
    .info {
      font-size: 0.28rem;
      font-weight: 400;
      margin: 0 0 0.12rem;
      color: #888;
    }
  }
  .news-img {
    width: 95%;
    margin: 0.5rem auto;
    img {
      width: 100%;
      height: auto;
    }
  }
  .news-content {
    width: 95%;
    font-size: 0.9rem;
    text-indent: 2rem;
    margin: 0rem auto 1rem auto;
    // padding: 0rem 0.3rem;
    .content {
      .otitle_editor {
        text-align: right;
        .editor {
          text-align: right;
        }
      }
    }
  }
}
</style>
