import "塞尔温荆棘://测试/测试环境.ts";

import { assertEquals, assertExists, assertThrows } from "https://deno.land/std@0.210.0/assert/mod.ts";

import { 简单确认弹框类 } from "塞尔温荆棘://src/用户界面/简单确认弹框.ts";

Deno.test("简单确认弹框", () => {
    const 弹框 = new 简单确认弹框类({
        资源标识: "$0000",
        确认按钮: {
            资源标识: "$0000",
            位置: { 横: 0, 纵: 0 },
        },
        取消按钮: {
            资源标识: "$0000",
            位置: { 横: 0, 纵: 0 },
        },
    });

    assertExists(弹框);
});

Deno.test("简单确认弹框 - 显示", async () => {

    const 弹框 = new 简单确认弹框类({
        资源标识: "$0000",
        确认按钮: {
            资源标识: "$0000",
            位置: { 横: 0, 纵: 0 },
        },
        取消按钮: {
            资源标识: "$0000",
            位置: { 横: 0, 纵: 0 },
        },
    });

    await 弹框.显示();
});
