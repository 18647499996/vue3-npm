<template>
    <a-card title="Card title" :bordered="false" style="width: 100%">
        <div id="container" style="width: 100%; height: 800px;"></div>
    </a-card>
</template>

<script>
import LocationManagerUtils from '@/utils/LocationManagerUtils';



export default {
    name: 'IndexActivity',
    data() {
        return {
            mapview: null,
        }
    },
    created() {

    },

    mounted() {
        LocationManagerUtils.renderMap('container', map => {
            this.mapview = map;
            map.on('moveend', this.handleMoveendChange);
            LocationManagerUtils.appendScaleControl(map);
            LocationManagerUtils.findPoiSearchByLatitude(map.getCenter().lat, map.getCenter().lng, listener => {
                console.log('~~~~~~~~~', listener)
            })
        })
    },

    methods: {
        handleMoveendChange() {
            LocationManagerUtils.findPoiSearchByLatitude(this.mapview.getCenter().lat, this.mapview.getCenter().lng, listener => {
                console.log('~~~~~~~~~', listener)
            })
        }
    }

}
</script>

<style></style>