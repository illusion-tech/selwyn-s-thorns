class CardActions {
    constructor() {
        this.cards = [];
    }

    add(card) {
        this.cards.push(card);
    }

    async show() {
        const count = this.cards.length;

        if (count < 1) return;
        if (count > 3) return alert("暂不支持超过 3 张选项卡的布局");

        const opts = {
            index: 0,
            inlayer: "window",
            pos: { x: 640, y: 360 },
            anchor: { x: 50, y: 50 },
            opacity: 100,
            scale: 100,
            visible: false,
            verticalFlip: false,
            horizontalFlip: false,
            dynaScale: "cover",
        };

        await ac.createImage({
            name: "card_actions_bg_black_mask",
            resId: "$51398051",
            ...opts,
        });

        await ac.createImage({
            name: "card_actions_bg_purple_mask",
            resId: "$51398050",
            ...opts,
        });

        ac.show({
            name: "card_actions_bg_black_mask",
            effect: ac.EFFECT_TYPES.fadein,
            duration: 3000,
            canskip: false,
        });

        ac.show({
            name: "card_actions_bg_purple_mask",
            effect: ac.EFFECT_TYPES.fadein,
            duration: 3000,
            canskip: false,
        });

        await ac.delay({ time: 1000 });
        // rome-ignore format: 特定布局数组不需要格式化
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
          ];

        const rule = spacing_rules[count - 1];

        let idx = 0;
        for (const card of this.cards) {
            const x = rule[0][2][idx];
            const y = rule[0][1];

            ac.playAudio({
                name: `play_audio_${card.name}`,
                resId: "$51413",
                vol: 100,
                effect: "normal",
                loop: false,
            });
            await card.moveTo({ x, y, duration: 250 });
            idx += 1;
        }
    }

    async hide() {
        for (const card of this.cards) {
            await card.hide();
        }
        ac.hide({
            name: "card_actions_bg_black_mask",
            effect: ac.EFFECT_TYPES.fadeout,
            duration: 1000,
            canskip: true,
        });
        ac.hide({
            name: "card_actions_bg_purple_mask",
            effect: ac.EFFECT_TYPES.fadeout,
            duration: 1000,
            canskip: true,
        });
    }
}
