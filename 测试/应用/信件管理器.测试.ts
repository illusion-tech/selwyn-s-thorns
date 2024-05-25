import "../测试环境.ts";

import { assertExists } from "jsr:@std/assert";

import { 信件管理器类 } from "../../src/应用/信件管理器.ts";

Deno.test("信件管理器 - 构造", () => {
    const 信件管理器 = new 信件管理器类();

    信件管理器.创建信件({
        编号: 0,
        主题: "测试信件",
        寄件人: "测试寄件人",
        收件人: "测试收件人",
    });
});

Deno.test("信件管理器 - 构造", () => {
    const 信件管理器 = new 信件管理器类();

    assertExists(信件管理器);
});
