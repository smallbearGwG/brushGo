<script setup lang="ts">
import { ElForm, ElFormItem, ElInput, ElTable, ElButton, ElTableColumn, ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import Shop from '../../common/Shop';

const shopTableData = reactive<Shop[]>([])

const dialogAddShopVisible = ref(false)
const dialogUpdateShopVisible = ref(false)

const inputDialogNewShop = ref("")
const inputDialogUpdateShop = ref("")

onMounted(async () => {
    reloadDataToSppechTable()
})

const reloadDataToSppechTable = async () => {
    shopTableData.length = 0
    const speechs: Shop[] = await window.electronAPI.brushService("shopService", "getAllShop")
    speechs.forEach(speech => {
        shopTableData.push(speech)
    })
}


const handleAddShop = async () => {
    const newShopName = inputDialogNewShop.value
    const result: boolean = await window.electronAPI.brushService("shopService", "addShop", newShopName);
    if (result) {
        ElMessage({
            showClose: true,
            message: '添加成功',
            type: 'success',
            offset: 64
        })
        dialogAddShopVisible.value = false
        reloadDataToSppechTable()
    } else {
        ElMessage({
            showClose: true,
            message: '名称重复',
            type: 'error',
            offset: 64
        })
    }
}

const handleOpenUpdateDialog = () => {

}

const handleUpdateShop = () => {

}

const handleDeleteShop = async (_shop: Shop) => {

}

</script>
<template>
    <el-dialog :align-center="true" v-model="dialogAddShopVisible" title="添加新店铺" @close="inputDialogNewShop = ''">
        <el-form-item label="名称:">
            <el-input v-model="inputDialogNewShop" placeholder="请输入店铺的名称" />
        </el-form-item>
        <template #footer>
            <el-button @click="dialogAddShopVisible = false">取消</el-button>
            <el-button type="primary" @click="handleAddShop">添加 </el-button>
        </template>
    </el-dialog>
    <el-dialog @open="handleOpenUpdateDialog" :align-center="true" v-model="dialogUpdateShopVisible" title="修改店铺"
        @close="inputDialogNewShop = ''">
        <el-form-item label="名称:">
            <el-input v-model="inputDialogUpdateShop" placeholder="请修改店铺的名称" />
        </el-form-item>
        <template #footer>
            <el-button @click="dialogUpdateShopVisible = false">取消</el-button>
            <el-button type="primary" @click="handleUpdateShop">修改 </el-button>
        </template>
    </el-dialog>

    <el-form :inline="true" size="small">
        <el-form-item>
            <el-button @click="dialogAddShopVisible = true" type="primary">添加店铺</el-button>
        </el-form-item>
    </el-form>

    <el-table :data="shopTableData" :stripe="true" size="small">
        <el-table-column prop="name" label="店铺名称" />
        <el-table-column label="操作" width="160px">
            <template #default="scope">
                <el-button @click="dialogUpdateShopVisible = scope.row" size="small">修改</el-button>
                <el-popconfirm title="确定要删除此数据嘛" confirm-button-text="是" cancel-button-text="否"
                    @confirm="handleDeleteShop(scope.row)" :hide-after="0" :hide-icon="true" confirm-button-type="danger">
                    <template #reference>
                        <el-button type="danger" size="small">删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
</template>
<style></style>