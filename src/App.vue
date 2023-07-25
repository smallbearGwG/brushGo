<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { ElContainer, ElHeader, ElMain, ElMenu, ElSubMenu, ElMenuItem } from 'element-plus';

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
    default:

  }
}

</script>

<template>
  <el-container>
    <el-header>
      <el-menu mode="horizontal" @select="handleSelect">
        <el-menu-item index="0">主页</el-menu-item>
        <el-sub-menu index="1">
          <template #title>刷单</template>
          <el-menu-item index="1-1">单日任务</el-menu-item>
          <el-menu-item index="1-2">全部任务</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>评价</template>
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
      </el-menu>
    </el-header>

    <!-- 路由 -->

    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<style scoped></style>
