<template>
  <div class="appointment-container">
    <van-nav-bar
      title="预约记录"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
      :placeholder="true"
    />
    <div class="header-info">
      <h2>预约人信息</h2>
      <div class="basis-info">
        <div class="avatar">
          <img src="../../../assets/avatar.jpg" alt="" />
        </div>
        <div class="name">
          <div>赖**</div>
          <div>男 1998-05-12</div>
        </div>
      </div>
      <div class="code">
        <img src="../../../assets/二维码.png" alt="" />
      </div>
    </div>
    <div class="recordCards">
      <div class="card-one">
        <div class="info">
          <h2>
            新型冠状病毒灭活疫苗(Vero细胞) &nbsp;
            <van-tag size="medium" type="success">预约成功</van-tag>
          </h2>
          <div><span>预约号码：</span><span>95699805775352589</span></div>
          <div><span>预约日期：</span><span>2021/12/29(15:30~16:30)</span></div>
          <div><span>预约针次：</span><span>第三针</span></div>
          <div><span>生产企业：</span><span>北京科兴中维</span></div>
          <div><span>预约单位：</span><span>广州市荔湾区人民医院</span></div>
          <div><span>联系电话：</span><span>202-80805529</span></div>
        </div>
        <div class="opera">
          <button class="cancel">取消预约</button>
          <button class="seeDetail">查看详情</button>
        </div>
      </div>
      <div class="card-one">
        <div class="info">
          <h2>
            新型冠状病毒灭活疫苗(Vero细胞) &nbsp;
            <van-tag
              size="medium"
              type="success"
              color="#dadada"
              text-color="#808080"
              >取消预约</van-tag
            >
          </h2>
          <div><span>预约号码：</span><span>98692105775353586</span></div>
          <div><span>预约日期：</span><span>2021/12/29(10:30~11:30)</span></div>
          <div><span>预约针次：</span><span>第三针</span></div>
          <div><span>生产企业：</span><span>兰州生物</span></div>
          <div><span>预约单位：</span><span>广州市荔湾区人民医院</span></div>
          <div><span>联系电话：</span><span>202-80805529</span></div>
        </div>
        <div class="opera">
          <button class="already">已取消预约</button>
        </div>
      </div>
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
.appointment-container {
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: #f9fbfd;
  .header-info {
    width: 87%;
    margin: 0.8rem auto;
    padding: 8px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    background-color: white;
    box-shadow: 0px 0px 8px 0px #ebebeb;
    border-radius: 1rem;

    h2 {
      width: 100%;
      text-indent: 0.5rem;
      font-size: 1.1rem;
      margin: 0rem 0.5rem 0.5rem 0rem;
    }
    .basis-info {
      width: 60%;
      display: flex;
      .avatar {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        border: 1px solid #ebebeb;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 3rem;
          height: 3rem;
        }
      }
      .name {
        width: 60%;
        height: auto;
        margin-left: 1rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        div:nth-child(1) {
          width: 100%;
          height: 1rem;
          font-size: 1rem;
        }
        div:nth-child(2) {
          width: 100%;
          height: 1rem;

          font-size: 00.7rem;
          color: rgb(182, 182, 182);
        }
      }
    }
    .code {
      width: 20%;
      display: flex;
      justify-content: right;
      align-items: center;
      img {
        width: 2rem;
        height: 2rem;
      }
    }
  }
  .recordCards {
    // width: ;
    .card-one {
      width: 92%;
      margin: 1rem auto 0rem auto;
      box-shadow: 0px 0px 8px 0px #ebebeb;
      border-radius: 1rem;
      overflow: hidden;
      .info {
        padding: 8px 16px;
        display: flex;
        flex-wrap: wrap;
        background-color: #fff;
        h2 {
          width: 100%;
          font-size: 1rem;
          font-weight: 500;
          margin: 0.5rem 0rem;
        }
        div {
          width: 100%;
          height: auto;
          font-size: 0.9rem;
          color: #a3a3a3;
          margin-bottom: 0.3rem;
          // color: #dadada;
          display: flex;
          justify-content: space-between;
          span:nth-child(1) {
            width: 30%;
            height: auto;
          }
        }
      }
      .opera {
        width: 100%;
        padding: 0px;
        display: flex;
        button {
          flex: 1;
          height: 2.5rem;
          border: none;
          font-size: 0.9rem;
        }
        .seeDetail {
          color: white;
          background-color: rgb(72, 121, 255);
        }
        .cancel {
          color: #ffffff;
          // background-color: rgb(255, 73, 73);
          background-color: rgb(255, 58, 58);
          // border-right: 1px solid #ff3628;
          // border-top: 1px solid #ff3628;
        }
        .already {
          color: rgb(156, 156, 156);
          background-color: rgb(226, 226, 226);
        }
      }
    }
  }
}
</style>
