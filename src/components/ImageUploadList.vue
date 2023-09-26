<script setup lang="ts">
import { Plus, ZoomIn, Delete } from '@element-plus/icons-vue'
import fileUtil from '../util/fileUtil';
import SElMEssage from '../util/SElMEssage';
const props = defineProps(["width", "height", "fileList", "onAdd", "onRemove", "onZoom"])

export interface ImageItems {
    name: string
    data: string
}

const handleAddImage = () => {
    fileUtil.getInput(['image/jpeg', 'image/png', 'image/gif'])
        .then(
            (file: File) => {
                let reader = new FileReader();
                reader.readAsDataURL(file)
                reader.onload = (e) => {
                    const image = e.target?.result;
                    (props.fileList as ImageItems[]).push({
                        name: file.name,
                        data: image as string
                    })
                };
            }
        ).catch((_err: Error) => {
            SElMEssage({
                message: '该文件不是图片',
                type: 'error',
            })
            return
        })
}

</script>
<template>
    <div class="image-upload-container" :style="{ width: props.width, height: props.height }">
        <div class="item" v-for="(file, index) in props.fileList">
            <img :src="file.data" alt="hi">
            <div class="image-mask">
                <el-icon color="#FFFFFF" size="20" @click="props.onZoom(index)">
                    <ZoomIn />
                </el-icon>
                <el-icon color="#FFFFFF" size="20" @click="props.onRemove(index)">
                    <Delete />
                </el-icon>
            </div>
        </div>
        <div class="item" @click="handleAddImage()">
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

.image-upload-container .image-mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    display: none;
}

.image-upload-container .image-mask .el-icon:hover {
    cursor: pointer;
}

.image-upload-container .item:hover .image-mask {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 15px;
}


.image-upload-container .item .image-mask .el-icon:hover {
    color: #409EFF;
}
</style>