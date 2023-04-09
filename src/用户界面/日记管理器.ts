import { 事件目标, 自定义事件 } from "./事件目标.js";
import { 时间管理器类 } from "./时间管理器.js";
import { 易次元 } from "./易次元.js";

type 静态段落 = {
    自动书写: 是否;
    文字内容: 字符串;
};

type 动态段落<in out T> = {
    自动书写: 是否;
    判断条件: () => T;
    文字内容: (参数: T) => 字符串;
    日记页文字资源标识: (参数: T) => 资源标识 | 空白;
    日记页文字位置?: { 横: 数值; 纵: 数值 };
};

type 段落<T> = 静态段落 | 动态段落<T>;

interface 日记配置<in out T extends unknown[]> {
    编号?: 数值;
    日期: 字符串 | 被污损;
    概要页资源标识: 资源标识;
    概要页辅助阅读内容: 字符串;
    书写背景图资源标识: 资源标识;
    日记页资源标识: 资源标识;
    日记页辅助阅读按钮位置: { 横: 数值; 纵: 数值 };
    日记页辅助阅读内容?: 字符串;
    日记段落?: [...{ [I in keyof T]: 段落<T[I]> }];
    日记本贴纸资源标识?: 资源标识;
}

export class 日记管理器类 extends 事件目标 {
    #时间管理器: 时间管理器类;
    #日记贴纸: { [日期: 字符串]: 资源标识 } = {};

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

    // rome-ignore format: 特定布局数组不需要格式化
    #贴纸位置: { [日期: 字符串]: { 横: 数值; 纵: 数值 } } = {
                                                                                                                    "1991-06-05": { 横: 826, 纵: 315 }, "1991-06-06": { 横: 878, 纵: 315 }, "1991-06-07": { 横: 925, 纵: 315 }, "1991-06-08": { 横: 980, 纵: 322 },
        "1991-06-09": { 横: 685, 纵: 265 }, "1991-06-10": { 横: 732, 纵: 269 }, "1991-06-11": { 横: 775, 纵: 267 }, "1991-06-12": { 横: 825, 纵: 267 }, "1991-06-13": { 横: 881, 纵: 269 }, "1991-06-14": { 横: 927, 纵: 267 }, "1991-06-15": { 横: 982, 纵: 273 },
        "1991-06-16": { 横: 687, 纵: 219 }, "1991-06-17": { 横: 729, 纵: 220 }, "1991-06-18": { 横: 775, 纵: 221 }, "1991-06-19": { 横: 833, 纵: 219 }, "1991-06-20": { 横: 879, 纵: 224 }, "1991-06-21": { 横: 933, 纵: 218 }, "1991-06-22": { 横: 990, 纵: 220 },
        "1991-06-23": { 横: 685, 纵: 173 }, "1991-06-24": { 横: 732, 纵: 174 }, "1991-06-25": { 横: 783, 纵: 178 }, "1991-06-26": { 横: 833, 纵: 176 }, "1991-06-27": { 横: 879, 纵: 173 }, "1991-06-28": { 横: 933, 纵: 173 }, "1991-06-29": { 横: 990, 纵: 173 },
        "1991-06-30": { 横: 685, 纵: 127 },
    };

    #日记配置集 = new Map<字符串 | 被污损, 日记配置<unknown[]>>();

    #获取日记记录(编号: 数值): 数值 | 未定义 {
        return ac.arr.日记记录[编号];
    }

    constructor(时间管理器: 时间管理器类) {
        super();
        this.#时间管理器 = 时间管理器;
    }

    配置日记贴纸(日记贴纸: { [日期: 字符串]: 资源标识 }) {
        this.#日记贴纸 = 日记贴纸;
    }

    // 配置日记<T extends unknown[]>(...参数: { [I in keyof T]: 日记配置<[unknown, unknown, number, unknown, string]> }) {}
    // TODO: 日记配置的类型参数需要是可以推断的元组类型。
    配置日记<T extends unknown[]>(...参数: { [I in keyof T]: 日记配置<[...T[I][]]> }) {
        for (const 日记配置 of 参数) {
            const 日期 = 日记配置.日期;
            const 编号 = 日记配置.编号;
            if (日期 !== 被污损) {
                if (编号 === 未定义) throw alert(`日记配置 ${日期} 缺少编号！`);
                const 记录结果 = this.#获取日记记录(编号);
                if (记录结果 === 未定义) throw alert(`日记配置 ${日期} 编号 ${编号} 未在对应的日记记录数组初始化！`);
            }
            this.#日记配置集.set(日记配置.日期, 日记配置);
        }
    }

    async 书写日记() {
        const 日期 = this.#时间管理器.获取当前日期字符串();
        const 日记配置 = this.#日记配置集.get(日期);
        if (!日记配置) throw alert(`未配置 ${日期} 的日记！`);

        易次元.播放音频("翻书音效", { 资源标识: "$53260527" }); // resId: "$53260527"
        await 易次元.创建图片("日记书写背景图", {
            资源标识: 日记配置.书写背景图资源标识,
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
            动态缩放模式: 最大填充,
            是否可见: 否,
        });

        await 易次元.显示对象("日记书写背景图", { 效果: 易次元.出现效果.淡入, 时长: 2000 });

        await 易次元.创建图层("日记书写_图层", {
            层级索引: 100,
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
            裁剪模式: 是,
            裁剪区域: { 宽: 1280, 高: 720 },
        });

        await 易次元.创建选项("日记书写_返回按钮", {
            所属图层: "日记书写_图层",
            正常态资源标识: "$53062946", // resId: "$53062946"
            点击态资源标识: "$53062946", // resId: "$53062946",
            位置: { 横: 150, 纵: 650 },
            锚点: { 横: 50, 纵: 50 },

            当点触结束时: async () => {
                this.触发事件(new 自定义事件("返回"));
                await Promise.all([
                    易次元.移除对象("日记书写背景图", { 效果: 易次元.消失效果.淡出, 时长: 500 }),
                    易次元.移除对象("日记书写_图层", { 效果: 易次元.消失效果.淡出, 时长: 300 }),
                ]);
                await 易次元.打开对话框(易次元.预设对话框.旁白框, "我没有写日记……直接合上了日记本。");
                await 易次元.关闭对话框();
            },
        });

        await 易次元.创建选项("日记书写_写日记按钮", {
            所属图层: "日记书写_图层",
            正常态资源标识: "$53063008", // resId: "$53063008"
            点击态资源标识: "$53063008", // resId: "$53063008"
            位置: { 横: 196, 纵: 154 },
            锚点: { 横: 50, 纵: 50 },
            当点触结束时: () => {
                this.触发事件(new 自定义事件("开始书写日记"));
                this.触发事件(new 自定义事件("完成书写日记"));
            },
        });

        await 易次元.创建选项("日记书写_速写日记按钮", {
            所属图层: "日记书写_图层",
            正常态资源标识: "$53063007", // resId: "$53063007",
            点击态资源标识: "$53063007", // resId: "$53063007",
            位置: { 横: 366, 纵: 154 },
            锚点: { 横: 50, 纵: 50 },
            点击音效: { 资源标识: "$51554" }, // resId: "$51554"
        });

        易次元.播放音频("放下书音效", { 资源标识: "$53383017" }); // resId: "$53383017"
    }

    async 查看日记概要(日期: 字符串) {
        // await 易次元.播放音频("日记概要出现音效", { 资源标识: "$50698523" }); // resId: "$50698523"
        await 易次元.创建图层("日记概要_图层", {
            层级索引: 160,
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
            裁剪模式: 是,
            裁剪区域: { 宽: 1280, 高: 720 },
            是否可见: 否,
        });
    }

    async 打开日记本() {
        await 易次元.播放音频("日记本出现音效", { 资源标识: "$50698523" }); // resId: "$50698523"
        await 易次元.创建图层("项链菜单_日记本_图层", {
            层级索引: 160,
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
            裁剪模式: 是,
            裁剪区域: { 宽: 1280, 高: 720 },
            是否可见: 否,
        });

        await 易次元.创建图片("项链菜单_日记本_图片", {
            所属图层: "项链菜单_日记本_图层",
            资源标识: "$52524464", // resId: "$52524464"
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
        });

        await 易次元.创建图片("项链菜单_日记本_月份_图片", {
            所属图层: "项链菜单_日记本_图层",
            资源标识: this.#日记月份资源[this.#时间管理器.获取当前月份() - 1],
            位置: { 横: 865, 纵: 412 },
        });

        await 易次元.创建选项("项链菜单_日记本_返回_选项", {
            所属图层: "项链菜单_日记本_图层",
            正常态资源标识: "$52524460", // resId: "$52524460"
            点击态资源标识: "$52524460", // resId: "$52524460"
            位置: { 横: 1165, 纵: 325 },
            当点触结束时: async () => {
                this.触发事件(new 自定义事件("关闭日记本"));
                await 易次元.移除对象("项链菜单_日记本_图层", { 效果: 易次元.消失效果.淡出, 时长: 300 });
            },
        });

        for (const 日期 in this.#日记贴纸) {
            const 贴纸资源标识 = this.#日记贴纸[日期];
            const 贴纸位置 = this.#贴纸位置[日期];

            if (!贴纸位置) throw alert(`日记本贴纸位置未配置: ${日期}`);

            await 易次元.创建选项(`项链菜单_日记本_${日期}_选项`, {
                所属图层: "项链菜单_日记本_图层",
                正常态资源标识: 贴纸资源标识,
                点击态资源标识: 贴纸资源标识,
                位置: 贴纸位置,
            });
        }

        this.触发事件(new 自定义事件("打开日记本"));
        await 易次元.显示对象("项链菜单_日记本_图层", { 效果: 易次元.出现效果.淡入, 时长: 300 });
    }
}
