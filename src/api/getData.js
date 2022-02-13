// import request from "@/utils/request";
import axios from "axios";
import { newsJson } from "./news";
import { necessaryJson } from "./answer";

export function getAllData(params) {
  // return request({
  //   url: "http://api.tianapi.com/ncov/index?key=3c731ec28b9332e7d966bf698e9f2896",
  //   method: "get",
  //   params,
  // });
  // return axios.get(
  //   "http://api.tianapi.com/ncov/index?key=3c731ec28b9332e7d966bf698e9f2896"
  // );
  let param = {
    id: 1,
    createTime: 1579537899000,
    modifyTime: 1642820470000,
    currentConfirmedCount: 6768,
    confirmedCount: 136653,
    suspectedCount: 12313,
    curedCount: 124185,
    deadCount: 5700,
    seriousCount: 778,
    suspectedIncr: 40,
    currentConfirmedIncr: -54,
    confirmedIncr: 142,
    curedIncr: 196,
    deadIncr: 0,
    seriousIncr: 13,
    yesterdayConfirmedCountIncr: 142,
    yesterdaySuspectedCountIncr: 40,
    remark1:
      "易感人群：人群普遍易感。老年人及有基础疾病者感染后病情较重，儿童及婴幼儿也有发病",
    remark2:
      "潜伏期：一般为 3～7 天，最长不超过 14 天，潜伏期内可能存在传染性，其中无症状病例传染性非常罕见",
    remark3: "宿主：野生动物，可能为中华菊头蝠",
    note1: "病毒：SARS-CoV-2，其导致疾病命名 COVID-19",
    note2: "传染源：新冠肺炎的患者。无症状感染者也可能成为传染源。",
    note3:
      "传播途径：经呼吸道飞沫、接触传播是主要的传播途径。气溶胶传播和消化道等传播途径尚待明确。",
  };
  // let param = {
  //   confirmedCount: 134903,
  //   confirmedIncr: 363,
  //   createTime: 1579537899000,
  //   curedCount: 122418,
  //   curedIncr: 218,
  //   currentConfirmedCount: 6786,
  //   currentConfirmedIncr: 145,
  //   deadCount: 5699,
  //   deadIncr: 0,
  //   highDangerCount: 19,
  //   id: 1,
  //   midDangerCount: 60,
  //   modifyTime: 1642071599000,
  //   note1: "病毒：SARS-CoV-2，其导致疾病命名 COVID-19",
  //   note2: "传染源：新冠肺炎的患者。无症状感染者也可能成为传染源。",
  //   note3:
  //     "传播途径：经呼吸道飞沫、接触传播是主要的传播途径。气溶胶传播和消化道等传播途径尚待明确。",
  //   remark1:
  //     "易感人群：人群普遍易感。老年人及有基础疾病者感染后病情较重，儿童及婴幼儿也有发病",
  //   remark2:
  //     "潜伏期：一般为 3～7 天，最长不超过 14 天，潜伏期内可能存在传染性，其中无症状病例传染性非常罕见",
  //   remark3: "宿主：野生动物，可能为中华菊头蝠",
  //   seriousCount: 726,
  //   seriousIncr: 2,
  //   suspectedCount: 11891,
  //   suspectedIncr: 66,
  // };
  return param;
}

export function getCovidNews(page, num) {
  return axios.get("https://lab.isaaclin.cn/nCoV/api/news", {
    params: {
      page: page,
      num: num,
    },
  });
}

export function getNewsExp() {
  let params = {
    results: [
      {
        pubDate: "1642121894000",
        title: "天津 | 昨日新增 34 例本土确诊病例",
        summary:
          "据天津市卫生健康委员会消息，2022年1月13日0—24时，天津市新增34例本土新冠肺炎确诊病例（含1例由无症状感染者转为确诊病例）。新增3例境外输入性新冠肺炎确诊病例（含1例由无症状感染者转为确诊病例）。新增1例本土无症状感染者，无新增境外输入无症状感染者。治愈出院8人（境外输入）。\n截至1月13日，天津市累计报告新型冠状病毒肺炎确诊病例290例，出院病例145例，死亡病例3例，在院142例。\n",
        infoSource: "央视新闻app",
        sourceUrl:
          "https://content-static.cctvnews.cctv.com/snow-book/index.html?item_id=8770517920998484583&toc_style_id=feeds_default",
        province: null,
        provinceId: "",
      },
      {
        pubDate: "1642121848000",
        title: "陕西 | 昨日新增 8 例本土确诊病例",
        summary:
          "1月13日0—24时，陕西新增8例本土确诊病例，均在西安市。 （总台记者 闫星光）",
        infoSource: "央视新闻app",
        sourceUrl:
          "https://content-static.cctvnews.cctv.com/snow-book/index.html?item_id=13244220452925237081&toc_style_id=feeds_default",
        province: null,
        provinceId: "",
      },
      {
        pubDate: "1642121280000",
        title: "全国 | 昨日新增确诊病例 201 例，其中本土确诊病例 143 例",
        summary:
          "1月13日0—24时，31个省（自治区、直辖市）和新疆生产建设兵团报告新增确诊病例201例。其中境外输入病例58例（上海30例，广东9例，广西4例，天津3例，辽宁3例，浙江3例，福建3例，四川2例，北京1例），含8例由无症状感染者转为确诊病例（浙江3例，天津1例，辽宁1例，广东1例，广西1例，四川1例）；本土病例143例（河南98例，其中安阳市69例、许昌市25例、郑州市4例；天津34例，其中津南",
        infoSource: "央视新闻app",
        sourceUrl:
          "https://content-static.cctvnews.cctv.com/snow-book/index.html?item_id=14621942916667269566&toc_style_id=feeds_default",
        province: null,
        provinceId: "",
      },
    ],
    success: true,
  };
  return params;
}
// 3c7b8e1a187a694cd1f96d530c1372bc

export function getHotNews(num, start) {
  // return axios.get("/api/jisuapi/get", {
  //   params: {
  //     channel: "健康",
  //     num: num,
  //     start: start,
  //     appkey: "3c7b8e1a187a694cd1f96d530c1372bc",
  //   },
  // });
  // let params = {
  //   result: {
  //     channel: "健康",
  //     num: 10,
  //   },
  // };
  let ajson = newsJson;
  return ajson;
}

export function getNecessaryJson() {
  let ajson = necessaryJson;
  return ajson;
}

export function getCityID() {
  return axios.get("/api/springTravel/citys", {
    params: {
      key: "81b8a46f9a5ef0182913bf87e029ac63",
    },
  });
}
