<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElInput, ElRow, ElCol, ElForm, ElFormItem, ElTable, ElTableColumn, ElButton, ElDialog, TableColumnCtx } from "element-plus";
import { da } from 'element-plus/es/locale/index.js';

//dialog显示状态
const taskDialogVisible = ref(false)
const wechatDialogVisible = ref(false)

interface TableStatus {
    status?: "ok" | "nodata" | "repeat" | "notmatch" | "moneyerror"
}


interface TaskTable extends TableStatus {
    orderNumber: string,
    name: string,
    money: number,
    gift: number | string
    moneyPlusGift?: number
}

interface WechatTable extends TableStatus {
    wechatName: string,
    remark: string,
    rae: string
    money: number
}

//表格绑定数据
const taskTableData: TaskTable[] = reactive<TaskTable[]>([])
const wechatTableData: WechatTable[] = reactive<WechatTable[]>([])

//文本框数据
const taskTextarea = ref("")
const wechatTextarea = ref("")

//单日任务导入
const handleTaskImport = () => {
    const taskStringCopy = taskTextarea.value;

    //过滤掉空白的行
    const noBlandStr = new Array()
    taskStringCopy.split("\n").forEach(str => {
        if (!isBlankOrInvisible(str)) {
            noBlandStr.push(str)
        }
    })

    noBlandStr.forEach(i => {
        const lines = i.split("\t");
        taskTableData.push({
            orderNumber: lines[0],
            name: lines[1],
            money: lines[2],
            gift: lines[3],
            moneyPlusGift: Number(lines[2]) + (Number.isNaN(Number(lines[3])) ? 0 : Number(lines[3]))
        })
    })
    taskDialogVisible.value = false
}

//单日微信账单导入
const handleWechatImport = () => {
    const wechatStringCopy = wechatTextarea.value;

    //过滤掉空白的行
    const noBlandStr = new Array()
    wechatStringCopy.split("\n").forEach(str => {
        if (!isBlankOrInvisible(str)) {
            noBlandStr.push(str)
        }
    })
    noBlandStr.forEach(i => {
        const lines = i.split("\t");
        wechatTableData.push({
            wechatName: lines[0],
            remark: lines[1],
            rae: lines[2],
            money: Number(lines[3].replace("¥", ""))
        })
    })
    wechatDialogVisible.value = false
}

//空白行判断
const isBlankOrInvisible = (str: string): boolean => {
    const pattern = /^\s*$/;
    return pattern.test(str);
}

//清空表格数据
const cleanTable = () => {
    taskTableData.length = 0
    taskTableData.push()
    wechatTableData.length = 0
    wechatTableData.push()
}

//计算
const calcReconciliation = () => {

    const taskDataMap = new Map()
    const wechatDataMap = new Map()

    //账单去重
    wechatTableData.forEach(data => {
        const splitedStr = data.remark.split(":")
        if (splitedStr.length < 3) {
            //账单备注没有订单号的
            data.status = "nodata"
        } else {
            const wechatOrderNumber = splitedStr[2]
            if (wechatDataMap.has(wechatOrderNumber) == false) {
                wechatDataMap.set(wechatOrderNumber, data)
            } else {
                //重复
                data.status = "repeat"
            }
        }
    })
    //任务去重
    taskTableData.forEach(data => {
        if (taskDataMap.has(data.orderNumber) == false) {
            taskDataMap.set(data.orderNumber, data)
        } else {
            //重复
            data.status = "repeat"
        }
    })

    //两边对账
    wechatDataMap.forEach((value, key) => {
        //从任务中找到该订单
        if (taskDataMap.has(key)) {
            //价格比对
            const taskData = taskDataMap.get(key)
            if (taskData.moneyPlusGift === value.money) {
                //价格相同
                taskData.status = "ok"
                value.status = "ok"
            } else {
                //价格不同
                value.status = "moneyerror"
            }
        } else {
            value.status = "notmatch"
        }
    })

    //找到单日任务中没有找到的部分
    taskDataMap.forEach((value) => {
        if (!value.status) {
            value.status = "notmatch"
        }
    })

}

///表格状态样式
const tableRowClassName = ({ row, rowIndex }: { row: TaskTable, rowIndex: number }) => {
    if (rowIndex) rowIndex = rowIndex
    switch (row.status) {
        case "ok":
            return "ok-row"
        case "nodata":
            return "no-data-row"
        case "repeat":
            return "repeat-row"
        case "notmatch":
            return "not-match"
        case "moneyerror":
            return "money-error"
        default:
            return ""
    }
}

interface SummaryMethodProps<T = TaskTable> {
    columns: TableColumnCtx<T>[]
    data: T[]
}

const getTaskDataSummary = (param: SummaryMethodProps) => {
    const { columns, data } = param
    columns.forEach((column, index) => {
        const values = data.map((item) => Number(item[column.property]))
        console.log(values)
    })

    return ["1", "2"]
}

</script>
<template>
    <el-dialog v-model="taskDialogVisible" title="导入单日任务" draggable align-center width="70%" @closed="taskTextarea = ''">
        <el-input v-model="taskTextarea" type="textarea" :rows="20"></el-input>
        <template #footer>
            <el-button @click="taskDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleTaskImport"> 确定 </el-button>
        </template>
    </el-dialog>
    <el-dialog v-model="wechatDialogVisible" title="导入单日账单" draggable align-center width="70%" @close="wechatTextarea = ''">
        <el-input v-model="wechatTextarea" type="textarea" :rows="20"></el-input>
        <template #footer>
            <el-button @click="wechatDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleWechatImport"> 确定 </el-button>
        </template>
    </el-dialog>

    <el-form :inline="true">
        <el-form-item>
            <el-button @click="cleanTable" type="primary">清空</el-button>
        </el-form-item>
        <el-form-item>
            <el-button @click="taskDialogVisible = true" type="primary">导入单日任务</el-button>
        </el-form-item>
        <el-form-item>
            <el-button @click="wechatDialogVisible = true" type="primary">导入单日账单</el-button>
        </el-form-item>
        <el-form-item>
            <el-button @click="calcReconciliation" type="primary">计算</el-button>
        </el-form-item>
    </el-form>

    <el-row>
        <el-col :span="12">
            <el-table :border="true" :data="taskTableData" size="small" table-layout="auto"
                :row-class-name="tableRowClassName" style="width: 100%" height="100%" show-summary
                :summary-method="getTaskDataSummary">
                <el-table-column type="index" :index="1" />
                <el-table-column prop="orderNumber" label="原始单号" />
                <el-table-column prop="name" label="客户网名" />
                <el-table-column prop="money" label="金额" />
                <el-table-column prop="gift" label="礼品" />
                <el-table-column prop="moneyPlusGift" label="金额+礼品"></el-table-column>
            </el-table>
        </el-col>
        <el-col :span="12">
            <el-table :border="true" :data="wechatTableData" size="small" :show-summary="true" table-layout="auto"
                :row-class-name="tableRowClassName" style="width: 100%" height="100%">
                <el-table-column type="index" :index="1" />
                <el-table-column prop="wechatName" label="交易方名称" />
                <el-table-column prop="remark" label="商品" />
                <el-table-column prop="rae" label="商品" />
                <el-table-column prop="money" label="金额" />
            </el-table>
        </el-col>
    </el-row>
</template>
<style>
.el-table .no-data-row {
    background-color: #c6e2ff
}

.el-table .repeat-row {
    background-color: #dedfe0
}

.el-table .not-match {
    background-color: #f8e3c5
}

.el-table .money-error {
    background-color: #fcd3d3
}

.el-table .ok-row {
    background-color: #d1edc4
}
</style>