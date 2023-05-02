// deno-lint-ignore-file no-explicit-any
import { AC } from "../src/运行时/易次元.ts";
declare global {
    let ac: AC;
}

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
if ((globalThis as any).ac === undefined) {
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    (globalThis as any).ac = {
        arr: {
            日期时间: [0, 0, 0, 0, 0],
            黛瑞雅性格属性: [0, 0, 0],
            对话选项结果: [],
            日记记录: [],
            内存: [],
        },
    } as unknown as AC;
}
