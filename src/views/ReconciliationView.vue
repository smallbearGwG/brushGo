<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElInput, ElRow, ElCol, ElForm, ElFormItem, ElTable, ElTableColumn, ElButton, ElDialog } from "element-plus";

//dialog显示状态
const taskDialogVisible = ref(false)
const wechatDialogVisible = ref(false)

interface TableStatus {
    status?: "success" | "warring" | "error"
}

interface TaskTable extends TableStatus {
    orderNumber: string,
    name: string,
    money: number,
    gift: number | string
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
            money: lines[3].replace("¥", "")
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
    for (let i = 0; i < wechatTableData.length; i++) {
        const data = wechatTableData[i]
        const splitedStr = data.remark.split(":")
        if (splitedStr.length < 3) {
            data.status = "warring"
        } else {

        }
    }
}


const tableRowClassName = ({ row, rowIndex }: { row: TaskTable, rowIndex: number }) => {
    if (rowIndex) rowIndex = rowIndex
    switch (row.status) {
        case "warring":
            return "warring-row"
        case "error":
            return "error-row"
        default:
            return ""
    }
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
            <el-table stripe :border="true" :data="taskTableData" size="small" :show-summary="true" table-layout="auto"
                :row-class-name="tableRowClassName">
                <el-table-column prop="orderNumber" label="原始单号" />
                <el-table-column prop="name" label="客户网名" />
                <el-table-column prop="money" label="金额" />
                <el-table-column prop="gift" label="礼品" />
            </el-table>
        </el-col>
        <el-col :span="12">
            <el-table stripe :border="true" :data="wechatTableData" size="small" :show-summary="true" table-layout="auto"
                :row-class-name="tableRowClassName">
                <el-table-column prop="wechatName" label="交易方名称" />
                <el-table-column prop="remark" label="商品" />
                <el-table-column prop="rae" label="商品" />
                <el-table-column prop="money" label="金额" />
            </el-table>
        </el-col>
    </el-row>
</template>
<style>
.el-table .warring-row {
    background-color: #f3d19e;
}

.el-table .error-row {
    background-color: #fab6b6;
}

.el-table .success-row {
    background-color: #b3e19d;
}
</style>