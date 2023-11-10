<script setup lang="tsx" >
import { onMounted, onUpdated, reactive, ref } from 'vue';
import Task from '../../common/Task';
import contextmenuUtil from '../util/contextmenuUtil';

const taskTableData = reactive<Task[]>([]);
const pageTotle = ref(1)
let limit = 50
let ofset = 0

const inputOrderId = ref("")
const inputOrderNumber = ref("")
const inputProductName = ref("")
const inputShop = ref("")
const inputGift = ref("")
const inputOperationPhone = ref("")
const inputTime = ref([])

onMounted(async () => {
    //设置页数
    const taskCount = await window.electronAPI.brushService("taskService", "getCount")
    console.log(taskCount)
    if (taskCount) {
        pageTotle.value = taskCount.count
    }
    await getDatafromLimitAndOffset();
})

onUpdated(async () => {
})


const getDatafromLimitAndOffset = async () => {
    const taskList: Task[] = await window.electronAPI.brushService("taskService", "getPageTask", { limit: limit, offset: ofset })
    // console.log(taskList)
    taskTableData.length = 0
    taskTableData.push(...taskList)
}

/**
 * 清除按钮
 */
const hanldeCleanButton = () => {
    inputOrderId.value = ""
    inputOrderNumber.value = ""
    inputProductName.value = ""
    inputShop.value = ""
    inputGift.value = ""
    inputOperationPhone.value = ""
    inputTime.value = []
}

const currentChange = (value: number) => {
    ofset = limit * value
    console.log(value)
    getDatafromLimitAndOffset();
}

/**
 * 搜索按钮
 */
const handleSearchButton = async () => {
    const orderId = inputOrderId.value;
    const orderNumber = inputOrderNumber.value;
    const productName = inputProductName.value;
    const shop = inputShop.value;
    const gift = inputGift.value;
    const operationPhone = inputOperationPhone.value;
    const time = inputTime.value;

    const requestData = {
        orderId: orderId,
        orderNumber: orderNumber,
        productName: productName,
        shop: shop,
        gift: gift,
        operationPhone: operationPhone,
        time: time,
    }
    const result = await window.electronAPI.brushService("taskService", "searchTask", requestData)
    console.log(result)
}

/**
 * 
 */
const hanldeCellContextmenu = (row: any, column: any, cell: any, event: any) => {
    console.log("row", row)
    console.log("column", column)
    console.log("cell", cell)
    console.log("event", event)

    // event.preventDefault();
    const dropdownX = event.clientX;
    const dropdownY = event.clientY;
    contextmenuUtil(dropdownX, dropdownY, [
        {
            text: "菜单1",
            func: () => {

            },
        },
        {
            text: "菜单2",
            func: () => {

            },
        },
        {
            text: "菜单3",
            func: () => {

            },
        }
    ])
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
        <el-table size="small" stripe border :data="taskTableData" @cell-contextmenu="hanldeCellContextmenu">
            <el-table-column label="序号" type="index" width="60" align="center" />
            <el-table-column label="店铺" prop="shop" width="70" align="center" show-overflow-tooltip />
            <el-table-column label="时间" prop="showTime" width="140" align="center" show-overflow-tooltip />
            <el-table-column label="订单编号" prop="orderNumber" width="190" align="center" show-overflow-tooltip />
            <el-table-column label="客户ID" prop="orderId" width="250" align="center" show-overflow-tooltip />
            <el-table-column label="金额" prop="amount" width="60" align="center" show-overflow-tooltip />
            <el-table-column label="礼品" prop="gift" align="center" show-overflow-tooltip />
            <el-table-column label="支出渠道" prop="expenditureChannel" width="90" align="center" show-overflow-tooltip />
            <el-table-column label="备注" prop="note" width="60" align="center" show-overflow-tooltip />
            <el-table-column label="操作手机" prop="operationPhone" width="90" align="center" show-overflow-tooltip />
            <el-table-column label="手机号码" prop="phoneNumber" width="90" align="center" show-overflow-tooltip />
            <el-table-column label="产品名称" prop="productName" width="200" align="center" show-overflow-tooltip />
            <el-table-column label="关键词" prop="keywords" width="100" align="center" show-overflow-tooltip />
            <el-table-column label="京东对应淘宝ID" prop="jdToTbId" width="250" align="center" show-overflow-tooltip />
        </el-table>
        <el-pagination small background layout="prev, pager, next, jumper" :page-size="50" :pager-count="11"
            :total="pageTotle" @current-change="currentChange" @prev-click="" @next-click="" />
    </div>
</template>
<style>
.alltasklist-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 15px;
}
</style>