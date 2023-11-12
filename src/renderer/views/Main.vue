<script setup lang="tsx">
import { ElProgress } from 'element-plus';
</script>
<template>
    <div class="main-container">
        <span>下班倒计时</span>
        <el-progress :percentage="69" />
        <span>当日任务完成度</span>
        <el-progress :percentage="69" />
        <span>当日评价完成度</span>
        <el-progress :percentage="69" />
    </div>
</template>
<style>
.main-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>