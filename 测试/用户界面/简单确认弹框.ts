import "塞尔温荆棘://测试/测试环境.ts";

import { assertEquals, assertExists, assertThrows } from "https://deno.land/std@0.190.0/testing/asserts.ts";
import { 简单确认弹框类 } from "塞尔温荆棘://src/用户界面/简单确认弹框.ts";

Deno.test("简单确认弹框类", () => {
    const 弹框 = new 简单确认弹框类();

    assertExists(弹框);
});
