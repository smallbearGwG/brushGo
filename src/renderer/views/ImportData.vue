<script setup lang="ts">
import { ElButton, ElInput } from 'element-plus';
import fileUtil from '../util/fileUtil';
import SElMEssage from '../util/SElMEssage';
import { reactive, onUnmounted, onUpdated, ref, Ref } from 'vue';
import ExcelList, { ExcelFile } from '../components/ExcelList.vue';
import Task from '../../common/Task';
import Comment from '../../common/Comment';

const taskFileList = reactive<ExcelFile[]>([]);
const commentFileList = reactive<ExcelFile[]>([]);

const taskList: Task[] = [];
const commentList: Comment[] = [];

const logInputTaskData = ref("");
const logInputCommentData = ref("");

onUnmounted(async () => {
})

onUpdated(async () => {
})

const importFileUtil = async () => {
    return await fileUtil.getInput([
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ])
}

const importFile = async (resultList: ExcelFile[]) => {
    const result = await importFileUtil()
    if (result) {
        result.forEach(data => {
            const newData = (data as ExcelFile)
            newData.loading = ref(false)
            resultList.push(newData)
        })
    } else {
        SElMEssage({
            type: "error", message: "文件类型错误"
        })
    }
}

const handleImportTask = async () => {
    importFile(taskFileList)
}

const handleImportComments = async () => {
    importFile(commentFileList)
}

const handleCleanTaskList = () => {
    taskFileList.length = 0
    taskList.length = 0
    taskFileList.push()
    taskList.push()
    logInputTaskData.value = ""
}

const handleCleanCommentsList = () => {
    commentFileList.length = 0
    commentList.length = 0
    commentFileList.push()
    commentList.push()
    logInputCommentData.value = ""
}

const importExcelFiles = async (inputRef: Ref, taskList: ExcelFile[], resultList: any[], excelImportFunction: Function) => {
    inputRef.value += `开始读取数据` + "\n"
    let dataCount = 0
    for (let i = 0; i < taskList.length; i++) {
        const taskFile = taskList[i];
        const sub = async () => {
            inputRef.value += `开始读取 "${taskFile.name}"......` + "\n"
            const result: Task[] = await excelImportFunction(taskFile.path, taskFile.name);
            if (result) {
                result.splice(0, 1)
                resultList.push(...result);
                dataCount += result.length
                inputRef.value += `读取 "${taskFile.name}" 成功,读取了${result.length}条信息` + "\n"
            } else {
                inputRef.value += `读取 "${taskFile.name}"失败` + "\n"
            }
            if (taskFile.loading)
                taskFile.loading.value = true
        }
        await sub()
    }
    inputRef.value += `数据读取完毕一共读取了${dataCount}条数据!!!!` + "\n"
}

const loadTaskFromFile = async () => {
    const func: Function = window.electronAPI.exceTaskImport;
    await importExcelFiles(logInputTaskData, taskFileList, taskList, func)
}

const loadCommentsFromFile = async () => {
    const func: Function = window.electronAPI.exceCommentImport;
    await importExcelFiles(logInputCommentData, commentFileList, commentList, func)
}

//数据导入到文件
const handleLoadAllDataToFile = async () => {
    //任务数据
    if (taskList && taskList.length > 0) {
        await window.electronAPI.brushService("taskService", "addTaskList", [...taskList])
        SElMEssage({
            type: "error", message: `一共写入${taskList.length}条任务`
        })
    }
    //评语数据
    if (commentList && commentList.length > 0) {
        await window.electronAPI.brushService("commentService", "addCommentList", [...commentList])
        SElMEssage({
            type: "success", message: `一共写入${commentList.length}条任务`
        })
    }
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
                    <el-button @click="handleCleanTaskList" type="danger">清空</el-button>
                    <el-button @click="loadTaskFromFile" type="success">加载</el-button>
                </div>
                <excel-list :excelFileList="taskFileList" :height="'100%'" :padding="`5px`" />
                <el-input v-model="logInputTaskData" :rows="15" type="textarea" placeholder="日志" resize="none"
                    :readonly="true" />
                <el-button type="primary">数据浏览</el-button>
            </div>
            <div class="importdata-item">
                <div class="item-option">
                    <el-button @click="handleImportComments" type="primary">导入评语表</el-button>
                    <el-button @click="handleCleanCommentsList" type="danger">清空</el-button>
                    <el-button @click="loadCommentsFromFile" type="success">加载</el-button>
                </div>
                <excel-list :excelFileList="commentFileList" :height="'100%'" :padding="`5px`" />
                <el-input v-model="logInputCommentData" :rows="15" type="textarea" placeholder="日志" resize="none"
                    :readonly="true" />
                <el-button type="primary">数据浏览</el-button>
            </div>
        </div>
        <div class="importdata-option">
            <el-button @click="handleLoadAllDataToFile" type="primary">写入文件</el-button>
            <el-button @click="handleCleanAllData" type="danger">清空全部</el-button>
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
    gap: 30px;
}
</style>