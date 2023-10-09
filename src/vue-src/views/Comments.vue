<script setup lang="tsx">
import { Ref, h, onMounted, reactive, ref } from 'vue';
import { ElMessageBox, ElTable } from 'element-plus';
import Comment from '../../common/Comment';
import Task from '../../common/Task';

const commentOutTableRef: Ref = ref(null)
const commentInTableRef: Ref = ref(null)
const inputOrderId: Ref = ref("")

const commnetData = reactive<Comment[]>([])
// const tableSearchData = reactive<Comment[]>([])

onMounted(async () => {
    const comment: Comment[] = await window.electronAPI.brushService("commentService", "getAllComment")
    commnetData.push(...comment)
})

const handleMerge = (mainComment: Array<any>, appendComment: Array<any>): Array<any> => {
    const result: Array<any> = []
    const max = Math.max(mainComment.length, appendComment.length)
    for (let i = 0; i < max; i++) {
        const main = mainComment[i]
        const append = appendComment[i]
        result.push({
            main: main,
            append: append,
            ok: ref(false)
        })
    }
    return result;
}

const handleFormateTime = (dateStr: string) => {
    const date = new Date(dateStr)

    const year = ((date.getFullYear()).toString())
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const day = ("0" + date.getDate()).slice(-2)

    const formattedDate = `${year}年${month}月${day}日`

    return formattedDate
}

const getDynamicButton = (comment: Comment) => {
    if (comment.name.includes("拼多多")) {
        return "拼多多"
    } else if (comment.name.includes("问大家")) {
        return "问大家"
    } else {
        return "淘宝"
    }
}

const rowExpansopn = (row: Comment) => {
    for (let i = 0; i < commnetData.length; i++) {
        const data = commnetData[i]
        if (data.uuid === row.uuid) {
            commentOutTableRef.value.toggleRowExpansion(row, true)
        } else {
            commentOutTableRef.value.toggleRowExpansion(data, false)
        }
    }
}

const testSearch = async () => {
    const orderId = inputOrderId.value
    const task: Task = await window.electronAPI.brushService("taskService", "getSingleTask", orderId)
    if (task && task.orderId && task.orderId.includes(orderId)) {
        const regResult: RegExpExecArray | null = (/\d{4}(?=\D*$)/).exec(task.productName)
        console.log(regResult)
        if (regResult) {
            commnetData.forEach(data => {
                const resultData = []
                if (data.name.includes(regResult[0])) {
                    resultData.push(data)
                }
            })
            ElMessageBox.alert('结果', 'Title', {
                confirmButtonText: 'OK',
                message: h("el-buton", null),
            })


            // commentOutTableRef.value.setCurrentRow(data)
            // commentOutTableRef.value.toggleRowExpansion(data)
            // commentOutTableRef.value.setScrollTop(((i + 1) * 33.76) - 10);
            // rowExpansopn(data)

        }
    }
}

</script>
<template>
    <div class="comment-container">
        <div class="comment-search">
            <el-form :inline="true">
                <el-form-item label="用户ID">
                    <el-input type="text" v-model="inputOrderId" placeholder="输入" />
                </el-form-item>
                <el-form-item>
                    <el-button @click="testSearch" type="primary" size="small">分配</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="comment-option">
            <!-- <el-button type="warning" round>淘宝分配</el-button>
            <el-button type="danger" round>拼多多分配</el-button>
            <el-button type="primary" round>问大家分配</el-button> -->
        </div>
        <el-table ref="commentOutTableRef" @row-dblclick="rowExpansopn" :data="commnetData" show-overflow-tooltip
            highlight-current-row stripe size="small">
            <el-table-column align="center" type="expand">
                <template #default="props">
                    <div class="list-show">
                        <!-- 评语表格 -->
                        <!-- 评语表格 -->
                        <!-- 评语表格 -->
                        <el-table ref="commentInTableRef" stripe border size="small" show-overflow-tooltip
                            highlight-current-row :data="handleMerge(props.row.mainComment, props.row.appendComment)">
                            <!-- <el-table-column align="center" type="index"  /> -->
                            <el-table-column align="center" label="序号" type="index" width="50" />
                            <el-table-column align="center" label="主" prop="main" />
                            <el-table-column align="center" label="操作" width="90px">
                                <template #default="_scope">
                                    <el-button size="small" type="primary">复制主平</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="追" prop="append" />
                            <el-table-column align="center" label="操作" width="90px">
                                <template #default="_scope">
                                    <el-button size="small" type="primary">复制追平</el-button>
                                </template>
                            </el-table-column>

                            <el-table-column align="center" label="对应客户ID" width="200px">
                                <template #default="_scope">
                                    <el-input size="small" />
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="对应订单号" width="200px">
                                <template #default="_scope">
                                    <el-input size="small" />
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="付款状态" width="80px">
                                <template #default="_scope">
                                    <el-switch disabled style="--el-switch-on-color: #13ce66;" v-model="_scope.row.ok" />
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="数据导入时间" width="130px">
                <template #default="scope">
                    {{ handleFormateTime(scope.row.createTime) }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="名称" prop="name" />
            <el-table-column align="center" label="类型" width="200px">
                <template #default="scope">
                    <el-button size="small" type="success" plain>{{ getDynamicButton(scope.row) }}</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template #default="_scope" width="80px">
                    <el-button type="danger" size="small">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<style>
.comment-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.comment-container .comment-search {
    width: 100%;
}

.comment-container .comment-option {
    width: 100%;
    display: flex;
    /* justify-content: center; */
}

.list-show {
    width: 100%;
    height: 100%;
}
</style>