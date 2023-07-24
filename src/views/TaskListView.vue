<script setup lang="ts">
import { ElButton, ElTable, ElTableColumn } from 'element-plus';

</script>
<template>
    <el-button>留下设置的位置</el-button>
    <el-table :border="true">
        <el-table-column label="店铺" />
        <el-table-column label="原始单号" />
        <el-table-column label="客户网名" />
        <el-table-column label="金额" />
        <el-table-column label="礼品" />
        <el-table-column label="支出渠道" />
        <el-table-column label="备注" />
        <el-table-column label="操作手机" />
        <el-table-column label="手机号码" />
        <el-table-column label="产品名称" />
        <el-table-column label="关键字" />
    </el-table>
</template>
<style></style>