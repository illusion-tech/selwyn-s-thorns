import type { 变量容器类 } from "../应用/变量容器.ts";
import { 否, 已选择, type 数值, 是, 未解锁, 解锁, 最大填充, 水平对齐方式 } from "../运行时/全局常量.ts";
import { 常量, 接口 } from "../运行时/易次元.ts";
import { 事件目标 } from "../运行时/网络/事件目标.ts";
import type { 日记管理器类 } from "./日记管理器.ts";
import { 格式化为日期年月日字符串, type 时间管理器类 } from "../应用/时间管理器.ts";
import { 简单确认弹框类 } from "./简单确认弹框.ts";
import { 辅助阅读器类 } from "./辅助阅读器.ts";
import type { 选项记录器类 } from "./选项记录器.ts";

type 解锁状态 = typeof 解锁 | typeof 未解锁;

export class 项链菜单类 extends 事件目标 {
    #日记管理器: 日记管理器类;
    #变量容器: 变量容器类;
    #时间管理器: 时间管理器类;
    #选项记录器: 选项记录器类;
    #记录;

    async #显示记忆回溯选项() {
        if (this.#记录.可选项[0].选择状态 === 已选择) {
            await 接口.创建选项("项链菜单_交互_蜡烛_记忆回溯_选项", {
                所属图层: "项链菜单_交互_图层",
                正常态资源标识: "$52024246", // resId: "$52024246",
                点击态资源标识: "$52024245", // resId: "$52024245",
                选项文字: "",
                位置: { 横: 112, 纵: 130 },
                锚点: { 横: 50, 纵: 50 },
                点击音效: { 资源标识: "$51624" }, // resId: "$51624"
                当点触结束时() {
                    接口.插入用户界面("记忆回溯_用户界面", { 用户界面标识: "playback" });
                },
            });
        } else {
            await 接口.创建图片("项链菜单_交互_蜡烛_记忆回溯_图片", {
                所属图层: "项链菜单_交互_图层",
                资源标识: "$52024246", // resId: "$52024246",
                位置: { 横: 112, 纵: 130 },
                锚点: { 横: 50, 纵: 50 },
                不透明度: 40,
            });
        }
    }

    async #显示日记本选项() {
        if (this.#记录.可选项[1].选择状态 === 已选择) {
            this.#日记管理器.添加事件侦听器("打开日记本", () => {
                接口.隐藏对象("项链菜单_按钮_图片", { 时长: 300 });
                接口.隐藏对象("项链菜单_交互_图层", { 时长: 300 });
            });
            this.#日记管理器.添加事件侦听器("关闭日记本", () => {
                接口.显示对象("项链菜单_按钮_图片", { 时长: 300 });
                接口.显示对象("项链菜单_交互_图层", { 时长: 300 });
            });
            await 接口.创建选项("项链菜单_交互_日记本_选项", {
                所属图层: "项链菜单_交互_图层",
                资源标识: "$51703656", // resId: "$51703656"
                位置: { 横: 646, 纵: 356 },
                锚点: { 横: 50, 纵: 50 },
                当点触结束时: () => this.#日记管理器.打开日记本(),
            });
        } else {
            await 接口.创建图片("项链菜单_交互_日记本选项_图片", {
                所属图层: "项链菜单_交互_图层",
                资源标识: "$51703656", // resId: "$51703656",
                位置: { 横: 646, 纵: 356 },
                锚点: { 横: 50, 纵: 50 },
                不透明度: 40,
            });
        }
    }

    async #显示钥匙选项() {
        if (this.#记录.可选项[2].选择状态 === 已选择) {
            await 接口.创建选项("项链菜单_交互_钥匙_选项", {
                所属图层: "项链菜单_交互_图层",
                正常态资源标识: "$51703668", // resId: "$51703668"
                点击态资源标识: "$51703667", // resId: "$51703667"
                位置: { 横: 1000, 纵: 30 },
                当点触结束时: async () => {
                    const 确认弹框 = new 简单确认弹框类({
                        资源标识: "$61582994", // resId: "$61582994",
                        所属图层: "项链菜单_交互_图层",
                        确认按钮: { 资源标识: "$61582996", 位置: { 横: 256, 纵: 315 } }, // resId: "$61582996"
                        取消按钮: { 资源标识: "$61582995", 位置: { 横: 798, 纵: 315 } }, // resId: "$61582995"
                    });
                    await 确认弹框.显示();
                    接口.插入用户界面("钥匙_用户界面", { 用户界面标识: "fd9i5-46" });
                },
            });
        } else {
            await 接口.创建图片("项链菜单_交互_钥匙_图片", {
                所属图层: "项链菜单_交互_图层",
                资源标识: "$52024659", // resId: "$52024659",
                位置: { 横: 1000, 纵: 30 },
                不透明度: 40,
            });
        }
    }

    async #显示金钱鸟() {
        const 已解锁 = this.#记录.可选项[3].选择状态 === 已选择;
        await 接口.创建图片("项链菜单_交互_金钱鸟_图片", {
            所属图层: "项链菜单_交互_图层",
            资源标识: "$54436092", // resId: "$54436092",
            位置: { 横: 0, 纵: 530 },
            不透明度: 已解锁 ? 100 : 40,
        });

        const 金加隆 = this.#变量容器.查询变量值("物品.金加隆") as 数值;

        console.log({ 金加隆 });

        await 接口.创建文本样式("项链菜单_交互_金钱鸟_文本样式", {
            字体: "方正楷体",
            字号: 30,
            颜色: "#fbed9b",
            描边宽度: 0,
            阴影颜色: "#000000",
            阴影偏移: { 水平: 1, 垂直: 1 },
        });

        if (已解锁) {
            await 接口.创建文本("项链菜单_交互_金钱鸟_文本", {
                所属图层: "项链菜单_交互_图层",
                位置: { 横: 160, 纵: 630 },
                文本内容: `${金加隆} G`,
                文本样式: "项链菜单_交互_金钱鸟_文本样式",
                文本框大小: { 宽: 100, 高: 40 },
            });
        }
    }

    async #显示当前日期() {
        await 接口.创建文本样式("项链菜单_交互_当前日期_文本样式", {
            字体: "方正楷体",
            字号: 30,
            颜色: "#fbed9b",
            描边宽度: 4,
            描边颜色: "#ffffff",
        });
        await 接口.创建文本("项链菜单_交互_当前日期_文本", {
            所属图层: "项链菜单_交互_图层",
            位置: { 横: 545, 纵: 644 },
            文本内容: 格式化为日期年月日字符串(this.#时间管理器.获取当前日期标准字符串()),
            文本样式: "项链菜单_交互_当前日期_文本样式",
            文本框大小: { 宽: 200, 高: 40 },
        });

        let 点击次数 = 0;
        接口.添加事件侦听器("项链菜单_交互_当前日期_文本", 常量.事件类型.点触结束, async () => {
            点击次数 += 1;
            if (点击次数 < 7) return;

            点击次数 = 0;

            const 记录调试内容 = this.#选项记录器.调试().join("\n");

            const 辅助阅读器 = new 辅助阅读器类({
                文本内容: 记录调试内容,
                背景图资源标识: "$53062945", // resId: $53062945
                文本字体: { 名称: "方正楷体", 字号: 15, 颜色: "#ffffff" },
                容器宽度: 1200,
                容器高度: 最大填充,
                容器水平对齐方式: 水平对齐方式.靠左,
            });

            await 辅助阅读器.查看();
        });
    }

    constructor(日记管理器: 日记管理器类, 选项记录器: 选项记录器类, 变量容器: 变量容器类, 时间管理器: 时间管理器类) {
        super();
        this.#日记管理器 = 日记管理器;
        this.#变量容器 = 变量容器;
        this.#时间管理器 = 时间管理器;
        this.#选项记录器 = 选项记录器;
        this.#记录 = 选项记录器.定义新记录({
            编号: 900,
            日期: "0000-00-00",
            选项模式: "多选",
            描述: "项链菜单解锁",
            可选项: [
                { 编号: 0, 描述: "记忆回溯" },
                { 编号: 1, 描述: "日记本" },
                { 编号: 2, 描述: "钥匙" },
                { 编号: 3, 描述: "金钱鸟" },
            ],
        });
    }

    async 关闭菜单() {
        return 接口.关闭当前用户界面();
    }

    async 显示菜单() {
        await 接口.创建图层("项链菜单_图层", {
            层级索引: 200,
            是否可见: 是,
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
            裁剪模式: 是,
            裁剪区域: { 宽: 1280, 高: 720 },
        });

        await 接口.创建图片("项链菜单_按钮_图片", {
            资源标识: "$51561733", // resId: "$51561733"
            所属图层: "项链菜单_图层",
            位置: { 横: 1188, 纵: 658 },
            锚点: { 横: 50, 纵: 50 },
            不透明度: 0,
        });

        接口.透明度变化("项链菜单_按钮_图片", { 不透明度: 100, 时长: 1000 });
        接口.播放音频("播放打开菜单音效", { 资源标识: "$51624" }); // resId: "$51624"
        await 接口.创建图片("项链菜单_背景雾_图片", {
            资源标识: "$51703715", // resId: "$51703715"
            层级索引: 100,
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
            动态缩放模式: 常量.动态缩放模式.覆盖,
            是否可见: 否,
        });
        await 接口.创建图片("项链菜单_背景雾遮罩_图片", {
            资源标识: "$51398051", // resId: "$51398051"
            层级索引: 100,
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
            动态缩放模式: 常量.动态缩放模式.覆盖,
            是否可见: 否,
        });

        接口.播放音频("烟雾出现音效", { 资源标识: "$51542664" }); // resId: "$51542664"

        await Promise.all([
            接口.显示对象("项链菜单_背景雾_图片", { 时长: 1000 }),
            接口.显示对象("项链菜单_背景雾遮罩_图片", { 时长: 1000 }),
        ]);

        接口.播放音频("书本出现音效", { 资源标识: "$50762903" }); // resId: "$50762903"

        await 接口.创建图层("项链菜单_交互_图层", {
            层级索引: 150,
            是否可见: 是,
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
            裁剪模式: 是,
            裁剪区域: { 宽: 1280, 高: 720 },
        });

        await 接口.创建图片("项链菜单_交互_左侧神秘书籍_图片", {
            所属图层: "项链菜单_交互_图层",
            资源标识: "$52024436", // resId: "$52024436",
            位置: { 横: 318, 纵: 254 },
            锚点: { 横: 50, 纵: 50 },
        });

        await 接口.创建图片("项链菜单_交互_右侧神秘书籍_图片", {
            所属图层: "项链菜单_交互_图层",
            资源标识: "$51703666", // resId: "$51703666",
            位置: { 横: 974, 纵: 274 },
            锚点: { 横: 50, 纵: 50 },
        });

        await this.#显示日记本选项();
        await this.#显示记忆回溯选项();
        await this.#显示钥匙选项();
        await this.#显示金钱鸟();
        await this.#显示当前日期();

        await 接口.添加事件侦听器("项链菜单_按钮_图片", 常量.事件类型.点触结束, async () => {
            接口.透明度变化("项链菜单_按钮_图片", { 不透明度: 0, 时长: 1000 });
            接口.播放音频("播放关闭菜单音效", { 资源标识: "$51542664" }); // resId: "$51542664"
            await Promise.all([
                接口.移除对象("项链菜单_背景雾_图片", { 时长: 1000 }),
                接口.移除对象("项链菜单_背景雾遮罩_图片", { 时长: 1000 }),
                接口.移除对象("项链菜单_交互_图层", { 时长: 1000 }),
            ]);
            接口.关闭当前用户界面();
        });
    }

    async 收起项链() {
        return 接口.移除对象("项链菜单_图层", { 时长: 500 });
    }

    async 创建项链(配置: { 记忆回溯: 解锁状态; 日记本: 解锁状态; 钥匙: 解锁状态; 金钱鸟: 解锁状态 }) {
        this.#记录.重置();
        if (配置.记忆回溯 === 解锁) this.#记录.记录选择(0);
        if (配置.日记本 === 解锁) this.#记录.记录选择(1);
        if (配置.钥匙 === 解锁) this.#记录.记录选择(2);
        if (配置.金钱鸟 === 解锁) this.#记录.记录选择(3);

        await 接口.创建图层("项链菜单_图层", {
            层级索引: 200,
            是否可见: 是,
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
            裁剪模式: 是,
            裁剪区域: { 宽: 1280, 高: 720 },
        });

        await 接口.创建图片("项链菜单_按钮_图片", {
            资源标识: "$51561733", // resId: "$51561733"
            所属图层: "项链菜单_图层",
            位置: { 横: 1188, 纵: 658 },
            锚点: { 横: 50, 纵: 50 },
            不透明度: 40,
        });

        await 接口.添加事件侦听器("项链菜单_按钮_图片", 常量.事件类型.点触结束, async () => {
            await 接口.插入用户界面("项链菜单", { 用户界面标识: "ge2h11jm" });
        });
    }
}
