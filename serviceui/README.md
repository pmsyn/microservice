# serviceui

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


#项目优化
## 1.实现项目加载进度条
### 1.1安装npogress 
### 1.2在axios request中展示进度条 response中隐藏进度条 配置
## 2.移除console输出内容
### 2.1 安装babel-plugin-transform-remove-console插件
npm install babel-plugin-transform-remove-console --save-dev
### 2.2配置
babel.config.js中加入
```javascript
"plugins": [["transform-remove-console", { "exclude": ["error", "warn"] }]]
```
## 3.生成打包报告
### 3.1 命令行的方式
```shell script
vue-cli-sevice build --report
```
###3.2 vue cli ui可视化面板
任务->build 控制台/分析
## 4.打包优化chainWebpack
在main.js中配置
