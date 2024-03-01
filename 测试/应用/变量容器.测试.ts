import "塞尔温荆棘://测试/测试环境.ts";

import { assertEquals, assertExists, assertThrows } from "https://deno.land/std@0.217.0/assert/mod.ts";
import { 选项记录器类 } from "塞尔温荆棘://src/用户界面/选项记录器.ts";
import { 变量容器类 } from "塞尔温荆棘://src/应用/变量容器.ts";

Deno.test("变量容器", () => {
    const 选项记录器 = new 选项记录器类();
    const 变量容器 = new 变量容器类(选项记录器);

    变量容器.创建数值变量("黛瑞雅.傲慢");
    变量容器.创建数值变量("黛瑞雅.谦逊");
    变量容器.创建数值变量("黛瑞雅.荣誉");
    变量容器.创建数值变量("背包.书籍.魁地奇决赛锦集");
    变量容器.查询变量初始值("黛瑞雅.傲慢");
    变量容器.查询变量初始值("背包.书籍.魁地奇决赛锦集");

    // console.log(变量容器.获取初始变量对象());
    // 变量容器.查询("黛瑞雅");
    // 变量容器.查询("背包");
});

Deno.test("变量容器 - 构造", () => {
    const 选项记录器 = new 选项记录器类();
    const 变量容器 = new 变量容器类(选项记录器);

    assertExists(变量容器);
});

Deno.test("变量容器 - 创建数值变量", () => {
    const 选项记录器 = new 选项记录器类();
    const 变量容器 = new 变量容器类(选项记录器);

    变量容器.创建数值变量("黛瑞雅.傲慢");
    变量容器.创建数值变量("黛瑞雅.谦逊");
    变量容器.创建数值变量("黛瑞雅.荣誉");
    变量容器.创建数值变量("背包.书籍.魁地奇决赛锦集");
});

Deno.test("变量容器 - 创建数值变量 - 重复创建同名变量，须抛错", () => {
    const 选项记录器 = new 选项记录器类();
    const 变量容器 = new 变量容器类(选项记录器);

    变量容器.创建数值变量("黛瑞雅.傲慢");
    assertThrows(() => {
        变量容器.创建数值变量("黛瑞雅.傲慢");
    });
});

Deno.test("变量容器 - 创建选项变量 - 创建的变量路径不能覆盖已有变量", () => {
    const 选项记录器 = new 选项记录器类();
    const 变量容器 = new 变量容器类(选项记录器);

    变量容器.创建数值变量("黛瑞雅.属性");
    assertThrows(() => {
        变量容器.创建数值变量("黛瑞雅.属性.傲慢");
    });
});

Deno.test("变量容器 - 创建选项变量 - 创建的变量不能是已有变量的路径", () => {
    const 选项记录器 = new 选项记录器类();
    const 变量容器 = new 变量容器类(选项记录器);

    变量容器.创建数值变量("黛瑞雅.属性.傲慢");
    assertThrows(() => {
        变量容器.创建数值变量("黛瑞雅.属性");
    });
});

Deno.test("变量容器 - 查询变量初始值 - 未定义的变量，须抛错", () => {
    const 选项记录器 = new 选项记录器类();
    const 变量容器 = new 变量容器类(选项记录器);

    assertThrows(() => {
        变量容器.查询变量初始值("黛瑞雅.傲慢");
    });
});

Deno.test("变量容器 - 查询变量初始值 - 已定义的变量，须返回初始值", () => {
    const 选项记录器 = new 选项记录器类();
    const 变量容器 = new 变量容器类(选项记录器);

    变量容器.创建数值变量("黛瑞雅.傲慢");
    assertEquals(变量容器.查询变量初始值("黛瑞雅.傲慢"), 0);

    变量容器.创建数值变量("黛瑞雅.荣誉", 10);
    assertEquals(变量容器.查询变量初始值("黛瑞雅.荣誉"), 10);
});

Deno.test("变量容器 - 查询变量值 - 未定义的变量，须抛错", () => {
    const 选项记录器 = new 选项记录器类();
    const 变量容器 = new 变量容器类(选项记录器);
    assertThrows(() => {
        变量容器.查询变量值("黛瑞雅.傲慢");
    });
});

Deno.test("变量容器 - 查询变量值 - 已定义的变量，须返回当前值", () => {
    const 选项记录器 = new 选项记录器类();
    const 变量容器 = new 变量容器类(选项记录器);
    变量容器.创建数值变量("黛瑞雅.傲慢");
    变量容器.创建数值变量("黛瑞雅.谦逊", 10);

    assertEquals(变量容器.查询变量值("黛瑞雅.傲慢"), 0);
    assertEquals(变量容器.查询变量值("黛瑞雅.谦逊"), 10);

    选项记录器.定义新记录({
        编号: 0,
        日期: "1992-06-05",
        选项模式: "多选",
        可选项: [
            { 编号: 0, 执行结果: ({ 黛瑞雅 }) => (黛瑞雅.傲慢 += 1) },
            { 编号: 1, 执行结果: ({ 黛瑞雅 }) => (黛瑞雅.谦逊 += 2) },
        ],
    });

    选项记录器.记录([
        { 编号: 0, 选项: 0 },
        { 编号: 0, 选项: 1 },
    ]);

    assertEquals(变量容器.查询变量值("黛瑞雅.傲慢"), 1);
    assertEquals(变量容器.查询变量值("黛瑞雅.谦逊"), 12);
});

Deno.test("变量容器 - 获取初始变量对象 - 获取已经创建变量组成的对象", () => {
    const 选项记录器 = new 选项记录器类();
    const 变量容器 = new 变量容器类(选项记录器);

    变量容器.创建数值变量("黛瑞雅.荣誉", 10);
    变量容器.创建数值变量("黛瑞雅.谦逊");
    变量容器.创建数值变量("黛瑞雅.傲慢");
    变量容器.创建数值变量("背包.书籍.魁地奇决赛锦集");

    const 变量对象 = 变量容器.获取初始变量对象();

    assertEquals(变量对象, {
        黛瑞雅: { 荣誉: 10, 谦逊: 0, 傲慢: 0 },
        背包: { 书籍: { 魁地奇决赛锦集: 0 } },
    });
});

Deno.test("变量容器 - 获取变量对象", () => {
    const 选项记录器 = new 选项记录器类();
    const 变量容器 = new 变量容器类(选项记录器);

    变量容器.创建数值变量("黛瑞雅.荣誉", 10);
    变量容器.创建数值变量("黛瑞雅.谦逊", 8);
    变量容器.创建数值变量("黛瑞雅.傲慢");
    变量容器.创建数值变量("背包.书籍.魁地奇决赛锦集");

    选项记录器.定义新记录({
        编号: 0,
        日期: "1992-06-05",
        描述: "第一次选项",
        选项模式: "单选",
        可选项: [
            { 编号: 0, 执行结果: ({ 黛瑞雅 }) => (黛瑞雅.傲慢 += 1) },
            { 编号: 1, 执行结果: ({ 黛瑞雅 }) => (黛瑞雅.谦逊 += 2) },
        ],
    });

    选项记录器.定义新记录({
        编号: 1,
        日期: "1992-06-05",
        描述: "第二次选项",
        选项模式: "多选",
        可选项: [
            { 编号: 0, 执行结果: ({ 黛瑞雅 }) => (黛瑞雅.荣誉 -= 5) },
            { 编号: 1, 执行结果: ({ 黛瑞雅 }) => (黛瑞雅.傲慢 += 4) },
            { 编号: 2, 执行结果: ({ 黛瑞雅 }) => ((黛瑞雅.谦逊 += 3), (黛瑞雅.荣誉 += 2)) },
            { 编号: 3, 执行结果: ({ 背包 }) => (背包.书籍.魁地奇决赛锦集 += 1) },
        ],
    });

    选项记录器.记录([
        { 编号: 0, 选项: 1 }, //          谦逊  8 >-- +2 --> 10
        { 编号: 1, 选项: 0 }, //          荣誉 10 >-- -5 -->  5
        { 编号: 1, 选项: 1 }, //          傲慢  0 >-- +4 -->  4
        { 编号: 1, 选项: 2 }, //          谦逊 10 >-- +3 --> 13, 荣誉  5 >-- +2 -->  7
        { 编号: 1, 选项: 3 }, // 魁地奇决赛锦集 0 >-- +1 -->  1
    ]);

    const 变量对象 = 变量容器.获取变量对象();

    console.log(变量对象);

    assertEquals(变量对象, {
        黛瑞雅: { 荣誉: 7, 谦逊: 13, 傲慢: 4 },
        背包: { 书籍: { 魁地奇决赛锦集: 1 } },
    });
});
