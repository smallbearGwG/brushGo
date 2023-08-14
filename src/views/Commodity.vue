<script setup lang="ts">
import { ElRow, ElCol, ElForm, ElFormItem, ElButton, ElCard } from 'element-plus';
import { ref } from 'vue';
const items = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

</script>
<template>
    <el-form size="small">
        <el-form-item>
            <el-button>添加商品</el-button>
        </el-form-item>
    </el-form>
    <el-row>
        <el-col :span="4" v-for="_item in items">
            <el-card shadow="never">
                <div class="card-container">
                    <img width="100" height="100"
                        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                        class="image" />
                </div>
                <div class="card-options">
                    <el-button>A</el-button>
                    <el-button>B</el-button>
                    <el-button>C</el-button>
                    <el-button>D</el-button>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>
<style>
.card-container {
    height: 100%;
    width: 100%;
}

.card-options {
    display: flex;
    justify-content: center;
}
</style>