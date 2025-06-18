<template>
    <a-button @click="handleAdd">Add</a-button>

    <div class="flex justify-between">
        <VueDraggable v-model="data">
            <div v-for="(item, index) in data" :key="item.id" class="list-item">
                {{ item.value }}
            </div>
        </VueDraggable>

        <VueDraggable v-model="list">
            <div v-for="(item, index) in list" :key="item.id" class="list-item ">
                <!-- 标题 -->
                <a-flex v-show="item.key === 'title'" :style="item.style" :justify="item.justify" :align="item.align">
                    {{ item.value }}
                </a-flex>
            </div>
        </VueDraggable>
    </div>
</template>

<script>
import { VueDraggable } from 'vue-draggable-plus';
import { jsonView } from 'vue-json-views'


export default {
    name: 'VueDraggablePlusActivity',
    components: { VueDraggable, jsonView },
    data() {
        return {
            data: [
                {
                    value: '标题',
                    id: 1
                },
            ],
            list: [
                {
                    id: 1,
                    name: this.generateId('101'),
                    title: '标题',
                    key: 'title',
                    value: '活动标题',
                    justify: 'center',
                    align: 'center',
                    style: {
                        width: '100%',
                        height: '20px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }
                }
            ]
        }
    },
    created() {

    },

    mounted() {

    },


    methods: {

        onEnd() {
            console.log('移动完毕：', JSON.stringify(this.list))
        },

        async handleAdd() {
            this.data.push({
                value: 'Juan ' + (this.data.length + 1),
                id: this.data.length + 1
            })
            this.list.push({
                id: this.list.length + 1,
                name: this.generateId('101'),
                title: '标题 ' + this.list.length,
                key: 'title',
                value: '活动标题 ' + this.list.length,
                justify: 'center',
                align: 'center',
                style: {
                    width: '100%',
                    height: '20px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                }
            })
            await this.$nextTick();
            console.log('data数据：', JSON.stringify(this.data))
            console.log('list数据：', JSON.stringify(this.list))
        },

        generateId(key) {
            // 从1000开始，到9999结束
            const randomNumber = Math.floor(Math.random() * 9000 + 1000).toString().padStart(4, '0');
            const timestamp = new Date().getTime();
            return key + timestamp + randomNumber;
        }
    }

}
</script>

<style lang="scss" scoped>
.list-item {
    /* 初始透明边框防止布局抖动 */
    border: 1px solid transparent;
    /* 确保边框不影响元素尺寸 */
    box-sizing: border-box;
}

.list-item:hover {
    border: 1px dashed #ccc;
    /* 悬停时虚线边框 */
}
</style>