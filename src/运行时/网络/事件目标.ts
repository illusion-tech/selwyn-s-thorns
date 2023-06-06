import type { 字符串 } from "../全局常量";
import { myGlobalThis } from "../全局常量";

export class 事件目标 {
    #侦听器: { [类型: string]: ((事件: 事件) => void)[] } = {};

    添加事件侦听器(类型: string, 侦听器: (事件: 事件) => void) {
        if (!(类型 in this.#侦听器)) this.#侦听器[类型] = [];

        this.#侦听器[类型].push(侦听器);
    }

    移除事件侦听器(类型: string, 侦听器: (事件: 事件) => void) {
        if (!(类型 in this.#侦听器)) return;

        const 索引 = this.#侦听器[类型].indexOf(侦听器);
        if (索引 !== -1) this.#侦听器[类型].splice(索引, 1);
    }

    触发事件(事件: 事件) {
        事件.目标 = this;
        if (!(事件.类型 in this.#侦听器)) return;

        const 侦听器列表 = this.#侦听器[事件.类型];
        for (const 侦听器 of 侦听器列表) {
            侦听器.call(this, 事件);
        }
    }
}

export class 事件 {
    类型: 字符串;
    目标: 事件目标 | typeof globalThis;

    constructor(类型: 字符串, 事件参数: { 目标?: 事件目标 } = {}) {
        this.类型 = 类型;
        this.目标 = 事件参数.目标 ?? myGlobalThis;
    }
}

export class 自定义事件<T> extends 事件 {
    细节?: T;
    constructor(类型: string, 事件参数: { 目标?: 事件目标; 细节?: T } = {}) {
        super(类型, 事件参数);
        this.细节 = 事件参数.细节;
    }
}
