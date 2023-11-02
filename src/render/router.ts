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
      path: "/importdata",
      component: () => import("./views/ImportData.vue"),
    },
    //所有任务
    {
      path: "/alltasklist",
      component: () => import("./views/AllTaskList.vue"),
    },
    //评语工作表
    {
      path: "/commentslist",
      component: () => import("./views/Comments.vue"),
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
