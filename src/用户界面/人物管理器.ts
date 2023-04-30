import { 变量 } from "../运行时/易次元";

type 属性探针检测结果 = {
    属性: 字符串;
    变化: 数值;
    旧值: 数值;
    新值: 数值;
};

class 属性探针类 {
    #检测对象;
    #旧值对象: { [属性: 字符串]: 数值 };
    constructor(检测对象: { [属性: 字符串]: 数值 }, 属性集: 字符串[]) {
        this.#检测对象 = 检测对象;
        this.#旧值对象 = {};
        for (const 属性 of 属性集) {
            this.#旧值对象[属性] = 检测对象[属性];
        }
    }

    检测(): 属性探针检测结果[] {
        const 属性探测结果 = [];

        for (const 属性 in this.#旧值对象) {
            const 旧值 = this.#旧值对象[属性];
            const 新值 = this.#检测对象[属性];
            const 变化 = 新值 - 旧值;
            if (变化) {
                属性探测结果.push({ 属性, 变化, 旧值, 新值 } as const);
            }
        }
        console.log({ 属性探测结果 });
        return 属性探测结果;
    }
}

abstract class 人物类 {
    abstract 获取属性探针(): 属性探针类;
}

class 黛瑞雅类 extends 人物类 {
    get 谦逊() {
        return 变量.黛瑞雅性格属性[0];
    }
    set 谦逊(数值) {
        变量.黛瑞雅性格属性[0] = 数值;
    }
    get 傲慢() {
        return 变量.黛瑞雅性格属性[1];
    }
    set 傲慢(数值) {
        变量.黛瑞雅性格属性[1] = 数值;
    }
    get 荣誉() {
        return 变量.黛瑞雅性格属性[2];
    }
    set 荣誉(数值) {
        变量.黛瑞雅性格属性[2] = 数值;
    }
    get 是傲慢性格() {
        return this.傲慢 >= this.谦逊;
    }
    get 是强傲慢性格() {
        return this.傲慢 - this.谦逊 >= 10;
    }
    get 是谦逊性格() {
        return this.谦逊 > this.傲慢;
    }
    get 是强谦逊性格() {
        return this.谦逊 - this.傲慢 >= 10;
    }
    get 没有强性格偏向() {
        return Math.abs(this.傲慢 - this.谦逊) < 10;
    }
    获取属性探针(): 属性探针类 {
        return new 属性探针类(this as {}, ["谦逊", "傲慢", "荣誉"]);
    }
}

export class 人物管理器类 {
    黛瑞雅 = new 黛瑞雅类();
}
