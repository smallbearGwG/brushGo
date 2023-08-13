import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //主页
    {
      path: "/",
      component: () => import("./views/MainView.vue"),
    },
    {
      path: "/todaytsk",
      component: () => import("./views/TodayTaskView.vue"),
    },
    {
      path: "/tasklist",
      component: () => import("./views/TaskListView.vue"),
    },
    {
      path: "/alltasklist",
      component: () => import("./views/AllTaskListView.vue"),
    },
    //商品
    {
      path: "/commoditylist",
      component: () => import("./views/CommodityView.vue"),
    },
    //礼品
    {
      path: "/giftlist",
      component: () => import("./views/GiftListView.vue"),
    },
    //店铺列表
    {
      path: "/shoplist",
      component: () => import("./views/ShopView.vue"),
    },
    {
      path: "/phonelist",
      component: () => import("./views/PhoneListView.vue"),
    },
    //其他支出
    {
      path: "/expendituretype",
      component: () => import("./views/ExpenditureTypeView.vue"),
    },
    //对账
    {
      path: "/reconciliation",
      component: () => import("./views/ReconciliationView.vue"),
    },
    //话术
    {
      path: "/sppech",
      component: () => import("./views/SpeechView.vue"),
    },
  ],
});

export default router;
