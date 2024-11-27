const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({

    transpileDependencies: true,

    /**
     * todo productionSourceMap
     * 把productionSourceMap 置为false，既可以减少包大小，也可以加密源码。这样打包后文件小而且别人看不到你的源码了。
     * 把productionSourceMap true， 项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
     * 有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
     */
    productionSourceMap: true,

    /**
     * todo lintOnSave 是否在开发环境下每次保存代码时都启用 eslint验证
     * 前端程序员都会有一个通病，每次写完一点代码，哪怕写了一个单词，定义一个变量，都会习惯性的格式化一下代码，
     * 保存下代码，这个配置就是每次我们保存代码时，是否要经过esLint检查代码的，因为我个人不太习惯使用esLint,所以没有做过多了解，
     * 如果项目中有使用eslint的话，不想被检查到，就可以用，如果没有，可以不用写这个配置。
     */
    lintOnSave: false,

    /**
     * todo devServer
     * 在dev环境下，webpck-dev-server的相关配置
     */
    devServer: {
        port: 43999, //开发环境运行时的端口
        https: false,//是否启用HTTPS协议
        open: true, //项目运行成功后是否直接打开浏览器
        hot: true,//是否开启热加载
        // overlay: true //当出现编译错误或警告时，在浏览器中显示全屏覆盖。
        proxy: {
            '/api': {
                target: 'http://121.52.223.207:809/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },

    configureWebpack: {
        mode: 'development'
    }
})
