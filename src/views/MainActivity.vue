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
import { reactive, watch, h } from 'vue';
import { HomeOutlined, VideoCameraOutlined, UploadOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import HeaderTitleComponents from '@/components/HeaderTitleComponents.vue';
import SiderMenuComponents from '@/components/SiderMenuComponents.vue';

export default {
    name: 'HomeActivity',
    components: { VideoCameraOutlined, UploadOutlined, HeaderTitleComponents, SiderMenuComponents },
    data() {
        return {
            collapsed: false,
        }
    },
    created() {

    },

    methods: {
        onCollapsed(collapsed) {
            this.collapsed = collapsed
        }
    }

}
</script>

<style></style>