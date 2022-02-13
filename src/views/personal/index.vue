<template>
  <div class="personal-container">
    <div class="header">
      <div class="avatar">
        <img src="../../assets/avatar.jpg" alt="" />
      </div>
      <h1 class="username">明德·至善</h1>
      <h5 class="uid">UID:1840225179</h5>
      <div class="card-1">
        <div class="card-btn" @click="toRecord()">
          <div class="btn-img record">
            <img src="../../assets/png/预约记录透明.png" alt="" />
          </div>
          预约记录
        </div>
        <div class="card-btn" @click="report()">
          <div class="btn-img upboard">
            <img src="../../assets/png/上报信息 (1).png" alt="" />
          </div>
          疫情上报
        </div>
        <div class="card-btn" @click="message()">
          <div class="btn-img message">
            <img src="../../assets/png/消息、通知-07.png" alt="" />
          </div>
          消息通知
        </div>
        <!-- <div class="card-btn message">消 息 通 知</div> -->
      </div>
    </div>
    <div class="more-service">
      <div class="personal-setting">
        <div class="p-header">个性化设置</div>
        <!-- <div class="underline"></div> -->
      </div>
      <div class="setting-cell">
        <van-cell-group inset>
          <van-cell
            center
            icon="idcard"
            title="个人信息"
            is-link
            label="完善信息 办事免填更便捷"
          />
          <van-cell
            center
            icon="phone-o"
            title="绑定手机"
            is-link
            label="1787****4525"
          />
          <van-cell
            center
            icon="certificate"
            title="登陆设置"
            is-link
            label="免登模式 人脸识别 支付密码登陆"
          />
        </van-cell-group>
      </div>
      <div class="personal-setting">
        <div class="p-header">关于我们</div>
        <!-- <div class="underline"></div> -->
      </div>
      <div class="setting-cell">
        <van-cell-group inset>
          <van-cell
            center
            icon="like-o"
            title="关注微信公众号"
            is-link
            label="消息提醒、官方咨询一手掌握"
          />
          <van-cell
            center
            icon="closed-eye"
            title="用户协议与隐私政策"
            is-link
            label="官方权威平台 保障你的权益"
          />
          <van-cell
            center
            icon="service-o"
            title="意见反馈"
            is-link
            label="欢迎向我们提出意见，以便更好地提供服务"
          />
        </van-cell-group>
      </div>
      <div class="login-out">
        <van-button type="primary" color="white" @click="toLogin" block
          >退出登录</van-button
        >
      </div>
    </div>
    <div class="footer">
      <div>广软疫宝</div>
      <div>提供优质服务</div>
    </div>
    <!-- <van-button @click="toLogin()">登录</van-button> -->
  </div>
</template>

<script>
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
    toRecord() {
      this.$router.push({
        path: "/personal/records",
      });
    },
    report() {},
    message() {},
    toLogin() {
      this.$dialog
        .confirm({
          title: "正在注销登陆...",
          message: "确定要退出本用户的登录吗？",
        })
        .then(() => {
          // on confirm
          this.$router.push("/login");
        })
        .catch(() => {
          // on cancel
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
// background-image: linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%);
// background-image: linear-gradient( 135deg, #FEB692 10%, #EA5455 100%);
// background-image: linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%);
.personal-container {
  position: relative;
  width: 100%;
  height: auto;
  .header {
    width: 100%;
    height: 17rem;
    background: url("../../assets/img/头部插图.png") no-repeat;
    background-size: 100% 80%;
    background-position: center 0;
    overflow: hidden;
    .avatar {
      width: 4.5rem;
      height: 4.5rem;
      margin: 1rem auto 0rem auto;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .username {
      font-size: 1rem;
      font-weight: 600;
      color: white;
      text-align: center;
      margin: 0.5rem auto 0rem auto;
    }
    .uid {
      margin: 0.3rem auto 0.7rem auto;
      text-align: center;
      font-size: 0.5rem;
      font-weight: 300;
      color: rgb(238, 238, 238);
    }
    .card-1 {
      width: 92%;
      height: auto;
      margin: 0rem auto;
      padding: 10px 0px 15px 0px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      background-color: #fff;
      border-radius: 1rem;
      box-shadow: 0px 0px 10px 0px #ebebeb;
      .card-btn {
        text-align: center;
        font-size: 0.8rem;
        font-weight: 600;
        color: rgb(78, 78, 78);
        width: 30%;
        height: auto;
        .btn-img {
          width: 4rem;
          height: 4rem;
          margin: 0.5rem auto;
          border-radius: 50%;
          background-color: rgb(255, 196, 196);
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 50%;
            height: auto;
            // padding: 10px;
          }
        }
      }
      .record {
        background-image: linear-gradient(135deg, #abdcff 10%, #0396ff 100%);
        // background: url("../../assets/png/预约记录.png") no-repeat;
        // background-size: cover;
        // background-position: 60% 80%;
      }
      .upboard {
        background-image: linear-gradient(135deg, #ce9ffc 10%, #7367f0 100%);
        // background: url("../../assets/png/疫情上报.png") no-repeat;
        // background-size: cover;
        // background-position: 60% 80%;
      }
      .message {
        background-image: linear-gradient(135deg, #feb692 10%, #ea5455 100%);
        // background: url("../../assets/png/消息通知.png") no-repeat;
        // background-size: cover;
        // background-position: 60% 80%;
      }
    }
  }
  .more-service {
    padding-bottom: 60px;
    .personal-setting {
      width: 90%;
      height: auto;
      margin: 1.3rem auto 0.9rem auto;
      .p-header {
        // color: rgb(255, 117, 37);
        color: rgb(160, 160, 160);
        // color: rgb(87, 135, 255);
        font-size: 1rem;
        font-weight: bold;
        width: 100%;
        // text-indent: 0rem;
        line-height: 1.5rem;
      }
      .underline {
        width: 3rem;
        height: 3px;
        line-height: 0.5rem;
        background-color: rgb(255, 117, 37);
        // margin: 0rem 0rem 0.5rem 0rem;
        margin: 0.1rem 0rem 0.4rem 0rem;
      }
    }
    .setting-cell {
    }
    .login-out {
      width: 91%;
      height: auto;
      margin: 1rem auto;
      overflow: hidden;
      border-radius: 0.9rem;
      box-shadow: 0px 0px 8px 0px #ebebeb;
      button {
        color: #858585 !important;
        font-weight: 800;
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
/deep/ .van-cell__left-icon {
  padding: 5px 9px;
  background-color: black;
  border-radius: 50%;
  color: white;
  margin-right: 10px;
}
/deep/ .van-icon-idcard {
  background-color: #ff9e4e;
}
/deep/ .van-icon-phone-o {
  background-color: #3daeff;
}
/deep/ .van-icon-certificate {
  background-color: rgb(92, 221, 53);
}
/deep/ .van-cell__title {
  span {
    font-size: 1rem;
  }
}
/deep/ .van-icon-like-o {
  background-color: rgb(255, 116, 169);
}
/deep/ .van-icon-closed-eye {
  background-color: rgb(117, 85, 85);
}
/deep/ .van-icon-service-o {
  background-color: rgb(45, 206, 255);
}
/deep/ .van-cell-group--inset {
  border-radius: 1rem;
  box-shadow: 0px 0px 8px 0px #ebebeb;
}
</style>
