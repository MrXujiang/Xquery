/**
 * 链模式实现自己的js框架
 */
(function(win, doc){
    var Xuery = function(selector, context) {
        return new Xuery.fn.init(selector, context)
    };

    Xuery.fn = Xuery.prototype = {
    constructor: Xuery,
    init: function(selector, context) {
        // 设置元素长度
        this.length = 0;
        // 默认获取元素的上下文document
        context = context || document;
        // id选择符，则按位非将-1转化为0
        if(~selector.indexOf('#')) {
        this[0] = document.getElementById(selector.slice(1));
        this.length = 1;
        }else{
        // 在上下文中选择元素
        var doms = context.getElementsByTagName(selector),
        i = 0,
        len = doms.length;
        for(; i<len; i++){
            this[i] = doms[i];
        }
        }
        this.context = context;
        this.selector = selector;
        return this
    },
    // 增强数组
    push: [].push,
    sort: [].sort,
    splice: [].splice
    };

    // 方法扩展
    Xuery.extend = Xuery.fn.extend = function(){
    // 扩展对象从第二个参数算起
    var i = 1,
    len = arguments.length,
    target = arguments[0],
    j;
    if(i === len){
        target = this;
        i--;
    }
    // 将参数对象合并到target
    for(; i<len; i++){
        for(j in arguments[i]){
        target[j] = arguments[i][j];
        }
    }
    return target
    }

    // 扩展事件方法
    Xuery.fn.extend({
    on: (function(){
        if(document.addEventListener){
        return function(type, fn){
            var i = this.length -1;
            for(; i>=0;i--){
            this[i].addEventListener(type, fn, false)
            }
            return this
        }
        // ie浏览器dom2级事件
        }else if(document.attachEvent){
        return function(type, fn){
            var i = this.length -1;
            for(; i>=0;i--){
            this[i].addEvent('on'+type, fn)
            }
            return this
        }
        // 不支持dom2的浏览器
        }else{
        return function(type, fn){
            var i = this.length -1;
            for(; i>=0;i--){
            this[i]['on'+type] = fn;
            }
            return this
        }
        }
    })()
    })

    // 将‘-’分割线转换为驼峰式
    Xuery.extend({
    camelCase: function(str){
        return str.replace(/\-(\w)/g, function(all, letter){
        return letter.toUpperCase();
        })
    }
    })

    // 设置css
    Xuery.fn.extend({
    css: function(){
        var arg = arguments,
        len = arg.length;
        if(this.length < 1){
        return this
        }
        if(len === 1) {
        if(typeof arg[0] === 'string') {
            if(this[0].currentStyle){
            return this[0].currentStyle[arg[0]];
            }else{
            return getComputedStyle(this[0], false)[arg[0]]
            }
        }else if(typeof arg[0] === 'object'){
            for(var i in arg[0]){
            for(var j=this.length -1; j>=0; j--){
                this[j].style[Xuery.camelCase(i)] = arg[0][i];
            }
            }
        }
        }else if(len === 2){
        for(var j=this.length -1; j>=0; j--){
            this[j].style[Xuery.camelCase(arg[0])] = arg[1];
        }
        }
        return this
    }
    })

    // 设置属性
    Xuery.fn.extend({
    attr: function(){
        var arg = arguments,
        len = arg.length;
        if(len <1){
        return this
        }
        if(len === 1){
        if(typeof arg[0] === 'string'){
            return this[0].getAttribute(arg[0])
        }else if(typeof arg[0] === 'object'){
            for(var i in arg[0]){
            for(var j=this.length -1; j>= 0; j--){
                this[j].setAttribute(i, arg[0][i])
            }
            }
        }
        }
        else if(len === 2){
        for(var j=this.length -1; j>=0; j--){
            this[j].setAttribute(arg[0], arg[1]);
        }
        }
        return this
    }
    })

    // 获取或者设置元素内容
    Xuery.fn.extend({
    html: function(){
        var arg = arguments,
        len = arg.length;
        if(len === 0){
        return this[0] && this[0].innerHTML
        }else{
        for(var i=this.length -1; i>=0; i--){
            this[i].innerHTML = arg[0];
        }
        }
        return this
    }
    })

    Xuery.fn.init.prototype = Xuery.fn;
    window.Xuery = Xuery;
})(window, document);
