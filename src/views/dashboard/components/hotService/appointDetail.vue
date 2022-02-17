<template>
  <div class="appoint-container">
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
          placeholder="请输入接种人"
          label="接种人"
          v-model="form.name"
        />
        <van-field
          placeholder="请选择性别"
          label="性别"
          v-model="form.gender"
        />
        <van-field
          placeholder="请选择人群分类"
          label="人群分类"
          v-model="form.classification"
        />
        <van-field
          placeholder="请选择证件类型"
          label="证件类型"
          value="身份证"
        />
        <van-field
          placeholder="请输入证件号码"
          label="证件号码"
          v-model="form.identityID"
        />
        <van-field
          placeholder="请输入联系电话"
          label="联系电话"
          type="tel"
          v-model="form.phone"
        />
      </van-cell-group>
    </div>
    <div class="from-header">
      <van-cell-group>
        <van-field label="疫苗名称" v-model="form.injection_name" readonly />
        <van-field
          readonly
          clickable
          name="picker"
          label="针次"
          v-model="form.injection_number"
        />
        <van-field
          type="textarea"
          autosize
          rows="1"
          label="接种点"
          v-model="form.address"
          readonly
        />
      </van-cell-group>
    </div>
    <div class="form-container">
      <van-cell-group>
        <van-cell
          title="选择预约日期"
          v-model="form.date"
          @click="show = true"
        />
        <van-calendar
          v-model="show"
          @select="onSelect"
          color="rgb(87, 135, 255)"
          :show-confirm="false"
          :min-date="minDate"
          :max-date="maxDate"
        />
        <div class="peroidSelect">
          <div class="tips">
            <h3>请预约上一针接种180天后的日期。</h3>
            <h3>可预约时间段：</h3>
          </div>
          <div
            :class="{
              disabled: item.remain == 0,
              actived: activeKey == i && item.remain != 0,
            }"
            class="period"
            v-for="(item, i) in period"
            :key="i"
            @click="selected(i, item)"
          >
            <div class="time">{{ item.time }}</div>
            <div class="type">
              <van-tag
                color="rgb(215, 241, 231)"
                text-color="rgb(14, 168, 125)"
                size="medium"
                >{{ item.type }}</van-tag
              >
            </div>
            <div class="numbers">剩余剂量：{{ item.remain }}</div>
          </div>
        </div>
        <div class="submitBtn">
          <van-button round block type="primary" @click="submitForm"
            >提交预约</van-button
          >
        </div>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { timeJson1 } from "@/api/timeSelect";
export default {
  components: {},
  props: {},
  data() {
    //这里存放数据
    return {
      vaccineNumber: "",
      showPicker: false,
      value: "第三针",
      vaccinePoint: "",
      item: {},
      form: {
        name: "赖喜铃",
        gender: "男",
        identityID: "445281**********90",
        phone: "17876374525",
        classification: "学生",
        injection_name: "新型冠状病毒灭活疫苗(Vero细胞)",
        injection_number: "第三针",
        address: "",
        date: this.formatDate(new Date()),
        period: {},
        submitTime: "",
      },
      // defaultDate: new Date(),
      minDate: new Date(),
      maxDate: new Date(new Date().getTime() + 86400000 * 7),

      show: false,
      period: [],
      activeKey: null,
    };
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getPeriod() {
      this.period = timeJson1.data;
      console.log(timeJson1);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    formatDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onSelect(date) {
      this.show = false;
      this.date = this.formatDate(date);
    },
    getDateTest() {
      let minDate = new Date();
      let timeNumber = new Date().getTime() + 86400000 * 7;
      let maxDate = new Date(timeNumber);
      this.minDate = minDate;
      this.minDate = maxDate;
    },
    selected(key, item, obj) {
      if (item.remain == 0) {
        return this.$toast.fail("该时间段剂量不足");
      }
      this.activeKey = key;
      this.form.period = item;
    },
    submitForm() {
      // this.$toast.loading({
      //   message: "正在提交...",
      //   forbidClick: true,
      //   loadingType: "spinner",
      // });
      this.$toast.success({
        message: "提交成功，请关注预约记录",
        forbidClick: true,
        loadingType: "spinner",
      });
      this.$router.push("/dashboard");
      // this.$toast.clear();
      // console.log(this.form);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // this.getDateTest();
    this.getPeriod();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // this.getDateTest();
    this.form.address = this.$route.params.title;
  },
};
</script>
<style lang="scss" scoped>
.appoint-container {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #f9fbfd;
  .identi {
    margin-bottom: 1rem;
    box-shadow: 0px 0px 8px 0px #ebebeb;
  }
  .from-header {
    margin-bottom: 1rem;
    box-shadow: 0px 0px 8px 0px #ebebeb;
  }
  .form-container {
    margin-bottom: 1rem;
    padding-bottom: 15px;
    box-shadow: 0px 0px 8px 0px #ebebeb;
    .peroidSelect {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      padding: 10px 0px;
      .tips {
        width: 100%;
        text-align: center;
        margin-bottom: 0.6rem;
        h3 {
          font-weight: 400;
          font-size: 0.8rem;
          line-height: 1.2rem;
          margin: 0 auto;
          color: rgb(158, 158, 158);
        }
      }
      .period {
        position: relative;
        z-index: 3;
        overflow: hidden;
        width: 40%;
        height: auto;
        padding: 5px;
        border-radius: 0.5rem;
        border: 1px solid rgb(238, 238, 238);
        // box-shadow: 0px 0px 8px 0px #ebebeb;
        margin-bottom: 0.8rem;
        text-align: center;
        line-height: 1.3rem;
        .time {
          font-size: 0.9rem;
        }
        .type {
          font-size: 0.7rem;
        }
        .numbers {
          font-size: 0.7rem;
          color: rgb(216, 46, 33);
          // color: rgb(14, 168, 125);
          // color: rgb(215, 241, 231);
        }
      }
    }
    .submitBtn {
      width: 90%;
      margin: 0 auto;
    }
  }
  /deep/ .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border: none;
  }
}
.disabled {
  // color: #ebebeb;
  filter: grayscale(1);
}
.actived {
  // position: relative;
  border: 1px solid rgb(40, 177, 97) !important;
}
.actived::before {
  position: absolute;
  display: block;
  border-top: 28px solid rgb(40, 177, 97);
  border-left: 28px solid transparent;
  top: 0;
  right: 0;
  content: "";
  z-index: 1;
}
.actived::after {
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
</style>
