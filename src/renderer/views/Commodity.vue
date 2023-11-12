<script setup lang="tsx">
import { ElForm, ElFormItem, ElButton, ElCard, ElDialog, ElInput, ElScrollbar, ElSelect, ElOption } from 'element-plus';
import { onMounted, ref } from 'vue';

import ImageUploadList, { ImageItems } from "../components/ImageUploadList.vue";

import Commodity from "../../common/Commodity"
import Shop from '../../common/Shop';

const commodityList = ref<Commodity[]>([])
const newCommodutyImageList = ref<ImageItems[]>([])
const dialogAddCommodityVisible = ref(false)
const dialogImageViewVisible = ref(false)
const dialogImageView = ref('')

const inputCommodityName = ref('')
const inputCommodytyId = ref('')

const selectValues = ref('')
const selectOptions = ref<Shop[]>([])

onMounted(async () => {
    const shops: Shop[] = await window.electronAPI.brushService("shopService", "getAllShop")
    shops.forEach(shop => {
        selectOptions.value.push(shop);
    })
    console.log("shops:", selectValues.value)
})

const handleDelete = (index: number) => {
    console.log(newCommodutyImageList.value.splice(index, 1))
}

const handleZoom = (index: number) => {
    dialogImageView.value = newCommodutyImageList.value[index].data
    dialogImageViewVisible.value = true
}

const hanldeDesttoryDialoag = () => {
    newCommodutyImageList.value = []
    dialogImageView.value = ''
    inputCommodityName.value = ''
    inputCommodytyId.value = ''
    selectValues.value = ''
}

const addCommodity = () => {
    // const name = inputCommodityName.value;
    // const id = inputCommodytyId.value;
    // const shopUid = selectValues.value;
    // const images = newCommodutyImageList.value;

    // const newCommodity: Commodity = {
    //     uid: uuid(),
    //     name: name,
    //     id: id,
    //     shopUid: shopUid
    // };
    // for (let i = 0; i < images.length; i++) {
    //     const image = images[i]
    //     newCommodity.images?.push({
    //         imageUid: image.data,
    //         imageSort: i
    //     })
    // }

    // console.log(newCommodity)
}

</script>
<template>
    <el-dialog v-model="dialogImageViewVisible" width="45%" align-center destroy-on-close append-to-body>
        <img :style="{ width: '100%', height: '100%' }" :src="dialogImageView" alt="Preview Image">
    </el-dialog>

    <el-dialog :align-center="true" title="添加商品" destroy-on-close v-model="dialogAddCommodityVisible"
        :close-on-click-modal="false" width="90%" @close="hanldeDesttoryDialoag">
        <el-scrollbar height="65vh">
            <el-form size="small" label-position="left" style="margin-right: 20px;">
                <el-form-item label="商品名称:">
                    <el-input placeholder="请输入" v-model="inputCommodityName" />
                </el-form-item>
                <el-form-item label="商品编号:">
                    <el-input placeholder="请输入" v-model="inputCommodytyId" />
                </el-form-item>
                <el-form-item label="所属店铺:">
                    <el-select v-model="selectValues" placeholder="Please select" style="width: 100%;">
                        <el-option v-for="item in selectOptions" :key="item.uuid" :label="item.name"
                            :value="(item.uuid as string)" />
                    </el-select>
                </el-form-item>
                <el-form-item label="图片:">
                    <ImageUploadList width="100%" height="100%" :file-list="newCommodutyImageList" :onRemove="handleDelete"
                        :on-zoom="handleZoom" />
                </el-form-item>
            </el-form>
        </el-scrollbar>
        <template #footer>
            <el-button @click="hanldeDesttoryDialoag" type="primary">重置</el-button>
            <el-button @click="addCommodity" type="primary">确定</el-button>
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
        <el-card v-for="_item in commodityList" shadow="never" style="width: 140px;" :body-style="{
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