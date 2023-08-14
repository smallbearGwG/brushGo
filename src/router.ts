import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //主页
    {
      path: "/",
      component: () => import("./views/Main.vue"),
    },
    {
      path: "/todaytsk",
      component: () => import("./views/TodayTask.vue"),
    },
    {
      path: "/tasklist",
      component: () => import("./views/TaskList.vue"),
    },
    {
      path: "/alltasklist",
      component: () => import("./views/AllTaskList.vue"),
    },
    //商品
    {
      path: "/commoditylist",
      component: () => import("./views/Commodity.vue"),
    },
    //礼品
    {
      path: "/giftlist",
      component: () => import("./views/GiftList.vue"),
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
