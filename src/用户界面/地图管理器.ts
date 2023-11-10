import type { 坐标, 坐标元组, 大小, 字符串, 数值, 是否, 真假 } from "../运行时/全局常量.ts";
import { 否, 是 } from "../运行时/全局常量.ts";
import { 常量, 接口 } from "../运行时/易次元.ts";
import { 事件目标, 自定义事件 } from "../运行时/网络/事件目标.ts";
import { 时间管理器类 } from "../应用/时间管理器.ts";

enum 地图资源类型 {
    日间主图 = "日间主图",
    夜间主图 = "夜间主图",
    日间底图 = "日间底图",
    夜间底图 = "夜间底图",
}

enum 入口资源类型 {
    日间 = "日间",
    夜间 = "夜间",
}

interface 创建新地图参数 {
    名称: 字符串;
    资源组: { [类型 in 地图资源类型]: number };
    入口列表?: {
        名称: 字符串;
        资源组: { [类型 in 入口资源类型]: number };
        位置: 坐标元组;
        去往: {
            类型: "地图" | "场景";
            名称: 字符串;
        };
    }[];
}

interface 配置入口参数 {
    名称: 字符串;
    位于: 字符串;
    禁用?: 真假;
    是否可见?: 是否;
    提示?: {
        文本内容: 字符串;
        文本框大小: 大小;
        文本框相对于入口的偏移位置: 坐标;
    };
    描述界面?: {
        标题: 字符串;
        描述: 字符串;
    };
    执行?: () => void;
}

interface 入口类型 {
    名称: 字符串;
    资源组: { [类型 in 入口资源类型]: 数值 };
    位置: 坐标元组;
    去往: {
        类型: "地图" | "场景";
        名称: 字符串;
    };
    禁用?: 真假;
    是否可见?: 是否;
    提示?: {
        文本内容: 字符串;
        文本框大小: 大小;
        文本框相对于入口的偏移位置: 坐标;
    };
    描述界面?: {
        标题: 字符串;
        描述: 字符串;
    };
    执行?: () => void | Promise<void>;
}

class 地图类 {
    #名称: 字符串;
    #资源组: { [类型 in 地图资源类型]: number };
    #入口列表: 入口类型[];

    get 名称() {
        return this.#名称;
    }

    get 入口列表() {
        return this.#入口列表.slice();
    }

    constructor(参数: 创建新地图参数) {
        this.#名称 = 参数.名称;
        this.#资源组 = 参数.资源组;
        this.#入口列表 = 参数.入口列表 ?? [];
    }

    获取入口(名称: string) {
        const 入口 = this.#入口列表.find((入口) => 入口.名称 === 名称);
        if (!入口) throw `在地图 ${this.#名称} 中找不到名称为 ${名称} 的入口！`;
        return 入口;
    }

    获取资源(资源类型: 地图资源类型) {
        return this.#资源组[资源类型];
    }
}

export class 地图管理器类 extends 事件目标 {
    #时间管理器: 时间管理器类;
    #地图册: Map<string, 地图类> = new Map();
    #当前地图?: 地图类;

    constructor(时间管理器: 时间管理器类) {
        super();
        this.#时间管理器 = 时间管理器;
    }

    async #地图入口交互(地图: 地图类, 入口: 入口类型) {
        await Promise.all([
            接口.移除对象(`地图_${地图.名称}_底图`, { 时长: 500 }),
            接口.移除对象(`地图_${地图.名称}_地图层`, { 时长: 500 }),
        ]);

        接口.播放音频("切换地图音效", { 资源标识: "$51486489" }); // resId: "$51486489"
        await this.显示地图(入口.去往.名称);
    }

    async #场景入口交互(地图: 地图类, 入口: 入口类型) {
        if (入口.描述界面) {
            await 接口.隐藏对象(`地图_${地图.名称}_入口层`);
            await 接口.创建文本(`地图_${地图.名称}_场景入口_标题`, {
                所属图层: `地图_${地图.名称}_入口遮罩层`,
                位置: { 横: 535, 纵: 585 },
                水平对齐方式: 常量.水平对齐方式.居中,
                垂直对齐方式: 常量.垂直对齐方式.居中,
                文本内容: 入口.描述界面.标题,
                文本框大小: { 宽: 222, 高: 40 },
                文本样式: "地图_文本样式",
            });

            await 接口.创建文本(`地图_${地图.名称}_场景入口_描述`, {
                所属图层: `地图_${地图.名称}_入口遮罩层`,
                位置: { 横: 395, 纵: 250 },
                水平对齐方式: 常量.水平对齐方式.居中,
                文本内容: 入口.描述界面.描述,
                文本框大小: { 宽: 485, 高: 233 },
                文本样式: "地图_文本样式",
            });

            await 接口.滤镜效果(`地图_${地图.名称}_场景入口_进入按钮`, {
                类型: 常量.滤镜类型.灰度变化,
                参数: 0,
                时长: 100,
            });

            if (入口.禁用) {
                await 接口.滤镜效果(`地图_${地图.名称}_场景入口_进入按钮`, {
                    类型: 常量.滤镜类型.灰度变化,
                    参数: 100,
                    时长: 100,
                });
            } else {
                await 接口.添加事件侦听器(`地图_${地图.名称}_场景入口_进入按钮`, 常量.事件类型.点触结束, async () =>
                    入口.执行?.(),
                );
            }

            await 接口.显示对象(`地图_${地图.名称}_入口遮罩层`);
        } else if (!入口.禁用) await 入口.执行?.();
    }

    async 隐藏入口() {
        const 地图 = this.#当前地图;
        if (!地图) throw "当前没有显示的地图！";

        await 接口.移除对象(`地图_${地图.名称}_入口层`, { 时长: 300 });
    }

    async 显示入口() {
        const 地图 = this.#当前地图;
        if (!地图) throw "当前没有显示的地图！";

        await 接口.创建图层(`地图_${地图.名称}_入口层`, {
            所属图层: `地图_${地图.名称}_地图层`,
            层级索引: 110,
            裁剪模式: 是,
            裁剪区域: { 宽: 1280, 高: 720 },
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
            是否可见: 否,
        });

        for (const 入口 of 地图.入口列表) {
            const 入口选项名称 = `地图_${地图.名称}_入口_${入口.名称}`;
            const 入口资源 = this.#时间管理器.现在是白天 ? 入口.资源组.日间 : 入口.资源组.夜间;

            await 接口.创建图片(入口选项名称, {
                所属图层: `地图_${地图.名称}_入口层`,
                位置: { 横: 入口.位置[0], 纵: 入口.位置[1] },
                资源标识: `$${入口资源}`,
                是否可见: 入口.是否可见,
            });

            await 接口.添加事件侦听器(入口选项名称, 常量.事件类型.点触结束, async () => {
                接口.播放音频("点击音效", { 资源标识: "$51624" }); // resId: "$51624
                this.触发事件(new 自定义事件("入口交互开始", { 细节: { 地图, 入口 } }));
                if (入口.去往.类型 === "地图") this.#地图入口交互(地图, 入口);
                else if (入口.去往.类型 === "场景") this.#场景入口交互(地图, 入口);
                this.触发事件(new 自定义事件("入口交互结束", { 细节: { 地图, 入口 } }));
            });

            if (入口.禁用) {
                await 接口.滤镜效果(入口选项名称, {
                    类型: 常量.滤镜类型.灰度变化,
                    参数: 100,
                    时长: 100,
                });
            }

            if (入口.提示) {
                const 提示文本框坐标 = {
                    横: 入口.位置[0] + 入口.提示.文本框相对于入口的偏移位置.横,
                    纵: 入口.位置[1] + 入口.提示.文本框相对于入口的偏移位置.纵,
                };

                await 接口.创建文本(`地图_${地图.名称}_入口_${入口.名称}_提示`, {
                    所属图层: `地图_${地图.名称}_入口层`,
                    文本内容: 入口.提示.文本内容,
                    文本样式: "地图_提示文本样式",
                    文本框大小: 入口.提示.文本框大小,
                    位置: 提示文本框坐标,
                    垂直对齐方式: 常量.垂直对齐方式.靠下,
                });
            }
        }

        await 接口.显示对象(`地图_${地图.名称}_入口层`, { 时长: 300 });
    }

    创建新地图(参数: 创建新地图参数) {
        if (!参数.名称) throw "必须为地图指定名称！";
        if (!参数.资源组) throw "必须为地图指定资源组！";

        const 地图 = new 地图类(参数);

        this.#地图册.set(地图.名称, 地图);

        return 地图;
    }

    配置入口(参数: 配置入口参数) {
        const 地图 = this.#地图册.get(参数.位于);
        if (!地图) throw `找不到名称为 ${参数.位于} 的地图！`;
        const 入口 = 地图.获取入口(参数.名称);
        入口.禁用 = 参数.禁用 ?? false;
        入口.是否可见 = 参数.是否可见 ?? 是;
        入口.提示 = 参数.提示 ?? 入口.提示;
        入口.描述界面 = 参数.描述界面 ?? 入口.描述界面;
        入口.执行 = 参数.执行 ?? 入口.执行;
    }

    async 显示地图(名称: 字符串, 过渡对象名称?: 字符串) {
        const 地图 = this.#地图册.get(名称);
        if (!地图) throw `找不到名称为 ${名称} 的地图！`;

        this.#当前地图 = 地图;

        const 主图资源 = this.#时间管理器.现在是白天
            ? 地图.获取资源(地图资源类型.日间主图)
            : 地图.获取资源(地图资源类型.夜间主图);
        const 底图资源 = this.#时间管理器.现在是白天
            ? 地图.获取资源(地图资源类型.日间底图)
            : 地图.获取资源(地图资源类型.夜间底图);

        await 接口.创建文本样式("地图_文本样式", {
            字体: "方正楷体",
            粗体: 是,
            斜体: 否,
            字号: 30,
            颜色: "#c0b187",
            对话语速: 9,
            描边颜色: "#2b2021",
            描边宽度: 1,
        });

        await 接口.创建文本样式("地图_提示文本样式", {
            字体: "方正楷体",
            粗体: 是,
            斜体: 否,
            字号: 20,
            颜色: "#c0b187",
            对话语速: 9,
            描边颜色: "#2b2021",
            描边宽度: 1,
        });

        await 接口.创建图片(`地图_${名称}_底图`, {
            资源标识: `$${底图资源}`,
            层级索引: 10,
            动态缩放模式: 常量.动态缩放模式.覆盖,
            是否可见: 否,
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
        });

        if (过渡对象名称) {
            await 接口.对象过渡(过渡对象名称, `地图_${名称}_底图`, {
                通道图资源标识: "$51413", // resId: "$51413"
                时长: 500,
            });
        } else {
            await 接口.显示对象(`地图_${名称}_底图`, { 时长: 500 });
        }

        await 接口.创建图层(`地图_${名称}_地图层`, {
            层级索引: 100,
            是否可见: 否,
            裁剪模式: 是,
            裁剪区域: { 宽: 1280, 高: 720 },
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
        });

        await 接口.创建图片(`地图_${名称}_主图`, {
            资源标识: `$${主图资源}`,
            所属图层: `地图_${名称}_地图层`,
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
        });

        await 接口.创建图层(`地图_${名称}_入口遮罩层`, {
            所属图层: `地图_${名称}_地图层`,
            层级索引: 120,
            是否可见: 否,
            裁剪模式: 是,
            裁剪区域: { 宽: 1280, 高: 720 },
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
        });

        await 接口.创建图片(`地图_${名称}_场景入口遮罩`, {
            资源标识: "$53020597",
            所属图层: `地图_${名称}_入口遮罩层`,
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
        });

        await 接口.创建图片(`地图_${名称}_场景入口_进入按钮`, {
            资源标识: "$53020599",
            所属图层: `地图_${名称}_入口遮罩层`,
            位置: { 横: 400, 纵: 55 },
        });

        await 接口.创建图片(`地图_${名称}_场景入口_离开按钮`, {
            资源标识: "$53020600",
            所属图层: `地图_${名称}_入口遮罩层`,
            位置: { 横: 755, 纵: 55 },
        });

        接口.添加事件侦听器(`地图_${名称}_场景入口_离开按钮`, 常量.事件类型.点触结束, async () => {
            await 接口.播放音频("点击音效", { 资源标识: "$51624" }); // resId: "$51624"
            await 接口.隐藏对象(`地图_${名称}_入口遮罩层`);
            await 接口.显示对象(`地图_${名称}_入口层`);
        });

        接口.播放音频("地图出现音效", { 资源标识: "$51413" });
        await 接口.显示对象(`地图_${名称}_地图层`, { 时长: 500 });
        await this.显示入口();
    }

    async 关闭地图() {
        const 地图 = this.#当前地图;
        if (!地图) return;

        await Promise.all([
            接口.移除对象(`地图_${地图.名称}_底图`, { 时长: 500 }),
            接口.移除对象(`地图_${地图.名称}_地图层`, { 时长: 500 }),
        ]);

        this.#当前地图 = undefined;
    }
}
