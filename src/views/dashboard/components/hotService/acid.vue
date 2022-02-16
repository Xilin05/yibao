<template>
  <div class="map-container">
    <van-nav-bar
      title="核酸预约"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
      :placeholder="true"
    />
    <van-empty
      v-if="position.length == 0"
      image="error"
      description="未找到相关位置"
    />
    <div class="main-cards" v-if="position.length != 0">
      <van-divider :style="{ borderColor: '#e3e3e3', padding: '0 22px' }"
        >请选择核酸检测机构</van-divider
      >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getNextPage()"
      >
        <div
          class="position-card"
          v-for="(item, i) in position"
          :key="i"
          @click="toDetail(item)"
        >
          <h2>{{ i + 1 }}. {{ item.title }}</h2>
          <div>
            <span>地址：</span>
            <span>
              {{ item.address }}
            </span>
          </div>
          <!-- <div class="otherInfo"> -->
          <div>
            <span>电话：</span>
            <span v-if="item.tel">
              {{ item.tel }}
            </span>
            <span v-if="!item.tel">暂无</span>
          </div>
          <div>
            <span>距离：</span>
            <span> {{ item._distance | filteDestinate }}km </span>
          </div>
          <!-- </div> -->
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  filters: {
    filteDestinate: function (dictinc) {
      let dic = dictinc / 1000;
      return dic.toFixed(2);
    },
  },
  components: {},
  props: {},
  data() {
    //这里存放数据
    return {
      position: [],
      loading: false,
      finished: false,
      location: {},
      show: false,
      acidAddress: {},
    };
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
    async initCity() {
      this.$toast.loading({
        message: "正在定位...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      var data = {
        // key: 腾讯位置控制台申请的密钥
        key: "KIPBZ-CBQ64-AF6UN-DXH6C-G7TAO-AXFX4",
      };
      // 腾讯位置根据ip信息获取地理位置的接口
      var url = "https://apis.map.qq.com/ws/location/v1/ip";
      data.output = "jsonp";
      let res = await this.$jsonp(url, data);
      console.log("初始化位置", res);
      if (res.status == 0) {
        this.district = res.result.ad_info.district;
        this.location = res.result.location;
        this.searchOrganize(res.result.ad_info.district, res.result.location);
      } else {
        this.$toast.fail("定位失败！");
      }
    },
    async searchOrganize(district, params) {
      // let nearby = "nearby(" + params.lat + "," + params.lng + "," + "1000,1)";
      let nearby =
        "region(" + district + ",2," + params.lat + "," + params.lng + ")";
      let category = "category=医疗保健";
      var data = {
        boundary: nearby,
        page_size: 20,
        page_index: 1,
        keyword: "核酸",
        filter: category,
        orderby: "_distance",
        // key: 腾讯位置控制台申请的密钥
        key: "KIPBZ-CBQ64-AF6UN-DXH6C-G7TAO-AXFX4",
      };
      // 腾讯位置根据ip信息获取地理位置的接口
      var url = "https://apis.map.qq.com/ws/place/v1/search";
      data.output = "jsonp";
      let res = await this.$jsonp(url, data);
      console.log("获取机构", res);
      if (res.status == 0) {
        this.$toast.clear();
        this.position = res.data;
        if (res.count <= 20) {
          this.finished = true;
        }
      } else {
        this.$toast({
          message: "定位失败",
          forbidClick: true,
          duration: 2000,
          loadingType: "spinner",
          icon: "cross",
        });
      }
    },
    async getNextPage() {
      if (!this.location.lat || !this.location.lng) {
        this.loading = false;
        return;
      }
      this.index += 1;
      let nearby =
        "region(" +
        this.district +
        ",2," +
        this.location.lat +
        "," +
        this.location.lng +
        ")";
      let category = "category=医疗保健";
      var data = {
        boundary: nearby,
        page_size: 20,
        page_index: this.index,
        keyword: "接种",
        filter: category,
        orderby: "_distance",
        // key: 腾讯位置控制台申请的密钥
        key: "KIPBZ-CBQ64-AF6UN-DXH6C-G7TAO-AXFX4",
      };
      // 腾讯位置根据ip信息获取地理位置的接口
      var url = "https://apis.map.qq.com/ws/place/v1/search";
      data.output = "jsonp";
      let res = await this.$jsonp(url, data);
      // console.log(res);
      if (res.status == 0) {
        this.position.push(...res.data);
        if (res.data.length < 20) {
          this.finished = true;
        }
      } else {
        // this.getNextPage();
        this.$toast({
          message: "获取失败",
          forbidClick: true,
          duration: 2000,
          loadingType: "spinner",
          icon: "cross",
        });
      }
      this.loading = false;
    },
    toDetail(item) {
      // this.vaccineAddress = item;
      // this.show = true;
      // this.toAppointment(item);
      this.$router.push({
        name: "AcidAppointment",
        params: item,
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.initCity();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>
<style lang="scss" scoped>
.map-container {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #f9fbfd;
  .main-cards {
    width: 100%;
    .position-card {
      width: 80%;
      height: auto;
      padding: 10px 16px;
      border-radius: 0.5rem;
      margin: 0.8rem auto 0rem auto;
      background-color: #ffffff;
      box-shadow: 0px 0px 8px 0px #ebebeb;
      h2 {
        margin: 0.2rem;
        font-size: 1rem;
        color: rgb(48, 48, 48);
      }
      div {
        width: 100%;
        font-size: 0.9rem;
        color: rgb(155, 155, 155);
        display: flex;
        justify-content: space-between;
        span:nth-child(1) {
          line-height: 1.3rem;
          width: 15%;
          height: auto;
        }
        span:nth-child(2) {
          line-height: 1.3rem;
          height: auto;
          width: 84%;
        }
      }
    }
    .tips {
      margin-top: 1rem;
      font-size: 0.8rem;
      color: #b6b6b6;
      text-align: center;
    }
  }

  /deep/ .van-divider {
    margin: 8px 0;
  }
  /deep/ .van-step__title {
    width: 95%;
    display: flex;
    margin: 0 auto;
    align-items: center;
    padding: 10px 0px;
    .title {
      // background-color: rgb(206, 206, 206);
      font-size: 0.9rem;
      font-weight: 600;
      width: 70%;
      // color: black;
    }
    .record {
      width: 30%;
      font-size: 0.7rem;
      font-weight: 400;
      color: #9e9e9e;
      display: flex;
      flex-wrap: wrap;
      text-align: right;
      span {
        width: 100%;
      }
    }
  }
  /deep/ .van-dialog__content {
    width: 95%;
    margin: 0 auto;
  }
  // /deep/ .van-step--vertical:not(:last-child)::after {
  //   border: none;
  // }
}
</style>
