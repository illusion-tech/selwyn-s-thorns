export class 事件目标 extends EventTarget {
    添加事件侦听器(类型: string, 侦听器: (事件: Event) => void) {
        this.addEventListener(类型, 侦听器);
    }

    移除事件侦听器(类型: string, 侦听器: (事件: Event) => void) {
        this.removeEventListener(类型, 侦听器);
    }

    触发事件(事件: Event) {
        this.dispatchEvent(事件);
    }
}

export  class 自定义事件<T> extends CustomEvent<T> {
    细节?: T;
    constructor(类型: string, 事件参数: CustomEventInit<T> & { 细节?: T } = {}) {
        事件参数.detail = 事件参数.细节;
        super(类型, 事件参数);
        this.细节 = 事件参数.细节;
    }
}
