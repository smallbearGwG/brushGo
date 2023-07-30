<script setup lang="ts">
import { ref } from 'vue';
import { ElButton, ElForm, ElFormItem, ElTable, ElTableColumn, ElInput, ElDialog } from 'element-plus';

import { Search } from '@element-plus/icons-vue'

const deleteDialogVisible = ref(false)

const handleDelete = (index: number, a: any) => {
    console.log(index, a)
    window.electronAPI.notification()
    // deleteDialogVisible.value = true
}

const data = [
    {
        name: "礼品1"
    }, {
        name: "礼品2"
    }, {
        name: "礼品3"
    }, {
        name: "礼品4"
    }, {
        name: "礼品5"
    }, {
        name: "礼品6"
    }, {
        name: "礼品7"
    },
]

</script>
<template>
    <el-dialog v-model="deleteDialogVisible" title="标题">
        <h1>HELLO</h1>
    </el-dialog>

    <el-form :inline="true">
        <el-form-item>
            <el-button type="primary">添加新礼品</el-button>
        </el-form-item>
        <el-form-item label="名称:">
            <el-input placeholder="请输入礼品名称" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" :icon="Search">搜素</el-button>
        </el-form-item>
    </el-form>
    <el-table :data="data" :stripe="true">
        <el-table-column prop="name" label="礼品" />
        <el-table-column label="是否有货">
            <template #default>
                <el-button type="success" size="small" plain>有货</el-button>
            </template>
        </el-table-column>
        <el-table-column width="80px" label="操作">
            <template #default="scope">
                <el-button @click="handleDelete(scope.$index, scope.row)" type="danger" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<style></style>