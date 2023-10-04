<script setup lang="ts">
import { onMounted } from 'vue';
import { ElTable } from 'element-plus';

onMounted(async () => {
})

const rowDoubleClick = (row:any, column:any, event:any) => {
}

const tableData = [
    {
        name: "名称"
    },
    {
        name: "名称2"
    },
    {
        name: "名称3"
    },
    {
        name: "名称4"
    },
    {
        name: "名称5"
    },
    {
        name: "名称6"
    }
]

</script>
<template>
    <el-table :data="tableData" @row-dblclick="rowDoubleClick">
        <el-table-column type="expand">
            <template #default="_props">
                <h3>Family</h3>
            </template>
        </el-table-column>
        <el-table-column label="Date" prop="date" />
        <el-table-column label="Name" prop="name" />
    </el-table>
</template>
<style></style>