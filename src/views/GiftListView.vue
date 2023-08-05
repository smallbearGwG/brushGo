<script setup lang="ts">
import { ElButton, ElForm, ElFormItem, ElTable, ElTableColumn, ElInput, ElSwitch, ElPopconfirm, ElDialog, ElMessage } from 'element-plus';
import Gift from '../electron/datas/gift';
import { onMounted, ref, reactive } from 'vue';

const dialogAddGiftVisible = ref(false)
const dialogUpdateGiftVisible = ref(false)

const giftTableDatas: Gift[] = reactive<Gift[]>([])

const inputDialogNewGift = ref("")
const inputDialogUpdateGift = ref("")

/**
 * 加载数据到表格中
 */
const reloadDataToGiftTable = async () => {
    giftTableDatas.length = 0
    const data: Gift[] = await window.electronAPI.brushService("giftService", "getAllGift")
    data.forEach(d => {
        giftTableDatas.push(d)
    })
}

onMounted(async () => {
    reloadDataToGiftTable()
})

/**
 * 添加新商品处理
 */
const handleDialogGiftAdd = async () => {
    const newGiftName = inputDialogNewGift.value
    let result: boolean = await window.electronAPI.brushService("giftService", "addGift", newGiftName)
    if (result) {
        dialogAddGiftVisible.value = false;
        reloadDataToGiftTable()
    } else {
        ElMessage({
            showClose: true,
            message: '名称重复添加失败',
            type: 'error'
        })
    }
}

/**
 * 打开修改对话框时的的数据加载
 */
const handleOpenUpdateDialog = () => {
    inputDialogUpdateGift.value = ((dialogUpdateGiftVisible.value as unknown as Gift).name as string)
}

/**
 * 处理删除
 */
const handleDeleteGift = async (row: Gift) => {
    let result: boolean = await window.electronAPI.brushService("giftService", "removeGift", row.uuid)
    if (result) {
        ElMessage({
            showClose: true,
            message: '删除成功',
            type: 'success',
        })
        reloadDataToGiftTable()
    } else {
        ElMessage({
            showClose: true,
            message: '删除失败',
            type: 'error',
        })
    }
}

/**
 * 修改礼品的名称
 */
const handleUpdateGift = async () => {
    const originGift: Gift = (dialogUpdateGiftVisible.value as unknown as Gift)
    const newGiftName = inputDialogUpdateGift.value
    if (newGiftName === originGift) {
        //不需要修改
        return
    }
    const existResult: Gift = await window.electronAPI.brushService("giftService", "isExistGift", newGiftName)
    if (Object.keys(existResult).length !== 0) {
        ElMessage({
            showClose: true,
            message: '名称重复添加失败',
            type: 'error',
        })
        return
    }
    const needUpdateGift: Gift = {
        uuid: originGift.uuid,
        name: newGiftName,
        state: originGift.state,
        createTime: originGift.createTime,
        updateTime: originGift.updateTime,
    }
    let result: boolean = await window.electronAPI.brushService("giftService", "updateGift", needUpdateGift)
    if (result) {
        dialogUpdateGiftVisible.value = false;
        ElMessage({
            showClose: true,
            message: '成功',
            type: 'success',
        })
        reloadDataToGiftTable()
    }
}

/**
 * 状态修改
 */
const handleUpdateGiftState = async (gift: Gift) => {
    const needUpdateGift: Gift = {
        uuid: gift.uuid,
        name: gift.name,
        state: gift.state,
        createTime: gift.createTime,
        updateTime: gift.updateTime,
    }
    let result: boolean = await window.electronAPI.brushService("giftService", "updateGift", needUpdateGift)
    if (result) {
        ElMessage({
            showClose: true,
            message: '成功',
            type: 'error',
        })
    }
}

</script>
<template>
    <el-dialog :align-center="true" v-model="dialogAddGiftVisible" title="添加新礼品" @close="inputDialogNewGift = ''">
        <el-form-item label="名称:">
            <el-input v-model="inputDialogNewGift" placeholder="请输入礼品的名称" />
        </el-form-item>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogAddGiftVisible = false">取消</el-button>
                <el-button type="primary" @click="handleDialogGiftAdd">添加 </el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog @open="handleOpenUpdateDialog" :align-center="true" v-model="dialogUpdateGiftVisible" title="修改礼品"
        @close="inputDialogNewGift = ''">
        <el-form-item label="名称:">
            <el-input v-model="inputDialogUpdateGift" placeholder="请修改礼品的名称" />
        </el-form-item>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogUpdateGiftVisible = false">取消</el-button>
                <el-button type="primary" @click="handleUpdateGift">修改 </el-button>
            </span>
        </template>
    </el-dialog>

    <el-form :inline="true">
        <el-form-item>
            <el-button type="primary" @click="dialogAddGiftVisible = true">添加新礼品</el-button>
        </el-form-item>
    </el-form>
    <el-table height="80vh" max-height="80vh" :data="giftTableDatas" :stripe="true" size="small" table-layout="auto">
        <el-table-column prop="name" label="礼品" />
        <el-table-column label="是否有货">
            <template #default="scope">
                <el-switch @change="handleUpdateGiftState(scope.row)" v-model="scope.row.state" inline-prompt
                    active-text="有货" inactive-text="没货"
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
            </template>
        </el-table-column>
        <el-table-column label="操作" width="160px">
            <template #default="scope">
                <el-button @click="dialogUpdateGiftVisible = scope.row" size="small">修改</el-button>
                <el-popconfirm title="确定要删除此数据嘛" confirm-button-text="是" cancel-button-text="否"
                    @confirm="handleDeleteGift(scope.row)" :hide-after="0" :hide-icon="true" confirm-button-type="danger">
                    <template #reference>
                        <el-button type="danger" size="small">删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
</template>
<style></style>