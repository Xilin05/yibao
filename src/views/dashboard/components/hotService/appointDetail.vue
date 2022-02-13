<template>
  <div class="appoint-container">
    <van-nav-bar
      title="填写预约"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
      :placeholder="true"
    />
    <div class="identi"></div>
    <div class="from-header">
      <van-cell-group>
        <van-field
          label="疫苗名称"
          value="新型冠状病毒灭活疫苗(Vero细胞)"
          readonly
        />
        <van-field
          readonly
          clickable
          name="picker"
          label="针次"
          :value="value"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
        <van-field
          type="textarea"
          autosize
          rows="1"
          label="接种点"
          :value="item.title"
          readonly
        />
      </van-cell-group>
    </div>
    <div class="form-container"></div>
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
      vaccineNumber: "",
      showPicker: false,
      columns: [
        { text: "第一针(已接种)", disabled: true },
        { text: "第二针(已接种)", disabled: true },
        { text: "第三针", disabled: false },
      ],
      value: "第三针",
      vaccinePoint: "",
      item: {},
    };
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onClickLeft() {
      // this.$toast.success("返回");
      this.$router.go(-1);
    },
    onConfirm(value) {
      console.log(value.text);
      // this.value = value;
      this.showPicker = false;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.item = this.$route.params;
  },
};
</script>
<style lang="scss" scoped>
.appoint-container {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #f9fbfd;

  /deep/ .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border: none;
  }
}
</style>
