import type { 坐标, 字符串, 数值, 资源标识 } from "../../运行时/全局常量.ts";

export interface 日记页配置 {
    资源标识: () => 资源标识;
    额外图片?: () => { 资源标识: 资源标识 | 字符串; 位置: 坐标 }[];
    辅助阅读内容: () => 字符串;
    回溯至?: { 读档剧情标识: 数值; 重写剧情标识: 数值 };
}

export class 日记页类 {
    #配置: 日记页配置;

    constructor(配置: 日记页配置) {
        this.#配置 = 配置;
    }
}
