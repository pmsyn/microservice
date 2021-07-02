const productionPlugins=[];
//发布阶段环境
if(process.env.NODE_ENV == 'production'){
    productionPlugins.push('transform-remove-console')//移除console
}
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
