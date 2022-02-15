<template>
  <div class="prevent-container">
    <van-nav-bar
      title="防疫科普"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
      :placeholder="true"
    />
    <van-tabs
      sticky
      offset-top="46px"
      type="card"
      :border="false"
      v-model="activeName"
      animated
      title-active-color=""
      title-inactive-color="rgb(153, 153, 153)"
      :swipeable="true"
      color="rgb(255, 117, 37)"
    >
      <van-tab title="口罩" name="a">
        <div class="image">
          <img src="../../../../assets/img/口罩/15-03-17.png" alt="" />
        </div>
      </van-tab>
      <van-tab title="洗手液" name="b">
        <div class="image">
          <img src="../../../../assets/img/洗手液/15-04-25.png" alt="" />
        </div>
      </van-tab>
      <van-tab title="消毒液" name="c">
        <div class="image">
          <img src="../../../../assets/img/消毒剂/15-02-15.png" alt="" />
          <img src="../../../../assets/img/消毒剂/15-02-28.png" alt="" />
          <img src="../../../../assets/img/消毒剂/15-02-30.png" alt="" />
        </div>
      </van-tab>
      <van-tab title="温度计" name="d">
        <div class="image">
          <img src="../../../../assets/img/温度计/15-04-45.png" alt="" />
        </div>
      </van-tab>
    </van-tabs>
    <div class="footer">
      <div>广软疫宝</div>
      <div>提供优质服务</div>
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
.prevent-container {
  position: relative;
  background-color: #f9fbfd;
  .image {
    width: 100%;
    height: auto;
    margin: 1.5rem auto 5rem auto;
    box-shadow: 0px 0px 8px 0px #ebebeb;
    img {
      display: block;
      width: 100%;
      height: auto;
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
  /deep/ .van-nav-bar {
    z-index: 2;
  }
  /deep/ .van-tabs__wrap {
    height: 3rem;
    // border-bottom: 1px solid rgb(255, 117, 37);
    box-shadow: 0px 0px 8px 0px #ebebeb;
    background-color: #fff;
  }
  /deep/ .van-sticky--fixed {
    z-index: 1;
  }
  /deep/ .van-tabs__nav--card {
    height: 3rem;
    margin: 0;
    border: none;
  }
  /deep/ .van-tabs__nav--card .van-tab {
    border: none;
  }
}
</style>
