/// <reference  path="../types.d.ts" />
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
     * @type {() => unknown}
     */
    结果执行函数 = () => {};

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
    编号 = null;

    /**
     * 对话选项面板的描述。
     * @type {string}
     */
    描述 = "";

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

class 人物管理器 {
    static 黛瑞雅 = {
        谦逊: 0,
        魅力: 0,
        力量: 0,
    };
}

class 对话选项管理器类 {
    /**
     * @type {Map<number, 对话选项面板>}
     */
    面板集合 = new Map();

    // rome-ignore format: 特定布局数组不需要格式化
    预定义对话选项布局 = [
        [ [376, 120], [924, 120] ],
        [],
        [],
        [],
        [],
        [],
    ];

    /**
     * 根据选项数量获取预定义对话选项布局。
     * @param {number} 选项数量
     * @returns {[x: number, y: number][]}
     */
    获取预定义对话选项布局(选项数量) {
        // 复制数组，避免修改原数组
        return this.预定义对话选项布局[选项数量 - 2].map((坐标) => [...坐标]);
    }

    /**
     * @param {创建对话选项面板参数} 参数
     * @returns
     */
    创建对话选项面板(参数) {
        if (!参数.编号) throw alert("对话选项面板必须有编号！");
        if (!参数.描述) throw alert("对话选项面板必须有描述！");
        if (参数.可选项.length < 2 || 参数.可选项.length > 7) throw alert("对话选项面板必须有2到6个选项！");
        if (this.面板集合.has(参数.编号)) throw alert(`对话选项面板编号<${参数.编号}>重复！`);

        const 面板 = new 对话选项面板(参数);

        this.面板集合.set(参数.编号, 面板);

        return 面板;
    }

    创建对话选项(参数) {
        const 选项 = new 对话选项();
        if (参数?.对话内容) 选项.设置对话选项内容(参数.对话内容);

        return 选项;
    }

    /**
     * 显示指定编号的对话选项面板。
     * @typedef {object} 显示面板参数
     * @property {number} 编号 - 对话选项面板的唯一编号
     * @param {显示面板参数} 参数
     */
    async 显示对话选项面板(参数) {
        const 面板 = this.面板集合.get(参数.编号);
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
        await ac.createImage({
            name: `对话选项面板_${面板.编号}_蔷薇徽章`,
            index: 0,
            inlayer: 图层名称,
            resId: "$51362896", // 灰蔷薇徽章
            pos: { x: 652, y: 116 },
            anchor: { x: 50, y: 50 },
        });
        const 选项布局 = this.获取预定义对话选项布局(面板.可选项.length);

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
                        await 选项.结果执行函数();
                        面板.选择状态 = 选项编号;
                        resolve(选项编号);
                    },
                });
            });
        });

        ac.arr.对话选项结果[面板.编号 - 1] = 选择的选项编号;

        await ac.remove({
            name: 图层名称,
            effect: ac.EFFECT_TYPES.normal,
            canskip: true,
        });

        console.log({ 面板编号: 面板.编号, 选择的选项编号, 面板集合: this.面板集合 });
    }
}

/**
 * @type {对话选项管理器类}
 */
const 对话选项管理器 = 容器.has(记号.对话选项管理器)
    ? 容器.get(记号.对话选项管理器)
    : (容器.set(记号.对话选项管理器, new 对话选项管理器类()), 容器.get(记号.对话选项管理器));

async function 测试() {
    const 选项1 = 对话选项管理器
        .创建对话选项()
        .设置对话选项内容("让阿斯托利亚看项链")
        .添加对话选项条件({
            需满足: () => 人物管理器.黛瑞雅.谦逊 > 10,
            当不满足时提示: "谦虚太低",
        })
        .设置对话选项执行结果(() => {
            人物管理器.黛瑞雅.谦逊 += 5;
            人物管理器.黛瑞雅.魅力 += 5;
            人物管理器.黛瑞雅.力量 += 5;
        });
    const 选项2 = 对话选项管理器.创建对话选项({ 对话内容: "婉拒阿斯托利亚" });
    const 面板 = 对话选项管理器.创建对话选项面板({
        编号: 1,
        描述: "阿斯托利亚想要看看你的项链",
        可选项: [选项1, 选项2],
    });

    await 对话选项管理器.显示对话选项面板({ 编号: 1 });
}
