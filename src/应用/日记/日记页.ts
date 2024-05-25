import type { 坐标, 字符串, 数值, 资源标识 } from "../../运行时/全局常量.ts";

export interface 日记页配置 {
    对应编号?: 数值;
    日期: `${数值}-${数值}-${数值}`;
    资源标识: () => 资源标识;
    额外图片?: () => { 资源标识: 资源标识 | 字符串; 位置: 坐标 }[];
    辅助阅读内容: () => 字符串;
    回溯至?: { 读档剧情标识: 数值; 重写剧情标识: 数值 };
}

export class 日记页类 {
    #配置: 日记页配置;
    上一页: 日记页类 | null = null;
    下一页: 日记页类 | null = null;
    get 对应编号() {
        return this.#配置.对应编号;
    }
    get 日期() {
        return this.#配置.日期;
    }

    get 日期对象() {
        return new Date(this.#配置.日期);
    }

    get 资源标识() {
        return this.#配置.资源标识();
    }
    get 额外图片() {
        return (this.#配置.额外图片?.() ?? []) as { 资源标识: 资源标识; 位置: 坐标 }[];
    }
    get 辅助阅读内容() {
        return this.#配置.辅助阅读内容();
    }
    get 回溯至() {
        return this.#配置.回溯至;
    }

    constructor(配置: 日记页配置) {
        if (!配置.日期) throw "日记页配置缺少日期！";
        this.#配置 = 配置;
    }
}
