import { 人物管理器类 } from "./character_manager";

/**
 * 对话选项类
 * @typedef {object} 条件
 * @property {()=>boolean} 需满足 - 条件是否满足的判断函数
 * @property {string} 当不满足时提示 - 条件不满足时的提示
 * @class
 */
class 对话选项 {
    /**
     * @type {number | null}
     */
    编号 = null;
    内容 = "";
    /**
     * @type {条件[]}
     */
    条件集 = [];
    /**
     * @type {() => Promise<unknown> | unknown}
     */
    结果执行函数 = () => void 0;

    /**
     * @param {string} 内容
     */
    设置对话选项内容(内容) {
        this.内容 = 内容;
        return this;
    }

    /**
     * 添加对话选项显示的条件，多次添加的条件需要全部满足。
     * @param {条件} 条件
     * @returns
     */
    添加对话选项条件(条件) {
        this.条件集.push(条件);
        return this;
    }

    /**
     * @param {() => unknown | Promise<unknown>} 结果执行函数
     */
    设置对话选项执行结果(结果执行函数) {
        this.结果执行函数 = 结果执行函数;
        return this;
    }
}

class 对话选项面板 {
    /**
     * 对话选项面板的唯一编号。
     * @type {number}
     */
    编号;

    /**
     * 对话选项面板的描述。
     * @type {string}
     */
    描述;

    /**
     * 对话选项面板的可选项。
     * @type {对话选项[]}
     */
    可选项 = [];

    /**
     * 对话选项面板的选择状态。数值表示当前选择的选项的编号， `0` 表示未选择。
     * @type {number}
     */
    选择状态 = 0;

    /**
     * @typedef {object} 创建对话选项面板参数
     * @property {number} 编号 - 对话选项面板的唯一编号
     * @property {string} 描述 - 对话选项面板的描述
     * @property {对话选项[]} 可选项 - 对话选项面板的可选项
     * @param {创建对话选项面板参数} 参数
     */
    constructor(参数) {
        this.编号 = 参数.编号;
        this.描述 = 参数.描述;
        this.可选项 = 参数.可选项;
    }
}

export class 对话选项管理器类 {
    /**
     * @type {对话选项面板[]}
     */
    #面板集合 = [];

    /**
     * @typedef {[x: number, y: number]} 坐标
     * @type {坐标[][]}
     */
    // rome-ignore format: 特定布局数组不需要格式化
    #预定义对话选项布局 = [
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

    /**
     * @type {人物管理器类}
     */
    #人物管理器;

    /**
     * 根据选项数量获取预定义对话选项布局。
     * @param {number} 选项数量
     * @returns {坐标[]}
     */
    #获取预定义对话选项布局(选项数量) {
        // 复制数组，避免修改原数组
        return this.#预定义对话选项布局[选项数量 - 2].map((坐标) => [...坐标]);
    }

    /**
     * @typedef {object} 属性探针检测结果
     * @property {string} 属性 - 变化的属性
     * @property {number} 变化 - 变化的数值
     * @param {属性探针检测结果[]} 属性探针检测结果
     */
    #获取蔷薇徽章动画序列(属性探针检测结果) {
        if (属性探针检测结果.length === 0) return [];
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

    /**
     * @param {人物管理器类} 人物管理器
     */
    constructor(人物管理器) {
        this.#人物管理器 = 人物管理器;
    }

    /**
     * @param {创建对话选项面板参数} 参数
     * @returns
     */
    创建对话选项面板(参数) {
        if (!Number.isSafeInteger(参数.编号)) throw alert("对话选项面板必须有编号！");
        if (!参数.描述) throw alert("对话选项面板必须有描述！");
        if (参数.可选项.length < 2 || 参数.可选项.length > 7) throw alert("对话选项面板必须有2到6个选项！");
        console.log(ac.arr.对话选项结果, ac.arr.对话选项结果[this.#面板集合.length]);

        const 面板 = new 对话选项面板(参数);
        面板.选择状态 = ac.arr.对话选项结果[this.#面板集合.length] ?? 0;

        this.#面板集合[参数.编号] = 面板;

        return 面板;
    }

    /**
     * @typedef {object} 创建对话选项参数
     * @property {string} [选项内容]
     * @property {() => unknown | Promise<unknown>} [执行结果]
     * @param {创建对话选项参数} [参数]
     * @returns
     */
    创建对话选项(参数) {
        const 选项 = new 对话选项();
        if (参数?.选项内容) 选项.设置对话选项内容(参数.选项内容);
        if (参数?.执行结果) 选项.设置对话选项执行结果(参数.执行结果);
        return 选项;
    }

    /**
     * 显示指定编号的对话选项面板。
     * @typedef {object} 显示面板参数
     * @property {number} 编号 - 对话选项面板的唯一编号
     * @param {显示面板参数} 参数 - 显示面板的参数
     * @param {Function[]} 对应选项的回调函数 - 选项的回调函数，顺序与选项的顺序一致
     */
    async 显示对话选项面板(参数, ...对应选项的回调函数) {
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

        /** @type {number} */
        const 选择的选项编号 = await new Promise((resolve) => {
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

                        const 属性探测结果 = 属性探针.检测();
                        const 动画序列 = this.#获取蔷薇徽章动画序列(属性探测结果);
                        await ac.remove({ name: 蔷薇徽章名称, effect: ac.EFFECT_TYPES.normal });
                        ac.playAudio({
                            name: "playAudio02",
                            resId: "$51542664",
                            vol: 100,
                            effect: "normal",
                            loop: false,
                        });
                        await ac.createSequence({
                            name: "rose_animate",
                            index: 0,
                            inlayer: 图层名称,
                            resGroup: 动画序列,
                            pos: { x: 652, y: 116 },
                            anchor: { x: 50, y: 50 },
                            visible: true,
                        });
                        await ac.delay({ time: 1000 });
                        await ac.remove({ name: 图层名称, effect: ac.EFFECT_TYPES.normal });
                        await 对应选项的回调函数[选项编号 - 1]?.();
                        resolve(选项编号);
                    },
                });
            });
        });

        console.log({ 面板编号: 面板.编号, 选择的选项编号, 面板集合: this.#面板集合 });
    }

    /**
     * @param {{编号: number}} 参数 - 对话选项面板的编号
     */
    查询对话选项面板结果(参数) {
        const 编号 = 参数.编号;
        const 面板 = this.#面板集合[编号];
        if (!面板) throw alert(`执行查询对话选项面板结果时，编号<${编号}>的对话选项面板不存在！`);
        return 面板.选择状态;
    }
}
