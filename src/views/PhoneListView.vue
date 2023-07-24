<script setup lang="ts">
import { ElTable, ElTableColumn, ElForm, ElFormItem, ElButton } from 'element-plus';

const data = [
    {
        name: "手机1"
    },
    {
        name: "手机2"
    },
    {
        name: "手机3"
    }
]

</script>
<template>
    <el-form :inline="true">
        <el-form-item>
            <el-button type="primary">添加新手机</el-button>
        </el-form-item>
    </el-form>
    <el-table :data="data" :stripe="true">
        <el-table-column prop="name" label="手机名称" />
        <el-table-column width="150px" label="操作">
            <template #default>
                <el-button size="small">修改</el-button>
                <el-button type="danger" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<style></style>