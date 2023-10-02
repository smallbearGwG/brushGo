<script setup lang="ts">
import { ElButton, ElInput } from 'element-plus';
import fileUtil from '../util/fileUtil';
import SElMEssage from '../util/SElMEssage';
import { reactive, onUnmounted, onUpdated, ref } from 'vue';
import ExcelList from '../components/ExcelList.vue';
import Task from '../../common/Task';

const taskList = reactive<File[]>([]);
const commentList = reactive<File[]>([]);

const taskTableList = reactive<Task[]>([]);
const commentTableList = reactive<Comment[]>([]);

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
    let dataCount = 0
    for (let i = 0; i < taskList.length; i++) {
        const taskFile = taskList[i];
        const sub = async () => {
            logInputTaskData.value += `开始读取 "${taskFile.name}"......` + "\n"
            const result: Task[] = await window.electronAPI.excelService(taskFile.path, taskFile.name, "task");
            if (result) {
                result.splice(0, 1)
                taskTableList.push(...result);
                dataCount += result.length
                logInputTaskData.value += `读取 "${taskFile.name}" 成功,读取了${result.length}条信息` + "\n"
            } else {
                logInputTaskData.value += `读取 "${taskFile.name}"失败` + "\n"
            }
        }
        await sub()
    }
    logInputTaskData.value += `数据读取完毕一共读取了${dataCount}条数据!!!!` + "\n"
}

const loadCommentsFromFile = async () => {
    logInputCommentData.value += `开始读取数据` + "\n"
    let dataCount = 0
    for (let i = 0; i < commentList.length; i++) {
        const taskFile = commentList[i];
        const sub = async () => {
            logInputCommentData.value += `开始读取 "${taskFile.name}"......` + "\n"
            const result: Comment[] = await window.electronAPI.excelService(taskFile.path, taskFile.name, "comment");
            if (result) {
                result.splice(0, 1)
                commentTableList.push(...result);
                dataCount += result.length
                logInputCommentData.value += `读取 "${taskFile.name}" 成功,读取了${result.length}条信息` + "\n"
            } else {
                logInputCommentData.value += `读取 "${taskFile.name}"失败` + "\n"
            }
        }
        await sub()
    }
    logInputCommentData.value += `数据读取完毕一共读取了${dataCount}条数据!!!!` + "\n"
}

//数据导入到文件
const handleLoadAllData = async () => {
    const taskBuffer: Task[] = []
    taskTableList.forEach(async data => {
        taskBuffer.push(
            {
                operator: data.operator,
                shop: data.shop,
                time: data.time,
                showTime: data.showTime,
                orderNumber: data.orderNumber,
                orderId: data.orderId,
                amount: data.amount,
                gift: data.gift,
                expenditureChannel: data.expenditureChannel,
                note: data.note,
                operationPhone: data.operationPhone,
                phoneNumber: data.phoneNumber,
                productName: data.productName,
                keywords: data.keywords,
                jdToTbId: data.jdToTbId,
            }
        )
    })
    await window.electronAPI.brushService("taskService", "addTaskList", taskBuffer)
}

const handleCleanAllData = async () => {

}

</script>
<template>
    <div class="importdata-container">
        <div class="importdata-item-container">
            <div class="importdata-item">
                <div class="item-option">
                    <el-button @click="handleImportTask" type="primary">导入任务表</el-button>
                    <el-button @click="handleCleanTaskList" type="primary">清空</el-button>
                    <el-button @click="loadTaskFromFile" type="primary">加载</el-button>
                </div>
                <excel-list :excelFileList="taskList" :height="'100%'" :padding="`5px`" />
                <el-input v-model="logInputTaskData" :rows="15" type="textarea" placeholder="日志" resize="none"
                    :readonly="true" />
            </div>
            <div class="importdata-item">
                <div class="item-option">
                    <el-button @click="handleImportComments" type="primary">导入评语表</el-button>
                    <el-button @click="handleCleanCommentsList" type="primary">清空</el-button>
                    <el-button @click="loadCommentsFromFile" type="primary">加载</el-button>
                </div>
                <excel-list :excelFileList="commentList" :height="'100%'" :padding="`5px`" />
                <el-input v-model="logInputCommentData" :rows="15" type="textarea" placeholder="日志" resize="none"
                    :readonly="true" />
            </div>
        </div>
        <div class="importdata-option">
            <el-button @click="handleLoadAllData" type="primary">加载全部</el-button>
            <el-button @click="handleCleanAllData" type="danger">清空</el-button>
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