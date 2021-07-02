# 一、项目运行
1.安装依赖包
```
npm install
```
2.开发环境运行
```
npm run serve
```
3.生产环境运行
```
npm run build
```
4.Lints and fixes files
```
npm run lint
```
5.自定义配置
See [Configuration Reference](https://cli.vuejs.org/config/).


# 二、项目优化
## 1. 实现项目加载进度条
### 1.1 安装npogress 
### 1.2 在axios request中展示进度条 response中隐藏进度条 配置
## 2. 移除console输出内容
### 2.1 安装babel-plugin-transform-remove-console插件
npm install babel-plugin-transform-remove-console --save-dev
### 2.2 配置
babel.config.js中加入
```javascript
"plugins": [["transform-remove-console", { "exclude": ["error", "warn"] }]]
```
## 3. 生成打包报告
### 3.1 命令行的方式
```shell script
vue-cli-sevice build --report
```
###3.2 vue cli ui可视化面板
任务->build 控制台/分析
## 4. 打包优化chainWebpack
在vue.config.js中配置
```javascript
chainWebpack:(config)=>{
        config.when(process.env.NODE_ENV == 'production',config=>{
            config.entry('app').clear().add('./src/main-prod.js')
        })
        config.when(process.env.NODE_ENV == 'development',config=>{
            config.entry('app').clear().add('./src/main-dev.js')
        })
    }
```
## 5.通过externals加载外部CDN资源
externals声明节点不会打包到文件中
1.修改配置：
```javascript
  chainWebpack:(config)=>{
        //发布模式
        config.when(process.env.NODE_ENV == 'production',config=>{
            config.entry('app').clear().add('./src/main-prod.js')
            //通过externals加载外部CDN资源,声明节点不会打包到文件中
            config.set('externals',{
                vue:'vue',
            })
        })
        //开发模式
        config.when(process.env.NODE_ENV == 'development',config=>{
            config.entry('app').clear().add('./src/main-dev.js')
        })
    }
```
2.将CDN引用css,js文件添加到public/index.html文件中
## 6.首页自定义显示
```javascript 
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
        }
```
 
 ```html
 <title><%= htmlWebpackPlugin.options.isProduction == true ? '':'dev' %>微服务UI</title>

<% if(htmlWebpackPlugin.options.isProduction){ %>
    <!--加载生成环境资源-->
<% } %>
```
## 7.路由懒加载
[实现路由按需加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E8%B7%AF%E7%94%B1%E6%87%92%E5%8A%A0%E8%BD%BD)

1.安装@babel/plugin-syntax-dynamic-import包
2.在babel.config.js中声明插件
```javascript
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
      //...展开数组放到plugins中
      ...productionPlugins,
      //路由懒加载
      '@babel/plugin-syntax-dynamic-import'
  ]
}
```
3.路由按需加载形式
```javascript
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
```
webpackChunkName:将文件打包到此文件中
## 8. 通过node创建web服务器
### 1.创建node项目，安装express,通过express创建web服务器，将vue打包生成的dist文件托管为静态资源
* 创建一个空的文件夹，作为web服务项目
* 初始化这个项目 npm init -y 
* 安装express
```shell script
npm i express

```
* 将打包后的文件dist复制到web项目下

* 在web服务中新增app.js作为入口文件
```javascript
const express = require('express')

const app = express()

app.use(express.static('./dist'))
//监听80端口
app.listen(80,()=>{

})
```
* 运行
```shell script
node ./app.js
```
### 2.开启gzip压缩
使用express开启gzip压缩
* 安装compression包
```shell script
npm i compression
```
* 导入包
```javascript
const compression = require('compression')
```
* 启用gzip，放到静态资源代码之前
```javascript
app.use(compression())
```
## 9.启用https服务
### 1.申请ssl证书 http://freessl.cn
### 2.导入证书
```javascript
const https = require('https');
const fs = require('rs');
const options={
    cert:fs.readFileSync('./full_chain.pem'),//公钥
    key:fs.readFileSync('./private.key')//私钥
}
https.createServer(options,app).listen(443)
```
## 10.使用pm2管理应用
[PM2](https://www.npmjs.com/package/pm2) 是一个带有负载均衡功能的 Node 应用的进程管理器
* 安装pm2
```shell script
npm i pm2 -g
```
* 启动项目应用
```shell script
pm2 start 脚本（app.js） --name 自定义名称
#查看应用
pm2 ls
#重启
pm2 restart 应用
#停止应用
pm2 stop 应用
```