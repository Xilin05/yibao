<template>
  <div class="sign-container">
    <form action="">
      <div class="in-style">
        <van-icon
          name="phone-circle"
          size="22"
          color="rgba(8, 120, 247, 0.796)"
        />
        <input type="text" placeholder="手机号码" />
      </div>
      <div class="in-style">
        <van-icon name="bell" size="22" color="rgba(8, 120, 247, 0.796)" />
        <input type="text" placeholder="6位验证码" />
        <div class="getCode" @click="getCode()">验 证 码</div>
      </div>
      <div class="in-style">
        <van-icon name="lock" size="23" color="rgba(8, 120, 247, 0.796)" />
        <input type="password" placeholder="设置密码" />
      </div>
      <div class="formbtn" @click="sign()">
        注&nbsp;册&nbsp;并&nbsp;登&nbsp;入
      </div>
    </form>
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
    login() {
      // Notify({ type: "success", message: "通知内容" });
    },
    getCode() {
      this.$notify({ type: "success", message: "发送验证码成功！" });
    },
    sign() {
      this.$notify({
        type: "success",
        message: "注册成功！",
      });
      this.$router.push("/dashboard");
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>
<style lang="scss" scoped>
.sign-container {
  width: 60%;
  height: 15rem;
  margin: 1rem auto;

  form {
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;
    justify-content: center;
    width: 100%;
    height: 100%;

    .in-style {
      width: 98%;
      height: 20%;
      border-bottom: 2px solid rgba(200, 208, 253, 0.26);
      display: flex;
      align-items: center;
      justify-content: space-evenly;

      // background-color: rgba(200, 208, 253, 0.26);
      input {
        border: none;
        background: none;
        width: 77%;
        outline: none;
      }

      input::placeholder {
        color: rgb(209, 209, 209);
        font-family: "思源黑体";
      }
    }
    .in-style:nth-child(2) {
      input {
        width: 47%;
      }
      .getCode {
        color: #fff;
        font-size: 0.7rem;
        padding: 7px 10px;
        border-radius: 2rem;
        // background-color: #fff;
        background: linear-gradient(
          to right,
          #415cf3 10%,
          #3878f8 50%,
          #415cf3 90%
        );
      }
    }

    .formbtn {
      line-height: 2.7rem;
      width: 100%;
      height: 2.7rem;
      margin-top: 0.8rem;
      border-radius: 10rem;
      color: white;
      text-align: center;
      font-weight: bold;
      font-size: 0.9rem;
      background: linear-gradient(
        to right,
        #3878f8 10%,
        #415cf3 50%,
        #079adf 90%
      );
      box-shadow: 0px 0px 10px 1px rgb(192, 192, 192);
      transition: 0.3s ease-in;
    }

    .formbtn:active {
      background: linear-gradient(
        to right,
        #415cf3 10%,
        #3878f8 50%,
        #415cf3 90%
      );
      box-shadow: none;
      transition: 0.3s ease-in;
    }

    .forget {
      width: 100%;
      height: auto;
      font-size: 0.5rem;
      margin-top: 0.2rem;

      a {
        text-decoration: underline;
        color: rgb(187, 187, 187);
      }
    }
  }
}
</style>