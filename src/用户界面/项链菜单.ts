import { 日记管理器类 } from "./日记管理器.js";
import { 易次元 } from "./易次元.js";

type 项链菜单配置 = {
    记忆回溯: 解锁状态;
    日记本: 解锁状态;
    钥匙: 解锁状态;
};

export class 项链菜单类 {
    #状态 = "未激活";
    #日记管理器: 日记管理器类;

    async #显示日记本选项(解锁状态: 解锁状态) {
        if (解锁状态 === 解锁) {
            // this.#日记管理器.获取日记本();
            this.#日记管理器.添加事件侦听器("打开日记本", () => {
                易次元.隐藏对象("项链菜单_按钮_图片", { 效果: 易次元.消失效果.淡出, 时间: 300 });
            });
            this.#日记管理器.添加事件侦听器("关闭日记本", () => {
                易次元.显示对象("项链菜单_按钮_图片", { 效果: 易次元.出现效果.淡入, 时间: 300 });
            });
            await 易次元.创建选项("项链菜单_交互_日记本_选项", {
                所属图层: "项链菜单_交互_图层",
                正常态资源标识: "$51703656", // resId: "$51703656"
                点击态资源标识: "$51703656", // resId: "$51703656"
                位置: { 横: 646, 纵: 356 },
                锚点: { 横: 50, 纵: 50 },
                当点触结束时: () => this.#日记管理器.打开日记本(),
            });
        } else {
            await 易次元.创建图片("项链菜单_交互_日记本选项_图片", {
                所属图层: "项链菜单_交互_图层",
                资源标识: "$51703656", // resId: "$51703656",
                位置: { 横: 646, 纵: 356 },
                锚点: { 横: 50, 纵: 50 },
                不透明度: 40,
            });
        }
    }

    async #显示记忆回溯选项(解锁状态: 解锁状态) {
        if (解锁状态 === 解锁) {
            await 易次元.创建选项("项链菜单_交互_蜡烛_记忆回溯_选项", {
                所属图层: "项链菜单_交互_图层",
                正常态资源标识: "$52024246", // resId: "$52024246",
                点击态资源标识: "$52024245", // resId: "$52024245",
                选项文字: "",
                位置: { 横: 112, 纵: 130 },
                锚点: { 横: 50, 纵: 50 },
                点击音效: { 资源标识: "$51624" }, // resId: "$51624"
                当点触结束时() {
                    易次元.插入用户界面("记忆回溯_用户界面", { 用户界面标识: "playback" });
                },
            });
        } else {
            await 易次元.创建图片("项链菜单_交互_蜡烛_记忆回溯_图片", {
                所属图层: "项链菜单_交互_图层",
                资源标识: "$52024246", // resId: "$52024246",
                位置: { 横: 112, 纵: 130 },
                锚点: { 横: 50, 纵: 50 },
                不透明度: 40,
            });
        }
    }

    constructor(日记管理器: 日记管理器类) {
        this.#日记管理器 = 日记管理器;
    }

    async 关闭() {}

    async 显示(配置: 项链菜单配置) {
        await 易次元.创建图层("项链菜单_图层", {
            层级索引: 200,
            是否可见: 是,
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
            裁剪模式: 是,
            裁剪区域: { 宽: 1280, 高: 720 },
        });

        await 易次元.创建图片("项链菜单_按钮_图片", {
            资源标识: "$51561733", // resId: "$51561733"
            所属图层: "项链菜单_图层",
            位置: { 横: 1188, 纵: 658 },
            锚点: { 横: 50, 纵: 50 },
            不透明度: 40,
        });

        await 易次元.添加事件侦听器("项链菜单_按钮_图片", 易次元.事件类型.点触结束, async () => {
            if (this.#状态 === "未激活") {
                this.#状态 = "已激活";
                易次元.透明度变化("项链菜单_按钮_图片", { 不透明度: 100, 时间: 1000 });
                易次元.播放音频("播放打开菜单音效", { 资源标识: "$51624" }); // resId: "$51624"
                await 易次元.创建图片("项链菜单_背景雾_图片", {
                    资源标识: "$51703715", // resId: "$51703715"
                    层级索引: 100,
                    位置: { 横: 640, 纵: 360 },
                    锚点: { 横: 50, 纵: 50 },
                    动态缩放模式: 最大填充,
                    是否可见: 否,
                });
                await 易次元.创建图片("项链菜单_背景雾遮罩_图片", {
                    资源标识: "$51398051", // resId: "$51398051"
                    层级索引: 100,
                    位置: { 横: 640, 纵: 360 },
                    锚点: { 横: 50, 纵: 50 },
                    动态缩放模式: 最大填充,
                    是否可见: 否,
                });

                易次元.播放音频("烟雾出现音效", { 资源标识: "$51542664" }); // resId: "$51542664"

                await Promise.all([
                    易次元.显示对象("项链菜单_背景雾_图片", { 效果: 易次元.出现效果.淡入, 时间: 1000 }),
                    易次元.显示对象("项链菜单_背景雾遮罩_图片", { 效果: 易次元.出现效果.淡入, 时间: 1000 }),
                ]);

                易次元.播放音频("书本出现音效", { 资源标识: "$50762903" }); // resId: "$50762903"

                await 易次元.创建图层("项链菜单_交互_图层", {
                    层级索引: 150,
                    是否可见: 是,
                    位置: { 横: 640, 纵: 360 },
                    锚点: { 横: 50, 纵: 50 },
                    裁剪模式: 是,
                    裁剪区域: { 宽: 1280, 高: 720 },
                });

                await 易次元.创建图片("项链菜单_交互_左侧神秘书籍_图片", {
                    所属图层: "项链菜单_交互_图层",
                    资源标识: "$52024436", // resId: "$52024436",
                    位置: { 横: 318, 纵: 254 },
                    锚点: { 横: 50, 纵: 50 },
                });

                await 易次元.创建图片("项链菜单_交互_右侧神秘书籍_图片", {
                    所属图层: "项链菜单_交互_图层",
                    资源标识: "$51703666", // resId: "$51703666",
                    位置: { 横: 974, 纵: 274 },
                    锚点: { 横: 50, 纵: 50 },
                });

                await this.#显示日记本选项(配置.日记本);

                await this.#显示记忆回溯选项(配置.记忆回溯);
            } else {
                this.#状态 = "未激活";
                易次元.透明度变化("项链菜单_按钮_图片", { 不透明度: 40, 时间: 1000 });
                易次元.播放音频("播放关闭菜单音效", { 资源标识: "$51542664" }); // resId: "$51542664"
                await Promise.all([
                    易次元.移除对象("项链菜单_背景雾_图片", { 效果: 易次元.消失效果.淡出, 时间: 1000 }),
                    易次元.移除对象("项链菜单_背景雾遮罩_图片", { 效果: 易次元.消失效果.淡出, 时间: 1000 }),
                    易次元.移除对象("项链菜单_交互_图层", { 效果: 易次元.消失效果.淡出, 时间: 1000 }),
                ]);
            }
        });
    }
}
