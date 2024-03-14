const { idKey, classKey, getFullName, checkSkipSource, pip } = require('./utils')
module.exports = function(source) {
    try {
        const { globalClass, ignore, globalID, ...args } = this.getOptions() || {};

        const className = getFullName( globalClass, classKey );
        const id = getFullName( globalID, idKey );

        // 不需要全局替换
        if(!className && !id){
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
        
        const midContent = pip(args)
        
        return `${id}${className}{
            ${midContent}
            ${source}
        }`

    } catch (error) {
        console.error(error, 'add-global-class-loader 报错');
        return source;
    }
}