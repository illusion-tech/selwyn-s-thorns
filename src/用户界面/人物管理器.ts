import { 对象属性探针类 } from "../应用/对象属性探针.ts";
import { 变量 } from "../运行时/易次元.ts";

abstract class 人物类 {
    abstract 获取属性探针(): 对象属性探针类;
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
    获取属性探针(): 对象属性探针类 {
        return new 对象属性探针类(this as {}, ["谦逊", "傲慢", "荣誉"]);
    }
}

export class 人物管理器类 {
    黛瑞雅 = new 黛瑞雅类();
}
