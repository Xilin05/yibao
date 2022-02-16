import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login"),
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard"),
        meta: {
          title: "Dashboard",
          name: "广软疫宝",
        },
      },
    ],
  },
  {
    path: "/personal",
    component: Layout,
    redirect: "/personal/center",
    children: [
      {
        path: "center",
        name: "center",
        component: () => import("@/views/personal"),
        meta: {
          title: "Personal",
          name: "个人中心",
        },
      },
    ],
  },
  {
    path: "/vaccine",
    name: "reserveVaccine",
    component: () => import("@/views/dashboard/components/hotService/vaccine"),
    meta: {
      title: "reserveVaccine",
      name: "疫苗预约",
    },
  },
  {
    path: "/appointment",
    name: "AppointmentDetail",
    component: () =>
      import("@/views/dashboard/components/hotService/appointDetail"),
    meta: {
      title: "AppointmentDetail",
      name: "疫苗预约信息填写与提交",
    },
  },
  {
    path: "/acid",
    name: "reserveAcid",
    component: () => import("@/views/dashboard/components/hotService/acid"),
    meta: {
      title: "reserveAcid",
      name: "核酸预约",
    },
  },
  {
    path: "/aciddetail",
    name: "AcidAppointment",
    component: () =>
      import("@/views/dashboard/components/hotService/acidDetail"),
    meta: {
      title: "AcidAppointment",
      name: "核酸预约信息填写与提交",
    },
  },
  {
    path: "/outpatient",
    name: "outPatient",
    component: () =>
      import("@/views/dashboard/components/hotService/outpatient"),
    meta: {
      title: "outPatient",
      name: "门诊预约",
    },
  },
  {
    path: "/patientDetail",
    name: "PatientAppointment",
    component: () =>
      import("@/views/dashboard/components/hotService/patientDetail"),
    meta: {
      title: "PatientAppointment",
      name: "门诊预约信息填写与提交",
    },
  },
  {
    path: "/prevent",
    name: "preventCovid",
    component: () => import("@/views/dashboard/components/hotService/prevent"),
    meta: {
      title: "preventCovid",
      name: "防疫科普",
    },
  },
  {
    path: "/checkself",
    name: "checkSelf",
    component: () =>
      import("@/views/dashboard/components/hotService/checkself"),
    meta: {
      title: "prevcheckSelfentCovid",
      name: "健康自查",
    },
  },
  {
    path: "/riskarea",
    name: "riskArea",
    component: () => import("@/views/dashboard/components/hotService/riskArea"),
    meta: {
      title: "riskArea",
      name: "风险区域",
    },
  },
  {
    path: "/morenews",
    name: "MoreNews",
    component: () => import("@/views/dashboard/components/detailPage/moreNews"),
    meta: {
      title: "MoreNews",
      name: "疫情新闻列表",
    },
  },
  {
    path: "/newsdetail",
    name: "NewsDetail",
    component: () =>
      import("@/views/dashboard/components/detailPage/newsDetail"),
    meta: {
      title: "NewsDetail",
      name: "疫情焦点详情",
    },
  },
  {
    path: "/typedetail",
    name: "TypeDetail",
    component: () =>
      import("@/views/dashboard/components/knowDetail/typeDetail"),
    meta: {
      title: "TypeDetail",
      name: "疫苗类型详情",
    },
  },
  {
    path: "/answerdetail",
    name: "AnswerDetail",
    component: () => import("@/views/dashboard/components/knowDetail/answer"),
    meta: {
      title: "AnswerDetail",
      name: "解答详情",
    },
  },
  {
    path: "/healthdetail",
    name: "HealthDetail",
    component: () =>
      import("@/views/dashboard/components/detailPage/healthDetail"),
    meta: {
      title: "HealthDetail",
      name: "健康新闻详情",
    },
  },
  {
    path: "/personal/records",
    name: "AppointmentRecord",
    component: () => import("@/views/personal/pages/record"),
    meta: {
      title: "AppointmentRecord",
      name: "预约记录",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
