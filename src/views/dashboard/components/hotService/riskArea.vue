<template>
  <div class="risk-container">
    <van-nav-bar
      title="风险区域"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
      :placeholder="true"
    />
    <van-tabs
      sticky
      offset-top="46px"
      type="card"
      :border="false"
      v-model="activeName"
      animated
      title-active-color=""
      title-inactive-color="rgb(153, 153, 153)"
      :swipeable="true"
      color="rgb(255, 117, 37)"
    >
      <van-tab title="风险区域分布" name="a">
        <div class="area-container">
          <div class="header">
            <div class="title">
              <img src="../../../../assets/png/高风险.png" alt="" />
              高风险地区<span style="color: red">{{ highCount }}</span
              >个
            </div>
            <div class="content">数据截至 {{ updateTime }}</div>
          </div>
          <div class="highArea" v-for="(item, i) in highArea" :key="i">
            <table class="t-table" cellspacing="0" cellpadding="0">
              <tr>
                <th colspan="3" class="t-title">
                  {{ item[0].province }}
                </th>
              </tr>
              <tr
                v-for="(item1, j) in item"
                :key="j"
                :style="
                  j % 2 == 1
                    ? 'background-color: #fafafa;'
                    : 'background-color: #fff;'
                "
              >
                <td class="city">
                  {{ item1.city }}
                </td>
                <td class="county">
                  {{ item1.county }}
                </td>
                <td class="community">
                  <div
                    class="one"
                    v-for="(item2, k) in item1.communitys"
                    :key="k"
                  >
                    {{ item2 }}
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div class="header">
            <div class="title">
              <img src="../../../../assets/png/中风险.png" alt="" />
              中风险地区<span style="color: red">{{ middleCount }}</span
              >个
            </div>
            <div class="content">数据截至 {{ updateTime }}</div>
          </div>
          <div
            class="highArea"
            v-for="(item, i) in middleArea"
            :key="'middleInfo' + i"
          >
            <table class="t-table" cellspacing="0" cellpadding="0">
              <tr>
                <th colspan="3" class="t-title">
                  {{ item[0].province }}
                </th>
              </tr>
              <tr
                v-for="(item1, j) in item"
                :key="j"
                :style="
                  j % 2 == 1
                    ? 'background-color: #fafafa;'
                    : 'background-color: #fff;'
                "
              >
                <td class="city">
                  {{ item1.city }}
                </td>
                <td class="county">
                  {{ item1.county }}
                </td>
                <td class="community">
                  <div
                    class="one"
                    v-for="(item2, k) in item1.communitys"
                    :key="k"
                  >
                    {{ item2 }}
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div class="notice">
            <h2>其他说明</h2>
            以县市区为单位<br />
            <span style="color: rgb(87, 135, 255)">低风险地区:</span>
            无确诊病例或连续14天无新增确诊病例为低风险地区;<br />
            <span style="color: rgb(253, 204, 64)">中风险地区:</span>
            14天内有新增确诊病例,累计确诊病例不超过50例,或累计确诊病例超过50例,14天内未发生聚集性疫情为中风险地区;<br />
            <span style="color: red">高风险地区:</span>
            累计确诊病例超过50例,14天内有聚集性疫情发生为高风险地区。
          </div>
        </div>
      </van-tab>
      <van-tab title="出行政策查询" name="b">
        <div class="search-policy">
          <!-- <van-form @submit="onSubmit" @failed="onFailed"> -->
          <van-field
            readonly
            clickable
            name="from-area"
            :value="fromArea"
            label="请选择出发地"
            placeholder="点击选择城市"
            @click="showFromArea = true"
          />
          <van-field
            readonly
            clickable
            name="to-area"
            :value="toArea"
            label="请选择目的地"
            placeholder="点击选择城市"
            @click="showToArea = true"
          />
          <div class="more-btn">
            <van-button
              :loading="isSearch"
              type="primary"
              block
              size="small"
              color="linear-gradient( 135deg, #FEC163 10%, #ff7525 100%)"
              @click="searchPolicy(policy)"
              >查看政策</van-button
            >
          </div>
          <!-- 出发地绑定的 -->
          <van-popup
            v-model="showFromArea"
            position="bottom"
            round
            :get-container="getContainer"
            :style="{ height: '50%' }"
          >
            <van-area
              title="选择出发地"
              columns-num="2"
              :area-list="areaList"
              @confirm="onConfirmFrom"
              @cancel="showFromArea = false"
            />
          </van-popup>
          <!-- 目的地绑定的 -->
          <van-popup
            v-model="showToArea"
            position="bottom"
            round
            :get-container="getContainer"
            :style="{ height: '50%' }"
          >
            <van-area
              title="选择目的地"
              columns-num="2"
              :area-list="areaList"
              @confirm="onConfirmTo"
              @cancel="showToArea = false"
            />
          </van-popup>
          <!-- </van-form> -->
        </div>
        <van-empty
          v-if="policyResult == null"
          description="请选择地区进行检索"
        />
        <div style="padding-bottom: 80px">
          <div class="showPolicy" v-if="policyResult">
            <!-- 出发地政策 -->
            <div class="from-info">
              <div class="title">
                出发地：<span style="color: black; font-size: 0.9rem">{{
                  policyResult.from_info.city_name
                }}</span>
              </div>
              <div class="high-in">
                <van-empty
                  v-if="!policyResult.from_info"
                  description="暂无信息"
                />
                <div class="high-desc" v-if="policyResult.from_info">
                  <van-collapse v-model="activeNames">
                    <van-collapse-item
                      title="高风险地区，进入本地政策"
                      name="1"
                    >
                      <span v-if="!policyResult.from_info.high_in_desc"
                        >暂无相关信息</span
                      >
                      <div class="content">
                        {{ policyResult.from_info.high_in_desc }}
                      </div>
                    </van-collapse-item>
                    <van-collapse-item
                      title="低风险地区，进入本地政策"
                      name="2"
                    >
                      <div class="content">
                        {{ policyResult.from_info.low_in_desc }}
                      </div>
                    </van-collapse-item>
                    <van-collapse-item title="本地出行政策" name="3">
                      <div class="content">
                        {{ policyResult.from_info.out_desc }}
                      </div>
                    </van-collapse-item>
                  </van-collapse>
                  <div class="health-code">
                    <h2>
                      {{ policyResult.from_info.health_code_name }}
                      <van-tag color="#7232dd">
                        <span
                          v-if="policyResult.from_info.health_code_style == '0'"
                          >小程序</span
                        >
                        <span
                          v-if="policyResult.from_info.health_code_style == '1'"
                          >二维码</span
                        >
                        <span
                          v-if="
                            policyResult.from_info.health_code_style == '其他'
                          "
                          >未知</span
                        >
                      </van-tag>
                    </h2>
                    <div class="picture">
                      <img
                        :src="policyResult.from_info.health_code_picture"
                        alt=""
                      />
                    </div>
                    <h2>{{ policyResult.from_info.health_code_desc }}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="showPolicy" v-if="policyResult">
            <!-- 目的地政策 -->
            <div class="from-info">
              <div class="title">
                目的地：<span style="color: black; font-size: 0.9rem">{{
                  policyResult.to_info.city_name
                }}</span>
              </div>
              <div class="high-in">
                <van-empty
                  v-if="!policyResult.to_info"
                  description="暂无信息"
                />
                <div class="high-desc" v-if="policyResult.to_info">
                  <van-collapse v-model="activeNames">
                    <van-collapse-item
                      title="高风险地区，进入本地政策"
                      name="4"
                    >
                      <span v-if="!policyResult.to_info.high_in_desc"
                        >暂无相关信息</span
                      >
                      <div class="content">
                        {{ policyResult.to_info.high_in_desc }}
                      </div>
                    </van-collapse-item>
                    <van-collapse-item
                      title="低风险地区，进入本地政策"
                      name="5"
                    >
                      <div class="content">
                        {{ policyResult.to_info.low_in_desc }}
                      </div>
                    </van-collapse-item>
                    <van-collapse-item title="本地出行政策" name="6">
                      <div class="content">
                        {{ policyResult.to_info.out_desc }}
                      </div>
                    </van-collapse-item>
                  </van-collapse>
                  <div class="health-code">
                    <h2>
                      {{ policyResult.to_info.health_code_name }}
                      <van-tag color="#7232dd">
                        <span
                          v-if="policyResult.to_info.health_code_style == '0'"
                          >小程序</span
                        >
                        <span
                          v-if="policyResult.to_info.health_code_style == '1'"
                          >二维码</span
                        >
                        <span
                          v-if="
                            policyResult.to_info.health_code_style == '其他'
                          "
                          >未知</span
                        >
                      </van-tag>
                    </h2>
                    <div class="picture">
                      <img
                        :src="policyResult.to_info.health_code_picture"
                        alt=""
                      />
                    </div>
                    <h2>{{ policyResult.to_info.health_code_desc }}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <div class="footer">
      <div>广软疫宝</div>
      <div>提供优质服务</div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { riskAreaJson } from "@/api/news.js";
import { getAreaRiskLevel } from "@/api/getData.js";
import { areaList } from "@vant/area-data";
import { cityJson } from "@/api/city";
import { gzToXaJson } from "@/api/guangzhouToXian";
// import { getCityID } from "@/api/getData";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data() {
    //这里存放数据
    return {
      activeName: "a",
      highCount: 0,
      middleCount: 0,
      updateTime: "",
      highArea: [],
      middleArea: [],
      fromArea: "广东省，广州市",
      toArea: "陕西省，西安市",
      policy: {
        fromArea: ["广东省", "广州市"],
        toArea: ["陕西省", "西安市"],
      },
      showFromArea: false,
      showToArea: false,
      areaList: areaList, // 数据格式见 Area 组件文档
      isSearch: false,
      cityList: [],
      policyResult: null,
      activeNames: [],
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
    async getArea() {
      let { data } = await getAreaRiskLevel();
      console.log(data);
      this.highCount = data.result.high_count;
      this.middleCount = data.result.middle_count;
      this.updateTime = data.result.end_update_time;
      // console.log(riskAreaJson.result.high_list);
      // console.log(riskAreaJson.result.middle_list);
      // this.highCount = riskAreaJson.result.high_count;
      // this.middleCount = riskAreaJson.result.middle_count;
      // this.updateTime = riskAreaJson.result.updated_date;
      // let highlist = riskAreaJson.result.high_list;
      // let middlelist = riskAreaJson.result.middle_list;
      let highlist = data.result.high_list;
      let middlelist = data.result.middle_list;
      let result1 = this.sortClass(highlist);
      this.highArea = result1;
      let result2 = this.sortClass(middlelist);
      this.middleArea = result2;
      // console.log(result1);
      // console.log(result2);
    },

    sortClass(sortData) {
      const groupBy = (array, f) => {
        let groups = {};
        array.forEach((o) => {
          let group = JSON.stringify(f(o));
          groups[group] = groups[group] || [];
          groups[group].push(o);
        });
        return Object.keys(groups).map((group) => {
          return groups[group];
        });
      };
      const sorted = groupBy(sortData, (item) => {
        // console.log("分组的对象", item.name);
        return item.province; // 返回需要分组的对象
      });
      // console.log(sorted);
      return sorted;
    },
    getContainer() {
      return document.querySelector(".risk-container");
    },
    onSubmit(values) {
      console.log("submit", values);
    },
    onConfirmFrom(values) {
      this.policy.fromArea = values
        .filter((item) => !!item)
        .map((item) => item.name);
      this.fromArea = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("，");
      this.showFromArea = false;
    },
    onConfirmTo(values) {
      this.policy.toArea = values
        .filter((item) => !!item)
        .map((item) => item.name);
      this.toArea = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("，");
      this.showToArea = false;
    },
    searchPolicy(area) {
      // console.log(area);
      // this.isSearch = true;
      // if (area.fromArea.length == 0 || area.toArea.length == 0) {
      //   this.isSearch = false;
      //   return this.$toast.fail("出发地/目的地需填写完整");
      // } else {
      // if (res.error_code != 0) {
      //   return this.$toast({
      //     message: "检索失败！请重试",
      //     icon: "cross",
      //   });
      // }
      // 检索城市id
      let list = this.cityList;
      let fromProvince = this.strSlice(area.fromArea[0]);
      let fromCity = this.strSlice(area.fromArea[1]);
      let toProvince = this.strSlice(area.toArea[0]);
      let toCity = this.strSlice(area.toArea[1]);
      let fromCityID = 0;
      let toCityID = 0;
      list.forEach((item) => {
        if (item.province == fromProvince) {
          console.log(item.province);
          item.citys.forEach((childItem) => {
            if (childItem.city == fromCity) {
              fromCityID = childItem.city_id;
              console.log(fromCityID);
            }
          });
        }
        if (item.province == toProvince) {
          console.log(item.province);
          item.citys.forEach((childItem) => {
            if (childItem.city == toCity) {
              toCityID = childItem.city_id;
              console.log(toCityID);
            }
          });
        }
      });
      // 进行异步请求
      this.policyResult = gzToXaJson.result;
      // this.isSearch = false;
      // }
    },
    getCityList() {
      // console.log(this.policyResult);
      this.cityList = cityJson.result;
    },
    strSlice(str) {
      return str.slice(0, str.length - 1);
    },
    match() {},
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getArea();
    this.getCityList();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>
<style lang="scss" scoped>
.risk-container {
  // background-image: linear-gradient( 135deg, #FEC163 10%, #de5e13 100%);
  // color: #ff7525;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  position: relative;
  .area-container {
    // width: 100%;
    padding: 10px 8px 80px 8px;
    // background-color: #f9fbfd;
    .header {
      // width: 100%;
      margin: 0.5rem auto 1rem auto;
      .title {
        display: flex;
        align-items: center;
        font-size: 0.9rem;
        font-weight: 800;
        color: rgb(66, 66, 66);
        img {
          width: 1.5rem;
          height: 1.5rem;
        }
      }
      .content {
        font-size: 0.7rem;
        color: rgb(160, 160, 160);
        margin: 3px 0;
      }
    }
    .highArea {
      width: 100%;
      height: auto;
      padding: 5px 0px;
      table {
        width: 100%;
        border-right: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
        tr td {
          border-left: 1px solid #ebeef5;
          border-top: 1px solid #ebeef5;
          font-size: 0.8rem;
          text-align: center;
        }
        .t-title {
          height: 2rem;
          background-color: rgb(230, 204, 255);
          color: rgb(93, 29, 153);
          font-size: 0.9rem;
          font-weight: 800;
        }
        .city {
          width: 20%;
          min-height: 1.2rem;
          height: auto;
        }
        .county {
          width: 20%;
          min-height: 1.2rem;
          height: auto;
        }
        .community {
          width: 60%;
          min-height: 1.2rem;
          height: auto;
          text-align: center;
          vertical-align: middle;
          div {
            // width: 100%;
            min-height: 1.2rem;
            height: auto;
            margin: 3px auto;
            padding: 0px 5px;
            border-bottom: 1px solid #ebeef5;
          }
          div:last-child {
            border: none;
          }
        }
      }
    }
    .notice {
      width: 100%;
      height: auto;
      font-size: 0.8rem;
      color: rgb(153, 153, 153);
      line-height: 1.3rem;
      h2 {
        font-size: 0.9rem;
        font-weight: 800;
        color: rgb(66, 66, 66);
        margin: 8px auto;
        // margin: ;
      }
    }
  }
  .search-policy {
    width: 100%;
    // min-height: 40vh;
    height: 100%;
    margin-top: 1rem;
    box-shadow: 0px 0px 8px 0px #ebebeb;
    // background-color: #f9fbfd;
    .more-btn {
      width: 93%;
      margin: 0rem auto;
      padding: 1rem 0;
      // font-size: 1rem;
      margin-bottom: 1rem;
      text-align: center;
      // background-image: linear-gradient( 135deg, #FCCF31 10%, #F55555 100%);
    }
  }
  .showPolicy {
    margin: 1rem auto;
    padding: 10px 8px;
    box-shadow: 0px 0px 8px 0px #ebebeb;
    .from-info {
      .title {
        margin: 0.7rem auto;
        font-size: 0.8rem;
        color: rgb(66, 66, 66);
      }
      .high-in {
        .high-desc {
          .content {
          }
          .health-code {
            h2 {
              font-size: 0.9rem;
              margin: 0.3rem auto;
              text-align: center;
              color: rgb(153, 153, 153);
            }
            .picture {
              width: 70%;
              height: auto;
              margin: 0 auto;
              img {
                width: 100%;
                height: auto;
              }
            }
          }
        }
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
  /deep/ .van-nav-bar {
    z-index: 2;
  }
  /deep/ .van-tabs__wrap {
    height: 3rem;
    // border-bottom: 1px solid rgb(255, 117, 37);
    box-shadow: 0px 0px 8px 0px #ebebeb;
    background-color: #fff;
  }
  /deep/ .van-tabs__nav--card {
    height: 3rem;
    margin: 0;
    border: none;
  }
  /deep/ .van-tabs__nav--card .van-tab {
    border: none;
  }
  /deep/ .van-sticky--fixed {
    z-index: 1;
  }
  /deep/ .van-button {
    border-radius: 0.7rem;
  }
}
</style>
