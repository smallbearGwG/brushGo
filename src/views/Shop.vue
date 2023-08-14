<script setup lang="ts">
import { ElForm, ElFormItem, ElInput, ElTable, ElButton, ElTableColumn } from 'element-plus';

import { Search } from '@element-plus/icons-vue'

const timeData = [
    {
        name: "店铺1"
    }, {
        name: "店铺2"
    }, {
        name: "店铺3"
    },
]

</script>
<template>
    <el-form :inline="true">
        <el-form-item>
            <el-button type="primary">添加店铺</el-button>
        </el-form-item>
        <el-form-item label="名称:">
            <el-input placeholder="请输入店铺名称" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" :icon="Search">搜素</el-button>
        </el-form-item>
    </el-form>

    <el-table :data="timeData" :stripe="true">
        <el-table-column prop="name" label="店铺名称" />
        <el-table-column width="150px" label="操作">
            <template #default>
                <el-button size="small">修改</el-button>
                <el-button type="danger" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<style></style>