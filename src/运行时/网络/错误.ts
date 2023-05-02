import type { 字符串 } from "../../全局常量.ts";
import { myGlobalThis, 是 } from "../../全局常量.ts";

export class 错误 extends Error {
    constructor(消息: 字符串) {
        super(消息);
        if (myGlobalThis.是否弹框错误信息 === 是) alert(消息);
    }
}
