<template>
  <div class="map-container">
    <van-nav-bar
      title="疫苗预约"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
      :placeholder="true"
    />
    <van-empty v-if="!position" image="error" description="未找到相关位置" />
    <div class="main-cards" v-if="position">
      <van-divider :style="{ borderColor: '#e3e3e3', padding: '0 22px' }"
        >请选择接种点</van-divider
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
    <van-dialog
      v-model="show"
      title="匹配接种记录"
      confirm-button-text="预约"
      confirm-button-color="rgb(87, 135, 255)"
      show-cancel-button
      @confirm="toAppointment()"
    >
      <van-steps direction="vertical" :active="active">
        <van-step>
          <div class="title">
            第一针
            <span style="color: #b4b4b4; font-size: 0.8rem; font-weight: 600"
              >[北京科兴中维]</span
            >
          </div>
          <div class="record">
            <span>已接种</span>
            <span>2021-04-30</span>
          </div>
        </van-step>
        <van-step>
          <div class="title">
            第二针
            <span style="color: #b4b4b4; font-size: 0.8rem; font-weight: 600"
              >[北京科兴中维]</span
            >
          </div>
          <div class="record">
            <span>已接种</span>
            <span>2021-06-15</span>
          </div>
        </van-step>
        <van-step>
          <div class="title">第三针</div>
          <div class="record">
            <span>未接种</span>
          </div>
        </van-step>
      </van-steps>
    </van-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// // import AMap from "AMap";
// import { loadBMap } from "@/assets/map.js";
// import { fmtDate } from "@/utils/date";
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
      index: 1,
      district: "",
      location: {},
      position1: [
        {
          id: "4997511912901690333",
          title: "流沙西社区卫生服务中心预防接种门诊",
          address:
            "广东省揭阳市普宁市赤华南路广东省普宁市流沙第五小学北侧约40米",
          tel: "0663-2220003",
          category: "医疗保健:社区医院",
          type: 0,
          location: {
            lat: 23.296035,
            lng: 116.160005,
          },
          _distance: 603.56,
          ad_info: {
            adcode: 445281,
            province: "广东省",
            city: "揭阳市",
            district: "普宁市",
          },
        },
        {
          id: "6762762251988516650",
          title: "普宁明华体育馆新冠疫苗临时接种点",
          address: "广东省揭阳市普宁市体育路普宁明华体育馆",
          tel: "",
          category: "医疗保健:其它医疗保健",
          type: 0,
          location: {
            lat: 23.300302,
            lng: 116.156653,
          },
          _distance: 985.08,
          ad_info: {
            adcode: 445281,
            province: "广东省",
            city: "揭阳市",
            district: "普宁市",
          },
        },
        {
          id: "1221150921389326096",
          title: "普宁市流沙东社区卫生服务中心预防接种门诊",
          address: "广东省揭阳市普宁市流沙大道新光里30栋",
          tel: "0663-2626520;0663-2822992",
          category: "医疗保健:社区医院",
          type: 0,
          location: {
            lat: 23.296042,
            lng: 116.175444,
          },
          _distance: 1003.48,
          ad_info: {
            adcode: 445281,
            province: "广东省",
            city: "揭阳市",
            district: "普宁市",
          },
        },
        {
          id: "5562126684268841130",
          title: "普宁市流沙北街道社区卫生服务中心预防接种门诊",
          address: "广东省揭阳市普宁市已搬迁至建设局旁边",
          tel: "",
          category: "医疗保健:社区医院",
          type: 0,
          location: {
            lat: 23.298944,
            lng: 116.150437,
          },
          _distance: 1574.16,
          ad_info: {
            adcode: 445281,
            province: "广东省",
            city: "揭阳市",
            district: "普宁市",
          },
        },
      ],
      show: false,
      vaccineAddress: {},
      active: 2,
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
    getCity() {
      var data = {
        // key: 腾讯位置控制台申请的密钥
        key: "KIPBZ-CBQ64-AF6UN-DXH6C-G7TAO-AXFX4",
      };
      // 腾讯位置根据ip信息获取地理位置的接口
      var url = "https://apis.map.qq.com/ws/location/v1/ip";
      data.output = "jsonp";
      let res = this.$jsonp(url, data);
      // console.log(res);
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
      console.log(nearby);
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
      this.vaccineAddress = item;
      this.show = true;
      // this.toAppointment(item);
      // this.$router.push({
      //   name: "AppointmentDetail",
      //   params: item,
      // });
    },
    toAppointment() {
      // console.log(this.vaccineAddress);
      // console.log("缺人");
      this.$router.push({
        name: "AppointmentDetail",
        params: this.vaccineAddress,
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.initCity();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // this.initCity();
  },
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
