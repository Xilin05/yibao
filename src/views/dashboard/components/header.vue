<template>
  <div class="header-container">
    <!-- <van-nav-bar title="广软疫宝" fixed="true">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar> -->
    <div class="panel">
      <div class="title">
        <div class="p-header">热门服务</div>
      </div>
      <!-- <div class="underline"></div> -->
      <div class="ports">
        <div class="inport">
          <router-link to="/vaccine">
            <div class="logo">
              <img src="../../../assets/svg/疫苗.svg" alt="" />
            </div>
            疫苗预约
          </router-link>
        </div>
        <div class="inport">
          <router-link to="/acid">
            <div class="logo">
              <img src="../../../assets/svg/体温计.svg" alt="" />
            </div>
            核酸预约
          </router-link>
        </div>
        <div class="inport">
          <router-link to="/outpatient">
            <div class="logo">
              <img src="../../../assets/svg/医院.svg" alt="" />
            </div>
            门诊预约
          </router-link>
        </div>
        <div class="inport">
          <router-link to="/prevent">
            <div class="logo">
              <img src="../../../assets/svg/口罩.svg" alt="" />
            </div>
            防疫科普
          </router-link>
        </div>
        <div class="inport">
          <router-link to="/checkself">
            <div class="logo">
              <img src="../../../assets/svg/健康.svg" alt="" />
            </div>
            健康自查
          </router-link>
        </div>
        <div class="inport">
          <router-link to="/riskarea">
            <div class="logo">
              <img src="../../../assets/svg/交通管制.svg" alt="" />
            </div>
            风险区域
          </router-link>
        </div>
      </div>
      <!-- <div> -->
      <!-- </div> -->
      <!-- <div>
        <div></div>
        <div></div>
        <div></div>
      </div> -->
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
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>
<style lang="scss" scoped>
.header-container {
  position: relative;
  width: 100%;
  height: 23rem;
  // background: url("../../../assets/img/toutu.png") no-repeat;
  background: url("../../../assets/img/首页插图2.png") no-repeat;
  background-size: 100% auto;
  background-position: 0% 0%;
  .panel {
    font-size: 0.8rem;
    // font-weight: bold;
    color: rgb(49, 49, 49);
    width: 90%;
    height: 15rem;
    border-radius: 1rem;
    overflow: hidden;
    position: absolute;
    bottom: 0rem;
    left: 0rem;
    right: 0rem;
    margin: auto;
    background-color: #fff;
    box-shadow: 0px 0px 8px 0px #ebebeb;
    .title {
      padding: 10px 0px;
      .p-header {
        color: rgb(87, 135, 255);
        font-size: 1.2rem;
        font-weight: bold;
        width: 100%;
        // height: 1.8rem;
        // line-height: 2rem;
        text-indent: 2rem;
        // margin-top: 0.2rem;
      }
    }
    .underline {
      width: 2rem;
      height: 3px;
      background-color: rgb(87, 135, 255);
      margin: 0rem 0rem 0.7rem 2rem;
    }
    .ports {
      width: 100%;
      height: 11.5rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      align-items: center;
      border-top: 1px solid rgb(240, 240, 240);
      .inport {
        width: 30%;
        // height: 45%;
        display: flex;
        flex-direction: column;
        text-align: center;
        a {
          color: rgb(49, 49, 49);
          .logo {
            width: 3rem;
            height: 3rem;
            // line-height: 3rem;
            padding: 5px;
            // background-image: linear-gradient();
            border: 2px solid rgba(138, 165, 255, 0.103);
            border-radius: 1.3rem;
            margin: 0px auto 2px auto;
            display: flex;
            align-items: center;
            img {
              width: 90%;
              height: auto;
              margin: 0 auto;
            }
          }
        }
      }
    }
  }
}
</style>
