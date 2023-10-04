<script setup lang="tsx">
import { Ref, h, onMounted, reactive, ref } from 'vue';
import { ElTable } from 'element-plus';
import Comment from '../../common/Comment';

const tableRef: Ref<null | ElTable> = ref(null)
const tableData = reactive<Comment[]>([])

onMounted(async () => {
    const comment: Comment[] = await window.electronAPI.brushService("commentService", "getAllComment")
    tableData.push(...comment)
})

const handleMerge = (mainComment: Array<any>, appendComment: Array<any>): Array<any> => {
    const result: Array<any> = []
    const max = Math.max(mainComment.length, appendComment.length)
    for (let i = 0; i < max; i++) {
        const main = mainComment[i]
        const append = appendComment[i]
        result.push({
            main: main,
            append: append
        })
    }
    return result;
}

const handleFormateTime = (dateStr: string) => {
    const date = new Date(dateStr)

    const year = ((date.getFullYear()).toString()).substring(2)
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const day = ("0" + date.getDate()).slice(-2)
    const hours = ("0" + date.getHours()).slice(-2)
    const minutes = ("0" + date.getMinutes()).slice(-2)

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`

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
    return h("el-button", {
        size: "small", plain: ""
    })
    // return <></>
}

const handleRowDblclick = (row: Comment) => {
    tableRef.value.toggleRowExpansion(row)
}

</script>
<template>
    <div class="comment-container">
        <div class="comment-search">
            <el-form :inline="true" :size="`small`">
                <el-form-item label="时间">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="comment-option">
            <el-button type="warning" round>淘宝分配</el-button>
            <el-button type="danger" round>拼多多分配</el-button>
            <el-button type="primary" round>问大家分配</el-button>
        </div>
        <el-table ref="tableRef" @row-dblclick="handleRowDblclick" row-key="uuid" :data="tableData" show-overflow-tooltip
            size="small">
            <el-table-column align="center" type="expand">
                <template #default="props">
                    <div class="list-show">
                        <!-- 评语表格 -->
                        <!-- 评语表格 -->
                        <!-- 评语表格 -->
                        <el-table show-overflow-tooltip border size="small"
                            :data="handleMerge(props.row.mainComment, props.row.appendComment)">
                            <el-table-column align="center" label="操作" width="200px">
                                <template #default="_scope">
                                    <el-button size="small" type="primary">复制主平</el-button>
                                    <el-button size="small" type="primary">复制追平</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="主" prop="main" />
                            <el-table-column align="center" label="追" prop="append" />
                            <el-table-column align="center" label="状态" width="200px">
                                <template #default="_scope">
                                    <el-button size="small" type="success" plain>状态</el-button>
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