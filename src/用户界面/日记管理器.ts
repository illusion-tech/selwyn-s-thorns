import { 时间管理器类 } from "./时间管理器.js";

class 日记类 {
    #时间管理器: 时间管理器类;
    constructor(时间管理器: 时间管理器类) {
        this.#时间管理器 = 时间管理器;
    }

    查看() {
        console.log(this.#时间管理器.获取当前时间());
    }
}

export class 日记管理器类 {
    #时间管理器: 时间管理器类;
    constructor(时间管理器: 时间管理器类) {
        this.#时间管理器 = 时间管理器;
    }

    获取日记() {
        return new 日记类(this.#时间管理器);
    }
}
