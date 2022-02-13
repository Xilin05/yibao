<template>
  <div class="login-page">
    <div class="form-panel">
      <div class="how-in">
        <div class="loginbtn btn btn-actived" @click="shiftType(0)">
          <span>登&nbsp;&nbsp;陆</span>
          <div
            style="width: 40%; transition: 0.2s ease-in-out"
            class="loginline down-line"
          ></div>
        </div>
        <div class="signbtn btn" @click="shiftType(1)">
          <span>注&nbsp;&nbsp;册</span>
          <div class="signline down-line"></div>
        </div>
      </div>
      <div class="login-form">
        <transition name="fade" mode="out-in">
          <component :is="type"></component>
        </transition>
      </div>
      <div class="other-in">
        <div class="one-key">一键登录</div>
        <div class="weChatIn">
          <img src="@/assets/svg/微信.svg" alt="" />
        </div>
        <div class="qqIn">
          <img src="@/assets/svg/QQ.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import loginForm from "./components/loginForm.vue";
import signForm from "./components/signForm.vue";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    loginForm,
    signForm,
  },
  props: {},
  data() {
    //这里存放数据
    return {
      active: 0,
      inMode: 0,
      type: "loginForm",
    };
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    shiftType(id) {
      const loginbtn = document.querySelector(".loginbtn");
      const signbtn = document.querySelector(".signbtn");
      const loginline = document.querySelector(".loginline");
      const signline = document.querySelector(".signline");
      if (id == 0) {
        loginbtn.classList.add("btn-actived");
        signbtn.classList.remove("btn-actived");
        loginline.style.cssText = "width: 40%;transition: .2s ease-in-out;";
        signline.style.cssText = "width: 0%;transition: .2s ease-in-out;";
        this.active = 0;
        this.type = "loginForm";
      }
      if (id == 1) {
        signbtn.classList.add("btn-actived");
        loginbtn.classList.remove("btn-actived");
        loginline.style.cssText = "width: 0%;transition: .2s ease-in-out;";
        signline.style.cssText = "width: 40%;transition: .2s ease-in-out;";
        this.active = 1;
        this.type = "signForm";
      }
    },
    login() {
      this.$notify({ type: "success", message: "登陆成功" });
      // Notify({ type: "success", message: "通知内容" });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>
<style lang="scss" scoped>
@import url("./stytlesheet/index.css");

// .fade-enter,
// .fade-leave-to {
//   opacity: 0;
// }

// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 1s;
// }
.fade-enter-active {
  animation: sta 0.3s;
}
.fade-leave-active {
  animation: lea 0.3s;
}

@keyframes sta {
  0% {
    opacity: 0;
    transform: translateX(20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
@keyframes lea {
  0% {
    opacity: 1;
    transform: translateX(0px);
  }
  100% {
    opacity: 0;
    transform: translateX(-20px);
  }
}
</style>