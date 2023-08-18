<script setup lang="ts">
import { ElForm, ElFormItem, ElButton, ElCard, ElDialog, ElInput, ElScrollbar } from 'element-plus';
import { ref } from 'vue';

const items = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 5, 6, 7, 8, 9, 10])

const dialogAddCommodityVisible = ref(false)

</script>
<template>
    <el-dialog :align-center="true" title="添加商品" destroy-on-close v-model="dialogAddCommodityVisible"
        :close-on-click-modal="false" width="90%">
        <el-scrollbar height="60vh">
            <el-form style="margin-right: 20px;">
                <el-form-item label="text">
                    <el-input placeholder="请输入" />
                </el-form-item>
            </el-form>
        </el-scrollbar>
        <template #footer>
            <el-button type="primary">重置</el-button>
            <el-button type="primary">确定</el-button>
        </template>
    </el-dialog>
    <el-form :inline="true" size="small">
        <el-form-item>
            <el-button @click="dialogAddCommodityVisible = true" type="primary">添加商品</el-button>
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
    margin-bottom: 20px;
}

.container .options {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.container .options .el-button {
    width: 50px;
    margin: 0px;
}
</style>