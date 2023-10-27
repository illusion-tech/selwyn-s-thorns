// deno-lint-ignore-file no-explicit-any
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
        },
        cVar: {
            内存索引: 0,
        },
        cArr: {
            内存0: new Array(1000).fill(0),
            内存1: new Array(1000).fill(0),
        },
        async createLayer() {},
        async createOption() {},
        async createImage() {},
    } as unknown as AC;

    ac.cArr.内存0[999] = 1_1991_0605_1200;
    ac.cArr.内存1[999] = 1_1991_0605_1200;
}
