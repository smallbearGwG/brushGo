<script setup lang="ts">
import { ElForm, ElFormItem, ElButton, ElCard, ElTable } from 'element-plus';
</script>
<template>
    <el-form :inline="true">
        <el-form-item>
            <el-button type="success">添加任务</el-button>
        </el-form-item>
    </el-form>
    <el-card>
        <template #header>
            <div class="card-header">
                <span>名称:穿3200</span>
                <el-button type="primary">这是按钮1</el-button>
                <el-button type="primary">这是按钮2</el-button>
                <el-button type="primary">这是按钮3</el-button>
                <el-button type="primary">这是按钮4</el-button>
            </div>
        </template>
        <el-table>
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
        </el-table>
    </el-card>
</template>
<style>
.card-header {
    display: flex;
    justify-content: start;
    align-items: center;
}
</style>