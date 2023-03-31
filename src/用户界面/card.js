export class Card extends EventTarget {
    /**
     * @typedef {{name: string, resId: string, content: string}} CardOptions
     * @param {CardOptions} opts
     * @returns
     */
    static async Create(opts) {
        const card = new Card(opts);
        await card.create();
        return card;
    }

    /**
     * @type {string}
     */
    #name;
    /**
     * @type {string}
     */
    #resId;
    /**
     * @type {string}
     */
    #content;
    #names;
    #pos;
    #anchor;
    #size;
    #state;

    get name() {
        return this.#name;
    }

    /**
     * @param {CardOptions} opts
     */
    constructor(opts) {
        super();
        this.#name = opts.name;
        this.#resId = opts.resId;
        this.#content = opts.content;
        this.#names = {
            layer: `${this.#name}_layer`,
            frame: `${this.#name}_frame`,
            pic: `${this.#name}_pic`,
            pic_layer: `${this.#name}_pic`,
            text: `${this.#name}_text`,
        };
        this.#pos = { x: 640, y: -164 };
        this.#anchor = { x: 50, y: 50 };
        this.#size = { w: 269, h: 328 };
        this.#state = 0; // 0: normal, 1: hover
    }

    async create() {
        // 创建层
        await ac.createLayer({
            name: this.#names.layer,
            index: 100,
            pos: this.#pos,
            anchor: this.#anchor,
            size: { width: this.#size.w, height: this.#size.h },
            clipMode: true,
        });
        await ac.createLayer({
            name: this.#names.pic_layer,
            index: 90,
            inlayer: this.#names.layer,
            visible: true,
            pos: { x: 141, y: 217 },
            anchor: { x: 50, y: 50 },
            size: { width: 240, height: 200 },
            clipMode: true,
        });
        let touched_times = 1;
        ac.addEventListener({
            type: ac.EVENT_TYPES.onTouchBegan,
            listener: () => {
                ac.playAudio({
                    name: "playAudio5",
                    resId: "$51624",
                    vol: 80,
                    effect: "normal",
                    loop: false,
                });
                const event = new CustomEvent("touchstart", { detail: { touched_times } });
                this.dispatchEvent(event);
            },
            target: this.#names.layer,
        });
        ac.addEventListener({
            type: ac.EVENT_TYPES.onTouchEnded,
            listener: () => {
                const event = new CustomEvent("touchend", { detail: { touched_times } });
                this.dispatchEvent(event);
                touched_times++;
            },
            target: this.#names.layer,
        });
        // 创建卡片框
        const p1 = ac.createImage({
            name: this.#names.frame,
            resId: "$51410333",
            index: 1,
            inlayer: this.#names.layer,
        });
        // 创建卡片图
        const p2 = ac.createImage({
            name: this.#names.pic,
            inlayer: this.#names.layer,
            resId: this.#resId,
            pos: { x: 27, y: 200 },
            anchor: { x: 0, y: 50 },
        });
        // 创建卡片描述
        const p3 = ac.createText({
            name: this.#names.text,
            index: 2,
            inlayer: this.#names.layer,
            content: this.#content,
            direction: ac.TEXT_DIRECTION_TYPES.horizontal,
            halign: ac.HALIGN_TYPES.middle,
            valign: ac.VALIGN_TYPES.center,
            pos: { x: 140, y: 70 },
            size: { width: 218, height: 80 },
            anchor: { x: 50, y: 50 },
        });

        await Promise.all([p1, p2, p3]);

        // HACK: 获取到 cc 游戏实例，截取画布的 mousemove 事件，
        //       通过判断鼠标在层上的移入移出事件，实现悬浮状态的判断。
        /** @type {*} */ const myGlobalThis = globalThis;
        /** @type {HTMLCanvasElement} */
        const canvas = myGlobalThis.cc.game.canvas;
        const rect = canvas.getBoundingClientRect();
        canvas.addEventListener("mousemove", (event) => {
            const x1 = event.clientX - rect.left;
            const y1 = rect.height + rect.top - event.clientY;
            const x = (1280 / rect.width) * x1;
            const y = (720 / rect.height) * y1;

            const left = this.#pos.x - (this.#size.w * this.#anchor.x) / 100;
            const right = left + this.#size.w;
            const top = this.#pos.y + (this.#size.h * this.#anchor.y) / 100;
            const bottom = top - this.#size.h;

            const mouse_over = y > bottom && y < top && x > left && x < right;
            const is_hover_state = this.#state === 1;
            if (!is_hover_state && mouse_over) {
                this.dispatchEvent(new Event("mouseover"));
                this.#state = 1;
            }

            if (is_hover_state && !mouse_over) {
                this.dispatchEvent(new Event("mouseout"));
                this.#state = 0;
            }
        });

        // 鼠标悬浮的动画效果
        this.addEventListener("mouseover", () => {
            this.moveBy({
                y: 10,
                duration: 100,
                ease: ac.EASE_TYPES.normal,
                update_pos: false,
            });
        });
        // 鼠标移出时恢复
        this.addEventListener("mouseout", () => {
            this.moveTo({
                x: this.#pos.x,
                y: this.#pos.y,
                duration: 100,
                ease: ac.EASE_TYPES.normal,
                update_pos: false,
            });
        });
    }

    async hide() {
        await ac.hide({
            name: this.#names.layer,
            duration: 300,
            effect: ac.EFFECT_TYPES.fadeout,
        });
    }

    /**
     * @param {*} opts 
     */
    async moveTo(opts) {
        opts.name = this.#names.layer;
        opts.update_pos = opts.update_pos === false ? false : true;
        await ac.moveTo(opts);
        if (opts.update_pos) this.#pos = await ac.getPos({ name: opts.name });
    }

    /**
     * @param {*} opts 
     */
    async moveBy(opts) {
        opts.name = this.#names.layer;
        opts.update_pos = opts.update_pos === false ? false : true;
        await ac.moveBy(opts);
        if (opts.update_pos) this.#pos = await ac.getPos({ name: opts.name });
    }
}
