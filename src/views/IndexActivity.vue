<template>
    <a-card title="Card title" :bordered="false" style="width: 100%">
        <div id="container" style="width: 100%; height: 800px;"></div>
        <a-space :size="[8, 16]" wrap>
            <a-button @click="add">新建</a-button>
            <a-button type="dashed" @click="edt">编辑</a-button>
            <a-button type="primary" ghost @click="close">完成</a-button>
            <a-button danger @click="remove">移除</a-button>
        </a-space>
    </a-card>
</template>

<script>
import LocationManagerUtils from '@/utils/LocationManagerUtils';



export default {
    name: 'IndexActivity',
    data() {
        return {
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
            this.polygon = LocationManagerUtils.renderPolygon(this.path)
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
            }, this.polygon);
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
        }
    }

}
</script>

<style></style>