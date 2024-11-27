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
        http.createAxiosServer()
            .baseApi('/api/')
            .addHeaders({
                // todo 根据服务器业务需求配置公共请求头
                'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjNDMkYzMkQ1N0RBOTBGQzM5N0QwQjgyMTNFRjFFOUMyIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE3MzI2MTI3NTcsImV4cCI6MTgxOTAxMjc1NywiaXNzIjoiaHR0cHM6Ly9sb2dpbi5sYXd4cC5jb20iLCJjbGllbnRfaWQiOiJhcHAiLCJzdWIiOiI3MThfaXN3ZWJvYTpUcnVlX2lzd2VzYWxlOkZhbHNlX2lzYWdlbnQ6RmFsc2UiLCJhdXRoX3RpbWUiOjE3MzI2MTI3NTcsImlkcCI6ImxvY2FsIiwiVXNlcklkIjoiMjEwMjk2MTExMCIsIm5hbWUiOiIxODY0NzQ5OTk5NiIsImdpdmVuX25hbWUiOiLliJjlhqzmtrUiLCJlbWFpbCI6ImxpdWRvbmdoYW5AbGF3eHAuY29tIiwianRpIjoiOTI3MEE2OEE0ODM5ODNCNTdGMUVBQkI4MDE0NUE4QTgiLCJpYXQiOjE3MzI2MTI3NTcsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsiY3VzdG9tIl19.2toj2-Z-vxVC1UfrsxzEp_L2C9tdwXw2vfiq7UT3_avDCnv5Q4nvT8q8kXQKFETEogUVLigvQhlqyzXqrt3dk0zQcbhvcvZ5_wKzfkHumwTA-tRsskUHAMHoWYAcwJlg-ME4zmvoHDyYOLcqwWSwkJ-_8z_EQH7Q_444qCYkFLJx8pJqo98QEDaWwkGTffnq3BjBDBqoloaBTfEp8t3OJbpsKbMhNYGW3QGIphWjSbskPJHWUjfZpVnzNyTEmSo6Oi4f4L91N1iThHlRStNr3fWYK3x2aYR3Uk2f9riKRbTrw5QK8WgSXpo0L6SbdAE8zuZ1cGmFVGYgjqnpCGcT7g'
            })
            .addLogcatInterceptors()
            .addParamsInterceptors(params => {
                if (params.loading) {
                    message.loading('加载中..', 0);
                }
                return params
            })
            .put('InvokeInfoMaintenance/DeleteCustomeInfor', [5])

        // http.createBlobAxiosServer()
        //     .baseApi('http://vd3.bdstatic.com/')
        //     .addBlobInterceptors()
        //     .video('axios视频下载')
        //     .downloadProgressListener(listener => {
        //         console.log('~~~~~~~下载进度~~~~', listener)
        //     })
        //     .get('mda-qgu9r9c2v50anmm2/360p/h264/1722236069205668984/mda-qgu9r9c2v50anmm2.mp4')
        //     .then(succeed => {
        //         console.log('下载成功', succeed)
        //     })
        //     .catch(error => {

        //     })
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