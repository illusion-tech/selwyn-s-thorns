import type { 字符串, 数值 } from "../运行时/全局常量.ts";
import { 未定义 } from "../运行时/全局常量.ts";

type 对象属性检测结果 = {
    属性: 字符串;
    变化: 数值;
    旧值: 数值;
    新值: 数值;
};

export class 对象属性探针类<类型> {
    #检测对象: 类型;
    #旧值对象: 类型;
    constructor(检测对象: 类型) {
        this.#检测对象 = 检测对象;
        this.#旧值对象 = globalThis.structuredClone !== 未定义
            ? globalThis.structuredClone(检测对象)
            : JSON.parse(JSON.stringify(检测对象));
    }

    /**
     * 检测对比对象的属性变化, 忽略非数值属性, 深层嵌套属性使用"."连接
     * @returns 返回对象属性检测结果的数组
     */
    检测(): 对象属性检测结果[] {
        const 结果: 对象属性检测结果[] = [];
        const 检测对象 = this.#检测对象;
        const 旧值对象 = this.#旧值对象;
        const 检测对象属性 = Object.getOwnPropertyNames(检测对象);
        for (const 属性 of 检测对象属性) {
            const 检测对象属性值 = 检测对象[属性];
            const 旧值对象属性值 = 旧值对象[属性];
            if (typeof 检测对象属性值 === "number" && typeof 旧值对象属性值 === "number") {
                const 变化 = 检测对象属性值 - 旧值对象属性值;
                if (变化 !== 0) {
                    结果.push({
                        属性,
                        变化,
                        旧值: 旧值对象属性值,
                        新值: 检测对象属性值,
                    });
                }
            } else if (typeof 检测对象属性值 === "object" && typeof 旧值对象属性值 === "object") {
                const 深层属性检测结果 = this.#检测深层属性(属性, 检测对象属性值, 旧值对象属性值);
                结果.push(...深层属性检测结果);
            }
        }
        return 结果;

    }
}
