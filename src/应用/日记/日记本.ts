import { type 月份 } from "../../用户界面/时间管理器.ts";
import { 选项记录器类 } from "../../用户界面/选项记录器.ts";
import { type 数值 } from "../../运行时/全局常量.ts";
import { type 日记册类 } from "./日记册.ts";

export class 日记本类 {
    #选项记录器: 选项记录器类;
    #日记册集: 日记册类[] = [];
    get 首册(): 日记册类 | null {
        return this.#日记册集[0] ?? null;
    }
    get 末册(): 日记册类 | null {
        return this.#日记册集[this.#日记册集.length - 1] ?? null;
    }

    constructor(选项记录器: 选项记录器类) {
        this.#选项记录器 = 选项记录器;
    }

    获取指定年月日记册(年: 数值, 月: 月份) {
        for (const 日记册 of this.获取日记册()) if (日记册.年份 === 年 && 日记册.月份 === 月) return 日记册;
        throw `不存在 ${年} 年 ${月} 月的日记册！`;
    }

    获取日记册() {
        return this.#日记册集;
    }

    装订成本(册集: 日记册类[]) {
        this.#日记册集 = 册集;
        for (const 当前册 of 册集) {
            const 当前册索引 = 册集.indexOf(当前册);
            const 上一册 = 册集[当前册索引 - 1] ?? null;
            const 下一册 = 册集[当前册索引 + 1] ?? null;
            当前册.上一册 = 上一册;
            当前册.下一册 = 下一册;

            if (下一册 && 下一册.首页 && 当前册.末页) {
                当前册.末页.下一页 = 下一册.首页;
                下一册.首页.上一页 = 当前册.末页;
            }
        }
        return this;
    }
}
