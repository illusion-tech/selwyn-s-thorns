import "塞尔温荆棘://测试/测试环境.ts";

import { assertEquals, assertExists, assertThrows } from "https://deno.land/std/testing/asserts.ts";

import { 信件管理器类 } from "塞尔温荆棘://src/应用/信件管理器.ts";

Deno.test("信件管理器 - 构造", () => {
    const 信件管理器 = new 信件管理器类();

    assertExists(信件管理器);
});