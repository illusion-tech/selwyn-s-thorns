import "塞尔温荆棘://测试/测试环境.ts";

import { assertExists } from "https://deno.land/std@0.204.0/assert/mod.ts";

import { 时间管理器类 } from "塞尔温荆棘://src/应用/时间管理器.ts";

Deno.test("时间管理器 - 构造", () => {
    const 时间管理器 = new 时间管理器类();

    assertExists(时间管理器);
});