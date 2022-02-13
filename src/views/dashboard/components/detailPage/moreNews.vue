<template>
  <div class="more-container">
    <van-nav-bar
      title="更多焦点"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
      :placeholder="true"
    />
    <van-empty v-if="!newList[0]" image="error" description="没有相关信息" />
    <div class="newsList" v-if="newList[0]">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="news-card" v-for="(item, i) in newList" :key="i">
          <div class="basis-info">
            <div class="title">
              {{ item.title }}
            </div>
            <div class="info">
              <span class="source">
                {{ item.infoSource }}
              </span>
              <span class="time">
                {{ item.pubDate | filtedate }}
              </span>
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
      </van-list>
    </div>
    <van-action-sheet v-model="show" title="新闻详情">
      <div class="sheet-content">
        <div class="title">
          {{ itemDetail.title }}
        </div>
        <div class="content">
          {{ itemDetail.summary }}
        </div>
        <div class="info">
          <span class="source">
            {{ itemDetail.infoSource }}
          </span>
          <span class="time">
            {{ itemDetail.pubDate | filtedate }}
          </span>
        </div>
      </div>
    </van-action-sheet>
    <!-- <div class="footer">
      <div>广软疫宝</div>
      <div>提供优质服务</div>
    </div> -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getCovidNews } from "@/api/getData";
import { fmtDate } from "@/utils/date";

export default {
  //import引入的组件需要注入到对象中才能使用
  filters: {
    filtedate: function (date) {
      let intNumber = parseInt(date);
      let t = new Date(intNumber);
      return fmtDate(t, "yy/MM/dd hh:mm");
    },
  },
  data() {
    //这里存放数据
    return {
      page: 1,
      num: 10,
      loading: false,
      finished: false,
      newList: [],
      show: false,
      itemDetail: {},
    };
  },
  //方法集合
  methods: {
    onClickLeft() {
      // this.$toast.success("返回");
      this.$router.go(-1);
    },
    async getNewsList() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
      });
      let { data } = await getCovidNews(this.page, this.num);
      console.log(data);
      if (data.success) {
        this.newList = data.results;
        this.$toast.clear();
      } else {
        this.$toast({
          message: "加载失败！",
          icon: "cross",
        });
      }
    },
    seeDetail(item) {
      this.show = true;
      this.itemDetail = item;
    },
    async onLoad() {
      this.loading = true;
      this.page += 1;
      // console.log("page", this.page);
      // console.log("num", this.num);
      let { data } = await getCovidNews(this.page, 10);
      console.log(data);
      // this.newList = data.results;
      this.newList.push(...data.results);
      this.loading = false;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getNewsList();
  },
};
</script>
<style lang="scss" scoped>
.more-container {
  // color: #1990ff;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: #f9fbfd;
  .newsList {
    width: 100%;
    height: auto;
    padding: 10px 0px 80px 0px;
    .news-card {
      width: 90%;
      height: auto;
      margin: 0rem auto 1rem auto;
      border-radius: 0.5rem;
      overflow: hidden;
      box-shadow: 0px 0px 8px 0px #ebebeb;
      .basis-info {
        background: rgba(255, 255, 255, 0.6)
          url("../../../../assets/png/浅蓝色疫情防控闪屏.png") no-repeat;
        background-size: 30% auto;
        background-position: 90% 100%;
        height: 4rem;
        padding: 10px 16px;
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        // backdrop-filter: alpha(50%);
        .title {
          width: 100%;
          font-size: 0.9rem;
          // font-weight: 800;
        }
        .info {
          width: 100%;
          font-size: 0.8rem;
          color: rgb(146, 146, 146);
          display: flex;
          justify-content: space-between;
        }
      }
      .see-detail {
      }
    }
  }
  .sheet-content {
    padding: 10px 26px 80px 26px;
    .title {
      width: 100%;
      font-size: 1rem;
      margin: 0.3rem 0rem;
      color: rgb(66, 66, 66);
    }
    .content {
      font-size: 0.9rem;
      color: rgb(73, 73, 73);
      width: 100;
      text-indent: 2rem;
      line-height: 1.3rem;
      margin: 0.5rem auto;
      // word-break: break-all;
      // word-wrap: break-word;
    }
    .info {
      width: 100%;
      font-size: 0.9rem;
      color: rgb(146, 146, 146);
      display: flex;
      justify-content: space-between;
      .source {
      }
      .time {
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
  /deep/ .van-cell--clickable {
    // color: rgb(255, 230, 230);
    color: #ffffff;
    // background-image: linear-gradient(135deg, #fccf31 10%, #f55555 100%);
    // background-image: linear-gradient(135deg, #48b3ff 10%, #abdcff 100%);
    // background-image: linear-gradient(135deg, #e2b0ff 10%, #9f44d3 100%);
    background-image: linear-gradient(135deg, #6e94fe 10%, #94d4ff 100%);
    padding: 3px 16px;
  }
  /deep/ .van-cell__right-icon {
    color: white;
  }
}
</style>
