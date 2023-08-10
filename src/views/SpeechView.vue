<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { ElMessage } from 'element-plus';
import Speech from "../../common/speech"
import brushSercice from "../util/brushService";

const speechTableData: Speech[] = reactive<Speech[]>([])

const dialogNewSppedchVisible = ref(false)
const dialogUpdateSppedchVisible = ref(false)

const inputDialogSpeech = ref("")
const inputBakcUpSpeech = ref("")

onMounted(async () => {
    reloadDataToSppechTable()
});

/**
 *  加载数据
 */
const reloadDataToSppechTable = async () => {
    speechTableData.length = 0
    const speechs: Speech[] = await brushSercice("sppechService", "getAllSppech")
    speechs.forEach(speech => {
        speechTableData.push(speech)
    })
}

/**
 * 修改dialog数据加载
 */
const handleOpenUpdateDialog = () => {
    inputDialogSpeech.value = ((dialogUpdateSppedchVisible.value as unknown as Speech).content as string)
    inputBakcUpSpeech.value = inputDialogSpeech.value
}

/**
 * 添加一个话术 
 */
const handleAddNewSppech = async () => {
    const newSppech = inputDialogSpeech.value
    const result: boolean = await brushSercice<boolean>("sppechService", "addSppech", newSppech)
    if (result) {
        ElMessage({
            showClose: true,
            message: '添加成功',
            type: 'success'
        })
        dialogNewSppedchVisible.value = false
        reloadDataToSppechTable()
    } else {
        ElMessage({
            showClose: true,
            message: '名称重复',
            type: 'error'
        })
    }
}

/**
 * 修改话术
 */
const handleUpdateSppech = async () => {
    const originSppech: Speech = (dialogUpdateSppedchVisible.value as unknown as Speech)
    const newSppechConcat = inputDialogSpeech.value
    if (originSppech.content === newSppechConcat) {
        dialogUpdateSppedchVisible.value = false
        return
    }
    const isExisit: Speech = await brushSercice("sppechService", "getSingleSppech", newSppechConcat)
    if (Object.keys(isExisit).length !== 0) {
        ElMessage({
            showClose: true,
            message: '名称重修改加失败',
            type: 'error',
        })
        return
    }
    const needUpdateSpeech: Speech = {
        uuid: originSppech.uuid,
        content: newSppechConcat,
        createTime: originSppech.createTime,
        updateTime: originSppech.updateTime,
    }
    const result: boolean = await brushSercice("sppechService", "updateSpeech", needUpdateSpeech)
    if (result) {
        dialogUpdateSppedchVisible.value = false;
        ElMessage({
            showClose: true,
            message: '修改成功',
            type: 'success',
        })
        //局部刷新 不要全部刷新
        speechTableData.forEach(speech => {
            if (speech.uuid === needUpdateSpeech.uuid) {
                speech.content = needUpdateSpeech.content
            }
        })
    } else {
        ElMessage({
            showClose: true,
            message: '修改失败',
            type: 'error',
        })
        inputDialogSpeech.value = inputBakcUpSpeech.value
    }
}

/**
 * 删除一个话术
 */
const handleDeleteSpeech = async (speech: Speech) => {
    const needDeleteSpeech: Speech = {
        uuid: speech.uuid,
        content: speech.content,
        createTime: speech.createTime,
        updateTime: speech.updateTime,
    }
    const result: boolean = await brushSercice("sppechService", "removeSpeech", needDeleteSpeech)
    if (result) {
        ElMessage({
            showClose: true,
            message: '删除成功',
            type: 'success',
        })
        reloadDataToSppechTable()
    } else {
        ElMessage({
            showClose: true,
            message: '删除失败',
            type: 'error',
        })
    }
}

</script>
<template>
    <el-dialog :align-center="true" v-model="dialogNewSppedchVisible" title="添加新话术" @closed="inputDialogSpeech = ''">
        <el-form-item>
            <el-input v-model="inputDialogSpeech" :rows="5" placeholder="请输入话术" type="textarea" />
        </el-form-item>
        <template #footer>
            <el-button @click="dialogNewSppedchVisible = false">取消</el-button>
            <el-button type="primary" @click="handleAddNewSppech">添加 </el-button>
        </template>
    </el-dialog>
    <el-dialog :align-center="true" v-model="dialogUpdateSppedchVisible" title="修改话术" @open="handleOpenUpdateDialog"
        @closed="inputDialogSpeech = ''; inputBakcUpSpeech = ''">
        <el-form-item>
            <el-input v-model="inputDialogSpeech" :rows="5" placeholder="请输入话术" type="textarea" />
        </el-form-item>
        <template #footer>
            <el-button @click="dialogUpdateSppedchVisible = false">取消</el-button>
            <el-button type="primary" @click="handleUpdateSppech">修改 </el-button>
        </template>
    </el-dialog>

    <el-form :inline="true">
        <el-form-item>
            <el-button @click="dialogNewSppedchVisible = true" type="primary">添加新话术</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">随机一个话术</el-button>
        </el-form-item>
    </el-form>
    <el-table :data="speechTableData" height="80vh">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="content" label="话术">
            <template #header v-if="false">
                <el-input size="small" placeholder="Type to search" />
            </template>
        </el-table-column>
        <el-table-column width="160px" label="操作">
            <template #default="scope">
                <el-button size="small" @click="dialogUpdateSppedchVisible = scope.row">修改</el-button>
                <el-popconfirm title="确定要删除此数据嘛" confirm-button-text="是" cancel-button-text="否"
                    @confirm="handleDeleteSpeech(scope.row)" :hide-after="0" :hide-icon="true" confirm-button-type="danger">
                    <template #reference>
                        <el-button size="small">删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
</template>
<style></style>