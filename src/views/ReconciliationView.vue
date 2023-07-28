<script setup lang="ts">
import { ref } from 'vue';
import { ElInput, ElRow, ElCol, ElForm, ElFormItem, ElTable, ElTableColumn, ElButton, ElDialog } from "element-plus";

//dialog显示状态
const taskDialogVisible = ref(false)
const wechatDialogVisible = ref(false)

//表格绑定数据
const taskTableData = [{}]
const wechatTableData = [{}]

//文本框数据
const taskTextarea = ref("")
const wechatTextarea = ref("")

//格式化处理任务导入
const handleTaskImport = () => {
    const taskStringCopy = taskTextarea.value;

    const noBlandStr = new Array()

    taskStringCopy.split("\n").forEach(str => {
        if (!isBlankOrInvisible(str)) {
            noBlandStr.push(str)
        }
    })

    console.log(noBlandStr)

}

//格式化处理微信账单导入
const handleWechatImport = () => {

}

function isBlankOrInvisible(str: string): boolean {
    const pattern = /^\s*$/;
    return pattern.test(str);
}

</script>
<template>
    <el-dialog v-model="taskDialogVisible" title="导入任务数据" draggable align-center width="70%">
        <el-input v-model="taskTextarea" type="textarea" :rows="20"></el-input>
        <template #footer>
            <el-button @click="taskDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleTaskImport"> 确定 </el-button>
        </template>
    </el-dialog>
    <el-dialog v-model="wechatDialogVisible" title="导入微信账单数据" draggable align-center width="70%">
        <el-input v-model="wechatTextarea" type="textarea" :rows="20"></el-input>
        <template #footer>
            <el-button @click="wechatDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleWechatImport"> 确定 </el-button>
        </template>
    </el-dialog>

    <el-form :inline="true">
        <el-form-item>
            <el-button @click="taskDialogVisible = true" type="primary">导入任务列表</el-button>
        </el-form-item>
        <el-form-item>
            <el-button @click="wechatDialogVisible = true" type="primary">导入账单</el-button>
        </el-form-item>
    </el-form>

    <el-row>
        <el-col :span="12">
            <el-table :data="taskTableData">
                <el-table-column label="原始单号" />
                <el-table-column label="客户网名" />
                <el-table-column label="金额" />
                <el-table-column label="礼品" />
            </el-table>
        </el-col>
        <el-col :span="12">
            <el-table :data="wechatTableData">
                <el-table-column label="交易方名称" />
                <el-table-column label="商品" />
                <el-table-column label="金额" />
            </el-table>
        </el-col>
    </el-row>
</template>
<style></style>