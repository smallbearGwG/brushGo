<script setup lang="tsx">

import { ElScrollbar } from 'element-plus';
import { Ref } from 'vue';

const props = defineProps(
    {
        excelFileList: {
            type: Array
        },
        height: {
            type: String
        },
        padding: {
            type: String
        }
    }
)

export interface ExcelFile extends File {
    loading?: Ref;
}

</script>
<template>
    <div class="excel-container" :style="{ height: `${props.height}`, padding: `${props.padding}` }">
        <el-scrollbar>
            <div class="excel-list">
                <div v-for="(item, index) in (props.excelFileList as ExcelFile[])" :key="index" class="excel-list-item"
                    ref="">
                    <img class="excel-img" src="../assets/excel.svg" />
                    <span :data-hover-text="item.name"> {{ item.name }}</span>
                    <img v-if="item.loading" class="excel-close-img" src="../assets/excel_close.svg" @click="() => {
                        const list = props.excelFileList as ExcelFile[]
                        list.splice(list.indexOf(item), 1);
                    }" />
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>
<style>
.excel-container {
    border: 1px dashed black;
    border-radius: 5px;
}

.excel-list {
    height: 50px;
    width: 100%;
    display: flex;
    gap: 5px;
    justify-content: flex-start;
    flex-wrap: wrap;
    box-sizing: border-box;
}

.excel-list .excel-list-item {
    user-select: none;
    height: calc(100% - 2px);
    width: 120px;
    border: 1px solid #95d475;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    position: relative;
}

.excel-list .excel-list-item:hover {
    border: 1px solid #529b2e;
}

.excel-list .excel-list-item span:hover::after {
    content: attr(data-hover-text);
    position: absolute;
    display: block;
    background-color: #fff;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    top: 0px;
    left: 0px;
}

.excel-list .excel-list-item .excel-img {
    -webkit-user-drag: none;
    width: 40px;
    height: 40px;
}

.excel-list .excel-list-item span {
    max-width: 100px;
    max-height: 100%;
    font-size: 10px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.excel-list .excel-list-item .excel-close-img {
    width: 30px;
    height: 30px;
    cursor: pointer;
}
</style>