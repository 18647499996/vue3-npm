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
            <a-layout-footer :style="{ margin: '1px 8px', padding: '12px', background: '#fff', minHeight: '120px' }"
                @click="onclick">
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
            abortController: null
        }
    },
    created() {
        // http.createAxiosServer()
        //     .baseApi('/api/')
        //     .addHeaders({
        //         // todo 根据服务器业务需求配置公共请求头
        //         'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjNDMkYzMkQ1N0RBOTBGQzM5N0QwQjgyMTNFRjFFOUMyIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE3MzI2MTI3NTcsImV4cCI6MTgxOTAxMjc1NywiaXNzIjoiaHR0cHM6Ly9sb2dpbi5sYXd4cC5jb20iLCJjbGllbnRfaWQiOiJhcHAiLCJzdWIiOiI3MThfaXN3ZWJvYTpUcnVlX2lzd2VzYWxlOkZhbHNlX2lzYWdlbnQ6RmFsc2UiLCJhdXRoX3RpbWUiOjE3MzI2MTI3NTcsImlkcCI6ImxvY2FsIiwiVXNlcklkIjoiMjEwMjk2MTExMCIsIm5hbWUiOiIxODY0NzQ5OTk5NiIsImdpdmVuX25hbWUiOiLliJjlhqzmtrUiLCJlbWFpbCI6ImxpdWRvbmdoYW5AbGF3eHAuY29tIiwianRpIjoiOTI3MEE2OEE0ODM5ODNCNTdGMUVBQkI4MDE0NUE4QTgiLCJpYXQiOjE3MzI2MTI3NTcsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsiY3VzdG9tIl19.2toj2-Z-vxVC1UfrsxzEp_L2C9tdwXw2vfiq7UT3_avDCnv5Q4nvT8q8kXQKFETEogUVLigvQhlqyzXqrt3dk0zQcbhvcvZ5_wKzfkHumwTA-tRsskUHAMHoWYAcwJlg-ME4zmvoHDyYOLcqwWSwkJ-_8z_EQH7Q_444qCYkFLJx8pJqo98QEDaWwkGTffnq3BjBDBqoloaBTfEp8t3OJbpsKbMhNYGW3QGIphWjSbskPJHWUjfZpVnzNyTEmSo6Oi4f4L91N1iThHlRStNr3fWYK3x2aYR3Uk2f9riKRbTrw5QK8WgSXpo0L6SbdAE8zuZ1cGmFVGYgjqnpCGcT7g'
        //     })
        //     .addLogcatInterceptors()
        //     .addParamsInterceptors(params => {
        //         if (params.loading) {
        //             message.loading('加载中..', 0);
        //         }
        //         return params
        //     })
        //     .put('InvokeInfoMaintenance/DeleteCustomeInfor', [5])
        // http.createBlobAxiosServer()
        //     .baseApi('http://vd3.bdstatic.com/')
        //     .addBlobInterceptors()
        //     .video('axios视频下载')
        //     .download(true)
        //     .downloadProgressListener(listener => {
        //         console.log('~~~~~~~下载进度~~~~', listener)
        //     })
        //     .get('mda-qgu9r9c2v50anmm2/360p/h264/1722236069205668984/mda-qgu9r9c2v50anmm2.mp4', {}, this.abortController.signal)
        //     .then(succeed => {
        //         console.log('下载成功', succeed)
        //     })
        //     .catch(error => {
        //         console.log('下载失败', error)
        //     })

    },

    methods: {
        onCollapsed(collapsed) {
            this.collapsed = collapsed
        },

        onclick() {
            if (this.abortController) {
                this.abortController.abort()
            }
            this.abortController = new AbortController()
            http.createAxiosServer()
                .baseApi('http://131.131.1.50:8848/')
                .addHeaders({
                    // todo 根据服务器业务需求配置公共请求头
                    'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJCTSIsImF1ZCI6InNwb3Nwb25lIiwiaWF0IjoxNzMxMzA2ODg5LCJuYmYiOjE3MzEzMDY4ODksImV4cCI6MTczMzg5ODg4OSwiZGF0YSI6eyJhdmF0YXIiOiIiLCJjcmVhdGVfdGltZSI6IjIwMjQtMDQtMTcgMTg6MTQ6MDkiLCJlbWFpbCI6IjE4NjQ3NDk5OTk2QHNpbmEuY24iLCJpZCI6MiwibW9iaWxlIjoiMTg2NDc0OTk5OTYiLCJuaWNrbmFtZSI6IkJNXzA0MTcwNjE0MDk4MTIiLCJyb2xlIjoiT3duZXIiLCJzZXgiOjAsInNvdXJjZSI6ImFkbWluIiwic3RhdHVzIjowLCJ1cGRhdGVfdGltZSI6IjIwMjQtMDgtMDIgMTQ6MTQ6NTciLCJ1c2VybmFtZSI6ImxpdWRvbmdoYW4iLCJhcHBrZXkiOiI0YTFlYWJhY2Q1ZjEyMTMyNjE0MmNmYzA2OWViMjRjNyJ9fQ.QXxSKdxqHhYuSn3WOXCVTyjtefuYIzaogG78FCyzPz4',
                    'appkey': '4a1eabacd5f121326142cfc069eb24c7'
                })
                .log(true) // 是否打印日志
                .abort(true) // 是否开启请求取消
                .addLogcatInterceptors() // 添加日志拦截器
                .addCodeInterceptors(code => {
                    return Promise.resolve(code.data)
                }, error => {
                    return Promise.reject(error)
                })
                .get('admin/recommend/findRecommendList?', { page: 1, limit: 10 })
                .then(succeed => {
                    console.log('下载成功', succeed)
                })
                .catch(error => {
                    console.log('下载失败', error)
                })
        }
    }

}
</script>

<style></style>