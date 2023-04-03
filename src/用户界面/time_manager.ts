export class 时间管理器类 {
    #日期时间: Uint32Array = new Uint32Array([1991, 6, 5, 12, 0]);

    public 设置日期(年: number, 月: number, 日: number) {
        this.#日期时间[0] = 年;
        this.#日期时间[1] = 月;
        this.#日期时间[2] = 日;
    }

    public 设置时间(时: number, 分: number) {
        this.#日期时间[3] = 时;
        this.#日期时间[4] = 分;
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
}
