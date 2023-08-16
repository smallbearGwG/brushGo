<script setup lang="ts">
import { ElForm, ElFormItem, ElButton, ElCard } from 'element-plus';
import { ref } from 'vue';
const items = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 5, 6, 7, 8, 9, 10])

</script>
<template>
    <el-form :inline="true" size="small">
        <el-form-item label="这是一个元素">
            <el-button>添加商品</el-button>
        </el-form-item>
        <el-form-item label="这是一个元素">
            <el-button>添加商品</el-button>
        </el-form-item>
        <el-form-item label="这是一个元素">
            <el-button>添加商品</el-button>
        </el-form-item>
        <el-form-item label="这是一个元素">
            <el-button>添加商品</el-button>
        </el-form-item>
    </el-form>
    <div class="container">
        <el-card v-for="_item in items" shadow="never" style="width: 140px;" :body-style="{
            display: 'flex', justifyContent: 'center', flexWrap: 'wrap'
        }">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                class="image" />
            <div class="options">
                <el-button size="small">编辑</el-button>
                <el-button size="small">复制</el-button>
                <el-button size="small">删除</el-button>
                <el-button size="small">操作</el-button>
            </div>
        </el-card>
    </div>
</template>
<style>
.container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 5px;
}

.container img {
    width: 100px;
    height: 100px;
}

.container .options {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
}

.container .options .el-button {
    width: 45px;
    margin: 0px;
}
</style>