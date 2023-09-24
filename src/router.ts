import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //主页
    {
      path: "/",
      component: () => import("./views/Main.vue"),
    },
    //单日任务
    {
      path: "/todaytsk",
      component: () => import("./views/TodayTask.vue"),
    },
    //历史已完成任务
    {
      path: "/alltasklist",
      component: () => import("./views/AllTaskList.vue"),
    },
    //评语工作表
    {
      path: "/commentslist",
      component: () => import("./views/TodayComments.vue"),
    },
    //商品
    {
      path: "/commoditylist",
      component: () => import("./views/Commodity.vue"),
    },
    //礼品
    {
      path: "/giftlist",
      component: () => import("./views/Gift.vue"),
    },
    //店铺列表
    {
      path: "/shoplist",
      component: () => import("./views/Shop.vue"),
    },
    {
      path: "/phonelist",
      component: () => import("./views/PhoneList.vue"),
    },
    //其他支出
    {
      path: "/expendituretype",
      component: () => import("./views/ExpenditureType.vue"),
    },
    //对账
    {
      path: "/reconciliation",
      component: () => import("./views/Reconciliation.vue"),
    },
    //话术
    {
      path: "/sppech",
      component: () => import("./views/Speech.vue"),
    },
  ],
});

export default router;
