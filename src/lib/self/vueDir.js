// vue 自定义指令
//
// 1.钩子函数
//
// 一个指令定义对象可以提供如下几个钩子函数（均为可选）:
// * bind: 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
// * inserted: 被绑定元素插入父节点时调用（仅保证父节点存在，但不一定已被插入文档中）。
// * update: 所在组件的VNode更新时调用，但是可能发生在其子VNode更新之前。指令的值可能发生了改变，也可能没有。
//           但是你可以通过比较更新前后的值来忽略不必要的模版更新
// * componentUpdated: 指令所在组件的VNode及其子VNode全部更新后调用。
// * unbind: 只调用一次，指令与元素解绑时调用。
//
// 2. 钩子函数参数
//
// 指令钩子函数会被传入一下参数:
// * el: 指令所绑定的元素，可以用来直接操作DOM
// * binding: 一个对象，包含以下属性:
//     ** name: 指令名，不包括 v- 前缀
//     ** value: 指令的绑定值，例如: v-my-directive="1 + 1"，绑定值为2
//     ** oldValue: 指令绑定的前一个值，仅在update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
//     ** expression: 字符串形式的指令表达式。例如 v-my-directive="1 + 1"中，表达式为"1 + 1"。
//     ** arg: 传给指令的参数，可选。例如 v-my-directive.foo 中，参数为"foo"。
//     ** modifiers: 一个包含修饰符的对象。例如: v-my-directive.foo.bar中，修饰符对象为{ foo: true, bar: true}。
//     ** vnode: Vue编译生成的虚拟节点。
//     ** oldVnode: 上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

var on = (function() {
    if(document.addEventListener){
        return function(element, event, handler){
            if(element && event && handler){
                element.addEventListener(event, handler, false)
            }
        }
    }else {
        return function(element, event, handler){
            if(element && event && handler){
                element.attachEvent('on' + event, handler)
            }
        }
    }
})()

function touchstart(e, el) {
    var touches = e.touches[0];
    var tapObj = el.tapObj;
    tapObj.pageX = touches.pageX;
    tapObj.pageY = touches.pageY;
    tapObj.clientX = touches.clientX;
    tapObj.clientY = touches.clientY;
    el.time = +new Date();
}

function touchend(e, el) {
    var touches = e.changedTouches[0];
    var tapObj = el.tapObj;
    el.time = +new Date() - el.time;
    el.endTime = '';
    tapObj.distanceX = tapObj.pageX - touches.pageX;
    tapObj.distanceY = tapObj.pageY - touches.pageY;
    var isLongTap = el.time > 500 && Math.abs(tapObj.distanceX) < 10 && Math.abs(tapObj.distanceY) < 10;
    if(!isLongTap || el.endTime) return
    el.documentHandler(e)
}

module.exports = {
    bind(el, binding, vnode) {
        on(el, 'contextmenu', function(e){
            e.preventDefault()
        })

        on(el, 'touchstart', function(e){
            touchstart(e, el)
        })

        on(el, 'touchend', function(e){
            touchend(e, el)
        })

        el.tapObj = {};
        el.bindingFn = binding.value;
        el.documentHandler = function(e){
            el.bindingFn(el)
        }
    },
    update(el, binding, vnode) {

    },
    unbind(el) {

    }
}
