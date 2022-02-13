<template>
  <div>
    <van-tabbar
      route
      active-color="rgb(87, 135, 255)"
      inactive-color="#999999"
      :placeholder="true"
    >
      <van-tabbar-item replace to="/dashboard" icon="wap-home"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/personal" icon="manager"
        >我的</van-tabbar-item
      >
    </van-tabbar>
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
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
};
</script>
<style lang="scss" scoped>
/deep/ .van-tabbar {
  box-shadow: 0px 0px 15px 2px #ebebeb;
}
.test {
  // color: #0777f7;
  color: #999999;
}
</style>
