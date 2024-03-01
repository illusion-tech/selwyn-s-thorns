import "塞尔温荆棘://测试/测试环境.ts";

import { assertEquals, assertExists, assertThrows } from "https://deno.land/std@0.217.0/assert/mod.ts";

import { 书房菜单类 } from "塞尔温荆棘://src/用户界面/书房菜单.ts";
import { 是,未解锁 } from "塞尔温荆棘://src/运行时/全局常量.ts";

Deno.test("书房菜单", () => {
    const 菜单 = new 书房菜单类();
    assertExists(菜单);
});

Deno.test("书房菜单 - 配置", () => {
    const 菜单 = new 书房菜单类();
    菜单.配置([
        {
            名称: "第零章",
            资源标识: "$51378321",
            位置: { 横: 930, 纵: 410 },
            文本框: {
                文本: `        在这栋无人庄园里我找到了一间书房，女孩儿的日记被摆在宽大的榆木书桌正中央。它的封皮似乎曾被多次仔细地擦试过，保存它的人一定对它爱护有加。
                奇怪，房主人去哪儿了？`,
                位置: { 横: 1015, 纵: 342 },
                大小: { 宽: 314, 高: 242 },
            },
            从头书写按钮: {
                起始剧情编号: 3311088,
                起始日期时间: "1991-06-05 01:00:00",
            },
            是否显示: 是,
        },
        {
            名称: "第一章",
            资源标识: "$51378323",
            位置: { 横: 930, 纵: 410 },
            文本框: {
                文本: `        在这栋无人庄园里我找到了一间书房，女孩儿的日记被摆在宽大的榆木书桌正中央。它的封皮似乎曾被多次仔细地擦试过，保存它的人一定对它爱护有加。
                奇怪，房主人去哪儿了？`,
                位置: { 横: 1015, 纵: 342 },
                大小: { 宽: 314, 高: 242 },
            },
            从头书写按钮: {
                起始剧情编号: 4444748,
                起始日期时间: "1991-08-31 00:01:00",
            },
            是否显示: () => true,
        },
        {
            名称: "未解锁",
            资源标识: "$51378320",
            位置: { 横: 1014, 纵: 382 },
            文本框: {
                文本: `    日记后面的内容被一大块墨迹挡住了，看不清……`,
                位置: { 横: 1015, 纵: 397 },
                大小: { 宽: 314, 高: 96 },
            },
            从头书写按钮: 未解锁,
            是否显示: 是,
        },
    ]);
});
