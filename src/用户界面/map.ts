import { 时间管理器类 } from "./time_manager.js";
import { 事件目标, 自定义事件 } from "./事件目标.js";
import { 中文坐标对象转坐标对象, 坐标转坐标对象 } from "./工具.js";

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
    名称: string;
    资源组: { [类型 in 地图资源类型]: number };
    入口列表?: {
        名称: string;
        资源组: { [类型 in 入口资源类型]: number };
        位置: 坐标;
        去往: {
            类型: "地图" | "场景";
            名称: string;
        };
    }[];
}

interface 配置入口参数 {
    名称: string;
    位于: string;
    禁用?: boolean;
    提示?: {
        文本内容: string;
        文本框大小: 中文大小对象;
        文本框相对于入口的偏移位置: 中文坐标对象;
    };
    描述界面?: {
        标题: string;
        描述: string;
    };
    执行?: () => void;
}

class 地图类 {
    #名称: string;
    #资源组: { [类型 in 地图资源类型]: number };
    #入口列表: {
        名称: string;
        资源组: { [类型 in 入口资源类型]: number };
        位置: 坐标;
        去往: {
            类型: "地图" | "场景";
            名称: string;
        };
        禁用?: boolean;
        提示?: {
            文本内容: string;
            文本框大小: 中文大小对象;
            文本框相对于入口的偏移位置: 中文坐标对象;
        };
        描述界面?: {
            标题: string;
            描述: string;
        };
        执行?: () => void | Promise<void>;
    }[];

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
        if (!入口) throw alert(`在地图 ${this.#名称} 中找不到名称为 ${名称} 的入口！`);
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

    public 创建新地图(参数: 创建新地图参数) {
        if (!参数.名称) throw alert("必须为地图指定名称！");
        if (!参数.资源组) throw alert("必须为地图指定资源组！");

        const 地图 = new 地图类(参数);

        this.#地图册.set(地图.名称, 地图);

        return 地图;
    }

    public 配置入口(参数: 配置入口参数) {
        const 地图 = this.#地图册.get(参数.位于);
        if (!地图) throw alert(`找不到名称为 ${参数.位于} 的地图！`);
        const 入口 = 地图.获取入口(参数.名称);
        入口.禁用 = 参数.禁用 ?? false;
        入口.提示 = 参数.提示 ?? 入口.提示;
        入口.描述界面 = 参数.描述界面 ?? 入口.描述界面;
        入口.执行 = 参数.执行 ?? 入口.执行;
    }

    public async 显示地图(名称: string) {
        const 地图 = this.#地图册.get(名称);
        if (!地图) throw alert(`找不到名称为 ${名称} 的地图！`);

        this.#当前地图 = 地图;

        const 主图资源 = this.#时间管理器.现在是白天
            ? 地图.获取资源(地图资源类型.日间主图)
            : 地图.获取资源(地图资源类型.夜间主图);
        const 底图资源 = this.#时间管理器.现在是白天
            ? 地图.获取资源(地图资源类型.日间底图)
            : 地图.获取资源(地图资源类型.夜间底图);

        await ac.createStyle({
            name: "地图_文本样式",
            font: "方正楷体",
            bold: true,
            italic: false,
            fontSize: 30,
            color: "#c0b187",
            speed: 9,
            strokeColor: "#2b2021",
            strokeWidth: 1,
        });

        await ac.createStyle({
            name: "地图_提示文本样式",
            font: "方正楷体",
            bold: true,
            italic: false,
            fontSize: 20,
            color: "#c0b187",
            speed: 9,
            strokeColor: "#2b2021",
            strokeWidth: 1,
        });

        await ac.createImage({
            name: `地图_${名称}_底图`,
            resId: `${底图资源}`,
            index: 10,
            dynaScale: "cover",
        });

        await ac.createLayer({
            name: `地图_${名称}_地图层`,
            index: 100,
            clipMode: true,
            pos: { x: 640, y: 360 },
            anchor: { x: 50, y: 50 },
            size: { width: 1280, height: 720 },
        });

        await ac.createImage({
            name: `地图_${名称}_主图`,
            resId: `${主图资源}`,
            inlayer: `地图_${名称}_地图层`,
            pos: { x: 640, y: 360 },
            anchor: { x: 50, y: 50 },
        });

        await ac.createLayer({
            name: `地图_${名称}_入口层`,
            inlayer: `地图_${名称}_地图层`,
            index: 110,
            clipMode: true,
            pos: { x: 640, y: 360 },
            anchor: { x: 50, y: 50 },
            size: { width: 1280, height: 720 },
        });

        await ac.createLayer({
            name: `地图_${名称}_入口遮罩层`,
            inlayer: `地图_${名称}_地图层`,
            index: 120,
            clipMode: true,
            pos: { x: 640, y: 360 },
            anchor: { x: 50, y: 50 },
            size: { width: 1280, height: 720 },
            visible: false,
        });

        await ac.createImage({
            name: `地图_${名称}_场景入口遮罩`,
            resId: "$53020597",
            inlayer: `地图_${名称}_入口遮罩层`,
            pos: { x: 640, y: 360 },
            anchor: { x: 50, y: 50 },
        });

        await ac.createImage({
            name: `地图_${名称}_场景入口_进入按钮`,
            resId: "$53020599",
            inlayer: `地图_${名称}_入口遮罩层`,
            pos: { x: 400, y: 55 },
        });

        await ac.createImage({
            name: `地图_${名称}_场景入口_离开按钮`,
            resId: "$53020600",
            inlayer: `地图_${名称}_入口遮罩层`,
            pos: { x: 755, y: 55 },
        });

        ac.addEventListener({
            type: ac.EVENT_TYPES.onTouchEnded,
            target: `地图_${名称}_场景入口_离开按钮`,
            listener: async () => {
                await ac.hide({ name: `地图_${名称}_入口遮罩层` });
                await ac.show({ name: `地图_${名称}_入口层` });
            },
        });

        for (const 入口 of 地图.入口列表) {
            const 入口图片名称 = `地图_${名称}_入口_${入口.名称}`;
            const 入口资源 = this.#时间管理器.现在是白天 ? 入口.资源组.日间 : 入口.资源组.夜间;

            await ac.createImage({
                name: 入口图片名称,
                resId: `${入口资源}`,
                inlayer: `地图_${名称}_入口层`,
                pos: 坐标转坐标对象(入口.位置),
            });

            if (入口.提示) {
                const 提示文本框坐标 = {
                    横: 入口.位置[0] + 入口.提示.文本框相对于入口的偏移位置.横,
                    纵: 入口.位置[1] + 入口.提示.文本框相对于入口的偏移位置.纵,
                };
                await ac.createText({
                    name: `地图_${名称}_入口_${入口.名称}_提示`,
                    inlayer: `地图_${名称}_入口层`,
                    halign: ac.HALIGN_TYPES.left,
                    valign: ac.VALIGN_TYPES.bottom,
                    content: 入口.提示.文本内容,
                    pos: 中文坐标对象转坐标对象(提示文本框坐标),
                    size: { width: 入口.提示.文本框大小.宽, height: 入口.提示.文本框大小.高 },
                    style: "地图_提示文本样式",
                });
            }

            if (入口.禁用) {
                await ac.filter({
                    name: 入口图片名称,
                    type: ac.FILTER_TYPES.gray,
                    args: 100,
                    duration: 100,
                });

                await ac.filter({
                    name: `地图_${名称}_场景入口_进入按钮`,
                    type: ac.FILTER_TYPES.gray,
                    args: 100,
                    duration: 100,
                });
            }

            const 侦听器 = async () => {
                this.触发事件(new 自定义事件("入口交互开始", { 细节: { 地图, 入口 } }));
                if (入口.去往.类型 === "地图") {
                    await ac.remove({
                        name: `地图_${名称}_底图`,
                        effect: ac.EFFECT_TYPES.normal,
                    });
                    await ac.remove({
                        name: `地图_${名称}_地图层`,
                        effect: ac.EFFECT_TYPES.normal,
                    });
                    await this.显示地图(入口.去往.名称);
                } else if (入口.去往.类型 === "场景") {
                    if (入口.描述界面) {
                        await ac.hide({ name: `地图_${名称}_入口层` });
                        await ac.createText({
                            name: `地图_${名称}_场景入口_标题`,
                            inlayer: `地图_${名称}_入口遮罩层`,
                            pos: { x: 535, y: 585 },
                            halign: ac.HALIGN_TYPES.middle,
                            valign: ac.VALIGN_TYPES.center,
                            content: 入口.描述界面.标题,
                            size: { width: 222, height: 40 },
                            style: "地图_文本样式",
                        });

                        await ac.createText({
                            name: `地图_${名称}_场景入口_描述`,
                            inlayer: `地图_${名称}_入口遮罩层`,
                            pos: { x: 395, y: 250 },
                            halign: ac.HALIGN_TYPES.middle,
                            content: 入口.描述界面.描述,
                            size: { width: 485, height: 233 },
                            style: "地图_文本样式",
                        });

                        await ac.show({ name: `地图_${名称}_入口遮罩层` });
                    }
                    await 入口.执行?.();
                }
                this.触发事件(new 自定义事件("入口交互结束", { 细节: { 地图, 入口 } }));
            };

            ac.addEventListener({
                type: ac.EVENT_TYPES.onTouchEnded,
                target: 入口图片名称,
                listener: 侦听器,
            });
        }
    }

    public async 关闭地图() {
        const 地图 = this.#当前地图;
        if (!地图) return;

        await ac.remove({
            name: `地图_${地图.名称}_底图`,
            effect: ac.EFFECT_TYPES.normal,
        });
        await ac.remove({
            name: `地图_${地图.名称}_地图层`,
            effect: ac.EFFECT_TYPES.normal,
        });

        this.#当前地图 = undefined;
    }
}
