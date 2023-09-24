<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { ElContainer, ElHeader, ElMain, ElMenu, ElSubMenu, ElMenuItem, ElScrollbar } from 'element-plus';
import { ref } from 'vue';
import { IpcRendererEvent } from 'electron/renderer';

const router = useRouter()

const isMaximize = ref(false)

window.electronAPI.onWindow((_event: IpcRendererEvent, state: string) => {
  isMaximize.value = state === "maximize"
})

const handleSelect = (key: string) => {
  switch (key) {
    case "0":
      router.push("/")
      break
    case "1-1":
      router.push("/todaytsk")
      break
    case "1-2":
      router.push("/alltasklist")
      break
    case "2-1":
      router.push("/commentslist")
      break
    case "4-1":
      router.push("/commoditylist")
      break
    case "4-2":
      router.push("/giftlist")
      break
    case "4-3":
      router.push("/shoplist")
      break
    case "4-4":
      router.push("/phonelist")
      break
    case "4-5":
      router.push("/expendituretype")
      break
    case "4-6":
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

const handleMinimize = async () => {
  await window.electronAPI.windowOption("minimize")
}
const handleMaximize = async () => {
  await window.electronAPI.windowOption("maximize")
  isMaximize.value = true
}
const handleUnmaximize = async () => {
  await window.electronAPI.windowOption("unmaximize")
  isMaximize.value = false
}
const handlecCose = async () => {
  await window.electronAPI.windowOption("close")
}

</script>
<template>
  <div class="title-bar">
    <div @click="handleMinimize" class="minimize">
      <img class="window-button-icon" src="./assets/icons/window-minimize.svg" />
    </div>
    <div @click="handleMaximize" v-if="!isMaximize" class="maximize">
      <img class="window-button-icon" src="./assets/icons/window-maximize.svg" />
    </div>
    <div @click="handleUnmaximize" v-if="isMaximize" class="unmaximize">
      <img class="window-button-icon" src="./assets/icons/window-restore.svg" />
    </div>
    <div @click="handlecCose" class="close">
      <img class="window-button-icon" src="./assets/icons/window-close.svg" />
    </div>
  </div>
  <el-container style="height: calc(100vh - 40px)">
    <el-header>
      <el-menu mode="horizontal" @select="handleSelect">
        <el-menu-item index="0">单日概述</el-menu-item>
        <el-sub-menu index="1">
          <template #title>任务列表</template>
          <el-menu-item index="1-1">数据导入</el-menu-item>
          <el-menu-item index="1-2">所有任务列表</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>评语</template>
          <el-menu-item index="2-1">当日评价</el-menu-item>
          <el-menu-item index="2-2">全部评价</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>相关数据设置</template>
          <el-menu-item index="4-1">商品</el-menu-item>
          <el-menu-item index="4-2">礼品</el-menu-item>
          <el-menu-item index="4-3">店铺</el-menu-item>
          <el-menu-item index="4-4">手机</el-menu-item>
          <el-menu-item index="4-5">其他支出类型</el-menu-item>
          <el-menu-item index="4-6">返回金额类型</el-menu-item>
          <el-menu-item index="4-7">支出渠道</el-menu-item>
          <el-menu-item index="4-8">返回支出渠道</el-menu-item>
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
  height: 40px;
  width: 100%;
  background-color: #337ecc;
  display: flex;
  justify-content: end;
  user-select: none;
  position: relative;
  z-index: 114514;
}

.window-button-icon {
  height: 12px;
  width: 12px;
}

/* 取消拖动 */
.maximize,
.unmaximize,
.minimize,
.close {
  -webkit-app-region: no-drag;
  height: 100%;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close:hover {
  background-color: #c45656;
}

.maximize:hover,
.unmaximize:hover,
.minimize:hover {
  background-color: #79bbff;
}
</style>
