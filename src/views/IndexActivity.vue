<template>
    <a-card title="Card title" :bordered="false" style="width: 100%">
    <img src="data:image/png;base64,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" />
        <div id="container" style="width: 100%; height: 600px;"></div>
        <a-space :size="[8, 16]" wrap>
            <a-button @click="add">新建</a-button>
            <a-button type="dashed" @click="edt">编辑</a-button>
            <a-button type="primary" ghost @click="close">完成</a-button>
            <a-button danger @click="remove">移除</a-button>
        </a-space>
        <a-space>
            <a-select v-model:value="inputName" show-search placeholder="input search text" style="width: 400px"
                :default-active-first-option="false" :show-arrow="false" :filter-option="false" allowClear
                :not-found-content="null" :options="pois" @search="searchPois" @change="handleChange"
                @select="handleSelcet">
                <template v-if="fetching" #notFoundContent>
                    <a-spin size="small" />
                </template>
            </a-select>
        </a-space>
    </a-card>
</template>

<script>
import LocationManagerUtils from '@/utils/LocationManagerUtils';
import StorageManagerUtils from '@/utils/StorageManagerUtils';



export default {
    name: 'IndexActivity',
    data() {
        return {
            inputName: undefined,
            fetching: false,
            pois: [],
            mapview: null,
            polygonEditor: null,
            polygon: null,
            path: [
                [116.39726, 39.90354],
                [116.418546, 39.903277],
                [116.412194, 39.894651],
                [116.393483, 39.895639]
            ]
        }
    },
    created() {

    },

    mounted() {
        StorageManagerUtils.saveCookies('ssssss','safdfsdfsdffsd','30s')
        console.log('获取cookies：',StorageManagerUtils.getCookies('ssssss'))
        // LocationManagerUtils.renderMap('container', map => {
        //     this.mapview = map;
        //     this.polygon = LocationManagerUtils.renderPolygon()
        //     this.mapview.add(this.polygon);
        //     LocationManagerUtils.appendMoveend(map, this.handleMoveendChange)
        //     LocationManagerUtils.appendScaleControl(map);
        // })
    },

    methods: {
        handleMoveendChange() {
            LocationManagerUtils.findPoiSearchByLatitude(this.mapview.getCenter().lat, this.mapview.getCenter().lng, listener => {
                console.log('~~~~~~~~~', listener)
            })
        },

        handlePolygonNode(event) {
            console.log('~~~监听~~~~', event)
            this.path.push([event.lnglat.lng, event.lnglat.lat])
        },

        add() {
            this.remove()
            LocationManagerUtils.renderPolygonEditor(this.mapview, polygonEditor => {
                this.polygonEditor = polygonEditor
                this.polygonEditor.open()
            });
        },

        edt() {
            this.polygonEditor.open()
        },

        close() {
            console.log('~~~~~~~', this.polygonEditor.getTarget())
            this.polygonEditor.close();
        },

        remove() {
            if (this.polygonEditor) {
                this.polygonEditor.close()
                this.polygonEditor.getTarget().setPath([]);
            }
        },

        searchPois(value) {
            console.log('搜索', value);
            this.pois = [];
            // this.fetching = true
            LocationManagerUtils.findPoiSearchByKeyword(value, succeed => {
                this.pois = succeed.poiList.pois;
                // this.fetching = false;
                this.pois.find(value => {
                    value.value = value.name + '（ ' + value.address + ' ）'
                    value.lable = value.id
                });
                console.log('数据', this.pois)
            })
        },

        handleChange(val) {

        },

        handleSelcet(val, opstion) {
            console.log('~~~~~选中~~~~~~',opstion)
        }
    }

}
</script>

<style></style>