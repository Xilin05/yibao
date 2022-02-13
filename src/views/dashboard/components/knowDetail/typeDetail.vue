<template>
  <div class="type-container">
    <van-nav-bar
      title="疫苗科普"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
      :placeholder="true"
    />
    <div class="imglist">
      <img src="@/assets/img/疫苗科普/type0.png" alt="" />
      <img src="@/assets/img/疫苗科普/type1.png" alt="" />
      <img src="@/assets/img/疫苗科普/type2.png" alt="" />
      <img src="@/assets/img/疫苗科普/type3.png" alt="" />
      <img src="@/assets/img/疫苗科普/type4.png" alt="" />
      <img src="@/assets/img/疫苗科普/type5.jpg" alt="" />
      <img src="@/assets/img/疫苗科普/type6.png" alt="" />
    </div>
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
    return {};
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
  mounted() {},
};
</script>
<style lang="scss" scoped>
.type-container {
  width: 100%;
  .imglist {
    width: 100%;
    height: auto;
    margin: 0rem auto;
    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
}
</style>
