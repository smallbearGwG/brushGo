<script setup lang="ts">

import { Plus, ZoomIn, Delete } from '@element-plus/icons-vue'

const props = defineProps(["fileList"])

</script>
<template>
    <div class="image-upload-container">
        <div class="item" v-for="file in props.fileList">
            <img :src="file.url" alt="hi">
            <div class="mask">
                <el-icon color="#FFFFFF" size="20">
                    <ZoomIn />
                </el-icon>
                <el-icon color="#FFFFFF" size="20">
                    <Delete />
                </el-icon>
            </div>
        </div>
        <div class="item">
            <el-icon :size="25">
                <Plus />
            </el-icon>
        </div>
    </div>
</template>
<style>
.image-upload-container {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 15px;
}

.image-upload-container .item {
    width: 150px;
    height: 150px;
    border-radius: 10px;
    overflow: hidden;
    border-width: 1px;
    border-color: #909399;
    border-style: solid;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.image-upload-container .item:last-child {
    border-style: dashed;
}

.image-upload-container .item:last-child:hover {
    border-color: #409EFF;
    color: #409EFF;
    cursor: pointer;
}

.image-upload-container img {
    width: 100%;
    height: 100%;
}

.image-upload-container .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    display: none;
}

.image-upload-container .mask .el-icon:hover {
    cursor: pointer;
}

.image-upload-container .item:hover .mask {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 15px;
}
</style>