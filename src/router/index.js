import { createRouter, createWebHistory } from 'vue-router';
import { reactive, watch, h, shallowRef } from 'vue';
import { HomeOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons-vue';
import MainActivity from '@/views/MainActivity.vue';
import VuetifyActivity from '@/views/VuetifyActivity.vue';
import SysmentActivity from '@/views/SysmentActivity.vue';
import IndexActivity from '@/views/IndexActivity.vue';
import IonicActivity from '@/views/IonicActivity.vue';


export const mapMenu = [
    {
        path: '/index',
        name: 'index',
        meta: {
            title: '首页',
            keepAlive: true,
            icon: () => h(HomeOutlined)
        },
        redirect: '/index/data',
        children: [
            {
                path: '/index/data',
                name: 'data',
                component: IndexActivity,
                meta: {
                    title: '数据统计',
                    keepAlive: false,
                },
            },
            {
                path: '/index/recommend',
                name: 'recommend',
                component: IndexActivity,
                meta: {
                    title: '推荐',
                    keepAlive: false,
                },
            }
        ]
    },
    {
        path: '/user',
        name: 'user',
        redirect: '/user/info',
        meta: {
            title: '用户管理',
            keepAlive: true,
            icon: () => h(UserOutlined)
        },
        children: [
            {
                path: '/user/info',
                name: 'info',
                component: VuetifyActivity,
                meta: {
                    title: 'Vuetify',
                    keepAlive: false,
                },
            },
            {
                path: '/user/ionic',
                name: '用户',
                component: VuetifyActivity,
                meta: {
                    title: '用户',
                    keepAlive: false,
                },
            }
        ]
    },
    {
        path: '/sys',
        name: 'sys',
        component: SysmentActivity,
        meta: {
            title: '系统管理',
            keepAlive: true,
            icon: () => h(SettingOutlined)
        },
        children: [
            {
                path: '/user/share',
                name: 'share',
                component: VuetifyActivity,
                meta: {
                    title: '推荐',
                    keepAlive: false,
                },
            }
        ]
    }
]

export const concatMapRoter = [
    {
        // 普通的设置一个普通的路由（顶级路由）
        path: '/',
        name: 'home',
        redirect: '/index',
        component: MainActivity,
        // 设置路由元信息，应用场景的话：主要就路由守卫里用的会多一点。该数据只能在这里声明，其他途径无法修改。
        meta: { requiresXXX: true },
        // 设置路由懒加载
        children: mapMenu
    },
    {
        // 普通的设置一个普通的路由（顶级路由）
        path: '/ionic',
        name: 'ionic',
        component: IonicActivity,
        // 设置路由元信息，应用场景的话：主要就路由守卫里用的会多一点。该数据只能在这里声明，其他途径无法修改。
        meta: { requiresXXX: true },
    },
]

// export const map = [
//     {
//         path: '/index',
//         name: 'index',
//         label: '首页',
//         key: 'sub1',
//         icon: () => h(HomeOutlined),
//         children: [
//             {
//                 path: '/index',
//                 name: 'index',
//                 label: '数据统计',
//                 key: '1',
//             }
//         ]
//     },
//     {
//         path: '/index',
//         name: 'index',
//         label: '视频管理',
//         key: 'sub2',
//         icon: () => h(VideoCameraOutlined),
//         children: [
//             {
//                 path: '/index',
//                 name: 'index',
//                 label: '视频分析',
//                 key: '2',
//             }
//         ]
//     },
//     {
//         path: '/index',
//         name: 'index',
//         label: '用户管理',
//         key: 'sub3',
//         icon: () => h(UploadOutlined),
//         children: [
//             {
//                 path: '/index',
//                 name: 'index',
//                 label: '用户列表',
//                 key: '3',
//             },
//             {
//                 path: '/index',
//                 name: 'index',
//                 label: '用户列表',
//                 key: '4',
//             }
//         ]
//     }
// ]




const router = createRouter({
    history: createWebHistory(),
    routes: concatMapRoter,
})

export default router