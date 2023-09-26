<script setup lang="ts">
import { ElButton, ElTable, ElTableColumn, ElScrollbar } from 'element-plus';
import fileUtil from '../util/fileUtil';
import SElMEssage from '../util/SElMEssage';

const handleImportTask = () => {
    fileUtil.getInput([
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ]).then((file: File) => {
        console.log(file)
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
        console.log(file)
    }).catch((_error: Error) => {
        SElMEssage({
            type: "error", message: "文件类型错误"
        })
    })
}

</script>
<template>
    <div class="importdata-container">
        <div class="item-container">
            <div class="op">
                <el-button @click="handleImportTask" type="primary">导入任务表</el-button>
                <el-button type="primary">清空</el-button>
                <el-button type="primary">加载</el-button>
            </div>
            <div class="data">
                <el-scrollbar>
                    <div class="files">
                        <div class="files-iteam"></div>
                        <div class="files-iteam"></div>
                        <div class="files-iteam"></div>
                        <div class="files-iteam"></div>
                        <div class="files-iteam"></div>
                        <div class="files-iteam"></div>
                    </div>
                </el-scrollbar>
                <el-table>
                    <el-table-column label="操作人" />
                </el-table>
            </div>
        </div>
        <div class="item-container">
            <div class="op">
                <el-button @click="handleImportComments" type="primary">导入评语表</el-button>
                <el-button type="primary">清空</el-button>
                <el-button type="primary">加载</el-button>
            </div>
            <div class="data">
                <div class="files">

                </div>
                <el-table>
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
    height: 60px;
    width: 100%;
    display: flex;
    gap: 5px;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 5px;
}

.item-container .data .files .files-iteam {
    height: calc(100% - 2px);
    width: calc(25% - 10px);
    border: 1px solid black;
    border-radius: 5px;
}
</style>