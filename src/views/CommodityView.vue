<script setup lang="ts">
import { ElInput, ElTable, ElTableColumn } from 'element-plus';
</script>
<template>
    <div class="container">
        <div class="table-button-container">
            <el-input />
            <el-input />
            <el-input />
            <el-input />
            <el-input />
            <el-input />
        </div>
        <el-table>
            <el-table-column label="A" />
            <el-table-column label="B" />
            <el-table-column label="C" />
            <el-table-column label="D" />
        </el-table>
    </div>
</template>
<style>
.container {
    display: flex;
    flex-direction: column;
}
</style>