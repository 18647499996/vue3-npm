<template>
    <a-layout id="HomeActivity">
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible theme="light">
            <SiderMenuComponents></SiderMenuComponents>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0px; height: 68px;">
                <HeaderTitleComponents :collapsed="collapsed" @onCollapsed="onCollapsed"></HeaderTitleComponents>
            </a-layout-header>
            <a-layout-content class="layout-content"
                :style="{ padding: '12px', background: '#f5f5f5', minHeight: '750px' }">
                <router-view></router-view>
            </a-layout-content>
            <a-layout-footer :style="{ margin: '1px 8px', padding: '12px', background: '#fff', minHeight: '120px' }">
                sssss
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script>
import HeaderTitleComponents from '@/components/HeaderTitleComponents.vue';
import SiderMenuComponents from '@/components/SiderMenuComponents.vue';
import http from '@/utils/AxiosManagerUtils.js';
import LocationManagerUtils from '@/utils/LocationManagerUtils';

export default {
    name: 'HomeActivity',
    components: { HeaderTitleComponents, SiderMenuComponents },
    data() {
        return {
            collapsed: false,
        }
    },
    created() {
        http.createBlobAxiosServer()
            .baseApi('http://vd3.bdstatic.com/')
            .addBlobInterceptors()
            .video('axios视频下载')
            .downloadProgressListener(listener => {
                console.log('~~~~~~~下载进度~~~~', listener)
            })
            .get('mda-qgu9r9c2v50anmm2/360p/h264/1722236069205668984/mda-qgu9r9c2v50anmm2.mp4')
            .then(succeed => {
                console.log('下载成功', succeed)
            })
            .catch(error => {

            })
        LocationManagerUtils.locationOption.mapKey = 'c2868746f6d0d525fc35b1f377e683c2';
        LocationManagerUtils.locationOption.mapSecurityCode = '6a5a69a56b383204455176e1c99c1f75';
        LocationManagerUtils.getCurrentCityLocation(succeed => {
            console.log('~~~~~~~~~~~~~~', succeed)
        })
    },

    methods: {
        onCollapsed(collapsed) {
            this.collapsed = collapsed
        }
    }

}
</script>

<style></style>