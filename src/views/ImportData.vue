<script setup lang="ts">
import { ElButton, ElTable, ElTableColumn, ElDialog, ElInput } from 'element-plus';
import fileUtil from '../util/fileUtil';
import SElMEssage from '../util/SElMEssage';
import { reactive, onUnmounted, onUpdated, ref } from 'vue';
import ExcelList from '../components/ExcelList.vue';
import Task from '../../common/Task';

const taskList = reactive<File[]>([]);
const commentList = reactive<File[]>([]);

const taskTableDialogVisible = ref(false)
const commentDialogVisible = ref(false)

const taskTableList = reactive<Task[]>([]);
const commentTableList = reactive([]);

const logInputTaskData = ref("");
const logInputCommentData = ref("");

onUnmounted(async () => {
})

onUpdated(async () => {
})

const importFile = async () => {
    return await fileUtil.getInput([
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ])
}

const handleImportTask = async () => {
    const result = await importFile()
    if (result) {
        taskList.push(...result)
    } else {
        SElMEssage({
            type: "error", message: "文件类型错误"
        })
    }
}

const handleImportComments = async () => {
    const result = await importFile()
    if (result) {
        commentList.push(...result)
    } else {
        SElMEssage({
            type: "error", message: "文件类型错误"
        })
    }
}

const handleCleanTaskList = () => {
    taskList.length = 0
    taskTableList.length = 0
    taskList.push()
    taskTableList.push()
    logInputTaskData.value = ""
}

const handleCleanCommentsList = () => {
    commentList.length = 0
    commentTableList.length = 0
    commentList.push()
    commentTableList.push()
    logInputCommentData.value = ""
}

const loadTaskFromFile = async () => {
    logInputTaskData.value += `开始读取数据` + "\n"
    for (let i = 0; i < taskList.length; i++) {
        const taskFile = taskList[i];
        const sub = async () => {
            logInputTaskData.value += `开始读取 "${taskFile.name}"......` + "\n"
            const result: Task[] = await window.electronAPI.excelService(taskFile.path, taskFile.name, "task");
            if (result) {
                result.splice(0, 1)
                taskTableList.push(...result);
                logInputTaskData.value += `读取 "${taskFile.name}" 成功,一共读取了${result.length}条信息` + "\n"
            } else {
                logInputTaskData.value += `读取 "${taskFile.name}"失败` + "\n"
            }
        }
        await sub()
    }
}

const loadCommentsFromFile = async () => {
    logInputCommentData.value += `开始读取数据` + "\n"
    for (let i = 0; i < commentList.length; i++) {
        const taskFile = commentList[i];
        const sub = async () => {
            logInputCommentData.value += `开始读取 "${taskFile.name}"......` + "\n"
            const result: Task[] = await window.electronAPI.excelService(taskFile.path, taskFile.name, "task");
            if (result) {
                result.splice(0, 1)
                taskTableList.push(...result);
                logInputCommentData.value += `读取 "${taskFile.name}" 成功,一共读取了${result.length}条信息` + "\n"
            } else {
                logInputCommentData.value += `读取 "${taskFile.name}"失败` + "\n"
            }
        }
        await sub()
    }
}

</script>
<template>
    <el-dialog v-model="taskTableDialogVisible" width="60%" destroy-on-close :style="{ height: '70%' }">
        <div class="table-container" style="max-height: calc(100% - 40px);">
            <el-table stripe style="max-height: 100%; height: 100%;" :border="true" :data="taskTableList" size="small">
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
        </div>
    </el-dialog>
    <el-dialog v-model="commentDialogVisible" width="60%" destroy-on-close>
        <el-table stripe style="max-height: 100%; height: 100%;" :border="true" :data="commentTableList" size="small">
            <el-table-column label="操作人" />
        </el-table>
    </el-dialog>

    <div class="importdata-container">
        <div class="importdata-item-container">
            <div class="importdata-item">
                <div class="item-option">
                    <el-button @click="handleImportTask" type="primary">导入任务表</el-button>
                    <el-button @click="handleCleanTaskList" type="primary">清空</el-button>
                    <el-button @click="loadTaskFromFile" type="primary">加载</el-button>
                </div>
                <excel-list :excelFileList="taskList" :height="'100%'" :padding="`5px`" />
                <el-input v-model="logInputTaskData" :rows="10" type="textarea" placeholder="日志" resize="none"
                    :readonly="true" />
                <el-button @click="() => {
                    taskTableDialogVisible = true
                }" type="success">数据浏览</el-button>
            </div>
            <div class="importdata-item">
                <div class="item-option">
                    <el-button @click="handleImportComments" type="primary">导入评语表</el-button>
                    <el-button @click="handleCleanCommentsList" type="primary">清空</el-button>
                    <el-button @click="loadCommentsFromFile" type="primary">加载</el-button>
                </div>
                <excel-list :excelFileList="commentList" :height="'100%'" :padding="`5px`" />
                <el-input v-model="logInputCommentData" :rows="10" type="textarea" placeholder="日志" resize="none"
                    :readonly="true" />
                <el-button @click="() => {
                    commentDialogVisible = true
                }" type="success">数据浏览</el-button>
            </div>
        </div>
        <div class="importdata-option">
            <el-button type="primary">操作1</el-button>
            <el-button type="primary">操作2</el-button>
            <el-button type="primary">操作3</el-button>
        </div>
    </div>
</template>
<style>
.importdata-container {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.importdata-container .importdata-item-container {
    width: 100%;
    height: 100%;
    display: flex;
    gap: 10px;
    overflow: hidden;
}

.importdata-container .importdata-item-container .importdata-item {
    width: calc(50% - 5px);
    max-width: calc(50% - 5px);
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.importdata-container .importdata-option {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>