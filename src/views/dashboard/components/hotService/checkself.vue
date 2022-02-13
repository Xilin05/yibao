<template>
  <div class="check-container">
    <van-nav-bar
      title="健康自查"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
      :placeholder="true"
    />
    <div class="search-input">
      <van-search
        shape="round"
        v-model="value"
        show-action
        placeholder="请输入症状关键词或疾病名称"
        @search="onSearch"
      >
        <template #action>
          <van-button
            class="search-btn"
            :loading="loading"
            color="linear-gradient(135deg, #fccf31 10%, #f55555 100%)"
            @click="onSearch"
            >搜 索</van-button
          >
        </template>
      </van-search>
    </div>
    <!-- <form action="#"> -->
    <!-- </form> -->
    <van-empty v-if="!diseaseList[0]" image="search" description="请进行检索" />
    <div v-if="diseaseList[0]" class="result-lists">
      <div class="result-card" v-for="(item, i) in diseaseList" :key="i">
        <div class="basis-inform">
          <h2>疾病名称：{{ item.name }}</h2>
          <div class="cell-field">
            <div class="title">典型症状：</div>
            <div class="content">
              {{ item.typicalSymptom }}
            </div>
          </div>
          <div class="cell-field">
            <div class="title">发病部位：</div>
            <div class="content">
              <template>
                <span v-for="(part, j) in item.siteOfDisease" :key="j">
                  {{ part }},
                </span>
              </template>
            </div>
          </div>
        </div>
        <div class="see-detail">
          <van-cell
            border
            title="查看详情"
            value=""
            is-link
            @click="seeDetail(item)"
          />
        </div>
      </div>
    </div>
    <van-action-sheet v-model="show" :title="itemDetail.name">
      <div class="sheet-content">
        <div class="cell-field">
          <div class="title">疾病名称：</div>
          <div class="content">
            {{ itemDetail.name }}
          </div>
        </div>
        <div class="cell-field">
          <div class="title">别名：</div>
          <div class="content">
            <template>
              <span v-for="(part, j) in itemDetail.alias" :key="j">
                {{ part }},
              </span>
            </template>
          </div>
        </div>
        <div class="cell-field">
          <div class="title">是否为医保疾病：</div>
          <div class="content">
            {{ itemDetail.medicalInsurance }}
          </div>
        </div>
        <div class="cell-field">
          <div class="title">发病部位：</div>
          <div class="content">
            <template>
              <span v-for="(part, j) in itemDetail.siteOfDisease" :key="j">
                {{ part }},
              </span>
            </template>
          </div>
        </div>
        <div class="cell-field">
          <div class="title">传染性：</div>
          <div class="content">
            {{ itemDetail.infectiousness }}
          </div>
        </div>
        <div class="cell-field">
          <div class="title">典型症状：</div>
          <div class="content">{{ itemDetail.typicalSymptom }},</div>
        </div>
      </div>
    </van-action-sheet>
    <div class="footer">
      <div>广软疫宝</div>
      <div>提供优质服务</div>
    </div>
    <toTop />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { diseaseJson } from "@/api/getdisease";
import toTop from "@/components/toTop";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    toTop,
  },
  data() {
    //这里存放数据
    return {
      value: "",
      loading: false,
      diseaseList: {},
      show: false,
      itemDetail: {},
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
    onSearch() {
      this.loading = true;
      let res = diseaseJson;
      if (res.statusCode == "000000") {
        this.$toast.success("查找成功！");
        this.loading = false;
      } else {
        this.loading = false;
        this.$toast.fail("查找失败");
      }
      this.diseaseList = res.result.diseaseList;
      console.log(res);
      // this.$toast("搜索");
    },
    seeDetail(item) {
      this.show = true;
      this.itemDetail = item;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // 必须为true
    // window.addEventListener("scroll", this.handleScroll, true);
  },

  destroyed() {
    // 销毁
    // window.removeEventListener("scroll", this.scrollToTop);
  },
};
</script>
<style lang="scss" scoped>
.check-container {
  font-family: "思源黑体CN";
  width: 100%;
  min-height: 100vh;
  height: 100%;
  position: relative;
  // background-color: #f9fbfd;
  .search-input {
    z-index: 1;
    width: 100%;
    height: 54px;
    background-color: white;
    position: fixed;
    top: 46px;
    .search-btn {
      width: 4rem;
      height: 100%;
      color: white;
      text-align: center;
      border-radius: 5rem;
      padding: 0px 4px;
      // background-image: linear-gradient(135deg, #fccf31 10%, #f55555 100%);
    }
  }
  .result-lists {
    padding: 60px 0px 70px 0px;
    .result-card {
      width: 90%;
      height: auto;
      margin: 1rem auto 0rem auto;
      border-radius: 0.5rem;
      box-shadow: 0px 0px 8px 0px #ebebeb;
      overflow: hidden;
      background: url("../../../../assets/png/卡片背景2.png") no-repeat;
      background-size: 35% auto;
      background-position: 93% 20%;
      .basis-inform {
        padding: 10px 16px;
        // border-bottom: 1px solid #e0e0e0;
        position: relative;
        &:after {
          // content: "";
          // position: absolute;
          // bottom: 0px;
          // top: auto;
          // left: 0px;
          // right: 0;
          // margin: auto;
          // height: 1px;
          // width: 90%;
          // background-color: #e0e0e0;
        }
        h2 {
          font-size: 0.9rem;
          font-weight: bold;
          margin: 0px 0px 10px 0px;
        }
        .cell-field {
          font-size: 14px;
          font-weight: 400;
          margin-bottom: 0.1rem;
          display: flex;
          .title {
            width: 25%;
          }
          .content {
            width: 75%;
            word-break: break-all;
            word-wrap: break-word;
          }
        }
      }
    }
  }
  /deep/ .van-search--show-action {
    box-shadow: 0px 4px 8px 0px #ebebeb;
  }
  /deep/ .van-hairline--bottom::after {
    border: none;
  }
  /deep/ .van-search__action {
    padding: 0;
    margin: 0 8px;
    height: 34px;
    line-height: 0;
  }

  /deep/ .van-cell--clickable {
    // color: rgb(255, 230, 230);
    color: #ffffff;
    // background-image: linear-gradient(135deg, #fccf31 10%, #f55555 100%);
    background-image: linear-gradient(135deg, #48b3ff 10%, #abdcff 100%);
    padding: 3px 16px;
  }
  /deep/ .van-cell {
    // background-color: rgba(255, 255, 255, 0) !important;
  }
  /deep/ .van-cell__right-icon {
    color: white;
  }
  .sheet-content {
    padding: 10px 26px 70px 26px;
    .cell-field {
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 0.1rem;
      display: flex;
      .title {
        width: 35%;
        text-align: right;
        color: rgb(146, 146, 146);
      }
      .content {
        color: rgb(0, 0, 0);
        width: 65%;
        word-break: break-all;
        word-wrap: break-word;
      }
    }
  }
  .backTop {
    width: 42px;
    height: 42px;
    /* background: #eee; */
    box-shadow: 3px 3px 2px #d2effc;
    /* background: rgba(115, 170, 247, 0.2); */
    position: fixed;
    bottom: 80px;
    right: 20px;
    z-index: 1000;
    text-align: center;
    line-height: 100px;
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
</style>
