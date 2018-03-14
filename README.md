# mpimage

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 采坑总结
-  template中属性绑定不支持ES6模版字符串
  [v-bind:style写法无效](https://github.com/Meituan-Dianping/mpvue/issues/56#event-1520392752) 已经fixed了

 ``` 
<div class="list" :style="'margin:' +margin">
</div>
```
如果必须绑定style属性，使用以下方式
 ``` 
<div class="list" :style="style">
</div>
```
``` 
export default {
    data: {
        style: ''
    },
    methods: {
        setMargin() {
            let self = this;
            let query = wx.createSelectorQuery();
            query.select('.list').boundingClientRect(rect => {
            	let h = rect.height;
            	wx.getSystemInfo({
                    success(rec) {
                        let margin = (rec.windowWidth - 320) / 5;
                        self.$root.style = `margin:${margin}px 0 0 ${margin}px`;
                    }
            	});
            }).exec();
        }
    },
    onLoad() {
        this.setMargin();
    }
}
```
- 页面config需要在打包入口文件里添加
  如pages/index/main.js
``` javascript
import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount();

export default {
    // 会编译为index.json
    config: {
        "disableScroll": false,
        "enablePullDownRefresh": true
    }
}
```
- 全局属性和方法可以直接挂载到global对象上, 但是最好使用模块方式导入，或者使用状态管理器
- 组件使用小写，首字母大写不会编译解析
``` javascript
<template>
    <waterfall></waterfall>
</template>
<script>
import Waterfall from '@/components/Waterfall.vue';
export default {
    components: {
        waterfall: Waterfall
    }
}
</script>
```
- 页面所传参数特别是动态参数不可使用父组件props传参会有延迟，在子组件中直接调用
``` javascript
onLoad() {
    this.resetData();
    this.tag = this.$root.$mp.query.tag;
    this.requestWaterfall();
}
```
- 组件中不能定义style模块，webpack会打包成vendor.wxss
  解决方案：
  修改webpack.*.conf.js配置文件参考官方git issues [组件样式好像不生效]( https://github.com/Meituan-Dianping/mpvue/issues/7)
 
```javascript
new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf('node_modules') >= 0
        ) || count >= 2
      }
    }),
```
修改为
``` javascript
new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf('node_modules') >= 0
        )
      }
    }),
```

