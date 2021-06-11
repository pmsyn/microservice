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
    }
}