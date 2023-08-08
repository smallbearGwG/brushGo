<script setup lang="ts">
import { reactive, ref } from "vue";
import Speech from "../../common/speech"

const sppechTableData: Speech[] = reactive<Speech[]>([]);

const dialogNewSppedchVisible = ref(false)

</script>
<template>
    <el-dialog :align-center="true" v-model="dialogNewSppedchVisible" title="添加新话术">
        <el-form-item>
            <el-input placeholder="请输入话术" type="textarea" />
        </el-form-item>
        <template #footer>
            <el-button @click="dialogNewSppedchVisible = false">取消</el-button>
            <el-button type="primary">添加 </el-button>
        </template>
    </el-dialog>

    <el-form :inline="true">
        <el-form-item>
            <el-button @click="dialogNewSppedchVisible = true" type="primary">添加新话术</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">随机一个话术</el-button>
        </el-form-item>
    </el-form>
    <el-table :data="sppechTableData" height="80vh">
        <el-table-column label="话术" />
        <el-table-column label="操作" />
    </el-table>
</template>
<style></style>