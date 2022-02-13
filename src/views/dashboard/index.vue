<template>
  <div class="home-page">
    <div class="header">
      <vheader></vheader>
    </div>
    <div class="news">
      <news />
    </div>
    <div class="popular">
      <popular />
    </div>
    <div class="time-hot">
      <healthhot />
    </div>
    <div class="footer">亲，再划也没有了哦~</div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import vheader from "./components/header.vue";
import news from "./components/news.vue";
import popular from "./components/popularization.vue";
import healthhot from "./components/healthhot.vue";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    vheader,
    news,
    popular,
    healthhot,
  },
  props: {},
  data() {
    //这里存放数据
    return {};
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>
<style lang="scss" scoped>
.home-page {
  width: 100%;
  height: auto;
  // background: linear-gradient(to right, #60a0ff 10%, #8294f8 40%, #3a84e6 80%);
}
.news {
  margin: 1rem auto;
}
.footer {
  text-align: center;
  font-size: 0.8rem;
  padding-bottom: 1rem;
  // font-weight: bold;
  color: rgb(170, 170, 170);
}
</style>
