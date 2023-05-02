import type { 字符串, 数值 } from "../全局常量.ts";
import { 未定义 } from "../全局常量.ts";
import { 变量, 接口 } from "../运行时/易次元.ts";
import { 人物管理器类 } from "./人物管理器.ts";

type 显示面板参数 = {
    编号: 数值;
};

type 创建对话选项参数 = {
    选项内容?: 字符串;
    执行结果?: () => unknown | Promise<unknown>;
};

type 创建对话选项面板参数 = {
    编号: 数值;
    描述: 字符串;
    可选项: 对话选项[];
    日期: 字符串;
};

type 属性探针检测结果 = {
    属性: 字符串;
    变化: 数值;
};

type 条件 = {
    需满足: () => boolean;
    当不满足时提示: 字符串;
};

class 对话选项 {
    编号: number | null = null;
    内容 = "";
    条件集: 条件[] = [];

    结果执行函数: () => Promise<unknown> | unknown = (): Promise<unknown> | unknown => void 0;

    设置对话选项内容(内容: string) {
        this.内容 = 内容;
        return this;
    }

    添加对话选项条件(条件: 条件) {
        this.条件集.push(条件);
        return this;
    }

    设置对话选项执行结果(结果执行函数: () => unknown | Promise<unknown>) {
        this.结果执行函数 = 结果执行函数;
        return this;
    }
}

class 对话选项面板 {
    编号: 数值;
    #描述: 字符串;
    可选项: 对话选项[] = [];
    #日期: 字符串;

    /**
     * 对话选项面板的选择状态。
     * @remarks 数值表示当前选择的选项的编号， `0` 表示未选择。
     */
    选择状态: number = 0;

    /**
     * @param {创建对话选项面板参数} 参数
     */
    constructor(参数: 创建对话选项面板参数) {
        this.编号 = 参数.编号;
        this.#描述 = 参数.描述;
        this.可选项 = 参数.可选项;
        this.#日期 = 参数.日期;
    }
}

export class 对话选项管理器类 {
    /**
     * @type {对话选项面板[]}
     */
    #面板集合: 对话选项面板[] = [];

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

    #人物管理器: 人物管理器类;

    #获取预定义对话选项布局(选项数量: number): 坐标元组[] {
        // 复制数组，避免修改原数组
        return this.#预定义对话选项布局[选项数量 - 2].map((坐标) => [...坐标]);
    }

    #获取蔷薇徽章动画序列(属性探针检测结果: 属性探针检测结果[]) {
        if (属性探针检测结果.length === 0)
            return [
                { resId: "$54010987", time: 14 },
                { resId: "$54010469", time: 14 },
                { resId: "$54010470", time: 14 },
                { resId: "$54010471", time: 14 },
                { resId: "$54010472", time: 14 },
                { resId: "$54010473", time: 14 },
                { resId: "$54010474", time: 14 },
                { resId: "$54010475", time: 14 },
                { resId: "$54010476", time: 14 },
                { resId: "$54010477", time: 14 },
                { resId: "$54010478", time: 14 },
                { resId: "$54010479", time: 14 },
                { resId: "$54010480", time: 14 },
                { resId: "$54010481", time: 14 },
                { resId: "$54010482", time: 14 },
                { resId: "$54010483", time: 14 },
                { resId: "$54010484", time: 14 },
                { resId: "$54010485", time: 14 },
                { resId: "$54010486", time: 14 },
                { resId: "$54010487", time: 14 },
                { resId: "$54010488", time: 14 },
                { resId: "$54010489", time: 14 },
                { resId: "$54010490", time: 14 },
                { resId: "$54010491", time: 14 },
                { resId: "$54010492", time: 14 },
                { resId: "$54010493", time: 14 },
                { resId: "$54010494", time: 14 },
                { resId: "$54010495", time: 14 },
                { resId: "$54010496", time: 14 },
                { resId: "$54010497", time: 14 },
                { resId: "$54010498", time: 14 },
                { resId: "$54010499", time: 14 },
                { resId: "$54010500", time: 14 },
                { resId: "$54010501", time: 14 },
                { resId: "$54010502", time: 14 },
                { resId: "$54010503", time: 14 },
                { resId: "$54010504", time: 14 },
                { resId: "$54010505", time: 14 },
                { resId: "$54010506", time: 14 },
                { resId: "$54010507", time: 14 },
                { resId: "$54010508", time: 14 },
                { resId: "$54010509", time: 14 },
                { resId: "$54010510", time: 14 },
                { resId: "$54010511", time: 14 },
                { resId: "$54010512", time: 14 },
                { resId: "$54010513", time: 14 },
                { resId: "$54010514", time: 14 },
                { resId: "$54010515", time: 14 },
                { resId: "$54010516", time: 14 },
                { resId: "$54010987", time: 14 },
            ];
        if (属性探针检测结果.find((检测结果) => 检测结果.属性 === "谦逊")?.变化 ?? 0 > 0)
            return [
                { resId: "$51533657", time: 18 },
                { resId: "$51533428", time: 18 },
                { resId: "$51533429", time: 18 },
                { resId: "$51533430", time: 18 },
                { resId: "$51533431", time: 18 },
                { resId: "$51533433", time: 18 },
                { resId: "$51533434", time: 18 },
                { resId: "$51533435", time: 18 },
                { resId: "$51533436", time: 18 },
                { resId: "$51533437", time: 18 },
                { resId: "$51533438", time: 18 },
                { resId: "$51533439", time: 18 },
                { resId: "$51533440", time: 18 },
                { resId: "$51533441", time: 18 },
                { resId: "$51533442", time: 18 },
                { resId: "$51533443", time: 18 },
                { resId: "$51533444", time: 18 },
                { resId: "$51533445", time: 18 },
                { resId: "$51533446", time: 18 },
                { resId: "$51533447", time: 18 },
                { resId: "$51533448", time: 18 },
                { resId: "$51533449", time: 18 },
                { resId: "$51533450", time: 18 },
                { resId: "$51533451", time: 18 },
                { resId: "$51533452", time: 18 },
                { resId: "$51533453", time: 18 },
                { resId: "$51533454", time: 18 },
                { resId: "$51533455", time: 18 },
                { resId: "$51533657", time: 18 },
            ];

        if (属性探针检测结果.find((检测结果) => 检测结果.属性 === "傲慢")?.变化 ?? 0 > 0)
            return [
                { resId: "$51533657", time: 18 },
                { resId: "$51541582", time: 18 },
                { resId: "$51541583", time: 18 },
                { resId: "$51541584", time: 18 },
                { resId: "$51541585", time: 18 },
                { resId: "$51541586", time: 18 },
                { resId: "$51541587", time: 18 },
                { resId: "$51541588", time: 18 },
                { resId: "$51541589", time: 18 },
                { resId: "$51541590", time: 18 },
                { resId: "$51541591", time: 18 },
                { resId: "$51541592", time: 18 },
                { resId: "$51541593", time: 18 },
                { resId: "$51541594", time: 18 },
                { resId: "$51541595", time: 18 },
                { resId: "$51541596", time: 18 },
                { resId: "$51541597", time: 18 },
                { resId: "$51541598", time: 18 },
                { resId: "$51541599", time: 18 },
                { resId: "$51541600", time: 18 },
                { resId: "$51541601", time: 18 },
                { resId: "$51541602", time: 18 },
                { resId: "$51541603", time: 18 },
                { resId: "$51541604", time: 18 },
                { resId: "$51541605", time: 18 },
                { resId: "$51541606", time: 18 },
                { resId: "$51541607", time: 18 },
                { resId: "$51541608", time: 18 },
                { resId: "$51541609", time: 18 },
                { resId: "$51541610", time: 18 },
                { resId: "$51541611", time: 18 },
                { resId: "$51541612", time: 18 },
                { resId: "$51541613", time: 18 },
                { resId: "$51541614", time: 18 },
                { resId: "$51541615", time: 18 },
                { resId: "$51533657", time: 18 },
            ];

        throw alert("尚未实现其它属性变化时的蔷薇徽章动画！");
    }

    constructor(人物管理器: 人物管理器类) {
        this.#人物管理器 = 人物管理器;
    }

    创建对话选项面板(参数: 创建对话选项面板参数) {
        if (!Number.isSafeInteger(参数.编号)) throw alert("对话选项面板必须有编号！");
        if (!参数.描述) throw alert("对话选项面板必须有描述！");
        if (参数.可选项.length < 2 || 参数.可选项.length > 7) throw alert("对话选项面板必须有2到6个选项！");

        const 面板 = new 对话选项面板(参数);
        const 选择状态 = 变量.对话选项结果[参数.编号];

        if (选择状态 === 未定义) alert(`面板编号 ${参数.编号} 的对话选项结果数组未初始化`);

        面板.选择状态 = 选择状态 ?? 0;

        this.#面板集合[参数.编号] = 面板;

        return 面板;
    }

    创建对话选项(参数?: 创建对话选项参数) {
        const 选项 = new 对话选项();
        if (参数?.选项内容) 选项.设置对话选项内容(参数.选项内容);
        if (参数?.执行结果) 选项.设置对话选项执行结果(参数.执行结果);
        return 选项;
    }

    /**
     * 显示指定编号的对话选项面板。
     * @param 参数 - 显示面板的参数
     * @param 对应选项的回调函数 - 选项的回调函数，顺序与选项的顺序一致
     */
    async 显示对话选项面板(参数: 显示面板参数, ...对应选项的回调函数: Function[]) {
        const 面板 = this.#面板集合[参数.编号];
        if (!面板) throw alert(`编号<${参数.编号}>的对话选项面板不存在！`);
        const 图层名称 = `对话选项面板_${面板.编号}_图层`;
        await ac.createLayer({
            name: 图层名称,
            index: 0,
            inlayer: "window",
            clipMode: true,
            size: { width: 1280, height: 720 },
        });
        await ac.createImage({
            name: `对话选项面板_${面板.编号}_底板`,
            index: 0,
            inlayer: 图层名称,
            resId: "$51362891",
            pos: { x: 652, y: 130 },
            anchor: { x: 50, y: 50 },
        });
        const 蔷薇徽章名称 = `对话选项面板_${面板.编号}_蔷薇徽章`;
        await ac.createImage({
            name: 蔷薇徽章名称,
            index: 0,
            inlayer: 图层名称,
            resId: "$51362896", // 灰蔷薇徽章
            pos: { x: 652, y: 116 },
            anchor: { x: 50, y: 50 },
        });
        const 选项布局 = this.#获取预定义对话选项布局(面板.可选项.length);

        const 选择的选项编号: number = await new Promise((resolve) => {
            面板.可选项.forEach((选项, 索引编号) => {
                const 坐标 = 选项布局.shift();
                if (!坐标) throw alert(`对话选项面板<${面板.编号}>的选项布局不足！`);
                const 选项编号 = 索引编号 + 1;
                ac.createOption({
                    name: `对话选项面板_${面板.编号}_选项_${选项编号}`,
                    index: 1,
                    inlayer: 图层名称,
                    nResId: "$51362894",
                    sResId: "$51362892",
                    content: 选项.内容,
                    pos: { x: 坐标[0], y: 坐标[1] },
                    anchor: { x: 50, y: 50 },
                    clickAudio: { resId: "$51624", vol: 100 },
                    onTouchEnded: async () => {
                        const 属性探针 = this.#人物管理器.黛瑞雅.获取属性探针();
                        await 选项.结果执行函数();
                        面板.选择状态 = 选项编号;
                        ac.arr.对话选项结果[面板.编号] = 选项编号;

                        const 动画序列 = this.#获取蔷薇徽章动画序列(属性探针.检测());
                        接口.移除对象(蔷薇徽章名称);
                        接口.播放音频("蔷薇徽章动画音效", { 资源标识: "$51542664" }); // 蔷薇徽章动画音效

                        await ac.createSequence({
                            name: "rose_animate",
                            index: 0,
                            inlayer: 图层名称,
                            resGroup: 动画序列,
                            pos: { x: 652, y: 116 },
                            anchor: { x: 50, y: 50 },
                            visible: true,
                        });
                        await 接口.延迟(1000);
                        await 接口.移除对象(图层名称, { 时长: 500 });
                        await 对应选项的回调函数[选项编号 - 1]?.();
                        resolve(选项编号);
                    },
                });
            });
        });

        console.log({ 面板编号: 面板.编号, 选择的选项编号, 面板集合: this.#面板集合 });
    }

    /**
     * @param 参数 - 对话选项面板的编号
     */
    查询对话选项面板结果(参数: { 编号: number }) {
        const 编号 = 参数.编号;
        const 面板 = this.#面板集合[编号];
        if (!面板) throw alert(`执行查询对话选项面板结果时，编号<${编号}>的对话选项面板不存在！`);
        return 面板.选择状态;
    }

    批量设置对话选项面板结果(结果集合: { 编号: 数值; 数值: number }[]) {
        for (const 结果 of 结果集合) {
            const 面板 = this.#面板集合[结果.编号];
            if (!面板) throw alert(`执行批量设置对话选项面板结果时，编号<${结果.编号}>的对话选项面板不存在！`);
            if (面板.可选项.length < 结果.数值)
                throw alert(
                    `执行批量设置对话选项面板结果时，编号<${结果.编号}>的对话选项面板的可选项数量为<${面板.可选项.length}>，小于选择的选项编号<${结果.数值}>！`,
                );
            面板.选择状态 = 结果.数值;
            ac.arr.对话选项结果[结果.编号] = 结果.数值;
        }
    }
}
