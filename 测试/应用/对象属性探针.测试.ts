import "../测试环境.ts";

import { assertEquals, assertExists } from "jsr:@std/assert";

import { 对象属性探针类 } from "../../src/应用/对象属性探针.ts";

Deno.test("对象属性探针 - 构造", () => {
    const 对象属性探针 = new 对象属性探针类({});
    assertExists(对象属性探针);
});

Deno.test("对象属性探针 - 检测", () => {
    const 对象 = {
        属性1: 1,
        属性2: 2,
        属性3: {
            属性4: 3,
        },
    };

    const 对象属性探针 = new 对象属性探针类(对象);

    对象.属性1 += 4;
    对象.属性2 -= 5;
    对象.属性3.属性4 *= 6;

    const 检测结果 = 对象属性探针.检测();

    assertEquals(检测结果, [
        { 属性: "属性1", 变化: 4, 旧值: 1, 新值: 5 },
        { 属性: "属性2", 变化: -5, 旧值: 2, 新值: -3 },
        { 属性: "属性3.属性4", 变化: 15, 旧值: 3, 新值: 18 },
    ]);
});
