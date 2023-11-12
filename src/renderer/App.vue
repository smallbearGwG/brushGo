<script setup lang="tsx">
import { RouterView } from 'vue-router'
import { ElContainer, ElHeader, ElMain, ElMenu, ElSubMenu, ElMenuItem } from 'element-plus';

</script>
<template>
  <el-container style="height: 100vh">
    <el-header>
      <el-menu mode="horizontal" menu-trigger="click" :unique-opened="true" :router="true" default-active="/">
        <el-menu-item index="/">主页</el-menu-item>
        <el-menu-item index="importdata">原始数据导入</el-menu-item>
        <el-menu-item index="alltasklist">任务列表</el-menu-item>
        <el-menu-item index="commentslist">评价列表</el-menu-item>
        <el-sub-menu index="4">
          <template #title>其他功能</template>
          <el-menu-item index="reconciliation">对账</el-menu-item>
          <el-menu-item index="sppech">话术</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<style scoped>
* {
  user-select: none;
}
</style>
