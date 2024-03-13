module.exports = function(source) {
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
}