<script setup lang="ts">
</script>
<template>
    <el-dialog :align-center="true" title="添加新话术">
        <el-form-item>
            <el-input placeholder="请输入话术" type="textarea" />
        </el-form-item>
    </el-dialog>

    <el-form :inline="true">
        <el-form-item>
            <el-button type="primary">添加新话术</el-button>
        </el-form-item>
    </el-form>
    <el-table height="80vh">
        <el-table-column label="话术" />
        <el-table-column label="操作" />
    </el-table>
</template>
<style></style>