import { 事件目标, 自定义事件 } from "./事件目标.js";
import { 时间管理器类 } from "./时间管理器.js";
import { 易次元 } from "./易次元.js";

export class 日记管理器类 extends 事件目标 {
    #时间管理器: 时间管理器类;
    constructor(时间管理器: 时间管理器类) {
        super();
        this.#时间管理器 = 时间管理器;
    }

    async 打开日记本() {
        await 易次元.播放音频({ 名称: "日记本出现音效", 资源标识: "$50698523" }); // resId: "$50698523"
        await 易次元.创建图层({
            名称: "项链菜单_日记本_图层",
            层级索引: 160,
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
            裁剪模式: 是,
            裁剪区域: { 宽: 1280, 高: 720 },
            是否可见: 否,
        });

        await 易次元.创建图片({
            名称: "项链菜单_日记本_图片",
            所属图层: "项链菜单_日记本_图层",
            资源标识: "$52524464", // resId: "$52524464"
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
        });

        await 易次元.创建选项({
            名称: "项链菜单_日记本_返回_选项",
            所属图层: "项链菜单_日记本_图层",
            正常态资源标识: "$52524460", // resId: "$52524460"
            点击态资源标识: "$52524460", // resId: "$52524460"
            位置: { 横: 1165, 纵: 325 },
            当点触结束时: async () => {
                this.触发事件(new 自定义事件("关闭日记本"));
                await 易次元.移除对象({ 名称: "项链菜单_日记本_图层", 效果: 易次元.消失效果.淡出, 时间: 300 });
            },
        });

        this.触发事件(new 自定义事件("打开日记本"));
        await 易次元.显示对象({ 名称: "项链菜单_日记本_图层", 效果: 易次元.出现效果.淡入, 时间: 300 });
    }
}
