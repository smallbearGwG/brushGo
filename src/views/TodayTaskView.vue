<script setup lang="ts">
import { ElForm, ElFormItem, ElButton, ElCard } from 'element-plus';
</script>
<template>
    <el-form :inline="true">
        <el-form-item>
            <el-button color="#626aef">菜单1</el-button>
        </el-form-item>
    </el-form>
    <el-card>
        <div class="card-header">
            <span>穿3200</span>
            <el-button>这是按钮1</el-button>
            <el-button>这是按钮2</el-button>
            <el-button>这是按钮3</el-button>
            <el-button>这是按钮4</el-button>
        </div>
    </el-card>
    <el-card>
        <div class="card-header">
            <span>穿3200</span>
            <el-button>这是按钮1</el-button>
            <el-button>这是按钮2</el-button>
            <el-button>这是按钮3</el-button>
            <el-button>这是按钮4</el-button>
        </div>
    </el-card>
    <el-card>
        <div class="card-header">
            <span>穿3200</span>
            <el-button>这是按钮1</el-button>
            <el-button>这是按钮2</el-button>
            <el-button>这是按钮3</el-button>
            <el-button>这是按钮4</el-button>
        </div>
    </el-card>
</template>
<style>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>