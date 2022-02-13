import axios from "axios";

import Vue from "vue";
import { VueJsonp } from "vue-jsonp";
Vue.use(VueJsonp);

export function getCity(key) {
  var data = {
    // key: 腾讯位置控制台申请的密钥
    key: "KIPBZ-CBQ64-AF6UN-DXH6C-G7TAO-AXFX4",
  };
  // 腾讯位置根据ip信息获取地理位置的接口
  var url = "https://apis.map.qq.com/ws/location/v1/ip";
  data.output = "jsonp";
  this.$jsonp(url, data)
    .then((res) => {
      return res;
      // console.log(res, 123);
    })
    .catch((error) => {
      return error;
      // console.log(error, 456);
    });

  //获取当前位置的经纬度
  // var data = {
  //   key: "KIPBZ-CBQ64-AF6UN-DXH6C-G7TAO-AXFX4", //这个key就是你申请的密钥
  // };
  // var url = "https://apis.map.qq.com/ws/location/v1/ip"; //这个就是地理位置信息的接口
  // data.output = "jsonp";
  // this.$jsonp(url, data)
  //   .then((res) => {
  //     console.log(res, 123);
  //   })
  //   .catch((error) => {
  //     console.log(error, 456);
  //   });

  // return axios.get("https://apis.map.qq.com/ws/location/v1/ip", {
  //   params: {
  //     key: "KIPBZ-CBQ64-AF6UN-DXH6C-G7TAO-AXFX4",
  //   },
  // });
  // return axios.get("/maps/ws/location/v1/ip", {
  //   params: {
  //     key: "KIPBZ-CBQ64-AF6UN-DXH6C-G7TAO-AXFX4",
  //   },
  // });
}
