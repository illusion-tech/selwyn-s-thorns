import { 格式化为日期年月日字符串 } from "../应用/时间管理器.ts";
import {
    否,
    垂直对齐方式,
    是,
    type 是否,
    type 字符串,
    type 数值,
    type 真假,
    type 资源标识,
    已选择,
} from "../运行时/全局常量.ts";
import { 祛缩进 } from "../运行时/工具.ts";
import { 切换效果, 接口 } from "../运行时/易次元.ts";
import { type 日记管理器类 } from "./日记管理器.ts";
import { 简单确认弹框类 } from "./简单确认弹框.ts";
import { type 选项记录器类 } from "./选项记录器.ts";

interface 书房菜单配置 {
    名称: 字符串;
    资源标识: 资源标识;
    位置: { 横: 数值; 纵: 数值 };
    文本框: {
        文本: 字符串;
        位置: { 横: 数值; 纵: 数值 };
        大小: { 宽: 数值; 高: 数值 };
    };
    从头书写按钮: {
        起始剧情编号: 数值;
        起始日期时间: `${数值}-${数值}-${数值} ${数值}:${数值}:${数值}`;
        当点触结束时?: () => void;
    };
    继续写入按钮: {};
    是否显示: 是否 | (() => 真假);
}

export class 书房菜单类 {
    #选项记录器: 选项记录器类;
    #日记管理器: 日记管理器类;
    #配置集: 书房菜单配置[] = [];

    constructor(日记管理器: 日记管理器类, 选项记录器: 选项记录器类) {
        this.#日记管理器 = 日记管理器;
        this.#选项记录器 = 选项记录器;
    }

    配置(参数: 书房菜单配置[]) {
        this.#配置集 = 参数;
    }

    async 显示() {
        await 接口.创建图片("背景图", {
            资源标识: "$50705207",
            所属图层: "window",
            层级索引: 0,
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
            是否可见: 否,
        });

        await 接口.创建图层("书写板图层", {
            所属图层: "window",
            层级索引: 100,
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
            裁剪模式: 是,
            裁剪区域: { 宽: 1280, 高: 720 },
        });

        接口.播放音频("开门铁链声", { 资源标识: "$50741150", 音量: 100 });

        await 接口.显示对象("背景图", { 时长: 3000 });

        const 显示的书写板配置 = this.#配置集.filter((配置) => {
            if (typeof 配置.是否显示 === "function") return 配置.是否显示();
            return 配置.是否显示 === 是;
        });

        await 接口.创建文本样式("书写板_文本样式", {
            字体: "方正书宋",
            字号: 21,
            粗体: 是,
            颜色: "#6f4521",
        });

        for (const 配置 of 显示的书写板配置) {
            await 接口.创建图片(`书写板_${配置.名称}`, {
                资源标识: 配置.资源标识,
                所属图层: "书写板图层",
                层级索引: 0,
                位置: 配置.位置,
                锚点: { 横: 50, 纵: 50 },
                是否可见: 否,
            });

            await 接口.创建文本(`书写板_${配置.名称}_文本`, {
                所属图层: "书写板图层",
                层级索引: 100,
                位置: 配置.文本框.位置,
                锚点: { 横: 50, 纵: 50 },
                文本样式: "书写板_文本样式",
                文本内容: 配置.文本框.文本,
                文本框大小: 配置.文本框.大小,
                垂直对齐方式: 垂直对齐方式.居中,
                行距: 1.5,
                是否可见: 否,
            });
        }

        await 接口.创建文本样式("按钮文字样式", {
            字体: "方正书宋",
            字号: 20,
            颜色: "#4a330c",
            描边颜色: "#e9d8bd",
            描边宽度: 2,
        });

        await 接口.创建文本样式("未解锁按钮文字样式", {
            字体: "方正书宋",
            字号: 20,
            颜色: "#403a35",
            描边颜色: "#e1deda",
            描边宽度: 2,
        });

        接口.创建文本样式("提示框_文本样式", {
            字体: "庞门正道粗书体",
            字号: 30,
            颜色: "#3e3f44",
            描边颜色: "#eae4ce",
            描边宽度: 3,
        });

        接口.创建文本样式("提示框_重点样式", {
            字体: "汉仪楷体简",
            字号: 32,
            颜色: "#d0021b",
            粗体: 是,
        });

        await 接口.创建选项("开启本章按钮", {
            所属图层: "书写板图层",
            资源标识: "$50838601",
            位置: { 横: 930, 纵: 186 },
            锚点: { 横: 50, 纵: 50 },
            选项文字: "开启本章",
            文字样式: "按钮文字样式",
            当点触结束时: async () => {
                const 配置 = 显示的书写板配置[当前位置];
                const 日期年月日字符串 = 格式化为日期年月日字符串(配置.从头书写按钮.起始日期时间);

                // 确定【开启本章】吗？所有 xxxx年xx月xx日 之后记录的日记将被清空。
                //     （此选项会清空本章及之后所有章节的存档）
                const 文本内容 = 祛缩进`
                    <tag style=提示框_文本样式>确定【开启本章】吗？所有 </tag><tag style=提示框_重点样式>${日期年月日字符串}</tag><tag style=提示框_文本样式> 之后的日记将被清空。
                    （此选项会清空</tag><tag style=提示框_重点样式>本章及之后所有章节</tag><tag style=提示框_文本样式>的存档）</tag>
                `;

                const 弹窗 = new 简单确认弹框类({
                    资源标识: "$73549479",
                    所属图层: "书写板图层",
                    确认按钮: { 资源标识: "$61629902", 位置: { 横: 259, 纵: 313 } },
                    取消按钮: { 资源标识: "$61629901", 位置: { 横: 829, 纵: 313 } },
                    文本: {
                        内容: 文本内容,
                        位置: { 横: 640, 纵: 400 },
                        大小: { 宽: 1000, 高: 80 },
                    },
                });

                await 弹窗.显示();

                this.#日记管理器.重置日记选项记录({
                    起始日期: new Date(配置.从头书写按钮.起始日期时间),
                    是否含当日: 是,
                });

                await 接口.跳转剧情(配置.从头书写按钮.起始剧情编号, {
                    切换效果: 切换效果.淡出后淡入,
                    时长: 3000,
                });
            },
            是否可见: 否,
        });

        if (this.#选项记录器.查询({ 编号: 900, 选项: 1 }) === 已选择)
            await 接口.创建选项("继续写入按钮", {
                所属图层: "书写板图层",
                资源标识: "$50838601",
                位置: { 横: 1095, 纵: 186 },
                锚点: { 横: 50, 纵: 50 },
                选项文字: "继续写入",
                文字样式: "按钮文字样式",
                当点触结束时: () => {
                    this.#日记管理器.打开日记本();
                },
                是否可见: 否,
            });
        else
            await 接口.创建选项("继续写入按钮", {
                所属图层: "书写板图层",
                资源标识: "$50838603",
                位置: { 横: 1095, 纵: 186 },
                锚点: { 横: 50, 纵: 50 },
                选项文字: "未解锁",
                文字样式: "未解锁按钮文字样式",
                点击音效: { 资源标识: "$51554" },
                是否可见: 否,
            });

        await 接口.创建选项("未知按钮_未解锁", {
            所属图层: "书写板图层",
            资源标识: "$50838603",
            位置: { 横: 930, 纵: 123 },
            锚点: { 横: 50, 纵: 50 },
            选项文字: "未解锁",
            文字样式: "未解锁按钮文字样式",
            点击音效: { 资源标识: "$51554" },
            是否可见: 否,
        });

        await 接口.创建选项("离开庄园按钮", {
            所属图层: "书写板图层",
            资源标识: "$50838601",
            位置: { 横: 1095, 纵: 123 },
            锚点: { 横: 50, 纵: 50 },
            选项文字: "离开庄园",
            文字样式: "按钮文字样式",
            当点触结束时: () => {
                接口.替换用户界面("庄园菜单", { 用户界面标识: "fd9i5-46" });
            },
            是否可见: 否,
        });

        await 接口.创建选项("书写板_上一页按钮", {
            所属图层: "书写板图层",
            正常态资源标识: "$50744981",
            点击态资源标识: "$50744980",
            位置: { 横: 891, 纵: 600 },
            锚点: { 横: 50, 纵: 50 },
            当点触结束时: () => {
                当前位置--;
                刷新书写板(当前位置);
            },
            是否可见: 否,
        });

        await 接口.创建选项("书写板_下一页按钮", {
            所属图层: "书写板图层",
            正常态资源标识: "$50744979",
            点击态资源标识: "$50744978",
            位置: { 横: 1150, 纵: 600 },
            锚点: { 横: 50, 纵: 50 },
            当点触结束时: () => {
                当前位置++;
                刷新书写板(当前位置);
            },
            是否可见: 否,
        });

        {
            // 卡更新 Bug 入口
            await 接口.创建选项("卡更新 Bug 按钮", {
                所属图层: "书写板图层",
                资源标识: "$74328351",
                位置: { 横: 49, 纵: 556 },
                选项文字: "卡更新 Bug",
                文字样式: "按钮文字样式",
                当点触结束时: () => {
                    接口.跳转剧情(4891687, {
                        切换效果: 切换效果.淡出后淡入,
                        时长: 2000,
                    });
                },
                是否可见: 是,
            });
        }

        let 当前位置 = 0;
        const 刷新书写板 = async (当前位置: 数值) => {
            const 显示的书写板 = 显示的书写板配置[当前位置];

            let 操作集: Promise<unknown>[] = [
                接口.隐藏对象("书写板_上一页按钮", { 时长: 500 }),
                接口.隐藏对象("书写板_下一页按钮", { 时长: 500 }),
                接口.隐藏对象("开启本章按钮", { 时长: 500 }),
                接口.隐藏对象("继续写入按钮", { 时长: 500 }),
                接口.隐藏对象("未知按钮_未解锁", { 时长: 500 }),
                接口.隐藏对象("离开庄园按钮", { 时长: 500 }),
            ];

            for (const 配置 of 显示的书写板配置) {
                const 操作1 = 接口.隐藏对象(`书写板_${配置.名称}`, { 时长: 500 });
                const 操作2 = 接口.隐藏对象(`书写板_${配置.名称}_文本`, { 时长: 500 });

                操作集.push(操作1, 操作2);
            }

            await Promise.all(操作集);

            接口.播放音频("放下书", { 资源标识: "$50762903", 音量: 100 });

            await 接口.显示对象(`书写板_${显示的书写板.名称}`);
            await 接口.显示对象(`书写板_${显示的书写板.名称}_文本`);

            if (当前位置 !== 显示的书写板配置.length - 1) {
                await 接口.显示对象("离开庄园按钮");
                await 接口.显示对象("未知按钮_未解锁");
                await 接口.显示对象("继续写入按钮");
                await 接口.显示对象("开启本章按钮");
            }

            await 接口.显示对象("书写板_上一页按钮");
            await 接口.显示对象("书写板_下一页按钮");

            if (当前位置 === 0) {
                await 接口.隐藏对象("书写板_上一页按钮");
            }

            if (当前位置 === 显示的书写板配置.length - 1) {
                await 接口.隐藏对象("书写板_下一页按钮");
            }
        };

        await 刷新书写板(当前位置);
    }
}
