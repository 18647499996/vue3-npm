<template>
    <a-card title="Card title" :bordered="false" style="width: 100%">
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
        LocationManagerUtils.renderMap('container', map => {
            this.mapview = map;
            this.polygon = LocationManagerUtils.renderPolygon()
            this.mapview.add(this.polygon);
            LocationManagerUtils.appendMoveend(map, this.handleMoveendChange)
            LocationManagerUtils.appendScaleControl(map);
        })
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