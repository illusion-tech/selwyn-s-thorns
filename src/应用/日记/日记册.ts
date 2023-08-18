import type { 月份 } from "../../用户界面/时间管理器.ts";
import type { 坐标, 数值, 资源标识 } from "../../运行时/全局常量.ts";
import { 空白 } from "../../运行时/全局常量.ts";
import type { 日记页类 } from "./日记页.ts";

interface 贴纸配置 {
    资源标识: 资源标识;
    位置: 坐标;
    对应编号?: 数值;
    对应装订页: 日记页类;
}

export interface 成册配置 {
    对应年月: { 年: 数值; 月: 月份 };
    资源标识: 资源标识;
    贴纸配置: 贴纸配置[];
}

export class 日记册类 {
    #日记页集: 日记页类[] = [];
    #对应年月: { 年: 数值; 月: 月份 };
    #资源标识: 资源标识;
    #贴纸配置: 贴纸配置[];
    上一册: 日记册类 | 空白 = 空白;
    下一册: 日记册类 | 空白 = 空白;
    get 首页() {
        return this.#日记页集[0];
    }
    get 末页() {
        return this.#日记页集[this.#日记页集.length - 1];
    }
    get 年份() {
        return this.#对应年月.年;
    }
    get 月份() {
        return this.#对应年月.月;
    }
    get 资源标识() {
        return this.#资源标识;
    }

    *获取贴纸配置() {
        for (const 贴纸配置 of this.#贴纸配置) {
            yield 贴纸配置;
        }
    }

    *获取日记页() {
        for (const 日记页 of this.#日记页集) {
            yield 日记页;
        }
    }

    constructor(成册配置: 成册配置, ...页集: 日记页类[]) {
        this.#对应年月 = 成册配置.对应年月;
        this.#资源标识 = 成册配置.资源标识;
        this.#贴纸配置 = 成册配置.贴纸配置;
        this.#日记页集 = 页集;
    }
}
