import type { 坐标, 字符串, 数值, 无, 是否, 未知, 资源标识 } from "../运行时/全局常量.ts";
import { 否, 已选择, 是, 最大填充, 未定义, 水平对齐方式, 空白, 被污损 } from "../运行时/全局常量.ts";
import { 是否是, 是坐标, 测量字符串 } from "../运行时/工具.ts";
import { 常量, 接口 } from "../运行时/易次元.ts";
import { 事件目标, 自定义事件 } from "../运行时/网络/事件目标.ts";
import { 承诺 } from "../运行时/网络/承诺.ts";
import { 错误 } from "../运行时/网络/错误.ts";
import { 时间管理器类 } from "./时间管理器.ts";
import { 辅助阅读器类 } from "./辅助阅读器.ts";
import { 选项记录器类 } from "./选项记录器.ts";

type 静态段落 = {
    自动书写: 是否;
    文字内容: 字符串;
};

type 动态段落<in out 类型> = {
    自动书写: 是否;
    判断条件: () => 类型;
    文字内容: (参数: 类型) => 字符串;
    日记页文字资源标识: (参数: 类型) => 资源标识 | 空白;
    日记页文字位置: 坐标 | ((参数: 类型) => 坐标 | 未定义);
};

type 段落<类型> = 静态段落 | 动态段落<类型>;

interface 日记配置<in out 类型 extends 未知[]> {
    记录编号?: 数值;
    日期: 字符串 | 被污损;
    是否自动记录: 是否;
    是否可回溯: 是否;
    回溯至剧情标识?: 数值;
    概要页资源标识: 资源标识;
    概要页辅助阅读内容: 字符串;
    书写背景图资源标识: 资源标识;
    日记页资源标识: 资源标识;
    日记页辅助阅读按钮位置?: 坐标;
    日记页回溯当日按钮位置?: 坐标;
    日记页辅助阅读内容?: 字符串;
    日记段落?: [...{ [属性 in keyof 类型]: 段落<类型[属性]> }];
    日记本贴纸资源标识?: 资源标识;
}

enum 记录状态 {
    未记录 = 0,
    已记录 = 1,
}

class 日记页类 {
    // deno-fmt-ignore: 特定布局数组不需要格式化
    static #贴纸位置: { [日期: 字符串]: 坐标 | 未定义 } = {
                                                                                                                    "1991-06-05": { 横: 826, 纵: 315 }, "1991-06-06": { 横: 878, 纵: 315 }, "1991-06-07": { 横: 925, 纵: 315 }, "1991-06-08": { 横: 980, 纵: 322 },
        "1991-06-09": { 横: 685, 纵: 265 }, "1991-06-10": { 横: 732, 纵: 269 }, "1991-06-11": { 横: 775, 纵: 267 }, "1991-06-12": { 横: 825, 纵: 267 }, "1991-06-13": { 横: 881, 纵: 269 }, "1991-06-14": { 横: 927, 纵: 267 }, "1991-06-15": { 横: 982, 纵: 273 },
        "1991-06-16": { 横: 687, 纵: 219 }, "1991-06-17": { 横: 729, 纵: 220 }, "1991-06-18": { 横: 775, 纵: 221 }, "1991-06-19": { 横: 833, 纵: 219 }, "1991-06-20": { 横: 879, 纵: 224 }, "1991-06-21": { 横: 933, 纵: 218 }, "1991-06-22": { 横: 990, 纵: 220 },
        "1991-06-23": { 横: 685, 纵: 173 }, "1991-06-24": { 横: 732, 纵: 174 }, "1991-06-25": { 横: 783, 纵: 178 }, "1991-06-26": { 横: 833, 纵: 176 }, "1991-06-27": { 横: 879, 纵: 173 }, "1991-06-28": { 横: 933, 纵: 173 }, "1991-06-29": { 横: 990, 纵: 173 },
        "1991-06-30": { 横: 685, 纵: 127 },
    };

    #选项记录器: 选项记录器类;
    #日记配置: 日记配置<未知[]>;

    上一页: 日记页类 | 空白 = 空白;
    下一页: 日记页类 | 空白 = 空白;

    get 是否可回溯() {
        return this.#日记配置.是否可回溯;
    }

    get 记录状态() {
        if (this.#日记配置.是否自动记录 === 是) return 记录状态.已记录;
        if (this.#日记配置.记录编号 === 未定义) return 记录状态.未记录;
        return this.#选项记录器.查询({ 编号: this.#日记配置.记录编号, 选项: 1 }) === 已选择
            ? 记录状态.已记录
            : 记录状态.未记录;
    }

    get 概要页资源标识() {
        return this.#日记配置.概要页资源标识;
    }

    get 内容页资源标识() {
        return this.#日记配置.日记页资源标识;
    }

    get 概要页辅助阅读内容() {
        return this.#日记配置.概要页辅助阅读内容;
    }

    get 内容页辅助阅读按钮位置() {
        return this.#日记配置.日记页辅助阅读按钮位置 ?? 未定义;
    }

    get 内容页回溯当日按钮位置() {
        return this.#日记配置.日记页回溯当日按钮位置 ?? 未定义;
    }

    get 内容页动态段落() {
        const 结果 = [];

        for (const 段落 of this.#日记配置.日记段落 ?? []) {
            if ("判断条件" in 段落) {
                const 条件 = 段落.判断条件();
                const 文字内容 = 段落.文字内容(条件);
                const 文字资源 = 段落.日记页文字资源标识(条件);
                const 文字位置 = 是坐标(段落.日记页文字位置) ? 段落.日记页文字位置 : 段落.日记页文字位置(条件);
                if (文字位置 === 未定义 || 文字资源 === 空白) continue;
                结果.push({ 文字内容, 文字资源, 文字位置 });
            }
        }

        return 结果;
    }

    get 内容页辅助阅读内容() {
        if (this.#日记配置.日记页辅助阅读内容) {
            return this.#日记配置.日记页辅助阅读内容;
        } else {
            const 日记段落 = this.#日记配置.日记段落 ?? [];
            return 日记段落
                .map((段落) => ("判断条件" in 段落 ? 段落.文字内容(段落.判断条件()) : 段落.文字内容))
                .join("\n\n");
        }
    }

    get 日期() {
        return this.#日记配置.日期;
    }

    get 贴纸资源标识() {
        return this.#日记配置.日记本贴纸资源标识;
    }

    get 贴纸位置() {
        return this.日期 === 被污损 ? 未定义 : 日记页类.#贴纸位置[this.日期];
    }

    constructor(日记配置: 日记配置<未知[]>, 选项记录器: 选项记录器类) {
        this.#日记配置 = 日记配置;
        this.#选项记录器 = 选项记录器;
    }

    回溯当日() {
        const 剧情标识 = this.#日记配置.回溯至剧情标识;
        if (剧情标识 === 未定义) return;
        接口.跳转剧情(剧情标识, { 切换效果: 常量.切换效果.白色闪光切换, 时长: 5000 });
    }
}

export class 日记管理器类 extends 事件目标 {
    #时间管理器: 时间管理器类;
    #选项记录器: 选项记录器类;

    #日记月份资源: 资源标识[] = [
        /**   一月 **/ "$53397788", // resId: $53397788
        /**   二月 **/ "$53397789", // resId: $53397789
        /**   三月 **/ "$53397790", // resId: $53397790
        /**   四月 **/ "$53397791", // resId: $53397791
        /**   五月 **/ "$53397792", // resId: $53397792
        /**   六月 **/ "$52524457", // resId: $52524457
        /**   七月 **/ "$53397793", // resId: $53397793
        /**   八月 **/ "$53397794", // resId: $53397794
        /**   九月 **/ "$53397795", // resId: $53397795
        /**   十月 **/ "$53397796", // resId: $53397796
        /** 十一月 **/ "$53397797", // resId: $53397797
        /** 十二月 **/ "$53397798", // resId: $53397798
    ];

    #日记配置集 = new Map<字符串 | 被污损, 日记配置<未知[]>>();

    #获取截至今日记录的日记页(入口日期 = "9999-12-31"): 日记页类 {
        const 日期序列 = Array.from(this.#日记配置集.keys())
            .sort((上一个日期, 下一个日期) => {
                if (上一个日期 === 被污损) return -1;
                if (下一个日期 === 被污损) return 1;
                if (上一个日期 < 下一个日期) return -1;
                if (上一个日期 > 下一个日期) return 1;
                return 0;
            })
            .splice(1) as 字符串[];

        const 当前日期 = this.#时间管理器.获取当前日期字符串();
        const 索引 = 日期序列.findIndex((日期) => 日期 > 当前日期);

        日期序列.splice(索引 === -1 ? 日期序列.length : 索引);

        const 污损页 = new 日记页类(this.#日记配置集.get(被污损) as 日记配置<未知[]>, this.#选项记录器);
        let 上一页 = 污损页;
        let 返回页 = 污损页;

        for (const 日期 of 日期序列) {
            const 日记配置 = this.#日记配置集.get(日期);
            if (!日记配置) throw alert(`日记配置不存在: ${日期}`);
            const 当前页 = new 日记页类(日记配置, this.#选项记录器);

            if (当前页.记录状态 === 记录状态.未记录) continue;

            上一页.下一页 = 当前页;
            当前页.上一页 = 上一页;
            上一页 = 当前页;

            if (日期 <= 入口日期) 返回页 = 当前页;
        }

        return 返回页;
    }

    async #翻阅日记内容(日记页: 日记页类) {
        await 接口.创建图层("日记内容_图层", {
            层级索引: 180,
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
            裁剪模式: 是,
            裁剪区域: { 宽: 1280, 高: 720 },
            是否可见: 否,
        });

        await 接口.创建图片("日记内容_背景", {
            所属图层: "日记内容_图层",
            资源标识: 日记页.内容页资源标识,
        });

        let 索引 = 1;
        for (const 段落 of 日记页.内容页动态段落) {
            await 接口.创建图片(`日记内容_段落${索引++}`, {
                所属图层: "日记内容_图层",
                资源标识: 段落.文字资源,
                位置: 段落.文字位置,
            });
        }

        if (日记页.内容页辅助阅读按钮位置) {
            await 接口.创建选项("日记内容_辅助阅读按钮", {
                所属图层: "日记内容_图层",
                资源标识: "$52524475", // resId: "$52524475"
                位置: 日记页.内容页辅助阅读按钮位置,
                当点触结束时: () => {
                    const 辅助阅读 = new 辅助阅读器类({
                        文本内容: 日记页.内容页辅助阅读内容,
                        背景图资源标识: "$53062945", // resId: "$53062945"
                        背景图水平翻转: 是,
                        容器宽度: 0.5625,
                        容器高度: 最大填充,
                        容器水平对齐方式: 水平对齐方式.靠右,
                        容器内边距: { 上: 38, 下: 38, 左: 46, 右: 46 },
                        文本字体: { 名称: "方正楷体", 字号: 30, 颜色: "#ffffff" },
                    });

                    辅助阅读.查看();
                },
            });
        }

        if (日记页.内容页回溯当日按钮位置) {
            await 接口.创建选项("日记内容_回溯当日按钮", {
                所属图层: "日记内容_图层",
                资源标识: "$52524461", // resId: "$52524461"
                位置: 日记页.内容页回溯当日按钮位置,
                当点触结束时: () => {
                    日记页.回溯当日();
                },
            });
        }

        await 接口.创建选项("日记内容_返回按钮", {
            所属图层: "日记内容_图层",
            资源标识: "$52524460", // resId: "$52524460"
            位置: { 横: 1169, 纵: 326 },
            当点触结束时: () => {
                承诺.全部([
                    接口.移除对象("日记内容_图层", { 时长: 300 }),
                    接口.显示对象("日记概要_图层", { 时长: 300 }),
                ]);
            },
        });

        await 承诺.全部([接口.隐藏对象("日记概要_图层", { 时长: 300 }), 接口.显示对象("日记内容_图层", { 时长: 300 })]);
    }

    async #查看日记概要(入口页: 日记页类) {
        // await 易次元.播放音频("日记概要出现音效", { 资源标识: "$50698523" }); // resId: "$50698523"
        await 接口.创建图层("日记概要_图层", {
            层级索引: 170,
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
            裁剪模式: 是,
            裁剪区域: { 宽: 1280, 高: 720 },
            事件阻挡: 是,
            是否可见: 否,
        });

        const 显示概要页 = async (日记页: 日记页类) => {
            await 接口.播放音频("日记概要出现音效", { 资源标识: "$53260527" }); // resId: "$53260527"
            await 接口.隐藏对象("日记概要_图层");
            await 接口.创建图片("日记概要_图片", {
                所属图层: "日记概要_图层",
                资源标识: 日记页.概要页资源标识,
                位置: { 横: 640, 纵: 360 },
                锚点: { 横: 50, 纵: 50 },
            });

            await 接口.创建选项("日记概要_上一页_图片", {
                所属图层: "日记概要_图层",
                资源标识: "$52524462", // resId: "$52524462"
                位置: { 横: 329, 纵: 435 },
                当点触结束时: () => {
                    if (日记页.上一页 === 空白) return;
                    显示概要页(日记页.上一页);
                },
                是否可见: 是否是(日记页.上一页 !== 空白),
            });

            await 接口.创建选项("日记概要_下一页_图片", {
                所属图层: "日记概要_图层",
                资源标识: "$52524463", // resId: "$52524463"
                位置: { 横: 771, 纵: 435 },
                当点触结束时: () => {
                    if (日记页.下一页 === 空白) return;
                    显示概要页(日记页.下一页);
                },
                是否可见: 是否是(日记页.下一页 !== 空白),
            });

            await 接口.创建选项("日记概要_返回_图片", {
                所属图层: "日记概要_图层",
                资源标识: "$52524459", // resId: "$52524459"
                位置: { 横: 1113, 纵: 577 },
                当点触结束时: () => {
                    接口.移除对象("日记概要_图层", { 时长: 300 });
                },
            });

            await 接口.创建选项("日记概要_辅助阅读_图片", {
                所属图层: "日记概要_图层",
                资源标识: "$52524475", // resId: "$52524475"
                位置: { 横: 455, 纵: 100 },
                当点触结束时: () => {
                    /**
                     * ```
                     * ┌───────────┬────────────────────┐
                     * │           │                    │
                     * │           │        阅读        │
                     * │           │        区域        │
                     * │           │                    │
                     * └───────────┴────────────────────┘
                     * ```
                     */
                    const 辅助阅读 = new 辅助阅读器类({
                        文本内容: 日记页.概要页辅助阅读内容,
                        背景图资源标识: "$53062945", // resId: "$53062945"
                        背景图水平翻转: 是,
                        容器宽度: 0.5625,
                        容器高度: 最大填充,
                        容器水平对齐方式: 水平对齐方式.靠右,
                        容器内边距: { 上: 38, 下: 38, 左: 46, 右: 46 },
                        文本字体: { 名称: "方正楷体", 字号: 30, 颜色: "#ffffff" },
                    });

                    辅助阅读.查看();
                },
            });

            await 接口.创建选项("日记概要_翻阅日记_图片", {
                所属图层: "日记概要_图层",
                资源标识: "$52524458", // resId: "$52524458"
                位置: { 横: 604, 纵: 110 },
                当点触结束时: () => {
                    this.#翻阅日记内容(日记页);
                },
            });

            await 接口.创建选项("日记概要_回溯当日_图片", {
                所属图层: "日记概要_图层",
                资源标识: "$52524461", // resId: "$52524461"
                位置: { 横: 753, 纵: 96 },
                当点触结束时: () => {
                    日记页.回溯当日();
                },
                是否可见: 日记页.是否可回溯,
            });

            await 接口.显示对象("日记概要_图层");
        };

        await 显示概要页(入口页);
    }

    constructor(时间管理器: 时间管理器类, 选项记录器: 选项记录器类) {
        super();
        this.#时间管理器 = 时间管理器;
        this.#选项记录器 = 选项记录器;
    }

    // 配置日记<T extends unknown[]>(...参数: { [I in keyof T]: 日记配置<[unknown, unknown, number, unknown, string]> }) {}
    // TODO: 日记配置的类型参数需要是可以推断的元组类型。
    配置日记<类型 extends 未知[]>(...参数: { [属性 in keyof 类型]: 日记配置<[...类型[属性][]]> }) {
        for (const 日记配置 of 参数) {
            const 日期 = 日记配置.日期;
            const 编号 = 日记配置.记录编号;

            if (日记配置.是否自动记录 === 否 && 日期 !== 被污损) {
                if (编号 === 未定义) throw new 错误(`日记配置 ${日期} 缺少编号！`);

                this.#选项记录器.定义新记录({
                    编号: 800 + 编号,
                    日期: 日期,
                    选项模式: "单选",
                    可选项: [
                        { 编号: 0, 描述: "未书写" },
                        { 编号: 1, 描述: "已书写" },
                    ],
                });
            }

            if (日记配置.是否可回溯 === 是 && 日期 !== 被污损 && 日记配置.回溯至剧情标识 === 未定义) {
                throw new 错误(`日记配置 ${日期} 缺少回溯至剧情标识！`);
            }

            if (日记配置.日记页回溯当日按钮位置 !== 未定义 && 日记配置.是否可回溯 !== 是 && 日期 !== 被污损) {
                throw new 错误(`日记配置 ${日期} 的日记页为不可回溯日记，配置的回溯当日按钮无效！`);
            }

            this.#日记配置集.set(日记配置.日期, 日记配置);
        }
    }

    async 书写日记() {
        let 履行承诺 = (_: 未知) => {};

        const 日期 = this.#时间管理器.获取当前日期字符串();
        const 日记配置 = this.#日记配置集.get(日期);
        if (!日记配置) throw alert(`未配置 ${日期} 的日记！`);

        接口.播放音频("翻书音效", { 资源标识: "$53260527" }); // resId: "$53260527"
        await 接口.创建图片("日记书写背景图", {
            资源标识: 日记配置.书写背景图资源标识,
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
            动态缩放模式: 常量.动态缩放模式.覆盖,
            是否可见: 否,
        });

        await 接口.显示对象("日记书写背景图", { 时长: 2000 });

        await 接口.创建图层("日记书写_交互按钮_图层", {
            层级索引: 100,
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
            裁剪模式: 是,
            裁剪区域: { 宽: 1280, 高: 720 },
        });

        await 接口.创建选项("日记书写_返回按钮", {
            所属图层: "日记书写_交互按钮_图层",
            正常态资源标识: "$53062946", // resId: "$53062946"
            点击态资源标识: "$53062946", // resId: "$53062946",
            位置: { 横: 150, 纵: 650 },
            锚点: { 横: 50, 纵: 50 },
            当点触结束时: async () => {
                this.触发事件(new 自定义事件("返回"));
                接口.播放音频("合上书本音效", { 资源标识: "$53383018" }); // resId: "$53383018"
                await 承诺.全部([
                    接口.移除对象("日记书写背景图", { 时长: 1000 }),
                    接口.移除对象("日记书写_交互按钮_图层", { 时长: 1000 }),
                ]);
                await 接口.打开对话框(常量.预设对话框.旁白框, "我没有写日记……直接合上了日记本。");
                await 接口.关闭对话框();
                履行承诺(是);
            },
        });

        await 接口.创建选项("日记书写_写日记按钮", {
            所属图层: "日记书写_交互按钮_图层",
            正常态资源标识: "$53063008", // resId: "$53063008"
            点击态资源标识: "$53063008", // resId: "$53063008"
            位置: { 横: 196, 纵: 154 },
            锚点: { 横: 50, 纵: 50 },
            当点触结束时: async () => {
                this.触发事件(new 自定义事件("开始书写日记"));
                await 接口.创建文本样式("日记书写_静态段落文本样式", {
                    字体: "方正楷体",
                    字号: 30,
                    颜色: "#ffffff",
                    描边宽度: 0,
                    阴影颜色: "#000000",
                    阴影偏移: { 水平: 1, 垂直: 1 },
                });

                await 接口.创建文本样式("日记书写_动态段落文本样式", {
                    字体: "方正楷体",
                    字号: 30,
                    颜色: "#8faef2",
                    描边宽度: 0,
                    阴影颜色: "#000000",
                    阴影偏移: { 水平: 1, 垂直: 1 },
                });

                if (日记配置.日记段落) {
                    接口.移除对象("日记书写_交互按钮_图层", { 时长: 300 });

                    await 接口.创建图片("日记书写_日记纸_背景图", {
                        资源标识: "$53062945", // resId: "$53062945"
                        位置: { 横: 640, 纵: 360 },
                        锚点: { 横: 50, 纵: 50 },
                        动态缩放模式: 常量.动态缩放模式.覆盖,
                        是否可见: 否,
                    });

                    接口.播放音频("翻书音效", { 资源标识: "$53260527" }); // resId: "$53260527"
                    await 接口.显示对象("日记书写_日记纸_背景图", { 时长: 1000 });

                    const 日记纸图层 = "日记书写_日记纸_段落_图层";
                    await 接口.创建图层(日记纸图层, {
                        层级索引: 100,
                        位置: { 横: 640, 纵: 360 },
                        锚点: { 横: 50, 纵: 50 },
                        裁剪模式: 是,
                        裁剪区域: { 宽: 1280, 高: 620 },
                    });

                    let 索引 = 0;
                    let 纵坐标 = 620;
                    const 段落间距 = 35;
                    for (const 段落 of 日记配置.日记段落) {
                        const 内容 = "判断条件" in 段落 ? 段落.文字内容(段落.判断条件()) : 段落.文字内容;
                        const 测量结果 = 测量字符串(内容, "30px 方正楷体");

                        if (段落.自动书写 === 否 && 索引 !== 0) {
                            接口.暂停音频("写字音效");
                            // deno-fmt-ignore: 不需要换行
                            await new 承诺<无>((履行) => 接口.创建选项("日记书写_日记段落_继续书写按钮", {
                                所属图层: 日记纸图层,
                                正常态资源标识: "$52601175", // resId: "$52601175"
                                点击态资源标识: "$52601175", // resId: "$52601175"
                                选项文字: "继续写……     ",
                                文字样式: "日记书写_动态段落文本样式",
                                位置: { 横: 900, 纵: 纵坐标 - 50 },
                                锚点: { 横: 50, 纵: 0 },
                                当点触结束时: () => (接口.移除对象('日记书写_日记段落_继续书写按钮'), 履行()),
                            }));
                        }

                        // FIXME: 为避免行首为标点符号的问题，暂时先以行宽为 800 - 30 的方式计算行数。
                        const 行数 = Math.ceil(测量结果.宽度 <= 770 ? 1 : 测量结果.宽度 / 770);
                        const 高度 = 行数 * 测量结果.实际高度 * 1.3;

                        纵坐标 -= 高度;

                        接口.播放音频("写字音效", { 资源标识: "$53385360", 循环播放: 是 }); // resId: "$53385360"
                        await 接口.创建文本(`日记书写_日记段落_${索引}`, {
                            所属图层: 日记纸图层,
                            文本样式: "判断条件" in 段落 ? "日记书写_动态段落文本样式" : "日记书写_静态段落文本样式",
                            文本内容: 内容,
                            位置: { 横: 640, 纵: 纵坐标 },
                            锚点: { 横: 50, 纵: 0 },
                            文本框大小: { 宽: 800, 高: 高度 },
                            水平对齐方式: 常量.水平对齐方式.靠左,
                            是否可见: 否,
                        });

                        await 接口.显示对象(`日记书写_日记段落_${索引}`, { 时长: 2000 });

                        console.log({ 内容, 测量: 测量结果, 行数, 高度 });

                        纵坐标 -= 段落间距;
                        索引 += 1;
                    }

                    接口.暂停音频("写字音效");
                    // deno-fmt-ignore: 不需要换行
                    await new 承诺<无>((履行) => 接口.创建选项("日记书写_日记段落_完成书写按钮", {
                        所属图层: 日记纸图层,
                        正常态资源标识: "$52601175", // resId: "$52601175"
                        点击态资源标识: "$52601175", // resId: "$52601175"
                        选项文字: "写完了       ",
                        文字样式: "日记书写_静态段落文本样式",
                        位置: { 横: 900, 纵: 纵坐标 - 50 },
                        锚点: { 横: 50, 纵: 0 },
                        当点触结束时: () => 履行(),
                    }));

                    接口.播放音频("合上书本音效", { 资源标识: "$53383018" }); // resId: "$53383018"
                    await 承诺.全部([
                        接口.移除对象("日记书写背景图", { 时长: 1000 }),
                        接口.移除对象("日记书写_交互按钮_图层", { 时长: 1000 }),
                        接口.移除对象("日记书写_日记纸_背景图", { 时长: 1000 }),
                        接口.移除对象(日记纸图层, { 时长: 1000 }),
                    ]);
                }

                if (日记配置.记录编号 !== 未定义) this.#选项记录器.记录({ 编号: 日记配置.记录编号, 选项: 1 });
                await 接口.打开对话框(常量.预设对话框.旁白框, "我写了一份日记……并合上了日记本。");
                await 接口.关闭对话框();

                this.触发事件(new 自定义事件("完成书写日记"));
                履行承诺(是);
            },
        });

        await 接口.创建选项("日记书写_速写日记按钮", {
            所属图层: "日记书写_交互按钮_图层",
            正常态资源标识: "$53063007", // resId: "$53063007",
            点击态资源标识: "$53063007", // resId: "$53063007",
            位置: { 横: 366, 纵: 154 },
            锚点: { 横: 50, 纵: 50 },
            点击音效: { 资源标识: "$51554" }, // resId: "$51554"
        });

        接口.播放音频("放下书音效", { 资源标识: "$53383017" }); // resId: "$53383017"

        return new 承诺((履行) => (履行承诺 = 履行));
    }

    async 打开日记本() {
        await 接口.播放音频("日记本出现音效", { 资源标识: "$50698523" }); // resId: "$50698523"
        await 接口.创建图层("项链菜单_日记本_图层", {
            层级索引: 160,
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
            裁剪模式: 是,
            裁剪区域: { 宽: 1280, 高: 720 },
            是否可见: 否,
        });

        await 接口.创建图片("项链菜单_日记本_图片", {
            所属图层: "项链菜单_日记本_图层",
            资源标识: "$52524464", // resId: "$52524464"
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
        });

        await 接口.创建图片("项链菜单_日记本_月份_图片", {
            所属图层: "项链菜单_日记本_图层",
            资源标识: this.#日记月份资源[this.#时间管理器.获取当前月份() - 1],
            位置: { 横: 865, 纵: 412 },
        });

        await 接口.创建选项("项链菜单_日记本_返回_选项", {
            所属图层: "项链菜单_日记本_图层",
            资源标识: "$52524460", // resId: "$52524460"
            位置: { 横: 1165, 纵: 325 },
            当点触结束时: async () => {
                this.触发事件(new 自定义事件("关闭日记本"));
                await 接口.移除对象("项链菜单_日记本_图层", { 时长: 300 });
            },
        });

        let 日记页: 日记页类 | 空白 = this.#获取截至今日记录的日记页();

        while (日记页 !== 空白) {
            const 入口页 = 日记页;
            日记页 = 日记页.上一页;

            if (入口页.日期 === 被污损) continue;
            if (!入口页.贴纸资源标识) throw alert(`日记本贴纸资源标识未配置: ${入口页.日期}`);
            if (!入口页.贴纸位置) throw alert(`日记本贴纸位置未配置: ${入口页.日期}`);

            await 接口.创建选项(`项链菜单_日记本_${入口页.日期}_选项`, {
                所属图层: "项链菜单_日记本_图层",
                正常态资源标识: 入口页.贴纸资源标识,
                点击态资源标识: 入口页.贴纸资源标识,
                位置: 入口页.贴纸位置,
                当点触结束时: () => this.#查看日记概要(入口页),
            });
        }

        this.触发事件(new 自定义事件("打开日记本"));
        await 接口.显示对象("项链菜单_日记本_图层", { 时长: 300 });
    }
}
