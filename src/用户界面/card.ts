import type { 坐标, 资源标识 } from "../运行时/全局常量.ts";
import { myGlobalThis, 是 } from "../运行时/全局常量.ts";
import { 常量, 接口 } from "../运行时/易次元.ts";
export class Card extends  myGlobalThis.EventTarget {
    static async Create(opts: { name: string; resId: 资源标识; content: string }) {
        const card = new Card(opts);
        await card.create();
        return card;
    }

    #name: string;
    #resId: 资源标识;
    #content: string;
    #names;
    #pos: 坐标;
    #anchor;
    #size;
    #state;

    get name() {
        return this.#name;
    }

    constructor(opts: { name: string; resId: 资源标识; content: string }) {
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
        this.#pos = { 横: 640, 纵: -164 };
        this.#anchor = { 横: 50, 纵: 50 };
        this.#size = { 宽: 269, 高: 328 };
        this.#state = 0; // 0: normal, 1: hover
    }

    async create() {
        // 创建层
        await 接口.创建图层(this.#names.layer, {
            层级索引: 100,
            位置: this.#pos,
            锚点: this.#anchor,
            裁剪模式: 是,
            裁剪区域: this.#size,
        });

        await 接口.创建图层(this.#names.pic_layer, {
            层级索引: 90,
            所属图层: this.#names.layer,
            位置: { 横: 141, 纵: 217 },
            锚点: { 横: 50, 纵: 50 },
            裁剪模式: 是,
            裁剪区域: { 宽: 240, 高: 200 },
        });

        let touched_times = 1;

        接口.添加事件侦听器(this.#names.layer, 常量.事件类型.点触开始, () => {
            接口.播放音频("playAudio5", { 资源标识: "$51624", 音量: 80 });
            const event = new CustomEvent("touchstart", { detail: { touched_times } });
            this.dispatchEvent(event);
        });

        接口.添加事件侦听器(this.#names.layer, 常量.事件类型.点触结束, () => {
            const event = new CustomEvent("touchend", { detail: { touched_times } });
            this.dispatchEvent(event);
            touched_times++;
        });

        // 创建卡片框
        const p1 = 接口.创建图片(this.#names.frame, {
            所属图层: this.#names.layer,
            资源标识: "$51410333", // resId: "$51410333"
            层级索引: 1,
        });
        // 创建卡片图
        const p2 = 接口.创建图片(this.#names.pic, {
            所属图层: this.#names.layer,
            资源标识: this.#resId,
            位置: { 横: 27, 纵: 200 },
            锚点: { 横: 0, 纵: 50 },
        });
        // 创建卡片描述
        const p3 = 接口.创建文本(this.#names.text, {
            所属图层: this.#names.layer,
            文本内容: this.#content,
            层级索引: 2,
            位置: { 横: 140, 纵: 70 },
            锚点: { 横: 50, 纵: 50 },
            水平对齐方式: 常量.水平对齐方式.居中,
            垂直对齐方式: 常量.垂直对齐方式.居中,
            文本框大小: { 宽: 218, 高: 80 },
        });

        await Promise.all([p1, p2, p3]);

        // HACK: 获取到 cc 游戏实例，截取画布的 mousemove 事件，
        //       通过判断鼠标在层上的移入移出事件，实现悬浮状态的判断。
        const canvas: HTMLCanvasElement = myGlobalThis.cc.game.canvas;
        const rect = canvas.getBoundingClientRect();
        canvas.addEventListener("mousemove", (event) => {
            const x1 = event.clientX - rect.left;
            const y1 = rect.height + rect.top - event.clientY;
            const x = (1280 / rect.width) * x1;
            const y = (720 / rect.height) * y1;

            const left = this.#pos.横 - (this.#size.宽 * this.#anchor.横) / 100;
            const right = left + this.#size.宽;
            const top = this.#pos.纵 + (this.#size.高 * this.#anchor.纵) / 100;
            const bottom = top - this.#size.高;

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
                位置: { 横: 0, 纵: 10 },
                duration: 100,
                update_pos: false,
            });
        });
        // 鼠标移出时恢复
        this.addEventListener("mouseout", () => {
            this.moveTo({
                位置: this.#pos,
                duration: 100,
                update_pos: false,
            });
        });
    }

    async hide() {
        await 接口.隐藏对象(this.#names.layer, { 时长: 300 });
    }

    async moveTo(opts: { 位置: 坐标; update_pos?: boolean; duration: number }) {
        opts.update_pos = opts.update_pos === false ? false : true;
        await 接口.移动至(this.#names.layer, {
            位置: opts.位置,
            时长: opts.duration,
        });
        if (opts.update_pos) this.#pos = await 接口.获取实体位置(this.#names.layer);
    }

    async moveBy(opts: { 位置: 坐标; update_pos?: boolean; duration: number }) {
        opts.update_pos = opts.update_pos === false ? false : true;
        await 接口.移动(this.#names.layer, {
            位置: opts.位置,
            时长: opts.duration,
        });
        if (opts.update_pos) this.#pos = await 接口.获取实体位置(this.#names.layer);
    }
}
