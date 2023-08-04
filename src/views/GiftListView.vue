<script setup lang="ts">
import { ElButton, ElForm, ElFormItem, ElTable, ElTableColumn, ElInput, ElSwitch, ElPopconfirm, ElDialog, ElMessage } from 'element-plus';

import { Search } from '@element-plus/icons-vue'
import Gift from '../electron/datas/gift';
import { onMounted, ref, reactive } from 'vue';

const dialogAddGiftVisible = ref(false)
const giftDatas: Gift[] = reactive<Gift[]>([])

const inputDialogNewGift = ref("")
const inputFindGift = ref("")

onMounted(async () => {
    loadGiftTableData()
})

/**
 * 从数据库中加载数据
 */
const loadGiftTableData = async () => {
    giftDatas.length = 0
    const data: Gift[] = await window.electronAPI.brushService("giftService", "getAllGift")
    data.forEach(d => {
        giftDatas.push(d)
    })
}


const handleDialogGiftAdd = async () => {
    const newGiftName = inputDialogNewGift.value
    let result: boolean = await window.electronAPI.brushService("giftService", "addGift", newGiftName)
    dialogAddGiftVisible.value = false;
    if (result) {
        loadGiftTableData()
    } else {
        ElMessage({
            showClose: true,
            message: '名称重复添加失败',
            type: 'error',
        })
    }
}

const handleDEalogClose = () => {
    inputDialogNewGift.value = ""
}

const handleDelete = async (index: number, row: Gift) => {
    let result: boolean = await window.electronAPI.brushService("giftService", "removeGift", row.uuid)
}

</script>
<template>
    <el-dialog v-model="dialogAddGiftVisible" title="添加新礼品" @close="handleDEalogClose">
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

    <el-form :inline="true">
        <el-form-item>
            <el-button type="primary" @click="dialogAddGiftVisible = true">添加新礼品</el-button>
        </el-form-item>
        <el-form-item label="名称:">
            <el-input v-model="inputFindGift" placeholder="请输入礼品名称" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" :icon="Search">搜素</el-button>
        </el-form-item>
    </el-form>
    <el-table :data="giftDatas" :stripe="true" size="small" table-layout="auto">
        <el-table-column prop="name" label="礼品" />
        <el-table-column label="是否有货">
            <template #default="scope">
                <el-switch v-model="scope.row.state" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                    inline-prompt active-text="有货" inactive-text="没货" />
            </template>
        </el-table-column>
        <el-table-column width="80px" label="操作">
            <template #default="scope">
                <el-popconfirm title="确定要删除此数据嘛" confirm-button-text="是" cancel-button-text="否"
                    @confirm="handleDelete(scope.index, scope.row)">
                    <template #reference>
                        <el-button type="danger" size="small">删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
</template>
<style></style>