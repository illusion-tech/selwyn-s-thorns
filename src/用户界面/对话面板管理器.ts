import type { 变量容器类 } from '../应用/变量容器.ts';
import type { 坐标元组, 字符串, 数值, 无, 资源标识 } from "../运行时/全局常量.ts";
import { 已选择, 是, 未定义 } from "../运行时/全局常量.ts";
import { 接口 } from "../运行时/易次元.ts";
import { 承诺 } from "../运行时/网络/承诺.ts";
import { 错误 } from "../运行时/网络/错误.ts";
import type { 执行器, 选项记录器类 } from "./选项记录器.ts";

type 显示面板参数 = {
    编号: 数值;
};

type 创建对话选项参数 = {
    选项内容: 字符串;
    条件集?: 条件[];
    执行结果?: 执行器;
};

type 创建对话选项面板参数 = {
    编号: 数值;
    描述: 字符串;
    可选项: 对话选项[];
    日期: 字符串;
};

type 条件 = {
    需满足: () => boolean;
    当不满足时: () => void;
};

class 对话选项 {
    内容 = "";
    条件集: 条件[] = [];
    结果执行函数?: 执行器;
}

export class 对话面板管理器类 {
    // rome-ignore format: 特定布局数组不需要格式化
    #预定义对话选项布局: 坐标元组[][] = [
        [ 
            [376, 120], [924, 120]
        ],
        [ 
            [376, 148], [924, 148],
            [376,  83],
        ],
        [
            [376, 148], [924, 148],
            [376,  83], [924,  83]
        ],
        [],
        [],
        [],
        [],
    ];

    #选项记录器: 选项记录器类;
    #变量容器: 变量容器类;

    #获取预定义对话选项布局(选项数量: number): 坐标元组[] {
        // 复制数组，避免修改原数组
        return this.#预定义对话选项布局[选项数量 - 2].map((坐标) => [...坐标]);
    }

    #获取蔷薇徽章动画序列: (前值: any, 现值: any) => { 资源标识: 资源标识; 时长: 数值 }[] = () => [];

    constructor(选项记录器: 选项记录器类, 变量容器: 变量容器类) {
        this.#选项记录器 = 选项记录器;
        this.#变量容器 = 变量容器;
    }

    配置面板蔷薇徽章动画(配置函数: (前值: any, 现值: any) => { resId: string; time: number }[]) {
        this.#获取蔷薇徽章动画序列 = (前值, 现值) =>
            配置函数(前值, 现值).map(({ resId, time }) => ({ 资源标识: resId as 资源标识, 时长: time }));
    }

    创建对话选项面板(参数: 创建对话选项面板参数) {
        if (!Number.isSafeInteger(参数.编号)) throw new 错误("对话选项面板必须有编号！");
        if (!参数.描述) throw new 错误("对话选项面板必须有描述！");
        if (参数.日期 === 未定义) throw new 错误(`对话选项面板<编号 ${参数.编号}>必须有日期！`);
        if (参数.可选项.length < 2 || 参数.可选项.length > 7) throw new 错误("对话选项面板必须有2到6个选项！");

        this.#选项记录器.定义新记录({
            编号: 参数.编号,
            日期: 参数.日期,
            描述: 参数.描述,
            选项模式: "单选",
            可选项: 参数.可选项.map((选项, 索引) => {
                return {
                    编号: 索引,
                    描述: 选项.内容,
                    执行结果: 选项.结果执行函数,
                };
            }),
        });
    }

    创建对话选项(参数: 创建对话选项参数) {
        const 选项 = new 对话选项();
        选项.内容 = 参数.选项内容;
        选项.结果执行函数 = 参数?.执行结果;
        return 选项;
    }

    /**
     * 显示指定编号的对话选项面板。
     * @param 参数 - 显示面板的参数
     * @param 对应选项的回调函数 - 在剧情中配置的选项回调函数，顺序与选项的顺序一致
     */
    async 显示对话选项面板(参数: 显示面板参数, ...对应选项的回调函数: Function[]) {
        // const 面板 = this.#面板集合[参数.编号];
        const 记录 = this.#选项记录器.获取记录(参数.编号);
        const 图层名称 = `对话选项面板_${参数.编号}_图层`;
        await 接口.创建图层(图层名称, {
            裁剪模式: 是,
            裁剪区域: { 宽: 1280, 高: 720 },
        });
        await 接口.创建图片(`对话选项面板_${参数.编号}_底板`, {
            所属图层: 图层名称,
            资源标识: "$51362891", // resId: "$51362891"
            位置: { 横: 652, 纵: 130 },
            锚点: { 横: 50, 纵: 50 },
        });
        const 蔷薇徽章名称 = `对话选项面板_${参数.编号}_蔷薇徽章`;
        await 接口.创建图片(蔷薇徽章名称, {
            所属图层: 图层名称,
            资源标识: "$51362896", // 灰蔷薇徽章
            位置: { 横: 652, 纵: 116 },
            锚点: { 横: 50, 纵: 50 },
        });

        const 选项布局 = this.#获取预定义对话选项布局(记录.可选项.length);

        await new 承诺<无>((履行) => {
            for (const 选项 of 记录.可选项) {
                const 坐标 = 选项布局.shift();
                if (!坐标) throw alert(`对话选项面板<${参数.编号}>的选项布局不足！`);
                // const 选项编号 = 选项.编号 + 1;
                接口.创建选项(`对话选项面板_${参数.编号}_选项_${选项.编号}`, {
                    层级索引: 1,
                    所属图层: 图层名称,
                    正常态资源标识: "$51362894", // nResId: "$51362894"
                    点击态资源标识: "$51362892", // sResId: "$51362892"
                    选项文字: 选项.描述,
                    位置: { 横: 坐标[0], 纵: 坐标[1] },
                    锚点: { 横: 50, 纵: 50 },
                    当点触结束时: async () => {
                        // const 属性探针 = this.#人物管理器.黛瑞雅.获取属性探针();
                        const 前值 = this.#变量容器.获取变量对象();
                        记录.记录选择(选项.编号);
                        const 现值 = this.#变量容器.获取变量对象();

                        const 动画序列 = this.#获取蔷薇徽章动画序列(前值, 现值);
                        接口.移除对象(蔷薇徽章名称);
                        接口.播放音频("蔷薇徽章动画音效", { 资源标识: "$51542664" }); // 蔷薇徽章动画音效

                        await 接口.创建动画序列("rose_animate", {
                            所属图层: 图层名称,
                            动画序列,
                            位置: { 横: 652, 纵: 116 },
                            锚点: { 横: 50, 纵: 50 },
                            是否可见: 是,
                        });
                        await 接口.延迟(1000);
                        await 接口.移除对象(图层名称, { 时长: 500 });
                        await 对应选项的回调函数[选项.编号]?.();

                        履行();
                    },
                });
            }
        });
    }

    /**
     * @param 参数 - 对话选项面板的编号
     */
    查询对话选项面板结果(参数: { 编号: number }) {
        return this.#选项记录器.查询({ 编号: 参数.编号 }).findIndex((选择状态) => 选择状态 === 已选择) + 1;
    }
}
