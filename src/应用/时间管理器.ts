import type { 数值 } from "../运行时/全局常量.ts";
import { 变量 } from "../运行时/易次元.ts";

export type 月份 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export class 时间管理器类 {
    get #日期时间() {
        // 1_1991_0605_1200;

        const 数值 = 变量.内存[999];
        if (数值 < 1_0000_0000_000) throw new Error(`内存 #999 的值 ${数值} 过小不是一个有效的日期时间数值`);
        if (数值 > 1_9999_1231_2359) throw new Error(`内存 #999 的值 ${数值} 过大不是一个有效的日期时间数值`);

        const 日期字符串 = 数值.toString().substring(1);
        const 结果 = [] as 数值[];

        结果.push(parseInt(日期字符串.substring(0, 4))); // 年
        结果.push(parseInt(日期字符串.substring(4, 6))); // 月
        结果.push(parseInt(日期字符串.substring(6, 8))); // 日
        结果.push(parseInt(日期字符串.substring(8, 10))); // 时
        结果.push(parseInt(日期字符串.substring(10, 12))); // 分

        return 结果 as [年: 数值, 月: 数值, 日: 数值, 时: 数值, 分: 数值];
    }
    get 现在是上午() {
        return this.#日期时间[3] < 12;
    }

    get 现在是下午() {
        return this.#日期时间[3] >= 12 && this.#日期时间[3] < 18;
    }

    get 现在是晚上() {
        return this.#日期时间[3] >= 18;
    }

    get 现在是凌晨() {
        return this.#日期时间[3] < 6;
    }

    get 现在是白天() {
        return this.#日期时间[3] >= 6 && this.#日期时间[3] < 18;
    }

    get 现在是黑夜() {
        return this.#日期时间[3] < 6 || this.#日期时间[3] >= 18;
    }

    设置日期(年: 数值, 月: 数值, 日: 数值) {
        if (年 < 1) throw new Error(`年份 ${年} 过小不是一个有效的年份`);
        if (年 > 9999) throw new Error(`年份 ${年} 过大不是一个有效的年份`);
        if (月 < 1) throw new Error(`月份 ${月} 过小不是一个有效的月份`);
        if (月 > 12) throw new Error(`月份 ${月} 过大不是一个有效的月份`);
        if (日 < 1) throw new Error(`日期 ${日} 过小不是一个有效的日期`);
        if (日 > 31) throw new Error(`日期 ${日} 过大不是一个有效的日期`);

        const 年字符串 = 年.toString().padStart(4, "0");
        const 月字符串 = 月.toString().padStart(2, "0");
        const 日字符串 = 日.toString().padStart(2, "0");
        const 时字符串 = this.#日期时间[3].toString().padStart(2, "0");
        const 分字符串 = this.#日期时间[4].toString().padStart(2, "0");

        const 日期字符串 = `1${年字符串}${月字符串}${日字符串}${时字符串}${分字符串}`;

        变量.内存[999] = parseInt(日期字符串);
    }

    设置时间(时: 数值, 分: 数值) {
        if (时 < 0) throw new Error(`时 ${时} 过小不是一个有效的时`);
        if (时 > 23) throw new Error(`时 ${时} 过大不是一个有效的时`);
        if (分 < 0) throw new Error(`分 ${分} 过小不是一个有效的分`);
        if (分 > 59) throw new Error(`分 ${分} 过大不是一个有效的分`);

        const 年字符串 = this.#日期时间[0].toString().padStart(4, "0");
        const 月字符串 = this.#日期时间[1].toString().padStart(2, "0");
        const 日字符串 = this.#日期时间[2].toString().padStart(2, "0");
        const 时字符串 = 时.toString().padStart(2, "0");
        const 分字符串 = 分.toString().padStart(2, "0");

        const 日期字符串 = `1${年字符串}${月字符串}${日字符串}${时字符串}${分字符串}`;

        变量.内存[999] = parseInt(日期字符串);
    }

    获取当前时间() {
        return this.#日期时间;
    }

    获取当前年份(): 数值 {
        return this.#日期时间[0];
    }

    获取当前月份(): 月份 {
        const 月份 = this.#日期时间[1];
        if (月份 < 1) return 1;
        if (月份 > 12) return 12;
        return 月份 as 月份;
    }

    /**
     * @备注 返回的示例字符串 '1991-06-05'
     */
    获取当前日期字符串() {
        const 年 = this.#日期时间[0].toString().padStart(4, "0");
        const 月 = this.#日期时间[1].toString().padStart(2, "0");
        const 日 = this.#日期时间[2].toString().padStart(2, "0");
        return `${年}-${月}-${日}` as `${数值}-${数值}-${数值}`;
    }
}

export type 日期字符串 = `${数值}年${数值}月${数值}日`;

export function 设置当前日期(日期字符串: 日期字符串, 时间管理器: 时间管理器类) {
    const 正则模式 = /(\d{4})年(\d{1,2})月(\d{1,2})日/g;
    const 匹配结果 = 正则模式.exec(日期字符串);
    if (匹配结果) {
        const 年 = parseInt(匹配结果[1]);
        const 月 = parseInt(匹配结果[2]);
        const 日 = parseInt(匹配结果[3]);
        时间管理器.设置日期(年, 月, 日);
    }
}
