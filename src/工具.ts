import type { 坐标, 坐标元组, 坐标对象, 字符串, 数值, 真假 } from "./运行时/全局常量.ts";
import { 否, 是 } from "./运行时/全局常量.ts";

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

const 环境 = new OffscreenCanvas(1, 1).getContext("2d") ?? globalThis.document.createElement("canvas").getContext("2d");
export function 测量字符串(字符串: 字符串, 字体 = "") {
    if (!环境) throw alert("无法创建字符串测量环境");
    环境.font = 字体;
    const 结果 = 环境.measureText(字符串);
    return {
        宽度: 结果.width,
        字体高度: 结果.fontBoundingBoxAscent + 结果.fontBoundingBoxDescent,
        字体边界盒上沿到基线距离: 结果.fontBoundingBoxAscent,
        字体边界盒下沿到基线距离: 结果.fontBoundingBoxDescent,
        实际边界盒上沿到基线距离: 结果.actualBoundingBoxAscent,
        实际边界盒下沿到基线距离: 结果.actualBoundingBoxDescent,
        实际边界盒左沿到对齐点距离: 结果.actualBoundingBoxLeft,
        实际边界盒右沿到对齐点距离: 结果.actualBoundingBoxRight,
        实际宽度: 结果.actualBoundingBoxLeft + 结果.actualBoundingBoxRight,
        实际高度: 结果.actualBoundingBoxAscent + 结果.actualBoundingBoxDescent,
    };
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
