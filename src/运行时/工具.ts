import type { 坐标, 坐标元组, 坐标对象, 字符串, 数值, 未知, 永不, 真假, 空白 } from "./全局常量.ts";
import { 否, 是 } from "./全局常量.ts";

export function 坐标转坐标对象(坐标: 坐标元组): 坐标对象 {
    return {
        x: 坐标[0],
        y: 坐标[1],
    };
}

export function 中文坐标对象转坐标对象(坐标: 坐标): 坐标对象 {
    return {
        x: 坐标.横,
        y: 坐标.纵,
    };
}

export function 获取随机数(min: number, max: number) {
    return Math.random() * (max - min + 1) + min;
}

export function 祛缩进(模板字符串: TemplateStringsArray | string, ...模板值: unknown[]): string {
    let 字符串组 = Array.from(typeof 模板字符串 === "string" ? [模板字符串] : 模板字符串);

    // 1. 移除尾部空白。
    字符串组[字符串组.length - 1] = 字符串组[字符串组.length - 1].replace(/\r?\n([\t ]*)$/, "");

    // 2. 找到所有换行符以确定最高公共缩进级别。
    const 各缩进长度 = 字符串组.reduce((结果数组, 字符串) => {
        const 匹配组 = 字符串.match(/\n([\t ]+|(?!\s).)/g);
        if (匹配组) {
            return 结果数组.concat(匹配组.map((匹配) => 匹配.match(/[\t ]/g)?.length ?? 0));
        }
        return 结果数组;
    }, <数值[]> []);

    // 3. 移除所有字符串的公共缩进。
    if (各缩进长度.length) {
        const 匹配模式 = new RegExp(`\n[\t ]{${Math.min(...各缩进长度)}}`, "g");

        字符串组 = 字符串组.map((字符串) => 字符串.replace(匹配模式, "\n"));
    }

    // 4. 移除开头空白。
    字符串组[0] = 字符串组[0].replace(/^\r?\n/, "");

    // 5. 执行插值。
    let 字符串 = 字符串组[0];

    模板值.forEach((值, 索引) => {
        // 5.1 读取当前缩进级别。
        const 各缩进级别插值 = 字符串.match(/(?:^|\n)( *)$/);
        const 缩进级别插值 = 各缩进级别插值 ? 各缩进级别插值[1] : "";
        let 缩进后的值 = 值;
        // 5.2 添加缩进到多行字符串的值上。
        if (typeof 值 === "string" && 值.includes("\n")) {
            缩进后的值 = String(值)
                .split("\n")
                .map((字符串, i) => {
                    return i === 0 ? 字符串 : `${缩进级别插值}${字符串}`;
                })
                .join("\n");
        }

        字符串 += 缩进后的值 + 字符串组[索引 + 1];
    });

    return 字符串;
}


export function 测量字符串(字符串: 字符串, 字号: 数值) {
    const 半角字符 = Array.from(字符串.matchAll(/[ -~]/g));
    const 全角字符 = Array.from(字符串.matchAll(/[\u3000-\u303F\uFF00-\uFFEF\u4E00-\u9FFF]/g));

    const 高度 = 字号;
    const 宽度 = 半角字符.length * 字号 * 0.5 + 全角字符.length * 字号;


    return { 高度, 宽度 };
}

export function 是否是(真假: 真假) {
    return 真假 ? 是 : 否;
}

export function 是坐标(坐标: unknown): 坐标 is 坐标 {
    return (
        typeof 坐标 === "object" &&
        坐标 !== null &&
        "横" in 坐标 &&
        "纵" in 坐标 &&
        typeof 坐标.横 === "number" &&
        typeof 坐标.纵 === "number"
    );
}

/**
 * 创建一个分组元素的数组，
 * 数组的第一个元素包含所有给定数组的第一个元素，
 * 数组的第二个元素包含所有给定数组的第二个元素。
 * ```
 * [a, b, c]
 *           -> [[a, 1], [b, 2], [c, 3]]
 * [1, 2, 3]
 * ```
 */
export function 打包<类型1, 类型2>(数组1: 类型1[], 数组2: 类型2[]): [类型1, 类型2][] {
    const 长度 = Math.min(数组1.length, 数组2.length);
    return Array.from({ length: 长度 }, (_, 索引) => [数组1[索引], 数组2[索引]]);
}

type 对象 = object;
type 键 = 字符串 | 数值;
type 拼接<上层属性 extends 键, 下层属性 extends 键> = `${上层属性}${空白 extends 下层属性 ? 空白 : "."}${下层属性}`;
type 联结<上层属性, 下层属性> = 上层属性 extends 键 ? 下层属性 extends 键 ? 拼接<上层属性, 下层属性> : 永不 : 永不;
type 降低 = [永不, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]];
// FIXME: 属性为数组时, 返回的类型比实际长度多一个
type 路径<嵌套对象, 最大深度 extends 数值 = 3> = [最大深度] extends [永不] ? 永不
    : 嵌套对象 extends 对象 ? {
            [属性 in keyof 嵌套对象]-?: 属性 extends 键 ? `${属性}` | 联结<属性, 路径<嵌套对象[属性], 降低[最大深度]>>
                : 永不;
        }[keyof 嵌套对象]
    : 空白;

type 端点<嵌套对象, 最大深度 extends 数值 = 3> = [最大深度] extends [永不] ? 永不
    : 嵌套对象 extends 对象
        ? { [属性 in keyof 嵌套对象]-?: 联结<属性, 端点<嵌套对象[属性], 降低[最大深度]>> }[keyof 嵌套对象]
    : 空白;

/**
 * 根据给定的对象, 返回包含该对象所有属性路径字符串的数组,
 * 嵌套的深层路径使用"."连接
 * @example
 * ```ts
 * const obj = {
 *     a: 1;
 *     b: { c: 2; d: { e: 3 } };
 *     c: [1, { f: 2 }, 3];
 * };
 *
 * 获取路径(obj) // ["a" ,"b" ,"c" ,"b.c" ,"b.d" ,"b.d.e" ,"c.0" ,"c.1" ,"c.2" ,"c.1.f"]
 * ```
 */
export function 获取路径<类型 extends 对象>(对象: 类型): 路径<类型>[] {
    const 结果: 路径<类型>[] = [];
    const 栈 = [[对象, ""]] as any;
    while (栈.length) {
        const [对象, 路径] = 栈.pop();
        for (const 属性 in 对象) {
            const 值 = 对象[属性];
            if (值 !== null && typeof 值 === "object") {
                栈.push([值, 路径 + 属性 + "."]);
            }
            结果.push((路径 + 属性) as 路径<类型>);
        }
    }
    return 结果;
}

/**
 * 根据给定的对象, 返回包含该对象所有端点属性路径字符串的数组,
 * 嵌套的深层路径使用"."连接
 * @example
 * ```ts
 * const obj = {
 *     a: 1;
 *     b: { c: 2; d: { e: 3 } };
 *     c: [1, { f: 2 }, 3];
 * };
 *
 * 获取端点(obj) // ["a", "b.c", "b.d.e", "c.0", "c.2", "c.1.f"]
 * ```
 */
export function 获取端点<类型 extends 对象>(对象: 类型): 端点<类型>[] {
    const 结果: 端点<类型>[] = [];
    const 栈 = [[对象, ""]] as any;
    while (栈.length) {
        const [对象, 路径] = 栈.pop()!;
        for (const 属性 in 对象) {
            const 值 = 对象[属性];
            if (值 !== null && typeof 值 === "object") {
                栈.push([值, 路径 + 属性 + "."]);
            } else {
                结果.push((路径 + 属性) as 端点<类型>);
            }
        }
    }
    return 结果;
}

type 任意 = any;

/**
 * 使用路径字符串获取嵌套对象的属性值
 */
export function 获取(对象: 未知, 属性路径: 字符串): 未知 {
    return 属性路径.split(".").reduce((嵌套对象, 属性) => (嵌套对象 as 任意)[属性], 对象);
}
