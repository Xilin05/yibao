<template>
  <div class="aciddetail-container">
    <van-nav-bar
      title="预约信息提交"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
      :placeholder="true"
    />
    <div class="identi">
      <van-cell-group>
        <van-field
          v-model="form.name"
          label="受测者"
          placeholder="请输入受检测人员"
        />
        <van-field
          v-model="form.phoneNumber"
          label="电话号码"
          placeholder="请输入受检测人员"
        />
        <van-field
          v-model="form.identityID"
          label="证件号码"
          placeholder="请输入受检测人员"
        />
        <van-field
          v-model="form.addressName"
          label="预约门诊"
          placeholder="请输入受检测人员"
        />
      </van-cell-group>
      <div></div>
    </div>
    <div class="forminfo"></div>
    <div class="formtime"></div>
    {{ form.addressName }}
    <van-submit-bar
      :price="0"
      button-text="提交预约"
      button-color="#7367F0"
      @submit="onSubmit"
    />
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
      form: {
        name: "赖喜铃",
        phoneNumber: "17876374525",
        identityID: "4452************90",
        addressName: "",
        date: "",
        time: "",
        submitTime: "",
        days: [],
        weekday: [],
      },
    };
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    initDate() {
      let date = new Date();
      let str = "周" + "日一二三四五六".charAt(date.getDay());
      // console.log(date.getDate());
      this.today = date.getDate();
      this.weekday = str;
    },
    onClickLeft() {
      // this.$toast.success("返回");
      this.$router.go(-1);
    },
    formatDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onSubmit() {},
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.initDate();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.form.addressName = this.$route.params.title;
  },
};
</script>
<style lang="scss" scoped>
.aciddetail-container {
  // color: ;
  // background-image: linear-gradient(135deg, #abdcff 10%, #0396ff 100%);
  // background-image: linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%);
  .identi {
  }
  .forminfo {
  }
  .formtime {
  }
}
</style>
