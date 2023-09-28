<script setup lang="ts">
import { ElButton, ElTable, ElTableColumn, ElLoading } from 'element-plus';
import fileUtil from '../util/fileUtil';
import SElMEssage from '../util/SElMEssage';
import { reactive, onUnmounted, onUpdated } from 'vue';
import ExcelList from '../components/ExcelList.vue';
import Task from '../../common/Task';

const taskList = reactive<File[]>([]);
const commentList = reactive<File[]>([]);

const taskTableList = reactive<Task[]>([]);
const commentTableList = reactive([]);

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
        taskList.push(result)
    } else {
        SElMEssage({
            type: "error", message: "文件类型错误"
        })
    }
}

const handleImportComments = async () => {
    const result = await importFile()
    if (result) {
        commentList.push(result)
    } else {
        SElMEssage({
            type: "error", message: "文件类型错误"
        })
    }
}

const cleanTaskList = () => {
    taskList.length = 0
    taskTableList.length = 0
    taskList.push()
    taskTableList.push()
}

const cleanCommentsList = () => {
}

const loadTaskFromFile = async () => {

    const loading = ElLoading.service({
        lock: true,
        text: 'Loading'
    });

    const processData = async () => {
        for (let i = 0; i < taskList.length; i++) {
            const taskFile = taskList[i];
            const result: Task[] = await window.electronAPI.excelService(taskFile.path, taskFile.name, "task");
            if (result) {
                result.splice(0, 1)
                taskTableList.push(...result);
            } else {
                SElMEssage({
                    type: "error",
                    message: `导入${taskFile}发生错误`,
                });
            }
        }

        loading.close();
    };

    requestAnimationFrame(processData);
}

const loadCommentsFromFile = async () => {
    for (let i = 0; i < commentList.length; i++) {
        const taskFile = commentList[i]
        const result: Comment[] = await window.electronAPI.excelService(taskFile.path, taskFile.name, "comment");
        console.log(result)
    }
}

</script>
<template>
    <div class="importdata-container">
        <div class="importdata-item-container">
            <div class="importdata-item">
                <div class="item-option">
                    <el-button @click="handleImportTask" type="primary">导入任务表</el-button>
                    <el-button @click="cleanTaskList" type="primary">清空</el-button>
                    <el-button @click="loadTaskFromFile" type="primary">加载</el-button>
                </div>
                <excel-list :excelFileList="taskList" />
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
            <div class="importdata-item">
                <div class="item-option">
                    <el-button @click="handleImportComments" type="primary">导入评语表</el-button>
                    <el-button @click="cleanCommentsList" type="primary">清空</el-button>
                    <el-button @click="loadCommentsFromFile" type="primary">加载</el-button>
                </div>
                <excel-list :excelFileList="commentList" />
                <el-table stripe style="max-height: 100%; height: 100%;" :border="true" :data="commentTableList"
                    size="small">
                    <el-table-column label="操作人" />
                </el-table>
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