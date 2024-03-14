const idKey = 'id'
const classKey = 'class'
const nameType = { [idKey]: '#', [classKey]: '.' };
const defaultPipFnReturn = ''

const getFullName = (name, type) => name? nameType[type] + name: '';

const skipReg = new RegExp('//\\s*add-global-class-loader\\s*ignore')

const checkSkipSource = (source) => {
    return skipReg.test(source)
}

const saveObj = {
    addCSSTimes: 0,
    addCSSStep: 1,
    maxAddCSSTimes: 1,
}

const addContainerCSS = (css) => {
    if(!css){
        return defaultPipFnReturn;
    }
    if(saveObj.addCSSTimes === saveObj.maxAddCSSTimes){
        return defaultPipFnReturn;
    }
    saveObj.addCSSTimes += saveObj.addCSSStep;
    return css;
}

const pip = (data = {}) => {
    let midContent = defaultPipFnReturn;
    const { containerCSS } = data;
    midContent += addContainerCSS(containerCSS);
    return midContent;
}


module.exports = {
    classKey,
    idKey,
    nameType,
    getFullName,
    checkSkipSource,
    pip
}