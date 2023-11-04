<script setup lang="tsx">
import { Ref, h, onMounted, reactive, ref } from 'vue';
import { ElMessageBox, ElTable } from 'element-plus';
import Comment from '../../common/Comment';
import Task from '../../common/Task';

const commentOutTableRef: Ref = ref(null)
const commentInTableRef: Ref = ref(null)
const inputOrderId: Ref = ref("")
const inputTime = ref(new Array())

/**
 * 所有的评价数据
 */
const commnetData = reactive<Comment[]>([])
// const tableSearchData = reactive<Comment[]>([])

onMounted(async () => {
    //设定时间为当天的评语
    const startTime = new Date()
    startTime.setHours(0)
    startTime.setMinutes(0)
    startTime.setSeconds(0)
    const endTime = new Date()
    endTime.setHours(23)
    endTime.setMinutes(59)
    endTime.setSeconds(59)
    inputTime.value[0] = startTime
    inputTime.value[1] = endTime

    const comment: Comment[] = await window.electronAPI.brushService("commentService", "getAllComment")
    commnetData.push(...comment)
})

const handleSearchcommentFromTime = () => {

}

/**
 * 将主评和追平合并
 * @param mainComment 
 * @param appendComment 
 */
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

/**
 * 格式化显示时间
 * @param dateStr 
 */
const handleFormateTime = (dateStr: string) => {
    const date = new Date(dateStr)

    const year = ((date.getFullYear()).toString())
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const day = ("0" + date.getDate()).slice(-2)

    const formattedDate = `${year}年${month}月${day}日`

    return formattedDate
}

/**
 * 获取评语类型
 * @param comment 
 */
const getDynamicCommentType = (comment: Comment) => {
    if (comment.name.includes("拼多多")) {
        return "拼多多"
    } else if (comment.name.includes("问大家")) {
        return "问大家"
    } else {
        return "淘宝"
    }
}

/**
 * 双击行,展开行
 * @param row
 */
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
                <el-form-item label="时间">
                    <el-date-picker v-model="inputTime" type="datetimerange" start-placeholder="开始时间"
                        end-placeholder="结束时间" />
                </el-form-item>
                <el-form-item>
                    <el-button @click="handleSearchcommentFromTime" type="primary" size="small">选择</el-button>
                </el-form-item>

                <el-form-item label="用户ID">
                    <el-input type="text" v-model="inputOrderId" placeholder="输入" />
                </el-form-item>
                <el-form-item>
                    <el-button @click="testSearch" type="primary" size="small">分配</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table ref="commentOutTableRef" @row-dblclick="rowExpansopn" :data="commnetData" show-overflow-tooltip
            highlight-current-row stripe size="small">
            <el-table-column align="center" type="expand">
                <template #default="props">
                    <div class="list-show">
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
                    <el-button size="small" type="success" plain>{{ getDynamicCommentType(scope.row) }}</el-button>
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