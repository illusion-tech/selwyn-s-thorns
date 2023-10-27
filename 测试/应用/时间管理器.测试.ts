import "塞尔温荆棘://测试/测试环境.ts";

import { assertEquals, assertExists } from "https://deno.land/std@0.204.0/assert/mod.ts";

import { 时间管理器类 } from "塞尔温荆棘://src/应用/时间管理器.ts";

Deno.test("时间管理器 - 构造", () => {
    const 时间管理器 = new 时间管理器类();

    assertExists(时间管理器);
});

Deno.test("时间管理器 - 获取当前时间", () => {
    const 时间管理器 = new 时间管理器类();
    const 当前时间 = 时间管理器.获取当前时间();

    assertExists(当前时间);
});

Deno.test("时间管理器 - 设置日期", () => {
    const 时间管理器 = new 时间管理器类();
    时间管理器.设置日期(1992, 7, 10);

    const 当前时间 = 时间管理器.获取当前时间();

    assertEquals(当前时间[0], 1992);
    assertEquals(当前时间[1], 7);
    assertEquals(当前时间[2], 10);
});

Deno.test("时间管理器 - 设置时间", () => {
    const 时间管理器 = new 时间管理器类();
    时间管理器.设置时间(13, 30);

    const 当前时间 = 时间管理器.获取当前时间();

    assertEquals(当前时间[3], 13);
    assertEquals(当前时间[4], 30);
});
