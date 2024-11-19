<template>
    <a-card title="Card title" :bordered="false" style="width: 300px;margin-bottom: 12px;"
        v-for="(item, postion) in mergeGoalsList" :key="postion">
        <a-select ref="select" v-model:value="item.columnsValue" style="width: 200px;margin-left: 20px;"
            @change="(e) => handleSelectGoalsChange(e, item, postion)" :options="item.columns" placeholder="请选择大区"
            allowClear />
        <a-checkbox-group v-model:value="item.childValue" :options="item.selectChildList" />
    </a-card>
    <a-button type="primary" @click="onClickAdd" v-if="mergeGoalsList.length !== 5">新增</a-button>
    <a-button type="primary" danger @click="onClickRemove" v-if="mergeGoalsList.length !== 1">删除</a-button>
    <a-button type="primary" danger @click="onClickQuery">查询数据</a-button>
</template>

<script>


export default {
    name: 'SysmentActivity',
    data() {
        return {
            childColumns: [
                {
                    "searchValue": null,
                    "createUserId": null,
                    "createUserName": null,
                    "createTime": "2022-05-26 09:06:14",
                    "updateUserId": "1",
                    "updateUserName": "admin",
                    "updateTime": "2023-08-15 10:13:51",
                    "remark": null,
                    "params": {

                    },
                    "pageNum": null,
                    "pageSize": null,
                    "token": null,
                    "id": 8,
                    "regionName": "东北省区",
                    "largeRegionId": 57856,
                    "label": "东北省区",
                    "value": 57856,
                    "responsiblePerson": "武国龙",
                    "responsiblePhone": "15598259955",
                    "status": 1,
                    "deleted": 0,
                    "largeRegionName": null,
                    "password": null,
                    "userId": null
                },
                {
                    "searchValue": null,
                    "createUserId": null,
                    "createUserName": null,
                    "createTime": "2022-06-03 07:20:08",
                    "updateUserId": "1",
                    "updateUserName": "admin",
                    "updateTime": "2023-08-05 17:42:28",
                    "remark": null,
                    "params": {

                    },
                    "pageNum": null,
                    "pageSize": null,
                    "token": null,
                    "id": 9,
                    "regionName": "山西省区",
                    "largeRegionId": 57856,
                    "label": "山西省区",
                    "value": 57856,
                    "responsiblePerson": "何仁龙",
                    "responsiblePhone": "15073168783",
                    "status": 1,
                    "deleted": 0,
                    "largeRegionName": null,
                    "password": null,
                    "userId": null
                },
                {
                    "searchValue": null,
                    "createUserId": null,
                    "createUserName": null,
                    "createTime": "2023-03-20 16:15:26",
                    "updateUserId": "1",
                    "updateUserName": "admin",
                    "updateTime": "2023-08-05 17:38:47",
                    "remark": null,
                    "params": {

                    },
                    "pageNum": null,
                    "pageSize": null,
                    "token": null,
                    "id": 21,
                    "regionName": "内蒙古省区",
                    "largeRegionId": 57856,
                    "label": "内蒙古省区",
                    "value": 57856,
                    "responsiblePerson": "翟建国",
                    "responsiblePhone": "18347248888",
                    "status": 1,
                    "deleted": 0,
                    "largeRegionName": null,
                    "password": null,
                    "userId": null
                },
                {
                    "searchValue": null,
                    "createUserId": null,
                    "createUserName": null,
                    "createTime": "2022-04-01 13:20:20",
                    "updateUserId": "1",
                    "updateUserName": "admin",
                    "updateTime": "2023-08-05 17:45:51",
                    "remark": null,
                    "params": {

                    },
                    "pageNum": null,
                    "pageSize": null,
                    "token": null,
                    "id": 6,
                    "regionName": "安徽省区",
                    "largeRegionId": 57857,
                    "label": "安徽省区",
                    "value": 57857,
                    "responsiblePerson": "潘金友",
                    "responsiblePhone": "15315243070",
                    "status": 1,
                    "deleted": 0,
                    "largeRegionName": null,
                    "password": null,
                    "userId": null
                },
                {
                    "searchValue": null,
                    "createUserId": null,
                    "createUserName": null,
                    "createTime": "2022-04-20 11:35:17",
                    "updateUserId": "1",
                    "updateUserName": "admin",
                    "updateTime": "2023-08-05 17:45:12",
                    "remark": null,
                    "params": {

                    },
                    "pageNum": null,
                    "pageSize": null,
                    "token": null,
                    "id": 7,
                    "regionName": "鲁西省区",
                    "largeRegionId": 57857,
                    "label": "鲁西省区",
                    "value": 57857,
                    "responsiblePerson": "何俊涛",
                    "responsiblePhone": "13333751034",
                    "status": 1,
                    "deleted": 0,
                    "largeRegionName": null,
                    "password": null,
                    "userId": null
                },
                {
                    "searchValue": null,
                    "createUserId": null,
                    "createUserName": null,
                    "createTime": "2023-03-20 16:16:45",
                    "updateUserId": "1",
                    "updateUserName": "admin",
                    "updateTime": "2023-08-05 17:38:31",
                    "remark": null,
                    "params": {

                    },
                    "pageNum": null,
                    "pageSize": null,
                    "token": null,
                    "id": 22,
                    "regionName": "鲁东省区",
                    "largeRegionId": 57857,
                    "label": "鲁东省区",
                    "value": 57857,
                    "responsiblePerson": "李孝良",
                    "responsiblePhone": "18530990227",
                    "status": 1,
                    "deleted": 0,
                    "largeRegionName": null,
                    "password": null,
                    "userId": null
                },
                {
                    "searchValue": null,
                    "createUserId": null,
                    "createUserName": null,
                    "createTime": "2022-01-24 16:09:55",
                    "updateUserId": "1",
                    "updateUserName": "admin",
                    "updateTime": "2023-08-05 17:46:26",
                    "remark": null,
                    "params": {

                    },
                    "pageNum": null,
                    "pageSize": null,
                    "token": null,
                    "id": 3,
                    "regionName": "江苏省区",
                    "largeRegionId": 57858,
                    "label": "江苏省区",
                    "value": 57858,
                    "responsiblePerson": "白瑞雨",
                    "responsiblePhone": "15332185309",
                    "status": 1,
                    "deleted": 0,
                    "largeRegionName": null,
                    "password": null,
                    "userId": null
                },
                {
                    "searchValue": null,
                    "createUserId": null,
                    "createUserName": null,
                    "createTime": "2022-06-13 17:19:25",
                    "updateUserId": "1",
                    "updateUserName": "admin",
                    "updateTime": "2023-08-05 17:39:20",
                    "remark": null,
                    "params": {

                    },
                    "pageNum": null,
                    "pageSize": null,
                    "token": null,
                    "id": 18,
                    "regionName": "浙江省区",
                    "largeRegionId": 57858,
                    "label": "浙江省区",
                    "value": 57858,
                    "responsiblePerson": "赵继新",
                    "responsiblePhone": "15828165225",
                    "status": 1,
                    "deleted": 0,
                    "largeRegionName": null,
                    "password": null,
                    "userId": null
                },
                {
                    "searchValue": null,
                    "createUserId": null,
                    "createUserName": null,
                    "createTime": "2022-06-13 17:17:12",
                    "updateUserId": "1",
                    "updateUserName": "admin",
                    "updateTime": "2023-08-05 17:40:23",
                    "remark": null,
                    "params": {

                    },
                    "pageNum": null,
                    "pageSize": null,
                    "token": null,
                    "id": 13,
                    "regionName": "京津省区",
                    "largeRegionId": 57859,
                    "label": "京津省区",
                    "value": 57859,
                    "responsiblePerson": "杨冰",
                    "responsiblePhone": "18859659928",
                    "status": 1,
                    "deleted": 0,
                    "largeRegionName": null,
                    "password": null,
                    "userId": null
                },
                {
                    "searchValue": null,
                    "createUserId": null,
                    "createUserName": null,
                    "createTime": "2022-06-13 17:18:55",
                    "updateUserId": "1",
                    "updateUserName": "admin",
                    "updateTime": "2023-08-05 17:39:33",
                    "remark": null,
                    "params": {

                    },
                    "pageNum": null,
                    "pageSize": null,
                    "token": null,
                    "id": 16,
                    "regionName": "河北省区",
                    "largeRegionId": 57859,
                    "label": "河北省区",
                    "value": 57859,
                    "responsiblePerson": "王庆义",
                    "responsiblePhone": "18547132777",
                    "status": 1,
                    "deleted": 0,
                    "largeRegionName": null,
                    "password": null,
                    "userId": null
                },
                {
                    "searchValue": null,
                    "createUserId": null,
                    "createUserName": null,
                    "createTime": "2023-03-21 09:34:09",
                    "updateUserId": "1",
                    "updateUserName": "admin",
                    "updateTime": "2024-04-17 18:05:05",
                    "remark": null,
                    "params": {

                    },
                    "pageNum": null,
                    "pageSize": null,
                    "token": null,
                    "id": 26,
                    "regionName": "湘赣省区",
                    "largeRegionId": 57860,
                    "label": "湘赣省区",
                    "value": 57860,
                    "responsiblePerson": "杨源",
                    "responsiblePhone": "18607154806",
                    "status": 1,
                    "deleted": 0,
                    "largeRegionName": null,
                    "password": null,
                    "userId": null
                },
                {
                    "searchValue": null,
                    "createUserId": null,
                    "createUserName": null,
                    "createTime": "2023-03-21 09:35:50",
                    "updateUserId": "1",
                    "updateUserName": "admin",
                    "updateTime": "2024-04-17 18:00:42",
                    "remark": null,
                    "params": {

                    },
                    "pageNum": null,
                    "pageSize": null,
                    "token": null,
                    "id": 27,
                    "regionName": "鄂西南省区",
                    "largeRegionId": 57860,
                    "label": "鄂西南省区",
                    "value": 57860,
                    "responsiblePerson": "李志磊",
                    "responsiblePhone": "13135860198",
                    "status": 1,
                    "deleted": 0,
                    "largeRegionName": null,
                    "password": null,
                    "userId": null
                }
            ],
            selectSplit: [],
            mergeGoalsList: [{
                columns: [
                    {
                        "searchValue": null,
                        "createUserId": "1",
                        "createUserName": "admin",
                        "createTime": "2023-07-31 22:16:42",
                        "updateUserId": "2355",
                        "updateUserName": "MN18810642341ZB",
                        "updateTime": "2024-02-23 11:05:21",
                        "remark": null,
                        "params": {

                        },
                        "pageNum": null,
                        "pageSize": null,
                        "token": null,
                        "id": 57856,
                        "value": 57856,
                        "label": "晋蒙东北",
                        "regionName": "晋蒙东北",
                        "responsiblePerson": "邹恒",
                        "responsiblePhone": "13359518688",
                        "status": 1,
                        "deleted": 0,
                        "password": null,
                        "userId": null
                    },
                    {
                        "searchValue": null,
                        "createUserId": "1",
                        "createUserName": "admin",
                        "createTime": "2023-07-31 22:16:58",
                        "updateUserId": "2355",
                        "updateUserName": "MN18810642341ZB",
                        "updateTime": "2024-02-23 11:04:53",
                        "remark": null,
                        "params": {

                        },
                        "pageNum": null,
                        "pageSize": null,
                        "token": null,
                        "id": 57857,
                        "regionName": "鲁皖",
                        "value": 57857,
                        "label": "鲁皖",
                        "responsiblePerson": "路金桥",
                        "responsiblePhone": "17260485253",
                        "status": 1,
                        "deleted": 0,
                        "password": null,
                        "userId": null
                    },
                    {
                        "searchValue": null,
                        "createUserId": "1",
                        "createUserName": "admin",
                        "createTime": "2023-07-31 22:17:13",
                        "updateUserId": "2355",
                        "updateUserName": "MN18810642341ZB",
                        "updateTime": "2024-02-23 11:04:11",
                        "remark": null,
                        "params": {

                        },
                        "pageNum": null,
                        "pageSize": null,
                        "token": null,
                        "id": 57858,
                        "regionName": "江浙沪",
                        "value": 57858,
                        "label": "江浙沪",
                        "responsiblePerson": "杨偲晨",
                        "responsiblePhone": "15951405315",
                        "status": 1,
                        "deleted": 0,
                        "password": null,
                        "userId": null
                    },
                    {
                        "searchValue": null,
                        "createUserId": "1",
                        "createUserName": "admin",
                        "createTime": "2023-07-31 22:17:28",
                        "updateUserId": "2355",
                        "updateUserName": "MN18810642341ZB",
                        "updateTime": "2024-02-23 11:03:29",
                        "remark": null,
                        "params": {

                        },
                        "pageNum": null,
                        "pageSize": null,
                        "token": null,
                        "id": 57859,
                        "regionName": "京津冀",
                        "value": 57859,
                        "label": "京津冀",
                        "responsiblePerson": "蔡素成",
                        "responsiblePhone": "15822796618",
                        "status": 1,
                        "deleted": 0,
                        "password": null,
                        "userId": null
                    },
                    {
                        "searchValue": null,
                        "createUserId": "1",
                        "createUserName": "admin",
                        "createTime": "2023-07-31 22:17:42",
                        "updateUserId": "2355",
                        "updateUserName": "MN18810642341ZB",
                        "updateTime": "2024-02-23 11:03:03",
                        "remark": null,
                        "params": {

                        },
                        "pageNum": null,
                        "pageSize": null,
                        "token": null,
                        "id": 57860,
                        "regionName": "中南",
                        "value": 57860,
                        "label": "中南",
                        "responsiblePerson": "雷文浩",
                        "responsiblePhone": "17324001683",
                        "status": 1,
                        "deleted": 0,
                        "password": null,
                        "userId": null
                    }
                ],
                selectChildList: [],
                columnsValue: undefined,
                childValue: []
            }]
        }
    },
    created() {

    },

    methods: {
        handleSelectGoalsChange(e, items, postion) {
            console.log('~~~~~~~~~~~', items)
            items.selectChildList = []
            for (let i = 0; i < items.columns.length; i++) {

            }
            items.columns[postion].disabled = true
            for (let index = 0; index < this.childColumns.length; index++) {
                const element = this.childColumns[index];
                if (e == element.largeRegionId) {
                    items.selectChildList.push(element)
                }
            }
            console.log('~~~~~~选择二级~~~~~~~~', items)
        },

        onClickAdd() {
            this.mergeGoalsList.push({
                columns: this.mergeGoalsList[this.mergeGoalsList.length - 1].columns,
                selectChildList: [],
                columnsValue: undefined,
                childValue: []
            })
        },

        onClickRemove() {
            // 撤回不可选中状态
            const object = this.mergeGoalsList[this.mergeGoalsList.length - 1]
            for (let index = 0; index < object.columns.length; index++) {
                const element = object.columns[index];
                if (object.columnsValue === element.id) {
                    element.disabled = false
                }
            }
            this.mergeGoalsList.pop()
        },

        onClickQuery() {

            console.log('配置数据集', this.mergeGoalsList)
        }
    }

}
</script>

<style></style>