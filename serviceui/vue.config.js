//解决向后端发送请求时跨域
module.exports = {
    devServer: {
        host:'localhost',
        port:9098,
        open:true,//项目启动时自动在浏览器中打开
        proxy: {
            '/api': {//代理标识
                target: 'http://localhost:9099',//后台服务目标地址,
                changeOrigin: true,//是否跨域
                //ws:true,// 是否启用  websockets;
                pathRewrite: {// 作用是把实际Request Url中的'/api'用""代替
                    '^/api': ''
                }
            }
        }
    },
    //配置打包文件入口
    chainWebpack:(config)=>{
        //发布模式
        config.when(process.env.NODE_ENV == 'production',config=>{
            config.entry('app').clear().add('./src/main-prod.js')
            //通过externals加载外部CDN资源,声明节点不会打包到文件中 k(包名):v（对象名）
            config.set('externals',{
                vue:'vue',
                'vue-router':'VueRouter'
            })
            //自定义首页显示内容
            config.plugin('html').tap(args => {
                args[0].isProduction = true
                return args
            })
        })
        //开发模式
        config.when(process.env.NODE_ENV == 'development',config=>{
            config.entry('app').clear().add('./src/main-dev.js')
            //自定义首页显示内容
            config.plugin('html').tap(args => {
                args[0].isProduction = false
                return args
            })
        })
    }
}