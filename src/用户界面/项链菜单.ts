import { 易次元 } from "./易次元.js";

type 项链菜单配置 = {
    记忆回溯: 解锁状态;
    日记本: 解锁状态;
    钥匙: 解锁状态;
};

export class 项链菜单类 {
    async 显示(配置: 项链菜单配置) {
        await 易次元.创建图层({
            名称: "项链菜单_图层",
            层级索引: 100,
            可见性: 真,
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
            裁剪模式: 是,
            裁剪区域: { 宽: 1280, 高: 720 },
        });

        await 易次元.创建图片({
            名称: "项链菜单_图片",
            资源标识: "$51561734", // resId: "$51561734"
            所属图层: "项链菜单_图层",
            位置: { 横: 1188, 纵: 658 },
            锚点: { 横: 50, 纵: 50 },
        });
    }
}
