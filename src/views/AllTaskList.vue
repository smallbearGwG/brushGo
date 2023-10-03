<script setup lang="tsx" >
import { ElButton, ElTableV2, ElForm, ElFormItem, ElInput, ElDatePicker, ElLoading } from 'element-plus'
import { onMounted, onUpdated, reactive, ref } from 'vue';
import Task from '../../common/Task';
import { Alignment } from 'element-plus/es/components/table-v2/src/constants.mjs';
import { AnyColumn } from 'element-plus/lib/components/table-v2/src/common.js';
import SElMEssage from '../util/SElMEssage';

const taskTableList = reactive<Task[]>([]);
const taskTableSearchedList = reactive<Task[]>([]);

const inputOrderId = ref("")
const inputOrderNumber = ref("")
const inputProductName = ref("")
const inputShop = ref("")
const inputGift = ref("")
const inputOperationPhone = ref("")
const inputTime = ref("")

onMounted(async () => {
    const loading = ElLoading.service({
        lock: true
    })
    setTimeout(async () => {
        const taskList: Task[] = await window.electronAPI.brushService("taskService", "getAllTask")
        taskList.forEach(task => {
            taskTableList.push(task)
        }),
            taskTableSearchedList.push(...taskTableList)
        loading.close()
    }, 1);
})

onUpdated(async () => {
})

const renderInput = ({ rowData, column }: any) => {
    if (rowData[column.key!])
        return <input class="table-render-value" readonly value={rowData[column.key!]} />
    return <></>
}

const columns: AnyColumn[] = [
    {
        key: `operator`,
        dataKey: `operator`,
        title: `操作人`,
        align: Alignment.CENTER,
        width: 80,
        cellRenderer: renderInput
    },
    {
        key: `shop`,
        dataKey: `shop`,
        title: `店铺`,
        align: Alignment.CENTER,
        width: 100
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

const hanldeCleanButton = () => {
    inputOrderId.value = ""
    inputOrderNumber.value = ""
    inputProductName.value = ""
    inputShop.value = ""
    inputGift.value = ""
    inputOperationPhone.value = ""
    inputTime.value = ""
    taskTableSearchedList.push(...taskTableList)
    SElMEssage({
        message: `搜索以清除`,
        type: 'success',
    })
}

const handleSearchButton = () => {
    const searchParams: Partial<Task> = {
        orderId: inputOrderId.value,
        orderNumber: inputOrderNumber.value,
        productName: inputProductName.value,
        shop: inputShop.value,
        gift: inputGift.value,
        operationPhone: inputOperationPhone.value,
        time: inputTime.value
    };
    let tasks: Task[] = taskTableList;
    if (searchParams.orderId !== "") {
        tasks = tasks.filter((task: Task) => {
            if (searchParams.orderId && task.orderId && (String(task.orderId)).includes(String(searchParams.orderId))) {
                return true;
            }
            return false;
        });
    }
    if (searchParams.orderNumber !== "") {
        tasks = tasks.filter((task: Task) => {
            if (searchParams.orderNumber && task.orderNumber && (String(task.orderNumber)).includes(String(searchParams.orderNumber))) {
                return true;
            }
            return false;
        });
    }
    if (searchParams.productName !== "") {
        tasks = tasks.filter((task: Task) => {
            if (searchParams.productName && task.productName && (String(task.productName)).includes(String(searchParams.productName))) {
                return true;
            }
            return false;
        });
    }
    if (searchParams.shop !== "") {
        tasks = tasks.filter((task: Task) => {
            if (searchParams.shop && task.shop && (String(task.shop)).includes(String(searchParams.shop))) {
                return true;
            }
            return false;
        });
    }
    if (searchParams.gift !== "") {
        tasks = tasks.filter((task: Task) => {
            if (searchParams.gift && task.gift && (String(task.gift)).includes(String(searchParams.gift))) {
                return true;
            }
            return false;
        });
    }
    if (searchParams.operationPhone !== "") {
        tasks = tasks.filter((task: Task) => {
            if (searchParams.operationPhone && task.operationPhone && (String(task.operationPhone)).includes(String(searchParams.operationPhone))) {
                return true;
            }
            return false;
        });
    }
    if (searchParams.time !== "") {
        tasks = tasks.filter((task: Task) => {
            console.log(task.time)
            if (searchParams.time && task.time && searchParams.time[0] <= task.time && task.time <= searchParams.time[1]) {
                return true;
            }
            return false;
        });
    }
    taskTableSearchedList.length = 0
    taskTableSearchedList.push(...tasks)
    SElMEssage({
        message: `一共搜索了${tasks.length}条数据`,
        type: 'success',
    })
}

</script>
<template>
    <div class="alltasklist-container">
        <el-form label-position="left" size="small" :inline="true">
            <el-form-item label="客户ID:">
                <el-input v-model="inputOrderId" placeholder="请输入客户ID" style="width: 190px" />
            </el-form-item>
            <el-form-item label="原始单号:">
                <el-input v-model="inputOrderNumber" placeholder="请输入原始单号" style="width: 190px" />
            </el-form-item>
            <el-form-item label="产品名称:">
                <el-input v-model="inputProductName" placeholder="请选择产品名称" style="width: 190px" />
            </el-form-item>
            <el-form-item label="店铺:">
                <el-input v-model="inputShop" placeholder="请输入店铺名称" style="width: 190px" />
            </el-form-item>
            <el-form-item label="礼品:">
                <el-input v-model="inputGift" placeholder="请选输入礼品" style="width: 190px" />
            </el-form-item>
            <el-form-item label="操作手机:">
                <el-input v-model="inputOperationPhone" placeholder="请选输入操作手机" style="width: 190px" />
            </el-form-item>
            <el-form-item label="时间:">
                <el-date-picker v-model="inputTime" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间" />
            </el-form-item>
            <el-form-item>
                <el-button @click="hanldeCleanButton" type="danger">清除</el-button>
                <el-button @click="handleSearchButton" type="primary">搜素</el-button>
            </el-form-item>
        </el-form>
        <div style="height: 100%">
            <el-auto-resizer>
                <template #default="{ height, width }">
                    <el-table-v2 :columns="columns" :data="taskTableSearchedList" :width="width" :height="height" fixed
                        :row-height="40" />
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
    -webkit-user-drag: none;
}

.table-render-value {
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    background-color: rgba(0, 0, 0, 0);
    border: none;
    text-align: center;
}

.table-render-value:focus {
    outline-color: #79bbff;
    outline-style: dashed;
    outline-width: 2px;
}
</style>