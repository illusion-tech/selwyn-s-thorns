// deno-lint-ignore-file no-explicit-any
import { myGlobalThis, 否 } from "../src/运行时/全局常量.ts";
import { AC } from "../src/运行时/易次元.ts";

declare global {
    let ac: AC;
}

if ((globalThis as any).ac === undefined) {
    (globalThis as any).ac = {
        arr: {
            日期时间: [0, 0, 0, 0, 0],
            黛瑞雅性格属性: [0, 0, 0],
            对话选项结果: [],
            日记记录: [],
            内存: [],
        },
        cArr: {
            内存0: [],
        }
    } as unknown as AC;
}
myGlobalThis.是否弹框错误信息 = 否;
