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
            console.log('~~~~~~~~',map);
            map.add(LocationManagerUtils.appendMarker([116.49, 39.9]))
        })
    },

    methods: {

    }

}
</script>

<style></style>