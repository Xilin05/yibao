<template>
  <div class="news-container">
    <div class="corvanaNews">
      <van-cell
        value="查看更多"
        is-link
        to="/morenews"
        center
        value-class="titlelink"
      >
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div class="p-header">疫情焦点</div>
          <!-- <div class="underline"></div> -->
        </template>
      </van-cell>
      <div class="news-links">
        <van-skeleton
          class="padding"
          animate
          :row="3"
          :row-width="width"
          :loading="loading"
        />
        <van-cell
          v-for="(item, i) in news"
          :key="i"
          is-link
          @click="seeDetail(item)"
        >
          <template #title>
            <van-tag type="danger">最新</van-tag>
            <span class="custom-title"> {{ item.title }}</span>
          </template>
        </van-cell>
      </div>
    </div>
    <div class="dataDetail">
      <van-cell
        is-link
        to="/login"
        center
        label=""
        style="color: rgb(255, 117, 37)"
      >
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          以下大数据截止至
          <span>{{ covidData.modifyTime | filtedate }}</span>
        </template>
        <template #right-icon>
          <van-icon size="20" name="more-o" class="search-icon" />
        </template>
      </van-cell>
      <van-grid :column-num="3" :border="true">
        <van-grid-item>
          <div class="detail">
            <div>累计确诊</div>
            <div class="certain">{{ covidData.confirmedCount }}</div>
            <div class="yesterday">
              较昨日
              <span class="certain"> +{{ covidData.confirmedIncr }}</span>
            </div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="detail">
            <div>累计治愈</div>
            <div class="healing">{{ covidData.curedCount }}</div>
            <div class="yesterday">
              较昨日
              <span class="healing"> +{{ covidData.curedIncr }} </span>
            </div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="detail">
            <div>累计死亡</div>
            <div class="dead">{{ covidData.deadCount }}</div>
            <div class="yesterday">
              较昨日
              <span class="dead"> +{{ covidData.deadIncr }} </span>
            </div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="detail">
            <div>现有确诊</div>
            <div class="nowCer">{{ covidData.currentConfirmedCount }}</div>
            <div class="yesterday">
              较昨日
              <span class="nowCer">
                +{{ covidData.currentConfirmedIncr }}
              </span>
            </div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="detail">
            <div>境外输入</div>
            <div class="out-in">{{ covidData.suspectedCount }}</div>
            <div class="yesterday">
              较昨日
              <span class="out-in"> +{{ covidData.suspectedIncr }}</span>
            </div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="detail">
            <div>现存无症状</div>
            <div class="noPheno">{{ covidData.seriousCount }}</div>
            <div class="yesterday">
              较昨日
              <span class="noPheno"> +{{ covidData.seriousIncr }} </span>
            </div>
          </div>
        </van-grid-item>
      </van-grid>
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
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getAllData, getCovidNews, getNewsExp } from "@/api/getData";
import { fmtDate } from "@/utils/date";

export default {
  filters: {
    filtedate: function (date) {
      // if (typeof date == String) {
      //   let t = parseInt(date);
      //   return fmtDate(t, "yyyy-MM-dd hh:mm:ss");
      // }
      let intTime = parseInt(date);
      let t = new Date(intTime);
      return fmtDate(t, "yyyy-MM-dd hh:mm:ss");
    },
  },
  props: {},
  data() {
    return {
      covidData: {},
      loading: true,
      width: [340, 340, 340],
      news: [],
      show: false,
      itemDetail: {},
    };
  },
  //方法集合
  methods: {
    async getData() {
      let { data } = await getAllData();
      if (data.code != 200) {
        this.$notify({
          type: "danger",
          message: "获取疫情数据失败！",
        });
      } else {
        console.log(data);
        this.covidData = data.newslist[0].desc;
        console.log(this.covidData);
      }
    },
    // getData() {
    //   let data = getAllData();
    //   this.covidData = data;
    // },
    async getNews(page, num) {
      let res = await getCovidNews(page, num);
      // let res = await getNewsExp();
      // this.news = res.data.results;
      // this.news = res.results;
      // this.loading = false;
      if (res.status != 200) {
        this.loading = true;
        return this.$notify({ type: "danger", message: "获取新闻失败！" });
      } else {
        this.news = res.data.results;
        this.loading = false;
      }
    },
    seeDetail(item) {
      this.show = true;
      this.itemDetail = item;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getData();
    this.getNews(1, 3);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>
<style lang="scss" scoped>
.news-container {
  width: 100%;
  height: auto;
  box-shadow: 0px 0px 8px 0px #ebebeb;
  .p-header {
    color: rgb(87, 135, 255);
    font-size: 1.2rem;
    font-weight: bold;
    width: 100%;
    line-height: 1.5rem;
    text-indent: 0rem;
  }
  .underline {
    width: 2rem;
    height: 3px;
    // line-height: 0.7rem;
    background-color: rgb(87, 135, 255);
    margin: 0.1rem 0rem 0.4rem 0rem;
  }
  .news-links {
    width: 100%;
    height: auto;
    border-top: 1px solid rgb(240, 240, 240);
    .padding {
      margin: 10px auto;
    }
  }
  .dataDetail {
    border-top: 1px solid rgb(240, 240, 240);
    .detail {
      font-size: 0.8rem;
      text-align: center;
      div {
        padding: 1px 0px;
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
}
.yesterday {
  color: rgb(153, 153, 153);
}
.certain {
  color: red;
}
.healing {
  color: rgb(103, 173, 103);
}
.dead {
  color: #666666;
}
.nowCer {
  color: orange;
}
.out-in {
  color: rgb(93, 195, 243);
}
.noPheno {
  color: rgb(146, 45, 45);
}
.custom-title {
  margin-right: 4px;
  vertical-align: middle;
}

.search-icon {
  font-size: 16px;
  line-height: inherit;
}
.titlelink {
  color: rgb(87, 135, 255);
}
</style>
