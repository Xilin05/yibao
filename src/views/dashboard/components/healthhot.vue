<template>
  <div class="hot-container">
    <div class="hot-title">
      <div class="p-header">健康热点</div>
      <!-- <div class="underline"></div> -->
    </div>
    <div v-if="showType">
      <div
        class="hot-news"
        v-for="(item, i) in newsList"
        :key="i"
        @click="toDetail(item)"
      >
        <div class="n-content">
          <div class="title">{{ item.title }}</div>
          <div class="information">
            <div>{{ item.src }}</div>
            <div>{{ item.time | filtedate }}</div>
          </div>
        </div>
        <div class="n-img"><img :src="item.pic" alt="" /></div>
      </div>
      <div v-if="showType" class="more-btn">
        <van-button
          :loading="isAdd"
          type="primary"
          block
          size="small"
          color="linear-gradient(
        to right,
        #3878f8 10%,
        #415cf3 50%,
        #079adf 90%
      )"
          @click="loadMore()"
          >查看更多<van-icon name="arrow-down"
        /></van-button>
      </div>
    </div>
    <div v-if="!showType">
      <van-empty image="error" description="获取新闻失败">
        <van-button
          block
          :loading="isAdd"
          size="small"
          type="danger"
          color="linear-gradient(
            to right,
            #3878f8 10%,
            #415cf3 50%,
            #079adf 90%
          )"
          class="bottom-button"
          >重新加载</van-button
        >
      </van-empty>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { getHotNews } from "@/api/getData";
import { fmtDate } from "@/utils/date";

export default {
  //import引入的组件需要注入到对象中才能使用
  filters: {
    filtedate: function (date) {
      let t = new Date(date);
      return fmtDate(t, "MM/dd hh:mm");
    },
  },
  components: {},
  props: {},
  data() {
    //这里存放数据
    return {
      showType: true,
      number: 5,
      begin: 0,
      newsList: [],
      list: [],
      isAdd: false,
    };
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    async getNews() {
      // let num = this.number;
      // let start = this.begin;
      // let { data } = await getHotNews(num, start);
      // if (data.code != 10000) {
      //   this.showType = false;
      //   this.$toast("获取新闻失败！");
      // } else {
      //   this.showType = true;
      //   this.newsList = data.result.result.list;
      // }
      this.newsList = getHotNews().result.result.list;
      // this.showType = false;
    },
    async loadMore() {
      this.isAdd = true;
      this.number += 5;
      let num = this.number;
      let { data } = await getHotNews(num, this.begin);
      if (data.code != 10000) {
        this.showType = false;
        this.$toast("获取新闻失败！");
      } else {
        this.newsList = data.result.result.list;
        this.isAdd = false;
      }
    },
    toDetail(item) {
      this.$router.push({
        name: "HealthDetail",
        params: item,
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getNews();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>
<style lang="scss" scoped>
.hot-container {
  width: 100%;
  height: auto;
  margin: 1rem auto;
  // padding: 0rem 0rem;
  box-shadow: 0px 0px 8px 0px #ebebeb;
  overflow: hidden;
  .hot-title {
    margin-bottom: 1rem;
    padding: 10px 16px;
    border-bottom: 1px solid rgb(240, 240, 240);
    .p-header {
      color: rgb(87, 135, 255);
      font-size: 1.2rem;
      font-weight: bold;
      width: 100%;
      // text-indent: 0rem;
      line-height: 1.5rem;
    }
    .underline {
      width: 2rem;
      height: 3px;
      line-height: 0.5rem;
      background-color: rgb(87, 135, 255);
      // margin: 0rem 0rem 0.5rem 0rem;
      margin: 0.1rem 0rem 0.4rem 0rem;
    }
  }
  .hot-news {
    width: 85%;
    height: auto;
    border-radius: 0.5rem;
    box-shadow: 0px 0px 8px 0px #e7e7e7;
    background-color: #fff;
    margin: 0rem auto 1rem auto;
    padding: 16px 10px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .n-content {
      width: 48%;
      height: 4.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 0.9rem;
      }
      .information {
        width: 100%;
        font-size: 0.6rem;
        color: rgb(158, 158, 158);
        display: flex;
        // flex-wrap: wrap;
        justify-content: space-between;
        div {
          width: 45%;
          text-align: left;
          text-overflow: ellipsis;
          overflow: hidden;
          line-height: 1rem;
          white-space: nowrap;
          // display: flex;
          // align-items: center;
          // line-height: 0.2rem;
          // height: auto;
        }
      }
    }
    .n-img {
      width: 45%;
      height: 4.5rem;
      border-radius: 0.3rem;
      overflow: hidden;
      img {
        width: 100%;
        height: auto;
        object-fit: cover;
      }
    }
  }
  .more-btn {
    width: 90%;
    margin: 0rem auto 1rem auto;
    font-size: 0.8rem;
    margin-bottom: 1rem;
    text-align: center;
  }
}
/deep/ .van-empty__bottom {
  width: 90%;
  margin: 1rem auto 0rem auto;
}
/deep/ .van-button {
  border-radius: 0.7rem;
}
.reload {
  width: 90%;
}
</style>
