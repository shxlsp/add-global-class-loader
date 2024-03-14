# add-global-class-loader

为less/scss 添加全局类名或id名

## 迭代说明

- 1.0.1
    - 支持添加全局id名
    - 支持在文件头配置  `// add-global-class-loader ignore` 忽略添加全局样式配置
- 1.0.0
    - 为less/scss 添加全局类名
    - 支持配置ignore字段，忽略检查文件

## 使用说明
|  配置项       | 值     | 例子                          |
|  ----------  | -----  | ---------------------------  |
| globalClass  | string | desktop-container            |
| ignore       | RegExp | /src\/assets\/.*\.(le|c)ss$/ |
| globalID     | string | desktop-container            |

支持在文件头配置`// add-global-class-loader ignore`，效果等同于ignore。

### 基础使用

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
const skipReg = new RegExp('//\\s*add-global-class-loader\\s*ignore')

const checkSkipSource = (source) => {
    return skipReg.test(source)
}

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
    
    // 需要被跳过的文件
    if(checkSkipSource(source)){
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