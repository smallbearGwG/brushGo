<script setup lang="ts">
import { ElForm, ElFormItem, ElButton, ElCard, ElDialog, ElInput, ElScrollbar } from 'element-plus';
import { ref } from 'vue';

import ImageUploadList, { ImageItems } from "../components/ImageUploadList.vue";

import Commodity from "../../common/Commodity"

const items = ref<Commodity[]>([
    {
        name: "name",
        id: "id",
        shopUid: "uid"
    },
])

const fileList = ref<ImageItems[]>([
    {
        name: 'food.jpeg',
        data: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    }, {
        name: 'food.jpeg',
        data: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    }, {
        name: 'food.jpeg',
        data: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    },])

const dialogAddCommodityVisible = ref(false)
const dialogImageViewVisible = ref(false)

const dialogImageView = ref('')


const handleDelete = (index: number) => {
    console.log(fileList.value.splice(index, 1))
}

const handleZoom = (index: number) => {
    dialogImageView.value = fileList.value[index].data
    dialogImageViewVisible.value = true
}

</script>
<template>
    <el-dialog v-model="dialogImageViewVisible" width="45%" align-center :draggable="true" destroy-on-close append-to-body>
        <img :style="{ width: '100%', height: '100%' }" :src="dialogImageView" alt="Preview Image">
    </el-dialog>
    <el-dialog :align-center="true" title="添加商品" destroy-on-close v-model="dialogAddCommodityVisible"
        :close-on-click-modal="false" width="90%">
        <el-scrollbar>
            <el-form style="margin-right: 20px;">
                <el-form-item label="商品名称:">
                    <el-input placeholder="请输入" />
                </el-form-item>
                <el-form-item label="商品编号:">
                    <el-input placeholder="请输入" />
                </el-form-item>
                <el-form-item label="所属店铺:">
                    <el-input placeholder="请输入" />
                </el-form-item>
                <el-form-item label="图片:">
                    <ImageUploadList width="100%" height="100%" :file-list="fileList" :onRemove="handleDelete"
                        :on-zoom="handleZoom" />
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
    <!--
    --  商品列表
    -->
    <div class="commodity-container">
        <el-card v-for="_item in items" shadow="never" style="width: 140px;" :body-style="{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            padding: '5px'
        }">
            <div class="name">2222</div>
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                class="image" />
            <div class="options">
                <el-button size="small" type="primary">操作</el-button>
                <el-button size="small" type="danger">删除</el-button>
            </div>
        </el-card>
    </div>
</template>
<style>
.commodity-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 5px;
}

.commodity-container img {
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
}

.commodity-container .name {
    margin-bottom: 5px;
    font-weight: bolder;
}

.commodity-container .options {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.commodity-container .options .el-button {
    width: 50px;
    margin: 0px;
}
</style>