import { createRouter, createWebHistory } from "vue-router";

import MainView from "./views/MainView.vue";
import TodayTaskView from "./views/TodayTaskView.vue";
import AllTaskListView from "./views/AllTaskListView.vue";
import GiftListView from "./views/GiftListView.vue";
import ShopListView from "./views/ShopView.vue";
import PhoneListView from "./views/PhoneListView.vue";
import ExpenditureTypeViewVue from "./views/ExpenditureTypeView.vue";
import TaskListViewVue from "./views/TaskListView.vue";
import ReconciliationView from "./views/ReconciliationView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //主页
    {
      path: "/",
      component: MainView,
    },
    {
      path: "/todaytsk",
      component: TodayTaskView,
    },
    {
      path: "/tasklist",
      component: TaskListViewVue,
    },
    {
      path: "/alltasklist",
      component: AllTaskListView,
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
      path: "/phonelist",
      component: PhoneListView,
    },
    //其他支出
    {
      path: "/expendituretype",
      component: ExpenditureTypeViewVue,
    },
    //对账
    {
      path: "/reconciliation",
      component: ReconciliationView,
    },
  ],
});

export default router;
