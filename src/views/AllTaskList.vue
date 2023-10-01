<script setup lang="ts">
import { ElButton, ElTable, ElTableColumn, ElSelect, ElForm, ElFormItem, ElInput, ElDatePicker } from 'element-plus'
import { onMounted, onUpdated, reactive } from 'vue';
import Task from '../../common/Task';

const taskTableList = reactive<Task[]>([]);

onMounted(async () => {
    const taskList: Task[] = await window.electronAPI.brushService("taskService", "getAllTask")
    console.log(taskList)
    taskList.forEach(task => {
        taskTableList.push(task)
    })
})

onUpdated(async () => {
})


</script>
<template>
    <el-form :inline="true" :size="'small'">
        <el-form-item label="客户网名:">
            <el-input placeholder="请输入客户网名" />
        </el-form-item>
        <el-form-item label="原始单号:">
            <el-input placeholder="请输入原始单号" />
        </el-form-item>
        <el-form-item label="产品名称:">
            <el-input placeholder="请选择产品名称" />
        </el-form-item>
        <el-form-item label="产品代码:">
            <el-input placeholder="请输入产品代码" />
        </el-form-item>
        <el-form-item label="店铺:">
            <el-input placeholder="请输入店铺名称" />
        </el-form-item>
        <el-form-item label="礼品:">
            <el-select placeholder="请选择礼品">
            </el-select>
        </el-form-item>
        <el-form-item label="操作手机:">
            <el-select placeholder="请选择操作手机">
            </el-select>
        </el-form-item>
        <el-form-item label="时间:">
            <el-date-picker type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary">清除</el-button>
            <el-button type="primary">搜素</el-button>
        </el-form-item>
    </el-form>

    <el-table stripe style="max-height: 100%; height: 100%;" :border="true" size="small" :data="taskTableList">
        <el-table-column type="index" label="序号" width="50" align="center" show-overflow-tooltip />
        <el-table-column prop="operator" label="操作人" width="80" align="center" show-overflow-tooltip />
        <el-table-column prop="shop" label="店铺" width="100" align="center" show-overflow-tooltip />
        <el-table-column prop="showTime" label="时间" width="120" align="center" show-overflow-tooltip />
        <el-table-column prop="orderNumber" label="订单编号" width="180" align="center" show-overflow-tooltip />
        <el-table-column prop="orderId" label="客户ID" width="200" align="center" show-overflow-tooltip />
        <el-table-column prop="amount" label="金额" align="center" show-overflow-tooltip />
        <el-table-column prop="gift" label="礼品" align="center" show-overflow-tooltip />
        <el-table-column prop="expenditureChannel " label="支出渠道" align="center" show-overflow-tooltip />
        <el-table-column prop="note" label="备注" align="center" show-overflow-tooltip />
        <el-table-column prop="operationPhone" label="操作手机" align="center" show-overflow-tooltip />
        <el-table-column prop="phoneNumber" label="手机号码" align="center" show-overflow-tooltip />
        <el-table-column prop="productName" label="产品名称" align="center" show-overflow-tooltip />
        <el-table-column prop="keywords" label="关键词" align="center" show-overflow-tooltip />
        <el-table-column prop="jdToTbId" label="京东对应淘宝ID" width="150" align="center" show-overflow-tooltip />
    </el-table>
</template>
<style></style>