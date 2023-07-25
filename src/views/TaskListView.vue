<script setup lang="ts">
import { ElButton, ElTable, ElTableColumn, ElSelect, ElForm, ElFormItem, ElInput, ElDatePicker } from 'element-plus'

</script>
<template>
    <el-form :inline="true">
        <el-form-item label="店铺:">
            <el-input placeholder="请输入店铺名称" />
        </el-form-item>
        <el-form-item label="原始单号:">
            <el-input placeholder="请输入原始单号" />
        </el-form-item>
        <el-form-item label="客户网名:">
            <el-input placeholder="请输入客户网名" />
        </el-form-item>
        <el-form-item label="礼品:">
            <el-select placeholder="请选择礼品">
            </el-select>
        </el-form-item>
        <el-form-item label="操作手机:">
            <el-select placeholder="请选择操作手机">
            </el-select>
        </el-form-item>
        <el-form-item label="产品名称:">
            <el-input placeholder="请选择产品名称" />
        </el-form-item>
        <el-form-item label="产品代码:">
            <el-input placeholder="请输入产品代码" />
        </el-form-item>
        <el-form-item label="时间:">
            <el-date-picker type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary">清除</el-button>
            <el-button type="primary">搜素</el-button>
        </el-form-item>
    </el-form>

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
        <el-table-column label="产品代码" />
        <el-table-column label="关键字" />
    </el-table>
</template>
<style></style>