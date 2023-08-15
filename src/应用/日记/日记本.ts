import { 选项记录器类 } from "../../用户界面/选项记录器.ts";
import type { 任意, 字符串, 数值, 是否 } from "../../运行时/全局常量.ts";
import type { 日记册类 } from "./日记册.ts";

interface 段落 {
    自动书写: 是否;
    文字内容: () => 字符串;
}

export class 日记本类 {
    #选项记录器: 选项记录器类;
    #日记册集: 日记册类[] = [];

    constructor(选项记录器: 选项记录器类) {
        this.#选项记录器 = 选项记录器;
    }

    装订成本(...册集: 日记册类[]) {
        this.#日记册集 = 册集;
    }

}
