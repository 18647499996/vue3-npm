<template>
    <!-- onlyoffice展示 -->
    <!-- <div class="custom-mount"></div> -->
    <iframe src="https://view.officeapps.live.com/op/embed.aspx?src=https://pageoffice-1307611133.cos.ap-beijing.myqcloud.com/1731987638870.doc" width="100%" height="800px" frameborder="0"></iframe>

</template>
<script>
export default {
    data() {
        return {
            jssdk: null
        }

    },
    created() {
        
        // // 等待加载完毕
        // this.onReday();


        // const tabs = this.jssdk.tabs.getTabs();
        // // 设置文档缩放比例为 50%
        // // app.ActiveDocument.ActiveWindow.View.Zoom.Percentage = 50;
        // this.jssdk.on('fileOpen', (data) => {
        //     console.log('打开文档成功: ', data)
        // })
    },


    methods: {
        async onReday() {
            this.jssdk = WebOfficeSDK.config({
                url: 'https://pageoffice-1307611133.cos.ap-beijing.myqcloud.com/1731987638870.doc', // 该地址需要对接方服务端提供，形如 https://wwo.wps.cn/office/p/xxx
                // 更多配置参数...
                mount: document.querySelector('.custom-mount'),
                // 通用选项，所有类型文档适用
                commonOptions: {
                    isShowTopArea: true, // 隐藏顶部区域（头部和工具栏）
                    isShowHeader: true, // 隐藏头部区域
                },
            })
            console.log('JSSDK版本信息：', this.jssdk) // 打印 JSSDK 版本
            await this.jssdk.ready();
            const app = this.jssdk.Application;
            // 自动识别
            console.log('~~~~~~~~~~~', app)
        }
    }
}

</script>

<style scoped>
.custom-mount {
    width: 100%;
    height: 400px;
    margin-top: 100px;
}
</style>