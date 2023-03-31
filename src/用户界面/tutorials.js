export class 简单教程类 {
    /** @type {string[]} */ 面板集合 = [];
    /** @type {number}   */ 当前面板 = 0;

    /**
     * @typedef {object} 教程面板参数
     * @property {string} resId - 面板图片资源 id
     * @typedef {object} 简单教程类构造参数
     * @property {教程面板参数[]} 面板 - 教程面板数组
     * @param {简单教程类构造参数} 参数
     */
    constructor(参数) {
        this.面板集合 = 参数.面板.map((面板参数) => 面板参数.resId);
    }

    async 显示() {
        const 面板数量 = this.面板集合.length;
        let 面板索引 = 0;
        for (const 面板图片资源唯一标识 of this.面板集合) {
            面板索引 += 1;
            const 图层名称 = `教程面板_${面板索引}_图层`;
            const 图片名称 = `教程面板_${面板索引}_图片`;
            await ac.createLayer({
                name: 图层名称,
                index: 100,
                inlayer: "window",
                visible: false,
                pos: { x: 640, y: 360 },
                anchor: { x: 50, y: 50 },
                size: { width: 1280, height: 720 },
                clipMode: true,
            });
            await ac.createImage({
                name: 图片名称,
                inlayer: 图层名称,
                resId: 面板图片资源唯一标识,
                pos: { x: 640, y: 360 },
                anchor: { x: 50, y: 50 },
            });
        }

        await ac.createLayer({
            name: "教程面板_按钮图层",
            index: 101,
            inlayer: "window",
            visible: false,
            pos: { x: 640, y: 360 },
            anchor: { x: 50, y: 50 },
            size: { width: 1280, height: 720 },
            clipMode: true,
        });

        await ac.createOption({
            name: "教程面板_上一页按钮",
            inlayer: "教程面板_按钮图层",
            visible: false,
            nResId: "$5105452",
            sResId: "$5105452",
            pos: { x: 318, y: 372 },
            anchor: { x: 50, y: 50 },
            clickAudio: { resId: "$532507", vol: 80 },
        });

        await ac.createOption({
            name: "教程面板_下一页按钮",
            inlayer: "教程面板_按钮图层",
            visible: false,
            nResId: "$5105451",
            sResId: "$5105451",
            pos: { x: 968, y: 372 },
            anchor: { x: 50, y: 50 },
            clickAudio: { resId: "$532507", vol: 80 },
        });

        await ac.createOption({
            name: "教程面板_关闭按钮",
            inlayer: "教程面板_按钮图层",
            visible: false,
            nResId: "$51035453",
            sResId: "$51035453",
            pos: { x: 948, y: 578 },
            anchor: { x: 50, y: 50 },
            clickAudio: { resId: "$51624", vol: 100 },
        });
    }
}

async function 测试() {
    const 教程面板 = new 简单教程类({
        面板: [{ resId: "$51544832" }, { resId: "$51544833" }],
    });
    await 教程面板.显示();
}
