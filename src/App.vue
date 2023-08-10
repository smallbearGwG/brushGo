<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { ElContainer, ElHeader, ElMain, ElMenu, ElSubMenu, ElMenuItem, ElScrollbar } from 'element-plus';

const router = useRouter()

const handleSelect = (key: string) => {
  switch (key) {
    case "0":
      router.push("/")
      break
    case "1-1":
      router.push("/todaytsk")
      break
    case "1-2":
      router.push("/tasklist")
      break
    case "1-3":
      router.push("/alltasklist")
      break
    case "4-1":
      router.push("/giftlist")
      break
    case "4-2":
      router.push("/shoplist")
      break
    case "4-3":
      router.push("/phonelist")
      break
    case "4-4":
      router.push("/expendituretype")
      break
    case "4-5":
      router.push("/giftlist")
      break
    case "5-1":
      router.push("/reconciliation")
      break
    case "5-2":
      router.push("/sppech")
      break
    default:
  }
}
</script>
<template>
  <div class="title-bar">
    <div class="titleName"></div>
    <div class="maximize"></div>
    <div class="restore"></div>
    <div class="minimize"></div>
  </div>
  <el-container style="height: calc(100vh - 40px)">
    <el-header>
      <el-menu mode="horizontal" @select="handleSelect">
        <el-menu-item index="0">单日概述</el-menu-item>
        <el-sub-menu index="1">
          <template #title>任务</template>
          <el-menu-item index="1-1">单日任务</el-menu-item>
          <el-menu-item index="1-2">单日已完成任务</el-menu-item>
          <el-menu-item index="1-3">历史已完成任务</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>评语</template>
          <el-menu-item index="2-1">当日评价</el-menu-item>
          <el-menu-item index="2-2">全部评价</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>统计</template>
          <el-menu-item index="3-1">当日数</el-menu-item>
          <el-menu-item index="3-2">全部数据</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>相关数据设置</template>
          <el-menu-item index="4-1">礼品</el-menu-item>
          <el-menu-item index="4-2">店铺</el-menu-item>
          <el-menu-item index="4-3">手机</el-menu-item>
          <el-menu-item index="4-4">其他支出类型</el-menu-item>
          <el-menu-item index="4-5">返回金额类型</el-menu-item>
          <el-menu-item index="4-6">支出渠道</el-menu-item>
          <el-menu-item index="4-7">返回支出渠道</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="5">
          <template #title>其他功能</template>
          <el-menu-item index="5-1">对账</el-menu-item>
          <el-menu-item index="5-2">话术</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-header>
    <el-main>
      <el-scrollbar>
        <!-- 路由 -->
        <router-view />
      </el-scrollbar>
    </el-main>
  </el-container>
</template>
<style scoped>
.title-bar {
  -webkit-app-region: drag;
  min-height: 40px;
  max-height: 40px;
  width: 100%;
  /* TODO:color */
  background-color: #a0cfff;
}

/* 取消拖动 */
.titleName .maximize .restore .minimize {
  -webkit-app-region: no-drag;
}
</style>
