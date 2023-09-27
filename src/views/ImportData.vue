<script setup lang="ts">
import { ElButton, ElTable, ElTableColumn, ElScrollbar } from 'element-plus';
import fileUtil from '../util/fileUtil';
import SElMEssage from '../util/SElMEssage';
import { reactive } from 'vue';

const taskList = reactive<File[]>([]);
const commentList = reactive<File[]>([]);

const taskTableList = reactive([]);
const commentTableList = reactive([]);

const handleImportTask = () => {
    fileUtil.getInput([
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ]).then((file: File) => {
        taskList.push(file)
    }).catch((_error: Error) => {
        SElMEssage({
            type: "error", message: "文件类型错误"
        })
    })
}

const handleImportComments = () => {
    fileUtil.getInput([
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ]).then((file: File) => {
        commentList.push(file)
    }).catch((_error: Error) => {
        SElMEssage({
            type: "error", message: "文件类型错误"
        })
    })
}

const cleanTaskList = () => {
}

const cleanCommentsList = () => {
}

const loadTaskList = async () => {
    for (let i = 0; i < taskList.length; i++) {
        const taskFile = taskList[i]
        await window.electronAPI.excelService(taskFile.path, taskFile.name, "")
    }
}
</script>
<template>
    <div class="importdata-container">
        <div class="item-container">
            <div class="op">
                <el-button @click="handleImportTask" type="primary">导入任务表</el-button>
                <el-button @click="cleanTaskList" type="primary">清空</el-button>
                <el-button @click="loadTaskList" type="primary">加载</el-button>
            </div>
            <div class="data">
                <el-scrollbar>
                    <div class="files">
                        <div v-for="item in taskList" class="files-iteam">
                            <img class="excel-img" src="../assets/excel.svg" />
                            <span> {{ item.name }}</span>
                            <img class="excel-close-img" src="../assets/excel_close.svg" @click="() => {
                                taskList.splice(taskList.indexOf(item), 1);
                            }" />
                        </div>
                    </div>
                </el-scrollbar>
                <el-table :data="taskTableList">
                    <el-table-column label="操作人" />
                </el-table>
            </div>
        </div>
        <div class="item-container">
            <div class="op">
                <el-button @click="handleImportComments" type="primary">导入评语表</el-button>
                <el-button @click="cleanCommentsList" type="primary">清空</el-button>
                <el-button type="primary">加载</el-button>
            </div>
            <div class="data">
                <div class="files">
                    <div v-for="item in commentList" class="files-iteam">
                        <img class="excel-img" src="../assets/excel.svg" />
                        <span> {{ item.name }}</span>
                        <img class="excel-close-img" src="../assets/excel_close.svg" @click="() => {
                            taskList.splice(taskList.indexOf(item), 1);
                        }" />
                    </div>
                </div>
                <el-table :data="commentTableList">
                    <el-table-column label="操作人" />
                </el-table>
            </div>
        </div>
    </div>
</template>
<style>
.importdata-container {
    display: flex;
    position: relative;
    box-sizing: border-box;
    gap: 10px;
}

.item-container {
    flex: 1;
    max-width: calc(50% - 5px);
    max-height: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.item-container .op {
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
}

.item-container .data .files {
    height: 50px;
    width: 100%;
    display: flex;
    gap: 5px;
    justify-content: flex-start;
    flex-wrap: wrap;
    box-sizing: border-box;
}

.item-container .data .files .files-iteam {
    height: calc(100% - 2px);
    width: 120px;
    border: 1px solid green;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
}

.item-container .data .files .files-iteam .excel-img {
    width: 40px;
    height: 40px;
}

.item-container .data .files .files-iteam span {
    max-width: 100px;
    max-height: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 10px;
    text-align: center;
}

.item-container .data .files .files-iteam .excel-close-img {
    width: 30px;
    height: 30px;
    cursor: pointer;
}
</style>