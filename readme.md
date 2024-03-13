# add-global-class-loader

为less/scss 添加全局类名

## 使用

```js
    {
        loader: 'add-global-class-loader',
        options: {
            globalClass: 'desktop-container',
            ignore: /src\/assets\/.*\.(le|c)ss$/
        }
    },
```

## 效果说明

源文件：

```less
    .my-class{
        width: 100px;
        height: 100px;
        .inner{
            width: 20px;
            height: 20px
        }
    }
```

loader处理后：

```less
    /* options.globalClass */
    .desktop-container{
        .my-class{
            width: 100px;
            height: 100px;
            .inner{
                width: 20px;
                height: 20px
            }
        }
    }
```

## 源码
```js
    try {
        const { globalClass, ignore } = this.getOptions() || {};
        // 不需要全局替换
        if(!globalClass){
            return source;
        }
        // 需要被忽略的文件
        if(ignore && ignore.test(this.resourcePath)){
            return source;
        }

        return `.${globalClass}{
            ${source}
        }`
    } catch (error) {
        console.error(error, 'add-global-class-loader 报错');
        return source;
    }
```