import "../测试环境.ts";

import { assertExists } from "jsr:@std/assert";

import { 立绘人物管理器类 } from "../../src/用户界面/立绘人物管理器.ts";

Deno.test("立绘人物管理器", () => {
    const 立绘人物管理器 = new 立绘人物管理器类();

    assertExists(立绘人物管理器);
});

Deno.test("立绘人物管理器 - 创建风格切换立绘", () => {
    const 立绘人物管理器 = new 立绘人物管理器类();

    const 立绘 = 立绘人物管理器.创建风格切换立绘(
        {
            立绘风格: ["电影", "原创"],
            获取风格函数: () => 0,
            设置风格函数: () => {},
        },
        {
            立绘1: ["$0000", "$0000"],
            立绘2: ["$0000", "$0000"],
        },
    );

    assertExists(立绘);
});
