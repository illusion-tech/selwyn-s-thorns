export class 时间管理器类 {
    #日期时间: Uint32Array = new Uint32Array([1991, 6, 5, 12, 0]);

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

    设置日期(年: number, 月: number, 日: number) {
        this.#日期时间[0] = 年;
        this.#日期时间[1] = 月;
        this.#日期时间[2] = 日;
    }

    设置时间(时: number, 分: number) {
        this.#日期时间[3] = 时;
        this.#日期时间[4] = 分;
    }

    获取当前时间() {
        return this.#日期时间;
    }

    获取当前月份(): 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 {
        const 月份 = this.#日期时间[1];
        if (月份 < 1) return 1;
        if (月份 > 12) return 12;
        return 月份 as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    }

    获取当前日期字符串(): 字符串 {
        return Array.from(this.#日期时间.subarray(0, 3))
            .map((数值) => 数值.toString().padStart(2, "0"))
            .join("-");
    }
}

export type 日期字符串 = `${number}年${number}月${number}日`;

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
