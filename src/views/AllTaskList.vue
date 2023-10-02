<script setup lang="ts">
import { ElButton, ElTableV2, ElSelect, ElForm, ElFormItem, ElInput, ElDatePicker, ElLoading } from 'element-plus'
import { onMounted, onUpdated, reactive } from 'vue';
import Task from '../../common/Task';
import { Alignment } from 'element-plus/es/components/table-v2/src/constants.mjs';

const taskTableList = reactive<Task[]>([]);

onMounted(async () => {
    const loading = ElLoading.service({
        lock: true
    })
    setTimeout(async () => {
        const taskList: Task[] = await window.electronAPI.brushService("taskService", "getAllTask")
        console.log(taskList)
        taskList.forEach(task => {
            taskTableList.push(task)
        }),
            loading.close()
    }, 1);
})

onUpdated(async () => {
})

const columns = [
    {
        key: `operator`,
        dataKey: `operator`,
        title: `操作人`,
        align: Alignment.CENTER,
        width: 80,
    },
    {
        key: `shop`,
        dataKey: `shop`,
        title: `店铺`,
        align: Alignment.CENTER,
        width: 100,
    },
    {
        key: `showTime`,
        dataKey: `showTime`,
        title: `时间`,
        align: Alignment.CENTER,
        width: 150,
    },
    {
        key: `orderNumber`,
        dataKey: `orderNumber`,
        title: `订单编号`,
        align: Alignment.CENTER,
        width: 180,
    },
    {
        key: `orderId`,
        dataKey: `orderId`,
        title: `客户ID`,
        align: Alignment.CENTER,
        width: 250,
    },
    {
        key: `amount`,
        dataKey: `amount`,
        title: `金额`,
        align: Alignment.CENTER,
        width: 80,
    },
    {
        key: `gift`,
        dataKey: `gift`,
        title: `礼品`,
        align: Alignment.CENTER,
        width: 80,
    },
    {
        key: `expenditureChannel`,
        dataKey: `expenditureChannel`,
        title: `支出渠道`,
        align: Alignment.CENTER,
        width: 80,
    },
    {
        key: `note`,
        dataKey: `note`,
        title: `备注`,
        align: Alignment.CENTER,
        width: 50,
    },
    {
        key: `operationPhone`,
        dataKey: `operationPhone`,
        title: `操作手机`,
        align: Alignment.CENTER,
        width: 80,
    },
    {
        key: `phoneNumber`,
        dataKey: `phoneNumber`,
        title: `手机号码`,
        align: Alignment.CENTER,
        width: 150,
    },
    {
        key: `productName`,
        dataKey: `productName`,
        title: `产品名称`,
        align: Alignment.CENTER,
        width: 150,
    },
    {
        key: `keywords`,
        dataKey: `keywords`,
        title: `关键词`,
        align: Alignment.CENTER,
        width: 150,
    },
    {
        key: `jdToTbId`,
        dataKey: `jdToTbId`,
        title: `京东对应淘宝ID`,
        align: Alignment.CENTER,
        width: 400,
    }
]

</script>
<template>
    <div class="alltasklist-container">
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
        <div style="height: 100%">
            <el-auto-resizer>
                <template #default="{ height, width }">
                    <el-table-v2 :columns="columns" :data="taskTableList" :width="width" :height="height" fixed>
                    </el-table-v2>
                </template>
            </el-auto-resizer>
        </div>
    </div>
</template>
<style>
.alltasklist-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>