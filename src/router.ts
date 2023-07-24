import { createRouter, createWebHistory } from "vue-router";

import MainView from "./views/MainView.vue";
import TaskListView from "./views/TaskListView.vue";
import GiftListView from "./views/GiftListView.vue";
import ShopListView from "./views/ShopView.vue";
import PhoneListView from "./views/PhoneListView.vue";
import ExpenditureTypeViewVue from "./views/ExpenditureTypeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: MainView,
    },
    {
      path: "/tasklist",
      component: TaskListView,
    },
    //礼品列表
    {
      path: "/giftlist",
      component: GiftListView,
    },
    //店铺列表
    {
      path: "/shoplist",
      component: ShopListView,
    },
    {
      path:"/phonelist",
      component:PhoneListView
    },
    //其他支出
    {
      path: "/expendituretype",
      component: ExpenditureTypeViewVue,
    },
  ],
});

export default router;
