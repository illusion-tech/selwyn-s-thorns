import { 时间管理器类 } from "./time_manager.js";

interface 创建新地图参数 {
    名称: string;
    资源组: {
        日间主图: string;
        夜间主图: string;
        日间底图: string;
        夜间底图: string;
    };
    入口列表?: {
        名称: string;
        资源: string;
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
    标题?: string;
    描述?: string;
}

enum 地图资源类型 {
    日间主图 = "日间主图",
    夜间主图 = "夜间主图",
    日间底图 = "日间底图",
    夜间底图 = "夜间底图",
}

class 地图类 {
    #名称: string;
    #资源组: { [类型 in 地图资源类型]: string };
    #入口列表: {
        名称: string;
        资源: string;
        位置: 坐标;
        去往: {
            类型: "地图" | "场景";
            名称: string;
        };
        禁用?: boolean;
        标题?: string;
        描述?: string;
    }[];

    get 名称() {
        return this.#名称;
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

export class 地图管理器类 {
    #时间管理器: 时间管理器类;
    #地图册: Map<string, 地图类> = new Map();

    constructor(时间管理器: 时间管理器类) {
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
        入口.标题 = 参数.标题 ?? 入口.标题;
        入口.描述 = 参数.描述 ?? 入口.描述;
    }

    public 显示地图(名称: string) {
        const 地图 = this.#地图册.get(名称);
        if (!地图) throw alert(`找不到名称为 ${名称} 的地图！`);

        // 地图.获取资源(地图资源类型.日间主图);
    }
}
