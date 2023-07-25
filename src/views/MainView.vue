<script setup lang="ts">
import { ElProgress, ElCalendar } from 'element-plus';

</script>
<template>
    <span>下班倒计时</span>
    <el-progress :percentage="69" />
    <span>当日任务完成度</span>
    <el-progress :percentage="69" />
    <span>当日评价完成度</span>
    <el-progress :percentage="69" />
    <el-calendar>
    </el-calendar>
</template>
<style></style>