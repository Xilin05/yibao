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
          label="受诊人"
          placeholder="请输入受诊人员"
        />
        <van-field
          v-model="form.phoneNumber"
          label="电话号码"
          placeholder="请输入电话号码"
        />
        <van-field
          v-model="form.addressName"
          label="预约机构"
          placeholder="请选择预约医院/机构"
          readonly
        />
        <van-field
          readonly
          clickable
          :value="form.department"
          label="预约科室"
          name="departmentPicker"
          placeholder="点击选择预约科室"
          @click="showPicker = true"
        />
        <van-popup round v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="department"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
      </van-cell-group>
      <div></div>
    </div>
    <div class="forminfo"></div>
    <div class="formtime">
      <div class="days">
        <div v-for="(item, i) in days" :key="i">
          {{ item.weekday }}
          <div
            :class="{
              day_Actived: dayActived == i,
            }"
            class="day"
            @click="selectDay(i, item)"
          >
            {{ item.day }}
          </div>
        </div>
      </div>
      <div class="times">
        <div
          :class="{
            timeDisabled: item.resources == 0,
            timeActived: weekdayActiced == j && item.resources != 0,
          }"
          class="timeCard"
          v-for="(item, j) in resources"
          :key="j"
          @click="selectWeekDay(j, item)"
        >
          <div class="time">{{ item.time }}</div>
          <div class="number">
            <van-tag
              color="rgb(220, 230, 255)"
              text-color="rgb(46, 106, 255)"
              size="medium"
              >号源：{{ item.resources }}</van-tag
            >
          </div>
        </div>
      </div>
    </div>
    <div class="tips">
      <div>温馨提示：</div>
      <div>1. 线上预约不收取任何费用，线下现场再进行支付。</div>
      <div>2. 为了不占取资源，请预约适合自己的时间段，</div>
      <div>3. 预约后若没有到达现场就诊将记录进入系统。</div>
      <div>4. 成功提交预约后可以在个人中心页面查看预约记录。</div>
    </div>
    <van-submit-bar
      :price="0"
      button-text="提交预约"
      button-color="rgb(87, 135, 255)"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { dayJson } from "@/api/timeSelect";
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
        addressName: "",
        department: "",
        date: "",
        time: "",
        submitTime: "",
      },
      days: [],
      weekday: [],
      resources: [],
      weekdayActiced: null,
      dayActived: 0,
      showPicker: false,
      department: [
        "中医科",
        "产科",
        "儿科",
        "内科",
        "口腔颌面科",
        "外科",
        "妇科",
        "报告解读科",
        "整形美容科",
        "男科",
        "皮肤性病科",
        "眼科",
        "精神心理科",
        "耳鼻咽喉科",
        "肿瘤及防治科",
        "营养科",
        "骨伤科",
      ],
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
    initDate() {
      this.resources = dayJson[0];
      let days = [];
      for (let i = 0; i <= 5; i++) {
        let obj = {};
        let test = new Date().getTime() + 86400000 * i;
        let date = new Date(test);
        obj.day = `${date.getMonth() + 1}/${date.getDate()}`;
        obj.weekday = "周" + "日一二三四五六".charAt(date.getDay());
        days.push(obj);
      }
      this.days = days;
    },
    formatDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(value) {
      console.log(value);
      this.form.department = value;
      this.showPicker = false;
    },
    selectDay(key, item) {
      this.dayActived = key;
      this.resources = dayJson[key];
    },
    selectWeekDay(key, item) {
      if (item.resources == 0) {
        return this.$toast.fail("号源不足，不予预约");
      }
      this.weekdayActiced = key;
    },
    onSubmit() {
      this.$toast.success("提交预约成功！");
      this.$router.push("/dashboard");
    },
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
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #f9fbfd;
  .identi {
    box-shadow: 0px 0px 8px 0px #ebebeb;
  }
  .forminfo {
  }
  .formtime {
    width: 100%;
    height: auto;
    margin-top: 1rem;
    padding: 8px 0px;
    background-color: #fff;
    box-shadow: 0px 0px 8px 0px #ebebeb;
    .days {
      width: 100%;
      height: auto;
      padding: 5px 0px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ebebeb;
      div {
        // width: $(100/6);
        flex: 1;
        height: 100%;
        line-height: 1rem;
        text-align: center;
        font-size: 0.9rem;
        color: gray;
        border: 1px 0px 1px 1px solid #ebebeb;
        .day {
          padding: 5px;
          border-radius: 50%;
          height: 2rem;
          width: 2rem;
          line-height: 2rem;
          margin: 0.3rem auto;
        }
      }
      div:last-child() {
        border: 1px 1px 1px 0px solid #ebebeb;
      }
    }
    .times {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 1rem;
      .timeCard {
        position: relative;
        z-index: 3;
        overflow: hidden;
        width: 25%;
        height: auto;
        padding: 10px 6px;
        border-radius: 0.5rem;
        border: 1px solid rgb(238, 238, 238);
        // box-shadow: 0px 0px 8px 0px #ebebeb;
        margin-bottom: 0.8rem;
        text-align: center;
        line-height: 1.5rem;
        .time {
          font-size: 0.9rem;
        }
        .number {
          font-size: 0.7rem;
        }
      }
    }
  }
  .tips {
    margin-top: 1rem;
    font-size: 00.8rem;
    color: #a1a1a1;
    padding: 0px 16px;
    line-height: 1.3rem;
  }
  /deep/ .van-submit-bar {
    box-shadow: 0px 0px 8px 0px #ebebeb;
  }
}
.day_Actived {
  color: white !important;
  background-color: rgb(46, 106, 255);
  // background-color: rgb(220, 230, 255);
}
.timeActived {
  // position: relative;
  border: 1px solid rgb(87, 135, 255) !important;
  box-sizing: content-box;
}
.timeActived::before {
  position: absolute;
  display: block;
  border-top: 28px solid rgb(87, 135, 255);
  border-left: 28px solid transparent;
  top: 0;
  right: 0;
  content: "";
  z-index: 1;
}
.timeActived::after {
  font: normal normal normal 14px/1 "vant-icon";
  position: absolute;
  display: block;
  right: 2px;
  top: 2px;
  content: "\e728";
  // content: "\e013";
  // font-size: 10pt;
  font-weight: normal;
  z-index: 2;
  color: #fff;
}
.timeDisabled {
  filter: grayscale(1);
}
</style>
