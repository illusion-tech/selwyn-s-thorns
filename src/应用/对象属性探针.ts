import type { 字符串, 数值, 永不, 空白 } from "../运行时/全局常量.ts";
import { 未定义 } from "../运行时/全局常量.ts";
import { 获取, 获取端点 } from "../运行时/工具.ts";

export type 对象属性检测结果 = {
    属性: 字符串;
    变化: 数值;
    旧值: 数值;
    新值: 数值;
};

type 对象 = object;

export class 对象属性探针类<out 检测对象 extends 对象> {
    #检测对象: 检测对象;
    #旧值对象: 检测对象;
    constructor(检测对象: 检测对象) {
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
        const 基准对象 = this.#旧值对象;
        for (const 属性 of 获取端点(检测对象)) {
            const 新值 = 获取(检测对象, 属性);
            const 旧值 = 获取(基准对象, 属性);

            if (新值 === 未定义) continue;
            if (旧值 === 未定义) continue;

            if (typeof 新值 !== "number" || typeof 旧值 !== "number") continue;

            const 变化 = 新值 - 旧值;
            if (变化 === 0) continue;
            结果.push({ 属性, 变化, 旧值, 新值 });
        }
        return 结果;
    }
}
