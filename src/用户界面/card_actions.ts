import { 否 } from "../运行时/全局常量.ts";
import { 常量, 接口 } from "../运行时/易次元.ts";
import { Card } from "./card.ts";

export class CardActions {
    #cards: Card[];
    constructor() {
        this.#cards = [];
    }

    add(card: Card) {
        this.#cards.push(card);
    }

    async show() {
        const count = this.#cards.length;

        if (count < 1) return;
        if (count > 3) return alert("暂不支持超过 3 张选项卡的布局");

        await 接口.创建图片("card_actions_bg_black_mask", {
            资源标识: "$51398051", // resId: "$51398051"
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
            动态缩放模式: 常量.动态缩放模式.覆盖,
            是否可见: 否,
        });

        await 接口.创建图片("card_actions_bg_purple_mask", {
            资源标识: "$51398050", // resId: "$51398050"
            位置: { 横: 640, 纵: 360 },
            锚点: { 横: 50, 纵: 50 },
            动态缩放模式: 常量.动态缩放模式.覆盖,
            是否可见: 否,
        });

        接口.显示对象("card_actions_bg_black_mask", { 时长: 3000 });
        接口.显示对象("card_actions_bg_purple_mask", { 时长: 3000 });

        await 接口.延迟(1000);

        // deno-fmt-ignore: 特定布局数组不需要格式化
        const spacing_rules =
        [
            [[   1, 360, [              640               ]]],
            [[   1, 360, [        426,        854         ]]],
            [[   1, 360, [     301,     640,     979      ]]],
            [
             [0.85, 533, [       380,           898       ]],
             [0.85, 186, [       380,           898       ]],
            ],
            [
             [0.85, 533, [                                ]],
             [0.85, 186, [                                ]],
            ],
        ] as [缩放比:number, 纵坐标:number, 横坐标组:number[]][][];

        const rule = spacing_rules[count - 1];

        let idx = 0;
        for (const card of this.#cards) {
            const x = rule[0][2][idx];
            const y = rule[0][1];

            接口.播放音频(`play_audio_${card.name}`, { 资源标识: "$51413" }); // resId: "$51413"
            await card.moveTo({ 位置: { 横: x, 纵: y }, duration: 250 });
            idx += 1;
        }
    }

    async hide() {
        for (const card of this.#cards) {
            await card.hide();
        }

        接口.隐藏对象("card_actions_bg_black_mask", { 时长: 1000 });
        接口.隐藏对象("card_actions_bg_purple_mask", { 时长: 1000 });
    }
}
